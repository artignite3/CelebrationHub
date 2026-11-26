"use client"

import { useEffect } from "react"

// Party paper in the site palette: flame, cream, rose, sage
const COLORS = ["#f0a848", "#f4ecdc", "#d98a7a", "#9fb08f"]

export default function Confetti({
  duration = 8000, // milliseconds the confetti should last (default increased)
  particleCount = 120, // number of particles
}: {
  duration?: number
  particleCount?: number
}) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const canvas = document.createElement("canvas")
    canvas.style.position = "fixed"
    canvas.style.top = "0"
    canvas.style.left = "0"
    canvas.style.pointerEvents = "none"
    canvas.style.zIndex = "9999"
    document.body.appendChild(canvas)

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener("resize", resize)

    const particles: any[] = []
    const maxLifeSec = Math.max(1, duration / 1000) // seconds
    const decayPerFrame = 1 / (Math.max(1, maxLifeSec) * 60) // approx at 60fps

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight * -0.5,
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 3 + 1,
        life: (0.8 + Math.random() * 0.8), // normalized life (will decay by decayPerFrame)
        size: 6 + Math.random() * 6,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        tilt: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.2,
      })
    }

    let rafId: number | null = null
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.vy += 0.12 // gentle gravity
        p.vx *= 0.995
        p.vy *= 0.995
        p.x += p.vx
        p.y += p.vy
        p.tilt += p.spin
        p.life -= decayPerFrame

        if (p.life <= 0 || p.y > window.innerHeight + 50) {
          particles.splice(i, 1)
        } else {
          ctx.globalAlpha = Math.max(0, Math.min(1, p.life))
          // a paper strip that turns over as it falls
          ctx.save()
          ctx.translate(p.x, p.y)
          ctx.rotate(p.tilt)
          ctx.fillStyle = p.color
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, (p.size / 2) * Math.abs(Math.cos(p.tilt * 2)) + 1)
          ctx.restore()
        }
      }

      ctx.globalAlpha = 1

      if (particles.length > 0) {
        rafId = requestAnimationFrame(animate)
      } else {
        // ensure some small delay so animation feels complete
        setTimeout(() => {
          if (canvas.parentElement) document.body.removeChild(canvas)
        }, 200)
      }
    }

    rafId = requestAnimationFrame(animate)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener("resize", resize)
      if (canvas.parentElement) document.body.removeChild(canvas)
    }
  }, [duration, particleCount])

  return null
}
