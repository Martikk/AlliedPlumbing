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
