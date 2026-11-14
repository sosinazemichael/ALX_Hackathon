// Central API layer. Nothing here assumes a backend exists: with VITE_API_URL unset, every call rejects with code 'BACKEND_UNAVAILABLE'.
export const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
export class ApiError extends Error { constructor(code, message) { super(message); this.code = code } }
export async function apiPost(path, body) {
  if (!API_URL) throw new ApiError('BACKEND_UNAVAILABLE', 'No backend is configured (VITE_API_URL is empty).')
  let res
  try { res = await fetch(`${API_URL}${path}`, { method: 'POST', body }) }
  catch { throw new ApiError('BACKEND_UNAVAILABLE', 'The Nooraa service could not be reached.') }
  if (!res.ok) throw new ApiError('REQUEST_FAILED', `The service returned an error (${res.status}).`)
  return res
}
