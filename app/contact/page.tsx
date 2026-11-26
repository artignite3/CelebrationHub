"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import { contact } from "@/lib/siteConfig"
import { shrinkPhoto } from "@/lib/shrink-photo"

type Field = "name" | "message" | "photo"
type State = { kind: "idle" | "sending" | "sent" | "error"; text: string; field?: Field }

export default function ContactPage() {
  const [state, setState] = useState<State>({ kind: "idle", text: "" })
  const [preview, setPreview] = useState<string | null>(null)

  const onPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setPreview((old) => {
      if (old) URL.revokeObjectURL(old)
      return file ? URL.createObjectURL(file) : null
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    setState({ kind: "sending", text: "Sending your wish" })

    try {
      const photo = data.get("photo")
      if (photo instanceof File && photo.size > 0) {
        data.set("photo", await shrinkPhoto(photo), "photo.jpg")
      } else {
        data.delete("photo")
      }
      const res = await fetch("/api/wishes", { method: "POST", body: data })
      const body = (await res.json().catch(() => ({}))) as { error?: string; field?: Field }
      if (!res.ok) {
        setState({ kind: "error", text: body.error ?? "That did not go through. Try again in a minute.", field: body.field })
        if (body.field) (form.elements.namedItem(body.field) as HTMLElement | null)?.focus()
        return
      }
      form.reset()
      setPreview((old) => {
        if (old) URL.revokeObjectURL(old)
        return null
      })
      setState({ kind: "sent", text: "Thank you. Your wish will appear on the wall once it has been read." })
    } catch {
      setState({ kind: "error", text: "That did not go through. Check your connection and try again." })
    }
  }

  const invalid = (f: Field) => (state.kind === "error" && state.field === f ? true : undefined)

  return (
    <>
      <Navigation />

      <main className="hero container">
        <div className="split split--text">
          <div className="stack reveal">
            <h1>{contact.title}</h1>
            <p className="lead">{contact.description}</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="form-card stock stock--framed reveal"
            style={{ ["--i" as string]: 1 }}
          >
            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" autoComplete="name" maxLength={60} required
                placeholder={contact.formPlaceholders.name} aria-invalid={invalid("name")}
                aria-describedby={invalid("name") ? "form-status" : undefined} />
            </div>

            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" maxLength={500} required
                placeholder={contact.formPlaceholders.message} aria-invalid={invalid("message")}
                aria-describedby={invalid("message") ? "form-status" : undefined} />
            </div>

            <div className="field">
              <label htmlFor="photo">A photo, if you have one</label>
              <input id="photo" name="photo" type="file" accept="image/jpeg,image/png,image/webp"
                onChange={onPhoto} className="file" aria-invalid={invalid("photo")}
                aria-describedby={invalid("photo") ? "form-status" : "photo-help"} />
              <p id="photo-help" className="small muted">JPEG, PNG or WebP. Resized on your phone before it is sent.</p>
              {preview && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={preview} alt="The photo you chose" className="file-preview" />
              )}
            </div>

            {/* A field only bots fill in */}
            <div className="visually-hidden" aria-hidden="true">
              <label htmlFor="website">Leave this empty</label>
              <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div style={{ marginTop: "var(--space-xl)" }}>
              <button type="submit" className="btn" disabled={state.kind === "sending"}>
                {state.kind === "sending" ? "Sending" : contact.submitButtonText}
              </button>
              <p id="form-status" role="status" aria-live="polite" className={`form-help${state.kind === "error" ? " form-help--error" : ""}`}>
                {state.text}
              </p>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}
