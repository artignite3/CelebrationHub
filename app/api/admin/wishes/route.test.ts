/** @jest-environment node */
import { GET } from "./route"

const KEY = "a-long-admin-key-for-tests-only-1234"
let failures = 0

function req(token?: string) {
  return new Request("https://birthday.example.com/api/admin/wishes?status=pending", {
    headers: { "x-real-ip": "198.51.100.4", ...(token ? { authorization: `Bearer ${token}` } : {}) },
  })
}

beforeEach(() => {
  failures = 0
  process.env.KV_REST_API_URL = "https://redis.example.com"
  process.env.KV_REST_API_TOKEN = "test-token"
  process.env.ADMIN_TOKEN = KEY
  // Fake Upstash that tracks the failure counter
  global.fetch = jest.fn(async (url: string | URL | Request, init?: RequestInit) => {
    const body = JSON.parse(String(init?.body))
    if (String(url).endsWith("/pipeline")) {
      failures += 1
      return Response.json([{ result: failures }, { result: 1 }])
    }
    if (body[0] === "GET") return Response.json({ result: String(failures) })
    return Response.json({ result: [] })
  }) as typeof fetch
})

describe("admin auth", () => {
  it("lets the right key in without counting it as a failure", async () => {
    for (let i = 0; i < 15; i++) expect((await GET(req(KEY))).status).toBe(200)
    expect(failures).toBe(0)
  })

  it("rejects a wrong or missing key", async () => {
    expect((await GET(req("nope"))).status).toBe(401)
    expect((await GET(req())).status).toBe(401)
  })

  it("stops comparing keys after ten failures in an hour", async () => {
    for (let i = 0; i < 10; i++) await GET(req(`guess-${i}`))
    expect((await GET(req(KEY))).status).toBe(429)
  })

  it("is disabled entirely when ADMIN_TOKEN is short or unset", async () => {
    process.env.ADMIN_TOKEN = "short"
    expect((await GET(req("short"))).status).toBe(401)
    delete process.env.ADMIN_TOKEN
    expect((await GET(req(""))).status).toBe(401)
  })
})
