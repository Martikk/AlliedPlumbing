# Audit follow-up — what is done, what is waiting on Allied

Source: *alliedplumbing.ca — Full Website Audit & Developer Spec*, 2026-11-22.

> **Scope note, 2026-11-22.** The audit's visual redesign (epics C, D, E, F, G)
> was built, reviewed and then **rolled back at Allied's request**. The original
> design is what ships: the red emergency strip and floating navigation pill,
> the four-slide hero, the `clip-tilt` cards, the original homepage order and
> button styles.
>
> Everything that is **not** visual was kept: the native enquiry form, the
> favicon, structured data, sitemap `lastmod`, page titles and descriptions,
> cache headers, the head check, the tests and CI. Section 4 below says exactly
> which tickets survived and which went back.

---

## 1. Blocked on Allied — fill these in and the site picks them up

| # | Question | Where the answer goes | Blocks |
|---|---|---|---|
| Q1 | The exact brand red and navy from the logo source file | `src/styles/tokens.css`. **Scope is now small**: tokens only drive the enquiry form and the shared `Button`. The restored design keeps its own colours inline. | form styling, `icon.svg` |
| Q2 | Which clients may be named and shown by logo? | No home right now — the trust strip that would have carried them went back with the design. The natural place is `/clients/`. | D-04 (reverted) |
| Q3 | Which licences, certifications, safety program (COR?), insurance limits and bonding may be stated publicly? | `TrustCard` in `src/pages/GetQuote.tsx` — it already lists equipment brands and is where a credential line belongs | H-04, I-07 |
| Q4 | Exact service area, and is residential still a target segment? | `src/lib/schema.ts` → `AREA_SERVED` | A-05, I-09 |
| Q5 | Which inbox receives each enquiry type? | `apps-script/Code.gs` → `ROUTES_` (all three currently go to `alex@allied-plumbing.ca`) | H-02 |
| Q6 | Can Allied state an emergency response time or coverage radius? | Nowhere states one today, deliberately | H-06 |
| Q7 | Is `allied-plumbing.ca` owned and staying as the email domain? Does it redirect? | DNS — the site is `alliedplumbing.ca`, emails are `allied-plumbing.ca` | I-08 |
| Q8 | Budget for a half-day photo shoot and for call tracking | — | D-01, J-03 |
| Q9 | Who has DNS and GA4 admin access? | Hosting is **AWS Amplify**, not Vercel or Netlify — the audit assumed otherwise | A-01, J-01 |
| Q10 | 1501 Haro Street (Paul Plaza): who was the client, what boiler went in, and when? | A new entry in `src/data/projects.json`, plus `/projects/<id>` in `src/data/seo.json` | the thirteenth project story, held back |
| Q11 | Is École Glenayre in Port Moody? | `src/data/projects.json` → `glenayre.location`, which still reads the published "British Columbia" | nothing; it is vague rather than wrong |
| Q12 | Is ICBC a client on some other building? | `/clients` description in `src/data/seo.json`, which named them for 456 West 5th | nothing; the name was removed, not replaced |

### Decided: I-01, the primary buyer — institutional

The page titles and descriptions were already written for the institutional
buyer. The homepage H1 and the HVAC H1 now match them, so the search result
and the page carry the same promise.

Industry practice is that the title and the H1 should share a topic without
sharing wording, and that a large divergence should be closed. Which side
moves was settled by the site's own evidence, not by preference: 13 of the 14
project pages are institutional or strata, and `/rfp/` exists.

- Homepage H1: *"Mechanical contractor for schools, strata and commercial
  buildings"*, subhead naming Metro Vancouver, the North Shore and Sea-to-Sky.
- `/services/hvac/` H1 was *"HVAC (RTU, MUA, AHU, Heat Pumps, VRF)"* — the
  audit's own example of an H1 that lists equipment instead of making a
  promise (A-06). Now *"Commercial HVAC for schools and commercial
  buildings"*, with the equipment list moved into the paragraph under it.
- The other five service pages were already aligned and were left alone.

Residential remains a service page. If Allied decides otherwise, those two H1s
and `src/data/seo.json` are the three places to change.

### Superseded: the earlier form of this decision

The page **titles and descriptions** in `src/data/seo.json` were rewritten for
the institutional buyer — "Mechanical Contractor, Metro Vancouver", "for
schools, strata and commercial buildings". Those were kept. The restored
homepage copy is the original, generic version ("Plumbing, Heating & HVAC in
British Columbia", residential and commercial together).

So a search result currently promises a school-district contractor and the page
opens with general copy. That is not broken, but it is a seam. Either:

- rewrite the homepage hero copy to match the titles, or
- revert `src/data/seo.json` to the original titles and descriptions.

Both are small. It needs Allied's answer on who the site is for.

---

## 2. Allied's own work (excluded by request)

- **D-01 — real photography.** Every image is still an AI render, and this is
  what bounds the remaining mobile LCP: the hero sources are upscaled PNGs.
  The shot list is in the spec, section 7. `npm run check:head` warns when a
  `Gemini_Generated` or `Prompt_Generation` asset reaches a build — it does
  today, on `/`, `/services/` and three service pages.
- **I-04 — project facts.** `src/data/projects.json` carries the case-study
  fields (`contractType`, `engineer`, `valueRange`, `duration`, `challenge`,
  `result`, `gallery`, `quote`, `imageAlt`, `outcomeLine`). They are filled in
  for five projects' `outcomeLine` only; the rest are blank. The template that
  rendered them went back with the design, so they are currently unused data —
  they are kept because the facts are worth collecting either way.

---

## 3. Ops — nobody can do these from the repo

- **Apps Script redeploy — URGENT, the live form is broken.**
  `apps-script/Code.gs` gained a `doPost` so the native form can reach the
  existing backend. **It has not been deployed.** Verified 2026-11-22: a POST
  to the `/exec` URL answers `Script function not found: doPost`, while
  https://www.alliedplumbing.ca/quote/ already serves the native form. So an
  enquiry submitted on the live site today fails — the visitor sees the error
  panel with the phone number and their typed details are preserved, but the
  enquiry does not reach anyone.
  Fix: Apps Script → Deploy → Manage deployments → edit the active deployment
  → New version. The `/exec` URL does not change, so nothing in the site needs
  to change with it.
  Re-check with:
  `curl -s -X POST "$(node -p "require('./src/lib/enquiry-config.json').appsScriptUrl")" -H 'Content-Type: text/plain' --data '{}' | head -c 200`
  — JSON means it is deployed, HTML means it is not.
  Until it is deployed, the alternative is to point `/quote/`, `/contact/` and
  the homepage band back at `EmbeddedEnquiry` (still in the codebase, still
  used by Careers), which works today.
- **A-08** — verify Search Console and Bing Webmaster Tools, submit the
  sitemap, set a monthly check of Coverage, Core Web Vitals and top queries.
- **I-05** — claim the Google Business Profile and the HomeStars listing
  (3 reviews, 8.7/10, apparently unclaimed), then ask for reviews at job
  closeout. **Never write or paraphrase a testimonial**: the site has no
  `aggregateRating` and a test asserts it never gains one.
- **J-01** — GA4 Admin: 14-month retention, internal-traffic filter for the
  office IP, link Search Console, enhanced measurement on but form
  interactions off.
- **J-03 / J-04** — call tracking and the Looker Studio dashboard. Cost
  decisions.
- **Turnstile (H-01 step 6) — built, waiting on two keys.** The code ships
  inert: with no site key nothing renders and the Cloudflare script is never
  fetched, so the honeypot and minimum fill time remain the controls, exactly
  as before. To switch it on:
  1. Cloudflare dashboard → Turnstile → add `alliedplumbing.ca`, widget mode
     **Invisible**.
  2. Put the **site** key in `src/lib/enquiry-config.json` →
     `turnstileSiteKey` (public, belongs in the repo).
  3. Put the **secret** key in Apps Script → Project Settings → Script
     Properties as `TURNSTILE_SECRET` (never in the repo), then
     `npm run deploy:backend`.
  It fails open: if Cloudflare is unreachable the enquiry still goes through,
  because a CAPTCHA provider being down is not a reason to drop a real lead.
- **customHttp.yml** — Amplify reads it on the next deploy. Verify with
  `curl -sI https://www.alliedplumbing.ca/assets/<hashed>.js | grep -i cache`.

---

## 4. Ticket status

### Kept

| Ticket | What shipped |
|---|---|
| **A-01** | *Verified, no change needed*: the apex already 301s to `www`, and a missing trailing slash already 301s once. The audit's finding was stale. |
| **A-02** | One `Head` owns the tags; the canonical is built from the route, never from `window.location`. All 51 routes: title ≤ 60, description 120–155, both unique. `npm run check:head` enforces it in CI. |
| **A-03** | Sitemap `lastmod` from each content file's last commit, not the build clock. `priority` and `changefreq` dropped. |
| **A-04** | The two Herbert Spencer pages are different scopes, so each has a distinct title and they cross-link. |
| **A-05** | `Service` and `BreadcrumbList` on service pages, `Project` + `BreadcrumbList` on project pages, `BreadcrumbList` beside the existing `BlogPosting`. The organisation block is now `["HVACBusiness","Plumber"]`. `geo` omitted rather than guessed; `sameAs` waits on I-05. |
| **A-07** | Partner logos carry the brand name instead of `alt=""`. |
| **B-01** | The 539 KB Cloudinary favicon is replaced by a local set — **589 B** on first load, ~16 KB in total. *An `icon.svg` still needs the vector logo (Q1).* |
| **B-03** | One Cloudinary helper; `q_auto` for photos and `q_auto:eco` only under 400 px. |
| **B-06** | gtag loads after consent **and** on idle. The careers iframe mounts within 600 px of the viewport. The map on `/quote/` mounts within 400 px — it used to pull ~187 KB of Maps JavaScript on first paint. |
| **B-07** | `customHttp.yml`: immutable caching for hashed assets, revalidated HTML, HSTS, nosniff, Referrer-Policy, Permissions-Policy. |
| **B-08** | `lighthouserc.json` plus a GitHub workflow running lint, build, tests, the head check and Lighthouse. |
| **E-07** | Every phone link is `tel:+16047311000`; the visible text stays `604-731-1000`. Several were dash-formatted, which is not valid E.164. |
| **H-01** | The cross-origin Apps Script iframe is replaced by one native form with branching fields, inline and summarised errors, honeypot, minimum fill time, `?type=` / `?service=` prefill and a `generate_lead` event. `apps-script/Code.gs` gained a matching `doPost`. |
| **H-02** | `/quote/`, `/contact/` and the homepage band are the same form with three presets. |
| **H-03** | `/quote/thanks/` with the reference number — prerendered, `noindex`, out of the sitemap. |
| **H-04** | The response promise replaces *"Acceptance by our system does not mean a team member has read your message"*, on the site and in the Apps Script acknowledgement. *"Fast, transparent pricing from certified technicians"* is gone, since no certification is named on that page. |
| **H-05** | Service and project CTAs can prefill the form through the query string. |
| **I-08** | One display name and one legal name, in `src/config.ts`. |
| **J-01** | Consent Mode v2 defaults to denied. |
| **J-02** | The full event plan with a parameter allowlist, so a name, email or file name cannot reach GA4. |

### Rolled back with the design

**C-01 … C-06** (tokens, one `Button`, one label per action, single sticky
header, skew removed from text, `Card`/`Section`) · **D-02 … D-06** (eight-section
homepage, institutional hero copy, trust strip, outcome lines on cards, hidden
batch-published dates) · **E-01 … E-06** (mobile action bar, analytics pill moved
to the footer, 44 px targets, shorter page) · **F-01 … F-07** (contrast, scrims,
ARIA tabs, one link per card, focus ring) · **G-01 … G-03** (motion tokens,
reveal-once sections, marquee and pulse-ring removal) · **I-02 / I-03**
(seven-block service pages, FAQ content).

All of it is in git at commit `607bf84` if any piece is wanted back.

`src/styles/tokens.css` and `src/components/ui/Button.tsx` survive because the
enquiry form is built on them. Nothing else reads them, so they cannot affect
the restored design.

### Also fixed, after the revert

F-01's contrast work was rolled back with the design, which left three real
failures. All three were fixed with the smallest change that passes — same
hue, same layout, same wording:

- The service step numbers `01`–`06` were `text-neutral-400` on white — **2.5:1**
  against a 4.5:1 minimum. Now `text-neutral-600`, **7.0:1**, still a muted grey.
  `src/components/ServicesShowcase.tsx`.
- `24/7 Emergency Line:` was white on the red strip's pill. The pill's 15% white
  tint lifted the background to `#e4453f`, where white is **4.0:1**. The tint is
  now 12% black, which darkens it instead: **5.9:1**, same pill. `src/index.css`.
- The accent blue `#5776c6` was **4.36:1** against white in both directions — as
  a button background under white text, and as blue text on white. Now `#5272c4`:
  the same hue 1.2% darker, **4.60:1**. Four files.

E-01 came back with the design too and was fixed the same way: the services
heading relies on a `<br className="hidden md:block" />`, and JSX strips the
newline after it, so phones read **"What We ProvideIn Our Services"**. A `{' '}`
after the `<br>` restores the space without touching the desktop line break.

**Accessibility is now 100 on all four baseline URLs, mobile and desktop**, and
on every other page type checked (about, services hub and detail, projects hub
and detail, blog hub and article, team, clients, careers, rfp, contact, quote,
privacy).

### Mobile adaptation (after the revert)

The original design was built desktop-first and several blocks did not survive
a narrow, tall viewport. Fixed with mobile-only rules — every one of them is
inside `@media (max-width: 767px)` in `src/index.css`, so desktop is byte-for-byte
unchanged:

- **The contact band's photo panel.** It is tilted 2°. On desktop it wraps a
  ~620 px two-column block and reads as a deliberate angle; on a phone the same
  block is ~1,900 px tall, so the tilt throws its corners about 66 px and the
  panel appears to slide off the screen behind the form. Straightened on phones,
  rounded corners kept.
- **Photo heroes** scrim left-to-right, which works when the text occupies the
  left half. At 390 px the text spans the full width and its right edge sat on
  the bright part of the photo. They scrim downward on phones (`.hero-scrim`).
- **Section headers** that are "heading left, link right" put the link against
  the last line of a three-line heading. They stack (`.section-head-split`).
- **The parallelogram badges** are quarter-width on desktop, where a 10% clip is
  a slim corner. Full-width on a phone that is ~35 px eating into the label, so
  the angle is halved (`.skew-badge`).
- **The floating analytics pill** is fixed bottom-left, so on a 390 px screen it
  sits on top of whatever is underneath — on the quote page, directly over the
  form's radio buttons, intercepting taps. Hidden on phones; the same control is
  a "Cookie settings" link in the footer, which is desktop-hidden.

Two component fixes came out of it:

- `EnquiryForm` got a `chrome` prop. The quote page sits the form inside its own
  card and passed `className="p-0"` to drop the doubled padding — which does
  nothing, because Tailwind utility order decides, not attribute order, and
  `p-5` wins. At 320 px that cost 40 px of form width and wrapped every radio
  label. The card is now the component's decision, not an override.
- `EnquiryForm` got `titleHidden`, so the quote page keeps one visible heading
  instead of "Tell us what you need" followed by "Your enquiry". The accessible
  name is unchanged.

Checked for horizontal overflow at **320, 360 and 390 px across all 16 route
types** — none. Mobile Lighthouse after the work: performance 91–96,
accessibility, best-practices and SEO 100, CLS 0.

---

### Thin pages — eleven fixed, one left

Word counts are the text inside `<main>` on the built page. Header, footer
and the no-JavaScript fallback add the same ~110 words to all 60 routes, so
counting the whole document hides a stub.

`/rfp` shipped **92** words and `/about` **189** — the two pages an
institutional buyer opens to decide whether the rest of the site is credible.
Both were rewritten from what project pages already carry: `/rfp` to **443**,
`/about` to **664**. No licence, certification, insurance limit, response
time, staff count or founding year is claimed on either, because all of those
are still Q3 and Q6. `/about`'s meta description used to say "since the late
1990s"; nothing in the repo supports a founding year, so the claim is gone.

The six service detail pages were worse — **159 to 211** words each, every one
shorter than the articles linking to it, and they are where a commercial or
strata buyer lands from a search. They now run **598 to 817**, written from
the same project and article material:

| Route | Before | After | Evidence behind it |
|---|---|---|---|
| `/services/boilers` | 179 | 817 | 7 project pages, 4 articles |
| `/services/hvac` | 182 | 780 | 7 project pages, 5 articles |
| `/services/emergency` | 173 | 657 | no projects — process and safety only |
| `/services/maintenance` | 182 | 636 | no projects — 4 articles |
| `/services/commercial-plumbing` | 159 | 625 | 3 project pages, 4 articles |
| `/services/residential-plumbing` | 211 | 598 | no projects — 2 articles |

`tests/seo.test.mjs` holds the floor: **200** words for any indexable route,
**400** for `/about`, `/rfp` and every `/services/*` detail page.

`/clients` (**304**) and `/team` (**227**) followed, for the same reason: they
sit on the route an institutional buyer takes before a bid closes. `/clients`
is now **740** and `/team` **617**. The team page's useful content was already
there and buried — named individuals with named trade tickets, which is the
opposite of the blanket "certified technicians" line deleted elsewhere — so
the page now explains who handles a project at each stage and what Red Seal
and the two BC gasfitter classes certify. Technical Safety BC's own wording
is used for Class B (the 120 kW certificate); no scope is stated for Class A
beyond its being the broader of the two, because the regulation was not read.

`/services` followed at **308 → 914**. The hub now explains that the six
lines are one job split by when it happens — install, commission, maintain,
fail at an inconvenient hour — and routes a reader to the right page by
building type. Its six FAQ answers are also published as `FAQPage`
structured data, the site's first. Google stopped showing FAQ rich results
for sites outside government and health in 2023, so that markup is for Bing
and answer engines rather than for Google's SERP; it costs one object and
invents nothing, since the answers were already on the page.

Removed from the hub on the way: an empty `grid-cols-2 md:grid-cols-4` div
inside a bordered, tinted panel, which rendered as a blank box above the logo
marquee — the same dead markup as the stat grid in `ServiceTemplate`;
**"background-checked"** crews in the FAQ, a vetting claim nothing supports;
and **"IBC / Rheem specialists"** on a service card, where the brands are
fine and the word is a claim about standing. The H1 was *"Built for uptime.
Tuned for comfort."* — nothing a search can match and nothing a buyer can
check.

`/quote` at **262** is now the only indexable page under 400, and it is a
form page, where thin is defensible.

### One organisation, one name

`/clients` groups by the raw `client` string in `projects.json`, and three
districts were written two ways — "School District No. 43" and "School
District No. 43 (Coquitlam)" among them. The page rendered **13 headings for
10 organisations**, with each district's schools split between its two
spellings. The names are now canonical, one per organisation, so the clients
page and every project page agree:

| Client | Projects |
|---|---|
| School District No. 43 (Coquitlam) | 5 |
| School District No. 48 (Sea to Sky) | 3 |
| School District No. 40 (New Westminster) | 2 |
| Vancouver School Board (School District No. 39) | 2 |
| Private rental housing owner | 2 |
| Capilano University, Collingwood School, School District No. 45 (West Vancouver), Starlight Investments, Vancouver Police Department facility | 1 each |

`tests/content.test.mjs` asserts a district never appears under two names, so
the fix stays in the data rather than becoming fuzzy matching in the page.

### Claims removed along the way

Three unverifiable claims were still on the site after H-04 deleted
*"certified technicians"* from the quote page:

- **"Certified Technicians • School-Approved Crews • Guaranteed Workmanship"**
  closed `/services/residential-plumbing`. None of the three is supported
  anywhere in the repo, and the third is a warranty term. Gone.
- **"Certified technicians, school project experience, DDC-ready controls and
  proactive programs"** introduced the service grid on `/services`. Replaced
  with what the six lines actually are and where they are delivered.
- A **"zero drywall dust policy"** on the residential page — an absolute
  promise about site conditions that nobody can keep on a repipe.

On the same page, an image collage labelled two manufacturer logos as
"High-efficiency systems" and "Tankless water heater install", beside an
AI-generated render captioned "Repiping system detail". A logo is not a
photograph of our work. The logos stay, named as logos (A-07); the render is
gone, which drops the D-01 warning count from 4 to 3.

### `src/data/services-content.json` is not rendered anywhere

The file holds `h1`, `promise`, `subhead`, `audiences`, `deliver`,
`equipment`, `steps` and `relatedProjects` for all six services, and the only
thing that reads it is `generate-sitemap.mjs`, for `lastmod`. The six
`Service*.tsx` pages carry their own copy inline.

This matters because the earlier project-stories pass extended every
`relatedProjects` array in that file, believing it fed the service pages. It
did not — those edits changed nothing a visitor can see. The service pages now
link the case studies directly. The file should either become the source the
pages read, or be reduced to whatever `lastmod` actually needs.

### The homepage: claims, not word count

At 827 words `/` was never thin. What was wrong was what the words said.

**Four badges under a green tick** read as credentials: "Quality control
system", "Project coordination", "Highly professional team", "Accurate
testing processes". The first implies a documented quality system, the third
is puffery with a checkmark beside it, the fourth means nothing. They now
name work every project page describes — phased work in occupied buildings,
permits and inspections, trade coordination, commissioning and turnover
records.

**The first four `<h2>`s on the site's most important page** were "Smart
methods", "Experienced team", "Modern equipment" and "Proven delivery" — the
feature band that overlaps the hero. Four top-level headings for four
decorative cards, matching no search and telling a reader nothing. They are
now `<h3>` under one real `<h2>`, they say what actually happens on a
project, and each carries a visible link to the page that explains it.
Previously each card hid its only link behind `sr-only focus:not-sr-only`:
all four scaled on hover, none could be clicked, and the page carried four
invisible duplicate links to `/projects`.

**"Fast response"** on the emergency service card — a response-time claim,
and Q6 says we do not make one. Now "on-call".

Also: `<a href="/quote/">` in the three-step band reloaded the whole
application instead of routing, and `className="relativ"` in
`ServicesShowcase` was a typo for a class that therefore never applied.

### Years in business — the one piece of history the repo supports

`docs/content-sources.md` records that the January 2025 RFPQ states **25+
years in business**, and the homepage counter has been showing that lower
bound plus elapsed years (26+ in 2026). No founding date is documented, and
none is claimed.

The calculation lived inside `AboutCompany`, so `/about` — the page a reader
goes to for exactly this — could not state it. It is now
`yearsInBusiness()` in `src/config.ts`, used by both. The earlier note in
this section about removing "since the late 1990s" from `/about`'s meta
description still stands: a founding *year* is not documented. A duration
is.

### The 19 project pages: three defects in the template, not the prose

The case studies run 263–506 words and all clear the floor, so nothing here
was about length.

**Every project recommended the same two projects.** "More from our
projects" took the list, dropped the current page and sliced two off the
front, so seventeen of nineteen case studies pointed at whichever two
happened to be first in the JSON. A Burnaby boiler replacement sent readers
to a downtown school chiller, and the internal links of the site's largest
page group drained into one pair. `relatedProjects()` in `src/lib/projects.ts`
now prefers an editorial pairing, then the same client, then the same
service, then the same category, and only then walks the list from the
project's own position so unrelated pages still spread their links. The
result is 16 distinct pairs: the two Herbert Spencer phases point at each
other, the two Crosstown phases pair up, the Sea to Sky schools cluster, and
the three residential buildings cluster.

**`relatedProject` and `outcomeLine` were dead data.** Both are declared in
the `Project` type and populated in the JSON — `relatedProject` on the three
two-phase buildings, `outcomeLine` on five projects — and nothing rendered
either. The `outcomeLine` entries are the best sentences in the file:
"12 classrooms converted to unit ventilators and a six-boiler IBC plant —
School District No. 45, 2022", against an `outcome` paragraph that says "the
documented classroom conversions". They now lead the completed-work section.

**`delivery` meant three different things.** Seven entries used it for a
credit — "Project management: Alex Martishyn, Project Manager." — which the
template printed as the closing paragraph of "Allied's role and
coordination". Five held an empty string, which rendered as an empty `<p>`;
those five were written in the project-stories pass and the blank was mine.
Seven held real coordination prose. The credit now has its own field and
appears beside client and location, where a reader looks for it; `delivery`
renders only when it says something.

`tests/content.test.mjs` checks all of this against the built pages: two
distinct related projects per case study, never itself, an editorial pairing
honoured when one exists, at least twelve distinct pairs, and `delivery`
never holding a credit line.

**Still open on these pages**, and not fixable from the repo: seven of the
nineteen carry no `challenges` entries (garibaldi, ridgeview, leigh,
herbert-spencer, howe-sound, miller-park, haro) — the template hides the
section, so there is no visible defect, but those pages are shallower than
the twelve that have it. No project has gallery photographs (D-01) and none
carries a client quote, which is deliberate.

### The 22 articles: no paths between them, and a reading time nobody updated

The articles run 473–796 words and all clear the floor. As with the project
pages, the problems were in the template.

**No article linked to another article.** Each one pointed at its project,
its service and two project pages, and that was all: twenty-two pieces with
no path between them except the blog index, so no topic cluster could form
and a reader who finished one had nowhere to go. Seven projects are written
about more than once, which is the strongest pairing signal available.
`relatedArticles()` in `src/lib/posts.ts` prefers the same project, then the
same service, then the same category, then walks from the article's own
position. A "Keep reading" section now closes every article: **19 distinct
sets of three** across 22 articles, with the two heat-pump pieces pointing
at each other, the two hot-water pieces clustering, and the chiller pieces
clustering.

**"Related projects" on articles had the defect just fixed on the project
pages** — `projects.filter(same category).slice(0, 2)` — so every
institutional article offered the same pair. It now uses the shared
`relatedProjects()` picker, seeded from the project the article is about:
**11 distinct pairs** instead of 2.

**Reading time was typed by hand**, and three of the four newest articles
claimed four minutes for a body that reads in two. The field is gone from
`posts.json`; `readingMinutes()` derives it from intro, sections and
checklist at 225 words per minute. A figure written beside prose goes stale
the first time the prose is edited.

`tests/content.test.mjs` checks all three against the built pages: three
distinct further articles per page, never itself, at least 15 distinct
reading lists and 8 distinct project pairs, no `readingMinutes` left in the
data, and the printed minute figure matching the body.

**Still open on these pages**: six of the twenty-two carry no planning
checklist (the six oldest, which are also the six shortest), and 14 of 22
still use `article-placeholder.svg` while the other 8 share five generic
images between them — D-01, and the template already says so under each
placeholder. All 22 read "Technical review pending", which is accurate: no
article has been through a named technical reviewer.

## 5. Measured result

Lighthouse 12, headless Chrome. **Before** is the live site over the Amplify
CDN on 2026-11-22. **After** is the current build — original design, non-visual
audit work kept — on a local static server, so the network path is *slower*
than production and these figures understate what the CDN will give. Images
come from Cloudinary in both.

| Page | Performance | Accessibility | LCP | CLS |
|---|---|---|---|---|
| Home — mobile | 88 → **91** | 100 → **100** | 3,695 → **3,361 ms** | 0 → 0 |
| Home — desktop | 97 → **100** | 96 → **100** | 1,168 → **819 ms** | 0 → 0 |
| /services/hvac/ — mobile | 95 → **97** | 100 → **100** | 2,650 → **2,466 ms** | 0 → 0 |
| /services/hvac/ — desktop | 98 → **100** | 96 → **100** | 1,150 → **626 ms** | 0 → 0 |
| /projects/ridgeview/ — mobile | 90 → **94** | 100 → **100** | 3,381 → **2,925 ms** | 0 → 0 |
| /projects/ridgeview/ — desktop | 99 → **100** | 96 → **100** | 868 → **655 ms** | 0 → 0 |
| /quote/ — mobile | 85 → **96** | 100 → **100** | 3,743 → **2,610 ms** | **0.101 → 0** |
| /quote/ — desktop | 97 → **100** | 96 → **100** | 1,137 → **741 ms** | **0.029 → 0** |

SEO and best-practices are 100 on all eight runs, and no page logs a console
error. Desktop performance and accessibility are 100 everywhere.

`/quote/` is the clearest win and it is almost all H-01 and B-06: dropping the
iframe and deferring the map took the page from 1,551 KB to 236 KB on mobile
and removed the 0.101 layout shift.

**Still short of target:** mobile LCP is 3.0–3.4 s on the two photographic
heroes, against the audit's 2.5 s goal. The sources are upscaled AI-generated
PNGs; real photography at 2400×1350, saved as JPEG, closes that gap with no
code change. That is D-01.

**JS budget (B-08): met.** The audit asks for 150 KB of script transferred.
Measured with Lighthouse against the built site:

| Page | Before | After |
|---|---|---|
| Home | 139.5 KB | **119.1 KB** |
| /projects/ridgeview/ | 121.8 KB | **101.3 KB** |
| /quote/ | 97.0 KB | 97.1 KB |
| /services/hvac/ | 92.0 KB | 92.0 KB |

The saving is the blog corpus. `posts.json` carries all eighteen articles in
full — intro, sections, checklists, reviews — and the home page, /blog/ and
every project page imported it to render teaser cards. A bundler cannot
tree-shake fields out of a JSON import, so a visitor who never opened an
article downloaded all eighteen anyway: 22.6 KB gzipped.
`src/scripts/generate-posts-index.mjs` derives the seven fields a card needs
into `posts-index.json` (2.2 KB gzipped). Only `BlogPost.tsx`, which renders an
article, still imports the full file, and it is a route chunk of its own.

The index is committed so dev and typecheck work without a build;
`tests/content.test.mjs` regenerates it in memory and fails if it has drifted,
so `posts.json` stays the single source. Edit it, then `npm run gen:posts`.

The CI limit is now the audit's own 150 KB, not the 190 KB holding figure.

**Correction to earlier notes in this file:** the "~181 KB, about 50 KB of it
framer-motion" line that stood here was wrong on both counts. framer-motion
tree-shook to 783 bytes gzipped, and the homepage measured 139.5 KB — already
inside the budget — before this change.

---

## 6. Deviations from the spec, and why

- **The visual redesign was reverted** at Allied's request. See the scope note
  at the top.
- **React Hook Form + Zod (H-01)** — not used. They add ~26 KB gzipped for a
  form with eleven fields. `src/lib/enquiry.ts` validates by hand, client and
  server, with the same rules, and `tests/enquiry.test.mjs` locks the field
  matrix to the audit's own table.
- **Serverless endpoint (H-01 step 3)** — the spec assumes Vercel or Netlify.
  Hosting is AWS Amplify, which serves static files only, and the Apps Script
  backend already does validation, dedupe, reference numbers, private Drive
  storage with retention, and mail. So the form POSTs to a new `doPost` there
  rather than to a new Lambda.
- **Organisation `@id`** — kept as `#business`, not the spec's `#org`, so the
  `publisher` references already in the build keep resolving.
- **Careers form** — still the Apps Script iframe. It owns the résumé upload
  flow and the audit does not ask for it to be replaced; it is now lazily
  mounted.
- **LCP preloads** — these cannot be rendered from a React component:
  `renderToString` emits `<link>` in place rather than hoisting it, so the
  markup disagrees with the hydrated tree (React #418) and the page
  re-renders on the client. `src/lib/lcp-preload.ts` declares them per route
  and the prerender step writes them into `<head>`. It covers only the three
  data-driven heroes; the rest hard-code their hero URL in the component and
  already carry `fetchpriority="high"`.
- **Critical CSS (B-04)** — not extracted. The stylesheet costs ~150 ms of
  render-blocking on simulated 3G, and the acceptance criteria (< 60 KB, no
  inline block > 14 KB) already pass at ~10 KB transferred.
