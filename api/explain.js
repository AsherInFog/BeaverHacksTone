import { buildExplainPrompt } from '../src/lib/prompts.js';

const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text, language, context, register, translation } = req.body || {};
  if (!text || !language || !register || !translation) {
    return res
      .status(400)
      .json({ error: 'text, language, register, and translation are required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });
  }

  const prompt = buildExplainPrompt({ text, language, context, register, translation });

  const upstream = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.5 },
    }),
  });

  if (!upstream.ok) {
    const detail = await upstream.text().catch(() => '');
    return res.status(502).json({ error: 'Gemini request failed', detail });
  }

  const payload = await upstream.json();
  const explanation = payload?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? '';
  return res.status(200).json({ explanation });
}
