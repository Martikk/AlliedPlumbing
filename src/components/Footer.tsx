import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#f3f7fb] text-neutral-700">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">
        {/* верхняя строка */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* логотип/текст */}
          <Link to="/" className="font-extrabold tracking-wide text-2xl text-neutral-900">
            Allied Plumbing, Heating & Air Conditioning
          </Link>

          {/* навигация */}
          <nav className="flex flex-wrap items-center gap-6 text-sm">
            <Link to="/about" className="hover:underline underline-offset-4">About us</Link>
            <Link to="/services" className="hover:underline underline-offset-4">Discover</Link>
            <Link to="/projects" className="hover:underline underline-offset-4">Explore</Link>
            <Link to="/contact" className="hover:underline underline-offset-4">Address</Link>
          </nav>

          {/* соцсети */}
          <div className="flex items-center gap-3">
            <a
              aria-label="Facebook"
              href="https://www.linkedin.com/company/allied-plumbing-bc/"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-9 w-9 place-items-center rounded-full bg-white shadow-sm ring-1 ring-black/5 hover:shadow-md"
            >
              <FaFacebookF className="text-neutral-700 text-sm" />
            </a>
            <a
              aria-label="Instagram"
              href="https://www.linkedin.com/company/allied-plumbing-bc/"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-9 w-9 place-items-center rounded-full bg-white shadow-sm ring-1 ring-black/5 hover:shadow-md"
            >
              <FaInstagram className="text-neutral-700 text-sm" />
            </a>
            <a
              aria-label="Twitter"
              href="https://www.linkedin.com/company/allied-plumbing-bc/"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-9 w-9 place-items-center rounded-full bg-white shadow-sm ring-1 ring-black/5 hover:shadow-md"
            >
              <FaTwitter className="text-neutral-700 text-sm" />
            </a>
          </div>
        </div>

        {/* разделитель */}
        <hr className="my-4 border-neutral-200" />

        {/* копирайт */}
        <p className="text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} Allied Plumbing. All rights reserved.
        </p>
      </div>
    </footer>
  );
}