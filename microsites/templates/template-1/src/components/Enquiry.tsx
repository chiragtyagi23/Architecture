import { type FormEvent } from 'react'
import { cn } from '../lib/cn'
import { useSiteSection } from '../lib/siteApi'
import { Reveal } from './Reveal'

export type TitleParts = { before: string; italic: string; after: string }

export type SelectField = {
  label: string
  id: string
  name: string
  options: { value: string; label: string }[]
}

export type EnquiryPayload = {
  popup?: { title: string; subtitle: string; backgroundImage?: string }
  left: {
    sectionLabel: string
    title: TitleParts
    lead: string
    contacts: { icon: string; text: string }[]
  }
  right: {
    formTitle: string
    formSub: string
    nameField: { label: string; placeholder: string; id: string; name: string }
    phoneField: { label: string; placeholder: string; id: string; name: string }
    bhkField: SelectField
    budgetField: SelectField
    submitLabel: string
    disclaimerLine1: string
    disclaimerLine2: string
  }
}

const labelCls = 'mb-1.5 block text-[0.65rem] font-sans tracking-[0.14em] text-bl uppercase'
const controlCls =
  'w-full border border-beige bg-cream px-4 py-3.5 font-sans text-sm text-dark transition-colors outline-none focus:border-brown'

export function Enquiry() {
  const { data, error } = useSiteSection<EnquiryPayload>('VITE_ENQUIRY_API_URL', '/demo-api/enquiry.json')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    window.alert('Thank you! Our team will contact you within 24 hours.')
  }

  if (error) {
    return (
      <section id="enquiry">
        <div className="bg-red-50 px-6 py-3 text-center text-xs text-red-800 text-dark">Enquiry: {error}</div>
      </section>
    )
  }

  if (!data) {
    return <section id="enquiry" className="min-h-[400px]" aria-busy="true" />
  }

  const L = data.left
  const R = data.right

  return (
    <section id="enquiry" className="bg-cream">
      <div className="mx-auto grid max-w-none max-[960px]:grid-cols-1 min-[961px]:grid-cols-2">
        <Reveal effect="left" delay={0} className="min-w-0">
          <div className="bg-dark px-8 py-16 text-sand min-[961px]:px-20 min-[961px]:py-28">
            <Reveal effect="fade" delay={0}>
              <div className="mb-3.5 flex items-center gap-3 text-[0.68rem] tracking-[0.2em] text-bl uppercase before:h-px before:w-5 before:bg-bl before:content-['']">
                {L.sectionLabel}
              </div>
            </Reveal>
            <Reveal effect="up" delay={70}>
              <h2 className="font-display mb-6 text-[clamp(1.8rem,3vw,2.8rem)] leading-tight font-normal text-sand">
                {L.title.before}
                <em className="text-bl italic">{L.title.italic}</em>
                {L.title.after}
              </h2>
            </Reveal>
            <Reveal effect="right" delay={120}>
              <p className="mb-8 max-w-[28rem] text-[0.95rem] leading-snug text-[#d3c9be]">{L.lead}</p>
            </Reveal>
            <div className="flex flex-col gap-4">
              {L.contacts.map((c, i) => (
                <Reveal key={c.text} effect="up" delay={180 + i * 70}>
                  <div className="flex items-center gap-3 text-[0.85rem] text-[#c7bbaf] [&>i]:inline-flex [&>i]:h-12 [&>i]:max-w-12 [&>i]:min-h-12 [&>i]:min-w-12 [&>i]:items-center [&>i]:justify-center [&>i]:rounded border border-white/15 bg-[rgba(255,255,255,0.04)] text-lg not-italic [&>i]:font-serif">
                    <i>{c.icon}</i> {c.text}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal effect="right" delay={40} className="min-w-0">
          <div className="bg-sand px-8 py-16 min-[961px]:px-16 min-[961px]:py-28">
            <Reveal effect="up" delay={0}>
              <div className="font-display mb-2 text-2xl font-normal text-dark">{R.formTitle}</div>
            </Reveal>
            <Reveal effect="fade" delay={60}>
              <div className="mb-6 text-[0.85rem] leading-snug text-brown">{R.formSub}</div>
            </Reveal>

            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <Reveal effect="left" delay={80}>
                <div className="flex flex-col gap-1">
                  <label htmlFor={R.nameField.id} className={labelCls}>
                    {R.nameField.label}
                  </label>
                  <input
                    id={R.nameField.id}
                    type="text"
                    placeholder={R.nameField.placeholder}
                    name={R.nameField.name}
                    autoComplete="name"
                    className={controlCls}
                  />
                </div>
              </Reveal>
              <Reveal effect="right" delay={130}>
                <div className="flex flex-col gap-1">
                  <label htmlFor={R.phoneField.id} className={labelCls}>
                    {R.phoneField.label}
                  </label>
                  <input
                    id={R.phoneField.id}
                    type="tel"
                    placeholder={R.phoneField.placeholder}
                    name={R.phoneField.name}
                    autoComplete="tel"
                    className={controlCls}
                  />
                </div>
              </Reveal>
              <div className="grid grid-cols-1 gap-x-5 gap-y-2.5 min-[561px]:grid-cols-2">
                <Reveal effect="up" delay={160}>
                  <div className="flex flex-col gap-1">
                    <label htmlFor={R.bhkField.id} className={labelCls}>
                      {R.bhkField.label}
                    </label>
                    <select
                      id={R.bhkField.id}
                      name={R.bhkField.name}
                      defaultValue=""
                      className={cn(controlCls, 'cursor-pointer')}
                    >
                      {R.bhkField.options.map((o) => (
                        <option key={o.value || 'empty'} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </Reveal>
                <Reveal effect="up" delay={210}>
                  <div className="flex flex-col gap-1">
                    <label htmlFor={R.budgetField.id} className={labelCls}>
                      {R.budgetField.label}
                    </label>
                    <select
                      id={R.budgetField.id}
                      name={R.budgetField.name}
                      defaultValue=""
                      className={cn(controlCls, 'cursor-pointer')}
                    >
                      {R.budgetField.options.map((o) => (
                        <option key={o.value || 'empty-b'} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </Reveal>
              </div>
              <Reveal effect="scale" delay={260}>
                <button
                  type="submit"
                  className="mt-1 w-full cursor-pointer border-none bg-dark px-6 py-4 font-sans text-[0.7rem] font-semibold tracking-[0.12em] text-sand uppercase transition hover:bg-brown"
                >
                  {R.submitLabel}
                </button>
              </Reveal>
              <Reveal effect="fade" delay={300}>
                <div className="mt-3 text-center text-[0.65rem] leading-snug text-brown/75">
                  {R.disclaimerLine1}
                  <br />
                  {R.disclaimerLine2}
                </div>
              </Reveal>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
