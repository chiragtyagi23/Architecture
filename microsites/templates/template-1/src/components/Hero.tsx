import { scrollToSection, useSiteSection } from '../lib/siteApi'
import { cn } from '../lib/cn'
import { ImageSlider, type ImageSlide } from './ImageSlider'
import { Reveal } from './Reveal'

type HeroPayload = {
  backgroundImages?: ImageSlide[]
  eyebrow: string
  titleLine1: string
  titleLine2Italic: string
  locationLine: string
  metaCells: { value: string; label: string }[]
  primaryCta: { label: string; targetSectionId: string }
  secondaryCta: { label: string; targetSectionId: string }
  badge: string
  mainVisual: { art: string; fontSize: string; opacity: number }
}

type HeroProps = {
  entranceReady?: boolean
}

function splitWords(text: string): string[] {
  return text.trim().split(/\s+/).filter(Boolean)
}

function loadL(m: boolean, dir: 'left' | 'right') {
  if (!m) return 'opacity-100'
  return cn(
    'opacity-0 motion-reduce:animate-none motion-reduce:opacity-100',
    dir === 'left' ? 'motion-safe:animate-hero-in-left' : 'motion-safe:animate-hero-in-right',
  )
}

export function Hero({ entranceReady = true }: HeroProps) {
  const { data, error } = useSiteSection<HeroPayload>('VITE_HERO_API_URL', '/demo-api/hero.json')

  if (error) {
    return (
      <section className="bg-hero-ink pt-24">
        <div className="bg-red-50 px-6 py-3 text-center text-xs text-red-800">Hero: {error}</div>
      </section>
    )
  }

  if (!data) {
    return <section className="relative min-h-svh bg-hero-ink pt-20" aria-busy="true" />
  }

  const line1Words = splitWords(data.titleLine1)
  const line2Words = splitWords(data.titleLine2Italic)
  const motion = entranceReady

  const bgSlides = data.backgroundImages ?? []
  const hasBg = bgSlides.length > 0

  return (
    <section
      className={cn(
        'hero relative grid min-h-svh grid-cols-1 overflow-hidden bg-hero-ink pt-20 min-[961px]:grid-cols-[55%_45%]',
        !hasBg && 'hero--no-photo',
      )}
    >
      {hasBg ? (
        <div className="hero-bg-slider absolute inset-0 z-[1] overflow-hidden">
          <ImageSlider
            className="z-0 [&>button]:z-[5] [&>button]:shadow-lg [&>button]:ring-1 [&>button]:ring-white/25 [&_.slider-dots]:z-[5]"
            slideStackClassName="hero-slide-stack"
            slides={bgSlides}
            fit="cover"
            showArrows={bgSlides.length > 1}
            showDots={bgSlides.length > 1}
            autoPlay={bgSlides.length > 1}
            intervalMs={5000}
            ariaLabel="Hero banner images"
            pauseOnHover
          />
        </div>
      ) : null}

      <div
        key={entranceReady ? 'hero-in' : 'hero-hold'}
        className="pointer-events-none relative z-[4] flex flex-col justify-center px-8 py-10 min-[961px]:px-12 min-[961px]:py-20 min-[961px]:pl-20 min-[961px]:pr-16 max-[960px]:px-8 max-[960px]:pb-8 max-[960px]:pt-24"
      >
        <div
          className={cn(
            'mb-8 flex items-center gap-3 text-[0.68rem] tracking-[0.2em] text-bl uppercase before:h-px before:w-8 before:shrink-0 before:bg-bl before:content-[""]',
            loadL(motion, 'right'),
          )}
          style={motion ? { animationDelay: '0.08s' } : undefined}
        >
          {data.eyebrow}
        </div>

        <h1 className="font-display mb-1 text-[clamp(2.6rem,4.5vw,4.8rem)] leading-[1.08] font-normal text-sand">
          <span className="inline-block">
            {line1Words.map((word, i) => (
              <span
                key={`${word}-${i}`}
                className={cn('inline-block will-change-[transform,opacity]', loadL(motion, 'left'))}
                style={motion ? { animationDelay: `${0.18 + i * 0.07}s` } : undefined}
              >
                {word}
                {i < line1Words.length - 1 ? '\u00A0' : ''}
              </span>
            ))}
          </span>
          <br />
          <em className="inline-block text-bl italic">
            {line2Words.map((word, i) => (
              <span
                key={`${word}-e-${i}`}
                className={cn('inline-block will-change-[transform,opacity]', loadL(motion, 'right'))}
                style={motion ? { animationDelay: `${0.42 + i * 0.08}s` } : undefined}
              >
                {word}
                {i < line2Words.length - 1 ? '\u00A0' : ''}
              </span>
            ))}
          </em>
        </h1>

        <div
          className={cn(
            'mb-10 flex items-center gap-2 text-[0.82rem] tracking-[0.06em] text-[#b8aea4] before:font-serif before:text-[0.9rem] before:text-brown before:content-["◎"]',
            loadL(motion, 'left'),
          )}
          style={motion ? { animationDelay: '0.72s' } : undefined}
        >
          {data.locationLine}
        </div>

        <div className="mb-10 grid grid-cols-2 gap-px bg-white/[0.06] min-[961px]:grid-cols-4">
          {data.metaCells.map((cell, i) => {
            const fromLeft = i % 2 === 0
            return (
              <div
                key={cell.label}
                className={cn(
                  'bg-dark/70 px-4 py-5 text-center min-[961px]:px-4 min-[961px]:py-5',
                  loadL(motion, fromLeft ? 'left' : 'right'),
                )}
                style={motion ? { animationDelay: `${0.82 + i * 0.09}s` } : undefined}
              >
                <span className="font-display mb-1 block text-2xl leading-none font-normal text-bl">
                  {cell.value}
                </span>
                <span className="text-[0.62rem] tracking-[0.14em] text-[#c9bfb2] uppercase">{cell.label}</span>
              </div>
            )
          })}
        </div>

        <div className="pointer-events-auto flex flex-wrap gap-4 max-[960px]:flex-col min-[961px]:flex-row">
          <button
            type="button"
            className={cn(
              'pointer-events-auto w-full cursor-pointer border-0 bg-brown px-8 py-3.5 font-sans text-[0.75rem] font-medium tracking-[0.1em] text-cream uppercase transition-colors min-[961px]:w-auto hover:bg-bl',
              loadL(motion, 'left'),
            )}
            style={motion ? { animationDelay: '1.15s' } : undefined}
            onClick={() => scrollToSection(data.primaryCta.targetSectionId)}
          >
            {data.primaryCta.label}
          </button>
          <button
            type="button"
            className={cn(
              'pointer-events-auto w-full cursor-pointer border border-white/15 bg-transparent px-8 py-3.5 font-sans text-[0.75rem] font-normal tracking-[0.1em] text-sand uppercase transition-all min-[961px]:w-auto hover:border-bl hover:text-bl',
              loadL(motion, 'right'),
            )}
            style={motion ? { animationDelay: '1.22s' } : undefined}
            onClick={() => scrollToSection(data.secondaryCta.targetSectionId)}
          >
            {data.secondaryCta.label}
          </button>
        </div>
      </div>

      <div className="pointer-events-none relative z-[4] flex items-center justify-center overflow-hidden px-6 pb-10 pt-4 min-[961px]:px-12 min-[961px]:pb-14 min-[961px]:pt-8 max-[960px]:min-h-[min(38vw,320px)]">
        <Reveal
          effect="scale"
          delay={100}
          rootMargin="0px 0px 0px 0px"
          className="flex min-[961px]:max-w-full min-[961px]:flex-[0_1_auto] min-[961px]:justify-center"
        >
          <div className="relative flex aspect-square w-[min(100%,17rem)] max-h-[min(48vw,260px)] items-center justify-center overflow-hidden bg-[rgba(30,24,18,0.5)] min-[961px]:max-h-[min(52vh,22rem)] min-[961px]:w-[min(100%,20rem)]">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(139,115,85,0.14)_0%,transparent_55%),repeating-linear-gradient(45deg,transparent,transparent_29px,rgba(139,115,85,0.05)_30px)]"
              aria-hidden
            />
            <div
              className="font-display pointer-events-none absolute font-normal text-brown select-none"
              style={{ fontSize: data.mainVisual.fontSize, opacity: data.mainVisual.opacity }}
            >
              {data.mainVisual.art}
            </div>
            <div className="absolute top-6 right-6 z-[5] flex items-center gap-1.5 bg-green px-4 py-2 text-[0.68rem] font-medium tracking-[0.1em] text-white uppercase">
              <span className="animate-blink text-[0.45rem] leading-none">&#9679;</span>
              {data.badge}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
