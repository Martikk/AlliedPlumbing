import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {createHash} from 'node:crypto';
const source=readFileSync('apps-script/Code.gs','utf8');
function harness(){
 const folders=[],mail=[],props=new Map([['ALLIED_QUOTE','quote-root'],['ALLIED_CAREERS','careers-root'],['ALLIED_CONTACT','contact-root']]);let failMail=false;
 const context={console,Utilities:{DigestAlgorithm:{SHA_256:'sha256'},computeDigest:(_,v)=>[...createHash('sha256').update(typeof v==='string'?v:Buffer.from(v)).digest()],base64EncodeWebSafe:v=>Buffer.from(v).toString('base64url'),formatDate:(_date,zone,pattern)=>{if(pattern==='ddMMyy-HHmmss'){assert.equal(zone,'America/Vancouver');return '011126-061530';}return '2026-10-31';},newBlob:v=>v},LockService:{getScriptLock:()=>({tryLock:()=>true,releaseLock:()=>{}})},PropertiesService:{getScriptProperties:()=>({getProperty:k=>props.get(k),setProperty:(k,v)=>props.set(k,v)})},CacheService:{getScriptCache:()=>({get:()=>null,put:()=>{}})},MailApp:{getRemainingDailyQuota:()=>100,sendEmail:payload=>{if(failMail)throw Error('Unknown transport failure');mail.push(payload);}},Drive:{Files:{get:id=>folders.find(x=>x.id===id),list:({q})=>({files:folders.filter(x=>q.includes(x.appProperties.alliedRequest) && !x.trashed)}),create:(metadata)=>{if(metadata.appProperties){const value={...metadata,id:'request-'+folders.length};folders.push(value);return value;}return {id:'file'};},update:(patch,id)=>{const folder=folders.find(x=>x.id===id);Object.assign(folder,patch);}}}};
 vm.createContext(context);vm.runInContext(source,context);
 return {context,mail,folders,failMail:()=>{failMail=true;}};
}
function form(type='quote'){return {type,requestId:'12345678-1234-4234-8234-123456789abc',startedAt:String(Date.now()-5000),name:'QA Fixture',email:'fixture@example.test',message:'Fixture request',consent:'yes'};}
function blob(name,type,bytes){return {getName:()=>name,getContentType:()=>type,getBytes:()=>bytes,setName:()=>{}};}
test('server routes recipients and deduplicates accepted requests',()=>{
 for(const type of ['contact','quote','careers']){const h=harness(),f=form(type);assert.equal(h.context.submitEnquiry(f).ok,true);assert.equal(h.context.submitEnquiry(f).ok,true);assert.equal(h.mail.length,1);assert.equal(h.mail[0].to,'alex@allied-plumbing.ca');assert.throws(()=>h.context.submitEnquiry({...f,message:'Changed after acceptance'}),/earlier version/);}
});
test('mail ambiguity retains archive and never retries notification automatically',()=>{
 const h=harness();h.failMail();const f=form();const r=h.context.submitEnquiry(f);assert.equal(r.stored,true);assert.equal(r.ok,false);assert.equal(h.context.submitEnquiry(f).stored,true);assert.equal(h.folders.length,1);assert.equal(h.folders[0].appProperties.state,'sending');
});
test('attachment policy rejects spoofed type, oversized PDF, careers images and contact files',()=>{
 const h=harness(),pdf=[37,80,68,70,45,49];
 assert.equal(h.context.checked_({...form('careers'),file0:blob('resume.pdf','application/pdf',pdf)}).files.length,1);
 assert.throws(()=>h.context.checked_({...form(),file0:blob('fake.pdf','application/pdf',[1,2,3])}),/Unsupported/);
 assert.throws(()=>h.context.checked_({...form('careers'),file0:blob('resume.jpg','image/jpeg',[255,216,255])}),/Unsupported/);
 assert.throws(()=>h.context.checked_({...form('contact'),file0:blob('a.pdf','application/pdf',pdf)}),/Too many/);
 const big=new Array(5*1024*1024+1).fill(0);big.splice(0,5,37,80,68,70,45);
 assert.throws(()=>h.context.checked_({...form('careers'),file0:blob('resume.pdf','application/pdf',big)}),/5 MB/);
});
test('form rejects missing consent, invalid route and unsafe resume link',()=>{
 const h=harness();assert.throws(()=>h.context.checked_({...form(),consent:''}),/agree/);assert.throws(()=>h.context.checked_({...form(),type:'attacker@example.test'}),/valid enquiry/);assert.throws(()=>h.context.checked_({...form(),resume_url:'javascript:alert(1)'}),/HTTPS/);
});
test('HTML config cannot break out into script; client JavaScript parses',()=>{
 const h=harness();const html=h.context.formHtml_({type:'careers',token:'test',role:'</script><script>alert(1)</script>'});
 assert.equal(html.includes('</script><script>alert(1)'),false);
 const script=html.match(/<script>([\s\S]*)<\/script>/)[1];new vm.Script(script);
 assert.ok(script.includes('/\\.pdf$/i'), 'PDF extension regex must escape the literal dot once');
});

test('short references match email and archive and stay stable on retry',()=>{
 const h=harness(),f=form();const first=h.context.submitEnquiry(f);assert.equal(first.id,'011126-061530-1234');assert.equal(h.context.submitEnquiry(f).id,first.id);assert.ok(h.mail[0].subject.endsWith(first.id));assert.ok(h.mail[0].body.includes('Reference: '+first.id));assert.equal(h.folders[0].appProperties.alliedRequest,f.requestId);assert.equal(h.folders[0].appProperties.reference,first.id);
});

/** The manifest pins oauthScopes explicitly, so Apps Script grants exactly
 *  that list and nothing is auto-detected. A call needing a scope that is not
 *  listed throws a permission error at runtime — and turnstileOK_ catches
 *  everything and fails open, so a missing scope would not surface as a broken
 *  form. It would surface as Turnstile silently never verifying anything,
 *  which is the one outcome worth more than the enquiry it protects. */
test('every Google service the script calls has its scope in the manifest', () => {
  const code = readFileSync('apps-script/Code.gs', 'utf8');
  const manifest = JSON.parse(readFileSync('apps-script/appsscript.json', 'utf8'));
  const scopes = manifest.oauthScopes;

  const needs = [
    ['UrlFetchApp', 'https://www.googleapis.com/auth/script.external_request'],
    ['MailApp', 'https://www.googleapis.com/auth/script.send_mail'],
    ['Drive', 'https://www.googleapis.com/auth/drive.file'],
    ['ScriptApp', 'https://www.googleapis.com/auth/script.scriptapp'],
  ];
  for (const [service, scope] of needs) {
    if (new RegExp(`\\b${service}\\.`).test(code)) {
      assert.ok(scopes.includes(scope), `${service} is used but ${scope} is not in oauthScopes`);
    }
  }
});
