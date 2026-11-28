import config from './enquiry-config.json';
import { SERVICE_LINKS, type ServiceKey } from './site-links';

/** Audit H-01 — one enquiry flow, native and trackable.
 *
 * The schema, the validation and the transport live here so the form
 * component only renders. Validation runs client-side for fast feedback and
 * again server-side in apps-script/Code.gs — this file is convenience, not
 * security.
 *
 * DEVIATION from the spec: the audit suggests React Hook Form + Zod. Those add
 * roughly 26 KB gzipped, against a 150 KB total-JS budget (B-08), for a form
 * with eleven fields. Hand-rolled validation below keeps the budget and the
 * same behaviour. Revisit if the form grows. */

export const APPS_SCRIPT_URL =
  /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(config.appsScriptUrl)
    ? config.appsScriptUrl
    : '';

export const ENQUIRY_TYPES = [
  { value: 'quote', label: 'Quote', hint: 'Pricing for planned work' },
  { value: 'service', label: 'Service call or repair', hint: 'Something is not working' },
  { value: 'maintenance', label: 'Maintenance contract', hint: 'A recurring program' },
  { value: 'tender', label: 'Tender or RFP', hint: 'You have bid documents' },
  { value: 'other', label: 'Other', hint: 'Anything else' },
] as const;

export type EnquiryType = (typeof ENQUIRY_TYPES)[number]['value'];

/** The plan's list. `residential` keeps its stored value and gains a label
 *  that says what it covers, because renaming the value would orphan every
 *  enquiry already recorded under it. `rental` is separate from `strata`
 *  deliberately: the same building, a different person deciding. */
export const PROPERTY_TYPES = [
  { value: 'school', label: 'School / institutional' },
  { value: 'strata', label: 'Strata' },
  { value: 'rental', label: 'Rental' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'residential', label: 'House or other residential' },
  { value: 'other', label: 'Other' },
] as const;

export type PropertyType = (typeof PROPERTY_TYPES)[number]['value'];

export const URGENCY = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This week' },
  { value: 'planning', label: 'Planning' },
] as const;

export type Urgency = (typeof URGENCY)[number]['value'];

export type EnquiryValues = {
  enquiryType: EnquiryType;
  name: string;
  organisation: string;
  email: string;
  phone: string;
  propertyType: PropertyType | '';
  service: ServiceKey | '';
  address: string;
  urgency: Urgency | '';
  tenderClosing: string;
  message: string;
  consent: boolean;
};

export const EMPTY: EnquiryValues = {
  enquiryType: 'quote',
  name: '',
  organisation: '',
  email: '',
  phone: '',
  propertyType: '',
  service: '',
  address: '',
  urgency: '',
  tenderClosing: '',
  message: '',
  consent: false,
};

/* ---- conditional visibility (the "Shown when" column) ------------------- */

export const shows = {
  organisation: (v: EnquiryValues) => v.propertyType !== 'residential',
  service: (v: EnquiryValues) => v.enquiryType === 'quote' || v.enquiryType === 'service',
  address: (v: EnquiryValues) => v.enquiryType === 'quote' || v.enquiryType === 'service',
  urgency: (v: EnquiryValues) => v.enquiryType === 'service',
  tenderClosing: (v: EnquiryValues) => v.enquiryType === 'tender',
  files: (v: EnquiryValues) => v.enquiryType === 'tender' || v.enquiryType === 'quote',
};

export type Errors = Partial<Record<keyof EnquiryValues | 'files' | 'form', string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validate(values: EnquiryValues, files: File[]): Errors {
  const errors: Errors = {};

  if (!values.name.trim()) errors.name = 'Enter your name.';
  else if (values.name.length > 120) errors.name = 'Name is too long.';

  if (!values.email.trim()) errors.email = 'Enter your email address.';
  else if (!EMAIL.test(values.email) || /[\r\n]/.test(values.email))
    errors.email = 'Enter a valid email address, for example name@example.com.';

  // Phone is required for a service call — dispatch cannot work from email.
  if (values.enquiryType === 'service' && !values.phone.trim())
    errors.phone = 'Enter a phone number so dispatch can reach you.';

  if (!values.propertyType) errors.propertyType = 'Choose the property type.';

  if (shows.service(values) && !values.service) errors.service = 'Choose the service involved.';

  if (shows.address(values) && !values.address.trim())
    errors.address = 'Enter the site address.';

  if (shows.urgency(values) && !values.urgency) errors.urgency = 'Choose how urgent this is.';

  if (shows.tenderClosing(values) && !values.tenderClosing)
    errors.tenderClosing = 'Enter the tender closing date.';

  if (!values.message.trim()) errors.message = 'Tell us what you need.';
  else if (values.message.length > 5000) errors.message = 'Message is too long.';

  if (!values.consent) errors.consent = 'Please agree to be contacted about this enquiry.';

  if (files.length > MAX_FILES) errors.files = `Attach no more than ${MAX_FILES} files.`;
  else if (files.reduce((total, file) => total + file.size, 0) > MAX_TOTAL_BYTES)
    errors.files = 'Attachments must total no more than 10 MB.';
  else if (files.some(file => !ACCEPTED.includes(file.type)))
    errors.files = 'Attachments must be PDF, JPG or PNG.';

  return errors;
}

export const MAX_FILES = 4;
export const MAX_TOTAL_BYTES = 10 * 1024 * 1024;
export const ACCEPTED = ['application/pdf', 'image/jpeg', 'image/png'];
export const ACCEPT_ATTR = '.pdf,.jpg,.jpeg,.png';

/** The field order used by the error summary, so focus lands predictably. */
export const FIELD_ORDER: (keyof EnquiryValues | 'files')[] = [
  'name',
  'email',
  'phone',
  'organisation',
  'propertyType',
  'service',
  'address',
  'urgency',
  'tenderClosing',
  'files',
  'message',
  'consent',
];

/** Which thank-you page a submitted enquiry lands on.
 *
 *  Three pages rather than five: a tender is a project enquiry answered by
 *  the same desk, and "other" is rare enough that the projects wording fits
 *  it better than a fourth page nobody would maintain. The mapping lives
 *  here so the form and the tests cannot disagree about it. */
export function thanksPathFor(type: EnquiryType): string {
  if (type === 'service') return '/thanks/service';
  if (type === 'maintenance') return '/thanks/maintenance';
  return '/thanks/project';
}

export function serviceLabel(key: ServiceKey | '') {
  return SERVICE_LINKS.find(service => service.key === key)?.label ?? '';
}

function toBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('That file could not be read.'));
    reader.onload = () => {
      const result = String(reader.result);
      resolve(result.slice(result.indexOf(',') + 1));
    };
    reader.readAsDataURL(file);
  });
}

export type SubmitResult = { ok: true; reference: string };

/** Why a submit failed. `backend` means the endpoint is reachable but is not
 *  answering the contract — the usual cause is an Apps Script deployment that
 *  predates `doPost`, which answers an HTML error page instead of JSON. The
 *  visitor cannot do anything about that, so the form offers them a route that
 *  does not depend on it. */
export type FailureKind = 'network' | 'backend' | 'rejected';

export class EnquiryError extends Error {
  kind: FailureKind;
  constructor(kind: FailureKind, message: string) {
    super(message);
    this.name = 'EnquiryError';
    this.kind = kind;
  }
}

/** A mailto: carrying everything the visitor typed.
 *
 *  Attachments cannot ride along, so they are named instead and the reply asks
 *  for them. This exists so that a misconfigured backend can never turn a
 *  completed form into a lost enquiry — the visitor always leaves with a way
 *  to reach Allied that works. */
export function mailtoFor(values: EnquiryValues, files: File[], to: string) {
  const type = ENQUIRY_TYPES.find(t => t.value === values.enquiryType)?.label ?? values.enquiryType;
  const lines = [
    `Enquiry type: ${type}`,
    `Name: ${values.name}`,
    values.organisation && `Organisation: ${values.organisation}`,
    `Email: ${values.email}`,
    values.phone && `Phone: ${values.phone}`,
    values.propertyType &&
      `Property type: ${PROPERTY_TYPES.find(t => t.value === values.propertyType)?.label ?? ''}`,
    values.service && `Service: ${serviceLabel(values.service)}`,
    values.address && `Site address: ${values.address}`,
    values.urgency && `Urgency: ${URGENCY.find(u => u.value === values.urgency)?.label ?? ''}`,
    values.tenderClosing && `Tender closing: ${values.tenderClosing}`,
    '',
    values.message,
    files.length ? `\n(${files.length} file(s) to follow: ${files.map(f => f.name).join(', ')})` : '',
  ]
    .filter(Boolean)
    .join('\n');
  return `mailto:${to}?subject=${encodeURIComponent(`Website enquiry — ${type}`)}&body=${encodeURIComponent(lines)}`;
}

/** Maps an enquiry type onto the backend's three storage routes. */
function backendType(type: EnquiryType) {
  return type === 'other' ? 'contact' : 'quote';
}

/** POSTs to the Apps Script web app. Content-Type must stay text/plain: Apps
 *  Script cannot answer a CORS preflight, and text/plain is a simple request. */
export async function submitEnquiry(
  values: EnquiryValues,
  files: File[],
  meta: { requestId: string; startedAt: number; honeypot: string; turnstileToken?: string | null },
): Promise<SubmitResult> {
  if (!APPS_SCRIPT_URL)
    throw new EnquiryError('backend', 'The enquiry service is not configured.');

  const payload = {
    type: backendType(values.enquiryType),
    enquiryType: ENQUIRY_TYPES.find(t => t.value === values.enquiryType)?.label ?? values.enquiryType,
    propertyType: PROPERTY_TYPES.find(t => t.value === values.propertyType)?.label ?? '',
    organisation: values.organisation,
    name: values.name,
    email: values.email,
    phone: values.phone,
    address: values.address,
    service: serviceLabel(values.service),
    urgency: URGENCY.find(u => u.value === values.urgency)?.label ?? '',
    tenderClosing: values.tenderClosing,
    message: values.message,
    consent: values.consent ? 'yes' : '',
    website: meta.honeypot,
    requestId: meta.requestId,
    startedAt: String(meta.startedAt),
    turnstileToken: meta.turnstileToken ?? '',
    files: await Promise.all(
      files.map(async file => ({
        name: file.name,
        type: file.type,
        data: await toBase64(file),
      })),
    ),
  };

  let response: Response;
  try {
    response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(60000),
    });
  } catch {
    throw new EnquiryError(
      'network',
      'Your enquiry could not be sent. Check your connection and try again.',
    );
  }

  // Apps Script answers an HTML error page when the deployed version has no
  // doPost ("Script function not found"). That is a deployment fault, not
  // something the visitor can retry their way out of.
  const text = await response.text();
  let result: unknown = null;
  try {
    result = JSON.parse(text);
  } catch {
    throw new EnquiryError(
      'backend',
      'Our enquiry system is not accepting messages right now. This is our fault, not yours.',
    );
  }

  const data = result as { ok?: boolean; id?: string; message?: string; stored?: boolean };
  if (data.ok && data.id) return { ok: true, reference: data.id };
  throw new EnquiryError(
    'rejected',
    data.message || 'Your enquiry could not be sent. Please try again.',
  );
}
