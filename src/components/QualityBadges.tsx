import React from 'react';

type BadgeProps = { title: string; delay?: number };

function SkewBadge({ title, delay = 0 }: BadgeProps) {
  return (
    <div
      className="group relative select-none"
      style={{ perspective: 1000 }}
    >
      {/* иконка сверху по центру */}
      <div
        className="absolute -top-5 left-1/2 -translate-x-1/2 z-10"
        aria-hidden
      >
        <div className="relative grid place-items-center h-10 w-10 rounded-full bg-white shadow ring-1 ring-neutral-200">
          {/* пульсирующее кольцо */}
          <span
            className="absolute inset-0 rounded-full bg-neutral-900/10 animate-ring"
            style={{ animation: `pulseRing 2.4s ease-out ${delay}s infinite` }}
          />
          {/* чек */}
          <svg className="h-5 w-5 text-emerald-600 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 20 20" fill="currentColor">
            <path d="M7.5 13.5 3.8 9.8l1.4-1.4 2.3 2.3 6.3-6.3 1.4 1.4-7.7 7.7Z"/>
          </svg>
        </div>
      </div>

      {/* карточка со скошенными краями */}
      <div
        className="
          relative
          rounded-xl border border-sky-100 bg-sky-50/80
          shadow-sm
          transition-all duration-400
          group-hover:shadow-lg group-hover:translate-y-[-4px] group-hover:scale-[1.02]
        "
        style={{
          clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* лёгкий градиентный блик при hover */}
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
             style={{
               background:
                 'linear-gradient(120deg, rgba(255,255,255,.0) 30%, rgba(255,255,255,.35) 55%, rgba(255,255,255,.0) 80%)'
             }}
        />

        <div
          className="px-8 py-8 text-center text-neutral-700 font-semibold text-lg"
          style={{
            transform: 'translateZ(30px)',
          }}
        >
          {title}
        </div>
      </div>

      {/* 3D tilt на hover (через inline-style, чтобы не городить utility-классы) */}
      <style>{`
        .group:hover > div[style*="clip-path"] {
          transform: rotateX(2deg) rotateY(-4deg) translateY(-2px);
        }
      `}</style>
    </div>
  );
}

export default function QualityBadges() {
  const items = [
    'Quality control system',
    '100% Satisfaction guarantee',
    'Highly professional team',
    'Accurate testing processes',
  ];
  return (
    <div className="mx-auto max-w-6xl px-4 md:px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        {items.map((t, i) => (
          <SkewBadge key={t} title={t} delay={0.15 * i} />
        ))}
      </div>
    </div>
  );
}