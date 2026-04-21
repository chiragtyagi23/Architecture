import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from 'react'
import { cn } from '../lib/cn'
import type { RevealEffect } from './Reveal'

/** Same order as Highlights: row reads L / up / R, then down / scale / fade. */
export const KEYFRAME_REVEAL_CYCLE: RevealEffect[] = ['left', 'up', 'right', 'down', 'scale', 'fade']

const FACE: Record<RevealEffect, string> = {
  left: 'hl-reveal--left',
  right: 'hl-reveal--right',
  up: 'hl-reveal--up',
  down: 'hl-reveal--down',
  scale: 'hl-reveal--scale',
  fade: 'hl-reveal--fade',
}

export function keyframeRevealEffectAt(i: number): RevealEffect {
  return KEYFRAME_REVEAL_CYCLE[i % KEYFRAME_REVEAL_CYCLE.length]
}

function readReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

type Props = {
  effect: RevealEffect
  /** Stagger after scroll trigger (ms). */
  delay?: number
  className?: string
  style?: CSSProperties
  children: ReactNode
}

/**
 * Scroll-triggered motion via `hl-in-*` keyframes in index.css (distinct up/down/L/R).
 */
export function KeyframeCardReveal({ effect, delay = 0, className, style, children }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [reduceMotion] = useState(readReducedMotion)
  const [play, setPlay] = useState(reduceMotion)

  useEffect(() => {
    if (reduceMotion || play) return
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setPlay(true)
          io.disconnect()
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduceMotion, play])

  return (
    <div
      ref={ref}
      className={cn(
        'hl-reveal',
        reduceMotion ? 'hl-reveal--static' : FACE[effect],
        !reduceMotion && play && 'hl-reveal--play',
        className,
      )}
      style={{
        ...style,
        ...(!reduceMotion && play ? { animationDelay: `${delay}ms` } : {}),
      }}
    >
      {children}
    </div>
  )
}
