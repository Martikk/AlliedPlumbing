// src/pages/Blog.tsx
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Head from "@/components/Head";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover: string;
  date: string; // ISO
  category: "Insights" | "Projects" | "Guides" | "News";
  tags: string[];
  readingMins: number;
};

const POSTS: Post[] = [
  {
    id: "p1",
    title: "Building Strong Foundations, Why It Matters",
    slug: "building-strong-foundations",
    excerpt:
      "From soil testing to rebar patterns — the small choices that decide decades of reliability.",
    cover:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1600&auto=format&fit=crop",
    date: "2025-05-10",
    category: "Guides",
    tags: ["Foundations", "Best Practices"],
    readingMins: 7,
  },
  {
    id: "p2",
    title: "Top 5 Modern Construction Materials in 2025",
    slug: "top-5-modern-construction-materials-2025",
    excerpt:
      "What we specify now for greener, lighter and stronger envelopes and cores.",
    cover:
      "https://images.unsplash.com/photo-1581093588401-16d158eb8ac2?q=80&w=1600&auto=format&fit=crop",
    date: "2025-05-10",
    category: "Insights",
    tags: ["Sustainability", "Materials"],
    readingMins: 6,
  },
  {
    id: "p3",
    title: "Technology That’s Changing the Game",
    slug: "technology-thats-changing-the-game",
    excerpt:
      "From VRF analytics to digital twins — how we shave weeks off delivery.",
    cover:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop",
    date: "2025-05-10",
    category: "News",
    tags: ["Tech", "Innovation"],
    readingMins: 5,
  },
  // добавляй новые посты…
];

const CATEGORIES = ["All", "Insights", "Projects", "Guides", "News"] as const;

export default function Blog() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [sort, setSort] = useState<"new" | "old">("new");
  const [page, setPage] = useState(1);
  const PER = 9;

  const filtered = useMemo(() => {
    let rows = [...POSTS];

    if (cat !== "All") rows = rows.filter(p => p.category === cat);
    if (q.trim()) {
      const t = q.trim().toLowerCase();
      rows = rows.filter(p =>
        [p.title, p.excerpt, p.tags.join(" "), p.category]
          .join(" ")
          .toLowerCase()
          .includes(t)
      );
    }
    rows.sort((a, b) =>
      sort === "new"
        ? +new Date(b.date) - +new Date(a.date)
        : +new Date(a.date) - +new Date(b.date)
    );
    return rows;
  }, [q, cat, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER));
  const paged = filtered.slice((page - 1) * PER, page * PER);

  return (
    <main className="bg-white text-neutral-900">
      <Head
        title="Allied Blog — Updates & Articles"
        description="Latest insights, guides and news from Allied Plumbing, Heating & Air Conditioning."
        canonical="https://allied-plumbing.ca/blog"
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1920&auto=format&fit=crop"
            alt=""
            className="h-72 md:h-80 w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 md:px-6 h-72 md:h-80 flex items-end pb-6">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/20 text-white px-3 py-1 text-xs font-semibold ring-1 ring-white/40">
              Get More Updates
            </span>
            <h1 className="mt-2 text-white text-4xl md:text-5xl font-extrabold drop-shadow">
              Blog & Articles
            </h1>
            <p className="text-white/90 mt-2 max-w-2xl">
              Practical guides, materials we trust, and tech shaping modern MEP.
            </p>
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(c => {
              const active = cat === c;
              return (
                <button
                  key={c}
                  onClick={() => {
                    setCat(c);
                    setPage(1);
                  }}
                  className={`rounded-full px-3 py-1.5 text-sm border transition ${
                    active
                      ? "bg-neutral-900 text-white border-neutral-900"
                      : "bg-white border-neutral-300 hover:bg-neutral-50"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>

          {/* Search + sort */}
          <div className="flex gap-3">
            <div className="flex rounded-xl border border-neutral-300 bg-white">
              <input
                placeholder="Search articles…"
                value={q}
                onChange={e => {
                  setQ(e.target.value);
                  setPage(1);
                }}
                className="w-56 md:w-72 rounded-l-xl px-3 py-2 outline-none"
              />
              <button className="rounded-r-xl bg-neutral-900 text-white px-4 py-2 font-semibold">
                Search
              </button>
            </div>
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

        {/* Count */}
        <div className="mt-3 text-sm text-neutral-600">
          Showing{" "}
          <span className="font-semibold text-neutral-900">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "article" : "articles"}.
        </div>

        {/* Grid */}
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paged.map(p => <BlogCard key={p.id} post={p} />)}
          {paged.length === 0 && (
            <div className="col-span-full rounded-xl border border-dashed border-neutral-300 p-10 text-center text-neutral-500">
              No results match your filters.
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm disabled:opacity-50"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`h-9 w-9 rounded-lg text-sm font-semibold ${
                  n === page
                    ? "bg-neutral-900 text-white"
                    : "border border-neutral-300 bg-white"
                }`}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 rounded-2xl bg-neutral-900 text-white p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-xl md:text-2xl font-extrabold">Want updates in your inbox?</h3>
            <p className="text-white/80 mt-1">Monthly digest — no spam, only useful field notes.</p>
          </div>
          <form
            className="flex w-full md:w-auto"
            onSubmit={e => {
              e.preventDefault();
              alert("Subscribed!");
            }}
          >
            <input
              type="email"
              required
              placeholder="you@company.com"
              className="w-full md:w-72 rounded-l-lg bg-white text-neutral-900 px-3 py-2 outline-none"
            />
            <button className="rounded-r-lg bg-white/10 px-4 py-2 font-semibold hover:bg-white/15">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

/* Card */
function BlogCard({ post }: { post: Post }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow">
      <Link to={`/blog/${post.slug}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <img
            src={post.cover}
            alt=""
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
            loading="lazy"
          />
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-1 text-xs font-semibold ring-1 ring-black/5">
            {new Date(post.date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
          </span>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 text-xs text-neutral-600">
            <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-1">
              {post.category}
            </span>
            <span>•</span>
            <span>{post.readingMins} min read</span>
          </div>
          <h3 className="mt-2 line-clamp-2 text-lg font-extrabold text-neutral-900">
            {post.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-neutral-600">{post.excerpt}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map(t => (
              <span key={t} className="rounded-full bg-neutral-100 px-2 py-1 text-xs text-neutral-600">
                #{t}
              </span>
            ))}
          </div>

          <div className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-neutral-900">
            Read more <span aria-hidden>↗</span>
          </div>
        </div>
      </Link>
    </article>
  );
}