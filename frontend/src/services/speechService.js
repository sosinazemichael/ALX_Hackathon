import { apiPost } from './api'
// TODO: connect to Whisper (or another multilingual ASR) via the API gateway. Expected: POST /api/transcribe {audio, lang} -> {text}
export async function transcribe(blob, lang) {
  const fd = new FormData(); fd.append('audio', blob, blob.name || 'recording.webm'); fd.append('lang', lang)
  return (await (await apiPost('/api/transcribe', fd)).json()).text
}
