"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import { features } from "@/lib/siteConfig"

gsap.registerPlugin(ScrollTrigger)

export default function FeaturesSection() {
  const featuresRef = useRef<HTMLDivElement>(null);
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
    if (featuresRef.current && !prefersReducedMotion) {
      gsap.fromTo(
        featuresRef.current.querySelector("h2"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 75%",
            end: "top 25%",
            scrub: 1,
            markers: false,
          },
        },
      )

      gsap.fromTo(
        featuresRef.current.querySelector(".cta-button"),
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 75%",
            end: "top 25%",
            scrub: 1,
            markers: false,
          },
        },
      )
    }
  }, [featuresRef, prefersReducedMotion])

  return (
    <section
      ref={featuresRef}
      id="features"
      aria-labelledby="features-heading"
      className="py-32 px-4 bg-gradient-to-b from-black via-slate-900 to-black"
    >
      <div className="max-w-6xl mx-auto">
        <h2 id="features-heading" className="text-6xl md:text-7xl font-bold text-white mb-4 text-center text-balance">
          {features.title}
        </h2>

        <p className="text-xl text-blue-200 text-center mb-16 max-w-3xl mx-auto">
          {features.description}
        </p>

        <div className="flex justify-center">
          <Link href={features.buttonLink}
            className="inline-block px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded-lg transition-all duration-300 transform hover:scale-105 text-lg cta-button"
            role="button"
            aria-label={features.buttonText}
          >
            {features.buttonText}
          </Link>
        </div>
      </div>
    </section>
  )
}