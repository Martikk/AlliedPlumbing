import { test, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

// Exercise the production submission code with a fake provider; never contact a real inbox.
const source = readFileSync('src/lib/forms.ts', 'utf8').replace("import { FORMSPREE_ENDPOINT } from '../config';", "const FORMSPREE_ENDPOINT = 'https://example.test/forms';");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const { sendEnquiry } = await import('data:text/javascript;base64,' + Buffer.from(compiled).toString('base64'));
const originalFetch = globalThis.fetch;
afterEach(() => { globalThis.fetch = originalFetch; });

test('only explicit provider acceptance resolves and preserves form payload', async () => {
  const data = new FormData(); data.set('message', 'Fixture enquiry');
  globalThis.fetch = async (url, options) => {
    assert.equal(url, 'https://example.test/forms');
    assert.equal(options.method, 'POST'); assert.equal(options.body, data);
    assert.equal(options.headers.Accept, 'application/json');
    return Response.json({ ok: true });
  };
  await sendEnquiry(data);
});
test('HTTP 500 cannot produce a successful submission', async () => {
  globalThis.fetch = async () => Response.json({ ok: true }, {status:500});
  await assert.rejects(sendEnquiry(new FormData()), /could not be sent/);
});
test('static hosting fallback HTML 200 cannot produce success', async () => {
  globalThis.fetch = async () => new Response('<html>App shell</html>', {headers:{'Content-Type':'text/html'}});
  await assert.rejects(sendEnquiry(new FormData()), /could not be sent/);
});
test('JSON without a positive acknowledgement cannot produce success', async () => {
  globalThis.fetch = async () => Response.json({ok:false});
  await assert.rejects(sendEnquiry(new FormData()), /could not be sent/);
});
test('rate limit gives a specific recovery message', async () => {
  globalThis.fetch = async () => Response.json({}, {status:429});
  await assert.rejects(sendEnquiry(new FormData()), /wait a moment/);
});
test('network failure rejects without clearing user data', async () => {
  const data = new FormData(); data.set('message', 'Keep this text');
  globalThis.fetch = async () => { throw new TypeError('Failed to fetch'); };
  await assert.rejects(sendEnquiry(data));
  assert.equal(data.get('message'), 'Keep this text');
});
