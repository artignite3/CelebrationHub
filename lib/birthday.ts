import { birthday } from "./siteConfig"

// The letter opens at midnight on the unlock date in her timezone, not the server's
export const unlockAt = new Date(`${birthday.unlockISO}T00:00:00${birthday.utcOffset}`)

export function isUnlocked(now: Date = new Date()): boolean {
  return now.getTime() >= unlockAt.getTime()
}

export function timeUntilUnlock(now: Date = new Date()) {
  const ms = Math.max(0, unlockAt.getTime() - now.getTime())
  return {
    ms,
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor(ms / 3_600_000) % 24,
    minutes: Math.floor(ms / 60_000) % 60,
  }
}
