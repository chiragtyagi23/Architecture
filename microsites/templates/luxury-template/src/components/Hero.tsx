import { useSiteSection } from '../lib/siteApi'
import { cn } from '../lib/cn'
import type { ImageSlide } from './ImageSlider'
import { WipeImageCarousel } from './WipeImageCarousel'

const MAX_HERO_IMAGES = 5

/** CMS payload kept for API compatibility; hero is image-only (no overlay copy). */
type HeroPayload = {
  backgroundImages?: ImageSlide[]
  eyebrow: string
  titleLine1: string
  titleLine2Italic: string
  snapshotSummary?: string
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

export function Hero({ entranceReady: _entranceReady = true }: HeroProps) {
  void _entranceReady
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

  const bgSlides = (data.backgroundImages ?? [])
    .slice(0, MAX_HERO_IMAGES)
    .filter((s) => s.src && s.src.length > 0)
  const hasBg = bgSlides.length > 0

  return (
    <section
      className={cn(
        'hero hero--immersive relative min-h-svh overflow-hidden bg-hero-ink pt-20',
        !hasBg && 'hero--no-photo',
      )}
    >
      {hasBg ? (
        <WipeImageCarousel
          slides={bgSlides}
          maxSlides={MAX_HERO_IMAGES}
          loop
          holdMs={5200}
          wipeMs={1000}
          className="absolute inset-0 z-1"
          slideStackClassName="hero-slide-stack hero-slide-stack--immersive"
        />
      ) : null}
    </section>
  )
}
