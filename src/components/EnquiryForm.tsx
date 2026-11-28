import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Link } from '../lib/navigation';
import Button from './ui/Button';
import { EMAIL_QUOTE, PHONE, PHONE_HREF, RESPONSE_PROMISE } from '../config';
import { SERVICE_LINKS, type ServiceKey } from '../lib/site-links';
import { trackEvent } from '../lib/analytics';
import { mountTurnstile, turnstileConfigured, type TurnstileHandle } from '../lib/turnstile';
import { ACCEPT_ATTR, EMPTY, ENQUIRY_TYPES, FIELD_ORDER, MAX_FILES, PROPERTY_TYPES, URGENCY, mailtoFor, shows, submitEnquiry, thanksPathFor, type EnquiryType, type EnquiryValues, type Errors, validate } from '../lib/enquiry';

/** Audit H-01 / H-05 / F-08 — the one enquiry form.
 *
 * Replaces the cross-origin Apps Script iframe. Native means: real labels,
 * `autocomplete`, inline errors with `aria-describedby` and `aria-invalid`,
 * an error summary that takes focus on a blocked submit, a measurable
 * `generate_lead`, and CTAs that can prefill it through `?type=` and
 * `?service=`.
 *
 * Spam: a hidden honeypot plus a minimum fill time, both re-checked server
 * side. The audit also asks for Cloudflare Turnstile; that needs a Cloudflare
 * account and a site key (Ops), so it is not wired up — see
 * docs/audit/open-items.md. */

type Props = {
  /** Default enquiry type when no ?type= is present. */
  defaultType?: EnquiryType;
  /** Rendered as the form's accessible name. */
  title?: string;
  /** Keeps the accessible name but hides the heading, for a page that
   *  already has one directly above the form. */
  titleHidden?: boolean;
  /** Draws the form's own card — border, background and padding. Set false
   *  when the form already sits inside a card: a Tailwind `p-0` in
   *  `className` does NOT win against the `p-5` here (utility order, not
   *  attribute order, decides), and the doubled padding costs 40 px of a
   *  320 px screen. */
  chrome?: boolean;
  className?: string;
};

const MIN_FILL_MS = 3000;

function Field({
  id,
  label,
  error,
  hint,
  required,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-semibold text-[var(--ink)]">
        {label}
        {required ? (
          <span className="text-[var(--brand-ink)]"> *</span>
        ) : (
          <span className="font-normal text-[var(--muted)]"> (optional)</span>
        )}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-sm text-[var(--muted)]">
          {hint}
        </p>
      )}
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm font-semibold text-[var(--brand-ink)]">
          {error}
        </p>
      )}
    </div>
  );
}

export default function EnquiryForm({
  defaultType = 'quote',
  title = 'Send an enquiry',
  titleHidden = false,
  chrome = true,
  className = '',
}: Props) {
  const uid = useId();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [values, setValues] = useState<EnquiryValues>({ ...EMPTY, enquiryType: defaultType });
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [escapeHatch, setEscapeHatch] = useState<string | null>(null);
  const summary = useRef<HTMLDivElement>(null);
  const startedAt = useRef(Date.now());
  const requestId = useRef('');
  const honeypot = useRef('');
  const tracked = useRef(false);
  const inFlight = useRef(false);
  const turnstileBox = useRef<HTMLDivElement>(null);
  const turnstile = useRef<TurnstileHandle | null>(null);

  useEffect(() => {
    requestId.current = crypto.randomUUID();
    startedAt.current = Date.now();
  }, []);

  // H-05 — contextual CTAs prefill the form through the query string.
  useEffect(() => {
    const type = params.get('type');
    const service = params.get('service');
    setValues(current => ({
      ...current,
      ...(ENQUIRY_TYPES.some(t => t.value === type) ? { enquiryType: type as EnquiryType } : {}),
      ...(SERVICE_LINKS.some(s => s.key === service) ? { service: service as ServiceKey } : {}),
    }));
  }, [params]);

  const id = (name: string) => `${uid}-${name}`;

  function set<K extends keyof EnquiryValues>(key: K, value: EnquiryValues[K]) {
    setValues(current => ({ ...current, [key]: value }));
    // Clear a field's error as soon as the visitor edits it.
    setErrors(current => (current[key] ? { ...current, [key]: undefined } : current));
  }

  function onFirstFocus() {
    if (tracked.current) return;
    tracked.current = true;
    trackEvent('form_start', { enquiry_type: values.enquiryType });
    if (turnstileConfigured() && turnstileBox.current && !turnstile.current) {
      void mountTurnstile(turnstileBox.current).then(handle => {
        turnstile.current = handle;
      });
    }
  }

  useEffect(() => () => turnstile.current?.destroy(), []);

  const describedBy = (name: keyof EnquiryValues | 'files', hint = false) =>
    [errors[name] ? `${id(name)}-error` : '', hint ? `${id(name)}-hint` : '']
      .filter(Boolean)
      .join(' ') || undefined;

  const visibleErrors = useMemo(
    () => FIELD_ORDER.filter(name => errors[name]).map(name => ({ name, message: errors[name]! })),
    [errors],
  );

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;

    const found = validate(values, files);
    if (Date.now() - startedAt.current < MIN_FILL_MS)
      found.form = 'Please take a moment to review your details, then submit again.';

    if (Object.values(found).some(Boolean)) {
      setErrors(found);
      trackEvent('form_error', {
        error_type: 'validation',
        field: FIELD_ORDER.find(name => found[name]) ?? 'form',
        enquiry_type: values.enquiryType,
      });
      requestAnimationFrame(() => summary.current?.focus());
      return;
    }

    inFlight.current = true;
    setErrors({});
    setSending(true);
    try {
      // A null token (not configured, blocked, or Cloudflare unreachable)
      // must not block the submit — the server decides what to do with it.
      const turnstileToken = (await turnstile.current?.token()) ?? null;
      const result = await submitEnquiry(values, files, {
        requestId: requestId.current,
        startedAt: startedAt.current,
        honeypot: honeypot.current,
        turnstileToken,
      });
      trackEvent('generate_lead', {
        enquiry_type: values.enquiryType,
        service: values.service || undefined,
        property_type: values.propertyType || undefined,
      });
      setSubmitted(true);
      navigate(`${thanksPathFor(values.enquiryType)}/?ref=${encodeURIComponent(result.reference)}`);
    } catch (failure) {
      const message =
        failure instanceof Error
          ? failure.message
          : 'Your enquiry could not be sent. Please try again.';
      setErrors({ form: message });
      // Offered on EVERY failure, not just a recognised backend one.
      // Verified against the real broken deployment: Apps Script serves its
      // "Script function not found" page WITHOUT CORS headers, so the browser
      // cannot read the response at all and the failure arrives as a network
      // error. The one case this was built for was the one case it missed.
      // It also helps when the visitor really is offline — the mail sits in
      // their outbox and sends when they reconnect.
      setEscapeHatch(mailtoFor(values, files, EMAIL_QUOTE));
      trackEvent('form_error', { error_type: 'network_or_server', enquiry_type: values.enquiryType });
      requestAnimationFrame(() => summary.current?.focus());
    } finally {
      inFlight.current = false;
      setSending(false);
    }
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      onFocusCapture={onFirstFocus}
      aria-busy={sending}
      aria-labelledby={id('title')}
      data-cta-anchor
      className={`${
        chrome
          ? 'rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface)] p-5 md:p-7'
          : ''
      } ${className}`}
    >
      <h2
        id={id('title')}
        className={titleHidden ? 'sr-only' : 'text-h3 font-bold text-[var(--ink)]'}
      >
        {title}
      </h2>
      <p className={`text-sm text-[var(--body)] ${titleHidden ? '' : 'mt-2'}`}>
        {RESPONSE_PROMISE}
      </p>

      {/* Error summary — takes focus when a submit is blocked (F-08). */}
      <div ref={summary} tabIndex={-1} role="alert" aria-live="assertive">
        {(visibleErrors.length > 0 || errors.form) && (
          <div className="mt-5 rounded-[var(--radius)] border-2 border-[var(--brand-ink)] bg-red-50 p-4">
            <h3 className="font-bold text-[var(--brand-ink)]">
              {errors.form ? 'Your enquiry was not sent' : 'Check these fields'}
            </h3>
            {errors.form && <p className="mt-2 text-sm text-[var(--ink)]">{errors.form}</p>}
            {visibleErrors.length > 0 && (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                {visibleErrors.map(item => (
                  <li key={item.name}>
                    <a href={`#${id(item.name)}`} className="underline underline-offset-2">
                      {item.message}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {errors.form && (
              <>
                <p className="mt-3 text-sm">
                  Your details are still here. You can try again, send them by email, or call{' '}
                  <a
                    href={PHONE_HREF}
                    data-cta-location="page"
                    className="font-semibold underline underline-offset-2"
                  >
                    {PHONE}
                  </a>
                  .
                </p>
                {escapeHatch && (
                  <a
                    href={escapeHatch}
                    data-tracked="true"
                    onClick={() => trackEvent('click_email', { location: 'page' })}
                    className="mt-3 inline-flex min-h-12 items-center rounded-[var(--radius)] bg-[var(--brand)] px-5 font-semibold text-white hover:bg-[var(--brand-hover)]"
                  >
                    Send this enquiry by email
                  </a>
                )}
              </>
            )}
          </div>
        )}
      </div>

      <fieldset disabled={sending || submitted} className="mt-6 space-y-6">
        {/* Enquiry type — radio cards. */}
        <fieldset>
          <legend className="font-semibold text-[var(--ink)]">
            What do you need? <span className="text-[var(--brand-ink)]">*</span>
          </legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {ENQUIRY_TYPES.map(option => (
              <label
                key={option.value}
                className={`flex min-h-12 cursor-pointer items-start gap-3 rounded-[var(--radius)] border p-3 text-sm ${
                  values.enquiryType === option.value
                    ? 'border-[var(--brand)] bg-red-50 ring-1 ring-[var(--brand)]'
                    : 'border-[var(--line)] hover:border-[var(--ink)]'
                }`}
              >
                <input
                  type="radio"
                  name="enquiryType"
                  value={option.value}
                  checked={values.enquiryType === option.value}
                  onChange={() => set('enquiryType', option.value)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--brand)]"
                />
                <span>
                  <span className="block font-semibold text-[var(--ink)]">{option.label}</span>
                  <span className="block text-[var(--muted)]">{option.hint}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field id={id('name')} label="Name" required error={errors.name}>
            <input
              id={id('name')}
              className="input"
              name="name"
              autoComplete="name"
              maxLength={120}
              value={values.name}
              onChange={event => set('name', event.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={describedBy('name')}
            />
          </Field>

          <Field id={id('email')} label="Email" required error={errors.email}>
            <input
              id={id('email')}
              className="input"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              spellCheck={false}
              maxLength={254}
              value={values.email}
              onChange={event => set('email', event.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={describedBy('email')}
            />
          </Field>

          <Field
            id={id('phone')}
            label="Phone"
            required={values.enquiryType === 'service'}
            error={errors.phone}
          >
            <input
              id={id('phone')}
              className="input"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={40}
              value={values.phone}
              onChange={event => set('phone', event.target.value)}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={describedBy('phone')}
            />
          </Field>

          <Field id={id('propertyType')} label="Property type" required error={errors.propertyType}>
            <select
              id={id('propertyType')}
              className="input"
              name="propertyType"
              value={values.propertyType}
              onChange={event => set('propertyType', event.target.value as EnquiryValues['propertyType'])}
              aria-invalid={Boolean(errors.propertyType)}
              aria-describedby={describedBy('propertyType')}
            >
              <option value="">Choose one…</option>
              {PROPERTY_TYPES.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>

          {shows.organisation(values) && (
            <Field
              id={id('organisation')}
              label="Organisation"
              error={errors.organisation}
              hint="School district, strata, management company or general contractor."
            >
              <input
                id={id('organisation')}
                className="input"
                name="organisation"
                autoComplete="organization"
                maxLength={160}
                value={values.organisation}
                onChange={event => set('organisation', event.target.value)}
                aria-describedby={describedBy('organisation', true)}
              />
            </Field>
          )}

          {shows.service(values) && (
            <Field id={id('service')} label="Service" required error={errors.service}>
              <select
                id={id('service')}
                className="input"
                name="service"
                value={values.service}
                onChange={event => set('service', event.target.value as ServiceKey)}
                aria-invalid={Boolean(errors.service)}
                aria-describedby={describedBy('service')}
              >
                <option value="">Choose one…</option>
                {SERVICE_LINKS.map(service => (
                  <option key={service.key} value={service.key}>
                    {service.label}
                  </option>
                ))}
              </select>
            </Field>
          )}

          {shows.tenderClosing(values) && (
            <Field
              id={id('tenderClosing')}
              label="Tender closing date"
              required
              error={errors.tenderClosing}
            >
              <input
                id={id('tenderClosing')}
                className="input"
                name="tenderClosing"
                type="date"
                value={values.tenderClosing}
                onChange={event => set('tenderClosing', event.target.value)}
                aria-invalid={Boolean(errors.tenderClosing)}
                aria-describedby={describedBy('tenderClosing')}
              />
            </Field>
          )}
        </div>

        {shows.address(values) && (
          <Field id={id('address')} label="Site address" required error={errors.address}>
            <input
              id={id('address')}
              className="input"
              name="address"
              autoComplete="street-address"
              maxLength={254}
              value={values.address}
              onChange={event => set('address', event.target.value)}
              aria-invalid={Boolean(errors.address)}
              aria-describedby={describedBy('address')}
            />
          </Field>
        )}

        {shows.urgency(values) && (
          <fieldset>
            <legend className="font-semibold text-[var(--ink)]">
              How urgent is it? <span className="text-[var(--brand-ink)]">*</span>
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {URGENCY.map(option => (
                <label
                  key={option.value}
                  className={`flex min-h-12 cursor-pointer items-center gap-2 rounded-[var(--radius)] border px-4 text-sm font-semibold ${
                    values.urgency === option.value
                      ? 'border-[var(--brand)] bg-red-50 ring-1 ring-[var(--brand)]'
                      : 'border-[var(--line)] hover:border-[var(--ink)]'
                  }`}
                >
                  <input
                    type="radio"
                    name="urgency"
                    value={option.value}
                    checked={values.urgency === option.value}
                    onChange={() => set('urgency', option.value)}
                    className="h-4 w-4 accent-[var(--brand)]"
                    aria-invalid={Boolean(errors.urgency)}
                    aria-describedby={describedBy('urgency')}
                  />
                  {option.label}
                </label>
              ))}
            </div>
            {errors.urgency && (
              <p id={`${id('urgency')}-error`} className="mt-2 text-sm font-semibold text-[var(--brand-ink)]">
                {errors.urgency}
              </p>
            )}
          </fieldset>
        )}

        {shows.files(values) && (
          <Field
            id={id('files')}
            label="Drawings, specifications or photos"
            error={errors.files}
            hint={`Up to ${MAX_FILES} files, 10 MB in total. PDF, JPG or PNG.`}
          >
            <input
              id={id('files')}
              className="input"
              name="files"
              type="file"
              multiple
              accept={ACCEPT_ATTR}
              onChange={event => {
                const next = Array.from(event.target.files ?? []);
                setFiles(next);
                setErrors(current => ({ ...current, files: undefined }));
                if (next.length) trackEvent('file_upload', { count: next.length });
              }}
              aria-invalid={Boolean(errors.files)}
              aria-describedby={describedBy('files', true)}
            />
          </Field>
        )}

        <Field
          id={id('message')}
          label="What do you need?"
          required
          error={errors.message}
          hint="Equipment and location, access and shutdown restrictions, and the schedule you are working to."
        >
          <textarea
            id={id('message')}
            className="input min-h-32"
            name="message"
            rows={5}
            maxLength={5000}
            value={values.message}
            onChange={event => set('message', event.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describedBy('message', true)}
          />
        </Field>

        <div>
          <label className="flex items-start gap-3 text-sm leading-[var(--lh-body)]">
            <input
              id={id('consent')}
              type="checkbox"
              name="consent"
              checked={values.consent}
              onChange={event => set('consent', event.target.checked)}
              className="mt-1 h-5 w-5 shrink-0 accent-[var(--brand)]"
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={describedBy('consent')}
            />
            <span>
              I agree to be contacted about this enquiry. See the{' '}
              <Link to="/privacy" className="underline underline-offset-2">
                privacy notice
              </Link>
              .
            </span>
          </label>
          {errors.consent && (
            <p id={`${id('consent')}-error`} className="mt-2 text-sm font-semibold text-[var(--brand-ink)]">
              {errors.consent}
            </p>
          )}
        </div>

        {/* Honeypot — off-screen, never announced, never focusable. */}
        <div aria-hidden="true" className="absolute left-[-10000px] h-px w-px overflow-hidden">
          <label htmlFor={id('website')}>Leave this field empty</label>
          <input
            id={id('website')}
            name="website"
            tabIndex={-1}
            autoComplete="off"
            onChange={event => {
              honeypot.current = event.target.value;
            }}
          />
        </div>
      </fieldset>

      {/* Turnstile renders here, and only when Cloudflare asks for an
          interaction. Empty and zero-height the rest of the time. */}
      <div ref={turnstileBox} className="mt-4 empty:mt-0" />

      {values.urgency === 'today' && (
        <p className="mt-6 rounded-[var(--radius)] border-2 border-[var(--brand)] bg-red-50 p-4 font-semibold text-[var(--ink)]">
          For no-heat, leaks or gas smells, call{' '}
          <a href={PHONE_HREF} className="underline underline-offset-2">
            {PHONE}
          </a>{' '}
          now — 24/7.
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={sending || submitted}>
          {sending ? 'Sending…' : 'Send enquiry'}
        </Button>
        <p className="text-sm text-[var(--muted)]">
          Or call{' '}
          <a href={PHONE_HREF} className="font-semibold text-[var(--ink)] underline underline-offset-2">
            {PHONE}
          </a>{' '}
          — 24/7.
        </p>
      </div>
    </form>
  );
}
