# Audit follow-up — what is done, what is waiting on Allied

Source: *alliedplumbing.ca — Full Website Audit & Developer Spec*, 2026-11-22.

This file tracks the tickets from that spec. It is the one place to look for
"what still needs a human answer". Each blocked item says exactly which file
to edit, so nothing below needs a developer once the answer exists.

---

## 1. Blocked on Allied — fill these in and the site picks them up

| # | Question | Where the answer goes | Blocks |
|---|---|---|---|
| Q1 | The exact brand red and navy from the logo source file. Is a brand font required? | `src/styles/tokens.css` → `--brand`, `--brand-hover`. Nothing else contains a colour. | C-01 |
| Q2 | Which clients may be named and shown by logo? | `src/data/trust.json` → `clients.items` | D-04, D-05 |
| Q3 | Which licences, certifications, safety program (COR?), insurance limits and bonding may be stated publicly? | `src/data/trust.json` → `credentials.items`. Also unblocks the permits FAQ in `src/data/faq.json`. | D-04, H-04, I-07 |
| Q4 | Exact service area, and is residential still a target segment? | `src/lib/schema.ts` → `AREA_SERVED` | A-05, I-01, I-09 |
| Q5 | Which inbox receives each enquiry type? | `apps-script/Code.gs` → `ROUTES_` (all three currently go to `alex@allied-plumbing.ca`) | H-02 |
| Q6 | Can Allied state an emergency response time or coverage radius? | `src/pages/ServiceEmergency.tsx` — deliberately states none today | H-06 |
| Q7 | Is `allied-plumbing.ca` owned and staying as the email domain? Does it redirect to the site? | DNS — the site shows `alliedplumbing.ca` while emails use `allied-plumbing.ca` | I-08 |
| Q8 | Budget for a half-day photo shoot and for call tracking | — | D-01, J-03 |
| Q9 | Who has DNS and GA4 admin access? | Hosting is **AWS Amplify**, not Vercel or Netlify — the audit assumed otherwise | A-01, J-01 |

### Decisions taken in the meantime

- **I-01 (primary buyer)** — the site is written for the **institutional and
  commercial** buyer (the audit's Option A). The evidence points that way:
  14 project pages, all but one institutional or strata; an RFP page; school
  districts 40, 43, 45 and 48. Residential is one service page, not the
  headline. To change this, the hero copy in `src/pages/Home.tsx` and the H1s
  in `src/data/services-content.json` are the two places to edit.
- **Years in business** — shown as `25 + (current year − 2025)`, from the
  January 2025 RFPQ. No founding date is documented. `src/data/trust.json`.

---

## 2. Allied's own work (excluded from this pass by request)

- **D-01 — real photography.** Every image is still an AI render. This is the
  single highest-value fix in the audit and it bounds the remaining mobile LCP
  gap: the hero sources are upscaled PNGs. The shot list is in the spec
  (section 7). Swap the Cloudinary public IDs in `src/lib/site-links.ts`,
  `src/data/services-content.json`, `src/data/projects.json` and
  `src/pages/Home.tsx` — no component changes needed.
  `npm run check:head` warns if a `Gemini_Generated` or `Prompt_Generation`
  asset reaches a build.
- **I-04 — project facts.** `src/data/projects.json` now has the case-study
  fields the template renders: `contractType`, `engineer`, `valueRange`,
  `duration`, `challenge`, `result`, `gallery`, `quote`, `imageAlt`. All are
  blank. Each block appears only when filled.
- **Alt text (A-07)** — once real photos land, `imageAlt` on each project and
  the `alt` on each hero should describe the work ("Six IBC condensing boilers
  in the new Ridgeview Elementary mechanical room"), not the keyword.

---

## 3. Ops — nobody can do these from the repo

- **A-08** — verify Search Console and Bing Webmaster Tools, submit the
  sitemap, set a monthly check of Coverage, Core Web Vitals and top queries.
- **I-05** — claim and complete the Google Business Profile and the HomeStars
  listing (3 reviews, 8.7/10, apparently unclaimed). Then start asking for
  reviews at job closeout. **Never write or paraphrase a testimonial**: the
  site has no `aggregateRating` and a test asserts it never gains one.
- **J-01** — in GA4 Admin: 14-month retention, an internal-traffic filter for
  the office IP, link Search Console, enhanced measurement on but form
  interactions off (the custom events are more accurate).
- **J-03 / J-04** — call tracking and the Looker Studio dashboard. Both are
  cost decisions.
- **Turnstile (H-01 step 6)** — the form has a honeypot and a minimum fill
  time, both re-checked server side. Cloudflare Turnstile needs a Cloudflare
  account and a site key; it is not wired up.
- **Apps Script redeploy** — `apps-script/Code.gs` gained a `doPost` so the
  native form can reach the existing backend. **The form cannot submit until
  this is deployed**: Deploy → Manage deployments → edit the active
  deployment → New version. The `/exec` URL does not change.
- **customHttp.yml** — Amplify reads it on the next deploy. Verify with
  `curl -sI https://www.alliedplumbing.ca/assets/<hashed>.js | grep -i cache`.

---

## 4. Done in this pass

### Epic A — technical SEO
- **A-01** *verified, not changed*: the apex already 301s to `www`, and a
  missing trailing slash already 301s once. The audit's finding was stale.
- **A-02** one `Head` owns the tags; the canonical is built from the route,
  never from `window.location`. All 51 routes: title ≤ 60, description
  120–155, both unique. `npm run check:head` enforces it in CI.
- **A-03** `lastmod` from each content file's last commit date, not the build
  clock. `priority` and `changefreq` dropped.
- **A-04** the two Herbert Spencer pages are different scopes, so each has a
  distinct H1 and they cross-link.
- **A-05** `Service`, `FAQPage`, `BreadcrumbList` and `Project` per template;
  the organisation block is now `["HVACBusiness","Plumber"]`. `geo` is omitted
  rather than guessed and `sameAs` waits on I-05.
- **A-06** H1s follow `<Service> for <building types> in <region>`; the
  equipment list moved to the subhead.

### Epic B — page speed
- **B-00** baseline measured and saved to `docs/perf/`. PageSpeed Insights
  refused without an API key (shared quota exhausted), so these are local
  Lighthouse 12 runs: the live site, then this build.
- **B-01** the 539 KB Cloudinary favicon is replaced by a local set — 589 B on
  first load, ~16 KB in total. *An `icon.svg` still needs the vector logo
  (Q1); it cannot be traced from the raster file these came from.*
- **B-02** the slideshow is gone. One art-directed photo, 4:5 under 768 px and
  16:9 above, preloaded per breakpoint with `fetchpriority="high"`.
- **B-03** one Cloudinary helper; `q_auto` for photos and `q_auto:eco` only
  under 400 px; one width ladder; cards request a 4:3 crop.
- **B-04** CSS is 43 KB raw / 8.6 KB transferred, with no inline `<style>`
  block. *Not done: extracting critical CSS. The stylesheet costs ~150 ms of
  render-blocking on simulated 3G, and the acceptance criteria (< 60 KB, no
  inline block > 14 KB) already pass, so this did not seem worth the build
  complexity.*
- **B-05** no `@font-face` anywhere; the site renders in `system-ui`.
- **B-06** gtag loads after consent and on idle; the Careers iframe mounts
  within 600 px of the viewport; the map on `/contact/` is behind a button.
- **B-07 / B-08** cache headers and a Lighthouse budget in CI.

### Epic C — design system
Tokens, one `Button` (three variants), one label per action in `config.ts`,
one sticky header, skew removed from anything containing text, `Card` and
`Section`. A grep for a hex colour in `src/components` returns the token file.

### Epic D — homepage
Thirteen blocks to eight, institutional hero copy, static trust strip, one
outcome line per featured project, batch-published dates hidden on cards.
Height at 390 px: ~15,900 px → **9,312 px** (target 9,000; the remaining
2,500 px is the enquiry form the spec puts in section 8).

### Epic E / F — mobile and accessibility
Sticky action bar, the analytics pill moved to a footer link, 44 px targets,
`tel:`/`mailto:` throughout, contrast fixed, scrims on text over photos, one
link per card, one focus ring, full form semantics.
**Lighthouse accessibility: 100 on all four baseline URLs, mobile and
desktop.** The tabs ticket (F-03) and the "ProvideIn" line break (E-01) both
resolved by deleting the components that carried them. No `wheel` listener
exists anywhere, so G-00 needed no change.

### Epic G — motion
Motion tokens, reveal-once sections, reduced motion honoured in CSS *and* in
JS. The infinite marquee and the infinite pulse rings are gone.

### Epic H — conversion
The cross-origin iframe is replaced by a native form with branching fields,
inline and summarised errors, honeypot, minimum fill time, query-string
prefill and a `generate_lead` event. `/quote/`, `/contact/` and `/rfp/` are
one form with three presets. `/quote/thanks/` carries the reference number.

### Epic I / J
Service pages rebuilt on the seven-block template with FAQs; the display name
and legal name live in `config.ts`; Consent Mode v2 defaults to denied; the
full event plan ships with a parameter allowlist, so a name, email or file
name cannot reach GA4.

---

## 5. Measured result

Lighthouse 12, headless Chrome. **Before** is the live site over the Amplify
CDN; **after** is this build on a local static server, so the network path is
*slower* than production and these figures understate what the CDN will give.
Images come from Cloudinary in both.

| Page | Performance | Accessibility | LCP | CLS | Weight |
|---|---|---|---|---|---|
| Home — mobile | 88 → **95** | 100 → **100** | 3,695 → **2,804 ms** | 0 → 0 | 1,071 → **556 KB** |
| Home — desktop | 97 → **100** | 96 → **100** | 1,168 → **749 ms** | 0 → 0 | 1,172 → **507 KB** |
| /services/hvac/ — mobile | 95 → **96** | 100 → **100** | 2,650 → **2,702 ms** | 0 → 0 | 720 → **293 KB** |
| /services/hvac/ — desktop | 98 → **100** | 96 → **100** | 1,150 → **708 ms** | 0 → 0 | 719 → **352 KB** |
| /projects/ridgeview/ — mobile | 90 → **95** | 100 → **100** | 3,381 → **2,886 ms** | 0 → 0 | 810 → **316 KB** |
| /projects/ridgeview/ — desktop | 99 → **100** | 96 → **100** | 868 → **621 ms** | 0 → 0 | 805 → **285 KB** |
| /quote/ — mobile | 85 → **99** | 100 → **100** | 3,743 → **1,969 ms** | **0.101 → 0** | 1,551 → **122 KB** |
| /quote/ — desktop | 97 → **100** | 96 → **100** | 1,137 → **458 ms** | **0.029 → 0** | 1,658 → **122 KB** |

SEO and best-practices are 100 on all eight runs, and no page logs a console
error.

**Still short of target:** mobile LCP is 2.7–2.9 s on the two hero pages,
against the 2.5 s goal. The hero sources are upscaled AI-generated PNGs; a
real photograph at 2400×1350, saved as a JPEG, closes that gap without any
code change. This is D-01.

---

## 6. Deviations from the spec, and why

- **React Hook Form + Zod (H-01)** — not used. They add ~26 KB gzipped against
  a 150 KB total-JS budget, for a form with eleven fields. `src/lib/enquiry.ts`
  validates by hand, client and server, with the same rules.
- **Serverless endpoint (H-01 step 3)** — the spec assumes Vercel or Netlify.
  Hosting is AWS Amplify, which serves static files only, and the existing
  Apps Script backend already does validation, dedupe, reference numbers,
  private Drive storage with retention, and mail. So the native form POSTs to
  a new `doPost` in that same backend rather than to a new Lambda.
- **Organisation `@id`** — kept as `#business`, not the spec's `#org`, so the
  `publisher` references already in the build keep resolving.
- **Careers form** — still the Apps Script iframe. It owns the résumé upload
  flow and the audit does not ask for it to be replaced; it is now lazily
  mounted (B-06).
- **Critical CSS (B-04)** — see Epic B above.
