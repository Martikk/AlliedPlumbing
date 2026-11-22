import { useSearchParams } from 'react-router-dom';
import { Link } from '../lib/navigation';
import { responsiveImage, imageCandidates } from '../lib/images';
import projects from '../data/projects.json';
import { PHONE } from '../config';

/** Audit H-03 — the thank-you page, in the site's own visual language.
 *
 *  noindex and out of the sitemap (set in src/data/seo.json), but still
 *  prerendered so a refresh or a direct link works. It is also the GA4
 *  conversion destination, as a backup to the `generate_lead` event. */

const STEPS: [string, string][] = [
  [
    'We read it the same day',
    'Your enquiry goes to the person who handles that kind of work — dispatch for service calls, estimating for tenders, the quote desk for everything else.',
  ],
  [
    'We reply within one business day',
    'Usually with questions: access windows, equipment details, or a time for a site visit. Urgent service calls are answered by phone, not email.',
  ],
  [
    'You get a written scope',
    'Sequence, submittals and turnover documents, priced. Nothing starts until you have agreed it.',
  ],
];

export default function QuoteThanks() {
  const [params] = useSearchParams();
  const reference = params.get('ref');
  const related = projects.filter(project => project.featured).slice(0, 2);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
      <span className="section-kicker">Enquiry received</span>
      <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">
        Thank you — we have your enquiry
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-neutral-700">
        A copy is on its way to your inbox.
      </p>

      {reference && (
        <div className="project-metrics company-experience mt-8 max-w-md">
          <div>
            <span>Your reference</span>
            <strong>{reference}</strong>
            <small>Quote this if you call us about this enquiry.</small>
          </div>
        </div>
      )}

      <section className="mt-12">
        <h2 className="text-3xl md:text-4xl font-extrabold">What happens next</h2>
        <ol className="mt-8 grid md:grid-cols-3 gap-7">
          {STEPS.map(([title, copy], index) => (
            <li key={title} className="border-t border-slate-300 pt-5">
              <span className="text-sm font-semibold text-slate-600">0{index + 1}</span>
              <h3 className="mt-3 text-xl font-bold">{title}</h3>
              <p className="mt-3 text-neutral-700 leading-relaxed">{copy}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-wrap items-center gap-5">
          <a href="tel:+16047311000" data-cta-location="page" className="btn-brand">
            Call {PHONE}
          </a>
          <Link to="/projects" className="font-semibold text-red-800 underline underline-offset-4">
            Explore our projects
          </Link>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-14 border-t border-slate-200 pt-8">
          <h2 className="text-2xl md:text-3xl font-extrabold">Work like yours</h2>
          <div className="mt-7 grid md:grid-cols-2 gap-6">
            {related.map(project => (
              <article key={project.id}>
                <Link to={`/projects/${project.id}`} className="group block">
                  <div className="relative clip-tilt rounded-2xl overflow-hidden">
                    <img
                      src={responsiveImage(project.cover, 768)}
                      srcSet={imageCandidates(project.cover)}
                      sizes="(min-width: 768px) 460px, 100vw"
                      alt=""
                      width={900}
                      height={650}
                      loading="lazy"
                      className="w-full h-56 md:h-60 object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="clip-tilt mt-3 rounded-xl bg-neutral-100 px-5 py-4">
                    <h3 className="font-semibold text-neutral-800 leading-relaxed">
                      {project.title}
                    </h3>
                  </div>
                </Link>
                <p className="mt-3 px-2 text-sm leading-relaxed text-neutral-600">
                  {project.outcomeLine ?? project.summary}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
