#!/usr/bin/env node
/**
 * The enquiry backend contract check.
 *
 * The site's form POSTs JSON to the Apps Script web app. That script is
 * deployed by hand from the Apps Script console, so it can silently fall
 * behind the repository: on 2026-11-22 the live site served the native form
 * while the deployed script still had no `doPost`, and every enquiry failed.
 * Nothing caught it, because nothing was looking.
 *
 * This looks. It sends a deliberately invalid payload — no consent, no
 * request id, no fill time — which `checked_()` rejects before it touches
 * Drive or sends mail. So this creates nothing and notifies nobody; it only
 * establishes that the endpoint speaks JSON.
 *
 *   PASS  the endpoint answers JSON (deployed, contract intact)
 *   FAIL  anything else, and the reason matters more than the failure
 *
 * There are three failures, they look alike from the outside, and each needs a
 * different fix:
 *
 *   404 / "unable to open the file"  -> the project is not a reachable web app
 *                                       at all. appsscript.json lost its
 *                                       `webapp` block, or the deployment's
 *                                       access setting changed.
 *   "Script function not found"      -> reachable, but running code without
 *                                       doPost
 *   other HTML                       -> reachable, running something else
 *
 * For the last two it also GETs the same URL. doGet renders the fallback form
 * from the SAME source file, so a sentence that only the current Code.gs
 * contains tells us which code the deployment is actually running, which
 * splits "saved but never released" from "the editor never got the file". The
 * marker is read out of Code.gs, never hard-coded, so it cannot drift. It is
 * NOT consulted on a 404: with nothing serving the form, its absence would
 * read as "old code" and send you to fix the wrong thing. That is not
 * hypothetical — it is what this script did on 2026-11-23.
 *
 * Run it with `npm run check:backend`. It is part of `npm run test:production`
 * and runs in CI after every push.
 */
import { readFileSync } from 'node:fs';

const { appsScriptUrl } = JSON.parse(readFileSync('src/lib/enquiry-config.json', 'utf8'));

if (!/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(appsScriptUrl)) {
  console.error('x  src/lib/enquiry-config.json does not hold a valid Apps Script /exec URL.');
  process.exit(1);
}

/** Which code is the deployment running? doGet renders the fallback form from
 *  the same file, so a sentence only the current Code.gs carries is a reliable
 *  version marker. Returns the next step in words, because the two causes look
 *  identical from the POST alone and need different fixes. */
async function deployedCodeAge() {
  const source = readFileSync('apps-script/Code.gs', 'utf8');
  const found = source.match(/Keep your reference number\.\s*([^<]{20,200}?)<\/small>/);
  if (!found) return 'Fix: Apps Script -> Deploy -> Manage deployments -> New version.';

  // The template stores \u2014 escapes as literal text; the browser gets the
  // character. Decode so the comparison is against what is actually served.
  const marker = found[1]
    .trim()
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));

  let served;
  try {
    const page = await fetch(`${appsScriptUrl}?type=quote`, {
      redirect: 'follow',
      signal: AbortSignal.timeout(60000),
    });
    served = await page.text();
  } catch {
    return 'Fix: Apps Script -> Deploy -> Manage deployments -> New version.';
  }

  return served.includes(marker)
    ? 'The deployment IS running the current Code.gs, so the file was saved but\n' +
        '   never released. Fix: Deploy -> Manage deployments -> pencil ->\n' +
        '   Version: New version -> Deploy. The /exec URL does not change.'
    : 'The deployment is running OLDER code than apps-script/Code.gs — it still\n' +
        '   serves the previous form text. So the editor never received the new\n' +
        '   file, or a new deployment was created and this /exec URL is not it.\n' +
        '   Paste apps-script/Code.gs over Code.gs in the editor, save, then\n' +
        '   Deploy -> Manage deployments -> pencil -> Version: New version.';
}

// Rejected by checked_() on the first line: no consent, no request id.
const probe = JSON.stringify({ type: 'quote', name: '', email: '', message: '', consent: '' });

let response;
try {
  response = await fetch(appsScriptUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: probe,
    redirect: 'follow',
    signal: AbortSignal.timeout(60000),
  });
} catch (error) {
  console.error(`x  Could not reach the enquiry backend: ${error.message}`);
  process.exit(1);
}

const body = await response.text();

let parsed = null;
try {
  parsed = JSON.parse(body);
} catch {
  console.error('\nx  The enquiry backend is NOT accepting submissions.');
  console.error('   Every enquiry submitted on the live site is failing right now.\n');

  // A 404, or Drive's "unable to open the file" page, means nothing is serving
  // this URL — so the version check below would be reading an error page and
  // would blame the code instead of the configuration.
  if (response.status === 404 || /unable to open the file/i.test(body)) {
    console.error(`   HTTP ${response.status}: the URL is not a reachable web app.`);
    console.error('   The deployment exists but is not published to visitors. Usually');
    console.error('   apps-script/appsscript.json lost its `webapp` block — `clasp push');
    console.error('   --force` REPLACES the project manifest, so a block missing here is');
    console.error('   deleted there, and the web app stops accepting anyone. Run `npm');
    console.error('   test` (tests/apps-script.test.mjs asserts that block), then');
    console.error('   `npm run deploy:backend`.\n');
    process.exit(1);
  }

  console.error(
    /Script function not found:\s*doPost/i.test(body)
      ? '   The deployed Apps Script has no doPost. apps-script/Code.gs in this\n' +
          '   repository has one, so the deployment is behind the repository.'
      : '   It answered HTML instead of JSON, so it is not running the code in\n' +
          '   apps-script/Code.gs.',
  );
  console.error(`   ${await deployedCodeAge()}\n`);
  console.error('   Or run: npm run deploy:backend\n');
  process.exit(1);
}

// The contract: a JSON object, and for an invalid payload, ok:false with a
// message the form can show. ok:true here would mean validation is not running.
if (typeof parsed !== 'object' || parsed === null) {
  console.error(`x  The backend answered JSON but not an object: ${body.slice(0, 120)}`);
  process.exit(1);
}
if (parsed.ok === true) {
  console.error('x  The backend accepted a payload with no consent and no request id.');
  console.error('   Server-side validation is not running. Check checked_() in Code.gs.');
  process.exit(1);
}
if (typeof parsed.message !== 'string' || !parsed.message) {
  console.error(`x  The backend rejected the probe without a message: ${body.slice(0, 160)}`);
  process.exit(1);
}

console.log('Enquiry backend OK — deployed, speaking JSON, and validating server-side.');
console.log(`   Rejected the probe with: "${parsed.message.slice(0, 90)}"`);
