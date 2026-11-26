"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { loveLetter } from "@/lib/siteConfig"

export default function LoveLetterPage() {
  const letterRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!letterRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    gsap.fromTo(letterRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" })
  }, [])

  return (
    <div className="min-h-screen px-6 py-8 md:px-8 md:py-12">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="link-quiet inline-flex items-center gap-2 text-[15px]">
          <ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" />
          Home
        </Link>

        <article
          ref={letterRef}
          className="mt-8 rounded-[4px] bg-paper px-6 py-12 text-paper-ink shadow-[0_24px_64px_rgba(0,0,0,0.5)] md:px-16 md:py-16"
        >
          <header className="border-b border-paper-ink/12 pb-8">
            <p className="text-sm text-paper-ink-2">{loveLetter.subtitle}</p>
            <h1 className="mt-2 font-serif text-4xl font-normal tracking-[-0.02em]">{loveLetter.title}</h1>
          </header>

          <div className="mt-10 flex flex-col gap-6 font-serif text-[18px] leading-[30px]">
            <p>{loveLetter.opening}</p>
            {loveLetter.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className="pt-4">
              {loveLetter.closing}
              <span className="mt-2 block font-medium">{loveLetter.senderName}</span>
            </p>
          </div>

          <p className="mt-12 border-t border-paper-ink/12 pt-8 text-center text-sm text-paper-ink-2">
            {loveLetter.quote}
          </p>
        </article>

        <div className="mt-12 text-center">
          <Link href="/" className="btn-secondary">
            Return to celebration
          </Link>
        </div>
      </div>
    </div>
  )
}
