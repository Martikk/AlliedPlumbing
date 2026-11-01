# Motion and content implementation

- Mobile navigation: CSS opacity/translateY, 180 ms strong ease-out, top origin, discrete display transition. Closed links are inert/aria-hidden immediately. Keyboard/Escape is instant; reduced motion retains only a 100 ms fade. Browsers without discrete display transitions fall back to immediate hide.
- Contact, Quote and Careers status: WAAPI feedback 180 ms opacity/translateY 6 px; reduced motion 100 ms opacity only. Existing live region remains mounted; text and focus are not delayed. No fake submission was sent for visual testing.
- About list: 140 ms opacity-only on pointer selection, cancels/retargets current animation on fast changes; keyboard/reduced motion instant.
- FAQ: native details/summary, pointer-only 160 ms opacity and plus rotation. No height animation, keyboard instant.
- Project cards: individual hover lift 3 px/160 ms only for fine hover pointers; reduced-motion static outline. No additional autoplay or counters.
- Logo marquee: existing 32 s loop, pause button/hover/focus/reduced-motion retained; now paused offscreen and in hidden documents. Video already has viewport/document/reduced-motion gating.
- Removed the existing 500 ms form entrance on Quote so input controls do not slide into place.
- Supplied copy added to Home, About, service detail pages, Team responsibilities, Quote, Careers process, Contact routing and Blog introduction. Existing duplicate service children rendering removed.

Browser QA: 390 px iframe viewport, mobile pointer open, Escape restoring toggle focus, keyboard open, link navigation and native FAQ pointer/keyboard toggles. Main content SSR build/hydration also checked. Chrome native UI was unavailable during testing, so stable in-app Chromium used for these checks. Physical-device motion feel remains a manual follow-up.

Articles implemented after motion and page copy: four planning guides, separate routes/prerender/canonicals/sitemap/checklists. Remaining eight technical/HR topics are tracked in docs/content/next-editorial-cycle.md.
