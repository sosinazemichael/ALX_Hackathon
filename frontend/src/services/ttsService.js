// Browser SpeechSynthesis fallback. A backend TTS (returns real audio, enables .mp3 download) is a TODO: POST /api/tts.
export const synth = typeof window !== 'undefined' ? window.speechSynthesis : null
export const voicesFor = (lang) => (synth?.getVoices() || []).filter((v) => v.lang.toLowerCase().startsWith(lang))
export function speak(text, { lang, rate, voice, onEnd, onBoundary }) {
  synth.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = lang; u.rate = rate; if (voice) u.voice = voice
  u.onend = onEnd; u.onerror = onEnd; u.onboundary = (e) => onBoundary?.(e.charIndex)
  synth.speak(u)
  return u
}
