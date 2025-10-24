"use client"

import { useEffect, useRef } from "react"
import Navigation from "@/components/navigation"
import CakeAnimation from "../../components/cake-animation"
import Confetti from "@/components/confetti"
import PrismaticBurst from "@/components/prismatic-burst"

export default function CelebratePage() {
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {})
    }
  }, [])

  return (
   <div className="relative min-h-screen bg-gradient-to-b from-black via-blue-950 to-black">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <PrismaticBurst
          intensity={1.0}
          speed={0.2}
          animationType="rotate3d"
          colors={["#0ea5e9", "#06b6d4", "#0891b2", "#1e40af", "#7c3aed"]}
          distort={5}
          rayCount={10}
          mixBlendMode="screen"
        />
        </div>
      <Navigation />
      <Confetti />

      <audio ref={audioRef} loop>
        <source src="/data/music/1.mp3" type="audio/mpeg" />
      </audio>

      <div className="pt-32 px-4 min-h-screen flex flex-col items-center justify-center">
        <div className="text-center max-w-2xl">
          <CakeAnimation />

          <h1 className="relative z-2 text-7xl md:text-8xl font-bold text-white mt-8 mb-4 text-balance">
            Happy{" "}
            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 text-transparent bg-clip-text">
              Birthday! {" "}
            </span>
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
              Pankhudi! 
            </span>
          </h1>

          <p className="relative z-2 text-2xl text-blue-200 mb-8 leading-relaxed">
            Today is your special day! Celebrate with joy, laughter, and wonderful memories. You deserve all the
            happiness in the world.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-blue-900/30 border border-cyan-500/30 rounded-xl p-6 backdrop-blur-sm">
              <div className="text-4xl mb-3">🎁</div>
              <h3 className="text-xl font-bold text-white mb-2">Gifts</h3>
              <p className="text-blue-200">Unwrap the joy of giving and receiving</p>
            </div>

            <div className="bg-blue-900/30 border border-cyan-500/30 rounded-xl p-6 backdrop-blur-sm">
              <div className="text-4xl mb-3">🎉</div>
              <h3 className="text-xl font-bold text-white mb-2">Party</h3>
              <p className="text-blue-200">Celebrate with friends and loved ones</p>
            </div>

            <div className="bg-blue-900/30 border border-cyan-500/30 rounded-xl p-6 backdrop-blur-sm">
              <div className="text-4xl mb-3">✨</div>
              <h3 className="text-xl font-bold text-white mb-2">Commit</h3>
              <p className="text-blue-200">BF bana le ab, Kab tak Single Rahegi</p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}
