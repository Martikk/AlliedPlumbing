import Head from '../components/Head';
import ServiceCards from '../components/ServiceCards';
import ProjectCards from '../components/ProjectCards';
import Hero from '@/components/Hero';
import FeatureRibbon from '@/components/FeatureRibbon';
import { PHONE, EMAIL_QUOTE } from '@/config';

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
          telephone: PHONE,
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

      <Hero slides={['/hero/1.jpg', '/hero/2.jpg', '/hero/3.jpg', '/hero/4.jpg']} />

      {/* ЛЕНТОЧКА: слегка наезжает на hero */}
      <FeatureRibbon className="-mt-8 md:-mt-12" />

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