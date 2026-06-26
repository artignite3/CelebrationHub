"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import Link from "next/link"
import { loveLetter, name } from "@/lib/siteConfig"

export default function LoveLetterPage() {
  const letterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (letterRef.current) {
      gsap.fromTo(letterRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" })
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 py-12 px-4">
      <Link href="/">
        <button className="mb-8 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300">
          ← Back Home
        </button>
      </Link>

      <div
        ref={letterRef}
        className="max-w-2xl mx-auto bg-gradient-to-br from-amber-100 to-yellow-100 rounded-lg shadow-2xl p-12 border-4 border-amber-200 relative"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg width=%22100%22 height=%22100%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M0 0h100v100H0z%22 fill=%22%23fef3c7%22/%3E%3Cpath d=%22M0 10h100M0 20h100M0 30h100M0 40h100M0 50h100M0 60h100M0 70h100M0 80h100M0 90h100%22 stroke=%22%23ddd6c9%22 strokeWidth=%220.5%22/%3E%3C/svg%3E')",
          backgroundSize: "100% 10px",
        }}
      >
        {/* Letter header */}
        <div className="text-center mb-12 pb-8 border-b-2 border-amber-300">
          <div className="text-6xl mb-4">💌</div>
          <h1 className="text-4xl font-bold text-amber-900 mb-2">{loveLetter.title}</h1>
          <p className="text-amber-700 italic">{loveLetter.subtitle}</p>
        </div>

        {/* Letter content */}
        <div className="space-y-6 text-amber-900 leading-relaxed">
          <p className="text-lg">{loveLetter.opening}</p>

          {loveLetter.paragraphs.map((paragraph, index) => (
            <p key={index}>
              {paragraph}
            </p>
          ))}

          <p className="pt-6">
            {loveLetter.closing}

            <br />
            <span className="text-2xl">{loveLetter.senderEmoji}</span>
            <span className="block mt-2 font-semibold">{loveLetter.senderName}</span>
          </p>

          <p className="text-center text-sm text-amber-700 italic pt-8">
            "{loveLetter.quote}"
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 text-3xl">🎉</div>
        <div className="absolute bottom-4 left-4 text-3xl">🎂</div>
        <div className="absolute top-1/2 right-2 text-2xl">🎈</div>
        <div className="absolute top-1/4 left-2 text-2xl">🎁</div>
      </div>

      {/* Back button */}
      <div className="text-center mt-12">
        <Link href="/">
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105">
            Return to Celebration
          </button>
        </Link>
      </div>
    </div>
  )
}
