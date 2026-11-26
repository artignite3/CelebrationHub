"use client"

import { useState } from "react"
import Link from "next/link"
import { Flame, Menu, X } from "lucide-react"
import { navBrand, navItems } from "@/lib/siteConfig"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-ink/8 bg-page/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-8">
        <Link href="/" className="flex items-center gap-2 rounded-sm text-[17px] font-medium text-ink">
          <Flame size={18} strokeWidth={1.5} className="text-flame" aria-hidden="true" />
          {navBrand}
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="link-quiet -mr-2 p-2 md:hidden"
        >
          {isOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>

        <div
          className={`${isOpen ? "flex" : "hidden"} absolute top-16 left-0 right-0 flex-col gap-1 border-b border-ink/8 bg-page px-6 py-4 md:static md:flex md:flex-row md:gap-8 md:border-0 md:bg-transparent md:p-0`}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="link-quiet py-2 text-[15px] md:py-0"
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
