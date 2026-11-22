// src/pages/Careers.tsx
import { useMemo, useState } from "react";
import { Link } from "../lib/navigation";
import CareerApplication from "../components/CareerApplication";

type Opening = {
  id: string;
  title: string;
  team: "Plumbing" | "HVAC" | "Boilers" | "Service" | "Office";
  level: "Apprentice" | "Journeyperson" | "Lead" | "Coordinator";
  location: "Lower Mainland" | "North Shore" | "Tri-Cities" | "Fraser Valley";
  type: "Full-time" | "Part-time" | "Contract";
  highlights: string[];
};

const OPENINGS: Opening[] = [
  {
    id: "svc-tech-journey",
    title: "Service Technician (Journeyperson)",
    team: "Service",
    level: "Journeyperson",
    location: "Lower Mainland",
    type: "Full-time",
    highlights: ["Service diagnostics", "Occupied buildings", "Controls coordination"],
  },
  {
    id: "appr-plumb-2nd",
    title: "Plumber Apprentice (2nd–4th year)",
    team: "Plumbing",
    level: "Apprentice",
    location: "Tri-Cities",
    type: "Full-time",
    highlights: ["Repipes / TI", "School projects", "Trade coordination"],
  },
  {
    id: "hvac-lead",
    title: "HVAC Lead – RTU / VRF",
    team: "HVAC",
    level: "Lead",
    location: "Lower Mainland",
    type: "Full-time",
    highlights: ["VRF startup", "DDC integration", "Team mentoring"],
  },
  {
    id: "boiler-tech",
    title: "Boiler Technician",
    team: "Boilers",
    level: "Journeyperson",
    location: "North Shore",
    type: "Full-time",
    highlights: ["IBC/Rheem", "Combustion tuning", "VFD pumps"],
  },
  {
    id: "service-coord",
    title: "Service Coordinator",
    team: "Office",
    level: "Coordinator",
    location: "Lower Mainland",
    type: "Full-time",
    highlights: ["Dispatch", "Customer care", "Work order flow"],
  },
];

export default function Careers() {
  const [q, setQ] = useState("");
  const [team, setTeam] = useState<Opening["team"] | "All">("All");

  const filtered = useMemo(() => {
    const needle = q.toLowerCase().trim();
    return OPENINGS.filter((o) => {
      const matchTeam = team === "All" || o.team === team;
      const hay = `${o.title} ${o.team} ${o.level} ${o.location}`.toLowerCase();
      return matchTeam && (needle === "" || hay.includes(needle));
    });
  }, [q, team]);


  return (
    <div className="bg-white text-neutral-900">

      {/* ========== HERO ========== */}
      <section className="page-photo-hero relative overflow-hidden">
        <img
          src="https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760065876/Allied/3_gk4dl8.png"
          className="absolute inset-0 h-[44vh] md:h-[56vh] w-full object-cover"
          alt=""
        />
        <div className="hero-scrim absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 md:px-6 pt-28 md:pt-36 pb-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 text-white px-3 py-1 text-xs ring-1 ring-white/25 backdrop-blur">
            Careers at Allied
          </span>
          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow">
            Build BC. Grow your craft.
          </h1>
          <p className="mt-3 max-w-2xl text-white/90">
            Explore service and mechanical project work across British Columbia. Discuss current roles, trade requirements and development opportunities with our hiring team.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#openings"
              className="inline-flex items-center gap-2 rounded-lg bg-white text-neutral-900 px-5 py-3 font-semibold shadow hover:bg-neutral-200"
            >
              View openings <span aria-hidden>↘</span>
            </a>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 text-white px-5 py-3 font-semibold backdrop-blur hover:bg-white/20"
            >
              About our work
            </Link>
          </div>
        </div>
      </section>

      {/* ========== PERKS / WHY ALLIED ========== */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="mb-8 md:mb-10">
          <span className="inline-block text-xs md:text-sm px-3 py-1 rounded-full bg-neutral-100 text-neutral-600">
            Why Allied
          </span>
          <h2 className="mt-3 text-2xl md:text-4xl font-extrabold">What you can expect</h2>
        </div>

        <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-3">
          <Perk
            title="Competitive pay & benefits"
            body="Discuss compensation, benefits, working hours and any on-call responsibilities for the specific role during the hiring process."
            icon={<BadgeIcon />}
          />
          <Perk
            title="Apprenticeship support"
            body="Tell us your apprenticeship level and training goals. We can discuss the supervision, site experience and development relevant to a suitable role."
            icon={<HatIcon />}
          />
          <Perk
            title="Modern tools & safety"
            body="Work planning starts with site requirements, safe access and the tools needed for the task. Ask about the equipment and systems used by your team."
            icon={<ShieldIcon />}
          />
          <Perk title="Varied mechanical work" body="Our project portfolio spans classroom ventilation, central boiler plants, hydronic cooling and existing-building upgrades. Discuss which work matches your experience." icon={<BadgeIcon />} />
          <Perk title="Clear coordination" body="Mechanical work involves field teams, project managers, consultants and supporting trades. Communication about access, drawings and sequencing is part of the job." icon={<HatIcon />} />
          <Perk title="A practical hiring conversation" body="Share your trade qualifications, experience, availability and preferred type of work. Role requirements, location and employment terms are discussed before an offer." icon={<ShieldIcon />} />
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-neutral-600">Benefits, training arrangements, equipment and schedules depend on the role and agreed employment terms. Ask the hiring team for the current details.</p>
      </section>

      <p className="max-w-6xl mx-auto px-4 md:px-6 pb-6 text-neutral-700 leading-relaxed">Explore the types of work in our service and project teams. Availability, location and requirements should be confirmed with the hiring team before you apply.</p>
      {/* ========== OPENINGS FILTERS ========== */}
      <section id="openings" className="max-w-6xl mx-auto px-4 md:px-6 pb-6">
        <div className="rounded-2xl border border-neutral-200 bg-white p-4 md:p-5 shadow-sm">
          <div className="flex flex-col md:flex-row gap-3 md:items-center">
            <div className="flex-1">
              <label className="sr-only" htmlFor="search">Search jobs</label>
              <input
                id="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search title, location, team…"
                className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 shadow-sm outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
              />
            </div>
            <div className="w-full md:w-60">
              <label className="sr-only" htmlFor="team">Team</label>
              <select
                id="team"
                value={team}
                onChange={(e) => setTeam(e.target.value as Opening["team"] | "All")}
                className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 shadow-sm outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
              >
                <option>All</option>
                <option>Plumbing</option>
                <option>HVAC</option>
                <option>Boilers</option>
                <option>Service</option>
                <option>Office</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* ========== OPENINGS LIST ========== */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 pb-12 md:pb-16">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-neutral-700">
            No roles match your filters right now. You can still{" "}
            <a href="#apply" className="underline">send us your resume</a> — we’re always
            meeting great people.
          </div>
        ) : (
          <ul className="space-y-4">
            {filtered.map((o) => (
              <li key={o.id} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm hover:shadow-md transition">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <div className="text-lg md:text-xl font-semibold">{o.title}</div>
                    <div className="text-sm text-neutral-600 mt-1">
                      {o.team} · {o.level} · {o.location} · {o.type}
                    </div>
                    <ul className="mt-3 flex flex-wrap gap-2 text-sm text-neutral-700">
                      {o.highlights.map((h) => (
                        <li key={h} className="rounded-full border border-neutral-200 px-3 py-1 bg-neutral-50">{h}</li>
                      ))}
                    </ul>
                  </div>
                  <a
                    href={`?job=${encodeURIComponent(o.title)}#apply`}
                    className="inline-flex items-center justify-center rounded-lg bg-neutral-900 text-white px-5 py-2.5 font-semibold hover:brightness-110"
                  >
                    Apply now <span aria-hidden className="ml-2">↗</span>
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* ========== CULTURE STRIP ========== */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 pb-12 md:pb-16">
        <div className="rounded-2xl overflow-hidden border border-neutral-200">
          <div className="grid md:grid-cols-2">
            <img
              src="https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760068155/Allied/10_kubptf.png"
              alt=""
              className="h-64 md:h-full w-full object-cover"
            />
            <div className="p-6 md:p-8">
              <h3 className="text-2xl md:text-3xl font-extrabold">Teams that teach</h3>
              <p className="mt-2 text-neutral-700">
                You’ll work with people who care about doing it right — and who’ll share what they
                know. Tool talks, lunch-and-learns, and real responsibility as you grow.
              </p>
              <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-neutral-800">
                <li className="flex items-center gap-2"><Dot /> Site-specific safety planning</li>
                <li className="flex items-center gap-2"><Dot /> School project experience</li>
                <li className="flex items-center gap-2"><Dot /> Equipment for the agreed scope</li>
                <li className="flex items-center gap-2"><Dot /> Tablets & DDC exposure</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CareerApplication />
    </div>
  );
}

/* ================= helpers / tiny icons ================= */

function Perk({ title, body, icon }: { title: string; body: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="h-10 w-10 grid place-items-center rounded-lg bg-neutral-100 text-neutral-900">
        {icon}
      </div>
      <h3 className="mt-3 text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-neutral-700">{body}</p>
    </div>
  );
}

function Dot() {
  return <span className="inline-block h-2 w-2 rounded-full bg-neutral-300" />;
}

function BadgeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M12 2 3 6v6c0 5 4 9 9 10 5-1 9-5 9-10V6l-9-4Zm0 4 6 2v4c0 3.9-2.8 7.2-6 8-3.2-.8-6-4.1-6-8V8l6-2Zm0 3.5a2 2 0 1 0 .001 4.001A2 2 0 0 0 12 9.5Z" />
    </svg>
  );
}
function HatIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3Zm-7 9.74V15c0 2.76 4.03 5 7 5s7-2.24 7-5v-2.26l-7 3.91-7-3.91Z" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M12 2 4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3Zm0 4.2 6 2.25V11c0 4.04-2.78 7.8-6 8.97C8.78 18.8 6 15.04 6 11V8.45L12 6.2Z" />
    </svg>
  );
}