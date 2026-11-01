export const DRAFT_LIFETIME_MS = 4 * 60 * 60 * 1000;
const fields = new Set(['name', 'email', 'phone', 'address', 'service', 'urgency', 'tags', 'message', 'role', 'resume_url']);
export function draftValues(data: Iterable<[string, unknown]>) {
  const values: Record<string, string> = {};
  for (const [key, value] of data) if (fields.has(key) && typeof value === 'string') values[key] = value.slice(0, 5000);
  return values;
}
export function decodeDraft(raw: string | null, now = Date.now()): Record<string, string> | null {
  if (!raw || raw.length > 40000) return null;
  try {
    const draft = JSON.parse(raw);
    if (typeof draft.savedAt !== 'number' || now - draft.savedAt > DRAFT_LIFETIME_MS || draft.savedAt > now || !draft.values || typeof draft.values !== 'object') return null;
    return draftValues(Object.entries(draft.values));
  } catch { return null; }
}
