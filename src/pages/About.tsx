import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

/* ——— tiny local counter for stats ——— */
function CountUp({ to, duration = 1600 }: { to: number; duration?: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return <>{v.toLocaleString()}</>;
}

export default function About() {
  return (
    <main className="bg-white text-neutral-900">
      {/* ====== HERO ====== */}
      <section className="relative overflow-hidden">
        {/* background image */}
        <img
          src="https://res.cloudinary.com/dzytbkc5l/image/upload/v1760065875/Allied/1_tc9jiy.png"
          alt=""
          className="absolute inset-0 h-[54vh] md:h-[64vh] w-full object-cover"
        />
        {/* gradient & glass card */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 md:px-6 pt-28 md:pt-36 pb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 text-white px-3 py-1 text-xs ring-1 ring-white/25 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400" /> About Allied
          </div>
          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow">
            Built on Trust. <br className="hidden md:block" />
            Driven by Craft.
          </h1>
          <p className="mt-3 max-w-2xl text-white/85">
            We’ve kept BC’s buildings running for years — from schools and strata to
            commercial and residential. Our promise is simple: do it right, stand behind it,
            and be there 24/7 when it matters.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-white text-neutral-900 px-5 py-3 font-semibold shadow hover:bg-neutral-200"
            >
              Get a quote <span aria-hidden>↗</span>
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 text-white px-5 py-3 font-semibold backdrop-blur hover:bg-white/20"
            >
              View our projects
            </Link>
          </div>
        </div>
      </section>

      {/* ====== MISSION / SNAPSHOT ====== */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-14 md:py-20">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Our mission is simple:
              <br className="hidden md:block" /> keep BC running.
            </h2>
            <p className="mt-4 text-neutral-600">
              Allied Plumbing, Heating &amp; Air Conditioning is a full-service mechanical
              partner. We design, build, maintain, and respond — with code-compliant
              installs, proactive maintenance, and emergency support around the clock.
            </p>

            {/* Values chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Safety-first crews",
                "BIM & DDC integration",
                "School & strata specialists",
                "Warranty & service",
                "Transparent reporting",
                "Energy efficiency",
              ].map((v) => (
                <span
                  key={v}
                  className="inline-flex items-center rounded-full bg-neutral-100 text-neutral-700 px-3 py-1 text-sm"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>

          {/* Image card with slanted mask */}
          <div className="relative">
            <div
              className="relative overflow-hidden rounded-2xl shadow-xl"
              style={{ clipPath: "polygon(12% 0%,100% 0%,88% 100%,0% 100%)" }}
            >
              <img
                src="https://res.cloudinary.com/dzytbkc5l/image/upload/v1760068156/Allied/14_urnogx.png"
                alt=""
                className="block h-[300px] w-full md:h-[380px] object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-white/80 backdrop-blur px-4 py-3 text-sm shadow ring-1 ring-white/60">
                Coastal-ready installs • UV/salt-air protection • Heat pumps &amp; VRF
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-10 md:mt-14 rounded-2xl bg-[rgb(240_249_255_/_0.8)] border border-[rgb(240_249_255_/_0.8)] p-6 md:p-10 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <Stat n={<CountUp to={8000} />} label="Projects completed" />
            <Stat n={<CountUp to={5000} />} label="Customers served" />
            <Stat n={<CountUp to={12} />} label="Years in operation" />
            <Stat n={<CountUp to={92} />} label="Team engineers" />
          </div>
        </div>
      </section>

      {/* ====== CAPABILITIES ====== */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-14 md:py-20">
        <div className="mb-8">
          <span className="inline-block text-xs md:text-sm px-3 py-1 rounded-full bg-neutral-100 text-neutral-600">
            What we do
          </span>
          <h3 className="mt-3 text-2xl md:text-4xl font-extrabold">End-to-end mechanical</h3>
          <p className="mt-2 text-neutral-600 max-w-2xl">
            From design and BIM coordination to commissioning and ongoing care — we handle the
            whole lifecycle, so you get fewer change orders and more uptime.
          </p>
        </div>

        <div className="grid gap-6 md:gap-8 md:grid-cols-3">
          {[
            {
              t: "Design & Build",
              p: "Code-compliant, energy-efficient mechanical systems tailored to your site.",
              img: "https://res.cloudinary.com/dzytbkc5l/image/upload/v1760065876/Allied/3_gk4dl8.png",
            },
            {
              t: "Maintenance",
              p: "Preventive programs with trend reviews, DDC checks, and reporting.",
              img: "https://res.cloudinary.com/dzytbkc5l/image/upload/v1760069670/Allied/maintance_grwetv.png",
            },
            {
              t: "24/7 Emergency",
              p: "Fast response for leaks, outages, and critical equipment failures.",
              img: "https://res.cloudinary.com/dzytbkc5l/image/upload/v1760070439/Allied/247_bs1xho.png",
            },
          ].map((c) => (
            <article
              key={c.t}
              className="group rounded-2xl overflow-hidden ring-1 ring-black/5 shadow-sm bg-white hover:shadow-md transition"
            >
              <img src={c.img} alt="" className="h-44 w-full object-cover group-hover:brightness-105 transition" />
              <div className="p-5">
                <h4 className="font-semibold text-lg">{c.t}</h4>
                <p className="mt-1 text-neutral-600 text-sm">{c.p}</p>
                <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-[#5776c6]">
                  Learn more <span aria-hidden>↗</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ====== CREDENTIALS / BADGES ====== */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-14 md:py-20">
        <div className="rounded-2xl bg-neutral-50 p-6 md:p-10 ring-1 ring-neutral-200/60">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-4xl font-extrabold">Certified &amp; School-Safe</h3>
              <ul className="mt-4 space-y-3 text-neutral-700">
                {[
                  "COR & WorkSafeBC compliant; $5M liability + WCB in good standing",
                  "Background-checked, school-approved crews (SD39 / SD40 / SD43)",
                  "Certified: fall protection, confined spaces, WHMIS",
                  "12-month workmanship warranty + ongoing service support",
                ].map((li) => (
                  <li key={li} className="flex items-start gap-3">
                    <svg className="mt-1 h-5 w-5 shrink-0 text-neutral-900" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M7.5 13.5 3.8 9.8l1.4-1.4 2.3 2.3 6.3-6.3 1.4 1.4-7.7 7.7Z" />
                    </svg>
                    <span>{li}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {[
                "https://res.cloudinary.com/dzytbkc5l/image/upload/v1760074743/Allied/IBC-Logo-for-Gallery_hsklz0.webp",
                "https://res.cloudinary.com/dzytbkc5l/image/upload/v1760074745/Allied/Rinnai_Logo_Red_uqwftm.png",
                "https://res.cloudinary.com/dzytbkc5l/image/upload/v1760074743/Allied/png-clipart-daikin-air-conditioning-heating-system-service-others-blue-text_novbee.png",
                "https://res.cloudinary.com/dzytbkc5l/image/upload/v1760074743/Allied/images_br94nf.png",
                "https://res.cloudinary.com/dzytbkc5l/image/upload/v1760068155/Allied/10_kubptf.png",
                "https://res.cloudinary.com/dzytbkc5l/image/upload/v1760068156/Allied/14_urnogx.png",
              ].map((src, i) => (
                <div key={i} className="aspect-[4/3] rounded-xl bg-white ring-1 ring-neutral-200 grid place-items-center p-3">
                  <img src={src} alt="" className="max-h-full max-w-full object-contain grayscale opacity-80" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====== LEADERSHIP TEASER ====== */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-14 md:py-20">
        <div className="mb-6 md:mb-8 flex items-end justify-between gap-4">
          <div>
            <span className="inline-block text-xs md:text-sm px-3 py-1 rounded-full bg-neutral-100 text-neutral-600">
              Our team
            </span>
            <h3 className="mt-3 text-2xl md:text-4xl font-extrabold">Meet the leadership</h3>
            <p className="mt-2 text-neutral-600">Experienced, certified, and hands-on.</p>
          </div>
          <Link
            to="/team"
            className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-[#5776c6] text-white px-4 py-2 text-sm font-semibold hover:brightness-110"
          >
            View all <span aria-hidden>↗</span>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              name: "Nick Fedele",
              role: "Accounts Manager",
              img: "https://res.cloudinary.com/dzytbkc5l/image/upload/v1760038738/Allied/IMG_1095_ptva4x.jpg",
            },
            {
              name: "Alex Martishyn",
              role: "Project Manager",
              img: "https://res.cloudinary.com/dzytbkc5l/image/upload/v1760073539/Allied/09738F7C-ACFD-44A8-A508-56BC9B644BF2_y4vmko.jpg",
            },
            {
              name: "Site Leadership",
              role: "Foremen & Coordinators",
              img: "https://res.cloudinary.com/dzytbkc5l/image/upload/v1760074289/Allied/345345_ylvyhu.png",
            },
          ].map((p) => (
            <article key={p.name} className="group rounded-2xl overflow-hidden bg-white ring-1 ring-black/5 shadow-sm">
              <img src={p.img} alt="" className="h-64 w-full object-cover group-hover:scale-[1.02] transition" />
              <div className="p-5">
                <div className="font-semibold">{p.name}</div>
                <div className="text-sm text-neutral-600">{p.role}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-14 md:py-20">
        <div className="relative overflow-hidden rounded-2xl bg-neutral-900 text-white p-6 md:p-10">
          <div className="absolute -top-10 -right-10 h-56 w-56 rounded-full blur-3xl opacity-30"
               style={{ background: "radial-gradient(closest-side,#60a5fa 30%,transparent)" }} />
          <h3 className="text-2xl md:text-4xl font-extrabold">Let’s build something that lasts</h3>
          <p className="mt-2 text-white/80 max-w-prose">
            Send drawings, scopes, or a quick note — our team will respond with a plan and a clear estimate.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-white text-neutral-900 px-5 py-3 font-semibold shadow hover:bg-neutral-200"
            >
              Get a quote <span aria-hidden>↗</span>
            </Link>
            <a
              href="tel:604-731-1000"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-5 py-3 font-semibold backdrop-blur hover:bg-white/20"
            >
              24/7 Emergency: 604-731-1000
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ——— small presentational block for stats ——— */
function Stat({ n, label }: { n: React.ReactNode; label: string }) {
  return (
    <div className="space-y-1">
      <div className="text-3xl md:text-4xl font-extrabold text-neutral-900">{n}</div>
      <div className="text-sm md:text-base text-neutral-600">{label}</div>
    </div>
  );
}