import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { sendEnquiry } from '../lib/forms';

export default function CareerApplication() {
  const { search, hash } = useLocation();
  const role = new URLSearchParams(search).get('job') ?? new URLSearchParams(hash.split('?')[1] ?? '').get('job') ?? '';
  const section = useRef<HTMLElement>(null);
  const name = useRef<HTMLInputElement>(null);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
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
    if (sending) return;
    const form = event.currentTarget;
    setSending(true); setError(''); setStatus('');
    const data = new FormData(form);
    data.set('_subject', 'Allied Plumbing — Careers enquiry');
    data.set('source', 'Careers');
    try {
      await sendEnquiry(data);
      setStatus('Your application details have been received. If you have not included a resume link, email your PDF resume separately with your name and role.');
      form.reset();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Your application could not be sent. Please try again.');
    } finally { setSending(false); }
  }
  return <section ref={section} id="apply" className="max-w-6xl mx-auto px-4 md:px-6 pb-16 md:pb-24 scroll-mt-6">
    <div className="rounded-2xl bg-neutral-900 text-white p-6 md:p-10">
      <h2 className="text-2xl md:text-4xl font-extrabold">Introduce yourself</h2>
      <p className="mt-3 max-w-2xl text-white/85 leading-relaxed">Tell us about your trade, experience and the role you’re interested in. No cover letter needed. Include a link to your resume, or email your PDF separately.</p>
      <form onSubmit={submit} aria-label="Careers application" className="mt-7 grid md:grid-cols-2 gap-5">
        <label>Full name<input ref={name} name="name" autoComplete="name" required maxLength={150} className="input mt-2 !bg-white !text-neutral-900" /></label>
        <label>Email<input name="email" type="email" autoComplete="email" required maxLength={254} className="input mt-2 !bg-white !text-neutral-900" /></label>
        <label>Phone (optional)<input name="phone" type="tel" autoComplete="tel" maxLength={40} className="input mt-2 !bg-white !text-neutral-900" /></label>
        <label>Role (optional)<input key={role} name="role" defaultValue={role} maxLength={160} className="input mt-2 !bg-white !text-neutral-900" /></label>
        <label className="md:col-span-2">Resume link (optional)<input name="resume_url" type="url" placeholder="https://…" aria-describedby="resume-help" maxLength={2000} className="input mt-2 !bg-white !text-neutral-900" /><span id="resume-help" className="block mt-2 text-sm text-white/80">Use a document link the hiring team can open. To send a PDF attachment, <a className="underline underline-offset-4" href={`mailto:careers@allied-plumbing.ca?subject=${encodeURIComponent('Career application'+(role?' — '+role:''))}`}>email your resume</a>. File upload is not available in this form.</span></label>
        <label className="md:col-span-2">Experience and availability<textarea name="message" required maxLength={5000} rows={4} className="input mt-2 !bg-white !text-neutral-900" /></label>
        <label className="md:col-span-2 flex items-start gap-3 text-sm leading-relaxed"><input type="checkbox" name="consent" value="yes" required className="mt-1 h-5 w-5 shrink-0" /><span>I agree to be contacted about this application. See our <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline">privacy notice (opens in a new tab)</a>.</span></label>
        <div className="md:col-span-2"><button type="submit" disabled={sending} className="rounded-lg bg-white px-5 py-3 font-semibold text-neutral-900 disabled:opacity-60">{sending ? 'Sending…' : 'Submit application'}</button><p role="status" className="mt-4 text-white leading-relaxed">{status}</p>{error && <p role="alert" className="mt-3 rounded-lg bg-white p-4 text-red-800">{error}</p>}<p className="mt-3 text-sm text-white/80">You can also send your application and resume to <a href="mailto:careers@allied-plumbing.ca" className="underline">careers@allied-plumbing.ca</a>.</p></div>
      </form>
    </div>
  </section>;
}
