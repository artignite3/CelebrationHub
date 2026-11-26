"use client"

import { useEffect, useRef } from "react"
import DomeGallery from "./dome-gallery"
import CelebrationPopup from "./celebration-popup"

export default function GallerySection() {
  const galleryRef = useRef<HTMLElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const popupRef = useRef<{ open: () => void }>(null)

  // Music plays while the gallery is on screen
  useEffect(() => {
    const section = galleryRef.current
    if (!section) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        const audio = audioRef.current
        if (!audio) return
        if (entry.isIntersecting) {
          audio.play().catch((error) => console.warn("Audio playback failed:", error))
        } else {
          audio.pause()
        }
      },
      { threshold: 0.5 },
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={galleryRef}
      id="gallery"
      aria-labelledby="gallery-heading"
      className="scroll-mt-16 border-t border-ink/8 px-6 py-24 md:px-8 md:py-32"
    >
      <audio ref={audioRef} loop>
        <source src="/data/music/1.mp3" type="audio/mpeg" />
      </audio>

      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 id="gallery-heading" className="font-serif text-4xl font-normal tracking-[-0.02em] md:text-5xl">
              Your moments
            </h2>
            <p className="mt-3 text-base text-ink-2">Drag to turn the dome, tap a photo to open it</p>
          </div>
          <button onClick={() => popupRef.current?.open()} className="btn-primary self-start md:self-auto">
            Celebrate now
          </button>
        </div>

        <div
          className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-ink/8 bg-night sm:aspect-[16/10]"
          aria-label="Interactive 3D photo gallery"
        >
          <DomeGallery
            overlayBlurColor="#12110f"
            imageBorderRadius="12px"
            openedImageBorderRadius="16px"
            grayscale={false}
          />
        </div>
      </div>

      <CelebrationPopup ref={popupRef} />
    </section>
  )
}
