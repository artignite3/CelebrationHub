"use client"

import { useEffect, useState } from "react"
import { timeUntilUnlock, unlockAt } from "@/lib/birthday"

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`

// The quiet countdown shown while the letter is sealed; reloads the page the moment it opens
export default function Countdown() {
  const [left, setLeft] = useState(() => timeUntilUnlock())

  useEffect(() => {
    const tick = () => {
      const next = timeUntilUnlock()
      setLeft(next)
      if (next.ms === 0) window.location.reload()
    }
    const id = setInterval(tick, 30_000)
    return () => clearInterval(id)
  }, [])

  return (
    <p className="countdown">
      <time dateTime={unlockAt.toISOString()} suppressHydrationWarning>
        {left.days > 0 && `${plural(left.days, "day")}, `}
        {plural(left.hours, "hour")} and {plural(left.minutes, "minute")}
      </time>{" "}
      until the letter opens
    </p>
  )
}
