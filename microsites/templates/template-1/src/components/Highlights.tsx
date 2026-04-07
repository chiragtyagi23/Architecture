import { useSiteSection } from '../lib/siteApi'
import { Reveal } from './Reveal'
import { KeyframeCardReveal, keyframeRevealEffectAt } from './KeyframeCardReveal'

type TitleParts = { before: string; italic: string; after: string }

type HighlightCard = { num: string; icon: string; title: string; text: string }

type HighlightsPayload = {
  sectionLabel: string
  title: TitleParts
  /** Preferred shape; `cells` supported for older APIs. */
  items?: HighlightCard[]
  cells?: HighlightCard[]
}

export function Highlights() {
  const { data, error } = useSiteSection<HighlightsPayload>('VITE_HIGHLIGHTS_API_URL', '/demo-api/highlights.json')

  if (error) {
    return (
      <section className="bg-beige px-6 py-16 min-[961px]:px-12" id="highlights">
        <div className="bg-red-50 px-6 py-3 text-center text-xs text-red-800">Highlights: {error}</div>
      </section>
    )
  }

  if (!data) {
    return <section className="min-h-[400px] bg-beige px-6" id="highlights" aria-busy="true" />
  }

  const cards = data.items ?? data.cells ?? []

  return (
    <section className="bg-beige px-6 py-16 min-[961px]:px-12 min-[961px]:py-20" id="highlights">
      <Reveal effect="fade" delay={0}>
        <div className="mb-3.5 flex items-center gap-3 text-[0.68rem] tracking-[0.2em] text-brown uppercase before:h-px before:w-5 before:bg-brown before:content-['']">
          {data.sectionLabel}
        </div>
      </Reveal>
      <Reveal effect="up" delay={60}>
        <h2 className="font-display mb-12 text-[clamp(1.8rem,3vw,2.8rem)] leading-tight font-normal text-dark">
          {data.title.before}
          <em className="text-brown italic">{data.title.italic}</em>
          {data.title.after}
        </h2>
      </Reveal>

      <div className="mt-12 grid max-[960px]:grid-cols-1 max-[960px]:gap-2 min-[961px]:grid-cols-3 min-[961px]:gap-1">
        {cards.map((cell, i) => (
          <KeyframeCardReveal
            key={cell.num}
            effect={keyframeRevealEffectAt(i)}
            delay={i * 70}
            className="min-w-0"
          >
            <div
              className="relative border border-border border-l-0 bg-sand p-10 pl-12 max-[960px]:pl-10 max-[960px]:pt-8 before:absolute before:top-10 before:left-0 before:block before:h-6 before:w-[3px] before:bg-bl before:content-[''] max-[960px]:before:top-8"
              data-num={cell.num}
            >
              <div className="mb-4 flex h-9 w-9 items-center justify-center bg-beige text-[0.9rem] text-brown">
                {cell.icon}
              </div>
              <div className="mb-2 text-[0.9rem] font-medium text-dark">{cell.title}</div>
              <div className="text-[0.78rem] leading-[1.7] text-[#4d4840]">{cell.text}</div>
            </div>
          </KeyframeCardReveal>
        ))}
      </div>
    </section>
  )
}
