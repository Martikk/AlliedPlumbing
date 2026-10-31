import { Link } from 'react-router-dom';

export default function Privacy() {
  return <section className="mx-auto max-w-3xl px-4 md:px-6 py-12 text-neutral-800 leading-relaxed">
    <h1 className="text-4xl font-extrabold text-neutral-900">Website Privacy Notice</h1>
    <p className="mt-6">When you use our contact or quote form, you provide the name, email address, phone number and message you enter. A quote request may also include your service needs, site address and files you choose to attach. These details are submitted to help Allied Plumbing respond to your enquiry.</p>
    <h2 className="mt-8 mb-3 text-2xl font-bold">Form processing</h2>
    <p>Contact and quote submissions are processed through Formspree. Review <a className="underline" href="https://formspree.io/legal/privacy-policy/" target="_blank" rel="noreferrer">Formspree’s privacy policy</a> for information about that service. Avoid including payment details, passwords or other sensitive information in your message or attachments.</p>
    <h2 className="mt-8 mb-3 text-2xl font-bold">Website services</h2>
    <p>Images and media may load from Cloudinary and Unsplash. Some pages embed Google Maps. Loading these resources sends a request from your browser to the relevant provider.</p>
    <h2 className="mt-8 mb-3 text-2xl font-bold">Questions about your information</h2>
    <p>For questions about a submission, or to ask about access, correction or deletion, contact Allied Plumbing at <a href="mailto:info@allied-plumbing.ca" className="underline">info@allied-plumbing.ca</a> or <a href="tel:+16047311000" className="underline">604-731-1000</a>.</p>
    <Link to="/contact" className="inline-block mt-8 font-semibold text-red-800 underline">Contact Allied Plumbing</Link>
  </section>;
}
