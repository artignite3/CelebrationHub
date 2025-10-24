"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function CakeAnimation() {
  const cakeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (cakeRef.current) {
      gsap.fromTo(
        cakeRef.current,
        { opacity: 0, scale: 0.5, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: "back.out" },
      )

      gsap.to(cakeRef.current, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    }
  }, [])

  return (
    <div ref={cakeRef} className="text-8xl">
      🎂
    </div>
  )
}
