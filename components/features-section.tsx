"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"

gsap.registerPlugin(ScrollTrigger)

export default function FeaturesSection() {
  const featuresRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (featuresRef.current) {
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
        featuresRef.current.querySelector(".click-me-button"),
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
  }, [])

  return (
    <section ref={featuresRef} id="celebrate" className="relative py-32 px-4 bg-black">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-6xl font-bold text-white mb-12 text-balance">What's So Special Today</h2>
        <p className="text-xl text-blue-300 mb-16 max-w-2xl mx-auto leading-relaxed">
          Today marks another year of your incredible journey. It's a day to celebrate who you are, the impact you've
          made, and all the beautiful moments yet to come. Let's make this day unforgettable.
        </p>

        <Link href="/love-letter">
          <button className="click-me-button px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 text-lg shadow-lg shadow-cyan-500/50">
            Click Me 💌
          </button>
        </Link>
      </div>
    </section>
  )
}
