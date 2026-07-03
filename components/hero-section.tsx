"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import PrismaticBurst from "./prismatic-burst"
import { name, hero } from "@/lib/siteConfig"

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (event) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (heroRef.current && !prefersReducedMotion) {
      gsap.fromTo(
        heroRef.current.querySelector("h1"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      )
      gsap.fromTo(
        heroRef.current.querySelector("p"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: "power3.out" },
      )
    }
  }, [heroRef, prefersReducedMotion]);

  return (
    <section
      ref={heroRef}
      id="home"
      aria-label="Hero section with birthday greeting and call to action"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-blue-950 to-black pt-20"
    >
      <div className="absolute inset-0 z-0">
        <PrismaticBurst
          intensity={1.2}
          speed={0.25}
          animationType="rotate3d"
          colors={["#0ea5e9", "#06b6d4", "#0891b2", "#1e40af"]}
          distort={6}
          rayCount={8}
          mixBlendMode="screen"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-6 inline-block text-6xl" aria-hidden="true">🎉</div>
        <h1 className="text-7xl md:text-8xl font-bold text-white mb-4 text-balance">
          {hero.greeting} <span className="text-cyan-400">Birthday {""}</span>
          <span className="bg-gradient-to-r from-red-400 via-orange-300 to-red-500 text-transparent bg-clip-text">
              {name.first}!
            </span>
        </h1>
        <p className="text-2xl md:text-3xl text-blue-200 mb-8 text-balance font-light">
          {hero.celebrationMessage}{" "}
        </p>
        <a
          href="#gallery"
          className="inline-block px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded-lg transition-all duration-300 transform hover:scale-105 text-lg"
        >
          {hero.exploreButtonText}
        </a>
      </div>
    </section>
  )
}
