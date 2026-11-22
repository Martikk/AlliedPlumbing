/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        glass: "0 30px 70px -20px rgba(0,0,0,0.35)",
      },
      // Named utilities used by the native enquiry form and the shared
      // Button, which are built on src/styles/tokens.css. These only ADD
      // names — no Tailwind default is overridden, so the restored design
      // renders exactly as it did.
      fontSize: {
        h3: ["var(--fs-h3)", { lineHeight: "1.3" }],
        eyebrow: ["var(--fs-eyebrow)", { lineHeight: "1.4" }],
      },
      transitionDuration: {
        fast: "var(--dur-fast)",
        base: "var(--dur-base)",
        slow: "var(--dur-slow)",
      },
      transitionTimingFunction: {
        out: "var(--ease-out)",
        "in-out": "var(--ease-in-out)",
      },
    },
  },
  plugins: [],
};
