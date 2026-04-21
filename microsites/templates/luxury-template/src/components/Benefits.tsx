import { useSiteSection } from '../lib/siteApi'
import { cn } from '../lib/cn'
import { ImageSlider, type ImageSlide } from './ImageSlider'
import { Reveal } from './Reveal'

type TitleParts = { before: string; italic: string; after: string }

type BenefitsPayload = {
  sectionLabel: string
  title: TitleParts
  items: { num: string; title: string; text: string }[]
  stats: { value: string; label: string }[]
  backgroundImages?: ImageSlide[]
}

export function Benefits() {
  const { data, error } = useSiteSection<BenefitsPayload>('VITE_BENEFITS_API_URL', '/demo-api/benefits.json')

  if (error) {
    return (
      <section className="bg-dark px-6 py-16 text-sand min-[961px]:px-12" id="benefits">
        <div className="bg-red-50 px-6 py-3 text-center text-xs text-red-800 text-dark">Benefits: {error}</div>
      </section>
    )
  }

  if (!data) {
    return <section className="min-h-[400px] bg-dark" id="benefits" aria-busy="true" />
  }

  const bgSlides = data.backgroundImages ?? []
  const hasBg = bgSlides.length > 0

  return (
    <section
      className={cn(
        'relative overflow-hidden bg-dark px-6 py-16 min-[961px]:px-12 min-[961px]:py-20',
        hasBg && 'benefits--has-bg',
      )}
      id="benefits"
    >
      {hasBg ? (
        <div className="benefits-bg-slider absolute inset-0 z-0 overflow-hidden" aria-hidden={true}>
          <ImageSlider
            className="z-0 [&_.slider-dots]:bottom-6 [&_.slider-dots]:z-[3]"
            slides={bgSlides}
            fit="cover"
            showArrows={false}
            showDots={bgSlides.length > 1}
            autoPlay={bgSlides.length > 1}
            intervalMs={5000}
            ariaLabel="Benefits background"
            pauseOnHover
          />
        </div>
      ) : null}

      <Reveal effect="up" delay={0} className="relative z-[3]">
        <div className="mb-3.5 flex items-center gap-3 text-[0.68rem] tracking-[0.2em] text-bl uppercase before:h-px before:w-5 before:bg-bl before:content-['']">
          {data.sectionLabel}
        </div>
      </Reveal>
      <Reveal effect="left" delay={70} className="relative z-[3]">
        <h2 className="font-display mb-5 text-[clamp(1.8rem,3vw,2.8rem)] leading-tight font-normal text-sand min-[961px]:mb-6">
          {data.title.before}
          <em className="text-bl italic">{data.title.italic}</em>
          {data.title.after}
        </h2>
      </Reveal>

      <div className="relative z-[3] mt-2 grid max-w-full items-center gap-10 max-[960px]:grid-cols-1 max-[960px]:gap-8 min-[961px]:grid-cols-2 min-[961px]:gap-16">
        <Reveal effect="right" delay={50} className="min-w-0">
          <div className="flex flex-col gap-0">
            {data.items.map((item, i) => (
              <Reveal key={item.num} effect="up" delay={i * 80}>
                <div className="flex gap-5 border-b border-white/[0.07] py-5 first:border-t min-[961px]:gap-6">
                  <div className="w-11 shrink-0 pt-0.5 text-center font-display text-[clamp(1.35rem,2.4vw,1.9rem)] font-medium leading-none tracking-tight text-bl/55 tabular-nums min-[961px]:w-[3.25rem]">
                    {item.num}
                  </div>
                  <div className="min-w-0">
                    <div className="mb-1 text-[0.88rem] font-medium text-sand">{item.title}</div>
                    <div className="text-[0.78rem] leading-snug text-[#c9bfb2]">{item.text}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <Reveal effect="scale" delay={120} className="min-w-0">
          <div
            className={cn(
              'relative flex aspect-[4/3] w-full min-h-0 items-stretch justify-center overflow-hidden bg-[#141210] max-[960px]:max-h-[260px] min-[961px]:aspect-[3/2] min-[961px]:max-h-[min(36vw,280px)]',
              hasBg && 'bg-transparent',
            )}
          >
            <div className="relative z-[2] mx-auto grid h-full min-h-0 w-4/5 max-w-full grid-cols-2 grid-rows-2 gap-px [&>.reveal]:min-h-0 [&>.reveal]:min-w-0">
              {data.stats.map((s, i) => (
                <Reveal key={s.label} effect="fade" delay={200 + i * 90} className="flex min-h-0 min-w-0 flex-col">
                  <div className="flex h-full min-h-0 flex-col items-center justify-center border border-white/[0.07] bg-[rgba(22,20,18,0.82)] px-4 py-5 text-center backdrop-blur-md">
                    <span className="font-display text-2xl font-normal tabular-nums text-bl">{s.value}</span>
                    <div className="mt-1.5 max-w-[11rem] text-[0.62rem] leading-snug tracking-[0.12em] text-[#c4b8a8] uppercase">
                      {s.label}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
