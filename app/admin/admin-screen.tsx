"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import type { Wish } from "@/lib/wishes"

type Tab = "pending" | "approved"
const STORE = "wish-admin-key"

const readKey = () => {
  try {
    return sessionStorage.getItem(STORE) ?? ""
  } catch {
    return ""
  }
}

async function fetchWishes(key: string, tab: Tab) {
  const res = await fetch(`/api/admin/wishes?status=${tab}`, { headers: { Authorization: `Bearer ${key}` } })
  const body = (await res.json().catch(() => ({}))) as { wishes?: Wish[]; error?: string }
  return { status: res.status, body }
}

// The owner's screen: read each wish before it reaches the wall.
// The key lives only in this tab's sessionStorage and goes out as a bearer token.
export default function AdminScreen() {
  const [key, setKey] = useState(readKey)
  const [draft, setDraft] = useState("")
  const [tab, setTab] = useState<Tab>("pending")
  const [wishes, setWishes] = useState<Wish[] | null>(null)
  const [note, setNote] = useState("")
  const [busy, setBusy] = useState<string | null>(null)

  useEffect(() => {
    if (!key) return
    let live = true
    fetchWishes(key, tab).then(({ status, body }) => {
      if (!live) return
      if (status === 200) {
        setWishes(body.wishes ?? [])
        setNote("")
        return
      }
      setWishes(null)
      setNote(body.error ?? "Could not load the wishes.")
      if (status === 401) {
        setKey("")
        try {
          sessionStorage.removeItem(STORE)
        } catch {}
      }
    })
    // a slow answer for the previous tab never overwrites the current one
    return () => {
      live = false
    }
  }, [key, tab])

  const act = async (id: string, action: "approve" | "delete") => {
    setBusy(id)
    const res = await fetch("/api/admin/wishes", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ id, action }),
    })
    setBusy(null)
    if (res.ok) setWishes((ws) => ws?.filter((w) => w.id !== id) ?? null)
    else setNote((await res.json().catch(() => ({}))).error ?? "That did not work.")
  }

  if (!key) {
    return (
      <main className="container section" style={{ maxWidth: "36rem" }}>
        <h1 className="display-s">Wishes to read</h1>
        <form
          className="form-card stock stock--framed"
          style={{ marginTop: "var(--space-xl)" }}
          onSubmit={(e) => {
            e.preventDefault()
            try {
              sessionStorage.setItem(STORE, draft)
            } catch {}
            setKey(draft)
          }}
        >
          <div className="field">
            <label htmlFor="key">Admin key</label>
            <input id="key" type="password" autoComplete="current-password" value={draft} onChange={(e) => setDraft(e.target.value)} required />
          </div>
          <div style={{ marginTop: "var(--space-xl)" }}>
            <button type="submit" className="btn">
              Open
            </button>
            <p role="status" className="form-help">
              {note}
            </p>
          </div>
        </form>
      </main>
    )
  }

  return (
    <main className="container section">
      <div className="split split--text" style={{ alignItems: "end" }}>
        <h1 className="display-s">Wishes to read</h1>
        <div role="tablist" aria-label="Which wishes" className="tabs">
          {(["pending", "approved"] as Tab[]).map((t) => (
            <button key={t} role="tab" type="button" aria-selected={tab === t} className="tab" onClick={() => setTab(t)}>
              {t === "pending" ? "Waiting" : "On the wall"}
            </button>
          ))}
        </div>
      </div>

      <p role="status" className="form-help">
        {note}
      </p>

      {wishes && wishes.length === 0 && <p className="muted">Nothing here.</p>}
      <ul className="rows" style={{ marginTop: "var(--space-lg)" }}>
        {wishes?.map((w) => (
          <li key={w.id}>
            <div className="stack">
              <h2 className="item-title">{w.name}</h2>
              <p className="small muted">{new Date(w.createdAt).toLocaleString("en-GB")}</p>
              {w.photoUrl && (
                <div className="wish__photo" style={{ maxWidth: "16rem" }}>
                  <Image src={w.photoUrl} alt={`Photo from ${w.name}`} fill sizes="16rem" />
                </div>
              )}
            </div>
            <div className="stack">
              <p className="wish__message">{w.message}</p>
              <div className="actions">
                {tab === "pending" && (
                  <button type="button" className="btn" disabled={busy === w.id} onClick={() => act(w.id, "approve")}>
                    Put on the wall
                  </button>
                )}
                <button type="button" className="btn btn--quiet" disabled={busy === w.id} onClick={() => act(w.id, "delete")}>
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}
