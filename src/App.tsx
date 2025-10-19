import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import ScrollToTop from './components/ScrollToTop';
import SkipLink from './components/SkipLink';
import GetQuote from './pages/GetQuote';
import Projects from './pages/Projects';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Garibaldi = lazy(() => import('./pages/Garibaldi'));
const Ridgeview = lazy(() => import('./pages/Ridgeview'));
const Leigh = lazy(() => import('./pages/Leigh'));
const Haro = lazy(() => import('./pages/Haro'));
const RFP = lazy(() => import('./pages/RFP'));
const Careers = lazy(() => import('./pages/Careers'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Team = lazy(() => import("./pages/Team"));
const Clients = lazy(() => import('./pages/Clients'));
const Blog = lazy(() => import('./pages/Blog'));
const ServiceMaintenance = lazy(() => import("./pages/ServiceMaintenance"));
const ServiceResidential = lazy(() => import("./pages/ServiceResidential"));
const ServiceCommercial = lazy(() => import("./pages/ServiceCommercial"));
const ServiceHVAC = lazy(() => import("./pages/ServiceHVAC"));
const ServiceBoilers = lazy(() => import("./pages/ServiceBoilers"));
const ServiceEmergency = lazy(() => import("./pages/ServiceEmergency"));

export default function App() {
  return (
    <BrowserRouter>
      <SkipLink />
      <ScrollToTop />
      <Suspense fallback={<div className="py-20 text-center">Loading…</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />

          <Route path="/projects/garibaldi" element={<Garibaldi />} />
          <Route path="/projects/ridgeview" element={<Ridgeview />} />
          <Route path="/projects/leigh" element={<Leigh />} />
          <Route path="/projects/haro" element={<Haro />} />
          <Route path="/rfp" element={<RFP />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/quote" element={<GetQuote />} />
          <Route path="/projects" element={<Projects />} />
          {/* 👇 алиасы, чтобы /GetQuote и /getquote тоже работали */}
          <Route path="/GetQuote" element={<Navigate to="/quote" replace />} />
          <Route path="/getquote" element={<Navigate to="/quote" replace />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/team" element={<Team />} />
          <Route path="/blog" element={<Blog />} />
          {/* 404 */}
          <Route path="*" element={<NotFound />} />

          <Route path="/services/maintenance" element={<ServiceMaintenance />} />
<Route path="/services/residential-plumbing" element={<ServiceResidential />} />
<Route path="/services/commercial-plumbing" element={<ServiceCommercial />} />
<Route path="/services/hvac" element={<ServiceHVAC />} />
<Route path="/services/boilers" element={<ServiceBoilers />} />
<Route path="/services/emergency" element={<ServiceEmergency />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}