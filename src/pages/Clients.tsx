// src/pages/Clients.tsx
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Head from "@/components/Head";
import { Link } from "react-router-dom";

/* -------------------- Demo data (замени реальным API при желании) -------------------- */
type Testimonial = {
  id: string;
  name: string;
  role: string;
  org: string;
  sector: "Residential" | "Commercial" | "Institutional" | "Industrial";
  quote: string;
  avatar?: string;
  logo?: string;
  date?: string; // ISO
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "John Thompson",
    role: "Homeowner",
    org: "GreenVista Eco Homes",
    sector: "Residential",
    quote:
      "Working with Allied Plumbing was an exceptional experience. Their professionalism, timely delivery, and attention to detail truly set them apart. I couldn’t be happier!",
    avatar:
      "https://images.unsplash.com/photo-1546456073-6712f79251bb?q=80&w=256&auto=format&fit=crop",
    date: "2025-07-01",
  },
  {
    id: "t2",
    name: "Michael Harris",
    role: "Project Manager",
    org: "Arcadia Rise",
    sector: "Commercial",
    quote:
      "Dependable and detail-oriented. The Allied team was fantastic to work with from start to finish.",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=256&auto=format&fit=crop",
    date: "2025-06-14",
  },
  {
    id: "t3",
    name: "Ethan Miller",
    role: "Developer",
    org: "Metrolink Tower",
    sector: "Commercial",
    quote:
      "They handled everything efficiently, and the communication was always clear. Highly recommended!",
    avatar:
      "https://images.unsplash.com/photo-1541534401786-2077eed87a82?q=80&w=256&auto=format&fit=crop",
    date: "2025-05-02",
  },
  // Добавь ещё кейсы по мере необходимости…
];

/* -------------------- Page -------------------- */
export default function Clients() {
  const [q, setQ] = useState("");
  const [sector, setSector] = useState<"All" | Testimonial["sector"]>("All");
  const [sort, setSort] = useState<"new" | "old">("new");

  const list = useMemo(() => {
    let rows = [...TESTIMONIALS];

    if (sector !== "All") rows = rows.filter(r => r.sector === sector);

    if (q.trim()) {
      const t = q.trim().toLowerCase();
      rows = rows.filter(r =>
        [r.name, r.role, r.org, r.quote].some(v => v.toLowerCase().includes(t))
      );
    }

    rows.sort((a, b) => {
      const da = a.date ? +new Date(a.date) : 0;
      const db = b.date ? +new Date(b.date) : 0;
      return sort === "new" ? db - da : da - db;
    });
    return rows;
  }, [q, sector, sort]);

  return (
    <main className="bg-white text-neutral-900">
      <Head
        title="Allied Plumbing — Client Testimonials"
        description="Read what residential, commercial, and institutional clients say about Allied Plumbing, Heating & Air Conditioning."
        canonical="https://allied-plumbing.ca/clients"
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1556912998-6a321d9611e5?q=80&w=1920&auto=format&fit=crop"
            alt=""
            className="h-72 md:h-80 w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 md:px-6 h-72 md:h-80 flex items-end pb-6">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/20 text-white px-3 py-1 text-xs font-semibold ring-1 ring-white/40">
              Our Clients
            </span>
            <h1 className="mt-2 text-white text-4xl md:text-5xl font-extrabold drop-shadow">
              Hear From Our Clients
            </h1>
            <p className="text-white/90 mt-2 max-w-2xl">
              Proven results across Residential, Commercial, and Institutional projects.
            </p>
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Search */}
          <div className="flex-1">
            <label htmlFor="q" className="sr-only">Search testimonials</label>
            <div className="flex rounded-xl border border-neutral-300 bg-white">
              <input
                id="q"
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="Search by name, company, keyword…"
                className="w-full rounded-l-xl px-4 py-2.5 outline-none"
              />
              <button
                className="rounded-r-xl bg-neutral-900 text-white px-4 py-2.5 font-semibold hover:brightness-110"
                onClick={() => {/* noop submitless */}}
              >Search</button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <select
              value={sector}
              onChange={e => setSector(e.target.value as any)}
              className="rounded-lg border border-neutral-300 bg-white px-3 py-2"
              aria-label="Filter by sector"
            >
              <option>All</option>
              <option>Residential</option>
              <option>Commercial</option>
              <option>Institutional</option>
              <option>Industrial</option>
            </select>
            <select
              value={sort}
              onChange={e => setSort(e.target.value as any)}
              className="rounded-lg border border-neutral-300 bg-white px-3 py-2"
              aria-label="Sort"
            >
              <option value="new">Newest</option>
              <option value="old">Oldest</option>
            </select>
          </div>
        </div>

        {/* Stat bar */}
        <div className="mt-4 text-sm text-neutral-600">
          Showing <span className="font-semibold text-neutral-900">{list.length}</span> testimonials
          {sector !== "All" ? <> in <span className="font-semibold">{sector}</span></> : null}.
        </div>

        {/* Grid */}
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((t, idx) => (
            <motion.article
              key={t.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.03 }}
              className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar ?? "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=128&auto=format&fit=crop"}
                  alt=""
                  className="h-11 w-11 rounded-full object-cover ring-1 ring-black/5"
                />
                <div className="min-w-0">
                  <div className="font-semibold text-neutral-900 truncate">{t.name}</div>
                  <div className="text-sm text-neutral-600 truncate">
                    {t.role}, {t.org}
                  </div>
                </div>
                {t.logo ? (
                  <img src={t.logo} alt="" className="ml-auto h-7 w-auto opacity-70" />
                ) : null}
              </div>

              <p className="mt-4 text-neutral-800 leading-relaxed">
                “{t.quote}”
              </p>

              <div className="mt-4 flex items-center justify-between text-xs text-neutral-500">
                <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-1">
                  {t.sector}
                </span>
                {t.date && <time dateTime={t.date}>{new Date(t.date).toLocaleDateString()}</time>}
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 rounded-2xl bg-neutral-900 text-white p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-xl md:text-2xl font-extrabold">Ready to start your project?</h3>
            <p className="text-white/80 mt-1">
              Transparent pricing and certified technicians. 24/7 emergency dispatch.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/GetQuote"
              className="inline-flex items-center rounded-lg bg-white text-neutral-900 px-5 py-3 font-semibold hover:bg-neutral-200"
            >
              Get a quote <span aria-hidden className="ml-2">↗</span>
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center rounded-lg border border-white/30 px-5 py-3 font-semibold hover:bg-white/10"
            >
              See our projects
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}