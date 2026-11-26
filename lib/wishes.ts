import { createHash } from "node:crypto"
import { pipeline, redis } from "./redis"

export interface Wish {
  id: string
  name: string
  message: string
  photoUrl?: string
  createdAt: number
}

export type WishStatus = "pending" | "approved"

export const LIMITS = {
  name: 60,
  message: 500,
  // Vercel functions accept 4.5 MB bodies; the browser shrinks photos well below this first
  photoBytes: 4 * 1024 * 1024,
  wishesPerHour: 5,
} as const

const KEY = {
  wish: (id: string) => `wish:${id}`,
  list: (status: WishStatus) => `wishes:${status}`,
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
export const isWishId = (id: unknown): id is string => typeof id === "string" && UUID.test(id)

// ---------- Validation (pure, tested) ----------

type Field = "name" | "message" | "photo"
export type Validation =
  | { ok: true; value: { name: string; message: string } }
  | { ok: false; spam?: true; error: string; field?: Field }

// Control characters except tab and newline, plus bidi overrides and isolates
// (U+202A to U+202E, U+2066 to U+2069) that could make a wish display reversed or disguised
const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F‪-‮⁦-⁩]/g

export function validateWish(input: { name: unknown; message: unknown; website?: unknown }): Validation {
  // The website field is hidden from people; only bots fill it in
  if (typeof input.website === "string" && input.website.trim() !== "") {
    return { ok: false, spam: true, error: "Rejected" }
  }
  if (typeof input.name !== "string" || typeof input.message !== "string") {
    return { ok: false, error: "Write your name and a message.", field: "name" }
  }
  const name = input.name.replace(CONTROL, "").replace(/\s+/g, " ").trim()
  const message = input.message.replace(CONTROL, "").replace(/\r\n?/g, "\n").replace(/\n{3,}/g, "\n\n").trim()

  if (!name) return { ok: false, error: "Write your name.", field: "name" }
  if (name.length > LIMITS.name) return { ok: false, error: `Keep your name under ${LIMITS.name} characters.`, field: "name" }
  if (!message) return { ok: false, error: "Write a message.", field: "message" }
  if (message.length > LIMITS.message) {
    return { ok: false, error: `Keep the message under ${LIMITS.message} characters.`, field: "message" }
  }
  return { ok: true, value: { name, message } }
}

// Trust the bytes, not the file name or the browser's content type
export function sniffImage(bytes: Uint8Array): { ext: "jpg" | "png" | "webp"; type: string } | null {
  const b = bytes
  if (b.length > 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return { ext: "jpg", type: "image/jpeg" }
  if (b.length > 8 && b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return { ext: "png", type: "image/png" }
  if (
    b.length > 12 &&
    b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 &&
    b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50
  ) {
    return { ext: "webp", type: "image/webp" }
  }
  return null
}

// ---------- Request identity, without storing anyone's IP ----------

export function clientKey(req: Request): string {
  const ip = req.headers.get("x-real-ip") ?? req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
  // A secret salt, so the hashed IPs in Redis cannot be reversed by hashing every IPv4 address
  const salt = process.env.RATE_LIMIT_SALT ?? process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN ?? ""
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32)
}

// Fixed one-hour window; true while the caller is under the limit
export async function underLimit(key: string, limit: number, windowSec = 3600): Promise<boolean> {
  const bucket = `rl:${key}:${Math.floor(Date.now() / 1000 / windowSec)}`
  const [count] = (await pipeline([
    ["INCR", bucket],
    ["EXPIRE", bucket, windowSec, "NX"],
  ])) as [number, number]
  return count <= limit
}

// Read-only check of the same window, for counting failures without charging successes
export async function overLimit(key: string, limit: number, windowSec = 3600): Promise<boolean> {
  const bucket = `rl:${key}:${Math.floor(Date.now() / 1000 / windowSec)}`
  const count = Number((await redis<string | null>("GET", bucket)) ?? 0)
  return count >= limit
}

// ---------- Storage ----------

export async function createWish({ id, name, message, photoUrl }: { name: string; message: string; photoUrl?: string; id?: string }) {
  const wish: Wish = { id: id ?? crypto.randomUUID(), name, message, createdAt: Date.now(), ...(photoUrl ? { photoUrl } : {}) }
  await pipeline([
    ["SET", KEY.wish(wish.id), JSON.stringify(wish)],
    ["ZADD", KEY.list("pending"), wish.createdAt, wish.id],
  ])
  return wish
}

export async function listWishes(status: WishStatus, limit = 60): Promise<Wish[]> {
  const ids = await redis<string[]>("ZRANGE", KEY.list(status), 0, limit - 1, "REV")
  if (!ids?.length) return []
  const rows = await redis<(string | null)[]>("MGET", ...ids.map(KEY.wish))
  return rows.flatMap((row) => (row ? [JSON.parse(row) as Wish] : []))
}

export async function getWish(id: string): Promise<Wish | null> {
  const row = await redis<string | null>("GET", KEY.wish(id))
  return row ? (JSON.parse(row) as Wish) : null
}

export async function approveWish(wish: Wish) {
  await pipeline([
    ["ZREM", KEY.list("pending"), wish.id],
    ["ZADD", KEY.list("approved"), wish.createdAt, wish.id],
  ])
}

export async function deleteWish(id: string) {
  await pipeline([
    ["ZREM", KEY.list("pending"), id],
    ["ZREM", KEY.list("approved"), id],
    ["DEL", KEY.wish(id)],
  ])
}
