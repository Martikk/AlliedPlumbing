

export default function Garibaldi() {
  const title = 'Garibaldi Highlands Elementary (SD48)';
  const location = 'Squamish, BC';
  const scope = [
    'Removed 20+ furnaces/heating coils',
    'Installed unit ventilators, RTUs, MUAs',
    'Full boiler plant upgrade and new mechanical room',
    'Multi-trade coordination (sheet metal, electrical, DDC, TAB)',
  ];
  return (
    <section className="prose max-w-none">
      <h1>{title}</h1>
      <p><strong>Location:</strong> {location}</p>
      <h2>Scope</h2>
      <ul>{scope.map((s, i) => <li key={i}>{s}</li>)}</ul>
      <h2>Outcome</h2>
      <p>Improved efficiency, reliability, and comfort. Delivered on schedule with coordinated trades.</p>
    </section>
  );
}