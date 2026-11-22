/** @type {import('tailwindcss').Config} */
// Content globs stay narrow (audit B-04): index.html and source only, never
// node_modules or JSON content files.
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // Mirrors src/styles/tokens.css so classes and raw CSS share one source.
      colors: {
        brand: {
          DEFAULT: "var(--brand)",
          hover: "var(--brand-hover)",
          ink: "var(--brand-ink)",
        },
        ink: "var(--ink)",
        body: "var(--body)",
        muted: "var(--muted)",
        line: "var(--line)",
        surface: {
          DEFAULT: "var(--surface)",
          alt: "var(--surface-alt)",
          ink: "var(--surface-ink)",
        },
        focus: "var(--focus)",
      },
      fontSize: {
        h1: ["var(--fs-h1)", { lineHeight: "1.05" }],
        h2: ["var(--fs-h2)", { lineHeight: "1.15" }],
        h3: ["var(--fs-h3)", { lineHeight: "1.3" }],
        eyebrow: ["var(--fs-eyebrow)", { lineHeight: "1.4" }],
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
        lg: "var(--radius-lg)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        glass: "0 30px 70px -20px rgba(0,0,0,0.35)",
      },
      spacing: {
        section: "var(--section-y)",
        header: "var(--header-h)",
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
