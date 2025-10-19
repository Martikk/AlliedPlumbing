// src/pages/GetQuote.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
  const [done, setDone] = useState<null | { ticket: string }>(null);

  // простая маска для телефона
  const [phone, setPhone] = useState("");
  const maskedPhone = useMemo(() => maskPhone(phone), [phone]);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    return () => {
      files.forEach((f) => f.preview && URL.revokeObjectURL(f.preview));
    };
  }, [files]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = formRef.current!;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setSubmitting(true);

    try {
      const fd = new FormData(form);
      // Прикладываем файлы
      files.forEach(({ file }) => fd.append("attachments", file));

      // TODO: замени на свой эндпоинт Lambda / Formspree / API Gateway
      const res = await fetch("/api/quote", {
        method: "POST",
        body: fd,
      });

      // для статики можно временно фолбэкнуть:
      if (!res.ok) {
        // имитация успешной заявки
        await new Promise((r) => setTimeout(r, 1000));
      }

      setDone({ ticket: "#" + Math.floor(100000 + Math.random() * 900000) });
      setFiles([]);
      form.reset();
      setPhone("");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      alert("Could not send. Please try again or call 604-731-1000.");
    } finally {
      setSubmitting(false);
    }
  }

  function onPickFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(e.target.files ?? []);
    const newItems = picked.slice(0, 6).map((file) => ({
      file,
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
    }));
    setFiles((prev) => [...prev, ...newItems].slice(0, 6));
    e.target.value = "";
  }

  return (
    <main className="bg-white">
      {/* Hero-врезка/хлебные */}
      <section className="relative overflow-hidden">
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
        {done && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-green-800">
            <div className="font-semibold">Thanks! Your request was submitted.</div>
            <div className="text-sm mt-1">
              Our coordinator will contact you shortly. Your ticket:{" "}
              <span className="font-mono font-bold">{done.ticket}</span>.
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Форма */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 rounded-2xl border border-neutral-200/70 bg-white p-5 md:p-6 shadow-sm"
          >
            <FormHeader />

            <form ref={formRef} onSubmit={onSubmit} className="mt-4 space-y-5">
              {/* Имя / Телефон */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Name" htmlFor="name">
                  <input
                    id="name"
                    name="name"
                    required
                    placeholder="Full name / Company"
                    className="input"
                  />
                </Field>
                <Field label="Phone" htmlFor="phone">
                  <input
                    id="phone"
                    name="phone"
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
              <QuickChips name="tags" options={QUICK_TAGS} />

              {/* Сообщение */}
              <Field label="Message" htmlFor="message">
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Describe the issue (age of equipment, symptoms, access hours)…"
                  className="input resize-y"
                  required
                />
              </Field>

              {/* Медиа */}
              <div>
                <label className="block text-sm font-medium text-neutral-800">
                  Photos / video (optional)
                </label>
                <p className="text-neutral-500 text-sm">Up to 6 files — JPG, PNG, MP4, MOV.</p>

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
                          setFiles((prev) => prev.filter((_, i) => i !== idx))
                        }
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-neutral-900 text-white text-xs shadow hidden group-hover:grid place-items-center"
                        aria-label="Remove file"
                      >
                        ×
                      </button>
                    </div>
                  ))}

                  {files.length < 6 && (
                    <label className="h-24 w-full cursor-pointer rounded-lg ring-1 ring-dashed ring-neutral-300 grid place-items-center text-sm text-neutral-600 hover:bg-neutral-50">
                      <input
                        type="file"
                        accept="image/*,video/*"
                        multiple
                        onChange={onPickFiles}
                        className="hidden"
                      />
                      Upload
                    </label>
                  )}
                </div>
              </div>

              {/* Согласие / reCAPTCHA (заглушка) */}
              <div className="flex flex-col gap-3">
                <label className="inline-flex items-start gap-2">
                  <input type="checkbox" required className="mt-1 accent-neutral-900" />
                  <span className="text-sm text-neutral-700">
                    I agree to be contacted about this request and accept the{" "}
                    <Link to="/privacy" className="underline">
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>
                <div className="h-12 w-[300px] max-w-full rounded border border-neutral-300 bg-neutral-100/70 text-neutral-500 grid place-items-center text-xs">
                  reCAPTCHA placeholder
                </div>
              </div>

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
            </form>
          </motion.div>

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
    </main>
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
          Same-day estimates for most jobs. Emergency dispatch available 24/7.
        </p>
      </div>
      <img
        src="https://res.cloudinary.com/dzytbkc5l/image/upload/v1760074743/Allied/IBC-Logo-for-Gallery_hsklz0.webp"
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
    <label htmlFor={htmlFor} className="block">
      <span className="block text-sm font-medium text-neutral-800">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
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

function QuickChips({ name, options }: { name: string; options: string[] }) {
  const [selected, setSelected] = useState<string[]>([]);
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
          <Check /> COR & WorkSafeBC compliant
        </li>
        <li className="flex items-start gap-2">
          <Check /> School-approved crews (SD39/40/43)
        </li>
        <li className="flex items-start gap-2">
          <Check /> 12-month workmanship warranty
        </li>
        <li className="flex items-start gap-2">
          <Check /> IBC / Rheem / VRF specialists
        </li>
      </ul>
      <div className="mt-4 grid grid-cols-3 gap-3">
        <img
          src="https://res.cloudinary.com/dzytbkc5l/image/upload/v1760074745/Allied/Rinnai_Logo_Red_uqwftm.png"
          alt=""
          className="h-6 object-contain opacity-70"
        />
        <img
          src="https://res.cloudinary.com/dzytbkc5l/image/upload/v1760074743/Allied/png-clipart-daikin-air-conditioning-heating-system-service-others-blue-text_novbee.png"
          alt=""
          className="h-6 object-contain opacity-70"
        />
        <img
          src="https://res.cloudinary.com/dzytbkc5l/image/upload/v1760074743/Allied/IBC-Logo-for-Gallery_hsklz0.webp"
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