import Head from '../components/Head';
import Hero from '@/components/Hero';
import FeatureRibbon from '@/components/FeatureRibbon';
import { PHONE } from '@/config'; // EMAIL_QUOTE убрал — не используется
import AboutCompany from '@/components/AboutCompany';
import ServicesShowcase from '@/components/ServicesShowcase';
import ProjectsBanner from '@/components/ProjectsBanner';
import TeamSection from '@/components/TeamSection';
import ClientTestimonials from "../components/ClientTestimonials";
import BlogTeasers from "@/components/BlogTeasers";
import LogoMarquee from "../components/LogoMarquee";
import CallToAction from "@/components/CallToAction";
import ContactLead from "@/components/ContactLead";
import Footer from "@/components/Footer";

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

      <Hero slides={['https://res.cloudinary.com/dzytbkc5l/image/upload/v1760074307/Allied/Gemini_Generated_Image_9on55p9on55p9on5_ga0mso.png', 
      'https://res.cloudinary.com/dzytbkc5l/image/upload/v1760065876/Allied/3_gk4dl8.png', 
        'https://res.cloudinary.com/dzytbkc5l/image/upload/v1760065875/Allied/1_tc9jiy.png', 
        'https://res.cloudinary.com/dzytbkc5l/image/upload/v1760068156/Allied/14_urnogx.png']} />

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
<BlogTeasers />
<LogoMarquee />
<CallToAction />
<ContactLead />
<Footer />
</div>

      </section>
    </div>
  );
}