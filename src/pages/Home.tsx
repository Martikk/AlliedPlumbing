// src/pages/Home.tsx
import { Link } from '../lib/navigation';
import Hero from '@/components/Hero';
import { HOME_SLIDES } from '@/lib/lcp-preload';
import FeatureRibbon from '@/components/FeatureRibbon';
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
        <section className="pt-10 md:pt-14">
          <h2 className="text-3xl md:text-4xl font-extrabold">From first enquiry to a defined scope.</h2>
          <ol className="mt-8 grid md:grid-cols-3 gap-7">{[
            ['Tell us about your building.','Share the location, the system involved and what you need help with. Available drawings and photographs can help us understand the request.'],
            ['Review the requirements.','We discuss access, timing and the information needed to assess the work. Some requests will require a site visit or consultant input.'],
            ['Agree the next steps.','Scope, scheduling and project-specific requirements are discussed before work proceeds.'],
          ].map(([title,copy],index)=><li key={title} className="border-t border-slate-300 pt-5"><span className="text-sm font-semibold text-slate-500">0{index+1}</span><h3 className="mt-3 text-xl font-bold">{title}</h3><p className="mt-3 text-neutral-700 leading-relaxed">{copy}</p></li>)}</ol>
          {/* A raw anchor here reloaded the whole app instead of routing. */}
          <Link to="/quote" className="btn-brand mt-7">Discuss your project <span aria-hidden>↗</span></Link>
        </section>
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