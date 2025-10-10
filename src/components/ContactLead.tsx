// src/components/ContactLead.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { FORMSPREE_ENDPOINT } from "@/config";

/** Наклонённая подложка + стеклянная форма */
export default function ContactLead() {
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [agree, setAgree] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!agree) return setErr("Please accept the privacy policy.");
    setErr(null);
    setSending(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        form.reset();
        setOk(true);
      } else {
        setErr("Submission failed. Please try again.");
      }
    } catch {
      setErr("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="py-16 md:py-24">
      {/* isolate — чтобы слои внутри не уходили за пределы секции */}
      <div className="relative isolate max-w-6xl mx-auto px-4 md:px-6">
        {/* ФОН (z-0), фиксированная высота чтобы его было видно */}
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
          <div
            className="
              w-[110%] md:w-full
              h-[360px] md:h-[420px]
              rotate-[-6deg]
              rounded-[28px]
              overflow-hidden
              shadow-glass
              bg-neutral-800 bg-cover bg-center relative
            "
            // Если кладёшь файл в /public, используй: url('/contact-bg.jpg')
            style={{
              backgroundImage:
                "url('https://res.cloudinary.com/dzytbkc5l/image/upload/v1760068155/Allied/10_kubptf.png')",
            }}
          >
            <div className="absolute inset-0 bg-neutral-900/35" />
          </div>
        </div>

        {/* Контент (z-10) поверх фона */}
        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-start">
          <div className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,.45)] md:pl-6">
            <h2 className="text-3xl md:text-4xl font-extrabold">
              Give us a call for
              <br /> more information
            </h2>
            <p className="mt-4 max-w-md text-white/90">
              Dedicated to building spaces with strength and soul, trusted by
              clients, crafted with care.
            </p>
          </div>

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative rounded-2xl bg-white/65 backdrop-blur-md ring-1 ring-white/50 shadow-[0_20px_60px_-25px_rgba(2,6,23,.35)] p-5 md:p-6"
          >
            {ok ? (
              <div className="p-4 rounded-lg bg-green-50 text-green-800">
                Thanks — we’ll get back to you during business hours.
              </div>
            ) : (
              <>
                <label className="block mb-3">
                  <span className="sr-only">Name</span>
                  <input
                    name="name"
                    required
                    placeholder="Name"
                    className="w-full rounded-md border border-black/10 bg-white/80 px-3 py-2 outline-none focus:ring-2 focus:ring-red-500"
                  />
                </label>
                <label className="block mb-3">
                  <span className="sr-only">Email</span>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="Email"
                    className="w-full rounded-md border border-black/10 bg-white/80 px-3 py-2 outline-none focus:ring-2 focus:ring-red-500"
                  />
                </label>
                <label className="block mb-3">
                  <span className="sr-only">Phone</span>
                  <input
                    name="phone"
                    placeholder="Phone"
                    className="w-full rounded-md border border-black/10 bg-white/80 px-3 py-2 outline-none focus:ring-2 focus:ring-red-500"
                  />
                </label>
                <label className="block mb-4">
                  <span className="sr-only">Message</span>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Message"
                    className="w-full rounded-md border border-black/10 bg-white/80 px-3 py-2 outline-none focus:ring-2 focus:ring-red-500"
                  />
                </label>

                <label className="flex items-start gap-2 text-sm text-neutral-700 mb-4">
                  <input
                    type="checkbox"
                    className="mt-1 accent-red-600"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                  />
                  <span>
                    I have read and accept the{" "}
                    <a
                      href="/privacy"
                      className="underline decoration-1 underline-offset-2"
                    >
                      privacy policy
                    </a>
                    .
                  </span>
                </label>

                {err && <div className="mb-3 text-sm text-red-600">{err}</div>}

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={sending || !agree}
                    className="inline-flex items-center rounded-md bg-[#2d5cff] px-4 py-2 text-white font-medium disabled:opacity-60 hover:brightness-110"
                  >
                    {sending ? "Sending…" : "Send message"}
                    <span aria-hidden className="ml-2">↗</span>
                  </button>
                </div>
              </>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}