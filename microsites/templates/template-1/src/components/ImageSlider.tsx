import { useCallback, useEffect, useId, useState } from 'react'
import { cn } from '../lib/cn'
import { useTemplateBasePath, withTemplateBasePath } from '../lib/basePath'

export type ImageSlide = {
  src: string
  alt?: string
}

type ImageSliderProps = {
  slides: ImageSlide[]
  fit?: 'cover' | 'contain'
  showArrows?: boolean
  showDots?: boolean
  autoPlay?: boolean
  intervalMs?: number
  className?: string
  /** Extra classes on the slide stack (images only). Used by hero so a gradient `::after` sits above photos but below arrows. */
  slideStackClassName?: string
  imgClassName?: string
  pauseOnHover?: boolean
  ariaLabel?: string
}

function readReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function ImageSlider({
  slides,
  fit = 'cover',
  showArrows = false,
  showDots = false,
  autoPlay = false,
  intervalMs = 5000,
  className = '',
  slideStackClassName = '',
  imgClassName = '',
  pauseOnHover = true,
  ariaLabel = 'Image carousel',
}: ImageSliderProps) {
  const uid = useId()
  const rootId = `slider-${uid.replace(/:/g, '')}`
  const basePath = useTemplateBasePath()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(readReducedMotion)

  const n = slides.length
  const safeIndex = n > 0 ? index % n : 0

  const go = useCallback(
    (dir: -1 | 1) => {
      if (n < 2) return
      setIndex((i) => (i + dir + n) % n)
    },
    [n],
  )

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduceMotion(mq.matches)
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (!autoPlay || n < 2 || paused || reduceMotion) return
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % n)
    }, Math.max(2000, intervalMs))
    return () => window.clearInterval(t)
  }, [autoPlay, intervalMs, n, paused, reduceMotion])

  useEffect(() => {
    if (index >= n && n > 0) setIndex(0)
  }, [index, n])

  if (n === 0) return null

  const single = n === 1
  const autoplayActive = Boolean(autoPlay && n > 1 && !reduceMotion)

  return (
    <div
      id={rootId}
      className={cn('absolute inset-0 z-[1] overflow-hidden bg-beige', className)}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      onMouseEnter={pauseOnHover && autoplayActive ? () => setPaused(true) : undefined}
      onMouseLeave={pauseOnHover && autoplayActive ? () => setPaused(false) : undefined}
    >
      <div
        className={cn('absolute inset-0', slideStackClassName)}
        aria-live={autoPlay ? 'polite' : 'off'}
      >
        {slides.map((slide, i) => (
          <img
            key={slide.src}
            src={withTemplateBasePath(basePath, slide.src)}
            alt={i === safeIndex ? (slide.alt ?? '') : ''}
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding="async"
            className={cn(
              'pointer-events-none absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-500 ease-out',
              fit === 'contain' && 'object-contain',
              i === safeIndex ? 'opacity-100' : 'opacity-0',
              imgClassName,
            )}
            aria-hidden={i !== safeIndex}
          />
        ))}
      </div>

      {showArrows ? (
        <>
          <button
            type="button"
            className="absolute top-1/2 left-2 z-[4] flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-0 bg-dark/55 text-sand transition-[background,transform] hover:bg-dark/82 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand max-[960px]:top-auto max-[960px]:bottom-12 max-[960px]:translate-y-0 min-[961px]:bottom-auto"
            aria-controls={rootId}
            aria-label="Previous image"
            onClick={() => go(-1)}
          >
            <span className="-mt-px pointer-events-none text-[1.35rem] leading-none font-light" aria-hidden>
              ‹
            </span>
          </button>
          <button
            type="button"
            className="absolute top-1/2 right-2 z-[4] flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-0 bg-dark/55 text-sand transition-[background,transform] hover:bg-dark/82 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand max-[960px]:top-auto max-[960px]:bottom-12 max-[960px]:translate-y-0 min-[961px]:bottom-auto"
            aria-controls={rootId}
            aria-label="Next image"
            onClick={() => go(1)}
          >
            <span className="-mt-px pointer-events-none text-[1.35rem] leading-none font-light" aria-hidden>
              ›
            </span>
          </button>
        </>
      ) : null}

      {showDots && !single ? (
        <div
          className="slider-dots absolute bottom-3 left-1/2 z-[4] flex -translate-x-1/2 items-center gap-3 min-[961px]:bottom-4"
          role="tablist"
          aria-label="Slide markers"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === safeIndex}
              aria-label={`Slide ${i + 1} of ${n}`}
              className={cn(
                'h-1.5 w-1.5 cursor-pointer rounded-full border-0 p-0 transition-[background,transform] bg-white/40 hover:bg-white/65',
                i === safeIndex && 'scale-[1.15] bg-sand',
              )}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
