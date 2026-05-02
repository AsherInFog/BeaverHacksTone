export async function translate({ text, language, context }) {
  const res = await fetch('/api/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, language, context }),
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => 'Translation failed.');
    throw new Error(msg || `Request failed (${res.status})`);
  }
  return res.json();
}
