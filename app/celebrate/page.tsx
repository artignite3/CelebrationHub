"use client"

import { useEffect, useRef } from "react"
import Navigation from "@/components/navigation"
import Confetti from "@/components/confetti"
import Print from "@/components/print"
import { celebrate, name } from "@/lib/siteConfig"

export default function CelebratePage() {
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    audioRef.current?.play().catch(() => {})
  }, [])

  return (
    <>
      <Navigation />
      <Confetti />

      <audio ref={audioRef} loop>
        <source src="/data/music/1.mp3" type="audio/mpeg" />
      </audio>

      <main>
        <section aria-labelledby="celebrate-heading" className="hero container">
          <div className="split">
            <div className="stack reveal">
              <h1 id="celebrate-heading">
                {celebrate.title}, {name.nickname || name.first}
              </h1>
              <p className="lead">{celebrate.description}</p>
            </div>
            <div className="reveal" style={{ ["--i" as string]: 1, display: "grid" }}>
              <Print src="/data/pic/8.jpg" number={8} wide priority />
            </div>
          </div>
        </section>

        <section aria-label="What you are to us" className="section--s container">
          <ul className="rows">
            {celebrate.giftBoxes.map((box) => (
              <li key={box.title}>
                <h2 className="item-title">{box.title}</h2>
                <p className="lead">{box.description}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  )
}
