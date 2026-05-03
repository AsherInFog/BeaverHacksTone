export function ttsSupported() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

function loadVoices() {
  return new Promise((resolve) => {
    const synth = window.speechSynthesis;
    let voices = synth.getVoices();
    if (voices.length > 0) {
      resolve(voices);
      return;
    }
    const handler = () => {
      voices = synth.getVoices();
      synth.removeEventListener('voiceschanged', handler);
      resolve(voices);
    };
    synth.addEventListener('voiceschanged', handler);
    setTimeout(() => {
      synth.removeEventListener('voiceschanged', handler);
      resolve(synth.getVoices());
    }, 1500);
  });
}

function pickVoice(language, voices) {
  const prefix = language === 'ja' ? 'ja' : 'ko';
  const langVoices = voices.filter((v) => v.lang.toLowerCase().startsWith(prefix));
  if (langVoices.length === 0) return null;

  const preferences = [
    (v) => /google/i.test(v.name),
    (v) => /neural/i.test(v.name),
    (v) => /premium|enhanced/i.test(v.name),
    (v) => v.name === 'Kyoko' || v.name === 'Otoya',
    (v) => v.name === 'Yuna',
    (v) => !v.localService,
    () => true,
  ];

  for (const pref of preferences) {
    const match = langVoices.find(pref);
    if (match) return match;
  }
  return langVoices[0];
}

export async function speak(text, language) {
  if (!ttsSupported() || !text) return { ok: false, reason: 'unsupported' };

  const synth = window.speechSynthesis;
  synth.cancel();

  const voices = await loadVoices();
  const voice = pickVoice(language, voices);

  if (!voice) {
    return {
      ok: false,
      reason: 'no-voice',
      message: `No ${language === 'ja' ? 'Japanese' : 'Korean'} voice installed in this browser.`,
    };
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = voice;
  utterance.lang = voice.lang;
  utterance.rate = 0.9;
  utterance.pitch = 1;
  synth.speak(utterance);
  return { ok: true, voice: voice.name };
}

export function stopSpeaking() {
  if (!ttsSupported()) return;
  window.speechSynthesis.cancel();
}
