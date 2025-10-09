import Head from '../components/Head';
import ServiceCards from '../components/ServiceCards';
import ProjectCards from '../components/ProjectCards';
import Hero from '@/components/Hero';
import FeatureRibbon from '@/components/FeatureRibbon';
import { PHONE } from '@/config'; // EMAIL_QUOTE убрал — не используется
import AboutCompany from '@/components/AboutCompany';
import ServicesShowcase from '@/components/ServicesShowcase';
import ProjectsBanner from '@/components/ProjectsBanner';
import TeamSection from '@/components/TeamSection';
import ClientTestimonials from "../components/ClientTestimonials";

export default function Home() {
  return (
    <div className="bg-white overflow-x-hidden">
      {/* всё что тянется на full-width — оставляем вне контейнера */}
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

      {/* ленточка слегка наезжает на hero */}
      <FeatureRibbon className="-mt-8 md:-mt-32" />

      {/* контентная часть — внутри контейнера */}
      <section className="max-w-6xl mx-auto px-4 flex flex-col gap-12">

{/* NEW: About company section */}
<AboutCompany />



<div className="space-y-10">
  {/* …Hero + FeatureRibbon… */}

  <ServicesShowcase />
<ProjectsBanner />
<TeamSection />
<ClientTestimonials />
</div>

      </section>
    </div>
  );
}