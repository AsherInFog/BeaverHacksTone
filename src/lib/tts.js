export function speak(text, language) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return false;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = language === 'ja' ? 'ja-JP' : 'ko-KR';
  utterance.rate = 0.9;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
  return true;
}

export function stopSpeaking() {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
}

export function ttsSupported() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}
