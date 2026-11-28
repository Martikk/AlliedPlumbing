import { Link } from '../lib/navigation';

/** The body of a service page.
 *
 *  All six service pages shipped as a hero, five keyword bullets and a CTA —
 *  159 to 211 words inside `<main>`, each one shorter than the articles that
 *  link to it. These are the pages a commercial or strata buyer reaches from
 *  a search, so they were the thinnest pages at the most valuable point on
 *  the site.
 *
 *  One component rather than six copies of the same markup: a service that
 *  gains a case study or an article is a data change, not a layout change.
 *  Nothing here invents a credential — every case link resolves to a project
 *  page and every reading link to an article that already exists, which
 *  `tests/seo.test.mjs` checks against the built site. */

export type ServiceSection = { title: string; paragraphs: string[]; list?: string[] };
export type ServiceLink = { to: string; label: string; note: string };

export default function ServiceSections({ sections, cases, reading }: {
  sections: ServiceSection[];
  cases?: ServiceLink[];
  reading?: ServiceLink[];
}) {
  return <section className="max-w-6xl mx-auto px-4 md:px-6 pb-4">
    <div className="max-w-3xl">
      {sections.map(section => <div key={section.title} className="mb-10">
        <h2 className="text-2xl md:text-3xl font-bold">{section.title}</h2>
        {section.paragraphs.map(text => <p key={text} className="mt-4 text-neutral-700 leading-relaxed">{text}</p>)}
        {section.list && <ul className="mt-4 list-disc pl-5 space-y-2 text-neutral-700 leading-relaxed">
          {section.list.map(item => <li key={item}>{item}</li>)}
        </ul>}
      </div>)}

      {cases && cases.length > 0 && <div className="mb-10">
        <h2 className="text-2xl md:text-3xl font-bold">Where we have done this</h2>
        <p className="mt-4 text-neutral-700 leading-relaxed">Each page describes the scope, the coordination it needed and the problems that came up on the way.</p>
        <ul className="mt-4 list-disc pl-5 space-y-3 text-neutral-700 leading-relaxed">
          {cases.map(item => <li key={item.to}>
            <Link to={item.to} className="font-semibold text-[#315cb4] underline underline-offset-4">{item.label}</Link> — {item.note}
          </li>)}
        </ul>
      </div>}

      {reading && reading.length > 0 && <div className="mb-10">
        <h2 className="text-2xl md:text-3xl font-bold">Further reading</h2>
        <ul className="mt-4 list-disc pl-5 space-y-3 text-neutral-700 leading-relaxed">
          {reading.map(item => <li key={item.to}>
            <Link to={item.to} className="font-semibold text-[#315cb4] underline underline-offset-4">{item.label}</Link> — {item.note}
          </li>)}
        </ul>
      </div>}
    </div>
  </section>;
}
