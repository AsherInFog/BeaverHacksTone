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

export async function explain({ text, language, context, register, translation }) {
  const res = await fetch('/api/explain', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, language, context, register, translation }),
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => 'Explanation failed.');
    throw new Error(msg || `Request failed (${res.status})`);
  }
  const data = await res.json();
  return data.explanation;
}
