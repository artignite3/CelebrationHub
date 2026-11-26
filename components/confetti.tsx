"use client"

import { useEffect } from "react"

// Paper confetti tinted with the theme's four stains, read from the tokens
const STAINS = ["--stain-1", "--stain-2", "--stain-3", "--stain-4", "--color-card"]

export default function Confetti({
  duration = 8000, // milliseconds the confetti lasts
  particleCount = 120,
}: {
  duration?: number
  particleCount?: number
}) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const canvas = document.createElement("canvas")
    canvas.className = "confetti"
    canvas.setAttribute("aria-hidden", "true")
    document.body.appendChild(canvas)

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const root = getComputedStyle(document.documentElement)
    const colors = STAINS.map((t) => root.getPropertyValue(t).trim()).filter(Boolean)

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener("resize", resize)

    const decayPerFrame = 1 / (Math.max(1, duration / 1000) * 60) // approx at 60fps
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight * -0.5,
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 3 + 1,
      life: 0.8 + Math.random() * 0.8,
      size: 6 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.2,
    }))

    let rafId = 0
    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.vy += 0.12
        p.vx *= 0.995
        p.vy *= 0.995
        p.x += p.vx
        p.y += p.vy
        p.tilt += p.spin
        p.life -= decayPerFrame
        if (p.life <= 0 || p.y > window.innerHeight + 50) {
          particles.splice(i, 1)
          continue
        }
        // a paper strip that turns over as it falls
        ctx.globalAlpha = Math.max(0, Math.min(1, p.life))
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.tilt)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, (p.size / 2) * Math.abs(Math.cos(p.tilt * 2)) + 1)
        ctx.restore()
      }
      ctx.globalAlpha = 1
      if (particles.length > 0) rafId = requestAnimationFrame(animate)
      else canvas.remove()
    }
    rafId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("resize", resize)
      canvas.remove()
    }
  }, [duration, particleCount])

  return null
}
