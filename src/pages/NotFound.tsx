// src/pages/NotFound.tsx
import { Link, useLocation } from "../lib/navigation";

export default function NotFound() {
  const { pathname } = useLocation();

  return (
    <div className="relative min-h-[88vh] bg-white text-neutral-900 overflow-hidden">
      {/* soft background */}
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

      <section className="max-w-6xl mx-auto px-4 md:px-6 pt-20 md:pt-28 pb-12">
        {/* badge */}
        <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 text-blue-700 px-3 py-1 text-xs font-medium ring-1 ring-blue-200">
          <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
            <path fill="currentColor" d="M12 2s6 7 6 11a6 6 0 1 1-12 0c0-4 6-11 6-11z" />
          </svg>
          Plumbing 404
        </span>

        <div className="mt-4 md:mt-6 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Illustration */}
          <div className="order-2 md:order-1">
            <div className="relative rounded-2xl bg-white/65 backdrop-blur p-6 ring-1 ring-white shadow-[0_20px_60px_-25px_rgba(2,6,23,.2)]">
              <Plumbing404Illustration />
              <PipeDivider />
              <div className="mt-4 text-sm text-neutral-600">
                We couldn’t find:{" "}
                <span className="font-mono text-neutral-900">{pathname}</span>
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
                to="/GetQuote"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5776c6] text-white px-5 py-3 font-semibold hover:brightness-110"
              >
                Get a quote
              </Link>
            </div>

            {/* quick search */}
            <form action="/search" className="mt-6" role="search" aria-label="Site search">
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

            <p className="mt-4 text-sm text-neutral-600">
              Still stuck? Call{" "}
              <a className="underline underline-offset-2" href="tel:604-731-1000">
                604-731-1000
              </a>{" "}
              — 24/7 emergency.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

/* --------- illustration with clean animation ---------- */
function Plumbing404Illustration() {
  return (
    <svg
      viewBox="0 0 600 260"
      className="w-full h-56 md:h-64"
      role="img"
      aria-label="Pipe under maintenance animation"
    >
      <defs>
        <linearGradient id="pipe" x1="0" x2="1">
          <stop offset="0%" stopColor="#9aa5b1" />
          <stop offset="100%" stopColor="#6b7280" />
        </linearGradient>
        <linearGradient id="water" x1="0" x2="1">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>

        {/* clip keeps the water strictly inside the pipe + elbow */}
        <clipPath id="pipe-clip">
          <rect x="40" y="96" width="480" height="48" rx="16" />
          <rect x="480" y="96" width="60" height="120" rx="16" />
        </clipPath>

        <circle id="bubble" cx="0" cy="0" r="6" />
      </defs>

      {/* Pipe */}
      <rect x="40" y="96" width="480" height="48" rx="16" fill="url(#pipe)" />
      <rect x="480" y="96" width="60" height="120" rx="16" fill="url(#pipe)" />

      {/* 404 + label (поднято, не пересекается с текстом) */}
      <text x="60" y="122" fontSize="46" fontWeight="800" fill="#0f172a" opacity=".92">404</text>
      <text x="128" y="132" fontSize="18" fill="#0f172a" opacity=".75">
        This line is under maintenance…
      </text>

      {/* Water flow — clipped to pipe */}
      <g clipPath="url(#pipe-clip)">
        {/* moving bar */}
        <rect x="60" y="110" width="140" height="20" rx="10" fill="url(#water)">
          <animate
            attributeName="x"
            values="60; 460; 60"
            keyTimes="0; .5; 1"
            dur="2.2s"
            calcMode="spline"
            keySplines=".25,.1,.25,1; .25,.1,.25,1"
            repeatCount="indefinite"
          />
        </rect>

        {/* bubbles */}
        <use href="#bubble" fill="#bae6fd" opacity=".95">
          <animate attributeName="cx" values="90; 470" dur="2.2s" repeatCount="indefinite" />
          <animate attributeName="cy" values="118;118" dur="2.2s" repeatCount="indefinite" />
        </use>
        <use href="#bubble" fill="#a5f3fc" opacity=".9">
          <animate attributeName="cx" values="140; 520" dur="2.2s" begin=".3s" repeatCount="indefinite" />
          <animate attributeName="cy" values="122;122" dur="2.2s" begin=".3s" repeatCount="indefinite" />
        </use>
      </g>

      {/* Respect reduced motion */}
      <style>
        {`
          @media (prefers-reduced-motion: reduce) {
            animate { display: none; }
          }
        `}
      </style>
    </svg>
  );
}

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