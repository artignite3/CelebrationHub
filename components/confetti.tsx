// ...existing code...
"use client"

import { useEffect } from "react"

export default function Confetti({
  duration = 8000, // milliseconds the confetti should last (default increased)
  particleCount = 120, // number of particles
}: {
  duration?: number
  particleCount?: number
}) {
  useEffect(() => {
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
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height * 0.5,
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 3 + 1,
        life: (0.8 + Math.random() * 0.8), // normalized life (will decay by decayPerFrame)
        size: 12 + Math.random() * 12,
        emoji: ["🎉", "🎊", "🎈", "🎁", "⭐"][Math.floor(Math.random() * 5)],
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
          ctx.font = `${p.size}px Arial`
          ctx.fillText(p.emoji, p.x, p.y)
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
// ...existing code...