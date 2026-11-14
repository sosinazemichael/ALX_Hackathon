import * as pdfjs from 'pdfjs-dist'
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import { apiPost, ApiError } from './api'
pdfjs.GlobalWorkerOptions.workerSrc = workerUrl
export const MAX_BYTES = 25 * 1024 * 1024
export const ACCEPT = ['application/pdf', 'image/png', 'image/jpeg']
export function validateDocument(file) {
  if (!ACCEPT.includes(file.type)) return 'Unsupported format. Please choose a PDF, PNG, JPG or JPEG file.'
  if (file.size > MAX_BYTES) return 'This file is larger than 25 MB.'
  return null
}
// Text-based PDFs are read locally with PDF.js. Scans/images need OCR.
export async function extractDocument(file, lang) {
  if (file.type === 'application/pdf') {
    const pdf = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise
    let text = ''
    for (let i = 1; i <= pdf.numPages; i++) {
      const c = await (await pdf.getPage(i)).getTextContent()
      text += c.items.map((t) => t.str).join(' ') + '\n\n'
    }
    if (text.trim()) return { text: text.trim(), pages: pdf.numPages, method: 'PDF text layer (PDF.js)' }
  }
  // TODO: scanned PDFs and images -> POST /api/ocr (Express -> FastAPI/Tesseract). Not implemented yet.
  const fd = new FormData(); fd.append('file', file); fd.append('lang', lang)
  const res = await apiPost('/api/ocr', fd)
  const j = await res.json()
  return { text: j.text, pages: j.pages ?? 1, method: 'Backend OCR' }
}
export { ApiError }
