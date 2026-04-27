import { Reveal } from './Reveal'
import { useSelectedCampaign } from '../lib/selectedCampaign'
import { ImageSlider } from './ImageSlider'

function offersFromSelected(selected: any): { url: string }[] {
  const rows = Array.isArray(selected?.projectImages) ? selected.projectImages : []
  const grp = rows.find((r: any) => String(r?.tag ?? '') === '__festival_offers')
  const imgs = Array.isArray(grp?.images) ? grp.images : []
  const fromGroup = imgs
    .map((i: any) => ({ url: typeof i?.src === 'string' ? i.src : '' }))
    .filter((d: any) => d.url.trim().length > 0)
  if (fromGroup.length) return fromGroup

  const docs = Array.isArray(selected?.documents) ? selected.documents : []
  return docs
    .filter((d: any) => String(d?.type ?? '') === 'offer_creative' && typeof d?.url === 'string')
    .map((d: any) => ({ url: d.url }))
    .filter((d: any) => d.url.trim().length > 0)
}

export function Offers() {
  const selected = useSelectedCampaign()
  const items = offersFromSelected(selected)
  if (!items.length) return null

  const slides = items.map((it) => ({ src: it.url, alt: 'Offer creative' }))

  return (
    <section className="bg-beige px-6 py-16 min-[961px]:px-12 min-[961px]:py-20" id="offers">
      <Reveal effect="fade" delay={0}>
        <div className="mb-3.5 flex items-center gap-3 text-[0.68rem] tracking-[0.2em] text-brown uppercase before:h-px before:w-5 before:bg-brown before:content-['']">
          Offers
        </div>
      </Reveal>
      <Reveal effect="up" delay={60}>
        <h2 className="font-display mb-10 text-[clamp(1.8rem,3vw,2.6rem)] leading-tight font-normal text-dark">
          Festival <em className="text-brown italic">Creatives</em>
        </h2>
      </Reveal>

      <Reveal effect="up" delay={90}>
        <div className="relative overflow-hidden border border-border bg-cream shadow-[0_18px_54px_rgba(46,46,46,0.16)]">
          <div className="relative w-full" style={{ height: 'min(86vh, 780px)' }}>
            <ImageSlider
              slides={slides}
              fit="contain"
              showArrows={slides.length > 1}
              showDots={slides.length > 1}
              autoPlay={slides.length > 1}
              intervalMs={5200}
              ariaLabel="Festival creatives"
              pauseOnHover
              className="absolute! inset-0!"
            />
          </div>
        </div>
      </Reveal>
    </section>
  )
}

