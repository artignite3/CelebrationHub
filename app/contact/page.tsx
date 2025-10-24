"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"

export default function ContactPage(): JSX.Element {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })

  // debug: confirm imports are components at runtime
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("Navigation import type:", typeof Navigation, Navigation)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Thank you for your message! 🎉")
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black">
      <Navigation />

      <div className="pt-32 px-4 pb-20">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-7xl md:text-8xl font-bold text-white mb-4 text-center text-balance">
            Get in <span className="text-cyan-400">Touch</span>
          </h1>

          <p className="text-xl text-blue-200 text-center mb-12">Share your birthday wishes and special messages</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-blue-900/30 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:border-cyan-500"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-blue-900/30 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:border-cyan-500"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-blue-900/30 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:border-cyan-500 h-32 resize-none"
                placeholder="Your birthday wishes..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Send Wishes 🎉
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}