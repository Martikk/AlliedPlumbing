import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

/** Audit H-01 — the enquiry form's field matrix and validation.
 *
 * The form replaced a cross-origin iframe nobody could test. These assertions
 * are the audit's own field table, so a future edit cannot quietly drop a
 * required field or show a tender date to someone booking a service call. */

async function loadEnquiry() {
  // The module imports JSON and site-links; stub them so this stays a unit
  // test of the rules rather than a build.
  const source = readFileSync('src/lib/enquiry.ts', 'utf8')
    .replace("import config from './enquiry-config.json';", "const config = { appsScriptUrl: '' };")
    .replace(
      "import { SERVICE_LINKS, type ServiceKey } from './site-links';",
      "const SERVICE_LINKS = [{ key: 'boilers', label: 'Heating and boiler plants' }];",
    );
  const js = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  return import('data:text/javascript;base64,' + Buffer.from(js).toString('base64'));
}

const base = {
  enquiryType: 'quote',
  name: '',
  organisation: '',
  email: '',
  phone: '',
  propertyType: '',
  service: '',
  address: '',
  urgency: '',
  tenderClosing: '',
  message: '',
  consent: false,
};

test('the field matrix matches the audit table', async () => {
  const { shows } = await loadEnquiry();
  const on = type => ({ ...base, enquiryType: type });

  // Service and site address: Quote and Service only.
  for (const type of ['quote', 'service']) {
    assert.ok(shows.service(on(type)), `service should show for ${type}`);
    assert.ok(shows.address(on(type)), `address should show for ${type}`);
  }
  for (const type of ['maintenance', 'tender', 'other']) {
    assert.ok(!shows.service(on(type)), `service should not show for ${type}`);
    assert.ok(!shows.address(on(type)), `address should not show for ${type}`);
  }

  // Urgency: Service only. Tender closing date: Tender only.
  assert.ok(shows.urgency(on('service')));
  assert.ok(!shows.urgency(on('quote')));
  assert.ok(shows.tenderClosing(on('tender')));
  assert.ok(!shows.tenderClosing(on('service')));

  // Attachments: Tender and Quote.
  assert.ok(shows.files(on('tender')));
  assert.ok(shows.files(on('quote')));
  assert.ok(!shows.files(on('service')));

  // Organisation: everything except residential.
  assert.ok(shows.organisation({ ...base, propertyType: 'school' }));
  assert.ok(!shows.organisation({ ...base, propertyType: 'residential' }));
});

test('validation requires what the audit marks required', async () => {
  const { validate } = await loadEnquiry();

  const empty = validate(base, []);
  for (const field of ['name', 'email', 'propertyType', 'message', 'consent']) {
    assert.ok(empty[field], `${field} should be required on every enquiry`);
  }

  // Phone is required only for a service call — dispatch cannot use email.
  assert.ok(!validate({ ...base, enquiryType: 'quote' }, []).phone);
  assert.ok(validate({ ...base, enquiryType: 'service' }, []).phone);

  // A hidden field is never required.
  assert.ok(!validate({ ...base, enquiryType: 'other' }, []).service);
  assert.ok(!validate({ ...base, enquiryType: 'other' }, []).address);
  assert.ok(validate({ ...base, enquiryType: 'quote' }, []).service);
  assert.ok(validate({ ...base, enquiryType: 'tender' }, []).tenderClosing);

  assert.ok(validate({ ...base, email: 'not-an-email' }, []).email);
  // A header-injection attempt must not pass as an address.
  assert.ok(validate({ ...base, email: 'a@b.co\nBcc: x@y.z' }, []).email);

  const complete = {
    ...base,
    name: 'Jordan Reyes',
    email: 'jordan@example.test',
    propertyType: 'school',
    service: 'boilers',
    address: '1 School Road, Burnaby',
    message: 'Boiler plant replacement over the summer break.',
    consent: true,
  };
  assert.deepEqual(validate(complete, []), {});
});

test('attachment limits match the Apps Script route config', async () => {
  const { validate, MAX_FILES, MAX_TOTAL_BYTES } = await loadEnquiry();
  assert.equal(MAX_FILES, 4);
  assert.equal(MAX_TOTAL_BYTES, 10 * 1024 * 1024);

  const file = (size, type = 'application/pdf') => ({ size, type, name: 'x.pdf' });
  const valid = {
    ...base,
    name: 'A',
    email: 'a@b.co',
    propertyType: 'school',
    service: 'boilers',
    address: 'x',
    message: 'x',
    consent: true,
  };
  assert.ok(validate(valid, Array.from({ length: 5 }, () => file(10))).files, 'too many files');
  assert.ok(validate(valid, [file(11 * 1024 * 1024)]).files, 'over the size cap');
  assert.ok(validate(valid, [file(10, 'application/zip')]).files, 'unsupported type');
  assert.ok(!validate(valid, [file(10), file(10, 'image/png')]).files, 'PDF and PNG are fine');
});

test('Turnstile is inert until a site key exists', async () => {
  // It must be possible to ship this before the Cloudflare account exists:
  // with no key, nothing renders, the script is never fetched, and the
  // honeypot plus minimum fill time remain the spam controls.
  const config = JSON.parse(readFileSync('src/lib/enquiry-config.json', 'utf8'));
  assert.equal(typeof config.turnstileSiteKey, 'string');

  const source = readFileSync('src/lib/turnstile.ts', 'utf8');
  assert.match(source, /if \(!turnstileConfigured\(\)\) return null;/);
  assert.ok(
    !source.includes('document.head.append(script)') ||
      source.indexOf('turnstileConfigured') < source.indexOf('document.head.append(script)'),
    'the script must only be fetched after the key check',
  );

  // No secret-bearing FIELD may hold a value here. (The file documents where
  // the secret does live, so the word itself is expected in the prose.)
  for (const [key, value] of Object.entries(config)) {
    if (key.startsWith('_')) continue;
    assert.ok(
      !/secret|private|password|token/i.test(key) || !value,
      `enquiry-config.json must not carry ${key}`,
    );
  }
});

test('Turnstile never blocks a submit it cannot complete', async () => {
  const form = readFileSync('src/components/EnquiryForm.tsx', 'utf8');
  // A missing token is passed through as null; the server decides. Cloudflare
  // being unreachable must not cost Allied the enquiry.
  assert.match(form, /\(await turnstile\.current\?\.token\(\)\) \?\? null/);

  const source = readFileSync('src/lib/turnstile.ts', 'utf8');
  assert.match(source, /setTimeout\(/, 'the token promise needs a timeout');

  const backend = readFileSync('apps-script/Code.gs', 'utf8');
  assert.match(backend, /if \(!secret\) return true;/, 'no secret means no opinion');
  assert.match(backend, /return true;\s*\/\/ fail open on an outage/, 'fail open on an outage');
  assert.match(backend, /body\.success === true/, 'the token must actually be verified');
});

test('a failed submit always offers the email route', async () => {
  const form = readFileSync('src/components/EnquiryForm.tsx', 'utf8');
  // Deliberately unconditional. Gating this on a recognised "backend" failure
  // was verified against the real broken deployment and did not fire: Apps
  // Script serves its "Script function not found" page WITHOUT CORS headers,
  // so the browser cannot read the response and the failure arrives as a
  // network error. The one case it was built for was the one case it missed.
  assert.match(
    form,
    /setEscapeHatch\(mailtoFor\(values, files, EMAIL_QUOTE\)\);/,
    'the escape hatch must not be gated on the failure kind',
  );

  const { mailtoFor } = await loadEnquiry();
  const href = mailtoFor(
    { ...base, enquiryType: 'quote', name: 'A Person', email: 'a@b.co', message: 'Boiler plant.' },
    [],
    'quote@allied-plumbing.ca',
  );
  assert.match(href, /^mailto:quote@allied-plumbing\.ca\?subject=/);
  const body = decodeURIComponent(href.split('&body=')[1]);
  for (const expected of ['A Person', 'a@b.co', 'Boiler plant.']) {
    assert.ok(body.includes(expected), `the mail body must carry ${expected}`);
  }
});
