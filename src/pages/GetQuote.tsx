import EmbeddedEnquiry, { APPS_SCRIPT_URL } from '../components/EmbeddedEnquiry';
import { FORMSPREE_ENDPOINT } from '../config';
// src/pages/GetQuote.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useFeedbackMotion } from '../hooks/useFeedbackMotion';
import { Link } from "../lib/navigation";
import { QUOTE_FILE_UPLOADS_ENABLED } from "../config";
import { useFormDraft } from "../hooks/useFormDraft";
import { sendEnquiry } from "../lib/forms";
import { trackEvent } from "../lib/analytics";

type FileItem = { file: File; preview?: string };

const SERVICES = [
  "Plumbing",
  "Heating / Boiler",
  "Air Conditioning / HVAC",
  "Drainage / Backflow",
  "Gas Fitting",
  "Maintenance Program",
  "Other",
];

const URGENCY = [
  { value: "emergency", label: "Emergency (now)" },
  { value: "soon", label: "Within 24–48h" },
  { value: "routine", label: "Routine quote" },
];

export default function GetQuote() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const started = useRef(false);
  const previews = useRef(new Set<string>());
  const statusRef = useRef<HTMLDivElement>(null);

  useFeedbackMotion(statusRef, done ? 'success' : error);

  // простая маска для телефона
  const [phone, setPhone] = useState("");
  const maskedPhone = useMemo(() => maskPhone(phone), [phone]);

  const formRef = useRef<HTMLFormElement>(null);
  const inFlight = useRef(false);
  const [tags, setTags] = useState<string[]>([]);
  const clearDraft = useFormDraft('quote', formRef, values => {
    setPhone(values.phone ?? '');
    setTags((values.tags ?? '').split(', ').filter(value => QUICK_TAGS.includes(value)));
  });

  useEffect(() => {
    const urls = previews.current;
    return () => urls.forEach(url => URL.revokeObjectURL(url));
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = formRef.current!;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    if (inFlight.current) return;
    inFlight.current = true;
    setSubmitting(true); setError(""); setDone(false);
    try {
      const data = new FormData(form);
      data.set("_subject", "Allied Plumbing — Quote request");
      files.forEach(({ file }) => data.append("attachments", file));
      await sendEnquiry(data);
      trackEvent("generate_lead", { form_name: "quote" });
      setDone(true);
      previews.current.forEach(url => URL.revokeObjectURL(url));
      previews.current.clear();
      clearDraft(); setFiles([]); form.reset(); setPhone(""); setTags([]);
    } catch (failure) {
      setError(failure instanceof Error && failure.name !== "TimeoutError" ? failure.message : "Your request could not be sent. Check your connection and try again, or call 604-731-1000.");
      trackEvent("form_error", { form_name: "quote", error_type: "network_or_server" });
    } finally {
      inFlight.current = false; setSubmitting(false);
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  }

  function onPickFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(e.target.files ?? []);
    const allowed = new Set(["image/jpeg", "image/png", "video/mp4", "video/quicktime"]);
    if (picked.some(file => !allowed.has(file.type) || file.size > 10 * 1024 * 1024) || picked.length + files.length > 6) {
      setError("Choose up to 6 JPG, PNG, MP4 or MOV files, no larger than 10 MB each.");
      e.target.value = "";
      return;
    }
    setError("");
    const next = picked.map(file => {
      const preview = file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined;
      if (preview) previews.current.add(preview);
      return { file, preview };
    });
    setFiles(previous => [...previous, ...next]);
    e.target.value = "";
  }

  return (
    <div className="bg-white">
      {/* Hero-врезка/хлебные */}
      <section className="page-photo-hero relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1920&auto=format&fit=crop"
            alt=""
            className="h-64 md:h-80 w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 md:px-6 h-64 md:h-80 flex items-end pb-6">
          <div>
            <h1 className="text-white text-4xl md:text-5xl font-extrabold drop-shadow">
              Get a Quote
            </h1>
            <p className="text-white/90 mt-2 max-w-2xl">
              Fast, transparent pricing from certified technicians. 24/7 emergency dispatch.
            </p>
          </div>
        </div>
      </section>

      {/* Контент */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-14">
        {/* Успешная отправка */}
        <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className="scroll-mt-6">
          {done && <p className="mb-6 rounded-xl bg-green-50 p-4 text-green-900">Your request has been received by our enquiry system. The team will review the details you provided. If the situation is urgent or changes before you hear from us, call 604-731-1000.</p>}
          {error && <p className="mb-6 rounded-xl bg-red-50 p-4 text-red-900">{error}</p>}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Форма */}
          <div
            className="lg:col-span-2 rounded-2xl border border-neutral-200/70 bg-white p-5 md:p-6 shadow-sm"
          >
            <FormHeader />

            {APPS_SCRIPT_URL ? <EmbeddedEnquiry type="quote" /> : <form method="post" action={FORMSPREE_ENDPOINT} hidden={done} ref={formRef} onSubmit={onSubmit} aria-busy={submitting} onFocusCapture={() => {
              if (!started.current) { trackEvent("form_start", { form_name: "quote" }); started.current = true; }
            }} className="mt-4 space-y-5">
              <fieldset disabled={submitting} className="space-y-5">
              {/* Имя / Телефон */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Name" htmlFor="name">
                  <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    maxLength={120}
                    required
                    placeholder="Full name / Company"
                    className="input"
                  />
                </Field>
                <Field label="Phone" htmlFor="phone">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="(604) 555-1212"
                    value={maskedPhone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="input"
                    required
                  />
                </Field>
              </div>

              {/* Email */}
              <Field label="Email" htmlFor="email">
                <input
                  id="email"
                  name="email"
                  autoComplete="email"
                  spellCheck={false}
                  maxLength={254}
                  type="email"
                  placeholder="you@company.com"
                  required
                  className="input"
                />
              </Field>

              {/* Адрес */}
              <Field label="Address / Site Location" htmlFor="address">
                <input
                  id="address"
                  name="address"
                  autoComplete="street-address"
                  maxLength={300}
                  placeholder="Address or nearest intersection"
                  required
                  className="input"
                />
              </Field>

              {/* Сервис / Срочность */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Service" htmlFor="service">
                  <select id="service" name="service" className="input">
                    {SERVICES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Urgency" htmlFor="urgency">
                  <select id="urgency" name="urgency" className="input" defaultValue="routine">
                    {URGENCY.map((u) => (
                      <option key={u.value} value={u.value}>
                        {u.label}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              {/* Быстрые пресеты */}
              <QuickChips name="tags" options={QUICK_TAGS} selected={tags} setSelected={setTags} />

              {/* Сообщение */}
              <Field label="Message" htmlFor="message">
                <textarea
                  id="message"
                  name="message"
                  maxLength={5000}
                  rows={5}
                  placeholder="Describe the issue (age of equipment, symptoms, access hours)…"
                  className="input resize-y"
                  required
                />
              </Field>

              {/* Медиа */}
              {QUOTE_FILE_UPLOADS_ENABLED ? <div>
                <label className="block text-sm font-medium text-neutral-800">
                  Photos / video (optional)
                </label>
                <p className="text-neutral-500 text-sm">Up to 6 files — JPG, PNG, MP4, MOV. Maximum 10 MB per file.</p>

                <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {files.map((item, idx) => (
                    <div key={idx} className="group relative">
                      {item.preview ? (
                        <img
                          src={item.preview}
                          alt=""
                          className="h-24 w-full object-cover rounded-lg ring-1 ring-neutral-200"
                        />
                      ) : (
                        <div className="h-24 rounded-lg ring-1 ring-neutral-200 grid place-items-center text-sm text-neutral-600">
                          {item.file.name}
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          {
                          if (item.preview) { URL.revokeObjectURL(item.preview); previews.current.delete(item.preview); }
                          setFiles(prev => prev.filter((_, i) => i !== idx));
                        }
                        }
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-neutral-900 text-white text-xs shadow grid place-items-center"
                        aria-label="Remove file"
                      >
                        ×
                      </button>
                    </div>
                  ))}

                  {files.length < 6 && (
                    <label className="h-24 w-full cursor-pointer rounded-lg focus-within:outline focus-within:outline-2 focus-within:outline-red-700 ring-1 ring-dashed ring-neutral-300 grid place-items-center text-sm text-neutral-600 hover:bg-neutral-50">
                      <input
                        type="file"
                        accept="image/jpeg,image/png,video/mp4,video/quicktime"
                        multiple
                        onChange={onPickFiles}
                        className="sr-only"
                        aria-label="Upload photos or video"
                      />
                      Upload
                    </label>
                  )}
                </div>
              </div> : <p className="text-sm text-neutral-700">For photos or drawings, email <a className="underline" href="mailto:quote@allied-plumbing.ca">quote@allied-plumbing.ca</a>.</p>}

              {/* Contact consent */}
              <div className="flex flex-col gap-3">
                <label className="inline-flex items-start gap-2">
                  <input type="checkbox" name="consent" value="yes" required className="mt-1 accent-neutral-900" />
                  <span className="text-sm text-neutral-700">
                    I agree to be contacted about this request and accept the{" "}
                    <Link to="/privacy" target="_blank" className="underline">
                      Privacy Notice (opens in a new tab)
                    </Link>
                    .
                  </span>
                </label>

              </div>

              </fieldset>
              {/* CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full md:w-auto inline-flex items-center justify-center rounded-xl bg-[#d23c34] px-6 py-3 font-semibold text-white shadow hover:brightness-110 disabled:opacity-60"
                >
                  {submitting ? "Sending…" : "Send request"}
                </button>
                <p className="text-xs text-neutral-500 mt-2">
                  Prefer phone? Call 24/7:{" "}
                  <a href="tel:604-731-1000" className="underline">
                    604-731-1000
                  </a>
                  .
                </p>
              </div>
            </form>}
          </div>

          {/* Sticky доверие/контакты */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-8 space-y-6">
              <TrustCard />
              <ContactCard />
              <SmallMap />
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

/* ---------- UI pieces ---------- */

function FormHeader() {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <span className="inline-block text-xs px-2 py-1 rounded-full bg-neutral-100 text-neutral-600">
          Request a quote
        </span>
        <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-neutral-900">
          Tell us what you need
        </h2>
        <p className="text-neutral-600 mt-1">
          A clear description helps us review your request. Tell us what is happening, where the equipment is located and whether there are access or scheduling restrictions. For urgent assistance, call 604-731-1000.
        </p>
      </div>
      <img
        src="https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760074743/Allied/IBC-Logo-for-Gallery_hsklz0.webp"
        alt=""
        className="h-10 w-auto opacity-80 hidden sm:block"
      />
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="block">
      <label htmlFor={htmlFor} className="block text-sm font-medium text-neutral-800">{label}</label>
      <div className="mt-1">{children}</div>
    </div>
  );
}

const QUICK_TAGS = [
  "No hot water",
  "Leak detected",
  "Boiler service",
  "New install",
  "Backflow test",
  "DDC integration",
];

function QuickChips({ name, options, selected, setSelected }: { name: string; options: string[]; selected: string[]; setSelected: React.Dispatch<React.SetStateAction<string[]>> }) {
  return (
    <div>
      <span className="block text-sm font-medium text-neutral-800">
        What do you need? <span className="text-neutral-500 font-normal">(optional)</span>
      </span>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = selected.includes(opt);
          return (
            <button
              type="button"
              aria-pressed={active}
              key={opt}
              onClick={() =>
                setSelected((prev) =>
                  prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]
                )
              }
              className={`px-3 py-1.5 rounded-full text-sm border transition ${
                active
                  ? "bg-neutral-900 text-white border-neutral-900"
                  : "bg-white border-neutral-300 hover:bg-neutral-50"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {/* скрытое поле для отправки */}
      <input type="hidden" name={name} value={selected.join(", ")} />
    </div>
  );
}

function TrustCard() {
  return (
    <div className="rounded-2xl border border-neutral-200/70 bg-white p-5 shadow-sm">
      <h3 className="font-semibold text-neutral-900">Why Allied</h3>
      <ul className="mt-3 space-y-2 text-sm text-neutral-700">
        <li className="flex items-start gap-2">
          <Check /> Site-specific safety planning
        </li>
        <li className="flex items-start gap-2">
          <Check /> School mechanical project experience
        </li>
        <li className="flex items-start gap-2">
          <Check /> Project-specific warranty terms
        </li>
        <li className="flex items-start gap-2">
          <Check /> Boiler, plumbing and HVAC/R experience
        </li>
      </ul>
      <div className="mt-4 grid grid-cols-3 gap-3">
        <img
          src="https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760074745/Allied/Rinnai_Logo_Red_uqwftm.png"
          alt=""
          className="h-6 object-contain opacity-70"
        />
        <img
          src="https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760074743/Allied/png-clipart-daikin-air-conditioning-heating-system-service-others-blue-text_novbee.png"
          alt=""
          className="h-6 object-contain opacity-70"
        />
        <img
          src="https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,c_limit,w_1200/v1760074743/Allied/IBC-Logo-for-Gallery_hsklz0.webp"
          alt=""
          className="h-6 object-contain opacity-70"
        />
      </div>
    </div>
  );
}

function ContactCard() {
  return (
    <div className="rounded-2xl border border-neutral-200/70 bg-white p-5 shadow-sm">
      <h3 className="font-semibold text-neutral-900">Talk to a human</h3>
      <p className="text-sm text-neutral-600 mt-1">
        Dispatch line operates 24/7 for emergencies.
      </p>
      <div className="mt-4 space-y-2">
        <a href="tel:604-731-1000" className="btn-secondary block text-center">
          Call 604-731-1000
        </a>
        <a href="mailto:quote@allied-plumbing.ca" className="btn-tertiary block text-center">
          quote@allied-plumbing.ca
        </a>
      </div>
      <div className="mt-4 text-xs text-neutral-500">
        Address: 4085 2nd Ave, Burnaby, BC V5C 3X1
      </div>
    </div>
  );
}

function SmallMap() {
  return (
    <div className="rounded-2xl overflow-hidden border border-neutral-200/70 shadow-sm">
      <iframe
        title="Allied Plumbing map"
        src="https://www.google.com/maps?q=4085%202nd%20Ave%20Burnaby%20BC&output=embed"
        className="w-full h-56"
        loading="lazy"
      />
    </div>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5 text-neutral-900" fill="currentColor" aria-hidden>
      <path d="M7.5 13.5 3.8 9.8l1.4-1.4 2.3 2.3 6.3-6.3 1.4 1.4-7.7 7.7Z" />
    </svg>
  );
}

/* ---------- utils & styles ---------- */

function maskPhone(v: string) {
  const d = v.replace(/[^\d]/g, "").slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

/* Tailwind helpers (раз помогаем, то напомню классы)
   Добавь в глобальные стили (например, src/index.css) utility-классы через @layer:
   .input, .btn-secondary, .btn-tertiary
*/

/* Пример для src/index.css:
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .input {
    @apply w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 shadow-sm outline-none
           focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900;
  }
  .btn-secondary {
    @apply rounded-lg border border-neutral-300 bg-white px-4 py-2 font-semibold text-neutral-900 hover:bg-neutral-100;
  }
  .btn-tertiary {
    @apply rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2 font-medium text-neutral-700 hover:bg-neutral-100;
  }
}
*/