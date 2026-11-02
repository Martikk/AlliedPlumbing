import { responsiveImage, imageCandidates } from '../lib/images';
import { Link } from '../lib/navigation';

type Item = {
  n: string;
  title: string;
  blurb: string;
  href: string;
  img: string;
};

const ITEMS: Item[] = [
  {
    n: '01',
    title: 'Preventive Maintenance',
    blurb:
      'Monthly, quarterly, annual programs with trend reviews, DDC checks and reporting.',
    href: '/services/maintenance',
    img: 'https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760069670/Allied/maintance_grwetv.png',
  },
  {
    n: '02',
    title: 'Plumbing (Residential)',
    blurb:
      'Repairs, fixture replacements, rough-ins, repipes, tank & tankless water heaters.',
    href: '/services/residential-plumbing',
    img: 'https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760068156/Allied/14_urnogx.png',
  },
  {
    n: '03',
    title: 'Plumbing (Commercial)',
    blurb:
      'Backflows, PRVs, booster pumps, DHW plants, tenant improvements, strata & schools.',
    href: '/services/commercial-plumbing',
    img: 'https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760065875/Allied/1_tc9jiy.png',
  },
  {
    n: '04',
    title: 'Air Conditioning & HVAC',
    blurb:
      'RTU, MUA, AHU, unit ventilators, heat pumps, VRF — with DDC integration.',
    href: '/services/hvac',
    img: 'https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760065875/Allied/5_jovqeo.png',
  },
  {
    n: '05',
    title: 'Heating & Boiler Plants',
    blurb:
      'Condensing boilers, burners, VFD pumps, HX, tanks, safety and controls.',
    href: '/services/boilers',
    img: 'https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760068155/Allied/10_kubptf.png', // поменяй на подходящее фото, если нужно
  },
  {
    n: '06',
    title: '24/7 Emergency Service',
    blurb:
      'Fast response for leaks, no-heat/DHW outages, gas issues and RTU/MUA failures.',
    href: '/services/emergency',
    img: 'https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760077645/Allied/Screenshot_2025-10-09_at_11.27.02_PM_nnu7cg.png',
  },
];

export default function ServicesShowcase() {
  return (
    <section className="relativ py-10 md:py-14 rounded-3xl">
      {/* заголовок + explore */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 mb-6 md:mb-8 flex items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.14em] text-neutral-500 mb-2">
            Our services
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
            What We Provide<br className="hidden md:block" />
            In Our Services
          </h2>
        </div>
        <Link
          to="/services"
          className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-[#5776c6] text-white px-4 py-2 text-sm font-semibold hover:brightness-110 transition"
        >
          Explore all <span aria-hidden>↗</span>
        </Link>
      </div>

      {/* список рядов */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-10">
        {ITEMS.map((it, i) => {
          const imgLeft = i % 2 === 0; // чередуем
          return (
            <article
              key={it.n + it.href}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-stretch"
            >
              {/* изображение */}
              <Link
                to={it.href}
                  aria-label={`View ${it.title} services`}
                className={`group block rounded-2xl overflow-hidden bg-neutral-200 shadow-sm ring-1 ring-black/5 hover:shadow-lg transition ${
                  imgLeft ? '' : 'lg:order-2'
                }`}
              >
                <img
                  src={responsiveImage(it.img, 768)} srcSet={imageCandidates(it.img)} sizes="(min-width: 1024px) 560px, 100vw" width={1200} height={800}
                  alt=""
                  className="h-64 md:h-72 lg:h-60 w-full object-cover transition duration-500 group-hover:scale-[1.03] group-hover:brightness-105"
                  loading="lazy"
                  decoding="async"
                />
              </Link>

              {/* контентный столбец */}
              <div className={`flex ${imgLeft ? 'lg:pl-6' : 'lg:pr-6 lg:order-1'}`}>
                {/* номер + вертикальная линия */}
                <div className="hidden md:flex flex-col items-center pr-5">
                  <span className="text-neutral-400 font-semibold tracking-widest">
                    {it.n}
                  </span>
                  <span className="mt-2 h-full w-px bg-neutral-200" />
                </div>

                {/* текст + кнопка + горизонтальная линия */}
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-xl md:text-2xl font-semibold">
                    {it.title}
                  </h3>
                  <p className="mt-2 text-neutral-600 leading-relaxed">
                    {it.blurb}
                  </p>

                  <div className="mt-4 flex items-center gap-4">
                    <Link
                      to={it.href}
                      className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-3.5 py-2 text-sm font-medium hover:bg-neutral-100 transition"
                    >
                      View details <span aria-hidden>↗</span>
                    </Link>
                    {/* тонкая линия справа, как в рефе */}
                    <div className="hidden md:block h-px flex-1 bg-neutral-200" />
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}