"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import gsap from "gsap"
import { name, hero, birthday } from "@/lib/siteConfig"

// Three of her own photos, laid out like prints on a table
const prints = [
  { src: "/data/pic/1.jpg", className: "left-[4%] top-[12%] w-[52%] -rotate-6" },
  { src: "/data/pic/7.jpg", className: "right-[2%] top-[2%] w-[46%] rotate-3" },
  { src: "/data/pic/4.jpg", className: "left-[28%] bottom-[2%] w-[50%] rotate-[1.5deg]" },
]

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!heroRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    gsap.fromTo(
      heroRef.current.querySelectorAll("[data-rise]"),
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power3.out" },
    )
  }, [])

  return (
    <section
      ref={heroRef}
      id="home"
      aria-label="Birthday greeting"
      className="mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-6 pt-28 pb-16 md:grid-cols-2 md:gap-16 md:px-8 md:pt-16 md:pb-0"
    >
      <div>
        <p data-rise className="mb-6 font-mono text-[13px] text-ink-3">
          {birthday.date.replace(/\s\d{4}$/, "")}
        </p>
        <h1
          data-rise
          className="font-serif text-[44px] leading-[1.04] font-normal tracking-[-0.02em] text-balance md:text-[72px] md:tracking-[-0.03em]"
        >
          {hero.greeting},<br />
          <span className="text-flame">{name.first}</span>
        </h1>
        <p data-rise className="mt-6 max-w-[36rem] text-lg leading-[30px] text-ink-2">
          {hero.celebrationMessage}
        </p>
        <div data-rise className="mt-10 flex flex-wrap gap-3">
          <a href="#gallery" className="btn-primary">
            {hero.exploreButtonText}
          </a>
          <Link href="/love-letter" className="btn-secondary">
            {hero.letterButtonText}
          </Link>
        </div>
      </div>

      <div data-rise className="relative mx-auto aspect-[5/4] w-full max-w-[560px]" aria-hidden="true">
        {prints.map((p) => (
          <div
            key={p.src}
            className={`absolute rounded-[4px] bg-paper p-2 pb-8 shadow-[0_16px_40px_rgba(0,0,0,0.45)] ${p.className}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.src} alt="" className="aspect-[4/5] w-full rounded-[2px] object-cover" />
          </div>
        ))}
      </div>
    </section>
  )
}
