// src/pages/Home.tsx
import Hero from '@/components/Hero';
import FeatureRibbon from '@/components/FeatureRibbon';
import AboutCompany from '@/components/AboutCompany';
import ServicesShowcase from '@/components/ServicesShowcase';
import ProjectsBanner from '@/components/ProjectsBanner';
import TeamSection from '@/components/TeamSection';
import ClientTestimonials from "../components/ClientTestimonials";
import BlogTeasers from "@/components/BlogTeasers";
import LogoMarquee from "../components/LogoMarquee";
import CallToAction from "@/components/CallToAction";
import ContactLead from "@/components/ContactLead";

export default function Home() {
  return (
    <div className="bg-white overflow-x-hidden">

      <Hero slides={[
        'https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760074307/Allied/Gemini_Generated_Image_9on55p9on55p9on5_ga0mso.png',
        'https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760065876/Allied/3_gk4dl8.png',
        'https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760065875/Allied/1_tc9jiy.png',
        'https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760068156/Allied/14_urnogx.png'
      ]} />

      <FeatureRibbon className="-mt-8 md:-mt-32" />

      <section className="max-w-6xl mx-auto px-4 flex flex-col gap-12">
        <AboutCompany />

        <div className="space-y-10">
          <ServicesShowcase />
          <ProjectsBanner />
          <TeamSection />
          <ClientTestimonials />
          <BlogTeasers />
          <LogoMarquee />
          <CallToAction />
          <ContactLead />

        </div>
      </section>

      {/* Поп-ап CTA — Renders поверх всего, помним про suppression в localStorage */}

    </div>
  );
}