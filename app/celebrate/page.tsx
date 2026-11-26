"use client"

import { useEffect, useRef } from "react"
import { Flame } from "lucide-react"
import Navigation from "@/components/navigation"
import CakeAnimation from "@/components/cake-animation"
import Confetti from "@/components/confetti"
import { celebrate, name } from "@/lib/siteConfig"

export default function CelebratePage() {
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    audioRef.current?.play().catch(() => {})
  }, [])

  return (
    <div className="min-h-screen">
      <Navigation />
      <Confetti />

      <audio ref={audioRef} loop>
        <source src="/data/music/1.mp3" type="audio/mpeg" />
      </audio>

      <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 pt-28 pb-24 text-center md:px-8">
        <div className="w-40 md:w-48">
          <CakeAnimation />
        </div>

        <h1 className="mt-10 font-serif text-[44px] leading-[1.04] font-normal tracking-[-0.02em] text-balance md:text-[72px] md:tracking-[-0.03em]">
          {celebrate.title}, <span className="text-flame">{name.nickname || name.first}</span>
        </h1>

        <p className="mt-6 max-w-[36rem] text-lg leading-[30px] text-ink-2">{celebrate.description}</p>

        <ul className="mt-16 grid w-full grid-cols-1 gap-4 text-left md:grid-cols-3">
          {celebrate.giftBoxes.map((box) => (
            <li key={box.title} className="rounded-2xl border border-ink/8 bg-surface p-6">
              <Flame size={16} strokeWidth={1.5} className="text-flame" aria-hidden="true" />
              <h2 className="mt-6 text-[17px] font-medium">{box.title}</h2>
              <p className="mt-2 text-[15px] leading-[22px] text-ink-2">{box.description}</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
