import { useSearchParams } from 'react-router-dom';
import { Link } from '../lib/navigation';
import { responsiveImage, imageCandidates } from '../lib/images';
import projects from '../data/projects.json';
import { PHONE } from '../config';

/** Audit H-03, extended by section 10b of the November 2026 page-copy plan.
 *
 *  There was one thank-you page for every enquiry, which made the copy
 *  generic — a flooding basement and a tender both got "we reply within one
 *  business day" — and gave GA4 a single destination, so the three leads
 *  Allied cares about could not be told apart by page. There are now three
 *  URLs with the answer each sender actually needs.
 *
 *  All three are noindex and out of the sitemap, but prerendered, so a
 *  refresh or a pasted link still works. `/quote/thanks` stays as the
 *  project page under its old URL: acknowledgement emails already sent carry
 *  it, and a dead link in somebody's inbox is a worse outcome than one
 *  duplicate route.
 *
 *  What the plan asked for and is not here: the service page promises no
 *  callback time, because Allied has not confirmed one (Q6); the project page
 *  does not offer a prequalification pack and the maintenance page does not
 *  offer a sample visit report, because neither document exists yet. Each of
 *  those links points at the nearest thing that does. */

export type LeadType = 'service' | 'project' | 'maintenance';

type Copy = {
  kicker: string;
  heading: string;
  lead: string;
  steps: [string, string][];
  links: { to: string; label: string }[];
};

const COPY: Record<LeadType, Copy> = {
  service: {
    kicker: 'Service request received',
    heading: 'Got it — a dispatcher will call you back',
    lead: 'Service calls are answered by phone rather than email, so the callback comes from the person who can book it. A confirmation with your reference is on its way to your inbox.',
    steps: [
      [
        'A dispatcher calls you',
        'To confirm the address, the access arrangements and who will meet the technician on site.',
      ],
      [
        'A technician is assigned',
        'With whatever equipment detail you gave us, so the right parts and the right ticket are on the van.',
      ],
      [
        'You get the visit report',
        'What was found, what was done on the spot, and what needs a quote.',
      ],
    ],
    links: [
      { to: '/services/emergency', label: 'How emergency calls are handled' },
      { to: '/services/maintenance', label: 'Put the building on a maintenance programme' },
    ],
  },
  project: {
    kicker: 'Enquiry received',
    heading: 'Thank you — we have your enquiry',
    lead: 'Our projects team will reply within one business day, usually with questions: access windows, equipment details, or a time for a site visit. A confirmation with your reference is on its way to your inbox.',
    steps: [
      [
        'We read it the same day',
        'Your enquiry goes to the person who handles that kind of work — estimating for tenders, the quote desk for everything else.',
      ],
      [
        'We reply within one business day',
        'Usually with questions, or with a time for a site visit. Urgent service calls are answered by phone, not email.',
      ],
      [
        'You get a written scope',
        'Sequence, submittals and turnover documents, priced. Nothing starts until you have agreed it.',
      ],
    ],
    links: [
      { to: '/projects', label: 'See similar projects' },
      { to: '/rfp', label: 'What a tender package should include' },
    ],
  },
  maintenance: {
    kicker: 'Maintenance enquiry received',
    heading: 'Thanks — our service manager will be in touch',
    lead: 'A maintenance programme starts with a walkthrough rather than a price list, because what a building needs depends on the plant that is in it. Our service manager will be in touch within one business day to arrange one.',
    steps: [
      [
        'A walkthrough is arranged',
        'An hour or two on site, looking at the plant, the access and the records the building already holds.',
      ],
      [
        'You get an equipment inventory',
        'What is installed, its age and its condition — which is also the start of a replacement forecast.',
      ],
      [
        'A programme is proposed',
        'Visit frequency and scope matched to that equipment, with a written report after every visit.',
      ],
    ],
    links: [
      { to: '/services/maintenance', label: 'What a maintenance programme covers' },
      { to: '/strata', label: 'For strata councils and property managers' },
    ],
  },
};

export default function Thanks({ type }: { type: LeadType }) {
  const [params] = useSearchParams();
  const reference = params.get('ref');
  const copy = COPY[type];
  const related = projects.filter(project => project.featured).slice(0, 2);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
      <span className="section-kicker">{copy.kicker}</span>
      <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">{copy.heading}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-neutral-700">{copy.lead}</p>

      {type === 'service' && (
        <p className="mt-5 max-w-2xl rounded-xl border border-red-200 bg-red-50 p-5 leading-relaxed text-neutral-800">
          If water is leaking, the building has no heat, or you can smell gas, call{' '}
          <a href="tel:+16047311000" data-cta-location="page" className="font-bold underline underline-offset-4">
            {PHONE}
          </a>{' '}
          now rather than waiting for the callback. The line is answered around the clock.
        </p>
      )}

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
          {copy.steps.map(([title, text], index) => (
            <li key={title} className="border-t border-slate-300 pt-5">
              <span className="text-sm font-semibold text-slate-600">0{index + 1}</span>
              <h3 className="mt-3 text-xl font-bold">{title}</h3>
              <p className="mt-3 text-neutral-700 leading-relaxed">{text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-wrap items-center gap-5">
          <a href="tel:+16047311000" data-cta-location="page" className="btn-brand">
            Call {PHONE}
          </a>
          {copy.links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="font-semibold text-red-800 underline underline-offset-4"
            >
              {link.label}
            </Link>
          ))}
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
