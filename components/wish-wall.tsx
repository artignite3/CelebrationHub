"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import type { Wish } from "@/lib/wishes"

type Load = { kind: "loading" } | { kind: "off" } | { kind: "error" } | { kind: "ready"; wishes: Wish[] }

const when = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long" })

export default function WishWall() {
  const [load, setLoad] = useState<Load>({ kind: "loading" })

  useEffect(() => {
    const ctrl = new AbortController()
    fetch("/api/wishes", { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d: { connected: boolean; wishes: Wish[] }) =>
        setLoad(d.connected ? { kind: "ready", wishes: d.wishes } : { kind: "off" }),
      )
      .catch((e) => {
        if (!ctrl.signal.aborted) setLoad({ kind: "error" })
        if (e?.name !== "AbortError") console.warn("Wish wall failed to load", e)
      })
    return () => ctrl.abort()
  }, [])

  // Until the backend is connected the section stays out of the page
  if (load.kind === "off") return null

  return (
    <section id="wishes" aria-labelledby="wishes-heading" className="section container">
      <div className="split split--text" style={{ alignItems: "end" }}>
        <h2 id="wishes-heading">Wishes for Shreya</h2>
        <div className="stack">
          <p className="lead">From the people who opened this page before you.</p>
          <div>
            <Link href="/contact" className="btn">
              Leave a wish
            </Link>
          </div>
        </div>
      </div>

      <div className="wall" aria-busy={load.kind === "loading"}>
        {load.kind === "loading" && <p className="muted">Gathering wishes</p>}
        {load.kind === "error" && <p className="muted">The wishes could not be loaded just now. Refresh to try again.</p>}
        {load.kind === "ready" && load.wishes.length === 0 && (
          <p className="muted">No wishes on the wall yet. Yours can be the first.</p>
        )}
        {load.kind === "ready" &&
          load.wishes.map((w) => (
            <article key={w.id} className="wish stock">
              {w.photoUrl && (
                <div className="wish__photo">
                  <Image src={w.photoUrl} alt={`A photo from ${w.name}`} fill sizes="(max-width: 60rem) 90vw, 400px" />
                </div>
              )}
              <p className="wish__message">{w.message}</p>
              <p className="wish__from">
                <span className="wish__name">{w.name}</span>
                <time dateTime={new Date(w.createdAt).toISOString()} className="small muted">
                  {when.format(w.createdAt)}
                </time>
              </p>
            </article>
          ))}
      </div>
    </section>
  )
}
