export const Card = ({ children, className = '', ...p }) => <section className={`bg-surface-container-lowest p-space-lg rounded-xl shadow-md ${className}`} {...p}>{children}</section>
export const Btn = ({ kind = 'primary', className = '', ...p }) => (
  <button type="button" {...p} className={`inline-flex items-center justify-center gap-space-xs px-space-lg min-h-[48px] rounded-lg font-label-md text-label-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${kind === 'primary' ? 'bg-primary-container text-on-primary hover:bg-primary' : 'bg-surface-container text-on-surface hover:bg-surface-container-high'} ${className}`} />
)
export const Icon = ({ n, size = 20 }) => <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: size }}>{n}</span>
export const Notice = ({ kind = 'info', children }) => (
  <p role={kind === 'error' ? 'alert' : 'status'} className={`flex gap-space-sm items-start p-space-sm rounded-lg font-body-sm text-body-sm ${kind === 'error' ? 'bg-error-container text-on-error-container' : 'bg-secondary-fixed/50 text-on-surface'}`}>
    <Icon n={kind === 'error' ? 'error' : 'info'} />{children}
  </p>
)
export const Select = ({ id, label, children, ...p }) => (
  <div className="flex flex-col gap-space-xs">
    <label htmlFor={id} className="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold">{label}</label>
    <div className="relative bg-surface-container-low rounded-lg">
      <select id={id} {...p} className="appearance-none bg-transparent font-label-md text-label-md text-on-surface pl-space-md pr-space-xl min-h-[48px] cursor-pointer">{children}</select>
      <span aria-hidden="true" className="material-symbols-outlined absolute right-space-sm top-1/2 -translate-y-1/2 pointer-events-none text-[20px]">expand_more</span>
    </div>
  </div>
)
export const Switch = ({ on, onChange, label }) => (
  <button type="button" role="switch" aria-checked={on} aria-label={label} onClick={() => onChange(!on)}
    className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors ${on ? 'bg-primary-container' : 'bg-outline-variant'}`}>
    <span className={`bg-surface-container-lowest w-6 h-6 rounded-full shadow-md transition-transform ${on ? 'translate-x-6' : ''}`} />
  </button>
)
export const fmtTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(Math.floor(s % 60)).padStart(2, '0')}`
export const fmtSize = (b) => (b > 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`)
