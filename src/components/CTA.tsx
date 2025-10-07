// src/components/CTA.tsx
import { EMAIL_QUOTE, PHONE } from '@/config';

export default function CTA() {
  return (
    <div className="not-prose mt-6 flex gap-3">
      <a
        href={`mailto:${EMAIL_QUOTE}`}
        className="px-4 py-3 rounded-xl border border-neutral-300"
      >
        Request a Quote
      </a>
      <a
        href={`tel:${PHONE}`}
        className="px-4 py-3 rounded-xl bg-red-600 text-white"
      >
        Book 24/7 Service
      </a>
    </div>
  );
}