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
    <section ref={galleryRef} id="gallery" aria-labelledby="gallery-heading" className="section container">
      <audio ref={audioRef} loop>
        <source src="/data/music/1.mp3" type="audio/mpeg" />
      </audio>

      <div className="split split--lead">
        <div className="stack">
          <h2 id="gallery-heading">Your moments</h2>
          <p className="lead">Drag to turn the dome. Tap a photograph to open it.</p>
          <div style={{ paddingTop: "var(--space-xs)" }}>
            <button type="button" onClick={() => popupRef.current?.open()} className="btn">
              Celebrate now
            </button>
          </div>
        </div>

        <div className="dome stock">
          <div className="dome__frame" aria-label="Interactive 3D photo gallery">
            <DomeGallery
              overlayBlurColor="var(--color-paper-2)"
              imageBorderRadius="2px"
              openedImageBorderRadius="2px"
              grayscale={false}
            />
          </div>
        </div>
      </div>

      <CelebrationPopup ref={popupRef} />
    </section>
  )
}
