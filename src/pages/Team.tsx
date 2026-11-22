import Breadcrumb from '../components/Breadcrumb';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import { cld, srcSet } from '../lib/images';
import team from '../data/team.json';

export default function Team() {
  const ordered = [...team].sort(
    (a, b) => Number(Boolean(b.image)) - Number(Boolean(a.image)),
  );
  return (
    <>
      <Breadcrumb trail={[{ name: 'Team', path: '/team' }]} />
      <Section
        headingLevel={1}
        eyebrow="Our team"
        heading="The people who run the work"
        intro="Project managers, estimators and service leads. These are the people you will deal with, not a call centre."
      >
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {ordered.map(member => (
            <article key={member.name} className="border-t-2 border-[var(--line)] pt-6">
              {member.image && (
                <img
                  src={cld(member.image, 640, { ar: '4:5' })}
                  srcSet={srcSet(member.image, 960, { ar: '4:5' })}
                  sizes="(min-width: 1024px) 360px, (min-width: 768px) 45vw, 100vw"
                  alt={`${member.name}, ${member.role}`}
                  width={640}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="mb-6 aspect-[4/5] w-full rounded-[var(--radius-lg)] object-cover object-top clip-tilt"
                />
              )}
              <h2 className="text-h3 font-bold text-[var(--ink)]">{member.name}</h2>
              <p className="mt-1 font-semibold text-[var(--muted)]">{member.role}</p>
              <p className="mt-4 text-[var(--body)]">{member.bio}</p>
              <h3 className="mt-5 text-eyebrow font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
                Responsible for
              </h3>
              <p className="mt-2 text-sm text-[var(--body)]">{member.focus}</p>
              {member.credentials.length > 0 && (
                <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-[var(--body)]">
                  {member.credentials.map(credential => (
                    <li key={credential}>{credential}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </Section>

      <Section tone="alt" eyebrow="Next" heading="Speak with our team">
        <p className="max-w-2xl text-[var(--body)]">
          Tell us about your building, equipment or project requirements.
        </p>
        <div data-cta-anchor className="mt-6 flex flex-wrap gap-3">
          <Button href="/quote">Get a quote</Button>
          <Button href="/careers" variant="secondary">
            Work with us
          </Button>
        </div>
      </Section>
    </>
  );
}
