import EnquiryForm from './EnquiryForm';

/** The homepage contact band, in its original photographic layout.
 *
 *  Only the form inside it changed: the cross-origin Apps Script iframe is
 *  replaced by the native EnquiryForm (audit H-01), so validation, errors and
 *  the `generate_lead` event happen in the page. The surrounding design —
 *  the angled photo panel, the glass card — is unchanged. */
export default function ContactLead() {
  return (
    <section className="contact-photo-section py-12 md:py-20">
      <div className="contact-photo-layout mx-auto max-w-6xl grid md:grid-cols-2 gap-8 p-6 md:p-10">
        <div className="contact-photo-copy text-white">
          <h2 className="text-3xl md:text-4xl font-extrabold">Tell us how we can help</h2>
          <p className="mt-4 max-w-md leading-relaxed">
            Send your plumbing, heating or HVAC enquiry. For urgent assistance, call our team.
          </p>
          <a
            href="tel:+16047311000"
            data-cta-location="page"
            className="inline-block mt-6 text-xl font-bold underline underline-offset-4"
          >
            604-731-1000
          </a>
        </div>
        <EnquiryForm
          defaultType="other"
          title="Send an enquiry"
          className="contact-glass-form border-0"
        />
      </div>
    </section>
  );
}
