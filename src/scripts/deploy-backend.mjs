#!/usr/bin/env node
/**
 * Deploy apps-script/ to the live Apps Script web app, in one command.
 *
 * The enquiry backend used to be deployed by hand from the Apps Script
 * console, which is how the repository and the deployment drifted apart
 * without anyone noticing. This closes that gap: the code in this repository
 * becomes the deployed code, and the result is verified before the script
 * exits.
 *
 *   npm run deploy:backend
 *
 * It updates the EXISTING deployment, so https://script.google.com/.../exec
 * stays the same and nothing in the site has to change. The deployment id is
 * read straight out of that URL — the `AKfycb…` segment is the deployment id —
 * so there is nothing to keep in sync by hand.
 *
 * One-time setup (per machine):
 *   1. npx clasp@2 login
 *   2. Put the script id in .clasp.json (gitignored) or APPS_SCRIPT_ID:
 *        { "scriptId": "<id>", "rootDir": "apps-script" }
 *      Find it in the Apps Script console under Project Settings.
 *
 * In CI, set APPS_SCRIPT_ID and CLASPRC_JSON (the contents of ~/.clasprc.json)
 * as secrets.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const { appsScriptUrl } = JSON.parse(readFileSync('src/lib/enquiry-config.json', 'utf8'));
const deploymentId = appsScriptUrl.match(/\/macros\/s\/([A-Za-z0-9_-]+)\/exec$/)?.[1];

if (!deploymentId) {
  console.error('x  Could not read a deployment id from src/lib/enquiry-config.json.');
  process.exit(1);
}

let scriptId = process.env.APPS_SCRIPT_ID;
if (!scriptId && existsSync('.clasp.json')) {
  scriptId = JSON.parse(readFileSync('.clasp.json', 'utf8')).scriptId;
}

if (!scriptId) {
  console.error(`
x  No Apps Script id.

   The deployment id is known (${deploymentId}) — it comes from the /exec URL.
   The SCRIPT id is a different id. It is in the project link at the top of
   apps-script/README.md, and in the Apps Script console under Project
   Settings. It is not a credential — reaching the project still needs the
   owner's Google account — but .clasp.json stays gitignored anyway. Then:

     echo '{"scriptId":"<id>","rootDir":"apps-script"}' > .clasp.json
     npx clasp@2 login
     npm run deploy:backend

   .clasp.json is gitignored. In CI, set APPS_SCRIPT_ID instead.
`);
  process.exit(1);
}

// clasp reads .clasp.json from the working directory; write it from the
// environment when CI supplied the id that way.
if (!existsSync('.clasp.json')) {
  writeFileSync('.clasp.json', JSON.stringify({ scriptId, rootDir: 'apps-script' }, null, 2));
  console.log('Wrote .clasp.json from APPS_SCRIPT_ID.');
}

function run(step, args) {
  console.log(`\n→ ${step}`);
  try {
    execFileSync('npx', ['--yes', 'clasp@2', ...args], { stdio: 'inherit' });
  } catch {
    console.error(`\nx  ${step} failed. If this is an auth error, run: npx clasp@2 login`);
    process.exit(1);
  }
}

run('Pushing apps-script/ to the script project', ['push', '--force']);
run('Updating the live deployment', [
  'deploy',
  '--deploymentId',
  deploymentId,
  '--description',
  `repo ${new Date().toISOString().slice(0, 10)}`,
]);

console.log('\n→ Verifying the deployment answers the contract');
try {
  execFileSync('node', ['src/scripts/check-backend.mjs'], { stdio: 'inherit' });
} catch {
  console.error('\nx  Deployed, but the endpoint still is not answering JSON. Check the logs above.');
  process.exit(1);
}

console.log('\nDone. The live form is posting to the code in this repository.');
