"use client"

import { forwardRef, useImperativeHandle, useState, useEffect, useRef } from "react"
import gsap from "gsap"
import Confetti from "./confetti"
import CakeAnimation from "./cake-animation"
import { name } from "@/lib/siteConfig"

const CelebrationPopup = forwardRef((_, ref) => {
  const [isOpen, setIsOpen] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
  }))

  useEffect(() => {
    if (!isOpen || !popupRef.current) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    gsap.fromTo(
      popupRef.current,
      { opacity: 0, y: reduced ? 0 : 8 },
      { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" },
    )
    const timer = setTimeout(() => setIsOpen(false), 4000)
    return () => clearTimeout(timer)
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 z-[9998] flex items-center justify-center bg-night/70 px-6"
        onClick={() => setIsOpen(false)}
      >
        <div
          ref={popupRef}
          role="dialog"
          aria-label="Birthday wish"
          className="w-full max-w-md rounded-2xl border border-ink/8 bg-surface p-10 text-center shadow-[0_24px_64px_rgba(0,0,0,0.5)]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mx-auto mb-6 w-24">
            <CakeAnimation />
          </div>
          <h2 className="font-serif text-4xl font-normal tracking-[-0.02em]">
            Happy birthday, {name.nickname || name.first}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-2">
            Wishing you a day full of joy, laughter and moments worth keeping
          </p>
        </div>
      </div>
      <Confetti duration={4000} />
    </>
  )
})

CelebrationPopup.displayName = "CelebrationPopup"
export default CelebrationPopup
