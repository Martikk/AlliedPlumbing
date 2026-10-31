import { Link } from 'react-router-dom';
import team from '../data/team.json';

export default function Team() {
  return <section className="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16">
    <h1 className="text-4xl md:text-5xl font-extrabold">Our team</h1>
    <p className="mt-5 max-w-2xl text-lg leading-relaxed text-neutral-700">Meet the people who lead our mechanical projects, plumbing services and site coordination.</p>
    <div className="mt-10 grid md:grid-cols-2 gap-x-12 gap-y-8">{team.map(member=><article key={member.name} className="border-t border-neutral-300 pt-6">{member.image && <img src={member.image} alt={member.name} width={600} height={600} loading="lazy" className="h-72 w-full object-cover rounded-2xl clip-tilt mb-6" />}
      <h2 className="text-2xl font-bold">{member.name}</h2><p className="mt-2 font-semibold text-neutral-800">{member.role}</p><p className="mt-4 max-w-prose leading-relaxed text-neutral-700">{member.bio}</p>{member.credentials.length>0 && <ul className="mt-4 list-disc pl-5 space-y-1 text-sm text-neutral-700">{member.credentials.map(credential=><li key={credential}>{credential}</li>)}</ul>}</article>)}</div>
    <div className="mt-12 border-t border-neutral-200 pt-8"><h2 className="text-2xl font-bold">Speak with our team</h2><p className="mt-3 text-neutral-700">Tell us about your building, equipment or project requirements.</p><Link to="/contact" className="inline-block mt-4 rounded-lg bg-red-700 px-5 py-3 font-semibold text-white hover:bg-red-800">Contact Allied Plumbing</Link></div>
  </section>;
}
