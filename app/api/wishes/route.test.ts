/** @jest-environment node */
import { GET, POST } from "./route"

const ORIGIN = "https://birthday.example.com"

function post(fields: Record<string, string>, headers: Record<string, string> = {}) {
  const body = new FormData()
  for (const [k, v] of Object.entries(fields)) body.set(k, v)
  return new Request(`${ORIGIN}/api/wishes`, {
    method: "POST",
    body,
    headers: { origin: ORIGIN, host: "birthday.example.com", "x-real-ip": "203.0.113.7", ...headers },
  })
}

// Fake Upstash: answers pipelines and single commands, records what was sent
const sent: unknown[] = []
beforeEach(() => {
  sent.length = 0
  process.env.KV_REST_API_URL = "https://redis.example.com"
  process.env.KV_REST_API_TOKEN = "test-token"
  global.fetch = jest.fn(async (url: string | URL | Request, init?: RequestInit) => {
    const body = JSON.parse(String(init?.body))
    sent.push(body)
    const result = String(url).endsWith("/pipeline") ? body.map(() => ({ result: 1 })) : { result: [] }
    return new Response(JSON.stringify(result), { status: 200 })
  }) as typeof fetch
})

describe("POST /api/wishes", () => {
  it("stores a valid wish as pending", async () => {
    const res = await POST(post({ name: "Asha", message: "Happy birthday" }))
    expect(res.status).toBe(201)
    expect(await res.json()).toEqual({ status: "pending" })
    expect(JSON.stringify(sent)).toContain("wishes:pending")
  })

  it("refuses posts from another site", async () => {
    const res = await POST(post({ name: "A", message: "B" }, { origin: "https://evil.example" }))
    expect(res.status).toBe(403)
    expect(sent).toHaveLength(0)
  })

  it("answers bots quietly and stores nothing", async () => {
    const res = await POST(post({ name: "Bot", message: "Spam", website: "http://x" }))
    expect(res.status).toBe(202)
    expect(sent).toHaveLength(0)
  })

  it("returns the field that failed", async () => {
    const res = await POST(post({ name: "", message: "Hi" }))
    expect(res.status).toBe(400)
    expect(await res.json()).toMatchObject({ field: "name" })
  })

  it("says so plainly when the backend is not connected", async () => {
    delete process.env.KV_REST_API_URL
    const res = await POST(post({ name: "A", message: "B" }))
    expect(res.status).toBe(503)
  })
})

describe("GET /api/wishes", () => {
  it("reports not connected instead of failing", async () => {
    delete process.env.KV_REST_API_URL
    delete process.env.UPSTASH_REDIS_REST_URL
    const res = await GET()
    expect(await res.json()).toEqual({ connected: false, wishes: [] })
  })
})
