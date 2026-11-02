import { responsiveImage, imageCandidates } from '../lib/images';
import { Link } from '../lib/navigation';
import team from '../data/team.json';
export default function TeamSection() {
  const featured=['Nick Fedele','Alex Martishyn','Liam Dillon'].map(name=>team.find(member=>member.name===name)!);
  return <section className="rounded-3xl bg-[#f6fafd] p-6 md:p-10 lg:p-12">
    <div className="flex flex-wrap justify-between items-center gap-4"><div><span className="section-kicker">Our team</span><h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-slate-900">Meet Our Team</h2></div><Link to="/team" className="rounded-lg border border-slate-300 px-4 py-3 font-semibold text-slate-800 hover:bg-white">View all <span aria-hidden>↗</span></Link></div>
    <div className="team-photo-grid mt-9">{featured.map(member=><Link to="/team" key={member.name} className="team-photo-card clip-tilt"><img src={responsiveImage(member.image!, 768)} srcSet={imageCandidates(member.image!)} sizes="(min-width: 768px) 330px, 85vw"  alt="" width={600} height={750} loading="lazy" /><div><h3>{member.name}</h3><p>{member.role}</p></div></Link>)}</div>
  </section>;
}
