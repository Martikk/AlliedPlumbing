// src/components/AboutCompany.tsx
import { useState } from 'react';
import QualityBadges from '@/components/QualityBadges';

type TabKey = 'materials' | 'technology' | 'approved';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'materials',  label: 'Materials'  },
  { key: 'technology', label: 'Technology' },
  { key: 'approved',   label: 'Approved'   },
];

const CONTENT: Record<TabKey, string[]> = {
  materials: [
    'Premium grade cement & concrete',
    'Reinforced steel & rebar',
    'Eco-friendly bricks & blocks',
    'Weather-resistant finishes',
  ],
  technology: [
    'BIM coordination & clash detection',
    'DDC integration & trending',
    'Infrared & ultrasonic diagnostics',
    'Cloud documentation (as-built/O&M)',
  ],
  approved: [
    'Prime Contractor, school-safe crews',
    'Full COR/WorkSafe compliance',
    '5M liability, WCB in good standing',
    '12-month workmanship warranty',
  ],
};

export default function AboutCompany() {
  const [tab, setTab] = useState<TabKey>('materials');

  return (
    <section className="relative mx-auto max-w-6xl px-4 md:px-6 py-14 md:py-20">
      {/* Заголовок */}
      <div className="mb-8 md:mb-12">
        <span className="inline-block text-xs md:text-sm px-3 py-1 rounded-full bg-neutral-100 text-neutral-600">
          About our company
        </span>
        <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-neutral-900 leading-tight">
          Building with trust,<br className="hidden md:block"/> driven by experience
        </h2>
      </div>

      {/* Левая колонка: табы + список */}
      <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-start">
        <div className="flex-1 w-full">
          {/* Табы */}
          <div className="flex flex-wrap gap-2 md:gap-3 mb-5">
            {TABS.map(({ key, label }) => {
              const active = tab === key;
              return (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={`px-3 md:px-4 py-2 rounded-lg border text-sm md:text-base transition
                    ${active ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white border-neutral-300 hover:bg-neutral-100'}`}
                  aria-pressed={active}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Список с иконками */}
          <ul className="space-y-3 md:space-y-4">
            {CONTENT[tab].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                {/* маркер-иконка */}
                <svg className="mt-1 h-5 w-5 shrink-0 text-neutral-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                  <path d="M7.5 13.5 3.8 9.8l1.4-1.4 2.3 2.3 6.3-6.3 1.4 1.4-7.7 7.7Z"/>
                </svg>
                <span className="text-neutral-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Правая колонка: фигура-картинка c play */}
        <div className="flex-1 w-full flex justify-center lg:justify-end">
          <div className="relative">
            {/* «скошенная» маска — достигаем скруглением + псевдоромб рамкой */}
            <div className="relative overflow-hidden rounded-2xl shadow-xl"
                 style={{ clipPath: 'polygon(12% 0%, 100% 0%, 88% 100%, 0% 100%)' }}>
              <img
                src="/about/hero.jpg"   /* положи картинку в public/about/hero.jpg */
                alt=""
                className="block h-[300px] w-[420px] md:h-[360px] md:w-[520px] object-cover"
                loading="lazy"
                decoding="async"
              />
              {/* кнопка play */}
              <button
                className="absolute inset-0 m-auto h-12 w-12 md:h-14 md:w-14 grid place-items-center rounded-full bg-white/90 text-neutral-900 shadow"
                aria-label="Play video"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
                  <path d="M8 5v14l11-7L8 5Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Риббоны-бейджи под линией — как на рефе */}
<div className="mt-10 md:mt-14">
  <QualityBadges />
</div>

      {/* нижний «стат-баннер» (опционально) */}
      <div className="mt-10 md:mt-14 rounded-2xl bg-gradient-to-r from-neutral-100 to-neutral-200 p-6 md:p-10 border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <Stat n="8k+"  label="Projects completed" />
          <Stat n="5k+"  label="Global customers" />
          <Stat n="12"   label="Years of experience" />
          <Stat n="92"   label="Team engineers" />
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="space-y-1">
      <div className="text-3xl md:text-4xl font-extrabold text-neutral-900">{n}</div>
      <div className="text-sm md:text-base text-neutral-600">{label}</div>
    </div>
  );
}