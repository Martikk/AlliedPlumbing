import { useCallback, useEffect, useRef, type RefObject } from 'react';
import { decodeDraft, draftValues } from '../lib/form-draft-data';

/** Tab-scoped, four-hour draft. Never persist files, consent, credentials or analytics data. */
export function useFormDraft(name: string, formRef: RefObject<HTMLFormElement | null>, onRestore?: (values: Record<string, string>) => void, overrides?: Record<string, string>) {
  const key = `allied:draft:${name}:v1`;
  const restored = useRef(onRestore); restored.current = onRestore;
  const preferred = useRef(overrides); preferred.current = overrides;
  const cleared = useRef(false);
  const clearDraft = useCallback(() => { cleared.current = true; try { sessionStorage.removeItem(key); } catch { /* Storage can be unavailable. */ } }, [key]);
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    let timer: ReturnType<typeof setTimeout>;
    function save() {
      if (cleared.current || !form) return;
      try { sessionStorage.setItem(key, JSON.stringify({ savedAt: Date.now(), values: draftValues(new FormData(form)) })); } catch { /* The form still works without storage. */ }
    }
    try {
      const values = decodeDraft(sessionStorage.getItem(key));
      if (values) {
        Object.assign(values, preferred.current);
        for (const [field, value] of Object.entries(values)) {
          const input = form.elements.namedItem(field);
          if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement || input instanceof HTMLSelectElement) input.value = value;
        }
        restored.current?.(values);
      } else sessionStorage.removeItem(key);
    } catch { /* Storage is optional. */ }
    function changed() { cleared.current = false; clearTimeout(timer); timer = setTimeout(save, 200); }
    form.addEventListener('input', changed);
    form.addEventListener('change', changed);
    window.addEventListener('pagehide', save);
    return () => { clearTimeout(timer); save(); form.removeEventListener('input', changed); form.removeEventListener('change', changed); window.removeEventListener('pagehide', save); };
  }, [key, formRef]);
  return clearDraft;
}
