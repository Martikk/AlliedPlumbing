import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import SiteLayout from './components/SiteLayout';
import Privacy from './pages/Privacy';
import ScrollToTop from './components/ScrollToTop';
import SkipLink from './components/SkipLink';

const Home = lazy(() => import('./pages/Home'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));

const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Projects = lazy(() => import('./pages/Projects'));

const RFP = lazy(() => import('./pages/RFP'));
const Careers = lazy(() => import('./pages/Careers'));
const Contact = lazy(() => import('./pages/Contact'));
const GetQuote = lazy(() => import('./pages/GetQuote'));
const Team = lazy(() => import('./pages/Team'));
const Clients = lazy(() => import('./pages/Clients'));

const ServiceMaintenance = lazy(() => import("./pages/ServiceMaintenance"));
const ServiceResidential = lazy(() => import("./pages/ServiceResidential"));
const ServiceCommercial = lazy(() => import("./pages/ServiceCommercial"));
const ServiceHVAC = lazy(() => import("./pages/ServiceHVAC"));
const ServiceBoilers = lazy(() => import("./pages/ServiceBoilers"));
const ServiceHeatPumps = lazy(() => import("./pages/ServiceHeatPumps"));
const Strata = lazy(() => import("./pages/Strata"));
const Thanks = lazy(() => import("./pages/Thanks"));
const ServiceEmergency = lazy(() => import("./pages/ServiceEmergency"));

const NotFound = lazy(() => import('./pages/NotFound'));

export function AppContent() {
  return (
    <>
      <SkipLink />
      <ScrollToTop />
      <SiteLayout>
      <Suspense fallback={<div className="py-20 text-center">Loading…</div>}>
        <Routes>
          {/* Core */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* Services hub + detail pages */}
          {/* Sector landing page (plan section 6b) */}
          <Route path="/strata" element={<Strata />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/maintenance" element={<ServiceMaintenance />} />
          <Route path="/services/residential-plumbing" element={<ServiceResidential />} />
          <Route path="/services/commercial-plumbing" element={<ServiceCommercial />} />
          <Route path="/services/hvac" element={<ServiceHVAC />} />
          <Route path="/services/boilers" element={<ServiceBoilers />} />
          <Route path="/services/heat-pump-conversions" element={<ServiceHeatPumps />} />
          <Route path="/services/emergency" element={<ServiceEmergency />} />

          {/* Projects hub + cases */}
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/icbc" element={<Navigate to="/projects/west-5th" replace />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />

          <Route path="/blog/foundations" element={<Navigate to="/blog/planning-school-hvac-upgrades" replace />} />
          <Route path="/blog/materials-2025" element={<Navigate to="/blog/boiler-plant-upgrade-ridgeview" replace />} />
          <Route path="/blog/tech-changing-game" element={<Navigate to="/blog/haro-heating-hot-water-upgrade" replace />} />
          {/* Company */}
          <Route path="/careers" element={<Careers />} />
          <Route path="/team" element={<Team />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/rfp" element={<RFP />} />

          {/* Contact / Quote */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/quote" element={<GetQuote />} />
          {/* H-03 — thank-you page, noindex, also the GA4 conversion destination. */}
          <Route path="/thanks/service" element={<Thanks type="service" />} />
          <Route path="/thanks/project" element={<Thanks type="project" />} />
          <Route path="/thanks/maintenance" element={<Thanks type="maintenance" />} />
          {/* The URL acknowledgement emails already carry. Same page as
              /thanks/project, so an old link never lands on nothing. */}
          <Route path="/quote/thanks" element={<Thanks type="project" />} />

          {/* ✅ Redirect aliases (SEO/UX) */}
          <Route path="/GetQuote" element={<Navigate to="/quote" replace />} />
          <Route path="/getquote" element={<Navigate to="/quote" replace />} />
          <Route path="/services/boiler-plants-controls" element={<Navigate to="/services/boilers" replace />} />
          <Route path="/services/maintenance-programs" element={<Navigate to="/services/maintenance" replace />} />
          <Route path="/services/emergency-service" element={<Navigate to="/services/emergency" replace />} />

          <Route path="/privacy" element={<Privacy />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      </SiteLayout>
    </>
  );
}

export default function App() {
  return <BrowserRouter><AppContent /></BrowserRouter>;
}