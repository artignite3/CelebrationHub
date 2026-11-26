"use client"

import { useState } from "react"

// Opens the phone's share sheet where there is one; otherwise copies the link
export default function ShareButton({ url, title, text }: { url: string; title: string; text: string }) {
  const [note, setNote] = useState("")

  const share = async () => {
    const link = new URL(url, window.location.origin).toString()
    try {
      if (navigator.share) {
        await navigator.share({ url: link, title, text })
        return
      }
      await navigator.clipboard.writeText(link)
      setNote("Link copied")
    } catch (e) {
      if ((e as Error).name !== "AbortError") setNote(`Copy this link: ${link}`)
    }
  }

  return (
    <>
      <button type="button" className="btn" onClick={share}>
        Share the invite
      </button>
      <p role="status" aria-live="polite" className="form-help">
        {note}
      </p>
    </>
  )
}
