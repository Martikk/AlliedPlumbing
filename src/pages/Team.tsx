import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

// Если хочешь переиспользовать те же данные, вынеси массив в src/data/team.ts и импортируй его.
// Здесь — автономная версия страницы с локальными данными:
type Member = {
  name: string;
  role: string;
  photo?: string;
  tags?: string[];
};

const TEAM: Member[] = [
  { name: "Nick Fedele", role: "Accounts Manager", photo: "https://res.cloudinary.com/dzytbkc5l/image/upload/v1760038738/Allied/IMG_1095_ptva4x.jpg", tags: ["Client-first", "Billing"] },
  { name: "Alex Martishyn", role: "Project Manager", photo: "https://res.cloudinary.com/dzytbkc5l/image/upload/v1760073539/Allied/09738F7C-ACFD-44A8-A508-56BC9B644BF2_y4vmko.jpg", tags: ["PM", "Scheduling"] },
  // Добавляй людей дальше:
  // { name: "Jane Doe", role: "Project Engineer", photo: "/team/jane.jpg", tags: ["BIM", "QA/QC"] },
  // { name: "John Smith", role: "Field Lead", tags: ["COR", "Safety"] },
];

// ——— утилиты ———
function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");
}

export default function TeamPage() {
  const [query, setQuery] = useState("");
  const roles = useMemo(
    () => Array.from(new Set(TEAM.map((m) => m.role))).sort(),
    []
  );
  const [role, setRole] = useState<string>("All");

  const filtered = TEAM.filter((m) => {
    const q = query.trim().toLowerCase();
    const okQ =
      !q ||
      m.name.toLowerCase().includes(q) ||
      m.role.toLowerCase().includes(q) ||
      (m.tags || []).some((t) => t.toLowerCase().includes(q));
    const okR = role === "All" || m.role === role;
    return okQ && okR;
  });

  return (
    <main className="bg-white">
      {/* HERO / HEADER */}
      <section className="relative overflow-hidden">
        {/* мягкие блики */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 to-white" />
          <div
            className="absolute -top-20 -left-20 h-80 w-80 rounded-full blur-3xl opacity-40"
            style={{ background: "radial-gradient(closest-side,#93c5fd 25%,transparent)" }}
          />
          <div
            className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full blur-3xl opacity-40"
            style={{ background: "radial-gradient(closest-side,#a7f3d0 20%,transparent)" }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-6 pt-16 md:pt-24 pb-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="inline-block text-xs tracking-widest uppercase text-neutral-500">
                Our Team
              </span>
              <h1 className="mt-2 text-4xl md:text-5xl font-extrabold text-neutral-900">
                Meet Our Team
              </h1>
              <p className="mt-3 max-w-2xl text-neutral-600">
                Certified crews and seasoned PMs focused on safety, schedule and clean turnover — keeping BC running.
              </p>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 text-white px-5 py-3 font-semibold shadow hover:brightness-110"
            >
              Get a quote <span aria-hidden>↗</span>
            </Link>
          </div>

          {/* Controls: поиск + фильтры */}
          <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex-1">
              <label className="sr-only" htmlFor="team-search">Search</label>
              <input
                id="team-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, role or tag…"
                className="w-full rounded-xl border border-neutral-200 bg-white/70 backdrop-blur px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#5776c6]"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setRole("All")}
                className={`px-3 py-1.5 rounded-full border text-sm ${role === "All" ? "bg-neutral-900 text-white border-neutral-900" : "bg-white border-neutral-300 hover:bg-neutral-100"}`}
              >
                All roles
              </button>
              {roles.map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`px-3 py-1.5 rounded-full border text-sm ${role === r ? "bg-neutral-900 text-white border-neutral-900" : "bg-white border-neutral-300 hover:bg-neutral-100"}`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 pb-14 md:pb-20">
        {filtered.length === 0 ? (
          <div className="mt-10 rounded-xl border border-neutral-200 bg-white/70 backdrop-blur p-6 text-neutral-600">
            No team members found. Try clearing filters.
          </div>
        ) : (
          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filtered.map((m) => (
              <li key={m.name}>
                <article
                  className="group relative h-full overflow-hidden rounded-2xl border border-neutral-200/80 bg-white/70 backdrop-blur shadow-sm transition hover:shadow-lg focus-within:shadow-lg"
                >
                  {/* верхний мягкий градиент */}
                  <div className="absolute inset-x-0 -top-12 h-24 bg-gradient-to-b from-[rgba(87,118,198,.18)] to-transparent pointer-events-none" />
                  <div className="p-5 md:p-6">
                    <div className="flex items-center gap-4">
                      {m.photo ? (
                        <img
                          src={m.photo}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="h-16 w-16 rounded-xl object-cover shadow ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div
                          aria-hidden
                          className="grid h-16 w-16 place-items-center rounded-xl bg-neutral-900 text-white font-semibold ring-1 ring-black/5"
                        >
                          {getInitials(m.name)}
                        </div>
                      )}
                      <div>
                        <h2 className="text-lg font-semibold text-neutral-900">{m.name}</h2>
                        <p className="text-sm text-neutral-600">{m.role}</p>
                      </div>
                    </div>

                    {m.tags && m.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {m.tags.map((t) => (
                          <span key={t} className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-700">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    <p className="mt-4 text-sm text-neutral-600 line-clamp-3">
                      Dedicated to safe sites, clean installs and on-schedule turnover across BC.
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}

        {/* Нижний CTA */}
        <div className="mt-10 md:mt-14 rounded-2xl bg-[rgb(240_249_255_/_0.8)] border border-[rgb(240_249_255_/_0.8)] p-6 md:p-10 shadow-sm">
          <div className="md:flex md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-2xl font-extrabold text-neutral-900">Work with our senior project team</h3>
              <p className="mt-1.5 text-neutral-600">
                Send drawings/scope — we’ll assign the right PM and provide a firm quote.
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
    </main>
  );
}