"use client"

import { useState } from "react"

interface BestMomentsCardProps {
  title: string
  description: string
  emoji: string
  date: string
}

export default function BestMomentsCard({ title, description, emoji, date }: BestMomentsCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-gradient-to-br from-blue-900/40 to-slate-900/40 border border-cyan-500/30 rounded-2xl p-6 backdrop-blur-sm hover:border-cyan-500/60 transition-all duration-300 transform hover:scale-105"
    >
      <div className="text-5xl mb-4">{emoji}</div>
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-blue-200 mb-4">{description}</p>
      <p className="text-cyan-400 text-sm font-medium">{date}</p>
      {isHovered && <div className="mt-4 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>}
    </div>
  )
}
