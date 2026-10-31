import { Link } from 'react-router-dom';

export default function Footer() {
  return <footer className="bg-[#f3f7fb] text-neutral-700 mt-12">
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <Link to="/" className="font-extrabold text-xl text-neutral-900">Allied Plumbing, Heating &amp; Air Conditioning</Link>
          <p className="mt-3">Serving British Columbia</p>
          <a href="tel:+16047311000" className="inline-block mt-2 font-semibold underline underline-offset-4">604-731-1000</a>
        </div>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-4 text-sm">
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/services" className="hover:underline">Services</Link>
          <Link to="/projects" className="hover:underline">Projects</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
          <Link to="/privacy" className="hover:underline">Privacy</Link>
          <a href="https://www.linkedin.com/company/allied-plumbing-bc/" target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>
        </nav>
      </div>
      <p className="mt-8 border-t border-neutral-200 pt-4 text-sm">© {new Date().getFullYear()} Allied Plumbing. All rights reserved.</p>
    </div>
  </footer>;
}
