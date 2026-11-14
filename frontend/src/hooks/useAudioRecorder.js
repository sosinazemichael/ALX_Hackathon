import { useCallback, useEffect, useRef, useState } from 'react'
export default function useAudioRecorder() {
  const [state, setState] = useState('idle') // idle | recording | paused | stopped
  const [blob, setBlob] = useState(null); const [url, setUrl] = useState(null)
  const [seconds, setSeconds] = useState(0); const [error, setError] = useState('')
  const rec = useRef(null); const chunks = useRef([]); const timer = useRef(null)
  const supported = typeof MediaRecorder !== 'undefined' && !!navigator.mediaDevices?.getUserMedia
  const tick = () => { clearInterval(timer.current); timer.current = setInterval(() => setSeconds((s) => s + 1), 1000) }
  const start = useCallback(async () => {
    setError('')
    if (!supported) return setError('Recording is not supported in this browser.')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const r = new MediaRecorder(stream); chunks.current = []
      r.ondataavailable = (e) => e.data.size && chunks.current.push(e.data)
      r.onstop = () => {
        stream.getTracks().forEach((t) => t.stop()); clearInterval(timer.current)
        const b = new Blob(chunks.current, { type: r.mimeType || 'audio/webm' })
        setBlob(b); setUrl(URL.createObjectURL(b)); setState('stopped')
      }
      rec.current = r; setSeconds(0); setBlob(null); setUrl(null); r.start(); setState('recording'); tick()
    } catch (e) {
      setError(e.name === 'NotAllowedError' ? 'Microphone permission was denied. Allow access in your browser settings and try again.' : 'No microphone could be started.')
    }
  }, [supported])
  const pause = () => { rec.current?.pause(); clearInterval(timer.current); setState('paused') }
  const resume = () => { rec.current?.resume(); tick(); setState('recording') }
  const stop = () => rec.current?.state !== 'inactive' && rec.current?.stop()
  const reset = () => { setBlob(null); setUrl(null); setSeconds(0); setState('idle') }
  useEffect(() => () => { clearInterval(timer.current); rec.current?.state === 'recording' && rec.current.stop() }, [])
  return { state, blob, url, seconds, error, supported, start, pause, resume, stop, reset, setBlob, setUrl }
}
