// A minimal Upstash Redis REST client: one fetch per call, no SDK.
// Reads the env names Vercel's Upstash integration sets (KV_*), or Upstash's own (UPSTASH_*).

type Command = (string | number)[]

function config() {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN
  return url && token ? { url, token } : null
}

export const redisConfigured = () => config() !== null

async function call<T>(path: string, body: unknown): Promise<T> {
  const c = config()
  if (!c) throw new Error("Redis is not configured")
  const res = await fetch(`${c.url}${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${c.token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  })
  if (!res.ok) throw new Error(`Redis request failed with ${res.status}`)
  return (await res.json()) as T
}

export async function redis<T = unknown>(...command: Command): Promise<T> {
  const data = await call<{ result?: T; error?: string }>("", command)
  if (data.error) throw new Error(`Redis: ${data.error}`)
  return data.result as T
}

// Several commands in one round trip
export async function pipeline(commands: Command[]): Promise<unknown[]> {
  const data = await call<{ result?: unknown; error?: string }[]>("/pipeline", commands)
  const failed = data.find((d) => d.error)
  if (failed) throw new Error(`Redis: ${failed.error}`)
  return data.map((d) => d.result)
}
