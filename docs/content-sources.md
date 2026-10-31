# Sources and publication decisions

Updated 31 October 2026.

Source: Allied Plumbing - Maple Ridge & Pitt Meadows - RFPQ.docx, submission dated 17 January 2025, supplied by the site owner. Project scopes come from section 2.6; completion years for Garibaldi (2023), Ridgeview (2022) and Herbert Spencer (2021) come from section 3.4. Management roles and profiles also use the five supplied CV images.

## Projects

The public catalogue and detail pages share src/data/projects.json. Seven documented projects are included: Garibaldi Highlands Elementary, Ridgeview Elementary, Leigh Elementary, Herbert Spencer Elementary, Howe Sound Secondary, Miller Park Community School, and 1755 Haro Street.

- Garibaldi is in Squamish, not Maple Ridge; it is an elementary school, not Garibaldi Secondary.
- Ridgeview includes six IBC boilers and 12 classroom conversions.
- Haro is a Viessmann CA3 2.5 million BTU condensing plant, not a generic tank/tankless DHW replacement.
- Completion years absent from the supplied descriptions are omitted.
- Budgets, named reference contacts, direct reference emails and staffing numbers are omitted. The source has inconsistent Garibaldi project values and some staffing ranges vary across sections.
- No savings percentages, guaranteed outcomes or unverified project photos are added. The owner subsequently requested restoration of existing Cloudinary media. The supplied Allied folder was inspected in Chrome; existing library images are now used. Case images carry a general Allied media-library caption rather than claiming an independently verified site location.

## Team

The homepage, About and Team pages use src/data/team.json. Roles: Lance Clarke — President & Owner; Liam Dillon — Projects Division Manager; Kyle Ellis — Plumbing Division Manager; Allan McDonald — Project Foreman; Alex Martishyn — Project Manager (explicit owner correction).

Liam's source materials use both Projects Division Manager and HVAC/R Division Manager; the displayed title follows the CV heading and the organisation section. Alex’s displayed role follows the owner’s latest explicit instruction: Project Manager. No LinkedIn profiles were supplied: personal social links are omitted. The unverified company LinkedIn link is also withheld until a correct profile is supplied. The Allan CV repeats Lance's email, so that address is not attributed to Allan. Corporate contact channels remain available.

The CV JPGs and full RFPQ document are not copied into the public site or repository. Public bios use only relevant professional summaries and supported trade qualifications; employment timelines, educational inconsistencies and performance percentages are not reproduced.

## Content withheld

Fabricated testimonials and customer avatars have been removed. Unsupported counters and service statistics have been removed across Home, About, Services and detail pages. No live headcount, insurance status, COR certificate, Google rating or response SLA is inferred from a January 2025 submission.

Three complete articles about Leigh, Ridgeview and Haro are now published under /blog/:slug, with a blog index and homepage cards. Old placeholder URLs redirect to the corresponding new articles. The sitemap includes the blog, all three articles and the seven case routes. The fake subscription remains removed. Case metadata, card labels and detail content share the same data sources.

## Still requiring external verification

The current privacy notice describes the actual form fields and third-party processing, without inventing retention periods or legal guarantees. Current internal retention/deletion practices should be confirmed by Allied before adding those commitments. Domain redirects and hosting HTTP status behaviour require deployment checks. Formspree acceptance and email delivery are tested separately; new project-specific photo attribution can be refined as the owner provides more media.

## Delivery verification

31 October 2026: through Google Chrome, the real local Quote form submitted the labelled test ALLIED-QA-20261031-A to xblzarjb. The UI displayed the success state only after provider acknowledgement. The matching Formspree notification, subject “Allied Plumbing — Quote request”, was found in the configured Gmail inbox at 22:53:19 UTC (15:53:19 PDT). No attachments or customer data were used. The form is enabled, Formshield is on and the submission archive is enabled. No email recipient or paid plan was changed.

Optional web uploads are disabled until account-level file support is verified. The UI provides quote@allied-plumbing.ca for photos/drawings; the feature flag is QUOTE_FILE_UPLOADS_ENABLED. Paid services were not purchased. Confirmation means observed receipt of this control message, not a guarantee of all future mail delivery.

Verification: npm run lint completed with no warnings or errors; npm run build completed; all 12 tests passed. Chrome verified the seven-project catalogue and the Garibaldi case detail.

## Visual restoration

The owner requested the original photographic design after the earlier simplification. Restored the overlay navigation, angled project and team cards, photo-backed contact form, About video, quality badges and blue project metric band. Unsupported company counters are replaced with labelled quantities from individual project scopes. Client cards describe delivered work in Allied’s editorial voice; they are not invented client quotes, ratings or endorsements. Nick Fedele’s existing portrait and Accounts Manager role are restored from the owner’s supplied website reference.

Company experience: the January 2025 RFPQ states 25+ years in business. The home page shows that conservative lower bound plus elapsed calendar years (26+ in 2026), without asserting an undocumented founding date. This replaces the four project equipment counters.

Added seven public project scopes from the user-supplied Master Project Portfolio Summary on 31 October 2026: ICBC, Crosstown, Glenayre, Collingwood, Capilano Birch, Herbert Spencer ASHP Phase 1 and Hillcrest Phase 2. Completion is explicitly unconfirmed. Mamquam and the SD43 Maintenance Shop remain in docs/project-drafts.md pending scope details. Herbert Spencer ASHP remains separate from its 2021 boiler upgrade.

Follow-up: expanded the blog to six project-based articles (ICBC, Crosstown, Collingwood added). Careers now uses the verified shared Formspree endpoint with explicit acceptance/error handling. Resume links are supported; PDF attachment delivery remains via email because file uploads are not verified for the receiving plan. Application email mailbox existence is not independently verified. Employment benefits are described as role-specific discussion points rather than guaranteed terms.
