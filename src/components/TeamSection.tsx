import { Link } from '../lib/navigation';
import { cld, srcSet } from '../lib/images';
import team from '../data/team.json';

/** D-02 §6 — three to six people, consistent crops.
 *
 *  The section heading and the "View all" link now belong to the <Section>
 *  that wraps this (C-06), so the same component drops into the homepage and
 *  /about/ without duplicating a heading.
 *
 *  Only people with a photograph appear; a mixed grid of headshots and empty
 *  tiles reads worse than a shorter row. PENDING D-01 §4: one 30-minute
 *  session, same background, 4:5 crop, same lighting, for everyone. */
export default function TeamSection() {
  const featured = team.filter(member => member.image).slice(0, 3);
  if (!featured.length) return null;
  return (
    <ul className="team-rail">
      {featured.map(member => (
        <li key={member.name}>
        <Link
          to="/team"
          className="team-photo-card clip-tilt"
          aria-label={`${member.name}, ${member.role} — see the whole team`}
        >
          <img
            src={cld(member.image!, 640, { ar: '4:5' })}
            srcSet={srcSet(member.image!, 960, { ar: '4:5' })}
            sizes="(min-width: 768px) 330px, 85vw"
            alt=""
            width={640}
            height={800}
            loading="lazy"
            decoding="async"
          />
          <div>
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </div>
        </Link>
        </li>
      ))}
    </ul>
  );
}
