import { buildPrompt } from '../src/lib/prompts.js';

const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text, language, context } = req.body || {};
  if (!text || !language) {
    return res.status(400).json({ error: 'text and language are required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });
  }

  const prompt = buildPrompt({ text, language, context });

  const upstream = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, responseMimeType: 'application/json' },
    }),
  });

  if (!upstream.ok) {
    const detail = await upstream.text().catch(() => '');
    return res.status(502).json({ error: 'Gemini request failed', detail });
  }

  const payload = await upstream.json();
  const raw = payload?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
  const cleaned = raw.replace(/^```json\s*|\s*```$/g, '').trim();

  try {
    const parsed = JSON.parse(cleaned);
    return res.status(200).json(parsed);
  } catch {
    return res.status(500).json({ error: 'Malformed JSON from Gemini', raw });
  }
}
