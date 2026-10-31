import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import SiteLayout from './components/SiteLayout';
import Privacy from './pages/Privacy';
import ScrollToTop from './components/ScrollToTop';
import SkipLink from './components/SkipLink';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));

const Projects = lazy(() => import('./pages/Projects'));
const Garibaldi = lazy(() => import('./pages/Garibaldi'));
const Ridgeview = lazy(() => import('./pages/Ridgeview'));
const Leigh = lazy(() => import('./pages/Leigh'));
const Haro = lazy(() => import('./pages/Haro'));

const RFP = lazy(() => import('./pages/RFP'));
const Careers = lazy(() => import('./pages/Careers'));
const Contact = lazy(() => import('./pages/Contact'));
const GetQuote = lazy(() => import('./pages/GetQuote'));
const Team = lazy(() => import('./pages/Team'));
const Clients = lazy(() => import('./pages/Clients'));
const Blog = lazy(() => import('./pages/Blog'));

const ServiceMaintenance = lazy(() => import("./pages/ServiceMaintenance"));
const ServiceResidential = lazy(() => import("./pages/ServiceResidential"));
const ServiceCommercial = lazy(() => import("./pages/ServiceCommercial"));
const ServiceHVAC = lazy(() => import("./pages/ServiceHVAC"));
const ServiceBoilers = lazy(() => import("./pages/ServiceBoilers"));
const ServiceEmergency = lazy(() => import("./pages/ServiceEmergency"));

const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <BrowserRouter>
      <SkipLink />
      <ScrollToTop />
      <SiteLayout>
      <Suspense fallback={<div className="py-20 text-center">Loading…</div>}>
        <Routes>
          {/* Core */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* Services hub + detail pages */}
          <Route path="/services" element={<Services />} />
          <Route path="/services/maintenance" element={<ServiceMaintenance />} />
          <Route path="/services/residential-plumbing" element={<ServiceResidential />} />
          <Route path="/services/commercial-plumbing" element={<ServiceCommercial />} />
          <Route path="/services/hvac" element={<ServiceHVAC />} />
          <Route path="/services/boilers" element={<ServiceBoilers />} />
          <Route path="/services/emergency" element={<ServiceEmergency />} />

          {/* Projects hub + cases */}
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/garibaldi" element={<Garibaldi />} />
          <Route path="/projects/ridgeview" element={<Ridgeview />} />
          <Route path="/projects/leigh" element={<Leigh />} />
          <Route path="/projects/haro" element={<Haro />} />

          {/* Company */}
          <Route path="/careers" element={<Careers />} />
          <Route path="/team" element={<Team />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/rfp" element={<RFP />} />

          {/* Contact / Quote */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/quote" element={<GetQuote />} />

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
    </BrowserRouter>
  );
}