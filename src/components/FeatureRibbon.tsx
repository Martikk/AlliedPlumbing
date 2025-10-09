type Card = { title: string; text: string; img?: string };
type Props = { className?: string };

const FEATURES: Card[] = [
  { title: 'Smart methods', text: 'Techniques that reduce cost, time, and enhance project quality.', img: '/features/1.jpg' },
  { title: 'Experienced team', text: 'Led by seasoned professionals committed to precision and safety.', img: '/features/2.jpg' },
  { title: 'Modern equipment', text: 'From automated tools to heavy-duty machinery.', img: '/features/3.jpg' },
  { title: 'Proven delivery', text: 'Reliability and transparency from bid to handover.', img: '/features/4.jpg' },
];

export default function FeatureRibbon({ className = '' }: Props) {
  return (
    <div className={`relative z-20 ${className}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-4">
          {FEATURES.map((f, idx) => (
            <div key={idx} className="flex-1 rounded-xl border bg-white shadow-sm">
              {f.img && (
                <img src={f.img} alt="" className="h-28 w-full object-cover rounded-t-xl" />
              )}
              <div className="p-4">
                <div className="font-semibold">{f.title}</div>
                <div className="text-sm text-neutral-600 mt-1">{f.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}