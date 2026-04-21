import { useEffect } from 'react'

export function ScrollReveal() {
  useEffect(() => {
    const reveals = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    if (!reveals.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          e.target.classList.add('visible')
          observer.unobserve(e.target)
        }
      },
      { threshold: 0.12 },
    )
    reveals.forEach((r) => observer.observe(r))
    return () => observer.disconnect()
  }, [])
  return null
}

