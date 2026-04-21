import { useEffect, useRef } from 'react'

type Sprinkle = {
  x: number
  y: number
  r: number
  color: string
  vx: number
  vy: number
  type: number
  rot: number
  rotV: number
  alpha: number
}

export function SprinkleCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    const colors = ['#42C6D9', '#F04B4B', '#FFD447', '#a0e8f2', '#ff8a8a', '#ffe082']
    const shapes: Sprinkle[] = []
    const COUNT = 60
    for (let i = 0; i < COUNT; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 3 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.8,
        vy: -0.5 - Math.random() * 0.8,
        type: Math.floor(Math.random() * 3),
        rot: Math.random() * Math.PI * 2,
        rotV: (Math.random() - 0.5) * 0.04,
        alpha: 0.5 + Math.random() * 0.5,
      })
    }

    const drawShape = (s: Sprinkle) => {
      ctx.save()
      ctx.globalAlpha = s.alpha
      ctx.fillStyle = s.color
      ctx.translate(s.x, s.y)
      ctx.rotate(s.rot)
      if (s.type === 0) {
        ctx.beginPath()
        ctx.arc(0, 0, s.r, 0, Math.PI * 2)
        ctx.fill()
      } else if (s.type === 1) {
        ctx.fillRect(-s.r, -s.r * 0.4, s.r * 2, s.r * 0.8)
      } else {
        ctx.beginPath()
        ctx.moveTo(0, -s.r)
        ctx.lineTo(s.r, 0)
        ctx.lineTo(0, s.r)
        ctx.lineTo(-s.r, 0)
        ctx.closePath()
        ctx.fill()
      }
      ctx.restore()
    }

    let frame = 0
    let animating = true
    const animate = () => {
      if (!animating) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const s of shapes) {
        s.x += s.vx
        s.y += s.vy
        s.rot += s.rotV
        if (s.y < -20) {
          s.y = canvas.height + 20
          s.x = Math.random() * canvas.width
        }
        drawShape(s)
      }
      frame++
      if (frame < 180) {
        requestAnimationFrame(animate)
      } else {
        canvas.classList.add('fade-out')
        window.setTimeout(() => {
          canvas.style.display = 'none'
        }, 2500)
      }
    }
    animate()

    window.addEventListener('resize', resize)
    return () => {
      animating = false
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas id="sprinkle-canvas" ref={ref} />
}

