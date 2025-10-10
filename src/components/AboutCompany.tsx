// src/components/AboutCompany.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import QualityBadges from '@/components/QualityBadges';

type TabKey = 'materials' | 'technology' | 'approved';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'materials',  label: 'Materials'  },
  { key: 'technology', label: 'Technology' },
  { key: 'approved',   label: 'Approved'   },
];

const CONTENT: Record<TabKey, string[]> = {
  materials: [
    'Type L copper & Sch. 40 steel (ProPress/Victaulic), BC code–compliant',
    'Stainless & black steel for boiler plants / mechanical rooms',
    'High-efficiency IBC/Rheem boilers, heat pumps & VRF for coastal climate',
    'Outdoor-rated insulation, UV/salt-air resistant finishes & weatherproof enclosures',
  ],
  technology: [
    'BIM/AutoCAD coordination with consultants — clash-free routing',
    'DDC integration (Delta/Trane/Reliable), trending & remote commissioning',
    'Digital pressure/flow tests, thermal imaging & ultrasonic leak detection',
    'Cloud O&M, permits/as-builts, photo logs & turnover packages',
  ],
  approved: [
    'COR & WorkSafeBC compliant; $5M liability + WCB in good standing',
    'Background-checked, school-approved crews (SD39 / SD40 / SD43)',
    'Certified: fall protection, confined spaces, WHMIS',
    '12-month workmanship warranty + ongoing service support',
  ],
};

// Плавный счётчик
function CountUp({ to, duration = 2000 }: { to: number; duration?: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return <>{val.toLocaleString()}</>;
}

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
          Building with trust,<br className="hidden md:block" /> driven by experience
        </h2>
      </div>

      {/* Контент: табы слева + видео справа */}
      <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-start">
        {/* Левая колонка */}
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

          {/* Список */}
          <ul className="space-y-3 md:space-y-4">
            {CONTENT[tab].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <svg
                  className="mt-1 h-5 w-5 shrink-0 text-neutral-900"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M7.5 13.5 3.8 9.8l1.4-1.4 2.3 2.3 6.3-6.3 1.4 1.4-7.7 7.7Z" />
                </svg>
                <span className="text-neutral-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Правая колонка: видео с автоплеем (без чёрных полос) */}
        <div className="flex-1 w-full flex justify-center lg:justify-end">
          <div className="relative overflow-hidden rounded-2xl shadow-xl"
               style={{ clipPath: 'polygon(12% 0%, 100% 0%, 88% 100%, 0% 100%)' }}>
            <video
              autoPlay
              muted
              loop
              playsInline
              // Если положишь файл в public/about/hero.mp4 — используй: src="/about/hero.mp4"
              src="https://res.cloudinary.com/dzytbkc5l/video/upload/v1760069369/Allied/Allied_Plumbing_Video_Script_Generation_qz6an9.mp4"
              poster="https://res.cloudinary.com/dzytbkc5l/image/upload/v1760068155/Allied/10_kubptf.png"
              className="block h-[300px] w-[420px] md:h-[360px] md:w-[520px] object-cover object-center"
            />
          </div>
        </div>
      </div>

      {/* Бейджи-лента */}
      <div className="mt-10 md:mt-14">
        <QualityBadges />
      </div>

      {/* Стат-баннер с анимациями */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="mt-10 md:mt-14 rounded-2xl bg-[rgb(240_249_255_/_0.8)] border border-[rgb(240_249_255_/_0.8)] p-6 md:p-10 shadow-sm"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { n: 8000, suffix: '+', label: 'Projects completed' },
            { n: 5000, suffix: '+', label: 'Global customers' },
            { n: 12,   suffix: '',  label: 'Years of experience' },
            { n: 92,   suffix: '',  label: 'Team engineers' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ scale: 0.9, opacity: 0, y: 10 }}
              whileInView={{ scale: 1, opacity: 1, y: 0 }}
              viewport={{ once: true }}
              animate={{ y: [0, -6, 0] }}
              transition={{
                delay: idx * 0.15,
                duration: 0.6,
                ease: 'easeOut',
                y: { duration: 10, repeat: Infinity, ease: 'easeInOut', delay: idx * 1.2 },
              }}
              whileHover={{ scale: 1.04, boxShadow: '0 10px 30px -10px rgba(2,6,23,.25)' }}
              whileTap={{ scale: 0.98 }}
              className="space-y-1 rounded-xl px-2 py-1"
            >
              <div className="text-3xl md:text-4xl font-extrabold text-neutral-900">
                <CountUp to={stat.n} />
                {stat.suffix}
              </div>
              <div className="text-sm md:text-base text-neutral-600">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}