import { useMemo, useState, useEffect } from "react";
import { Link, NavLink, useSearchParams } from "react-router-dom";

type Project = {
  id: string;
  title: string;
  location: string;
  category: "Commercial" | "Institutional" | "Residential";
  cover: string;
  images?: string[];
  blurb: string;
  year: number;
};

const DATA: Project[] = [
  {
    id: "garibaldi",
    title: "Garibaldi Secondary — HVAC Retrofit",
    location: "Maple Ridge, BC",
    category: "Institutional",
    year: 2024,
    cover:
      "https://res.cloudinary.com/dzytbkc5l/image/upload/v1760074743/Allied/garibaldi.webp",
    images: [
      "https://res.cloudinary.com/dzytbkc5l/image/upload/v1760065876/Allied/3_gk4dl8.png",
      "https://res.cloudinary.com/dzytbkc5l/image/upload/v1760068156/Allied/14_urnogx.png",
    ],
    blurb:
      "VRF + DDC integration, unit ventilators, demand control and heat recovery upgrades.",
  },
  {
    id: "ridgeview",
    title: "Ridgeview Elementary — Boiler Plant",
    location: "West Vancouver, BC",
    category: "Institutional",
    year: 2023,
    cover:
      "https://res.cloudinary.com/dzytbkc5l/image/upload/v1760074743/Allied/ridgeview.webp",
    blurb:
      "IBC condensing boilers, primary-secondary with VFD pumps, DHW mixing and safeties.",
  },
  {
    id: "leigh",
    title: "Leigh Elementary — Heating Upgrade",
    location: "Coquitlam, BC",
    category: "Institutional",
    year: 2023,
    cover:
      "https://res.cloudinary.com/dzytbkc5l/image/upload/v1760074743/Allied/leigh.webp",
    blurb:
      "Burner replacement, controls optimization, balancing and commissioning package.",
  },
  {
    id: "haro",
    title: "Haro Street Condos — DHW Replacement",
    location: "Vancouver, BC",
    category: "Residential",
    year: 2024,
    cover:
      "https://res.cloudinary.com/dzytbkc5l/image/upload/v1760074743/Allied/haro.webp",
    blurb:
      "High-efficiency tank/tankless manifold, recirc with smart timers, backflow and PRV.",
  },
];

const CATS = ["All", "Commercial", "Institutional", "Residential"] as const;
type Cat = (typeof CATS)[number];

export default function Projects() {
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [cat, setCat] = useState<Cat>(
    (params.get("cat") as Cat) || "All"
  );
  const [sort, setSort] = useState<"Newest" | "A–Z">(
    (params.get("sort") as any) || "Newest"
  );
  const [openId, setOpenId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // имитация загрузки для skeleton
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  // sync url
  useEffect(() => {
    const next = new URLSearchParams();
    if (q) next.set("q", q);
    if (cat !== "All") next.set("cat", cat);
    if (sort !== "Newest") next.set("sort", sort);
    setParams(next, { replace: true });
  }, [q, cat, sort, setParams]);

  const filtered = useMemo(() => {
    let list = DATA.filter((p) =>
      (cat === "All" ? true : p.category === cat) &&
      (q ? (p.title + p.location + p.blurb).toLowerCase().includes(q.toLowerCase()) : true)
    );
    list = sort === "Newest"
      ? [...list].sort((a, b) => b.year - a.year)
      : [...list].sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [q, cat, sort]);

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900" />
        <div
          className="absolute inset-0 opacity-25"
          style={{
            background:
              "radial-gradient(800px 400px at 20% -10%, rgba(255,255,255,.18), transparent 60%), radial-gradient(700px 400px at 100% 20%, rgba(87,118,198,.25), transparent 55%)",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24">
          {/* breadcrumbs */}
          <nav className="text-sm text-neutral-300/70 mb-4" aria-label="Breadcrumb">
            <ol className="flex gap-2">
              <li><NavLink to="/" className="hover:underline">Home</NavLink></li>
              <li aria-hidden>›</li>
              <li className="text-white">Projects</li>
            </ol>
          </nav>

          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Built to last. Proven in the field.
          </h1>
          <p className="mt-3 max-w-2xl text-neutral-200">
            A curated look at recent retrofits, boiler plants, DHW replacements and HVAC upgrades
            delivered across BC — with safety, commissioning and clean turnover.
          </p>

          {/* toolbar */}
          <div className="mt-8 flex flex-col md:flex-row md:items-center gap-3">
            <div className="flex flex-wrap gap-2">
              {CATS.map((c) => {
                const active = c === cat;
                return (
                  <button
                    key={c}
                    onClick={() => setCat(c)}
                    className={`px-3 py-1.5 rounded-full text-sm border transition ${
                      active
                        ? "bg-white text-neutral-900 border-white"
                        : "bg-white/10 text-white border-white/20 hover:bg-white/15"
                    }`}
                    aria-pressed={active}
                  >
                    {c}
                  </button>
                );
              })}
            </div>

            <div className="flex-1" />

            <div className="flex gap-2">
              <div className="relative">
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search projects…"
                  className="w-56 md:w-72 rounded-xl bg-white/90 backdrop-blur px-3 py-2 text-sm text-neutral-900 placeholder-neutral-500 border border-white shadow"
                />
                {q && (
                  <button
                    onClick={() => setQ("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
                    aria-label="Clear"
                  >
                    ×
                  </button>
                )}
              </div>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as any)}
                className="rounded-xl bg-white/90 backdrop-blur px-3 py-2 text-sm text-neutral-900 border border-white shadow"
                aria-label="Sort"
              >
                <option>Newest</option>
                <option>A–Z</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-14">
        {loading ? (
          <SkeletonGrid />
        ) : filtered.length ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filtered.map((p) => (
              <article
                key={p.id}
                className="group rounded-2xl overflow-hidden border border-neutral-200 bg-white shadow-sm hover:shadow-lg transition"
              >
                <button
                  onClick={() => setOpenId(p.id)}
                  className="block w-full text-left"
                  aria-label={`Open ${p.title}`}
                >
                  <div className="relative">
                    <img
                      src={p.cover}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-neutral-900 shadow">
                      {p.category}
                    </span>
                    <span className="absolute right-3 bottom-3 inline-flex items-center rounded-full bg-black/70 text-white px-2 py-1 text-xs">
                      {p.year}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-neutral-900">{p.title}</h3>
                    <p className="text-sm text-neutral-500">{p.location}</p>
                    <p className="mt-2 text-sm text-neutral-600 line-clamp-2">{p.blurb}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#5776c6]">
                      View details <span aria-hidden>↗</span>
                    </span>
                  </div>
                </button>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-neutral-600">Nothing found. Try another filter or query.</p>
        )}

        {/* CTA block */}
        <div className="mt-12 md:mt-16 rounded-2xl bg-[rgb(240_249_255_/_0.8)] border border-[rgb(240_249_255_/_0.8)] p-6 md:p-10 shadow-sm">
          <div className="md:flex md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-900">
                Planning a retrofit or service visit?
              </h2>
              <p className="mt-2 text-neutral-600">
                We can review your drawings, scope and timelines — and get you a firm quote fast.
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center rounded-lg bg-[#5776c6] text-white px-5 py-3 font-semibold hover:brightness-110 shadow"
              >
                Get a quote <span aria-hidden className="ml-2">↗</span>
              </Link>
              <a
                href="tel:604-731-1000"
                className="inline-flex items-center rounded-lg border border-neutral-300 bg-white px-5 py-3 font-semibold hover:bg-neutral-100"
              >
                Call 604-731-1000
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky CTA on mobile */}
      <div className="md:hidden sticky bottom-0 z-40">
        <div className="mx-4 mb-4 rounded-2xl bg-neutral-900 text-white px-4 py-3 shadow-lg flex items-center justify-between">
          <span className="font-semibold">Have a project in mind?</span>
          <Link
            to="/contact"
            className="ml-3 inline-flex items-center rounded-lg bg-white text-neutral-900 px-4 py-2 font-semibold"
          >
            Quote ↗
          </Link>
        </div>
      </div>

      {/* Modal */}
      {openId && (
        <ProjectModal
          project={DATA.find((p) => p.id === openId)!}
          onClose={() => setOpenId(null)}
        />
      )}
    </main>
  );
}

/* ---------- components ---------- */

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 grid place-items-center p-4"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-3xl rounded-2xl bg-white shadow-xl overflow-hidden">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 rounded-full bg-white/90 px-3 py-1 shadow hover:bg-white"
        >
          ✕
        </button>
        <img
          src={project.cover}
          alt=""
          className="h-64 w-full object-cover"
        />
        <div className="p-6">
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <span className="inline-flex items-center rounded-full bg-neutral-100 px-2 py-0.5">
              {project.category}
            </span>
            <span>•</span>
            <span>{project.location}</span>
            <span>•</span>
            <span>{project.year}</span>
          </div>
          <h3 className="mt-2 text-2xl font-bold text-neutral-900">{project.title}</h3>
          <p className="mt-2 text-neutral-700">{project.blurb}</p>

          {project.images?.length ? (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {project.images.map((src, i) => (
                <img key={i} src={src} alt="" className="h-28 w-full object-cover rounded-lg" />
              ))}
            </div>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center rounded-lg bg-[#5776c6] text-white px-5 py-3 font-semibold hover:brightness-110 shadow"
            >
              Request similar project <span aria-hidden className="ml-2">↗</span>
            </Link>
            <a
              href="tel:604-731-1000"
              className="inline-flex items-center rounded-lg border border-neutral-300 bg-white px-5 py-3 font-semibold hover:bg-neutral-100"
            >
              Talk to an engineer
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-2xl overflow-hidden border border-neutral-200 bg-white">
          <div className="h-56 w-full animate-pulse bg-neutral-200" />
          <div className="p-4 space-y-2">
            <div className="h-4 w-1/3 bg-neutral-200 animate-pulse rounded" />
            <div className="h-5 w-2/3 bg-neutral-200 animate-pulse rounded" />
            <div className="h-4 w-full bg-neutral-200 animate-pulse rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}