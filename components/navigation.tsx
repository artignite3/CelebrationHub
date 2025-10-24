"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Celebrate", href: "/celebrate" },
    { label: "Gallery", href: "/#gallery" },
    { label: "Best Moments", href: "/best-moments" },
    { label: "Contact", href: "/contact" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-cyan-400">
          🎂 Birthday
        </Link>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div
          className={`${isOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row gap-8 absolute md:relative top-16 md:top-0 left-0 md:left-auto right-0 md:right-auto bg-black md:bg-transparent p-4 md:p-0 w-full md:w-auto`}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white hover:text-cyan-400 transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
