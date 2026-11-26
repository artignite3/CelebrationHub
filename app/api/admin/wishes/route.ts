import { createHash, timingSafeEqual } from "node:crypto"
import { del } from "@vercel/blob"
import { redisConfigured } from "@/lib/redis"
import { approveWish, clientKey, deleteWish, getWish, isWishId, listWishes, overLimit, underLimit } from "@/lib/wishes"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const json = (body: unknown, status = 200) => Response.json(body, { status })
const digest = (s: string) => createHash("sha256").update(s).digest()

// Bearer token compared in constant time; an unset or short ADMIN_TOKEN disables the admin entirely
function authorized(req: Request): boolean {
  const token = process.env.ADMIN_TOKEN
  if (!token || token.length < 24) return false
  const given = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? ""
  return timingSafeEqual(digest(given), digest(token))
}

const MAX_FAILURES_PER_HOUR = 10

// Only wrong keys count against the limit, so the owner can moderate freely;
// after ten wrong keys in an hour from one address, the key is not even compared
async function guard(req: Request): Promise<Response | null> {
  if (!redisConfigured()) return json({ error: "The wish wall is not connected yet." }, 503)
  const failures = `admin-fail:${clientKey(req)}`
  if (await overLimit(failures, MAX_FAILURES_PER_HOUR)) return json({ error: "Too many wrong keys. Try again in an hour." }, 429)
  if (!authorized(req)) {
    await underLimit(failures, MAX_FAILURES_PER_HOUR)
    return json({ error: "That key is not right." }, 401)
  }
  return null
}

export async function GET(req: Request) {
  const denied = await guard(req)
  if (denied) return denied
  const status = new URL(req.url).searchParams.get("status") === "approved" ? "approved" : "pending"
  return json({ wishes: await listWishes(status, 100) })
}

export async function POST(req: Request) {
  const denied = await guard(req)
  if (denied) return denied

  const body = (await req.json().catch(() => null)) as { id?: unknown; action?: unknown } | null
  if (!body || !isWishId(body.id) || (body.action !== "approve" && body.action !== "delete")) {
    return json({ error: "Send an id and an action of approve or delete." }, 400)
  }
  const wish = await getWish(body.id)
  if (!wish) return json({ error: "That wish no longer exists." }, 404)

  if (body.action === "approve") {
    await approveWish(wish)
  } else {
    await deleteWish(wish.id)
    if (wish.photoUrl && process.env.BLOB_READ_WRITE_TOKEN) await del(wish.photoUrl).catch(() => {})
  }
  return json({ ok: true })
}
