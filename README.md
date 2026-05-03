# Tone — Register-Aware Translation

> Translate English into Japanese or Korean across four tonal registers,
> with optional situational context. Built for [BeaverHacks 2026](https://beaverhacks.org)
> (Beginner track, May 2–3, Oregon State University).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/AsherInFog/BeaverHacksTone&env=GEMINI_API_KEY&envDescription=Free%20Gemini%20API%20key%20from%20Google%20AI%20Studio&envLink=https://aistudio.google.com/apikey)

---

## What it does

Existing translators give you one answer. Real Japanese and Korean grammar
encodes _who you're talking to_ — the same sentence has at least four
genuinely different translations depending on social context.

**Tone** gives you all four at once:

- **Casual** — close friends, peers (タメ口 / 반말)
- **Polite** — coworkers, acquaintances, default polite (です・ます / 해요체)
- **Formal** — business, customers, superiors (敬語 / 격식)
- **Intimate** — partners, very close family

Plus:

- **Situational context** — type "texting my girlfriend" or "emailing my professor" and the model refines word choice within each register
- **Why?** — ask for a 2–3 sentence linguistic explanation of any register's translation
- **🔊 Speak** — text-to-speech for both languages (uses kana-only for Japanese to avoid kanji misreadings)
- **Save folders** — organize translations by relationship (e.g. "Teacher", "Partner")
- **History** — past translations persist across reloads

## Tech

- **Frontend:** React 18 (Vite) + Tailwind CSS
- **Backend:** Vercel serverless functions (`/api/translate`, `/api/explain`)
- **AI:** Google Gemini 2.5 Flash
- **Storage:** Browser `localStorage` only — no database, no accounts
- **TTS:** Browser Web Speech API (free, no third-party service)

## Deploy your own copy

This project is fork-and-deploy. No database to provision, no auth to configure.
Total setup time: ~5 minutes.

### Option 1 — One-click Vercel deploy

1. Click the **Deploy with Vercel** button above
2. Sign in / create a Vercel account (free Hobby tier is fine)
3. Get a free Gemini API key at [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
4. Paste the key when Vercel prompts for `GEMINI_API_KEY`
5. Wait ~90 seconds for the build — your copy is live at `https://<your-project>.vercel.app`

### Option 2 — Manual fork

```bash
git clone https://github.com/AsherInFog/BeaverHacksTone.git
cd BeaverHacksTone
npm install
cp .env.example .env
# edit .env and paste your Gemini API key

# run with the serverless functions:
npx vercel dev          # http://localhost:3000

# or just the frontend (translate button will 404):
npm run dev             # http://localhost:5173
```

To deploy: push to your own GitHub repo, connect it in the Vercel dashboard,
add `GEMINI_API_KEY` as an env var (Production + Preview), redeploy.

## Project structure

```
api/
  translate.js          # POST /api/translate → 4 register translations
  explain.js            # POST /api/explain   → linguistic rationale per card
src/
  App.jsx               # state owner, layout, handlers
  components/           # Header, InputPanel, ResultsGrid, RegisterCard,
                        # Sidebar, CollectionModal, Toast, SaveMenu, SkeletonCard
  lib/
    api.js              # fetch wrapper for both endpoints
    prompts.js          # Gemini prompt templates (JA + KO + explain)
    registers.js        # register metadata (label, sublabel, color)
    storage.js          # localStorage helpers
    tts.js              # Web Speech API helper with voice selection
```

## Costs

- **Vercel Hobby:** free
- **Gemini 2.5 Flash:** free tier covers thousands of requests/month
- **Total to run for personal use:** $0

## AI disclosure

This project was built during the BeaverHacks 2026 hackathon (24-hour window).
AI tools used:

- **Claude Code** — pair-programmed scaffolding, component implementation, and refactoring. Every line is reviewed and explainable by the human committing it.
- **Claude Design** — produced the initial visual mockup (warm parchment / vermillion ink palette, Noto Serif typography). Translated to React + CSS variables by hand.
- **Gemini 2.5 Flash** — runtime translation engine. The prompt templates in `src/lib/prompts.js` are the project's core IP.

The prompts were authored and iterated by the team, with Korean and Japanese prompts verified by a native speaker.

## License

MIT — see [LICENSE](LICENSE).

## Credits

- Built by Asher (frontend, API integration, Japanese prompts) and a partner who is a Korean native speaker (Korean prompts, linguistic QA, design polish)
- Hackathon: BeaverHacks 2026 @ Oregon State University, Beginner track
