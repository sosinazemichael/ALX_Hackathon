import { useState } from 'react'
import { Link } from 'react-router-dom'

export function Emblem() {
  return (
    <svg className="h-8 w-8" viewBox="0 0 32 32" role="img" aria-label="Nooraa emblem">
      <circle cx="16" cy="16" r="15" fill="#A65336" />
      <circle cx="16" cy="16" r="9" fill="none" stroke="#D6A449" strokeWidth="2" />
      <circle cx="16" cy="16" r="3.5" fill="#FFFCF7" />
    </svg>
  )
}

const SIZES = ['100%', '112.5%', '125%']
export default function Header({ current }) {
  const [hc, setHc] = useState(document.documentElement.dataset.contrast === 'high')
  const toggleContrast = () => {
    const next = !hc
    setHc(next)
    document.documentElement.dataset.contrast = next ? 'high' : ''
  }
  const cycleFont = () => {
    const i = SIZES.indexOf(document.documentElement.style.fontSize || '100%')
    document.documentElement.style.fontSize = SIZES[(i + 1) % SIZES.length]
  }
  return (
    <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(57,37,31,0.04)]"><div className="h-20 max-w-7xl mx-auto px-margin-mobile lg:px-margin flex items-center justify-between gap-space-md"><div className="flex items-center gap-space-md"><Link to="/" className="flex items-center gap-space-sm group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg"><Emblem /><span className="font-headline-sm text-headline-sm text-on-surface tracking-tight group-hover:text-primary transition-colors">Nooraa</span></Link><span aria-label="Ethiopic script: Nooraa" className="inline-flex items-center px-space-sm py-space-xs rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm border border-secondary/20 select-none">ኖራ</span></div><nav aria-label="Main" className="hidden md:flex items-center gap-space-lg font-label-md text-label-md"><Link to="/" aria-current={current==='welcome'?'page':undefined} className={`px-space-md py-space-sm rounded-lg transition-all ${current==='welcome'?'bg-surface-container-high text-primary font-bold':'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'}`}>Welcome</Link><Link to="/workspace" aria-current={current==='workspace'?'page':undefined} className={`px-space-md py-space-sm rounded-lg transition-all ${current==='workspace'?'bg-surface-container-high text-primary font-bold':'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'}`}>Workspace</Link></nav><div className="flex items-center gap-space-md"><div className="flex items-center bg-surface-container-low rounded-lg p-space-xs"><button aria-label="Toggle high contrast mode" aria-pressed={hc} onClick={toggleContrast} className="h-9 w-9 flex items-center justify-center rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" title="Toggle High Contrast Mode" type="button"><span className="material-symbols-outlined text-[20px]">contrast</span></button><button aria-label="Increase text size (cycles through sizes)" onClick={cycleFont} className="h-9 w-9 flex items-center justify-center rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" title="Adjust Font Scaling" type="button"><span className="material-symbols-outlined text-[20px]">format_size</span></button></div><Link to="/workspace" className="hidden sm:inline-flex items-center justify-center px-space-lg py-space-sm rounded-lg bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary transition-colors shadow-[0_2px_6px_-1px_rgba(57,37,31,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">Launch Workspace</Link><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-sm" aria-hidden="true"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></header>
  )
}
