import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { cn } from '../lib/cn'

export type RevealEffect = 'left' | 'right' | 'up' | 'down' | 'fade' | 'scale'

type Props = {
  children: ReactNode
  effect?: RevealEffect
  /** Stagger delay in ms. */
  delay?: number
  className?: string
  style?: CSSProperties
  rootMargin?: string
  /**
   * Use shorter slides so motion stays visible inside columns (page uses `overflow-x-hidden`
   * on `body`, which clips large horizontal hero-style motion).
   */
  compact?: boolean
}

function readReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Full hero-style keyframe reveals (blur + slide), shared with Hero.tsx animations in index.css. */
const heroAnim: Record<RevealEffect, string> = {
  left: 'motion-safe:animate-hero-in-left',
  right: 'motion-safe:animate-hero-in-right',
  up: 'motion-safe:animate-hero-in-up',
  down: 'motion-safe:animate-hero-in-down',
  fade: 'motion-safe:animate-hero-in-fade',
  scale: 'motion-safe:animate-hero-in-scale',
}

/** Compact: transition-based (grid cells / overflow-x). */
const hiddenCompact = {
  left: '-translate-x-3 opacity-0 blur-[4px]',
  right: 'translate-x-3 opacity-0 blur-[4px]',
  up: 'translate-y-12 opacity-0 blur-[4px]',
  down: '-translate-y-10 opacity-0 blur-[4px]',
  fade: 'opacity-0 blur-[4px]',
  scale: 'scale-[0.94] opacity-0 blur-[4px]',
} as const

const visibleCompact = 'translate-x-0 translate-y-0 scale-100 opacity-100 blur-none'

export function Reveal({
  children,
  effect = 'up',
  delay = 0,
  className = '',
  style,
  rootMargin = '0px 0px -5% 0px',
  compact = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [prefersReducedMotion] = useState(readReducedMotion)
  const [isVisible, setIsVisible] = useState(prefersReducedMotion)

  useEffect(() => {
    if (isVisible) return
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          io.disconnect()
        }
      },
      { root: null, rootMargin, threshold: 0.06 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [isVisible, rootMargin])

  const useHeroKeyframes = !compact && !prefersReducedMotion

  return (
    <div
      ref={ref}
      className={cn(
        'reveal',
        compact
          ? cn(
              'will-change-[opacity,transform,filter] transition-[opacity,transform,filter] duration-[880ms] ease-[cubic-bezier(0.22,1,0.32,1)] motion-reduce:transition-none motion-reduce:duration-0',
              isVisible ? visibleCompact : hiddenCompact[effect],
              'motion-reduce-reveal',
            )
          : cn(
              'will-change-[transform,opacity,filter]',
              useHeroKeyframes && isVisible && heroAnim[effect],
              useHeroKeyframes && !isVisible && 'opacity-0',
              prefersReducedMotion && 'opacity-100 motion-reduce:animate-none motion-reduce:[filter:none]',
            ),
        className,
      )}
      style={{
        ...style,
        ...(compact
          ? { transitionDelay: isVisible ? `${delay}ms` : '0ms' }
          : useHeroKeyframes && isVisible
            ? { animationDelay: `${delay}ms` }
            : {}),
      }}
      inert={!prefersReducedMotion && !isVisible ? true : undefined}
    >
      {children}
    </div>
  )
}
