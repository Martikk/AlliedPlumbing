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

### Decision still outstanding: I-01, the primary buyer

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

- **Apps Script redeploy.** `apps-script/Code.gs` gained a `doPost` so the
  native form can reach the existing backend. **The form cannot submit until
  this is deployed**: Deploy → Manage deployments → edit the active deployment
  → New version. The `/exec` URL does not change.
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
- **Turnstile (H-01 step 6)** — the form has a honeypot and a minimum fill
  time, both re-checked server side. Turnstile needs a Cloudflare account.
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

---

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

**JS budget:** the audit asks for 150 KB transferred; the homepage ships
~181 KB. About 50 KB of that is framer-motion, pulled in for a `MotionConfig`,
one fade-up on the CTA band and two hover scales on the residential service
page. Replacing those three with CSS would meet the target but changes how the
site animates, so it is a design decision. The CI limit sits at 190 KB as a
regression guard.

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
