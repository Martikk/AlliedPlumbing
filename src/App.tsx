import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import ScrollToTop from './components/ScrollToTop';
import SkipLink from './components/SkipLink';
import GetQuote from './pages/GetQuote';
import Projects from './pages/Projects';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const ResidentialPlumbing = lazy(() => import('./pages/ResidentialPlumbing'));
const CommercialPlumbing = lazy(() => import('./pages/CommercialPlumbing'));
const HVACPage = lazy(() => import('./pages/HVACPage'));
const MaintenancePage = lazy(() => import('./pages/MaintenancePage'));
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
          <Route path="/services/residential-plumbing" element={<ResidentialPlumbing />} />
          <Route path="/services/commercial-plumbing" element={<CommercialPlumbing />} />
          <Route path="/services/hvac" element={<HVACPage />} />
          <Route path="/services/maintenance" element={<MaintenancePage />} />
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
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}