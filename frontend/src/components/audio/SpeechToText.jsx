import { useRef, useState } from 'react'
import { Card, Btn, Icon, Notice, Select, Switch, fmtTime, fmtSize } from '../common'
import useAudioRecorder from '../../hooks/useAudioRecorder'
import { transcribe } from '../../services/speechService'
import { translate } from '../../services/translationService'

export default function SpeechToText() {
  const rec = useAudioRecorder()
  const [lang, setLang] = useState('am')
  const [trans, setTrans] = useState(false)
  const [upload, setUpload] = useState(null)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const [text, setText] = useState('')
  const [tText, setTText] = useState('')
  const [copied, setCopied] = useState(false)
  const [size, setSize] = useState(1.25)
  const input = useRef(null)
  const source = upload || rec.blob
  const srcUrl = upload ? URL.createObjectURL(upload) : rec.url

  const pickAudio = (f) => {
    if (!f) return
    if (!f.type.startsWith('audio/') && !/\.(mp3|wav|m4a|ogg|webm)$/i.test(f.name)) return setErr('Please choose an audio file (MP3, WAV, M4A, OGG or WebM).')
    setErr(''); setUpload(f); setText(''); setTText('')
  }
  const run = async () => {
    setBusy(true); setErr(''); setText(''); setTText('')
    try {
      const t = await transcribe(source, lang); setText(t)
      if (trans) setTText(await translate(t, lang, lang === 'am' ? 'en' : 'am'))
    } catch (e) {
      setErr(e.code === 'BACKEND_UNAVAILABLE'
        ? 'Transcription is not available yet: no speech-recognition service is connected. Your audio was not sent anywhere and no text has been generated.'
        : 'Transcription failed. ' + e.message)
    } finally { setBusy(false) }
  }
  const copy = async () => { await navigator.clipboard.writeText([text, tText].filter(Boolean).join('\n\n')); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  const live = rec.state === 'recording'
  return (
    <div role="tabpanel" id="panel-speech" aria-labelledby="tab-speech" className="flex flex-col gap-space-lg">
      <Card aria-label="Language settings" className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <Select id="spoken-lang" label="Spoken language" value={lang} onChange={(e) => setLang(e.target.value)}>
          <option value="am">Amharic (አማርኛ)</option><option value="en">English</option>
        </Select>
        <div className="flex items-center gap-space-md bg-surface-container-low px-space-md py-space-sm rounded-lg self-start md:self-auto">
          <span className="font-label-md text-label-md font-bold">Also translate to {lang === 'am' ? 'English' : 'Amharic'}</span>
          <Switch on={trans} onChange={setTrans} label="Translate the transcription" />
        </div>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        <div className="lg:col-span-5 flex flex-col gap-space-md">
          <Card className="flex flex-col items-center text-center gap-space-md">
            <h2 className="font-headline-sm text-headline-sm font-semibold">Record your voice</h2>
            <div className="relative flex items-center justify-center h-32 w-32">
              {live && <span aria-hidden="true" className="absolute w-28 h-28 rounded-full bg-secondary-fixed opacity-75 animate-ping" />}
              <button type="button" onClick={live || rec.state === 'paused' ? rec.stop : rec.start} disabled={!rec.supported}
                aria-label={live || rec.state === 'paused' ? 'Stop recording' : 'Start recording'}
                className="relative z-10 w-20 h-20 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg hover:bg-primary-container disabled:opacity-50">
                <Icon n={live || rec.state === 'paused' ? 'stop' : 'mic'} size={36} />
              </button>
            </div>
            <p role="status" aria-live="polite" className="font-label-md text-label-md font-bold">
              {live ? `Recording… ${fmtTime(rec.seconds)}` : rec.state === 'paused' ? `Paused ${fmtTime(rec.seconds)}` : rec.state === 'stopped' ? `Recorded ${fmtTime(rec.seconds)}` : 'Ready to record'}
            </p>
            {(live || rec.state === 'paused') && <Btn kind="secondary" onClick={live ? rec.pause : rec.resume}><Icon n={live ? 'pause' : 'play_arrow'} size={18} />{live ? 'Pause' : 'Resume'}</Btn>}
            {!rec.supported && <Notice kind="error">This browser does not support microphone recording.</Notice>}
            {rec.error && <Notice kind="error">{rec.error}</Notice>}
            <div className="w-full border-t border-surface-container pt-space-md">
              <Btn kind="secondary" onClick={() => input.current.click()}><Icon n="audio_file" size={18} />{upload ? 'Replace audio file' : 'Upload audio file'}</Btn>
              <input ref={input} type="file" className="sr-only" tabIndex={-1} aria-label="Choose an audio file" accept="audio/*,.mp3,.wav,.m4a" onChange={(e) => pickAudio(e.target.files[0])} />
              {upload && (
                <div className="mt-space-sm flex items-center justify-between gap-space-sm bg-surface-container p-space-sm rounded-lg text-left">
                  <span className="truncate font-label-md text-label-md">{upload.name} <span className="text-on-surface-variant">· {fmtSize(upload.size)}</span></span>
                  <Btn kind="secondary" aria-label={`Remove ${upload.name}`} onClick={() => { setUpload(null); input.current.value = '' }} className="!px-space-sm"><Icon n="close" /></Btn>
                </div>
              )}
            </div>
            {source && <audio controls src={srcUrl} className="w-full" aria-label="Play back your audio" />}
          </Card>
          <button type="button" onClick={run} disabled={!source || busy} className="w-full h-14 rounded-xl bg-primary text-on-primary font-headline-sm text-headline-sm font-semibold flex items-center justify-center gap-space-sm shadow-md hover:bg-surface-tint disabled:opacity-50">
            <Icon n="subtitles" size={24} />{busy ? 'Transcribing…' : 'Transcribe audio'}
          </button>
        </div>
        <Card className="lg:col-span-7 flex flex-col gap-space-md" aria-label="Transcription">
          <div className="flex flex-wrap items-center justify-between gap-space-sm pb-space-sm border-b border-surface-container">
            <h2 className="font-headline-sm text-headline-sm font-semibold">Transcription</h2>
            <div role="group" aria-label="Text size" className="flex gap-1 bg-surface-container rounded-lg p-1">
              {[['Normal', 1], ['Large', 1.25], ['XL', 1.6]].map(([l, v]) => <button key={l} type="button" aria-pressed={size === v} onClick={() => setSize(v)} className={`px-space-sm min-h-[44px] rounded font-label-sm text-label-sm ${size === v ? 'bg-primary-container text-on-primary font-bold' : ''}`}>{l}</button>)}
            </div>
          </div>
          {busy && <Notice>Transcribing your audio…</Notice>}
          {err && <Notice kind="error">{err}</Notice>}
          {text ? (
            <div className={`grid gap-space-md ${tText ? 'md:grid-cols-2' : ''}`} style={{ fontSize: `${size}rem` }}>
              <div lang={lang} className="p-space-md rounded-lg bg-surface-container-low"><p className="font-label-sm text-label-sm uppercase font-bold text-secondary mb-space-xs">Transcript</p>{text}</div>
              {tText && <div lang={lang === 'am' ? 'en' : 'am'} className="p-space-md rounded-lg bg-surface-container-low"><p className="font-label-sm text-label-sm uppercase font-bold text-secondary mb-space-xs">Translation</p>{tText}</div>}
            </div>
          ) : !busy && !err && <p className="text-on-surface-variant font-body-md py-space-xl text-center">Record or upload audio, then choose &quot;Transcribe audio&quot;. The text will appear here.</p>}
          <div className="flex flex-wrap gap-space-sm">
            <Btn kind="secondary" onClick={copy} disabled={!text}><Icon n={copied ? 'check' : 'content_copy'} size={18} />{copied ? 'Copied' : 'Copy text'}</Btn>
            <Btn kind="secondary" onClick={() => { setText(''); setTText(''); setErr(''); setUpload(null); rec.reset() }} disabled={!source && !text}><Icon n="delete" size={18} />Clear</Btn>
          </div>
        </Card>
      </div>
    </div>
  )
}
