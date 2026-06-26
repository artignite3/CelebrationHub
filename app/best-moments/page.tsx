"use client"

import Navigation from "@/components/navigation"
import BestMomentsCard from "@/components/best-moments-card"
import { bestMoments, name } from "@/lib/siteConfig"

export default function BestMomentsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black">
      <Navigation />

      <div className="pt-32 px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-7xl md:text-8xl font-bold text-white mb-4 text-center text-balance">
            {bestMoments.title} <span className="text-cyan-400">Moments</span>
          </h1>

          <p className="text-xl text-blue-200 text-center mb-16 max-w-2xl mx-auto">
            {bestMoments.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bestMoments.moments.map((moment, index) => (
              <BestMomentsCard
                key={index}
                title={moment.title}
                description={moment.description}
                emoji={moment.emoji}
                date={moment.date}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
