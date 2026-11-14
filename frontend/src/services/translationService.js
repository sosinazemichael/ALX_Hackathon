import { apiPost } from './api'
// TODO: connect to NLLB-200 via the API gateway. Expected: POST /api/translate {text, source, target} -> {text}
export async function translate(text, source, target) {
  const fd = new FormData(); fd.append('text', text); fd.append('source', source); fd.append('target', target)
  return (await (await apiPost('/api/translate', fd)).json()).text
}
