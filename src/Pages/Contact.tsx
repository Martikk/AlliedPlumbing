import { useState } from 'react';
import { FORMSPREE_ENDPOINT } from '../config';

const PHONE = '604-731-1000';
const EMAIL_INFO = 'info@allied-plumbing.ca';
const EMAIL_QUOTE = 'quote@allied-plumbing.ca';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSending(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    // honeypot
    if (data.get('_gotcha')) {
      setSubmitted(true);
      setSending(false);
      return;
    }

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setSubmitted(true);
        form.reset();
      } else {
        const json = await res.json().catch(() => ({}));
        setError(json?.error || 'Submission failed. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="prose max-w-none">
      <h1>Contact Allied</h1>
      <p><strong>Emergency (24/7):</strong> <a href={`tel:${PHONE}`}>{PHONE}</a> — after-hours calls only</p>
      <p><strong>General:</strong> <a href={`mailto:${EMAIL_INFO}`}>{EMAIL_INFO}</a> · <strong>Quotes:</strong> <a href={`mailto:${EMAIL_QUOTE}`}>{EMAIL_QUOTE}</a></p>
      <p><strong>Address:</strong> 4085 2nd Ave, Burnaby, BC V5C 3X1</p>

      <div className="mt-6 not-prose">
        {submitted ? (
          <div className="p-4 border rounded-xl bg-green-50">
            Thanks — we’ll get back to you during business hours.
          </div>
        ) : (
          <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4" noValidate>
            <input className="border p-3 rounded-lg" name="name" placeholder="Name" required />
            <input className="border p-3 rounded-lg" name="phone" placeholder="Phone" required />
            <input className="border p-3 rounded-lg md:col-span-2" name="email" type="email" placeholder="Email" required />
            <input className="border p-3 rounded-lg md:col-span-2" name="address" placeholder="Address / Site Location" />

            {/* honeypot */}
            <input type="text" name="_gotcha" className="hidden" aria-hidden="true" tabIndex={-1} autoComplete="off" />

            <select className="border p-3 rounded-lg" name="service" defaultValue="Plumbing">
              <option>Plumbing</option>
              <option>Heating / Boilers</option>
              <option>Air Conditioning / HVAC</option>
              <option>PM Contract</option>
              <option>Other</option>
            </select>
            <select className="border p-3 rounded-lg" name="urgency" defaultValue="Routine">
              <option>Routine</option>
              <option>Same Day</option>
              <option>Emergency</option>
            </select>
            <textarea className="border p-3 rounded-lg md:col-span-2" rows={5} name="message" placeholder="Message"></textarea>

            <input type="hidden" name="_subject" value="New request from allied-plumbing.ca" />

            <button className="px-4 py-3 rounded-xl bg-red-600 text-white md:col-span-2 disabled:opacity-60" type="submit" disabled={sending}>
              {sending ? 'Sending…' : 'Send'}
            </button>

            {error && <div className="md:col-span-2 text-red-600 text-sm">{error}</div>}
          </form>
        )}
      </div>

      <div className="mt-6">
        <iframe
          title="Map"
          className="w-full h-64 border rounded-xl"
          src="https://www.google.com/maps?q=4085%202nd%20Ave%2C%20Burnaby%2C%20BC%20V5C%203X1&output=embed"
        />
      </div>
    </section>
  );
}