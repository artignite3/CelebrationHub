import { isUnlocked, timeUntilUnlock, unlockAt } from "@/lib/birthday"

describe("birthday unlock", () => {
  it("opens at midnight in her timezone, not UTC", () => {
    // 23 September 00:00 at +05:30 is 22 September 18:30 UTC
    expect(unlockAt.toISOString()).toBe("2026-09-22T18:30:00.000Z")
  })

  it("is sealed one minute before and open at the moment", () => {
    expect(isUnlocked(new Date(unlockAt.getTime() - 60_000))).toBe(false)
    expect(isUnlocked(unlockAt)).toBe(true)
  })

  it("counts down in days, hours and minutes", () => {
    const now = new Date(unlockAt.getTime() - (2 * 86_400_000 + 3 * 3_600_000 + 4 * 60_000))
    expect(timeUntilUnlock(now)).toMatchObject({ days: 2, hours: 3, minutes: 4 })
    expect(timeUntilUnlock(new Date(unlockAt.getTime() + 1)).ms).toBe(0)
  })
})
