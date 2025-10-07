import { PHONE } from '@/config';

export default function EmergencyPage() {
  return (
    <section className="prose max-w-none">
      <h1>24/7 Emergency Mechanical Service</h1>
      <p>Fast response for leaks, no-heat, DHW outages, gas issues, and RTU/MUA failures. Priority dispatch for PM clients.</p>
      <p><strong>After-hours note:</strong> Call only — forms are not monitored after hours.</p>
      <div className="mt-4 not-prose">
        <a className="px-4 py-3 rounded-xl bg-red-600 text-white" href={`tel:${PHONE}`}>Call {PHONE}</a>
      </div>
    </section>
  );
}