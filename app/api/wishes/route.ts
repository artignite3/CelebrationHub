import { put } from "@vercel/blob"
import { redisConfigured } from "@/lib/redis"
import { LIMITS, clientKey, createWish, listWishes, sniffImage, underLimit, validateWish } from "@/lib/wishes"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const json = (body: unknown, status = 200) => Response.json(body, { status })

// Only this site's own pages may post: a cheap guard against cross-site form posts
function sameOrigin(req: Request) {
  const origin = req.headers.get("origin")
  if (!origin) return false
  try {
    return new URL(origin).host === req.headers.get("host")
  } catch {
    return false
  }
}

// The wish wall: approved wishes only
export async function GET() {
  if (!redisConfigured()) return json({ connected: false, wishes: [] })
  try {
    return json({ connected: true, wishes: await listWishes("approved", 60) })
  } catch (error) {
    console.error("GET /api/wishes failed", error)
    return json({ error: "The wish wall could not be loaded." }, 502)
  }
}

export async function POST(req: Request) {
  if (!redisConfigured()) return json({ error: "The wish wall is not connected yet." }, 503)
  if (!sameOrigin(req)) return json({ error: "Send your wish from the site itself." }, 403)

  const length = Number(req.headers.get("content-length") ?? 0)
  if (length > LIMITS.photoBytes + 64 * 1024) return json({ error: "That photo is too large.", field: "photo" }, 413)
  if (!req.headers.get("content-type")?.startsWith("multipart/form-data")) {
    return json({ error: "Unsupported request." }, 415)
  }

  let form: FormData
  try {
    form = await req.formData()
  } catch {
    return json({ error: "That request could not be read." }, 400)
  }

  const check = validateWish({ name: form.get("name"), message: form.get("message"), website: form.get("website") })
  // Bots get a quiet 202 and nothing is stored
  if (!check.ok) return check.spam ? json({ status: "pending" }, 202) : json({ error: check.error, field: check.field }, 400)

  try {
    if (!(await underLimit(`wish:${clientKey(req)}`, LIMITS.wishesPerHour))) {
      return json({ error: "That is a lot of wishes from one place. Try again in an hour." }, 429)
    }

    const id = crypto.randomUUID()
    let photoUrl: string | undefined
    const photo = form.get("photo")
    if (photo instanceof File && photo.size > 0) {
      if (!process.env.BLOB_READ_WRITE_TOKEN) {
        return json({ error: "Photos are not connected yet. Send your wish without one.", field: "photo" }, 503)
      }
      if (photo.size > LIMITS.photoBytes) return json({ error: "That photo is too large.", field: "photo" }, 413)
      const bytes = new Uint8Array(await photo.arrayBuffer())
      const kind = sniffImage(bytes)
      if (!kind) return json({ error: "Choose a JPEG, PNG or WebP photo.", field: "photo" }, 400)
      const blob = await put(`wishes/${id}.${kind.ext}`, Buffer.from(bytes), {
        access: "public",
        contentType: kind.type,
        addRandomSuffix: true,
      })
      photoUrl = blob.url
    }

    await createWish({ id, ...check.value, photoUrl })
    return json({ status: "pending" }, 201)
  } catch (error) {
    console.error("POST /api/wishes failed", error)
    return json({ error: "That did not go through. Try again in a minute." }, 502)
  }
}
