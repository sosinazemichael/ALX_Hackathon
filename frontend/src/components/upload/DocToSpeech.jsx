import { useEffect, useRef, useState } from 'react'
import { Card, Btn, Icon, Notice, Select, Switch, fmtSize } from '../common'

const SPEEDS = [0.75, 1, 1.25, 1.5]
const LANG = { en: 'English', am: 'Amharic (አማርኛ)' }
const BACKEND_URL = 'http://127.0.0.1:8000'

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
  const [audioUrl, setAudioUrl] = useState('')
  const [audioPlayer, setAudioPlayer] = useState(null)
  const [play, setPlay] = useState('idle') // idle | playing | paused
  const [size, setSize] = useState(1.0625)
  const input = useRef(null)

  const pick = async (f) => {
    setErr(''); setText(''); setTranslated(''); setInfo(''); setAudioUrl(''); setPlay('idle')
    if (!f) return
    
    // Validate file type
    const ext = f.name.split('.').pop().toLowerCase()
    if (!['pdf', 'docx', 'png', 'jpg', 'jpeg'].includes(ext)) {
      return setErr('Unsupported file format. Please upload PDF, DOCX, PNG, or JPG.')
    }

    setFile(f); setBusy(true)
    
    const formData = new FormData()
    formData.append('file', f)
    formData.append('target_language', lang === 'am' ? 'amh_Eth' : 'eng_Latn')

    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/process-document`, {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) throw new Error('Backend failed to process document.')

      const data = await res.json()
      setText(data.extracted_text || '')
      setTranslated(data.translated_text || '')
      setInfo(`Processed via FastAPI backend`)
      
      if (data.audio_url) {
        setAudioUrl(`${BACKEND_URL}${data.audio_url}`)
        setAudioPlayer(new Audio(`${BACKEND_URL}${data.audio_url}`))
      }
    } catch (e) {
      setErr('Could not process file via backend: ' + e.message)
    } finally { 
      setBusy(false) 
    }
  }

  const remove = () => { 
    setFile(null); setText(''); setErr(''); setInfo(''); setAudioUrl(''); setPlay('idle')
    if (audioPlayer) { audioPlayer.pause(); setAudioPlayer(null) }
    if (input.current) input.current.value = '' 
  }

  const start = () => {
    if (!audioPlayer && !audioUrl) return setErr('No audio file available to play.')
    setErr('')
    if (audioPlayer) {
      audioPlayer.playbackRate = rate
      audioPlayer.play()
      audioPlayer.onended = () => setPlay('idle')
      setPlay('playing')
    }
  }

  const toggle = () => {
    if (!audioPlayer) return start()
    if (play === 'playing') { 
      audioPlayer.pause(); setPlay('paused') 
    } else { 
      audioPlayer.play(); setPlay('playing') 
    }
  }

  const changeRate = (r) => { 
    setRate(r)
    if (audioPlayer) audioPlayer.playbackRate = r
  }

  return (
    <div role="tabpanel" id="panel-document" aria-labelledby="tab-document" className="flex flex-col gap-space-lg">
      <Card aria-label="Language settings" className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <div className="flex flex-wrap items-end gap-space-md">
          <Select id="src-lang" label="Target language" value={lang} onChange={(e) => { setLang(e.target.value); setTranslated('') }}>
            {Object.entries(LANG).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </Select>
        </div>
        <div className="flex items-center gap-space-md bg-surface-container-low px-space-md py-space-sm rounded-lg self-start md:self-auto">
          <div className="flex flex-col">
            <span id="tr-label" className="font-label-md text-label-md font-bold">FastAPI Backend Mode</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Connected to http://127.0.0.1:8000</span>
          </div>
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
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md max-w-xs">Drag and drop a PDF, DOCX, or image here.</p>
              <Btn onClick={() => input.current.click()}><Icon n="folder_open" size={18} />{file ? 'Replace file' : 'Browse files'}</Btn>
              <input ref={input} type="file" className="sr-only" tabIndex={-1} aria-label="Choose a document" accept=".pdf,.docx,.png,.jpg,.jpeg" onChange={(e) => pick(e.target.files[0])} />
              <p className="font-label-sm text-label-sm text-on-surface-variant mt-space-md">PDF, DOCX, PNG, JPG, up to 25 MB</p>
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
            {busy && <div className="mt-space-md w-full"><Notice>Processing document through backend AI…</Notice></div>}
            {err && <div className="mt-space-md w-full text-left"><Notice kind="error">{err}</Notice></div>}
          </Card>
          <button type="button" onClick={toggle} disabled={!audioUrl} className="w-full h-14 rounded-xl bg-primary text-on-primary font-headline-sm text-headline-sm font-semibold flex items-center justify-center gap-space-sm shadow-md hover:bg-surface-tint disabled:opacity-50">
            <Icon n={play === 'playing' ? 'pause_circle' : 'play_circle'} size={24} />
            {play === 'idle' ? 'Play Generated Audio' : play === 'playing' ? 'Pause' : 'Resume'}
          </button>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-space-md">
          <Card>
            <div className="flex flex-wrap items-center justify-between gap-space-sm pb-space-sm border-b border-surface-container mb-space-md">
              <h2 className="font-headline-sm text-headline-sm font-semibold flex items-center gap-space-sm"><Icon n="auto_stories" size={22} />Extracted Reading Slate</h2>
              <span className="font-label-sm text-label-sm px-space-sm py-space-xs rounded bg-surface-container-high">{text.trim() ? text.trim().split(/\s+/).length : 0} words</span>
            </div>
            <label htmlFor="slate" className="sr-only">Extracted text</label>
            <textarea id="slate" value={text} onChange={(e) => setText(e.target.value)} rows={10}
              placeholder="Extracted text from your document will appear here."
              style={{ fontSize: `${size}rem` }} className="w-full p-space-md rounded-lg bg-surface-container-low border border-outline-variant font-body-md resize-y leading-relaxed" />
            {translated && <div className="mt-space-md p-space-md rounded-lg bg-surface-container-low"><p className="font-label-sm text-label-sm uppercase font-bold text-secondary mb-space-xs">Processed / Translated Text</p><p style={{ fontSize: `${size}rem` }}>{translated}</p></div>}
            <div className="flex items-center justify-end gap-space-sm mt-space-md">
              <span className="font-label-md text-label-md">Text size</span>
              <Btn kind="secondary" aria-label="Decrease text size" onClick={() => setSize((s) => Math.max(0.875, s - 0.125))} className="!px-space-sm"><Icon n="remove" /></Btn>
              <Btn kind="secondary" aria-label="Increase text size" onClick={() => setSize((s) => Math.min(2, s + 0.125))} className="!px-space-sm"><Icon n="add" /></Btn>
            </div>
          </Card>
          <Card aria-label="Audio player">
            <div className="flex flex-wrap items-center gap-space-md mt-space-md">
              <button type="button" onClick={toggle} disabled={!audioUrl} aria-label={play === 'playing' ? 'Pause' : play === 'paused' ? 'Resume' : 'Play'} className="w-14 h-14 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-md hover:bg-primary disabled:opacity-50">
                <Icon n={play === 'playing' ? 'pause' : 'play_arrow'} size={32} />
              </button>
              <div role="group" aria-label="Playback speed" className="flex bg-surface-container rounded-lg p-1">
                {SPEEDS.map((s) => <button key={s} type="button" aria-pressed={rate === s} onClick={() => changeRate(s)} className={`px-space-sm min-h-[44px] font-label-sm text-label-sm rounded ${rate === s ? 'bg-primary-container text-on-primary font-bold' : 'text-on-surface-variant'}`}>{s}x</button>)}
              </div>
              {audioUrl ? (
                <a href={audioUrl} download className="inline-flex items-center gap-space-xs px-4 py-2 bg-secondary text-on-secondary rounded-lg font-bold text-sm">
                  <Icon n="download" size={18} /> Download Audio (.mp3)
                </a>
              ) : (
                <Btn kind="secondary" disabled><Icon n="download" size={18} />Audio (.mp3) unavailable</Btn>
              )}
            </div>
            <p className="mt-space-sm font-label-sm text-label-sm text-on-surface-variant">Audio is generated by your backend Document AI pipeline and playable as an MP3 file.</p>
          </Card>
        </div>
      </div>
    </div>
  )
}