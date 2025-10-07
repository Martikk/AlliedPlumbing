const PHONE = "604-731-1000";
export default function EmergencyBar() {
  return (
    <div
      className="w-full bg-red-600 text-white text-sm py-2 px-4 text-center fixed top-0 z-50"
      style={{ height: "var(--bar-h)" }}
      aria-label="24/7 Emergency Line"
    >
      <strong>24/7 Emergency:</strong>{" "}
      <a href={`tel:${PHONE}`} className="underline">{PHONE}</a> — calls only after-hours
    </div>
  );
}