"use client"

import { useSyncExternalStore } from "react"
import { Moon, Sun } from "lucide-react"

type Mode = "light" | "dark"
const KEY = "mode"

// The mode in force: a saved choice on <html data-mode>, else the phone's own setting
function current(): Mode {
  const set = document.documentElement.dataset.mode
  if (set === "light" || set === "dark") return set
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function subscribe(onChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)")
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-mode"] })
  media.addEventListener("change", onChange)
  return () => {
    observer.disconnect()
    media.removeEventListener("change", onChange)
  }
}

export default function ModeToggle() {
  // The server cannot know the mode, so it renders the light label and the browser corrects it
  const mode = useSyncExternalStore(subscribe, current, () => "light" as Mode)
  const next: Mode = mode === "dark" ? "light" : "dark"

  const toggle = () => {
    document.documentElement.dataset.mode = next
    try {
      localStorage.setItem(KEY, next)
    } catch {}
  }

  return (
    <button type="button" className="mode-toggle" onClick={toggle} aria-label={`Switch to ${next} mode`}>
      {mode === "dark" ? <Sun size={18} strokeWidth={1.5} aria-hidden="true" /> : <Moon size={18} strokeWidth={1.5} aria-hidden="true" />}
    </button>
  )
}
