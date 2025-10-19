import { Link, useLocation } from "react-router-dom";

export default function NotFound() {
  const { pathname } = useLocation();

  return (
    <main className="relative min-h-[88vh] bg-white text-neutral-900 overflow-hidden">
      {/* soft background gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 to-white" />
        <div
          className="absolute -top-24 -left-24 h-[26rem] w-[26rem] rounded-full blur-3xl opacity-40"
          style={{ background: "radial-gradient(closest-side,#93c5fd 25%,transparent)" }}
        />
        <div
          className="absolute -bottom-32 -right-24 h-[28rem] w-[28rem] rounded-full blur-3xl opacity-40"
          style={{ background: "radial-gradient(closest-side,#a7f3d0 22%,transparent)" }}
        />
      </div>

      {/* hero block */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 pt-20 md:pt-28 pb-12">
        {/* tiny badge */}
        <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 text-blue-700 px-3 py-1 text-xs font-medium ring-1 ring-blue-200">
          {/* droplet */}
          <svg width="14" height="14" viewBox="0 0 24 24" className="shrink-0"><path fill="currentColor" d="M12 2s6 7 6 11a6 6 0 1 1-12 0c0-4 6-11 6-11z"/></svg>
          Plumbing 404
        </span>

        <div className="mt-4 md:mt-6 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Illustration */}
          <div className="order-2 md:order-1 relative">
            <div className="relative rounded-2xl bg-white/65 backdrop-blur p-6 ring-1 ring-white shadow-[0_20px_60px_-25px_rgba(2,6,23,.2)]">
              {/* stylized pipe */}
              <svg
                viewBox="0 0 600 300"
                className="w-full h-56 md:h-64"
                role="img"
                aria-label="Stylized plumbing pipe illustration"
              >
                <defs>
                  <linearGradient id="pipe" x1="0" x2="1">
                    <stop offset="0%" stopColor="#94a3b8" />
                    <stop offset="100%" stopColor="#64748b" />
                  </linearGradient>
                  <linearGradient id="water" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>

                {/* main pipe */}
                <rect x="40" y="110" width="520" height="52" rx="18" fill="url(#pipe)" />
                {/* elbow */}
                <rect x="500" y="110" width="60" height="120" rx="18" fill="url(#pipe)" />
                {/* flowing water */}
                <rect x="492" y="160" width="76" height="14" rx="7" fill="url(#water)">
                  <animate attributeName="x" from="492" to="460" dur="1.4s" repeatCount="indefinite" />
                </rect>
                {/* wrench icon */}
                <g transform="translate(110,88) scale(1.2)" fill="#111827" opacity="0.9">
                  <path d="M38 10a10 10 0 0 0-7 2l6 6-9 9-6-6a10 10 0 0 0 12 14l4 4a6 6 0 0 0 8-8l-4-4A10 10 0 0 0 38 10z" />
                </g>

                {/* 404 text on pipe */}
                <text x="70" y="145" fontSize="48" fontWeight="800" fill="#0f172a" opacity=".9">404</text>
                <text x="140" y="145" fontSize="18" fill="#0f172a" opacity=".75">This line is under maintenance…</text>
              </svg>

              {/* subtle divider */}
              <PipeDivider />
              {/* Path shown */}
              <div className="mt-4 text-sm text-neutral-600">
                We couldn’t find: <span className="font-mono text-neutral-900">{pathname}</span>
              </div>
            </div>
          </div>

          {/* Copy + CTAs */}
          <div className="order-1 md:order-2">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Uh-oh, that page sprung a leak.
            </h1>
            <p className="mt-3 text-neutral-600 max-w-prose">
              The link you followed may be broken or the page may have been moved.
              Let’s get you back on flow.
            </p>

            {/* smart shortcuts */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-900 text-white px-5 py-3 font-semibold shadow hover:brightness-110"
              >
                Go home <span aria-hidden>↗</span>
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white px-5 py-3 font-semibold hover:bg-neutral-100"
              >
                View services
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white px-5 py-3 font-semibold hover:bg-neutral-100"
              >
                Our projects
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5776c6] text-white px-5 py-3 font-semibold hover:brightness-110"
              >
                Get a quote
              </Link>
            </div>

            {/* quick search */}
            <form action="/search" className="mt-6">
              <label htmlFor="q" className="sr-only">Search</label>
              <div className="flex rounded-xl border border-neutral-200 bg-white/80 backdrop-blur focus-within:ring-2 focus-within:ring-[#5776c6]">
                <input
                  id="q"
                  name="q"
                  placeholder="Search site…"
                  className="w-full rounded-l-xl bg-transparent px-4 py-2.5 outline-none"
                />
                <button className="rounded-r-xl bg-neutral-900 text-white px-4 py-2.5 font-semibold hover:brightness-110">
                  Search
                </button>
              </div>
            </form>

            {/* contact line */}
            <p className="mt-4 text-sm text-neutral-600">
              Still stuck? Call <a className="underline decoration-1 underline-offset-2" href="tel:604-731-1000">604-731-1000</a> — 24/7 emergency.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

/** small decorative divider that looks like a pipe section */
function PipeDivider() {
  return (
    <div className="mt-4 flex items-center gap-2 text-neutral-400">
      <span className="h-1 w-10 rounded-full bg-neutral-300" />
      <span className="h-2 w-2 rounded-full bg-neutral-400" />
      <span className="h-1 flex-1 rounded-full bg-neutral-200" />
      <span className="h-2 w-2 rounded-full bg-neutral-400" />
      <span className="h-1 w-10 rounded-full bg-neutral-300" />
    </div>
  );
}