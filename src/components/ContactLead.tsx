import EmbeddedEnquiry, { APPS_SCRIPT_URL } from './EmbeddedEnquiry';
import { useFeedbackMotion } from '../hooks/useFeedbackMotion';
import { FORMSPREE_ENDPOINT } from '../config';
import { useRef, useState } from 'react';
import { Link } from '../lib/navigation';
import { sendEnquiry } from '../lib/forms';
import { useFormDraft } from '../hooks/useFormDraft';
import { trackEvent } from '../lib/analytics';

export default function ContactLead() {
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState(false);
  const [error, setError] = useState('');
  const started = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  useFeedbackMotion(resultRef, ok ? 'success' : error);
  const inFlight = useRef(false);
  const clearDraft = useFormDraft('contact', formRef);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    inFlight.current = true;
    const form = event.currentTarget;
    setError(''); setSending(true);
    const data = new FormData(form);
    data.set('_subject', 'Allied Plumbing — Contact enquiry');
    try {
      await sendEnquiry(data);
      trackEvent('generate_lead', { form_name: 'contact' });
      clearDraft(); form.reset(); setOk(true);
    } catch (failure) {
      setError(failure instanceof Error && failure.name !== 'TimeoutError' ? failure.message : 'Your message could not be sent. Check your connection and try again, or call 604-731-1000.');
      trackEvent('form_error', { form_name: 'contact', error_type: 'network_or_server' });
    } finally { inFlight.current = false; setSending(false); requestAnimationFrame(() => resultRef.current?.focus()); }
  }
  return <section className="contact-photo-section py-12 md:py-20">
    <div className="contact-photo-layout mx-auto max-w-6xl grid md:grid-cols-2 gap-8 p-6 md:p-10">
      <div className="contact-photo-copy text-white">
        <h2 className="text-3xl md:text-4xl font-extrabold">Tell us how we can help</h2>
        <p className="mt-4 max-w-md leading-relaxed">Send your plumbing, heating or HVAC enquiry. For urgent assistance, call our team.</p>
        <a href="tel:+16047311000" className="inline-block mt-6 text-xl font-bold underline underline-offset-4">604-731-1000</a>
      </div>
      {APPS_SCRIPT_URL ? <EmbeddedEnquiry type="contact" /> : <form method="post" action={FORMSPREE_ENDPOINT} ref={formRef} onSubmit={submit} aria-busy={sending} onFocusCapture={() => {
        if (!started.current) { trackEvent('form_start', { form_name: 'contact' }); started.current = true; }
      }} className="contact-glass-form rounded-2xl p-5 md:p-6 text-neutral-900">
        <div ref={resultRef} tabIndex={-1} role="status" aria-live="polite">{ok && <p className="rounded-lg bg-green-50 p-4 text-green-900">Thank you. Your message has been received.</p>}{error && <p role="alert" className="mt-3 text-sm text-red-800">{error}</p>}</div>
        {!ok && <>
          <fieldset disabled={sending} className="space-y-4">
            <label className="block"><span className="block mb-1 font-medium">Name</span><input className="input" name="name" autoComplete="name" maxLength={120} required /></label>
            <label className="block"><span className="block mb-1 font-medium">Email</span><input className="input" name="email" type="email" autoComplete="email" spellCheck={false} maxLength={254} required /></label>
            <label className="block"><span className="block mb-1 font-medium">Phone (optional)</span><input className="input" name="phone" type="tel" autoComplete="tel" maxLength={40} /></label>
            <label className="block"><span className="block mb-1 font-medium">Message</span><textarea className="input" name="message" rows={4} maxLength={5000} required /></label>
            <label className="flex items-start gap-3 text-sm leading-relaxed"><input type="checkbox" name="consent" value="yes" required className="mt-1 h-4 w-4 accent-red-700" /><span>I agree to be contacted about this enquiry. See the <Link to="/privacy" target="_blank" className="underline underline-offset-2">privacy notice (opens in a new tab)</Link>.</span></label>
          </fieldset>
          <button type="submit" disabled={sending} className="mt-4 min-h-12 rounded-lg bg-[#3866c3] px-5 py-3 font-semibold text-white hover:bg-[#2d54a5] disabled:opacity-60">{sending ? 'Sending…' : 'Send message'}</button>
        </>}
      </form>}
    </div>
  </section>;
}
