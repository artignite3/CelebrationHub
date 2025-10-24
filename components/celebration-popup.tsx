"use client"

import { forwardRef, useImperativeHandle, useState, useEffect, useRef } from "react"
import gsap from "gsap"

const emojis = ["🎂", "🎈", "🎉", "🎊", "🎁"]

const CelebrationPopup = forwardRef((_, ref) => {
  const [isOpen, setIsOpen] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
  }))

  useEffect(() => {
    if (isOpen && popupRef.current) {
      gsap.fromTo(
        popupRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out" },
      )

      if (containerRef.current) {
        for (let i = 0; i < 20; i++) {
          const emoji = document.createElement("div")
          emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)]
          emoji.style.position = "fixed"
          emoji.style.left = Math.random() * 100 + "%"
          emoji.style.top = "100%"
          emoji.style.fontSize = Math.random() * 20 + 20 + "px"
          emoji.style.zIndex = "9999"
          emoji.style.pointerEvents = "none"
          containerRef.current.appendChild(emoji)

          gsap.to(emoji, {
            y: -window.innerHeight - 100,
            opacity: 0,
            duration: Math.random() * 2 + 3,
            ease: "power1.in",
            onComplete: () => emoji.remove(),
          })
        }
      }

      const timer = setTimeout(() => setIsOpen(false), 4000)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-[9998] flex items-center justify-center"
        onClick={() => setIsOpen(false)}
      >
        <div
          ref={popupRef}
          className="bg-gradient-to-br from-pink-500 to-red-500 rounded-3xl p-12 text-center shadow-2xl max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-7xl mb-4">🎂</div>
          <h2 className="text-5xl font-bold text-white mb-4">Happy Birthday PP!</h2>
          <p className="text-xl text-white/90">
            Wishing you a day filled with joy, laughter, and unforgettable moments!
          </p>
        </div>
      </div>
      <div ref={containerRef} />
    </>
  )
})

CelebrationPopup.displayName = "CelebrationPopup"
export default CelebrationPopup
