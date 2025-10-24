"use client"

import Navigation from "@/components/navigation"
import BestMomentsCard from "@/components/best-moments-card"

export default function BestMomentsPage() {
  const moments = [
    {
      title: "First Smile",
      description: "The moment that changed everything - your first smile that lit up the world",
      emoji: "😊",
      date: "25 Oct 2006",
    },
    {
      title: "Parent's Embrace",
      description: "The warmth and love felt in a parent's embrace, a bond like no other",
      emoji: "👣",
      date: "Lifelong",
    },
    {
      title: "Achievements",
      description: "Every milestone reached, every goal accomplished with determination",
      emoji: "🏆",
      date: "Throughout",
    },
    {
      title: "Friendships",
      description: "The bonds formed with amazing people who make Your life beautiful",
      emoji: "👥",
      date: "Always",
    },
    {
      title: "Explorations",
      description: "Exploring new horizons, trying new things, living life to the fullest",
      emoji: "🌍",
      date: "Every Day",
    },
    {
      title: "Dreams",
      description: "Chasing dreams and believing in the impossible becoming possible",
      emoji: "💭",
      date: "Forever",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black">
      <Navigation />

      <div className="pt-32 px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-7xl md:text-8xl font-bold text-white mb-4 text-center text-balance">
            Best <span className="text-cyan-400">Moments</span>
          </h1>

          <p className="text-xl text-blue-200 text-center mb-16 max-w-2xl mx-auto">
            A collection of the most beautiful moments that make life worth celebrating
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {moments.map((moment, index) => (
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
