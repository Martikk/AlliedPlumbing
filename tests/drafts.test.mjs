import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
const source = ts.transpileModule(readFileSync('src/lib/form-draft-data.ts','utf8'), {compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {decodeDraft,draftValues,DRAFT_LIFETIME_MS} = await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
test('drafts preserve useful fields without storing files or consent',()=>{
 const values=draftValues([['name','Example'],['message','Long request'],['consent','yes'],['attachments',new Blob(['private'])],['password','secret'],['role','Service Technician']]);
 assert.deepEqual(values,{name:'Example',message:'Long request',role:'Service Technician'});
});
test('expired, malformed and future drafts are rejected',()=>{
 assert.equal(decodeDraft('{broken'),null);
 assert.equal(decodeDraft(JSON.stringify({savedAt:1,values:{name:'Example'}}),DRAFT_LIFETIME_MS+2),null);
 assert.equal(decodeDraft(JSON.stringify({savedAt:100,values:{name:'Example'}}),90),null);
 assert.deepEqual(decodeDraft(JSON.stringify({savedAt:100,values:{message:'Preserve text',consent:'yes'}}),110),{message:'Preserve text'});
});
