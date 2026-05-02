const SHARED_INSTRUCTIONS = `Return ONLY a JSON object with this exact shape:
{
  "casual":   { "translation": "...", "romanization": "...", "note": "..." },
  "polite":   { "translation": "...", "romanization": "...", "note": "..." },
  "formal":   { "translation": "...", "romanization": "...", "note": "..." },
  "intimate": { "translation": "...", "romanization": "...", "note": "..." }
}
Do not wrap in code fences. Do not add commentary. Each "note" is a one-sentence English description of when to use that register.`;

const JA_PROMPT = ({ text, context }) => `You are a Japanese translator producing four register-aware translations.

Registers:
- casual (タメ口): close friends, peers. Plain forms, no です/ます.
- polite (ですます): default polite, coworkers, acquaintances.
- formal (敬語): business, customers, superiors. Use sonkeigo/kenjougo.
- intimate: partners, very close family. Soft, warm phrasing.

English input: """${text}"""
${context ? `Situation: ${context}` : ''}

For each register provide:
- translation: Japanese (kanji + kana as natural)
- romanization: Hepburn romaji
- note: one sentence in English on when to use this

${SHARED_INSTRUCTIONS}`;

const KO_PROMPT = ({ text, context }) => `You are a Korean translator producing four register-aware translations.

Registers:
- casual (반말): close friends, younger people you're close with.
- polite (해요체): default polite, most everyday situations.
- formal (합쇼체): business, formal settings, announcements.
- intimate: partners, close family. Softer than 반말, warmer tone.

English input: """${text}"""
${context ? `Situation: ${context}` : ''}

For each register provide:
- translation: Hangul
- romanization: Revised Romanization
- note: one sentence in English on when to use this

${SHARED_INSTRUCTIONS}`;

export function buildPrompt({ text, language, context }) {
  if (language === 'ja') return JA_PROMPT({ text, context });
  if (language === 'ko') return KO_PROMPT({ text, context });
  throw new Error(`Unsupported language: ${language}`);
}
