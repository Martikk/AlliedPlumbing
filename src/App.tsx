import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import ScrollToTop from './components/ScrollToTop';
import SkipLink from './components/SkipLink';
import EmergencyBar from './components/EmergencyBar';
import HeaderBar from '@/components/HeaderBar';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const ResidentialPlumbing = lazy(() => import('./pages/ResidentialPlumbing'));
const CommercialPlumbing = lazy(() => import('./pages/CommercialPlumbing'));
const HVACPage = lazy(() => import('./pages/HVACPage'));
const BoilersPage = lazy(() => import('./pages/BoilersPage'));
const MaintenancePage = lazy(() => import('./pages/MaintenancePage'));
const EmergencyPage = lazy(() => import('./pages/EmergencyPage'));
const ProjectsIndex = lazy(() => import('./pages/ProjectsIndex'));
const Garibaldi = lazy(() => import('./pages/Garibaldi'));
const Ridgeview = lazy(() => import('./pages/Ridgeview'));
const Leigh = lazy(() => import('./pages/Leigh'));
const Haro = lazy(() => import('./pages/Haro'));
const RFP = lazy(() => import('./pages/RFP'));
const Careers = lazy(() => import('./pages/Careers'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <BrowserRouter /* basename="/allied" */>
      <SkipLink />
      <EmergencyBar />
      <div className="min-h-screen text-neutral-800">
        <HeaderBar />
        <main id="main" className="max-w-6xl mx-auto px-4 py-8">
          <ScrollToTop />
          <Suspense fallback={<div className="py-20 text-center">Loading…</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/residential-plumbing" element={<ResidentialPlumbing />} />
              <Route path="/services/commercial-plumbing" element={<CommercialPlumbing />} />
              <Route path="/services/hvac" element={<HVACPage />} />
              <Route path="/services/boilers" element={<BoilersPage />} />
              <Route path="/services/maintenance" element={<MaintenancePage />} />
              <Route path="/services/emergency" element={<EmergencyPage />} />
              <Route path="/projects" element={<ProjectsIndex />} />
              <Route path="/projects/garibaldi" element={<Garibaldi />} />
              <Route path="/projects/ridgeview" element={<Ridgeview />} />
              <Route path="/projects/leigh" element={<Leigh />} />
              <Route path="/projects/haro" element={<Haro />} />
              <Route path="/rfp" element={<RFP />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        {/* footer — как у тебя */}
      </div>
    </BrowserRouter>
  );
}