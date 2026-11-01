import EmbeddedEnquiry, { APPS_SCRIPT_URL } from './EmbeddedEnquiry';
import { useFeedbackMotion } from '../hooks/useFeedbackMotion';
import { FORMSPREE_ENDPOINT } from '../config';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { useFormDraft } from '../hooks/useFormDraft';
import { trackEvent } from '../lib/analytics';
import { sendEnquiry } from '../lib/forms';

export default function CareerApplication() {
  const { search: rawSearch, hash: rawHash } = useLocation();
  const [hydrated,setHydrated]=useState(false);
  useEffect(()=>setHydrated(true),[]);
  const search=hydrated?rawSearch:'';
  const hash=hydrated?rawHash:'';
  const role = new URLSearchParams(search).get('job') ?? new URLSearchParams(hash.split('?')[1] ?? '').get('job') ?? '';
  const section = useRef<HTMLElement>(null);
  const name = useRef<HTMLInputElement>(null);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  useFeedbackMotion(resultRef, status || error);
  const inFlight = useRef(false);
  const clearDraft = useFormDraft('careers', formRef, undefined, role ? { role } : undefined);
  useEffect(() => {
    if (!hash.startsWith('#apply')) return;
    const frame = requestAnimationFrame(() => {
      section.current?.scrollIntoView({ block: 'start', behavior: 'instant' });
      name.current?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [hash, search]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    inFlight.current = true;
    const form = event.currentTarget;
    setSending(true); setError(''); setStatus('');
    const data = new FormData(form);
    data.set('_subject', 'Allied Plumbing — Careers enquiry');
    data.set('source', 'Careers');
    try {
      await sendEnquiry(data);
      setStatus('Your application details have been received. If you have not included a resume link, email your PDF resume separately with your name and role.');
      clearDraft(); form.reset();
      trackEvent('generate_lead', { form_name: 'careers' });
    } catch (reason) {
      trackEvent('form_error', { form_name: 'careers', error_type: 'network_or_server' });
      setError(reason instanceof Error ? reason.message : 'Your application could not be sent. Please try again.');
    } finally { inFlight.current = false; setSending(false); requestAnimationFrame(() => resultRef.current?.focus()); }
  }
  return <section ref={section} id="apply" className="max-w-6xl mx-auto px-4 md:px-6 pb-16 md:pb-24 scroll-mt-6">
    <div className="rounded-2xl bg-neutral-900 text-white p-6 md:p-10">
      <div className="mb-8 max-w-2xl"><h2 className="text-2xl font-bold">What happens after you apply?</h2><p className="mt-3 text-white/85 leading-relaxed">Share your experience, qualifications, availability and the kind of work you’re interested in. Your application details are sent for review. If there is a suitable opportunity, the hiring team can contact you to discuss the role and next steps.</p></div>
      <h2 className="text-2xl md:text-4xl font-extrabold">Introduce yourself</h2>
      <p className="mt-3 max-w-2xl text-white/85 leading-relaxed">Tell us about your trade, experience and the role you’re interested in. No cover letter needed. Include a link to your resume, or email your PDF separately.</p>
      {APPS_SCRIPT_URL ? <EmbeddedEnquiry type="careers" role={role} /> : <form method="post" action={FORMSPREE_ENDPOINT} ref={formRef} aria-busy={sending} onSubmit={submit} aria-label="Careers application" className="mt-7 grid md:grid-cols-2 gap-5">
        <label>Full name<input ref={name} name="name" autoComplete="name" required maxLength={150} className="input mt-2 !bg-white !text-neutral-900" /></label>
        <label>Email<input name="email" type="email" autoComplete="email" required maxLength={254} className="input mt-2 !bg-white !text-neutral-900" /></label>
        <label>Phone (optional)<input name="phone" type="tel" autoComplete="tel" maxLength={40} className="input mt-2 !bg-white !text-neutral-900" /></label>
        <label>Role (optional)<input key={role} name="role" defaultValue={role} maxLength={160} className="input mt-2 !bg-white !text-neutral-900" /></label>
        <label className="md:col-span-2">Resume link (optional)<input name="resume_url" type="url" placeholder="https://…" aria-describedby="resume-help" maxLength={2000} className="input mt-2 !bg-white !text-neutral-900" /><span id="resume-help" className="block mt-2 text-sm text-white/80">Use a document link the hiring team can open. To send a PDF attachment, <a className="underline underline-offset-4" href={`mailto:careers@allied-plumbing.ca?subject=${encodeURIComponent('Career application'+(role?' — '+role:''))}`}>email your resume</a>. File upload is not available in this form.</span></label>
        <label className="md:col-span-2">Experience and availability<textarea name="message" required maxLength={5000} rows={4} className="input mt-2 !bg-white !text-neutral-900" /></label>
        <label className="md:col-span-2 flex items-start gap-3 text-sm leading-relaxed"><input type="checkbox" name="consent" value="yes" required className="mt-1 h-5 w-5 shrink-0" /><span>I agree to be contacted about this application. See our <a href="/privacy/" target="_blank" rel="noopener noreferrer" className="underline">privacy notice (opens in a new tab)</a>.</span></label>
        <div className="md:col-span-2"><button type="submit" disabled={sending} className="rounded-lg bg-white px-5 py-3 font-semibold text-neutral-900 disabled:opacity-60">{sending ? 'Sending…' : 'Submit application'}</button><div ref={resultRef} tabIndex={-1} role="status" className="mt-4 text-white leading-relaxed"><p>{status}</p>{error && <p role="alert" className="mt-3 rounded-lg bg-white p-4 text-red-800">{error}</p>}</div><p className="mt-3 text-sm text-white/80">You can also send your application and resume to <a href="mailto:careers@allied-plumbing.ca" className="underline">careers@allied-plumbing.ca</a>.</p></div>
      </form>}
    </div>
  </section>;
}
