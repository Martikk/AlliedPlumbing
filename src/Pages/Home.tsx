// src/pages/Home.tsx
import Head from '../components/Head';
import ServiceCards from '../components/ServiceCards';
import ProjectCards from '../components/ProjectCards';
import { PHONE, EMAIL_QUOTE } from '../config'; // ← РЕКОМЕНДУЮ: сделать src/config.ts

export default function Home() {
  return (
    <section className="space-y-10">
      <Head
        title="Allied Plumbing — Keeping BC Running"
        description="Plumbing, heating, and HVAC experts for schools, strata, commercial, and residential across BC. 24/7 emergency service."
        canonical="https://allied-plumbing.ca/"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'HVACBusiness',
          name: 'Allied Plumbing, Heating & Air Conditioning Ltd.',
          telephone: '604-731-1000',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '4085 2nd Ave',
            addressLocality: 'Burnaby',
            addressRegion: 'BC',
            postalCode: 'V5C 3X1',
            addressCountry: 'CA',
          },
          areaServed: 'British Columbia',
          url: 'https://allied-plumbing.ca',
        }}
      />

      <div className="bg-neutral-50 rounded-2xl p-8">
        <h1 className="text-3xl md:text-5xl font-extrabold">Keeping BC Running.</h1>
        <p className="mt-3 text-lg">
          Plumbing, heating, and HVAC experts for schools, strata, commercial, and residential. 24/7 emergency service.
        </p>
        <div className="mt-6 flex gap-3">
          <a
            href={`tel:${PHONE}`}
            className="px-4 py-3 rounded-xl bg-red-600 text-white"
            aria-label={`Call ${PHONE} for 24/7 service`}
          >
            Book 24/7 Service
          </a>
          <a
            href={`mailto:${EMAIL_QUOTE}`}
            className="px-4 py-3 rounded-xl border border-neutral-300"
            aria-label={`Email ${EMAIL_QUOTE} to request a quote`}
          >
            Request a Quote
          </a>
        </div>
        <ul className="mt-6 grid md:grid-cols-3 gap-4 text-sm">
          <li className="p-4 bg-white rounded-xl border">25+ years delivering boiler plants, HVAC upgrades, and service across BC.</li>
          <li className="p-4 bg-white rounded-xl border">Prime Contractor with school-safe crews and annual CRCs.</li>
          <li className="p-4 bg-white rounded-xl border">Preventive maintenance with daily DDC monitoring.</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Our Services</h2>
        <ServiceCards />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-3">Featured Projects</h2>
        <ProjectCards />
      </div>
    </section>
  );
}