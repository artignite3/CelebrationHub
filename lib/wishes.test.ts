/** @jest-environment node */
import { LIMITS, isWishId, sniffImage, validateWish } from "@/lib/wishes"

describe("validateWish", () => {
  it("accepts a normal wish and tidies whitespace", () => {
    const r = validateWish({ name: "  Asha   Rao ", message: "Happy birthday!\r\n\r\n\r\n\r\nLove" })
    expect(r).toEqual({ ok: true, value: { name: "Asha Rao", message: "Happy birthday!\n\nLove" } })
  })

  it("treats a filled honeypot as spam", () => {
    expect(validateWish({ name: "Bot", message: "Buy", website: "http://spam.example" })).toMatchObject({ ok: false, spam: true })
  })

  it("rejects missing, empty and oversized fields", () => {
    expect(validateWish({ name: null, message: "hi" })).toMatchObject({ ok: false })
    expect(validateWish({ name: "   ", message: "hi" })).toMatchObject({ ok: false, field: "name" })
    expect(validateWish({ name: "A", message: " " })).toMatchObject({ ok: false, field: "message" })
    expect(validateWish({ name: "A".repeat(LIMITS.name + 1), message: "hi" })).toMatchObject({ ok: false, field: "name" })
    expect(validateWish({ name: "A", message: "m".repeat(LIMITS.message + 1) })).toMatchObject({ ok: false, field: "message" })
  })

  it("strips control characters", () => {
    const r = validateWish({ name: "A\u0000B", message: "x\u0007y" })
    expect(r).toEqual({ ok: true, value: { name: "AB", message: "xy" } })
  })
})

describe("sniffImage", () => {
  const bytes = (...b: number[]) => new Uint8Array([...b, ...new Array(16).fill(0)])
  it("recognises JPEG, PNG and WebP by their bytes", () => {
    expect(sniffImage(bytes(0xff, 0xd8, 0xff))?.ext).toBe("jpg")
    expect(sniffImage(bytes(0x89, 0x50, 0x4e, 0x47))?.ext).toBe("png")
    expect(sniffImage(bytes(0x52, 0x49, 0x46, 0x46, 0, 0, 0, 0, 0x57, 0x45, 0x42, 0x50))?.ext).toBe("webp")
  })
  it("rejects anything else, whatever it is called", () => {
    expect(sniffImage(new TextEncoder().encode("<svg onload=alert(1)>"))).toBeNull()
    expect(sniffImage(new Uint8Array())).toBeNull()
  })
})

describe("isWishId", () => {
  it("accepts only UUIDs", () => {
    expect(isWishId("3f2b8f0e-1c2d-4e5f-8a9b-0c1d2e3f4a5b")).toBe(true)
    expect(isWishId("wish:1; DEL *")).toBe(false)
    expect(isWishId(42)).toBe(false)
  })
})

describe("display spoofing", () => {
  it("strips bidi overrides that would reverse a wish on the wall", () => {
    const r = validateWish({ name: "\u202EnaM", message: "hi\u2066there\u2069" })
    expect(r).toEqual({ ok: true, value: { name: "naM", message: "hithere" } })
  })
})
