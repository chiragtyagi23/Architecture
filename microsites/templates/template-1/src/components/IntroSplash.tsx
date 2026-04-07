import { useCallback, useEffect, useRef, useState } from 'react'

const INTRO_TEXT = 'Project Name'
const CHAR_MS = 90
const PAUSE_BEFORE_FLY_MS = 1100
const GRIP_MS = 480
const FLY_MS = 3000
const HANDOFF_FADE_MS = 520
const ACCENT_FROM_INDEX = 8

type Phase = 'typing' | 'grip' | 'flying' | 'handoff'

type FlyMetrics = { dx: number; dy: number; sx: number; sy: number }

type Props = {
  onComplete: () => void
  onNavReveal?: () => void
}

export function IntroSplash({ onComplete, onNavReveal }: Props) {
  const [reduceMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [phase, setPhase] = useState<Phase>('typing')
  const [visibleCount, setVisibleCount] = useState(0)
  const logoFlyRef = useRef<HTMLSpanElement>(null)
  const creamRef = useRef<HTMLDivElement>(null)
  const flyMetricsRef = useRef<FlyMetrics>({ dx: 0, dy: 0, sx: 1, sy: 1 })
  const completeRef = useRef(onComplete)
  const navRevealRef = useRef(onNavReveal)
  const flyScheduledRef = useRef(false)
  const handoffStartedRef = useRef(false)
  completeRef.current = onComplete
  navRevealRef.current = onNavReveal

  /**
   * Iteratively align the flying box to the nav logo (non-uniform scale + translate).
   * Fixes subpixel drift and aspect mismatch vs a single FLIP step.
   */
  function applyLandingSnap(el: HTMLElement) {
    const nav = document.querySelector<HTMLElement>('.nav-logo')
    if (!nav) return

    let { dx, dy, sx, sy } = flyMetricsRef.current
    el.style.transition = 'none'

    for (let i = 0; i < 3; i++) {
      el.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(${sx}, ${sy})`
      void el.offsetHeight

      const ir = el.getBoundingClientRect()
      const nr = nav.getBoundingClientRect()
      const introFirst = el.querySelector<HTMLElement>('.intro-splash__char')
      const navMain = nav.querySelector<HTMLElement>('.nav-logo__main')
      const irL = introFirst?.getBoundingClientRect().left ?? ir.left
      const irT = introFirst?.getBoundingClientRect().top ?? ir.top
      const nrL = navMain?.getBoundingClientRect().left ?? nr.left
      const nrT = navMain?.getBoundingClientRect().top ?? nr.top
      const errL = nrL - irL
      const errT = nrT - irT
      const wOk = Math.abs(nr.width - ir.width) < 0.45
      const hOk = Math.abs(nr.height - ir.height) < 0.45
      const posOk = Math.abs(errL) < 0.06 && Math.abs(errT) < 0.06

      if (posOk && wOk && hOk) break

      dx += errL
      dy += errT
      if (ir.width > 0.01) sx *= nr.width / ir.width
      if (ir.height > 0.01) sy *= nr.height / ir.height
    }

    flyMetricsRef.current = { dx, dy, sx, sy }
    el.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(${sx}, ${sy})`
    void el.offsetHeight
  }

  const beginHandoff = useCallback((el: HTMLElement) => {
    if (handoffStartedRef.current) return
    handoffStartedRef.current = true

    el.style.removeProperty('transition')
    navRevealRef.current?.()

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        applyLandingSnap(el)
        requestAnimationFrame(() => {
          setPhase('handoff')
        })
      })
    })
  }, [])

  const chars = INTRO_TEXT.split('')
  const total = chars.length
  const progressPct = total > 0 ? Math.round((visibleCount / total) * 100) : 0
  const progressFull = phase === 'grip' || (phase === 'typing' && visibleCount >= total)
  const isFlyLayout = phase === 'flying' || phase === 'handoff'

  const runFly = useCallback(() => {
    const el = logoFlyRef.current
    const navEl = document.querySelector<HTMLElement>('.nav-logo')
    if (!el || !navEl) {
      completeRef.current()
      return
    }

    const ir = el.getBoundingClientRect()
    if (ir.width < 1 || ir.height < 1) {
      completeRef.current()
      return
    }

    setPhase('grip')

    window.setTimeout(() => {
      const el2 = logoFlyRef.current
      const nav2 = document.querySelector<HTMLElement>('.nav-logo')
      if (!el2 || !nav2) {
        completeRef.current()
        return
      }
      const ir2 = el2.getBoundingClientRect()
      const nr2 = nav2.getBoundingClientRect()
      if (ir2.width < 1 || nr2.width < 1) {
        completeRef.current()
        return
      }
      const dx = nr2.left - ir2.left
      const dy = nr2.top - ir2.top
      const sx = nr2.width / ir2.width
      const sy = nr2.height / ir2.height
      flyMetricsRef.current = { dx, dy, sx, sy }

      el2.style.removeProperty('transform')
      el2.style.setProperty('--intro-dx', `${dx}px`)
      el2.style.setProperty('--intro-dy', `${dy}px`)
      el2.style.setProperty('--intro-sx', String(sx))
      el2.style.setProperty('--intro-sy', String(sy))
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setPhase('flying')
        })
      })
    }, GRIP_MS)
  }, [])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    if (!reduceMotion) return
    const t = window.setTimeout(() => {
      navRevealRef.current?.()
      completeRef.current()
    }, 350)
    return () => clearTimeout(t)
  }, [reduceMotion])

  useEffect(() => {
    if (reduceMotion) return
    if (visibleCount >= total) return

    const t = window.setTimeout(() => {
      setVisibleCount((c) => c + 1)
    }, CHAR_MS)

    return () => clearTimeout(t)
  }, [visibleCount, total, reduceMotion])

  useEffect(() => {
    if (reduceMotion) return
    if (visibleCount !== total || flyScheduledRef.current) return

    flyScheduledRef.current = true
    const t = window.setTimeout(() => {
      let attempts = 0
      const waitNav = () => {
        const nav = document.querySelector('.nav-logo')
        if (nav && nav.getBoundingClientRect().width > 0) {
          runFly()
          return
        }
        attempts += 1
        if (attempts > 80) {
          completeRef.current()
          return
        }
        window.setTimeout(waitNav, 50)
      }
      waitNav()
    }, PAUSE_BEFORE_FLY_MS)

    return () => clearTimeout(t)
  }, [visibleCount, total, runFly, reduceMotion])

  useEffect(() => {
    if (phase !== 'flying') return
    const el = logoFlyRef.current
    if (!el) return

    let fallbackId: number

    const onTransformEnd = (e: TransitionEvent) => {
      if (e.propertyName !== 'transform') return
      el.removeEventListener('transitionend', onTransformEnd)
      window.clearTimeout(fallbackId)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          beginHandoff(el)
        })
      })
    }

    el.addEventListener('transitionend', onTransformEnd)

    fallbackId = window.setTimeout(() => {
      el.removeEventListener('transitionend', onTransformEnd)
      const node = logoFlyRef.current
      if (node) beginHandoff(node)
    }, FLY_MS + GRIP_MS + 400)

    return () => {
      el.removeEventListener('transitionend', onTransformEnd)
      window.clearTimeout(fallbackId)
    }
  }, [phase, beginHandoff])

  useEffect(() => {
    if (phase !== 'handoff') return
    const el = logoFlyRef.current

    let didComplete = false
    const done = () => {
      if (didComplete) return
      didComplete = true
      completeRef.current()
    }

    if (!el) {
      done()
      return
    }

    const onOpacityEnd = (e: TransitionEvent) => {
      if (e.propertyName !== 'opacity') return
      el.removeEventListener('transitionend', onOpacityEnd)
      done()
    }

    el.addEventListener('transitionend', onOpacityEnd)
    const t = window.setTimeout(done, HANDOFF_FADE_MS + 150)

    return () => {
      el.removeEventListener('transitionend', onOpacityEnd)
      window.clearTimeout(t)
    }
  }, [phase])

  return (
    <div
      className={`intro-splash${isFlyLayout ? ' intro-splash--reveal' : ''}${
        phase === 'handoff' ? ' intro-splash--handoff' : ''
      }`}
      aria-live="polite"
      aria-busy={phase === 'typing' || phase === 'grip' || phase === 'flying'}
    >
      <div ref={creamRef} className="intro-splash__cream" aria-hidden="true" />
      <div
        className={`intro-splash__inner${isFlyLayout ? ' intro-splash__inner--fly' : ''}${
          phase === 'grip' ? ' intro-splash__inner--grip' : ''
        }`}
      >
        <div className="intro-splash__logo-wrap">
          <span
            ref={logoFlyRef}
            className={`intro-splash__logo${phase === 'grip' ? ' intro-splash__logo--grip' : ''}${
              phase === 'flying' ? ' intro-splash__logo--fly' : ''
            }${phase === 'handoff' ? ' intro-splash__logo--handoff' : ''}`}
          >
            {chars.map((ch, i) => (
              <span
                key={i}
                className={`intro-splash__char${i >= ACCENT_FROM_INDEX ? ' intro-splash__char--accent' : ''}${
                  i < visibleCount ? ' intro-splash__char--on' : ''
                }`}
              >
                {ch}
              </span>
            ))}
          </span>
        </div>

        {phase === 'typing' || phase === 'grip' ? (
          <div className="intro-splash__progress" aria-hidden="true">
            <div className="intro-splash__progress-track">
              <div
                className="intro-splash__progress-fill"
                style={{ width: progressFull ? '100%' : `${progressPct}%` }}
              />
            </div>
          </div>
        ) : isFlyLayout ? (
          <div className="intro-splash__progress intro-splash__progress--phantom" aria-hidden="true">
            <div className="intro-splash__progress-track" />
          </div>
        ) : null}
      </div>
    </div>
  )
}
