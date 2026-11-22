import { Link } from '../lib/navigation';
import { openCookieSettings } from './AnalyticsConsent';

export default function Footer() {
  return <footer className="bg-[#f3f7fb] text-neutral-700 mt-12">
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <Link to="/" className="font-extrabold text-xl text-neutral-900">Allied Plumbing, Heating &amp; Air Conditioning</Link>
          <p className="mt-3">4085 2nd Avenue, Burnaby, BC V5C 3X1</p><p className="mt-2">Serving British Columbia</p><a href="mailto:info@allied-plumbing.ca" className="inline-block mt-2 underline underline-offset-4">info@allied-plumbing.ca</a><br />
          <a href="tel:+16047311000" className="inline-block mt-2 font-semibold underline underline-offset-4">604-731-1000</a>
        </div>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-4 text-sm">
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/services" className="hover:underline">Services</Link>
          <Link to="/projects" className="hover:underline">Projects</Link>
          <Link to="/blog" className="hover:underline">Articles</Link><Link to="/careers" className="hover:underline">Careers</Link><Link to="/team" className="hover:underline">Team</Link><Link to="/contact" className="hover:underline">Contact</Link>
          <Link to="/privacy" className="hover:underline">Privacy</Link>
          {/* Phones only: the floating analytics pill is hidden there because
              it covers form fields, so the control lives here instead. */}
          <button type="button" onClick={openCookieSettings} className="md:hidden hover:underline">Cookie settings</button>
        </nav>
      </div>
      <p className="mt-8 border-t border-neutral-200 pt-4 text-sm">© {new Date().getFullYear()} Allied Plumbing. All rights reserved.</p>
    </div>
  </footer>;
}
