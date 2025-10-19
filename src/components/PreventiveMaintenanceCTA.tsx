// src/components/PreventiveMaintenanceCTA.tsx
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "pm_cta_dismissed_until";
const SUPPRESS_DAYS = 30;

function daysFromNow(n: number) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString();
}
function isSuppressed() {
  try {
    const iso = localStorage.getItem(STORAGE_KEY);
    if (!iso) return false;
    return new Date(iso).getTime() > Date.now();
  } catch {
    return false;
  }
}

export default function PreventiveMaintenanceCTA() {
  const [open, setOpen] = useState(false);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Open logic: first trigger wins
  useEffect(() => {
    if (isSuppressed()) return;

    let opened = false;
    const openOnce = () => {
      if (opened) return;
      opened = true;
      previouslyFocused.current = (document.activeElement as HTMLElement) ?? null;
      setOpen(true);
    };

    // Exit-intent (desktop-ish): mouse leaving top
    const onMouseMove = (e: MouseEvent) => {
      if (e.clientY <= 4) openOnce();
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Time trigger
    const t = window.setTimeout(openOnce, 25000);

    // Scroll trigger: 50%
    const onScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const doc = document.documentElement;
      const scrolled = scrollY / (doc.scrollHeight - doc.clientHeight);
      if (scrolled >= 0.5) {
        openOnce();
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      clearTimeout(t);
    };
  }, []);

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Simple Escape close + return focus
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    // focus the dialog container
    setTimeout(() => dialogRef.current?.focus(), 0);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function suppressAndClose() {
    try {
      localStorage.setItem(STORAGE_KEY, daysFromNow(SUPPRESS_DAYS));
    } catch {}
    onClose();
  }
  function onClose() {
    setOpen(false);
    previouslyFocused.current?.focus?.();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-hidden={false}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={suppressAndClose}
          />

          {/* Dialog */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="pm-cta-title"
            aria-describedby="pm-cta-desc"
            tabIndex={-1}
            ref={dialogRef}
            className="
              relative w-full max-w-xl
              rounded-2xl bg-white text-neutral-900 ring-1 ring-black/10
              shadow-[0_30px_80px_-20px_rgba(2,6,23,.45)]
              overflow-hidden
            "
            initial={{ y: 30, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 20, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Accent header */}
            <div className="relative h-24">
              <img
                src="https://images.unsplash.com/photo-1604014237800-1c9102c28cf8?q=80&w=1400&auto=format&fit=crop"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
            </div>

            <div className="p-5 md:p-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-700 px-2.5 py-1 text-xs font-medium ring-1 ring-emerald-200">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Preventive Maintenance
              </span>

              <h2 id="pm-cta-title" className="mt-2 text-2xl md:text-3xl font-extrabold">
                Interested in Preventative Maintenance?
              </h2>

              <p id="pm-cta-desc" className="mt-2 text-neutral-600">
                Lock in uptime, lower energy costs, and extend equipment life with a tailored PM
                program. School-approved crews, DDC checks, and clean reporting.
              </p>

              {/* bullets */}
              <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-neutral-700">
                <li className="flex items-start gap-2">
                  <Check /> Monthly / quarterly / annual plans
                </li>
                <li className="flex items-start gap-2">
                  <Check /> Trend reviews & capex forecasting
                </li>
                <li className="flex items-start gap-2">
                  <Check /> Boiler / HVAC / DHW coverage
                </li>
                <li className="flex items-start gap-2">
                  <Check /> 24/7 dispatch line
                </li>
              </ul>

              {/* CTA row */}
              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/services/maintenance"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-neutral-900 text-white px-5 py-3 font-semibold hover:brightness-110"
                  onClick={suppressAndClose}
                >
                  Explore Maintenance
                  <span aria-hidden>↗</span>
                </Link>
                <Link
                  to="/GetQuote"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-white text-neutral-900 px-5 py-3 font-semibold ring-1 ring-neutral-300 hover:bg-neutral-100"
                  onClick={suppressAndClose}
                >
                  Get a PM Quote
                </Link>
              </div>

              {/* footer actions */}
              <div className="mt-3 flex items-center justify-between text-xs text-neutral-500">
                <button
                  onClick={suppressAndClose}
                  className="underline underline-offset-2 hover:text-neutral-700"
                >
                  Not now
                </button>
                <a href="tel:604-731-1000" className="hover:text-neutral-700">
                  24/7 Dispatch: 604-731-1000
                </a>
              </div>

              {/* Close button (icon) */}
              <button
                onClick={suppressAndClose}
                aria-label="Close"
                className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 ring-1 ring-black/5 hover:bg-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5 text-emerald-600 mt-[2px]" fill="currentColor" aria-hidden>
      <path d="M7.5 13.5 3.8 9.8l1.4-1.4 2.3 2.3 6.3-6.3 1.4 1.4-7.7 7.7Z" />
    </svg>
  );
}