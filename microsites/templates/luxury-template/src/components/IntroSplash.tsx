import { useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '../lib/cn'
import { useTemplateBasePath, withTemplateBasePath } from '../lib/basePath'
import { scrollToSection } from '../lib/siteApi'
import type { ImageSlide } from './ImageSlider'
import { WipeImageCarousel } from './WipeImageCarousel'
import { useSelectedCampaign } from '../lib/selectedCampaign'

/** First N slides are image-only; snapshot + enquiry gate follow slide N. */
const IMMERSIVE_SLIDE_COUNT = 3
const OUTRO_FADE_MS = 640

type HeroIntroPayload = {
  backgroundImages?: ImageSlide[]
  eyebrow: string
  titleLine1: string
  titleLine2Italic: string
  locationLine: string
  /** Optional one-line snapshot shown after immersive slides. */
  snapshotSummary?: string
  metaCells?: { value: string; label: string }[]
  primaryCta?: { label: string; targetSectionId: string }
  secondaryCta?: { label: string; targetSectionId: string }
  badge?: string
}

type Phase = 'immersive' | 'snapshot' | 'outro'

type Props = {
  onComplete: () => void
  onNavReveal?: () => void
  /** Fire after the 3rd immersive slide is absorbed (snapshot phase begins); drives enquiry popup timing. */
  onEnquiryGateOpen?: () => void
}

function readReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function IntroSplash({ onComplete, onNavReveal, onEnquiryGateOpen }: Props) {
  const selected = useSelectedCampaign()
  const data: HeroIntroPayload | null = (selected?.hero?.data as HeroIntroPayload | undefined) ?? null
  const error: string | null = null
  const basePath = useTemplateBasePath()
  const [reduceMotion] = useState(readReducedMotion)
  const [phase, setPhase] = useState<Phase>('immersive')
  const [outro, setOutro] = useState(false)
  const doneRef = useRef(false)
  const completeRef = useRef(onComplete)
  const navRevealRef = useRef(onNavReveal)
  const enquiryGateRef = useRef(onEnquiryGateOpen)
  completeRef.current = onComplete
  navRevealRef.current = onNavReveal
  enquiryGateRef.current = onEnquiryGateOpen

  const slides = useMemo(() => {
    const raw = data?.backgroundImages ?? []
    return raw.filter((s) => s.src && s.src.length > 0)
  }, [data])

  const immersiveSlides = useMemo(
    () => slides.slice(0, IMMERSIVE_SLIDE_COUNT),
    [slides],
  )

  const snapshotBgSrc = immersiveSlides.length > 0 ? immersiveSlides[immersiveSlides.length - 1]!.src : ''

  const openEnquiryGate = () => {
    enquiryGateRef.current?.()
  }

  const finish = () => {
    if (doneRef.current) return
    doneRef.current = true
    openEnquiryGate()
    navRevealRef.current?.()
    completeRef.current()
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    if (reduceMotion) {
      const t = window.setTimeout(finish, 350)
      return () => window.clearTimeout(t)
    }
  }, [reduceMotion])

  useEffect(() => {
    if (doneRef.current || reduceMotion) return
    if (!data && !error) return
    if (error || slides.length === 0) {
      finish()
    }
  }, [data, error, slides.length, reduceMotion])

  const immersiveEnded = () => {
    if (doneRef.current) return
    setPhase('snapshot')
    navRevealRef.current?.()
    openEnquiryGate()
  }

  const goToSite = () => {
    if (doneRef.current) return
    setOutro(true)
    window.setTimeout(() => {
      if (doneRef.current) return
      doneRef.current = true
      completeRef.current()
    }, OUTRO_FADE_MS)
  }

  if (reduceMotion) return null

  if (error) return null

  if (!data) {
    return (
      <div className="intro-splash" style={{ ['--wipe-dur' as string]: '1000ms' }} aria-label="Opening presentation">
        <div className="absolute inset-0 bg-cream" aria-hidden />
      </div>
    )
  }

  if (slides.length === 0) return null

  const summary =
    data.snapshotSummary?.trim() ||
    `Exclusive residences in a well-connected neighbourhood — ${data.locationLine}`

  const projectTitleRaw = String(selected?.title ?? '').trim()
  const fallbackTitle = [String(data.titleLine1 ?? '').trim(), String(data.titleLine2Italic ?? '').trim()]
    .filter(Boolean)
    .join(' ')
    .trim()
  const headlineTitle = projectTitleRaw || fallbackTitle || 'Project Name'

  return (
    <div
      className={cn('intro-splash', outro && 'intro-splash--outro')}
      style={{ ['--wipe-dur' as string]: '1000ms' }}
      aria-label="Opening presentation"
    >
      {phase === 'immersive' ? (
        <WipeImageCarousel
          slides={immersiveSlides}
          maxSlides={IMMERSIVE_SLIDE_COUNT}
          loop={false}
          holdMs={4800}
          wipeMs={1000}
          onNonLoopComplete={immersiveEnded}
          className="absolute inset-0 z-0"
        />
      ) : (
        <div
          className="intro-snapshot absolute inset-0 z-2"
          role="dialog"
          aria-modal="true"
          aria-labelledby="intro-snapshot-title"
        >
          {snapshotBgSrc ? (
            <img
              src={withTemplateBasePath(basePath, snapshotBgSrc)}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-center"
              draggable={false}
            />
          ) : null}
          <div className="intro-snapshot__scrim" aria-hidden />
          <div className="intro-snapshot__panel">
            <p className="intro-snapshot__eyebrow">{data.eyebrow}</p>
            <h1 id="intro-snapshot-title" className="intro-snapshot__headline font-display">
              <span className="text-sand">{headlineTitle}</span>
            </h1>
            <p className="intro-snapshot__location">{data.locationLine}</p>
            <p className="intro-snapshot__summary">{summary}</p>
            {data.metaCells && data.metaCells.length > 0 ? (
              <ul className="intro-snapshot__meta">
                {data.metaCells.slice(0, 4).map((cell) => (
                  <li key={cell.label}>
                    <span className="intro-snapshot__meta-value">{cell.value}</span>
                    <span className="intro-snapshot__meta-label">{cell.label}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            {data.badge ? <p className="intro-snapshot__badge">{data.badge}</p> : null}
            <div className="intro-snapshot__actions">
              <button type="button" className="intro-snapshot__btn intro-snapshot__btn--primary" onClick={goToSite}>
                Explore the project
              </button>
              {data.primaryCta ? (
                <button
                  type="button"
                  className="intro-snapshot__btn intro-snapshot__btn--ghost"
                  onClick={() => {
                    goToSite()
                    window.requestAnimationFrame(() => scrollToSection(data.primaryCta!.targetSectionId))
                  }}
                >
                  {data.primaryCta.label}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
