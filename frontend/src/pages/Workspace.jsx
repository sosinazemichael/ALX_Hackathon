import { useSearchParams } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import DocToSpeech from '../components/upload/DocToSpeech'
import SpeechToText from '../components/audio/SpeechToText'
import { API_URL } from '../services/api'

const TAB = 'flex items-center gap-space-sm px-space-md py-space-sm min-h-[48px] rounded-lg font-label-md text-label-md transition-all '
export default function Workspace() {
  const [params, setParams] = useSearchParams()
  const mode = params.get('mode') === 'speech' ? 'speech' : 'document'
  const setMode = (m) => setParams({ mode: m }, { replace: true })
  const tabs = [['document', 'volume_up', 'Doc to Speech', '(ሰነድ ወደ ድምፅ)'], ['speech', 'mic', 'Speech to Text', '(ድምፅ ወደ ጽሑፍ)']]
  return (
    <>
      <Header current="workspace" />
      <div className="pt-20 bg-surface">
        <section aria-label="Service status" className="w-full bg-surface-container-low py-space-sm">
          <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin flex flex-wrap items-center gap-space-sm font-label-sm text-label-sm">
            <span className="flex items-center gap-space-xs font-semibold text-on-surface">
              <span className={`h-3 w-3 rounded-full ${API_URL ? 'bg-tertiary' : 'bg-secondary'}`} />
              {API_URL ? 'AI services configured' : 'Frontend-only mode'}
            </span>
            <span className="px-space-sm py-space-xs rounded bg-surface-container-high text-on-surface-variant">
              {API_URL ? 'OCR, transcription and translation use your backend' : 'PDF text and browser voices work. OCR, transcription and translation need a backend.'}
            </span>
          </div>
        </section>
        <main className="max-w-7xl mx-auto px-margin-mobile lg:px-margin py-space-lg w-full flex flex-col gap-space-lg">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md bg-surface-container-lowest p-space-lg rounded-xl shadow-md">
            <div className="space-y-space-xs">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">Studio / የስራ ቦታ</span>
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Nooraa Studio</h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">Turn documents into speech and spoken words into readable text, in English and Amharic.</p>
            </div>
            <div role="tablist" aria-label="Studio mode" className="bg-surface-container-low p-space-xs rounded-xl flex flex-wrap items-center self-start lg:self-auto">
              {tabs.map(([k, icon, label, am]) => (
                <button key={k} role="tab" id={`tab-${k}`} aria-selected={mode === k} aria-controls={`panel-${k}`} onClick={() => setMode(k)}
                  className={TAB + (mode === k ? 'bg-primary-container text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface')}>
                  <span className="material-symbols-outlined text-[20px]" aria-hidden="true">{icon}</span>
                  <span>{label} <span className="font-normal opacity-90">{am}</span></span>
                </button>
              ))}
            </div>
          </div>
          {mode === 'document' ? <DocToSpeech /> : <SpeechToText />}
        </main>
      </div>
      <Footer />
    </>
  )
}
