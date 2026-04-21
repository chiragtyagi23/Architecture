import { useEffect, useMemo, useRef, useState } from 'react'
import { useTemplateBasePath, withTemplateBasePath } from '../lib/basePath'
import { cn } from '../lib/cn'
import type { ImageSlide } from './ImageSlider'

const DEFAULT_MAX_SLIDES = 5

type RenderState =
  | { phase: 'transition'; from: number | null; to: number }
  | { phase: 'shown'; index: number }

function readReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function incomingDir(nextIndex: number): 'ltr' | 'rtl' {
  return nextIndex % 2 === 0 ? 'ltr' : 'rtl'
}

export type WipeImageCarouselProps = {
  slides: ImageSlide[]
  maxSlides?: number
  /** When false, fires `onNonLoopComplete` after the last slide has been held. */
  loop?: boolean
  holdMs?: number
  wipeMs?: number
  onNonLoopComplete?: () => void
  className?: string
  slideStackClassName?: string
  imgClassName?: string
}

export function WipeImageCarousel({
  slides: slidesIn,
  maxSlides = DEFAULT_MAX_SLIDES,
  loop = true,
  holdMs = 5200,
  wipeMs = 1000,
  onNonLoopComplete,
  className = '',
  slideStackClassName = '',
  imgClassName = '',
}: WipeImageCarouselProps) {
  const basePath = useTemplateBasePath()
  const [reduceMotion] = useState(readReducedMotion)
  const slides = useMemo(
    () => slidesIn.slice(0, maxSlides).filter((s) => s.src && s.src.length > 0),
    [slidesIn, maxSlides],
  )
  const slideKey = useMemo(() => slides.map((s) => s.src).join('|'), [slides])
  const n = slides.length
  const [renderState, setRenderState] = useState<RenderState | null>(null)
  const startedRef = useRef(false)
  const exhaustedRef = useRef(false)
  const onEndRef = useRef(onNonLoopComplete)
  onEndRef.current = onNonLoopComplete

  useEffect(() => {
    if (n === 0 || reduceMotion) return
    startedRef.current = false
    exhaustedRef.current = false
    setRenderState(null)
  }, [slideKey, reduceMotion, n])

  useEffect(() => {
    if (reduceMotion || n === 0) return
    if (!startedRef.current) {
      startedRef.current = true
      setRenderState({ phase: 'transition', from: null, to: 0 })
    }
  }, [slideKey, n, reduceMotion])

  useEffect(() => {
    if (reduceMotion || renderState === null || n === 0) return

    if (renderState.phase === 'transition') {
      const to = renderState.to
      const id = window.setTimeout(() => {
        setRenderState({ phase: 'shown', index: to })
      }, wipeMs)
      return () => window.clearTimeout(id)
    }

    if (n <= 1) {
      if (!loop) {
        const id = window.setTimeout(() => {
          if (!exhaustedRef.current) {
            exhaustedRef.current = true
            onEndRef.current?.()
          }
        }, holdMs)
        return () => window.clearTimeout(id)
      }
      return
    }

    const i = renderState.index
    const id = window.setTimeout(() => {
      if (!loop && i >= n - 1) {
        if (!exhaustedRef.current) {
          exhaustedRef.current = true
          onEndRef.current?.()
        }
        return
      }
      const next = i >= n - 1 ? 0 : i + 1
      setRenderState({ phase: 'transition', from: i, to: next })
    }, holdMs)
    return () => window.clearTimeout(id)
  }, [renderState, n, holdMs, wipeMs, loop, reduceMotion])

  if (n === 0) return null

  if (reduceMotion) {
    const s0 = slides[0]!
    return (
      <div
        className={cn('pointer-events-none absolute inset-0 overflow-hidden bg-black', className)}
        role="presentation"
      >
        <div className={cn('absolute inset-0 overflow-hidden', slideStackClassName)}>
          <img
            src={withTemplateBasePath(basePath, s0.src)}
            alt=""
            draggable={false}
            className={cn(
              'absolute inset-0 h-full w-full object-cover object-center',
              imgClassName,
            )}
          />
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn('pointer-events-none absolute inset-0 overflow-hidden bg-black', className)}
      role="presentation"
      style={{ ['--wipe-dur' as string]: `${wipeMs}ms` }}
    >
      <div className={cn('absolute inset-0 overflow-hidden', slideStackClassName)}>
        {slides.length > 0 && renderState === null ? (
          <div className="wipe-carousel__hold bg-black" aria-hidden />
        ) : renderState?.phase === 'transition' ? (
          <>
            {renderState.from != null ? (
              <img
                key={`out-${slides[renderState.from]!.src}`}
                src={withTemplateBasePath(basePath, slides[renderState.from]!.src)}
                alt=""
                draggable={false}
                className={cn(
                  'wipe-carousel__slide',
                  incomingDir(renderState.to) === 'ltr'
                    ? 'wipe-carousel__slide--exit-for-ltr'
                    : 'wipe-carousel__slide--exit-for-rtl',
                  imgClassName,
                )}
              />
            ) : null}
            <img
              key={`in-${slides[renderState.to]!.src}-${renderState.to}`}
              src={withTemplateBasePath(basePath, slides[renderState.to]!.src)}
              alt=""
              draggable={false}
              className={cn(
                'wipe-carousel__slide',
                incomingDir(renderState.to) === 'ltr'
                  ? 'wipe-carousel__slide--enter-ltr'
                  : 'wipe-carousel__slide--enter-rtl',
                imgClassName,
              )}
            />
          </>
        ) : renderState?.phase === 'shown' ? (
          <img
            key={`hold-${slides[renderState.index]!.src}`}
            src={withTemplateBasePath(basePath, slides[renderState.index]!.src)}
            alt=""
            draggable={false}
            className={cn('wipe-carousel__slide wipe-carousel__slide--hold', imgClassName)}
          />
        ) : null}
      </div>
    </div>
  )
}
