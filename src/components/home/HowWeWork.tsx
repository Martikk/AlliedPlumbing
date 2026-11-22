import Section from '../ui/Section';
import { useReveal } from '../../hooks/useReveal';

/** Audit D-02 §5 — three steps plus what to send.
 *
 * Replaces the old process block and the unlabelled "Quality control system /
 * Project coordination…" list. Step numbers use --muted (7.5:1), not the
 * ~2.5:1 grey flagged in F-01. */

const STEPS = [
  {
    n: '01',
    title: 'Tell us about the building',
    copy: 'Location, the system involved, and what you need done. For a service call, tell us how urgent it is — we answer the phone 24/7.',
  },
  {
    n: '02',
    title: 'We review access and timing',
    copy: 'Shutdown windows, occupancy, trade coordination and the information needed to price the work. Larger scopes get a site visit.',
  },
  {
    n: '03',
    title: 'Scope, schedule and next steps',
    copy: 'A written scope with the sequence, the submittals and the turnover documents. Then the work, phased around the people in the building.',
  },
];

const SEND = [
  'Drawings or specifications, if an engineer is involved',
  'Photos of the mechanical room or the equipment',
  'Nameplate data: make, model, capacity, age',
  'Your access windows and any shutdown restrictions',
  'The schedule you are working to, including tender dates',
];

export default function HowWeWork() {
  const ref = useReveal<HTMLDivElement>({ stagger: true });
  return (
    <Section
      id="how-we-work"
      eyebrow="How we work"
      heading="From first enquiry to a defined scope"
    >
      <div ref={ref} className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <ol className="grid gap-8 sm:grid-cols-3 lg:gap-6">
          {STEPS.map(step => (
            <li key={step.n} data-reveal="" className="border-t-2 border-[var(--line)] pt-5">
              <span className="text-sm font-bold tracking-widest text-[var(--muted)]">
                {step.n}
              </span>
              <h3 className="mt-3 text-h3 font-bold text-[var(--ink)]">{step.title}</h3>
              <p className="mt-3 text-sm text-[var(--body)]">{step.copy}</p>
            </li>
          ))}
        </ol>
        <div
          data-reveal=""
          className="rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface-alt)] p-6"
        >
          <h3 className="text-h3 font-bold text-[var(--ink)]">What helps us quote faster</h3>
          <ul className="mt-4 space-y-3 text-sm text-[var(--body)]">
            {SEND.map(item => (
              <li key={item} className="flex gap-3">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand)]"
                >
                  <path d="M7.5 13.5 3.8 9.8l1.4-1.4 2.3 2.3 6.3-6.3 1.4 1.4-7.7 7.7Z" />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-[var(--muted)]">
            Nothing to hand? Send what you have — we will tell you what else we need.
          </p>
        </div>
      </div>
    </Section>
  );
}
