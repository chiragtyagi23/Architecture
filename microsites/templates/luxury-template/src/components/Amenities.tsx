import { KeyframeCardReveal, keyframeRevealEffectAt } from './KeyframeCardReveal'
import { useSiteSection } from '../lib/siteApi'
import { Reveal } from './Reveal'

type TitleParts = { before: string; italic: string; after: string }

type AmenitiesPayload = {
  sectionLabel: string
  title: TitleParts
  items: { icon: string; name: string; desc: string }[]
}

export function Amenities() {
  const { data, error } = useSiteSection<AmenitiesPayload>('VITE_AMENITIES_API_URL', '/demo-api/amenities.json')

  if (error) {
    return (
      <section className="px-6 py-16 min-[961px]:px-12" id="amenities">
        <div className="bg-red-50 px-6 py-3 text-center text-xs text-red-800">Amenities: {error}</div>
      </section>
    )
  }

  if (!data) {
    return <section className="min-h-[400px] px-6" id="amenities" aria-busy="true" />
  }

  return (
    <section className="px-6 py-16 min-[961px]:px-12 min-[961px]:py-20" id="amenities">
      <Reveal effect="left" delay={0}>
        <div className="mb-3.5 flex items-center gap-3 text-[0.68rem] tracking-[0.2em] text-brown uppercase before:h-px before:w-5 before:bg-brown before:content-['']">
          {data.sectionLabel}
        </div>
      </Reveal>
      <Reveal effect="right" delay={70}>
        <h2 className="font-display mb-12 text-[clamp(1.8rem,3vw,2.8rem)] leading-tight font-normal text-dark">
          {data.title.before}
          <em className="text-brown italic">{data.title.italic}</em>
          {data.title.after}
        </h2>
      </Reveal>

      <div className="mt-12 grid items-stretch max-[960px]:grid-cols-2 max-[960px]:gap-px min-[961px]:grid-cols-5 min-[961px]:gap-px">
        {data.items.map((item, i) => (
          <KeyframeCardReveal
            key={item.name}
            effect={keyframeRevealEffectAt(i)}
            delay={i * 50}
            className="flex h-full min-h-0 min-w-0 flex-col"
          >
            <div className="flex h-full min-h-46 cursor-default flex-col border border-b-2 border-brown/25 bg-sand px-5 py-8 transition-[border-color,background] hover:border-brown/55 hover:bg-cream sm:min-h-48">
              <span className="mb-3 flex h-11 w-11 shrink-0 items-center justify-center bg-beige text-[1.15rem] text-brown">
                {item.icon}
              </span>
              <div className="mb-1.5 shrink-0 text-[0.78rem] font-semibold tracking-widest text-dark uppercase">
                {item.name}
              </div>
              <div className="flex-1 text-[0.72rem] leading-[1.65] text-[#5c554c]">{item.desc}</div>
            </div>
          </KeyframeCardReveal>
        ))}
      </div>
    </section>
  )
}
