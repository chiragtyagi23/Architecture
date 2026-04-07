import { type CSSProperties, type FormEvent, useEffect, useId, useRef, useState } from 'react'
import { cn } from '../lib/cn'
import { scrollToSection, useSiteSection } from '../lib/siteApi'
import type { EnquiryPayload } from './Enquiry'
import { useTemplateBasePath, withTemplateBasePath } from '../lib/basePath'

const POPUP_DISMISSED_KEY = 'mg_enquiry_popup_dismissed_v1'
const POPUP_DELAY_MS = 10_000

const labelCls = 'mb-1 block text-[0.6rem] font-sans tracking-[0.12em] text-brown uppercase'
const controlCls =
  'w-full border border-beige bg-cream px-3 py-2.5 font-sans text-sm text-dark transition-colors outline-none focus:border-brown'

type Props = {
  /** When false (e.g. intro splash), the 10s timer does not start yet. */
  scheduleWhenReady: boolean
}

export function EnquiryPopup({ scheduleWhenReady }: Props) {
  const uid = useId().replace(/:/g, '')
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState(false)
  const basePath = useTemplateBasePath()
  /** True exactly `POPUP_DELAY_MS` after first mount (page load). */
  const [delayElapsed, setDelayElapsed] = useState(false)
  const { data, error } = useSiteSection<EnquiryPayload>('VITE_ENQUIRY_API_URL', '/demo-api/enquiry.json')

  useEffect(() => {
    const t = window.setTimeout(() => setDelayElapsed(true), POPUP_DELAY_MS)
    return () => window.clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!delayElapsed || !scheduleWhenReady || error || !data) return
    try {
      if (sessionStorage.getItem(POPUP_DISMISSED_KEY) === '1') return
    } catch {
      /* ignore */
    }
    setOpen(true)
  }, [delayElapsed, scheduleWhenReady, error, data])

  useEffect(() => {
    const el = dialogRef.current
    if (!el) return
    if (open) {
      if (!el.open) el.showModal()
    } else if (el.open) {
      el.close()
    }
  }, [open])

  const dismiss = () => {
    setOpen(false)
    try {
      sessionStorage.setItem(POPUP_DISMISSED_KEY, '1')
    } catch {
      /* ignore */
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    window.alert('Thank you! Our team will contact you within 24 hours.')
    dismiss()
  }

  if (error || !data) return null

  const R = data.right
  const P = data.popup
  const title = P?.title ?? 'Enquire now'
  const subtitle = P?.subtitle ?? R.formSub
  const bgSrc = P?.backgroundImage?.trim()
  const bgUrl = bgSrc ? withTemplateBasePath(basePath, bgSrc) : ''

  const p = (suffix: string) => `enq-popup-${uid}-${suffix}`

  return (
    <dialog
      ref={dialogRef}
      className={cn(
        'fixed inset-0 z-[600] m-auto max-h-[min(90vh-1rem,720px)] w-[min(28rem,calc(100vw-2rem))]',
        'border-0 bg-transparent p-0 text-dark',
        '[&::backdrop]:bg-hero-ink/50 [&::backdrop]:backdrop-blur-[2px]',
      )}
      aria-labelledby={p('title')}
      aria-describedby={p('desc')}
      onClose={dismiss}
    >
      <div
        className={cn(
          'relative max-h-[min(90vh-1rem,720px)] overflow-y-auto rounded-sm bg-sand p-6 pr-12 shadow-2xl',
          bgSrc &&
            'bg-cover bg-center [background-image:var(--enquiry-popup-bg)] before:pointer-events-none before:absolute before:inset-0 before:z-0 before:rounded-[inherit] before:bg-gradient-to-br before:from-cream/70 before:to-sand/92 before:content-[""]',
        )}
        style={
          bgUrl
            ? ({
                ['--enquiry-popup-bg' as string]: `url(${JSON.stringify(bgUrl)})`,
              } as CSSProperties)
            : undefined
        }
      >
        <button
          type="button"
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded border-0 bg-dark/88 font-sans text-xl leading-none text-sand transition hover:bg-brown"
          aria-label="Close"
          onClick={dismiss}
        >
          ×
        </button>
        <h2 id={p('title')} className="relative z-10 font-display text-xl font-normal leading-tight text-dark">
          {title}
        </h2>
        <p id={p('desc')} className="relative z-10 mt-1.5 text-[0.82rem] leading-snug text-brown">
          {subtitle}
        </p>

        <form className="relative z-10 mt-4 flex flex-col gap-3" onSubmit={onSubmit}>
          <div className="flex flex-col gap-0.5">
            <label htmlFor={p('name')} className={labelCls}>
              {R.nameField.label}
            </label>
            <input
              id={p('name')}
              type="text"
              placeholder={R.nameField.placeholder}
              name={R.nameField.name}
              autoComplete="name"
              className={controlCls}
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <label htmlFor={p('phone')} className={labelCls}>
              {R.phoneField.label}
            </label>
            <input
              id={p('phone')}
              type="tel"
              placeholder={R.phoneField.placeholder}
              name={R.phoneField.name}
              autoComplete="tel"
              className={controlCls}
            />
          </div>
          <div className="grid grid-cols-1 gap-x-3 gap-y-2 min-[480px]:grid-cols-2">
            <div className="flex min-w-0 flex-col gap-0.5">
              <label htmlFor={p('bhk')} className={labelCls}>
                {R.bhkField.label}
              </label>
              <select id={p('bhk')} name={R.bhkField.name} defaultValue="" className={cn(controlCls, 'cursor-pointer')}>
                {R.bhkField.options.map((o) => (
                  <option key={o.value || 'empty'} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex min-w-0 flex-col gap-0.5">
              <label htmlFor={p('budget')} className={labelCls}>
                {R.budgetField.label}
              </label>
              <select id={p('budget')} name={R.budgetField.name} defaultValue="" className={cn(controlCls, 'cursor-pointer')}>
                {R.budgetField.options.map((o) => (
                  <option key={o.value || 'empty-b'} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="mt-0.5 w-full cursor-pointer border-none bg-dark px-4 py-3 font-sans text-[0.65rem] font-semibold tracking-[0.1em] text-sand uppercase transition hover:bg-brown"
          >
            {R.submitLabel}
          </button>
          <div className="text-center text-[0.62rem] leading-snug text-brown/75">
            {R.disclaimerLine1}
            <br />
            {R.disclaimerLine2}
          </div>
          <button
            type="button"
            className="mt-1 cursor-pointer border-0 bg-transparent p-0 text-center text-[0.75rem] font-medium text-brown underline decoration-brown/40 underline-offset-2 hover:text-dark"
            onClick={() => {
              dismiss()
              scrollToSection('enquiry')
            }}
          >
            Open full enquiry section
          </button>
        </form>
      </div>
    </dialog>
  )
}
