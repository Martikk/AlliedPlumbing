# Photography: every image slot, and the prompt for it

Current as of 28 November 2026. This replaces the 31 October shot list, whose
project table still used case ids that no longer exist. Written in English
because every prompt, alt text and caption on this page is copied verbatim
into Midjourney or into the site.

Audit item D-01. Today the site serves **about sixteen images across sixty
pages**: seven of them carry all nineteen project covers, four are the home
page's hero slides, three are screenshots, one is still named
`Gemini_Generated_Image_9on55p9on55p9on5`, and twelve articles show an SVG
placeholder under the caption "Article photography to follow."

The plan below is a complete replacement set: **43 prompts, one per slot**, at
the aspect ratio the code actually renders.

---

## 1. What may be generated, and what may not

Three categories. The line matters more than the prompts do.

**Never generated.** A generated image here is a fabricated record, not a
placeholder.

- The six team portraits (`src/data/team.json`). A generated face under a real
  person's name, beside real trade certifications, is an invented person.
  Three of the six are still `null` and need a real photograph.
- The four equipment logos (`src/components/LogoMarquee.tsx`). Use the
  manufacturer's own SVG or PNG. A model asked to draw a logo produces a
  near-miss trademark.
- The brand video and its poster frame.
- Allied's own premises. The Contact page states a real address on 2nd Avenue
  in Burnaby; a generated building there would be a picture of somewhere else.

**Generated, but captioned.** The nineteen project covers. Each one already
carries `imageCaption`: "Illustrative image from the Allied mechanical
services media library; project-specific photography to follow." That caption
stays until a real photograph of that building replaces it. A generated boiler
room under "École Glenayre Elementary DDC & Boiler Plant Upgrade" is a
depiction of a named client's building that does not exist.

**Generated freely.** Service pages, the home hero, the approach cards, page
heroes, the call-to-action band, article headers. These illustrate a kind of
work, not an instance of it, and nothing on the page claims otherwise.

One rule across all three: **no generated image may contain a person who
reads as an Allied employee.** Keep faces away from the camera or in profile.
This is both an honesty safeguard and the single best way to avoid the
uncanny faces that mark an image as synthetic.

---

## 2. Midjourney setup — do this once

**Model and flags.** `--v 7` was the newest model as of this writing — use
whatever is current, and keep both flags below whichever it is. Two flags do
most of the work:

- `--style raw` turns off the default beautification pass. Without it every
  mechanical room comes out lit like a car advertisement.
- `--s 50` keeps the model literal. The default (100) invents equipment.

**The house style block.** Append this to every prompt below. It is what makes
the whole set look like one photographer's afternoon rather than forty-odd
different stock libraries.

```
documentary editorial photograph, Canon EOS R5, 24mm, f/5.6, natural available light, overcast coastal British Columbia daylight, neutral white balance, true-to-life colour, no HDR, fine sensor grain --style raw --s 50 --v 7 --no text, lettering, numbers, logos, brand names, watermark, signage, legible labels, illustration, 3d render, cgi, concept art, plastic skin, oversaturated colour, lens flare, fisheye, sparks, dramatic lighting
```

**Lock the look.** Generate prompt **S2** (the boiler plant) first and upscale
the best frame. Then add `--sref <that image URL> --sw 70` to every other
prompt. Without a style reference the set drifts: some frames warm and
cinematic, others cold and clinical, and the difference is obvious once two
of them sit side by side on `/services`.

**PPE, when a prompt has people.** Wrong protective equipment is the fastest
way to lose a facilities manager's trust. Append:

```
crew in CSA hard hats, hi-vis vests, safety glasses, work gloves, long sleeves and steel-toe boots, faces turned away from camera or in profile
```

Never generate: bare hands on pipe, shorts, open electrical panels with
someone reaching inside, roof-edge work without a railing, or hot work
without a face shield.

**The two failure modes to re-roll on, every time.**

1. **Legible text.** Valve tags, gauge faces, drawing title blocks, van
   livery. Midjourney produces text-shaped nonsense, and a facilities manager
   reads gauges for a living. The `--no` list above fights it; check anyway.
2. **Impossible pipework.** Pipes that pass through each other, flanges
   bolted to nothing, a pump with no suction side, four boilers on a header
   sized for one. This is the thing a mechanical contractor's own customers
   notice first. If the piping does not make sense, re-roll — do not retouch.

**Composition.** Every full-bleed hero on this site lays white type over the
lower left under a dark gradient. Keep the left 40% of the frame calm and
unimportant. Several heroes are also masked with an angled edge
(`clip-tilt`), so nothing that matters should sit in the top-right or
bottom-left corner.

---

## 3. The prompts

### 3.1 Home page hero — four slides

`--ar 16:9` · `src/lib/lcp-preload.ts` → `HOME_SLIDES`

Slide 1 is the LCP image of the whole site. Generate it at the highest
quality setting available and keep the subject in the right two thirds.

**H1 — rooftop ventilation**
> the flat gravel-and-membrane roof of a 1970s low-rise Canadian school, two large grey galvanised rooftop ventilation units with hinged service panels closed, insulated ductwork rising from roof curbs, a safety railing along the parapet, wet roof surface after rain, low grey overcast sky, forested coastal mountains on the horizon, no people, wide establishing view

**H2 — boiler plant**
> an institutional boiler room, four wall-hung condensing gas boilers in a row on a painted concrete block wall, black steel and copper headers with isolation valves overhead, insulated hydronic supply and return piping, two vertical in-line pumps on housekeeping pads, sealed concrete floor with a floor drain, bare linear fluorescent fixtures, clear service aisle, no people, straight-on view

**H3 — domestic water plant**
> an institutional mechanical room wall of domestic water equipment, a reduced-pressure backflow preventer assembly at chest height, a pressure-reducing valve station, a duplex domestic water booster pump set on a concrete housekeeping pad, copper manifolds with ball valves, insulated hot water recirculation lines, concrete block wall, no people

**H4 — heat pump conversion**
> a row of six outdoor air-source heat pump units on a raised steel frame beside the brick wall of a low-rise Canadian school, insulated refrigerant piping entering the building through a weatherhead, a cedar hedge and wet asphalt in the foreground, light rain, grey overcast, snow-capped coastal mountains far behind, no people

### 3.2 The six services

Each service needs one 16:9 frame (page hero) and one 3:2 frame (grid card).
Generate the 16:9 first, then re-run the same prompt with `--ar 3:2` so the
hero and the card are plainly the same room from a different distance.

Paste targets: `src/pages/Service*.tsx` → `heroImg`,
`src/lib/site-links.ts` → `SERVICE_LINKS[].image`,
`src/pages/Services.tsx` → `img`,
`src/components/ServicesShowcase.tsx` → `ITEMS[].img`.

**S1 — HVAC and ventilation** (`/services/hvac`)
> a flat institutional roof, a large grey rooftop air handling unit with one access door open showing a clean filter rack and a cooling coil, insulated supply and return ductwork on sleepers, a condensate line to a roof drain, parapet railing, puddles on the roof membrane, overcast daylight, no people

**S2 — Heating and boiler plants** (`/services/boilers`) — generate this one first, as the style anchor
> a clean commercial boiler room, three wall-hung condensing gas boilers with brushed stainless casings, a black steel primary header with isolation valves and a dirt separator, two base-mounted pumps with variable-frequency drive enclosures on the wall beside them, insulated hydronic piping with aluminium jacketing, a plate heat exchanger, sealed grey concrete floor, wide service aisle, no people, eye-level view

**S3 — Commercial and institutional plumbing** (`/services/commercial-plumbing`)
> a commercial plumbing service room, a reduced-pressure backflow preventer on a wall bracket with test cocks, a pressure-reducing valve station with a bypass, a duplex booster pump set, grooved-coupling steel riser, copper branch piping with insulated hot water recirculation, a floor sink below, concrete block wall, no people

**S4 — Preventive maintenance** (`/services/maintenance`)
> a service technician kneeling beside a condensing boiler with the front casing removed, a handheld combustion analyser in one gloved hand with the probe in the flue test port, a clipboard of service records on the floor beside the toolbag, a torque wrench and a rag on a drop sheet, institutional boiler room, available light, face in profile

**S5 — 24/7 emergency service** (`/services/emergency`)
> night exterior in the rain, a plain white service van backed up to the loading door of a low-rise institutional building, headlights and a roof-mounted amber beacon lit, wet asphalt reflecting the light, the van's rear doors open showing organised shelving of pipe fittings and tools, one technician carrying a toolbag toward the door seen from behind, dark, no streetlight glare, no van livery

**S6 — Residential plumbing** (`/services/residential-plumbing`)
> the utility room of a West Coast house, a wall-hung tankless gas water heater with copper connections, isolation valves with hose bibbs and a condensate line, an adjacent insulated hot water storage tank, a floor drain in sealed concrete, cedar-framed wall partly finished, soft daylight through a small high window, no people

**S7 — air handling interior**, for the home showcase HVAC card only, so the card and the service hero are not the same frame · `--ar 3:2`
> inside a mechanical penthouse, a large air handling unit with its access door open showing the filter bank and a cooling coil, a flexible duct connection to a plenum, a variable-frequency drive panel on the adjacent wall, a louvre letting in cool daylight, sealed concrete floor, no people

### 3.3 The four approach cards

`--ar 16:9` · `src/components/FeatureRibbon.tsx` → `src`

These sit under four claims, so the frame should show the claim happening.

**A1 — "We survey before we sequence"**
> two tradespeople in a school mechanical room with a rolled set of mechanical drawings opened flat across a pipe rack, one pointing up at overhead piping, a tape measure and a flashlight on the floor beside them, existing insulated piping and a buffer tank behind, seen from behind and to one side, no faces to camera

**A2 — "One schedule, every trade"**
> a site trailer table photographed from directly above, a mechanical floor plan, a sheet metal shop drawing, a hard hat on its crown, a two-way radio, an open laptop showing an abstract bar schedule, a coffee cup, a wet high-visibility jacket over the chair back, grey daylight from the trailer window, no people, no readable drawing content

**A3 — "The building stays open"**
> a school corridor during construction, a temporary dust barrier of clear plastic sheeting over a timber frame with a zippered access door, taped-down floor protection, a wheeled waste bin, lockers and a terrazzo floor visible beyond the barrier, overhead lights on, nobody present, mid-day

**A4 — "Proved before we leave"**
> close view of gloved hands holding a clipboard beside a newly installed pump set, a differential pressure gauge and a thermometer well in sharp focus, a brass valve tag on a chain, insulated piping with aluminium jacketing behind, institutional mechanical room, shallow depth of field, no legible text on the clipboard or gauge

### 3.4 Page heroes

**P1 — Careers** `--ar 16:9` · `src/pages/Careers.tsx` hero
> an apprentice and a journeyperson working together at a pipe vise on a portable tripod stand in a building service room, the apprentice cutting threaded steel pipe while the older tradesperson steadies it and watches, a threading machine and a bucket of cutting oil beside them, cedar and concrete interior, daylight from an open roll-up door, both seen from behind and in profile

**P2 — Careers culture strip** `--ar 16:9` · `src/pages/Careers.tsx` lower section
> four tradespeople standing in a loose half circle in a mechanical room at the end of a shift, hard hats under their arms, one holding a drawing roll, relaxed posture, insulated piping and a boiler plant behind them, available light, all seen from behind or in three-quarter profile, no faces to camera

**P3 — Contact** `--ar 16:9` · `src/pages/Contact.tsx` hero, and the matching backdrop in `src/index.css` (`.contact-photo-layout::before`)
> an editorial still life on a clean workbench, a plain hard hat, an unbranded clipboard with a blank enquiry form, a closed laptop, a rolled set of generic building drawings and a tape measure, a softly blurred mechanical workshop behind, natural daylight, charcoal and warm neutral palette, objects grouped to the right with uncluttered space to the left, no people, no readable paperwork

**P4 — Projects** `--ar 16:9` · `src/pages/Projects.tsx` hero
> a wide elevated view across the flat roof of a low-rise institutional building, three newly installed rooftop ventilation units in a line with fresh ductwork and new roof curbs, the school's courtyard and playing field below, residential streets and forested mountains beyond, grey overcast with a break of light, no people

**P5 — Services** `--ar 16:9` · `src/pages/Services.tsx` hero
> a wide view down the service aisle of a large institutional mechanical room, a boiler plant on the left, pumps and a plate heat exchanger on the right, insulated piping overhead on trapeze hangers, a DDC control panel at the far end with its door closed, sealed concrete floor, bare linear fixtures, no people, deep perspective

**P6 — Request a quote** `--ar 16:9` · `src/pages/GetQuote.tsx` hero
> a mechanical drawing set opened on a folding table in a mechanical room, a hard hat and a measuring tape weighting one corner, a boiler plant softly out of focus behind, daylight mixed with overhead fluorescent, no people, no readable drawing content

**P7 — About** `--ar 5:4` · `src/pages/About.tsx`
> a tradesperson in hard hat and hi-vis vest standing at a boiler plant reading a pressure gauge on the header, the plant filling the frame around them, insulated piping and two pumps in the foreground, institutional boiler room, available light, seen in profile, no face to camera

**P8 — Call-to-action band** `--ar 16:9` · `src/components/CallToAction.tsx`
> dusk exterior of a low-rise institutional building, warm light in the ground-floor windows, rooftop mechanical equipment in silhouette against a deep blue-grey sky, wet parking lot reflecting the light, bare maple branches at the edge of frame, no people, dark and even so white type reads over it

### 3.5 Project covers — eight subjects for nineteen cases

`--ar 5:4` · `src/data/projects.json` → `cover`

Today seven images cover nineteen projects, and the pairings are arbitrary: a
Burnaby residential boiler replacement and a Whistler school share a frame.
Eight subjects, assigned by the work the case actually describes:

| Prompt | Projects |
|---|---|
| PC1 school boiler plant | `glenayre`, `herbert-spencer`, `nestor`, `ridgeview` |
| PC2 residential building boiler room | `west-5th`, `jervis`, `halifax-7360` |
| PC3 air-source heat pump array | `herbert-spencer-ashp` |
| PC4 rooftop chiller | `capilano-birch`, `collingwood` |
| PC5 school roof, new rooftop units | `crosstown`, `crosstown-phase-2`, `hillcrest`, `leigh`, `miller-park` |
| PC6 classroom unit ventilator | `garibaldi`, `howe-sound` |
| PC7 Sea to Sky school in winter | `myrtle-philip` |
| PC8 domestic hot water plant | `haro` |

**PC1 — school boiler plant**
> a school boiler room after a plant replacement, six wall-hung condensing gas boilers in two banks of three, a black steel header with isolation valves and air separator, insulated primary and secondary piping, two pumps with drive enclosures, a DDC control panel with the door closed, new concrete housekeeping pads, sealed floor, no people

**PC2 — residential building boiler room**
> the boiler room of a mid-century low-rise apartment building, two wall-hung condensing boilers replacing an older plant, an insulated domestic hot water storage tank with a recirculation pump, copper and steel piping routed around an existing concrete beam, an old painted floor drain, exposed joists, a small window at grade, no people

**PC3 — air-source heat pump array**
> eight outdoor air-source heat pump units on a galvanised steel support frame beside the brick wall of an elementary school, insulated refrigerant lines entering through a sealed penetration, a chain-link service enclosure, wet asphalt and a cedar hedge, light rain, grey overcast, no people

**PC4 — rooftop chiller**
> an air-cooled chiller on a flat institutional roof, fans in a row along the top, chilled water supply and return piping with insulation and victaulic couplings running to a roof penetration, a vibration isolation rail, parapet railing, a campus of low concrete buildings and tall conifers below, overcast, no people

**PC5 — school roof, new rooftop units**
> three new rooftop ventilation units installed on a school roof, new roof curbs with fresh membrane flashing, insulated supply and return duct runs on sleepers, an electrical disconnect on a unipost, a crane outrigger pad still in place at the edge of frame, the school's covered walkway and field below, grey overcast, no people

**PC6 — classroom unit ventilator**
> an empty Canadian elementary classroom, a new low horizontal unit ventilator along the window wall with its grille in place and a fresh painted enclosure, a pencil line of new sealant along the sill, desks stacked at the back under plastic sheeting, floor protection taped down, daylight through the windows, no people

**PC7 — Sea to Sky school in winter**
> the exterior of a mountain-town community school in winter, snow on the flat roof and the new rooftop mechanical units, a plowed parking lot, steep forested slopes and a snow-covered peak directly behind the building, flat overcast light, bare maples, no people

**PC8 — domestic hot water plant**
> the mechanical room of a residential high-rise, two wall-hung condensing boilers and a pair of insulated indirect domestic hot water tanks, a plate heat exchanger on a wall stand, copper recirculation piping with balancing valves, a booster pump set, pipe labels left blank, sealed concrete floor, no people

### 3.6 Article headers

`--ar 16:9` · `src/data/posts.json` → `image`
(`posts-index.json` is generated by `npm run build` — never edit it by hand.)

Twelve articles show `/images/article-placeholder.svg` today. One prompt each:

**`boiler-replacement-or-repair`**
> an older commercial gas boiler with its front casing removed for inspection, a scaled heat exchanger and a corroded flue collar visible, an inspection mirror and a flashlight held at the opening by a gloved hand, a newer boiler out of focus beside it, boiler room, available light

**`controls-boiler-plant-coordination`**
> a DDC control panel with its door swung open, neat terminal strips and labelled wire looms with blank labels, a laptop on a stool connected by a service cable, the boiler plant it serves out of focus behind, no readable screen or label text

**`hydronic-heating-domestic-hot-water`**
> a plate heat exchanger on a wall stand between a heating header and an insulated storage tank, primary and secondary piping with balancing valves and thermometer wells, aluminium-jacketed insulation, a circulation pump below, institutional mechanical room, no people

**`mechanical-career-paths`**
> a plumbing and heating shop, an apprentice at a pipe threading machine cutting threads on steel pipe, a journeyperson beside the bench checking a fitting against a drawing, racks of pipe and fittings behind, roll-up door daylight, both in profile, no faces to camera

**`preparing-chiller-replacement`**
> a mobile crane lifting a chiller module above a downtown street toward the roof of a mid-rise concrete building, the street closed below with traffic cones and a flag person, glass towers and an overcast sky behind, seen from street level, no legible signage

**`school-heat-pump-upgrade-discussion`**
> two people in hard hats and hi-vis vests standing at a new outdoor heat pump array beside a school, one holding a rolled drawing and gesturing at the refrigerant piping, a cedar hedge and wet asphalt, light rain, seen from behind

**`testing-balancing-programme`**
> a balancing technician holding a flow capture hood up to a ceiling diffuser in an empty classroom, a digital manometer clipped to the hood, a clipboard of readings under one arm, stacked chairs and daylight through the windows, seen from below and behind

**`working-in-schools-coordination`**
> an empty Canadian classroom prepared for mechanical work, furniture stacked and wrapped at the back, taped floor protection across the room, a ceiling tile removed showing new insulated piping above, a stepladder and a dust extractor, lights on, nobody present

**`rooftop-chiller-downtown-vancouver`**
> an air-cooled chiller newly installed on the roof of a downtown concrete building, chilled water piping insulated and flashed at the penetration, a parapet railing, glass office towers close behind and forested mountains across the water beyond, overcast, no people

**`school-air-source-heat-pump-conversion`**
> a long row of outdoor air-source heat pump units on a steel frame along a school wall in steady rain, water running off the casings, insulated refrigerant lines in a cable tray, snow-capped peaks behind low cloud, wet playground asphalt in the foreground, no people

**`working-in-occupied-schools-and-buildings`**
> a school corridor during a night shift, a zippered dust barrier lit from inside, floor protection and a cable run along the baseboard, a work light on a tripod, dark classroom windows beyond, nobody present, cool overhead light

**`commissioning-and-handover`**
> operation and maintenance binders stacked beside a rolled set of as-built drawings on a folding table in a finished mechanical room, a brass valve tag and a blank equipment nameplate in focus on the pipe behind, clean plant and sealed floor, no people, no readable text on the binders

The other ten articles already draw on the generated library. Point each at
the service image for its category once the set above exists:

| Category | Use |
|---|---|
| Heating & boilers | S2 |
| School projects | S1 or PC5 |
| Cooling systems | PC4 |
| Residential buildings | PC2 |
| Maintenance | S4 |
| Project planning | P6 |

---

## 4. Putting them on the site

**Naming.** `allied-<slot>-<subject>.jpg` — `allied-s2-boiler-plant.jpg`,
`allied-pc5-school-roof-rtu.jpg`. The current library is `3_gk4dl8.png`,
`123_clbeb3.png`, `Screenshot_2025-10-09_at_11.27.02_PM.png`; nobody can tell
from a name like that which page breaks when it is replaced.

**Format.** Upload JPEG, not PNG. Every one of these is a photograph, and the
current PNGs are several times the size they need to be. Cloudinary serves
WebP and AVIF from the JPEG automatically through `f_auto`.

**Size.** Upload the largest frame Midjourney gives you and let Cloudinary
resize. Do not pre-crop to 1200px.

**The URL rule.** Paste only the bare upload URL —
`https://res.cloudinary.com/dzytbkc5l/image/upload/v<version>/Allied/<name>.jpg`.
Never hand-write a transformation segment (`w_1200`, `c_limit`, `q_auto:eco`).
`src/lib/images.ts` is the only place allowed to build those, and it exists
because hand-written URLs are how the site ended up serving a 1032px square
stretched to 1614px. Several existing call sites still carry hand-written
transformations; strip them as you replace each one.

**Captions and alt text.** Three things to fix as the real set goes in:

- `imageCaption` in `projects.json` must stay on any cover that is still
  generated, and be removed on any cover that becomes a real photograph.
- `imageAlt` exists on all nineteen projects, is empty on all nineteen, and
  is read by nothing — `ProjectDetail.tsx` hard-codes `alt=""`. When real
  photography arrives, fill that field and wire it up. Until then an empty
  alt is correct: a decorative illustration should not be described.
- Alt text describes what is visible, and only once it is confirmed: "Boiler
  plant at Ridgeview Elementary" only for a photograph taken at Ridgeview.
  No keyword lists.

**The preload.** `src/lib/lcp-preload.ts` holds the home page's four hero
slides and must match what `Hero.tsx` renders character for character, or the
browser downloads one image and shows another. Replace `HOME_SLIDES` there —
`Home.tsx` imports it, so the two cannot drift.

**Dead data.** `src/data/services-content.json` carries images too and is read
only by the sitemap generator — nothing renders it. Do not spend time updating
images in it.

**After replacing:**

```bash
npm run build && npm test && npm run check:head
```

The head check reports the D-01 image warnings; they should fall as the real
set lands.

---

## 5. For real photographs, when they exist

A real photograph of a real project beats every prompt on this page, and the
nineteen project covers are the slots where it actually matters. Minimum
useful set per case: **one wide establishing frame, two details, one building
context, one work-in-progress frame.** Before-and-after only with a genuine
pair from the same position.

Record for every file: the building, the date, who shot it, who authorised
publication, who appears in it and whether they consented, the caption, the
alt text, where it goes, and whether it is a photograph or an illustration.
Keep out of the public set: personal data, screens showing credentials, key
numbers, and confidential drawings.

**Editing a real photograph** — an image-edit prompt, with the real frame
attached. Never use it to invent an object:

> Edit the supplied documentary photograph for the Allied Plumbing website. Preserve the exact equipment, quantities, piping routes, labels, building geometry and visible installation condition. Correct white balance, exposure, lens distortion and vertical perspective. Reduce sensor noise without removing technical detail. Do not add, remove, replace or finish any equipment. Do not change safety conditions or make unfinished work appear complete. Produce a natural editorial photograph, not a cinematic render. Crop to 4:5 with room around the equipment for the angled website mask. No added text, badges or logos.

**Portraits** — the same, with the real portrait attached. Three of the six
team members have no photograph at all:

> Create a polished editorial crop of the supplied real portrait of [NAME] for Allied Plumbing. Preserve the person's identity, facial structure, age, skin texture and expression. Natural soft daylight, neutral charcoal or softly blurred workshop background, realistic colour. Head and shoulders fully visible with generous space above the hair and at both sides. Vertical 4:5 composition, eye level, professional and approachable. Do not change the person's face, invent credentials, add a uniform or generate a different person. No text or logo.

---

## 6. Order of work

1. **S2**, upscaled, as the style anchor for everything else.
2. The six service images, 16:9 and 3:2. They carry four slots each — service
   hero, services grid, services page card, home showcase — so they clear more
   of the site than any other group.
3. The four home hero slides. H1 is the LCP image of the site.
4. The twelve article headers, which replace a visible placeholder and a
   caption admitting it.
5. The eight project covers, captions left in place.
6. The page heroes and the call-to-action band.
7. Three real team portraits and one real team photograph — the only items on
   this page that cannot be generated at all, and the reason to book a
   photographer rather than only prompt.
