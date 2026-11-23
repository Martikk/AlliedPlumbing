/* Allied enquiry service. Private Drive files created by this app only (drive.file).
 * No public Drive permissions, no client-controlled recipients, no inbox-reading scope.
 */
var ROUTES_ = Object.freeze({
  contact: {email:'alex@allied-plumbing.ca', days:180, max:0, count:0, noun:'enquiry'},
  quote: {email:'alex@allied-plumbing.ca', days:180, max:10*1024*1024, count:4, noun:'quote request'},
  careers: {email:'alex@allied-plumbing.ca', days:90, max:5*1024*1024, count:1, noun:'application'}
});
function doGet(e) {
  var type=String(e && e.parameter && e.parameter.type || 'contact');
  if (!ROUTES_[type]) type='contact';
  var config={type:type,token:String(e && e.parameter && e.parameter.token || '').replace(/[^a-zA-Z0-9-]/g,'').slice(0,80),role:String(e && e.parameter && e.parameter.role || '').slice(0,160)};
  return HtmlService.createHtmlOutput(formHtml_(config)).setTitle('Allied Plumbing enquiry').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
/* Audit H-01 step 6 — Cloudflare Turnstile, verified server side.
 *
 * A token the client never sends, or sends unverified, is decoration. This
 * is the half that matters.
 *
 * Off until a secret exists: set TURNSTILE_SECRET in Project Settings ->
 * Script Properties. With no secret the function returns without an opinion
 * and the honeypot plus the minimum fill time in checked_() remain the spam
 * controls, exactly as today.
 *
 * Fail-open on a Cloudflare outage. A CAPTCHA provider being down is not a
 * reason to drop a real enquiry; the other controls still apply.
 */
function turnstileOK_(token, ip) {
  var secret = PropertiesService.getScriptProperties().getProperty('TURNSTILE_SECRET');
  if (!secret) return true;                      // not configured
  if (!token) return false;                      // configured, but nothing sent

  var payload = { secret: secret, response: String(token).slice(0, 2048) };
  if (ip) payload.remoteip = String(ip);

  try {
    var response = UrlFetchApp.fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      { method: 'post', payload: payload, muteHttpExceptions: true }
    );
    var body = JSON.parse(response.getContentText());
    return body.success === true;
  } catch (error) {
    // Fail open: a provider being unreachable is not a reason to drop a real
    // enquiry. But log it — a MISSING SCOPE throws here too, and that would
    // make verification silently inert instead of merely degraded. The
    // manifest must carry script.external_request; tests/apps-script.test.mjs
    // asserts it.
    console.error('Turnstile verification failed open: ' + error);
    return true;
  }
}

/* Audit H-01 — native enquiry form endpoint.
 *
 * The site no longer embeds this script in an iframe; it POSTs JSON here from
 * its own React form, so validation, errors, tracking and prefill all live in
 * the site. Everything after parsing is the existing pipeline: checked_(),
 * dedupe by requestId, private Drive storage, retention, MailApp.
 *
 * Content-Type is text/plain so the browser sends a simple request. Apps
 * Script cannot answer a CORS preflight, so never switch this to
 * application/json.
 *
 * Attachments arrive as {name, type, data} with `data` base64-encoded.
 *
 * AFTER EDITING: Deploy → Manage deployments → edit the active deployment →
 * New version. The /exec URL stays the same, so no site change is needed.
 */
function doPost(e) {
  var reply = function (payload) {
    return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
      ContentService.MimeType.JSON
    );
  };
  try {
    if (!e || !e.postData || !e.postData.contents) throw new Error('Empty request.');
    if (e.postData.contents.length > 20 * 1024 * 1024) throw new Error('Request too large.');
    var body = JSON.parse(e.postData.contents);
    var form = {};
    ['type','name','email','phone','address','service','urgency','role','resume_url','message',
     'consent','website','requestId','startedAt','enquiryType','propertyType','organisation',
     'tenderClosing'].forEach(function (key) {
      if (body[key] !== undefined && body[key] !== null) form[key] = String(body[key]);
    });
    // Context the operator needs but checked_() does not model as its own
    // field; folded into the message so nothing is silently dropped.
    var extra = [];
    if (form.enquiryType) extra.push('Enquiry type: ' + form.enquiryType);
    if (form.propertyType) extra.push('Property type: ' + form.propertyType);
    if (form.organisation) extra.push('Organisation: ' + form.organisation);
    if (form.tenderClosing) extra.push('Tender closing: ' + form.tenderClosing);
    if (extra.length) form.message = extra.join('\n') + '\n\n' + (form.message || '');
    delete form.enquiryType; delete form.propertyType;
    delete form.organisation; delete form.tenderClosing;

    var files = Array.isArray(body.files) ? body.files.slice(0, 4) : [];
    files.forEach(function (file, index) {
      if (!file || !file.data) return;
      form['file' + index] = Utilities.newBlob(
        Utilities.base64Decode(String(file.data)),
        String(file.type || 'application/octet-stream'),
        String(file.name || 'attachment')
      );
    });
    if (!turnstileOK_(body.turnstileToken, e.parameter && e.parameter.ip)) {
      return reply({
        ok: false,
        message: 'We could not verify this request. Please reload the page and try again, or call 604-731-1000.'
      });
    }

    return reply(submitEnquiry(form));
  } catch (error) {
    return reply({ ok: false, message: String(error && error.message || error) });
  }
}

function text_(value,max,required) {
  if(typeof value!=='string' || value.length>max || (required && !value.trim())) throw new Error('Check the required fields and text lengths.');
  return value.trim();
}
function checked_(form) {
  var route=ROUTES_[form.type];
  if(!route)throw new Error('Choose a valid enquiry type.');
  if(form.website)throw new Error('Unable to accept this request. Please call 604-731-1000.');
  if(form.consent!=='yes')throw new Error('Please agree to be contacted about this enquiry.');
  if(!/^[a-f0-9-]{36}$/.test(form.requestId || ''))throw new Error('Reload the form and try again.');
  if(!Number.isFinite(Number(form.startedAt)) || Date.now()-Number(form.startedAt)<2000)throw new Error('Please review your details before submitting.');
  var fields={};
  ['name','email','phone','address','service','urgency','role','resume_url','message'].forEach(function(key){fields[key]=text_(form[key] || '',key==='message'?5000:key==='resume_url'?2000:254,['name','email','message'].indexOf(key)>=0);});
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email) || /[\r\n]/.test(fields.email))throw new Error('Enter a valid email address.');
  if(fields.resume_url && !/^https:\/\/[^\s]+$/i.test(fields.resume_url))throw new Error('Use an HTTPS resume link.');
  var files=[],total=0;
  for(var i=0;i<4;i++){
    var blob=form['file'+i];
    if(!blob || typeof blob.getBytes!=='function')continue;
    var bytes=blob.getBytes(); if(!bytes.length)continue;
    if(files.length>=route.count)throw new Error('Too many attachments for this form.');
    var filename=String(blob.getName() || '').replace(/[\\/\r\n\x00-\x1f]/g,'_').slice(0,150);
    var mime=String(blob.getContentType()).toLowerCase(),ext=filename.split('.').pop().toLowerCase();
    var b=bytes.map(function(n){return n&255;});
    var pdf=ext==='pdf' && mime==='application/pdf' && b.slice(0,5).join(',')==='37,80,68,70,45';
    var jpg=['jpg','jpeg'].indexOf(ext)>=0 && mime==='image/jpeg' && b[0]===255 && b[1]===216 && b[2]===255;
    var png=ext==='png' && mime==='image/png' && b.slice(0,8).join(',')==='137,80,78,71,13,10,26,10';
    if(!pdf && !(form.type==='quote' && (jpg || png)))throw new Error('Unsupported file. Careers accepts PDF; Quote accepts PDF, JPG or PNG.');
    total+=bytes.length;
    if(total>route.max)throw new Error(form.type==='careers'?'Resume must be no larger than 5 MB.':'Quote attachments must total no more than 10 MB.');
    blob.setName(filename);files.push(blob);
  }
  var fingerprint=Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,JSON.stringify(fields)+files.map(function(blob){return blob.getName()+Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,blob.getBytes()));}).join('|')));
  return {type:form.type,id:form.requestId,route:route,fields:fields,files:files,fingerprint:fingerprint};
}
function findRequest_(id) {
  var cached=PropertiesService.getScriptProperties().getProperty('request:'+id);
  if(cached){var direct=Drive.Files.get(JSON.parse(cached).id,{fields:'id,appProperties,trashed'});if(!direct.trashed)return direct;}
  var result=Drive.Files.list({q:"trashed = false and mimeType = 'application/vnd.google-apps.folder' and appProperties has { key='alliedRequest' and value='"+id+"' }",fields:'files(id,appProperties)',pageSize:10});
  return result.files && result.files[0];
}
function status_(folder,state) { Drive.Files.update({appProperties:Object.assign({},folder.appProperties,{state:state})},folder.id); }
/* The acknowledgement to the person who sent the enquiry.
 *
 * THE BODY IS FIXED. Nothing the sender typed is echoed back — not the name,
 * not the message, not the address. This mail goes to an address the sender
 * chose, so echoing their text would make the form a small open relay: put a
 * stranger's address in the email field, the payload in the message field,
 * and Allied's domain delivers it. Only the reference and the route's own
 * noun appear, and the noun is a ROUTES_ key, not input.
 *
 * IT CANNOT FAIL THE ENQUIRY. By the time this runs the request is stored and
 * Allied has been notified. A failure here is logged and dropped, because the
 * alternative is telling someone their enquiry failed when it did not. The
 * sender losing a courtesy copy costs nothing; Allied losing the enquiry, or
 * the sender sending it twice because they were told it failed, costs work.
 */
function acknowledge_(request) {
  var body='Thank you — we have your '+request.route.noun+'.\n\n'
    +'Your reference: '+request.reference+'\n'
    +'Quote it if you call us about this enquiry.\n\n'
    +'We read enquiries the same day and reply within one business day.\n'
    +'For no-heat, leaks or gas issues, call 604-731-1000 — any hour, any day.\n\n'
    +'Allied Plumbing, Heating & Air Conditioning\n'
    +'4085 2nd Avenue, Burnaby, BC V5C 3X1\n'
    +'604-731-1000\n\n'
    +'This is an automated confirmation that your '+request.route.noun+' reached us.\n'
    +'It is not a quotation and commits neither party. Please do not reply to\n'
    +'confirm receipt — replies reach our team, and we will be in touch.';
  try {
    MailApp.sendEmail({to:request.fields.email,subject:'Allied Plumbing — we have your '+request.route.noun+' — '+request.reference,body:body,replyTo:request.route.email,name:'Allied Plumbing'});
  } catch(error) {
    console.error('Acknowledgement to the sender failed, enquiry unaffected: '+error);
  }
}
function submitEnquiry(form) {
  var request=checked_(form),lock=LockService.getScriptLock();
  if(!lock.tryLock(15000))throw new Error('The service is busy. Keep your details and try again shortly.');
  try {
    var existing=findRequest_(request.id);
    request.reference=existing ? (existing.appProperties.reference || request.id) : Utilities.formatDate(new Date(),'America/Vancouver','ddMMyy-HHmmss')+'-'+request.id.slice(0,4).toUpperCase();
    if(existing && existing.appProperties.fingerprint!==request.fingerprint)throw new Error('An earlier version of this request is already recorded. Call 604-731-1000 with reference '+request.reference+'.');
    if(existing && existing.appProperties.state==='notified')return {ok:true,id:request.reference};
    if(existing && ['sending','stored'].indexOf(existing.appProperties.state)>=0)return {ok:false,stored:true,id:request.reference,message:'Your request is stored, but notification confirmation is unavailable. Do not resubmit. Call 604-731-1000 with reference '+request.reference+'.'};
    if(existing)Drive.Files.update({trashed:true},existing.id);
    var props=PropertiesService.getScriptProperties(),root=props.getProperty('ALLIED_'+request.type.toUpperCase());
    if(!root)throw new Error('The enquiry service is not ready. Please call or email our team.');
    var today=Utilities.formatDate(new Date(),'UTC','yyyy-MM-dd'),dayKey='usage:'+today;
    var used=Number(props.getProperty(dayKey)||0);
    if(used>=60 || MailApp.getRemainingDailyQuota()<2)throw new Error('Online enquiries have reached today’s capacity. Please email or call our team.');
    var cache=CacheService.getScriptCache(),hash=Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,request.fields.email.toLowerCase()));
    var rate=Number(cache.get('rate:'+hash)||0),hour=Number(cache.get('global-hour')||0);
    if(rate>=3 || hour>=30)throw new Error('Too many requests. Please wait or call our team.');
    cache.put('rate:'+hash,String(rate+1),900);cache.put('global-hour',String(hour+1),3600);
    props.setProperty(dayKey,String(used+1)); // Reserve capacity even if downstream processing fails.
    var expires=String(Date.now()+request.route.days*86400000);
    var folder=Drive.Files.create({name:today+' '+request.type+' '+request.reference,mimeType:'application/vnd.google-apps.folder',parents:[root],appProperties:{alliedRequest:request.id,reference:request.reference,state:'uploading',expires:expires,fingerprint:request.fingerprint}},null,{fields:'id,appProperties'});
    props.setProperty('request:'+request.id,JSON.stringify({id:folder.id,created:Date.now()}));
    try {
      request.files.forEach(function(blob){Drive.Files.create({name:blob.getName(),parents:[folder.id]},blob,{fields:'id'});});
      var record={id:request.id,reference:request.reference,type:request.type,receivedAt:new Date().toISOString(),expiresAt:new Date(Number(expires)).toISOString(),fields:request.fields,consent:'Contact about this enquiry/application',attachments:request.files.map(function(blob){return blob.getName();})};
      Drive.Files.create({name:'request.json',parents:[folder.id]},Utilities.newBlob(JSON.stringify(record,null,2),'application/json','request.json'),{fields:'id'});
      status_(folder,'stored');
    } catch(error) { status_(folder,'archive_failed');throw new Error('Your request could not be stored. Your form details are preserved; please try again.'); }
    var body='Allied Plumbing '+request.type+' enquiry\nReference: '+request.reference+'\n\n'+Object.keys(request.fields).map(function(key){return key+': '+request.fields[key];}).join('\n')+'\n\nAttachments are included in this email. A private copy is retained in the website owner’s Drive. Mail acceptance is not proof of inbox delivery.';
    status_(folder,'sending');
    try { MailApp.sendEmail({to:request.route.email,subject:'Allied Plumbing — '+request.type+' — '+request.reference,body:body,replyTo:request.fields.email,attachments:request.files,name:'Allied Plumbing website'}); }
    catch(error) { return {ok:false,stored:true,id:request.reference,message:'Your request is stored, but email notification could not be confirmed. Do not resubmit. Call 604-731-1000 with reference '+request.reference+'.'}; }
    status_(folder,'notified');
    acknowledge_(request);
    return {ok:true,id:request.reference};
  } finally {lock.releaseLock();}
}
/* Owner-only editor setup, never callable through google.script.run. */
function setup_() {
  var props=PropertiesService.getScriptProperties();
  Object.keys(ROUTES_).forEach(function(type){var key='ALLIED_'+type.toUpperCase();if(!props.getProperty(key)){var folder=Drive.Files.create({name:'Allied Website — '+type,mimeType:'application/vnd.google-apps.folder'},null,{fields:'id'});props.setProperty(key,folder.id);}});
  if(!ScriptApp.getProjectTriggers().some(function(t){return t.getHandlerFunction()==='cleanupExpired_';}))ScriptApp.newTrigger('cleanupExpired_').timeBased().everyDays(1).create();
}
function cleanupExpired_() {
  var props=PropertiesService.getScriptProperties();
  Object.keys(ROUTES_).forEach(function(type){var root=props.getProperty('ALLIED_'+type.toUpperCase());if(!root)return;var token;
    do {var result=Drive.Files.list({q:"'"+root+"' in parents and trashed = false and mimeType = 'application/vnd.google-apps.folder'",fields:'nextPageToken,files(id,appProperties)',pageSize:100,pageToken:token});(result.files||[]).forEach(function(folder){if(Number(folder.appProperties && folder.appProperties.expires)<Date.now())Drive.Files.update({trashed:true},folder.id);});token=result.nextPageToken;}while(token);
  });
  Object.keys(props.getProperties()).forEach(function(key){if(key.indexOf('request:')===0 && JSON.parse(props.getProperty(key)).created<Date.now()-7*86400000)props.deleteProperty(key);if(key.indexOf('usage:')===0 && key.slice(6)<Utilities.formatDate(new Date(Date.now()-7*86400000),'UTC','yyyy-MM-dd'))props.deleteProperty(key);});
}
function formHtml_(config) {
  var encoded=JSON.stringify(config).replace(/</g,'\\u003c').replace(/>/g,'\\u003e').replace(/&/g,'\\u0026');
  return `<!doctype html><html lang="en"><head><base target="_top"><meta name="viewport" content="width=device-width,initial-scale=1"><style>
*{box-sizing:border-box}body{margin:0;padding:12px;font:16px/1.5 Arial,sans-serif;color:#171717;background:#fff}label{display:block;margin:0 0 18px;font-weight:600}input,textarea,select{display:block;width:100%;padding:12px;border:1px solid #737373;border-radius:9px;font:inherit;color:#171717;background:white;margin-top:6px}textarea{min-height:130px}button{font:inherit;font-weight:700;background:#315cb4;color:white;padding:13px 22px;border:0;border-radius:9px;cursor:pointer;min-height:48px}button:disabled{opacity:.65;cursor:wait}:focus-visible{outline:3px solid #315cb4;outline-offset:3px}small{display:block;color:#525252;font-weight:400}a{color:#23488c}fieldset{border:0;padding:0;margin:0}.consent{display:flex;align-items:flex-start;gap:12px;font-size:14px;font-weight:400}.consent input{width:20px;height:20px;flex-shrink:0;margin-top:2px}.trap{position:absolute;left:-10000px}.notice{padding:14px;background:#eff6fb;border-radius:9px;margin:16px 0}.error{color:#991b1b}h2{margin:4px 0 16px;font-size:24px}[hidden]{display:none!important}
</style></head><body>
<h2 id="heading">Send an enquiry</h2><p id="help">For urgent assistance call <a href="tel:+16047311000">604-731-1000</a>.</p>
<form id="enquiry"><input type="hidden" name="type"><input type="hidden" name="requestId"><input type="hidden" name="startedAt"><div class="trap" aria-hidden="true"><label>Leave empty<input name="website" tabindex="-1" autocomplete="off"></label></div><fieldset id="fields">
<label>Full name<input name="name" required maxlength="150" autocomplete="name"></label><label>Email<input name="email" required type="email" maxlength="254" autocomplete="email"></label><label>Phone (optional)<input name="phone" type="tel" maxlength="40" autocomplete="tel"></label>
<div id="quote" hidden><label>Address / site location<input name="address" maxlength="254" autocomplete="street-address"></label><label>Service<select name="service"><option>Plumbing</option><option>Heating / Boiler</option><option>Air Conditioning / HVAC</option><option>Drainage / Backflow</option><option>Gas Fitting</option><option>Maintenance Program</option><option>Other</option></select></label><label>Urgency<select name="urgency"><option>Routine quote</option><option>Within 24–48h</option><option>Emergency — please call now</option></select></label></div>
<div id="careers" hidden><label>Role (optional)<input name="role" maxlength="160"></label><label>Resume link (optional)<input name="resume_url" type="url" maxlength="2000" placeholder="https://…"></label></div>
<label><span id="message-label">Message</span><textarea name="message" required maxlength="5000"></textarea></label><div id="files"></div>
<label class="consent"><input type="checkbox" name="consent" value="yes" required><span>I agree to be contacted about this enquiry/application. <a href="https://www.alliedplumbing.ca/privacy/" target="_blank" rel="noopener">Privacy notice (opens in a new tab)</a>.</span></label>
</fieldset><button id="send" type="submit">Send enquiry</button></form>
<div id="result" role="status" aria-live="polite" tabindex="-1"></div><p><small>Keep your reference number. We reply within one business day; for urgent plumbing, heating or HVAC work call 604-731-1000 \u2014 24/7.</small></p>
<script>
var config=${encoded};
var form=document.getElementById('enquiry'),button=document.getElementById('send'),result=document.getElementById('result'),busy=false,locked=false;
var limits=config.type==='careers'?{count:1,max:5*1024*1024,accept:'.pdf'}:{count:config.type==='quote'?4:0,max:10*1024*1024,accept:'.pdf,.jpg,.jpeg,.png'};
form.elements.type.value=config.type;form.elements.startedAt.value=Date.now();form.elements.requestId.value=crypto.randomUUID();
document.getElementById(config.type==='careers'?'careers':'quote').hidden=config.type==='contact';
if(config.type==='careers'){document.getElementById('heading').textContent='Introduce yourself';document.getElementById('message-label').textContent='Experience and availability';form.elements.role.value=config.role;button.textContent='Submit application';}
if(config.type==='quote'){document.getElementById('heading').textContent='Tell us what you need';button.textContent='Send request';}
for(var i=0;i<limits.count;i++){var label=document.createElement('label');label.textContent=config.type==='careers'?'Resume PDF (optional, up to 5 MB)':'Attachment '+(i+1)+' (optional)';var input=document.createElement('input');input.type='file';input.name='file'+i;input.accept=limits.accept;label.append(input);document.getElementById('files').append(label);}
if(limits.count){var note=document.createElement('small');note.textContent=config.type==='careers'?'PDF only, up to 5 MB.':'Up to 4 PDF/JPG/PNG files, maximum 10 MB total. Files are emailed to the quote team and stored privately.';document.getElementById('files').append(note);}
var draftKey='allied:script-draft:'+config.type+':v1',allowed=['name','email','phone','address','service','urgency','role','resume_url','message'];
try{var draft=JSON.parse(sessionStorage.getItem(draftKey)||'null');if(draft && Date.now()-draft.savedAt<14400000 && draft.savedAt<=Date.now()){allowed.forEach(function(key){if(typeof draft.fields[key]==='string')form.elements[key].value=draft.fields[key];});if(draft.id)form.elements.requestId.value=draft.id;}else sessionStorage.removeItem(draftKey);}catch(e){}
if(config.role)form.elements.role.value=config.role;
function save(){if(locked)return;var fields={};allowed.forEach(function(key){fields[key]=form.elements[key].value;});try{sessionStorage.setItem(draftKey,JSON.stringify({savedAt:Date.now(),id:form.elements.requestId.value,fields:fields}));}catch(e){}}
form.addEventListener('input',save);form.addEventListener('change',save);window.addEventListener('pagehide',save);
function signal(event){window.top.postMessage({source:'allied-enquiry',token:config.token,type:config.type,event:event,height:Math.min(2400,document.body.scrollHeight+24)},'https://www.alliedplumbing.ca');}
new ResizeObserver(function(){signal('resize');}).observe(document.body);
function show(message,error){result.className='notice'+(error?' error':'');result.textContent=message;result.focus();if(result.animate){var reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;result.animate([{opacity:0,transform:reduced?'none':'translateY(6px)'},{opacity:1,transform:'none'}],{duration:reduced?100:180,easing:'cubic-bezier(0.23,1,0.32,1)'});}signal('resize');}
form.addEventListener('submit',function(e){e.preventDefault();if(busy||locked)return;var total=0;for(var i=0;i<limits.count;i++){var file=form.elements['file'+i].files[0];if(file){total+=file.size;if(!(config.type==='careers'?/\\.pdf$/i:/\\.(pdf|jpg|jpeg|png)$/i).test(file.name)){show('Choose a supported file type.',true);return;}}}if(total>limits.max){show(config.type==='careers'?'Resume must be no larger than 5 MB.':'Attachments must total no more than 10 MB.',true);return;}
save();busy=true;button.disabled=true;form.setAttribute('aria-busy','true');result.textContent='Sending…';
google.script.run.withSuccessHandler(function(reply){busy=false;form.removeAttribute('aria-busy');if(reply && reply.ok===true && reply.id){locked=true;try{sessionStorage.removeItem(draftKey);}catch(e){}form.hidden=true;show('Your request has been received by our enquiry system. Reference: '+reply.id+(config.type==='quote'?'. The team will review the details you provided. If the situation is urgent or changes before you hear from us, call 604-731-1000.':'. For urgent assistance call 604-731-1000.'),false);signal('success');}else if(reply && reply.stored){locked=true;document.getElementById('fields').disabled=true;show(reply.message,true);signal('stored');}else{button.disabled=false;document.getElementById('fields').disabled=false;show('The service did not confirm acceptance. Your details are preserved. Please try again or call.',true);signal('error');}}).withFailureHandler(function(){busy=false;button.disabled=false;document.getElementById('fields').disabled=false;form.removeAttribute('aria-busy');show('Submission could not be confirmed. Your details and selected files remain here. Retry the same request or call 604-731-1000.',true);signal('error');}).submitEnquiry(form);
});
form.addEventListener('focusin',function first(){signal('start');form.removeEventListener('focusin',first);});
</script></body></html>`;
}
