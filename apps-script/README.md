# Allied enquiry backend — deployment package

Status: backend version 9 deployed on 2026-11-24 from this repository with `npm run deploy:backend`; **frontend activation authorized by the owner**. `src/lib/enquiry-config.json` points to the deployed endpoint, and `npm run check:backend` confirms it answers JSON and validates server-side.

## Releasing a change to this backend

The code here is NOT live until a new deployment VERSION is released. Saving in
the editor is not releasing, and that gap is how the repository and the
deployment drifted apart on 2026-11-22: the site served the native form while
the deployment had no `doPost`, so every enquiry failed.

Project: https://script.google.com/home/projects/1F1iTfQ5foQPXxREF3MZ5aLGmIpxiHX-OnnlTztkP3LHfgOko9gobVvQt/edit

1. Open the project and select the file **Code.gs** in the file list on the
   left. Select all, paste `apps-script/Code.gs` over it, and **save** — Apps
   Script has no autosave.
2. Check the paste landed before deploying: the function dropdown beside Run
   must list exactly **doGet, doPost, submitEnquiry**. Helpers end in `_` and
   never appear there. No `doPost` means the file was not saved, or the paste
   went into a different file. There must be exactly ONE file holding these
   functions — all `.gs` files share one global scope, so a second copy
   silently overrides the first.
3. **Deploy → Manage deployments**. Confirm this is the deployment the site
   uses: its Web app URL must end with the same `AKfycb…` segment as
   `appsScriptUrl` in `src/lib/enquiry-config.json`. Today that is
   `AKfycbzY-CmGdtjp9EWttkl0-4q_vrWWFLwEQFWOyFejKxZ4RX9KDaONZyQzSYVjRaicAAApLQ`.
4. Pencil (Edit) → **Version: New version** → **Deploy**. Leaving the dropdown
   on the existing version deploys nothing new. Editing the existing
   deployment keeps the `/exec` URL, so the site needs no change; creating a
   NEW deployment gives a new URL the site does not know about.
5. Verify from the repository: `npm run check:backend`. It posts a payload that
   `checked_()` rejects on its first line, so it stores nothing and emails
   nobody, and it reports which of the two failures you have if it fails.

### When the console has not worked

If the `/exec` URL still serves old code after a release, the deployment that
was edited is probably not the one the site calls. Nothing in the console shows
that at a glance, so list them:

```
npx --yes @google/clasp@3.4.x login     # once per machine
npm run backend:deployments
```

The script id is already in `.clasp.json`. The listing gives every deployment
with its id and version; the site calls the one whose id matches the `AKfycb…`
segment in `src/lib/enquiry-config.json`. Then either release to that id with
`npm run deploy:backend`, or point the site at the deployment that is current.

The CLI is `@google/clasp`. The unscoped `clasp` on npm is a 1.0.0 stub that
calls itself an alias and has no 2.x, so `clasp@2` — which this repository used
to tell people to run — is a 404.

`npm run deploy:backend` does steps 1–5 in one command once `clasp` is set up.

### Changing the manifest

`appsscript.json` here is AUTHORITATIVE: `clasp push --force` replaces the
project's manifest with this file, so anything missing from it is deleted from
the live project. On 2026-11-22 this file carried no `webapp` block, the push
dropped `executeAs` and `access` from the project, and both deployments began
answering `404 Sorry, unable to open the file at this time` — the project was
no longer a web app a visitor could reach. The form was down until the block
was restored and a new version released.

`tests/apps-script.test.mjs` now asserts `webapp.executeAs` is
`USER_DEPLOYING` and `webapp.access` is `ANYONE_ANONYMOUS`, which is what lets
a visitor post without a Google login. Before pushing a manifest change, run
`npm test`.

In the console, `appsscript.json` is only editable when the manifest is shown:
Project Settings → "Show appsscript.json manifest file in editor". Adding an
OAuth scope means Google asks the owner to re-authorize on the next run, so
expect a consent screen. `script.external_request` was added for Turnstile
verification; because `turnstileOK_` returns early while no `TURNSTILE_SECRET`
is set, an ungranted scope would not show up until the secret exists. When you
set it, check Executions for `Turnstile verification failed open` — that line
means the scope was never granted and tokens are being accepted unverified.

## Fixed routing and file policy

| Type | Recipient | Attachments | Private Drive retention |
|---|---|---|---|
| Contact | alex@allied-plumbing.ca | None | 180 days |
| Quote | alex@allied-plumbing.ca | Up to four PDF/JPG/PNG; 10 MB total | 180 days |
| Careers | alex@allied-plumbing.ca | One PDF; 5 MB | 90 days |

Every accepted enquiry sends two emails: the notification to the fixed
recipient above, with attachments, and an acknowledgement to the address the
sender gave. The acknowledgement carries only the reference and the route's
noun — never the name, the message, the site address or any other typed text.
That is a security rule, not a style one: it goes to an address the sender
chose, so echoing their text would let someone put a stranger's address in the
email field and the payload in the message field and have this domain deliver
it. `tests/apps-script.test.mjs` submits a real enquiry through the backend and
asserts none of the fixture's own words appear in that second mail.

The acknowledgement runs after the request is stored and Allied is notified,
inside its own try/catch. It can never turn a delivered enquiry into a reported
failure — a bounced courtesy copy costs nothing, while telling someone their
enquiry failed costs the enquiry or gets it sent twice. Because there are now
two sends per enquiry, the quota gate requires room for both
(`getRemainingDailyQuota() < 2`); on a free Google account the 100-mail daily
limit, not the 60-enquiry reserve, is what binds first.

Files are validated for extension, declared MIME and signature. This is not a malware scanner. Email copies are delivered to the fixed recipients; Drive folders remain private to the deploying owner. No public links or Drive permission grants are created. The cleanup trigger moves expired request folders to Trash, not permanent deletion. Copies in mailboxes/backups follow their own retention policy.

The service reserves up to 60 attempts/day and limits per-email/global bursts. Free Google account quotas and storage capacity still apply. Anyone can access the public form; code does not accept client-supplied recipient addresses. No no-cors fetch is used. HTML Service performs the upload and explicit acknowledgement through google.script.run.

## Review and deployment

Prepared Google project: https://script.google.com/home/projects/1F1iTfQ5foQPXxREF3MZ5aLGmIpxiHX-OnnlTztkP3LHfgOko9gobVvQt/edit . Code.gs and the manifest were saved in Chrome. Owner setup completed successfully. The temporary ownerSetup wrapper was removed before deployment; only doGet and submitEnquiry remain public. Version 2 fixes premature fieldset disabling during asynchronous form serialization.

1. Rename project Allied Website Enquiries. Paste Code.gs. Enable the manifest in Project Settings and replace appsscript.json with this package. Advanced Drive v3 must be enabled; use the default Apps Script Cloud project or explicitly enable its Drive API.
2. Review the exact OAuth grant before approving: drive.file (only app-created/selected files), script.send_mail (send email, no inbox reading), script.scriptapp (daily cleanup trigger). Temporarily append `function ownerSetup(){ setup_(); }` and run ownerSetup from the owner editor after approval; private underscore functions do not appear in the run dropdown. Confirm three private root folders and one cleanup trigger. Then replace Code.gs with the exact local file to remove ownerSetup, save, and verify the public function list contains only doGet and submitEnquiry. Do not publish under an unintended/personal account without considering where applications will be stored.
3. Deploy versioned Web App as the owner, accessible to Anyone (visitors must not need Google login). This exposes only doGet and submitEnquiry; helper/setup/cleanup functions end in underscore and cannot be called through google.script.run.
4. Test the deployed /exec in a logged-out browser. Test PDF upload, wrong file/MIME, size limits, repeated clicks/retry, email failure ambiguity, archive failure, and recovery messages. Do not enable the frontend if Google requires every visitor to authenticate.
5. Send three clearly labelled fixture enquiries to the fixed business recipients. Verify each actual inbox and corresponding private record/attachment; provider acceptance alone is not delivery evidence. MailApp cannot prove inbox delivery. If an outcome is ambiguous, a stored reference is shown and notification is not automatically resent.
6. Update the Privacy page to describe Google processing, email copies and retention. Put the verified /exec URL into src/lib/enquiry-config.json; build/test/preview then push main. Until then, leave the config empty.
7. Verify all three forms on production, including mobile iframe height, external-open/email fallback, draft restoration, file privacy and consent. Parent analytics receives only nonce-bound type/event messages, never field contents, filenames or resume URLs.

## Deployment verification

Endpoint: https://script.google.com/macros/s/AKfycbzY-CmGdtjp9EWttkl0-4q_vrWWFLwEQFWOyFejKxZ4RX9KDaONZyQzSYVjRaicAAApLQ/exec

Quote fixture without attachments was accepted: 9f397ea1-7a84-4cc6-86ea-a1d5d8f5c217. Contact accepted: d69c4f19-a39e-4418-a564-0689b0496c25. Careers accepted: 7f59be33-0223-44d0-8a75-245743cd1a86. All three fixtures were clearly labelled TEST ONLY and contained no applicant data. The user confirmed delivery of all three fixture emails to their business inboxes. Anonymous visitor access and PDF upload remain unverified. Browser file chooser automation timed out; do not treat that as a successful upload. The owner explicitly requested production activation on 2026-11-01; PDF inbox receipt and anonymous visitor access remain verification follow-ups. Privacy text switches to Google processing with this config.

## Operational recovery

A request folder contains request.json, attachments and appProperties.state. `notified` means MailApp accepted the notification; `sending`/`stored` means manual notification review may be needed. Do not resend blindly. Recent request IDs map directly to folder IDs in Script Properties so retries do not depend on Drive search indexing. LockService serializes writes/sends. Changed content under an already-stored ID is rejected rather than falsely acknowledged.

A notification can be accepted by Google and still never be read. On 2026-11-23
the test enquiry 231126-001149-CC3A sent both mails one second apart, neither
bounced, and the notification was sitting in the business mailbox's Spam folder
while the acknowledgement was in its inbox. MailApp sends from the deploying
owner's personal Google address, which is not the recipient's domain, so the
business mailbox has to be told to trust that sender: mark one notification
"not spam" AND add the sender to its allowed senders. Until that is done every
enquiry notification can be filed as spam — the enquiry is stored, the sender
is thanked, and nobody at Allied ever sees it. The acknowledgement is no
substitute: by design it carries no enquiry details at all. (That test was the
worst case for a filter, because the fixture's own email was the business
address, so `To` and `Reply-To` were the mailbox's own address while `From` was
not. A real enquiry comes from a stranger and lacks that signal.)

Do not add logging of form contents. Monitor Apps Script execution failures and account quota/storage. Maintain the owner account and review Google quota changes. Revoking the grant breaks submissions; the site retains phone/email fallback links.

Sources: https://developers.google.com/apps-script/guides/html/communication ; https://developers.google.com/apps-script/advanced/drive ; https://developers.google.com/apps-script/guides/services/quotas .

Version 3 uses display references `ddMMyy-HHmmss-XXXX` in America/Vancouver time, with a four-character UUID suffix. The full UUID remains the internal deduplication key. Stored references are reused on retry; old records retain their previous references.

Temporary routing requested by the owner: all three backend routes send notifications to alex@allied-plumbing.ca. Public Contact/Quote/Careers addresses and form labels remain unchanged.

Version 4 fixture accepted for temporary Alex routing: 011126-074258-AF2F. Mail service accepted notification; actual inbox receipt not yet confirmed for this new destination.

Version 5 updates the Quote acknowledgement copy; routing, scopes, file limits and deduplication are unchanged.

Version 6 was the first release pushed from this repository rather than pasted
into the console. It is also the version that proved `push --force` replaces
the manifest: it shipped without the `webapp` block and took the web app
offline. Version 7 restored the block. Routing, file limits and deduplication
are unchanged from version 5; the only code difference is `doPost`, the JSON
endpoint the site's native form posts to, and `turnstileOK_`.

Version 8 adds the acknowledgement to the sender. Until then the thank-you page
told every visitor "A copy is on its way to your inbox" while nothing was ever
sent to them — the one MailApp call went to the business route, with the
sender's address only as replyTo. The owner chose to send the copy rather than
drop the promise. Routing, file limits, retention and deduplication are
unchanged.

Version 9 cleans up the notification Allied reads. It printed every field,
filled or not, and claimed "Attachments are included in this email" whether or
not any were attached — the same kind of untruth as the thank-you page's
promised email, in the one mail the business actually relies on. Empty fields
are now omitted and attachments are named only when they exist. Nothing about
routing, retention, validation or the acknowledgement changed.
