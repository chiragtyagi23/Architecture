import { KeyframeCardReveal, keyframeRevealEffectAt } from './KeyframeCardReveal'
import { Reveal } from './Reveal'
import { useSelectedCampaign } from '../lib/selectedCampaign'

type TitleParts = { before: string; italic: string; after: string }

type AmenitiesPayload = {
  sectionLabel: string
  title: TitleParts
  items: { icons: string[]; name: string; desc: string }[]
}

export function Amenities() {
  const selected = useSelectedCampaign()
  const rawItems = Array.isArray(selected?.amenities) ? selected.amenities : null
  const data: AmenitiesPayload | null = rawItems
    ? {
        sectionLabel: 'Amenities',
        title: { before: 'Lifestyle & ', italic: 'Amenities', after: '' },
        items: rawItems
          .map((a: any) => {
            const raw = a?.icon
            let icons: string[] = []
            if (Array.isArray(raw)) {
              icons = raw.map((x: any) => String(x ?? '')).filter((s: string) => s.trim().length > 0)
            } else if (typeof raw === 'string') {
              const s = raw.trim()
              if (s) {
                try {
                  const parsed = JSON.parse(s)
                  if (Array.isArray(parsed)) icons = parsed.map((x: any) => String(x ?? '')).filter((t: string) => t.trim().length > 0)
                  else if (typeof parsed === 'string') icons = [parsed]
                  else icons = [s]
                } catch {
                  icons = [s]
                }
              }
            }
            return { icons, name: String(a?.name ?? ''), desc: String(a?.desc ?? '') }
          })
          .filter((it: any) => it.name.trim().length > 0 || it.desc.trim().length > 0),
      }
    : null
  const error: string | null = null

  if (error) {
    return (
      <section className="px-6 py-16 min-[961px]:px-12" id="amenities">
        <div className="bg-red-50 px-6 py-3 text-center text-xs text-red-800">Amenities: {error}</div>
      </section>
    )
  }

  if (!data) return null
  if (!data.items.length) return null

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
              <span className="mb-3 flex min-h-11 shrink-0 items-center gap-2">
                {item.icons && item.icons.length ? (
                  item.icons.slice(0, 4).map((ic) =>
                    /^https?:\/\//i.test(ic) ? (
                      <img key={ic} src={ic} alt="" className="h-11 w-11 rounded-sm object-cover bg-beige" />
                    ) : (
                      <span key={ic} className="flex h-11 w-11 items-center justify-center bg-beige text-[1.15rem] text-brown">
                        {ic}
                      </span>
                    ),
                  )
                ) : (
                  <span className="flex h-11 w-11 items-center justify-center bg-beige text-[1.15rem] text-brown">🌟</span>
                )}
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
