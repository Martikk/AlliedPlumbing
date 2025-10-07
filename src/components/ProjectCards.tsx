import { Link } from 'react-router-dom';

export default function ProjectCards() {
  const cards: Array<[string, string]> = [
    ['Garibaldi Highlands Elementary (SD48)', '/projects/garibaldi'],
    ['Ridgeview Elementary (SD45)', '/projects/ridgeview'],
    ['Leigh Elementary (SD43)', '/projects/leigh'],
    ['1755 Haro Street — Starlight', '/projects/haro'],
  ];

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {cards.map(([title, href]) => (
        <Link key={href} to={href} className="block p-5 rounded-xl border hover:shadow bg-white">
          <div className="font-semibold">{title}</div>
          <div className="text-sm text-neutral-600 mt-1">View project →</div>
        </Link>
      ))}
    </div>
  );
}