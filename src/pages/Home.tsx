// src/pages/Home.tsx
import Hero from '@/components/Hero';
import { HOME_SLIDES } from '@/lib/lcp-preload';
import FeatureRibbon from '@/components/FeatureRibbon';
import WhoWeWorkFor from '@/components/WhoWeWorkFor';
import AboutCompany from '@/components/AboutCompany';
import ServicesShowcase from '@/components/ServicesShowcase';
import ProjectsBanner from '@/components/ProjectsBanner';
import TeamSection from '@/components/TeamSection';
import LogoMarquee from "../components/LogoMarquee";
import CallToAction from "@/components/CallToAction";
import ClientTestimonials from '../components/ClientTestimonials';
import BlogTeasers from '../components/BlogTeasers';
import ContactLead from "@/components/ContactLead";

export default function Home() {
  return (
    <div className="bg-white overflow-x-hidden">

      <Hero slides={HOME_SLIDES} />

      <FeatureRibbon className="-mt-8 md:-mt-32" />

      <section className="max-w-6xl mx-auto px-4 flex flex-col gap-12">
        <WhoWeWorkFor />

        <AboutCompany />

        <div className="space-y-10">
          <ServicesShowcase />
          <ProjectsBanner />
          <TeamSection />
          <ClientTestimonials />
          <LogoMarquee />
          <CallToAction />
          <ContactLead />
          <BlogTeasers />

        </div>
      </section>

      {/* Поп-ап CTA — Renders поверх всего, помним про suppression в localStorage */}

    </div>
  );
}