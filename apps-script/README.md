# Allied enquiry backend — deployment package

Status: backend version 4 deployed on 2026-11-01; **frontend activation authorized by the owner**. `src/lib/enquiry-config.json` points to the deployed endpoint. Production verification follows deployment.

## Fixed routing and file policy

| Type | Recipient | Attachments | Private Drive retention |
|---|---|---|---|
| Contact | alex@allied-plumbing.ca | None | 180 days |
| Quote | alex@allied-plumbing.ca | Up to four PDF/JPG/PNG; 10 MB total | 180 days |
| Careers | alex@allied-plumbing.ca | One PDF; 5 MB | 90 days |

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

Do not add logging of form contents. Monitor Apps Script execution failures and account quota/storage. Maintain the owner account and review Google quota changes. Revoking the grant breaks submissions; the site retains phone/email fallback links.

Sources: https://developers.google.com/apps-script/guides/html/communication ; https://developers.google.com/apps-script/advanced/drive ; https://developers.google.com/apps-script/guides/services/quotas .

Version 3 uses display references `ddMMyy-HHmmss-XXXX` in America/Vancouver time, with a four-character UUID suffix. The full UUID remains the internal deduplication key. Stored references are reused on retry; old records retain their previous references.

Temporary routing requested by the owner: all three backend routes send notifications to alex@allied-plumbing.ca. Public Contact/Quote/Careers addresses and form labels remain unchanged.

Version 4 fixture accepted for temporary Alex routing: 011126-074258-AF2F. Mail service accepted notification; actual inbox receipt not yet confirmed for this new destination.
