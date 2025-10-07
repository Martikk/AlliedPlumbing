import { Link } from 'react-router-dom';

export default function ServiceCards() {
  const cards: Array<[string, string]> = [
    ['Preventive Maintenance', '/services/maintenance'],
    ['Plumbing (Residential)', '/services/residential-plumbing'],
    ['Plumbing (Commercial)', '/services/commercial-plumbing'],
    ['Air Conditioning & HVAC', '/services/hvac'],
    ['Heating & Boiler Plants', '/services/boilers'],
    ['24/7 Emergency Service', '/services/emergency'],
  ];

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {cards.map(([title, href]) => (
        <Link key={href} to={href} className="block p-5 rounded-xl border hover:shadow bg-white">
          <div className="font-semibold">{title}</div>
          <div className="text-sm text-neutral-600 mt-1">Learn more →</div>
        </Link>
      ))}
    </div>
  );
}