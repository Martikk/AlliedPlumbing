import { useEffect, useRef, useState } from 'react';
import config from '../lib/enquiry-config.json';
import { trackEvent } from '../lib/analytics';
import { PHONE, PHONE_HREF, RESPONSE_PROMISE } from '../config';

export const APPS_SCRIPT_URL = /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(
  config.appsScriptUrl,
)
  ? config.appsScriptUrl
  : '';

type Type = 'contact' | 'quote' | 'careers';

/** Careers only.
 *
 *  Contact and Quote moved to the native EnquiryForm (H-01). Careers keeps
 *  the Apps Script HTML Service because it owns the résumé upload flow, which
 *  the audit does not ask to replace.
 *
 *  B-06 §2 — the iframe mounts only once its container is within 600 px of
 *  the viewport, so no third-party frame competes with the LCP image. */
export default function EmbeddedEnquiry({ type, role = '' }: { type: Type; role?: string }) {
  const container = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [token, setToken] = useState('');
  const [height, setHeight] = useState(type === 'quote' ? 1500 : type === 'careers' ? 1200 : 950);
  const [loaded, setLoaded] = useState(false);
  const events = useRef(new Set<string>());

  useEffect(() => {
    const node = container.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setNear(true);
        observer.disconnect();
      },
      { rootMargin: '600px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (near && !token) setToken(crypto.randomUUID());
  }, [near, token]);

  useEffect(() => {
    if (!token) return;
    function receive(event: MessageEvent) {
      // Apps Script HTML Service renders in a nested Google-owned sandbox frame.
      if (!/^https:\/\/(?:[a-z0-9-]+-)?script\.googleusercontent\.com$/.test(event.origin)) return;
      const data = event.data;
      if (!data || data.source !== 'allied-enquiry' || data.token !== token || data.type !== type)
        return;
      if (Number.isFinite(data.height)) setHeight(Math.max(300, Math.min(2400, data.height)));
      const name =
        data.event === 'success'
          ? 'generate_lead'
          : data.event === 'start'
            ? 'form_start'
            : ['error', 'stored'].includes(data.event)
              ? 'form_error'
              : null;
      if (name && (name === 'form_error' || !events.current.has(name))) {
        events.current.add(name);
        trackEvent(name, {
          form_name: type,
          ...(name === 'form_error' ? { error_type: 'network_or_server' as const } : {}),
        });
        if (name === 'generate_lead')
          trackEvent(type === 'careers' ? 'careers_success' : 'enquiry_success', {
            form_name: type,
          });
      }
    }
    window.addEventListener('message', receive);
    return () => window.removeEventListener('message', receive);
  }, [token, type]);

  const query = new URLSearchParams({ type, token, ...(role ? { role } : {}) });
  const email = type === 'contact' ? 'info@allied-plumbing.ca' : `${type}@allied-plumbing.ca`;

  return (
    <div
      ref={container}
      data-cta-anchor
      className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)]"
      style={{ minHeight: near ? undefined : 420 }}
    >
      {!loaded && (
        <p role="status" className="p-4 text-sm text-[var(--muted)]">
          {near ? 'Loading secure application form…' : 'The application form loads as you reach it.'}
        </p>
      )}
      {token && (
        <iframe
          title={
            type === 'careers'
              ? 'Careers application with private file processing'
              : type === 'quote'
                ? 'Quote request with private file processing'
                : 'Contact enquiry with private file processing'
          }
          src={`${APPS_SCRIPT_URL}?${query}`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          style={{ height }}
          className="w-full border-0"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      )}
      <p className="p-4 text-sm leading-[var(--lh-body)] text-[var(--body)]">
        {RESPONSE_PROMISE} If the form cannot load,{' '}
        <a
          className="underline underline-offset-2"
          href={`${APPS_SCRIPT_URL}?type=${type}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          open it in a new tab
        </a>
        , email{' '}
        <a className="underline underline-offset-2" href={`mailto:${email}`} data-cta-location="page">
          {email}
        </a>{' '}
        or call{' '}
        <a className="underline underline-offset-2" href={PHONE_HREF} data-cta-location="page">
          {PHONE}
        </a>
        .
      </p>
    </div>
  );
}
