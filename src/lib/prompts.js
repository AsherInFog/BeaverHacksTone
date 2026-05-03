const JA_SHAPE = `Return ONLY a JSON object with this exact shape (no code fences, no commentary):
{
  "casual":   { "translation": "...", "kana": "...", "romanization": "...", "note": "..." },
  "polite":   { "translation": "...", "kana": "...", "romanization": "...", "note": "..." },
  "formal":   { "translation": "...", "kana": "...", "romanization": "...", "note": "..." },
  "intimate": { "translation": "...", "kana": "...", "romanization": "...", "note": "..." }
}`;

const KO_SHAPE = `Return ONLY a JSON object with this exact shape (no code fences, no commentary):
{
  "casual":   { "translation": "...", "romanization": "...", "note": "..." },
  "polite":   { "translation": "...", "romanization": "...", "note": "..." },
  "formal":   { "translation": "...", "romanization": "...", "note": "..." },
  "intimate": { "translation": "...", "romanization": "...", "note": "..." }
}`;

const JA_PROMPT = ({ text, context }) => `You are a Japanese translator producing four register-aware translations.

Registers:
- casual (タメ口): close friends, peers. Plain forms, no です/ます.
- polite (ですます): default polite, coworkers, acquaintances.
- formal (敬語): business, customers, superiors. Use sonkeigo/kenjougo.
- intimate: partners, very close family. Soft, warm phrasing.

English input: """${text}"""
${context ? `Situation: ${context}\n\nIMPORTANT: Use the situation to refine word choice, tone, and phrasing WITHIN each register. The grammatical formality level of each register stays fixed, but vocabulary, particles, and softeners should reflect the situation.` : ''}

For each register, provide:
- translation: Japanese using natural kanji + kana
- kana: the SAME translation rewritten using ONLY hiragana (and katakana for foreign words). No kanji at all. This is used for text-to-speech and must be the exact phonetic reading of the translation field.
- romanization: Hepburn romaji
- note: one sentence in English on when to use this register

${JA_SHAPE}`;

const KO_PROMPT = ({ text, context }) => `You are a Korean translator producing four register-aware translations.

Registers:
- casual (반말): close friends, younger people you're close with.
- polite (해요체): default polite, most everyday situations.
- formal (격식): business, formal settings, announcements.
- intimate: partners, close family. Softer than 반말, warmer tone.

English input: """${text}"""
${context ? `Situation: ${context}\n\nIMPORTANT: Use the situation to refine word choice, tone, and phrasing WITHIN each register. The grammatical formality level of each register stays fixed, but vocabulary and softeners should reflect the situation.` : ''}

For each register, provide:
- translation: Hangul
- romanization: Revised Romanization
- note: one sentence in English on when to use this register

${KO_SHAPE}`;

export function buildPrompt({ text, language, context }) {
  if (language === 'ja') return JA_PROMPT({ text, context });
  if (language === 'ko') return KO_PROMPT({ text, context });
  throw new Error(`Unsupported language: ${language}`);
}

const REGISTER_LABELS = {
  ja: {
    casual: 'casual (タメ口)',
    polite: 'polite (です・ます)',
    formal: 'formal (敬語)',
    intimate: 'intimate',
  },
  ko: {
    casual: 'casual (반말)',
    polite: 'polite (해요체)',
    formal: 'formal (격식)',
    intimate: 'intimate',
  },
};

export function buildExplainPrompt({ text, language, context, register, translation }) {
  const langName = language === 'ja' ? 'Japanese' : 'Korean';
  const regLabel = REGISTER_LABELS[language]?.[register] || register;
  return `You are a ${langName} language tutor explaining a translation choice to a learner.

English source: """${text}"""
${context ? `Situation: ${context}` : ''}
Register: ${regLabel}
${langName} translation: ${translation}

In 2–3 sentences of plain English prose, explain why this specific phrasing fits the register and situation. Reference concrete grammar, vocabulary, or honorific choices (specific verb endings, particles, word selections) that signal the register. Do not return JSON. Do not greet the user. Just the explanation.`;
}
