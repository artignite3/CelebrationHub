"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import { contact } from "@/lib/siteConfig"

const field =
  "w-full rounded-[10px] border border-ink/10 bg-raised px-4 py-3 text-[15px] text-ink placeholder:text-ink-3 transition-colors duration-150 ease-out-soft focus:border-flame focus:outline-none"

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [sent, setSent] = useState(false)

  // shortcut: nothing is sent anywhere yet, the form only confirms locally; wire it to an email or form service to deliver wishes
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="mx-auto max-w-xl px-6 pt-32 pb-24 md:px-8 md:pt-40">
        <h1 className="font-serif text-[44px] leading-[1.06] font-normal tracking-[-0.02em] md:text-[56px] md:tracking-[-0.03em]">
          {contact.title}
        </h1>
        <p className="mt-4 text-lg leading-[30px] text-ink-2">{contact.description}</p>

        <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-6">
          <label className="flex flex-col gap-2 text-sm font-medium">
            Name
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={field}
              placeholder={contact.formPlaceholders.name}
              required
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium">
            Email
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={field}
              placeholder={contact.formPlaceholders.email}
              required
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium">
            Message
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={`${field} h-32 resize-none`}
              placeholder={contact.formPlaceholders.message}
              required
            />
          </label>

          <button type="submit" className="btn-primary w-full">
            {contact.submitButtonText}
          </button>
          <p role="status" className="min-h-5 text-sm text-ink-2">
            {sent ? contact.successMessage : ""}
          </p>
        </form>
      </main>
    </div>
  )
}
