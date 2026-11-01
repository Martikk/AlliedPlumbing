import { Link } from "../lib/navigation";

type Highlight = { label: string; value: string };
type Props = {
  title: string;
  subtitle: string;
  description: string;
  heroImg: string;
  highlights: Highlight[];
  bullets: string[];
  children?: React.ReactNode;   // ← добавили
};

export default function ServiceTemplate({
  title,
  subtitle,
  description,
  heroImg,
  highlights,
  bullets,
  children,                      // ← добавили
}: Props) {
  return (
    <div className="bg-white text-neutral-900">

      {/* ==== HERO ==== */}
      <section className="page-photo-hero relative overflow-hidden">
        <img
          src={heroImg}
          alt=""
          className="absolute inset-0 h-[44vh] md:h-[58vh] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 md:px-6 pt-28 md:pt-36 pb-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 text-white px-3 py-1 text-xs ring-1 ring-white/25 backdrop-blur">
            {subtitle}
          </span>
          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-white/90">{description}</p>
        </div>
      </section>

      {/* ==== OVERVIEW ==== */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div>
            <h2 className="text-2xl md:text-4xl font-extrabold mb-3">
              What We Deliver
            </h2>
            <ul className="space-y-2 text-neutral-700">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <svg
                    className="h-5 w-5 text-[#5776c6] mt-[2px]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M7.5 13.5 3.8 9.8l1.4-1.4 2.3 2.3 6.3-6.3 1.4 1.4-7.7 7.7Z" />
                  </svg>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {highlights.map((h) => (
              <div
                key={h.label}
                className="rounded-2xl border border-neutral-200 p-5 text-center bg-neutral-50 hover:bg-neutral-100 transition"
              >
                <div className="text-2xl md:text-3xl font-extrabold text-[#5776c6]">
                  {h.value}
                </div>
                <div className="text-sm md:text-base text-neutral-700">
                  {h.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {children}

      {/* ==== CTA ==== */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 pb-16 md:pb-24">
        <div className="relative overflow-hidden rounded-2xl bg-neutral-900 text-white p-6 md:p-10">
          <div
            className="absolute -top-10 -right-10 h-56 w-56 rounded-full blur-3xl opacity-30"
            style={{ background: "radial-gradient(closest-side,#60a5fa 30%,transparent)" }}
          />
          <h3 className="text-2xl md:text-4xl font-extrabold">Need help today?</h3>
          <p className="mt-2 text-white/80 max-w-prose">
            Request a service visit or discuss a project with our team. For urgent assistance, call.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              to="/GetQuote"
              className="inline-flex items-center gap-2 rounded-lg bg-white text-neutral-900 px-5 py-3 font-semibold shadow hover:bg-neutral-200"
            >
              Get a quote <span aria-hidden>↗</span>
            </Link>
            <a
              href="tel:604-731-1000"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-5 py-3 font-semibold backdrop-blur hover:bg-white/20"
            >
              Call 604-731-1000
            </a>
          </div>
        </div>
      </section>
      {children ? <section className="max-w-6xl mx-auto px-4 md:px-6 pb-12">{children}</section> : null}
    </div>
  );
  }