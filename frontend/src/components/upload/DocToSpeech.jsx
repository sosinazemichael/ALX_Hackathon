import { useEffect, useRef, useState } from 'react'
import { Card, Btn, Icon, Notice, Select, Switch, fmtSize } from '../common'
import { extractDocument, validateDocument } from '../../services/documentService'
import { translate } from '../../services/translationService'
import { synth, voicesFor, speak } from '../../services/ttsService'

const SPEEDS = [0.75, 1, 1.25, 1.5]
const LANG = { en: 'English', am: 'Amharic (አማርኛ)' }
export default function DocToSpeech() {
  const [lang, setLang] = useState('en')
  const [file, setFile] = useState(null)
  const [busy, setBusy] = useState(false)
  const [text, setText] = useState('')
  const [info, setInfo] = useState('')
  const [err, setErr] = useState('')
  const [drag, setDrag] = useState(false)
  const [trans, setTrans] = useState(false)
  const [translated, setTranslated] = useState('')
  const [rate, setRate] = useState(1)
  const [play, setPlay] = useState('idle') // idle | playing | paused
  const [pos, setPos] = useState(0)
  const [voices, setVoices] = useState([])
  const [voiceIdx, setVoiceIdx] = useState(0)
  const [size, setSize] = useState(1.0625)
  const input = useRef(null)

  useEffect(() => {
    if (!synth) return
    const load = () => { setVoices(voicesFor(lang)); setVoiceIdx(0) }
    load(); synth.addEventListener('voiceschanged', load)
    return () => synth.removeEventListener('voiceschanged', load)
  }, [lang])
  useEffect(() => () => synth?.cancel(), [])

  const pick = async (f) => {
    setErr(''); setText(''); setTranslated(''); setInfo(''); synth?.cancel(); setPlay('idle')
    if (!f) return
    const bad = validateDocument(f)
    if (bad) return setErr(bad)
    setFile(f); setBusy(true)
    try { const r = await extractDocument(f, lang); setText(r.text); setInfo(`${r.pages} page(s) · ${r.method}`) }
    catch (e) {
      setErr(e.code === 'BACKEND_UNAVAILABLE'
        ? 'No readable text layer was found, so this file needs OCR. OCR is not connected yet. You can type or paste the text below instead.'
        : 'Could not read this file. ' + e.message)
    } finally { setBusy(false) }
  }
  const remove = () => { setFile(null); setText(''); setErr(''); setInfo(''); synth?.cancel(); setPlay('idle'); if (input.current) input.current.value = '' }

  const doTranslate = async () => {
    setErr('')
    try { setTranslated(await translate(text, lang, lang === 'en' ? 'am' : 'en')) }
    catch (e) { setErr('Translation is unavailable: ' + e.message) }
  }
  useEffect(() => { if (trans && text && !translated) doTranslate() }, [trans]) // eslint-disable-line

  const spoken = trans && translated ? translated : text
  const spokenLang = trans && translated ? (lang === 'en' ? 'am' : 'en') : lang
  const hasVoice = !!synth && voicesFor(spokenLang).length > 0
  const start = () => {
    if (!hasVoice) return setErr(`This browser has no ${spokenLang === 'am' ? 'Amharic' : 'English'} voice installed, so it cannot read this aloud. A backend TTS service is needed for this language.`)
    setErr(''); setPos(0)
    speak(spoken, { lang: spokenLang, rate, voice: voicesFor(spokenLang)[voiceIdx], onEnd: () => { setPlay('idle'); setPos(0) }, onBoundary: setPos })
    setPlay('playing')
  }
  const toggle = () => {
    if (play === 'idle') return start()
    if (play === 'playing') { synth.pause(); setPlay('paused') } else { synth.resume(); setPlay('playing') }
  }
  const changeRate = (r) => { setRate(r); if (play !== 'idle') { synth.cancel(); setPlay('idle') } } // SpeechSynthesis cannot change rate mid-utterance
  const pct = spoken ? Math.round((pos / spoken.length) * 100) : 0

  return (
    <div role="tabpanel" id="panel-document" aria-labelledby="tab-document" className="flex flex-col gap-space-lg">
      <Card aria-label="Language settings" className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <div className="flex flex-wrap items-end gap-space-md">
          <Select id="src-lang" label="Source language" value={lang} onChange={(e) => { setLang(e.target.value); setTranslated('') }}>
            {Object.entries(LANG).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </Select>
          <Select id="voice" label="Voice (this browser)" value={voiceIdx} onChange={(e) => setVoiceIdx(+e.target.value)} disabled={!voices.length}>
            {voices.length ? voices.map((v, i) => <option key={v.name} value={i}>{v.name}</option>) : <option>No {LANG[lang].split(' ')[0]} voice installed</option>}
          </Select>
        </div>
        <div className="flex items-center gap-space-md bg-surface-container-low px-space-md py-space-sm rounded-lg self-start md:self-auto">
          <div className="flex flex-col">
            <span id="tr-label" className="font-label-md text-label-md font-bold">Translate to {lang === 'en' ? 'Amharic' : 'English'}</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Output language: {lang === 'en' ? 'አማርኛ' : 'English'}</span>
          </div>
          <Switch on={trans} onChange={setTrans} label="Translate extracted text" />
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        <div className="lg:col-span-5 flex flex-col gap-space-md">
          <Card className="flex flex-col items-center text-center">
            <div onDragOver={(e) => { e.preventDefault(); setDrag(true) }} onDragLeave={() => setDrag(false)}
              onDrop={(e) => { e.preventDefault(); setDrag(false); pick(e.dataTransfer.files[0]) }}
              className={`w-full rounded-xl p-space-xl flex flex-col items-center border-2 border-dashed ${drag ? 'border-primary bg-surface-container' : 'border-transparent bg-surface-container-low'}`}>
              <div className="w-16 h-16 rounded-full bg-secondary-fixed flex items-center justify-center mb-space-sm"><Icon n="upload_file" size={32} /></div>
              <p className="font-headline-sm text-headline-sm font-semibold mb-space-xs">Let your documents speak.</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md max-w-xs">Drag and drop a PDF or image here.</p>
              <Btn onClick={() => input.current.click()}><Icon n="folder_open" size={18} />{file ? 'Replace file' : 'Browse files'}</Btn>
              <input ref={input} type="file" className="sr-only" tabIndex={-1} aria-label="Choose a document" accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg" onChange={(e) => pick(e.target.files[0])} />
              <p className="font-label-sm text-label-sm text-on-surface-variant mt-space-md">PDF, PNG, JPG or JPEG, up to 25 MB</p>
            </div>
            {file && (
              <div className="w-full mt-space-md bg-surface-container p-space-sm rounded-lg flex items-center justify-between gap-space-sm">
                <div className="flex items-center gap-space-sm min-w-0 text-left">
                  <Icon n="description" size={24} />
                  <div className="truncate"><p className="font-label-md text-label-md font-bold truncate">{file.name}</p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">{fmtSize(file.size)}{info && ` · ${info}`}</p></div>
                </div>
                <Btn kind="secondary" onClick={remove} aria-label={`Remove ${file.name}`} className="!px-space-sm"><Icon n="close" /></Btn>
              </div>
            )}
            {busy && <div className="mt-space-md w-full"><Notice>Reading your document…</Notice></div>}
            {err && <div className="mt-space-md w-full text-left"><Notice kind="error">{err}</Notice></div>}
          </Card>
          <button type="button" onClick={toggle} disabled={!spoken.trim()} className="w-full h-14 rounded-xl bg-primary text-on-primary font-headline-sm text-headline-sm font-semibold flex items-center justify-center gap-space-sm shadow-md hover:bg-surface-tint disabled:opacity-50">
            <Icon n={play === 'playing' ? 'pause_circle' : 'play_circle'} size={24} />
            {play === 'idle' ? 'Convert Document to Speech' : play === 'playing' ? 'Pause' : 'Resume'}
          </button>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-space-md">
          <Card>
            <div className="flex flex-wrap items-center justify-between gap-space-sm pb-space-sm border-b border-surface-container mb-space-md">
              <h2 className="font-headline-sm text-headline-sm font-semibold flex items-center gap-space-sm"><Icon n="auto_stories" size={22} />Extracted Reading Slate</h2>
              <span className="font-label-sm text-label-sm px-space-sm py-space-xs rounded bg-surface-container-high">{text.trim() ? text.trim().split(/\s+/).length : 0} words</span>
            </div>
            <label htmlFor="slate" className="sr-only">Extracted text (editable)</label>
            <textarea id="slate" value={text} onChange={(e) => { setText(e.target.value); setTranslated('') }} lang={lang} rows={10}
              placeholder="Extracted text appears here. You can also type or paste text to hear it read aloud."
              style={{ fontSize: `${size}rem` }} className="w-full p-space-md rounded-lg bg-surface-container-low border border-outline-variant font-body-md resize-y leading-relaxed" />
            {translated && <div className="mt-space-md p-space-md rounded-lg bg-surface-container-low"><p className="font-label-sm text-label-sm uppercase font-bold text-secondary mb-space-xs">Translation</p><p lang={lang === 'en' ? 'am' : 'en'} style={{ fontSize: `${size}rem` }}>{translated}</p></div>}
            <div className="flex items-center justify-end gap-space-sm mt-space-md">
              <span className="font-label-md text-label-md">Text size</span>
              <Btn kind="secondary" aria-label="Decrease text size" onClick={() => setSize((s) => Math.max(0.875, s - 0.125))} className="!px-space-sm"><Icon n="remove" /></Btn>
              <Btn kind="secondary" aria-label="Increase text size" onClick={() => setSize((s) => Math.min(2, s + 0.125))} className="!px-space-sm"><Icon n="add" /></Btn>
            </div>
          </Card>
          <Card aria-label="Audio player">
            <div role="progressbar" aria-label="Playback progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} className="relative w-full h-3 bg-surface-container rounded-full overflow-hidden">
              <div className="h-full bg-secondary-container rounded-full transition-all" style={{ width: `${pct}%` }} />
            </div>
            <div className="flex flex-wrap items-center gap-space-md mt-space-md">
              <button type="button" onClick={toggle} disabled={!spoken.trim()} aria-label={play === 'playing' ? 'Pause' : play === 'paused' ? 'Resume' : 'Play'} className="w-14 h-14 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-md hover:bg-primary disabled:opacity-50">
                <Icon n={play === 'playing' ? 'pause' : 'play_arrow'} size={32} />
              </button>
              <div role="group" aria-label="Playback speed" className="flex bg-surface-container rounded-lg p-1">
                {SPEEDS.map((s) => <button key={s} type="button" aria-pressed={rate === s} onClick={() => changeRate(s)} className={`px-space-sm min-h-[44px] font-label-sm text-label-sm rounded ${rate === s ? 'bg-primary-container text-on-primary font-bold' : 'text-on-surface-variant'}`}>{s}x</button>)}
              </div>
              <Btn kind="secondary" disabled title="Needs a backend TTS service that returns an audio file"><Icon n="download" size={18} />Audio (.mp3) unavailable</Btn>
            </div>
            <p className="mt-space-sm font-label-sm text-label-sm text-on-surface-variant">Playback uses your browser&apos;s built-in voices. Changing speed restarts playback.</p>
          </Card>
        </div>
      </div>
    </div>
  )
}
