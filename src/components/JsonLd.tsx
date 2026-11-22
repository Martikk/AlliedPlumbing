/** Emits one JSON-LD block. `<` is escaped so a stray value can never close
 *  the script element early. Renders nothing for a null schema, so callers can
 *  pass a builder that declines to emit. */
export default function JsonLd({ data }: { data: unknown }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
