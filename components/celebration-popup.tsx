"use client"

import { forwardRef, useImperativeHandle, useState, useEffect } from "react"
import Confetti from "./confetti"
import { name } from "@/lib/siteConfig"

const CelebrationPopup = forwardRef((_, ref) => {
  const [isOpen, setIsOpen] = useState(false)

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
  }))

  useEffect(() => {
    if (!isOpen) return
    const close = () => setIsOpen(false)
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close()
    const timer = setTimeout(close, 4000)
    window.addEventListener("keydown", onKey)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("keydown", onKey)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      <div className="scrim" onClick={() => setIsOpen(false)}>
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="wish-heading"
          className="dialog stock stock--framed reveal"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 id="wish-heading" className="display-s">
            Happy birthday, {name.nickname || name.first}
          </h2>
          <p className="lead" style={{ marginTop: "var(--space-md)" }}>
            Wishing you a day full of joy, laughter and moments worth keeping.
          </p>
        </div>
      </div>
      <Confetti duration={4000} />
    </>
  )
})

CelebrationPopup.displayName = "CelebrationPopup"
export default CelebrationPopup
