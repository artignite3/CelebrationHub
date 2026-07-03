"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import DomeGallery from "./dome-gallery"
import LightRays from "./light-rays"
import CelebrationPopup from "./celebration-popup"

gsap.registerPlugin(ScrollTrigger)

export default function GallerySection() {
  const galleryRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const popupRef = useRef<{ open: () => void }>(null)

  useEffect(() => {
    try {
      if (galleryRef.current) {
        gsap.fromTo(
          galleryRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: galleryRef.current,
              start: "top 80%",
              end: "top 20%",
              scrub: 1,
              markers: false,
            },
          },
        )
      }
    } catch (error) {
      console.warn('Error in GSAP animation:', error)
    }

    try {
      const handleIntersection = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          try {
            if (entry.isIntersecting && audioRef.current) {
              audioRef.current
                .play()
                .catch((error) => {
                  console.warn("Audio playback failed:", error);
                  // Fallback: visually indicate audio is unavailable
                  if (galleryRef.current) {
                    galleryRef.current.style.opacity = "0.7";
                  }
                });
            } else if (!entry.isIntersecting && audioRef.current) {
              audioRef.current.pause();
            }
          } catch (error) {
            console.warn('Error in intersection handler:', error)
          }
        })
      }

      const observer = new IntersectionObserver(handleIntersection, { threshold: 0.5 })
      try {
        if (galleryRef.current) {
          observer.observe(galleryRef.current)
        }
      } catch (error) {
        console.warn('Error observing element:', error)
      }

      return () => {
        try {
          observer.disconnect()
        } catch (error) {
          console.warn('Error disconnecting observer:', error)
        }
      }
    } catch (error) {
      console.warn('Error setting up intersection observer:', error)
    }
  }, [])

  return (
    <section
      ref={galleryRef}
      id="gallery"
      aria-labelledby="gallery-heading"
      className="relative py-32 px-4 bg-gradient-to-b from-black via-slate-900 to-black"
    >
      <audio ref={audioRef} loop>
        <source src="/data/music/1.mp3" type="audio/mpeg" />
      </audio>

      <div className="max-w-6xl mx-auto">
        <h2 id="gallery-heading" className="text-6xl font-bold text-white mb-4 text-center text-balance">Your Moments</h2>
        <p className="text-blue-300 text-center mb-16 text-lg">Drag to rotate and explore your special memories</p>

        <div className="relative w-full aspect-video md:aspect-square rounded-3xl overflow-hidden border-2 border-cyan-500/40 bg-gradient-to-b from-slate-900 to-black shadow-2xl">
          <div className="absolute inset-0 z-0">
            <LightRays
              raysOrigin="top-center"
              raysColor="#0ea5e9"
              raysSpeed={0.8}
              lightSpread={1.5}
              rayLength={1.8}
              pulsating={true}
              fadeDistance={0.8}
              saturation={0.9}
              followMouse={true}
              mouseInfluence={0.15}
              noiseAmount={0.1}
              distortion={0.3}
              aria-hidden="true"
            />
          </div>

          <div className="relative z-10 w-full h-full" aria-label="Interactive 3D photo gallery">
            <DomeGallery
              overlayBlurColor="#000000"
              imageBorderRadius="16px"
              openedImageBorderRadius="20px"
              grayscale={false}
            />
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <button
            onClick={() => popupRef.current?.open()}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 text-lg shadow-lg shadow-pink-500/50"
          >
            🎂 Celebrate Now 🎂
          </button>
        </div>
      </div>

      <CelebrationPopup ref={popupRef} />
    </section>
  )
}
