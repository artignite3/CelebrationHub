import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Countdown from "@/components/countdown"
import { isUnlocked } from "@/lib/birthday"
import { loveLetter } from "@/lib/letter"
import { birthday } from "@/lib/siteConfig"

// Re-checked every five minutes, so the letter opens on time without a redeploy
export const revalidate = 300

export default function LoveLetterPage() {
  if (!isUnlocked()) return <Sealed />
  return (
    <main className="container" style={{ paddingBlock: "var(--space-xl) var(--section-gap-s)" }}>
      <Link href="/" className="link back">
        <ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" />
        Home
      </Link>

      <article className="sheet stock reveal" style={{ marginTop: "var(--space-xl)" }}>
        <header>
          <h1 className="display-s">{loveLetter.title}</h1>
          <p className="lead muted" style={{ marginTop: "var(--space-sm)" }}>
            {loveLetter.subtitle}
          </p>
        </header>

        <div className="sheet__body" style={{ marginTop: "var(--space-2xl)" }}>
          <p>{loveLetter.opening}</p>
          {loveLetter.paragraphs.map((paragraph, i) => (
            <p key={paragraph} className={i === 0 ? "dropcap" : undefined}>
              {paragraph}
            </p>
          ))}
          <p style={{ marginTop: "var(--space-xl)" }}>{loveLetter.closing}</p>
          <p className="sign" style={{ marginTop: "var(--space-xs)" }}>
            {loveLetter.senderName}
          </p>
        </div>

        <p
          className="display-s"
          style={{
            marginTop: "var(--space-2xl)",
            paddingTop: "var(--space-xl)",
            borderTop: "var(--rule-hair) solid var(--color-rule)",
            fontFamily: "var(--font-display)",
            fontWeight: "var(--statement-weight)",
            fontSize: "var(--text-xl)",
            color: "var(--color-ink)",
          }}
        >
          {loveLetter.quote}
        </p>
      </article>

      <div style={{ marginTop: "var(--space-xl)", textAlign: "center" }}>
        <Link href="/" className="btn">
          Return to celebration
        </Link>
      </div>
    </main>
  )
}

// Before the day: the envelope, not the letter. The text is never sent to the browser.
function Sealed() {
  return (
    <main className="container" style={{ paddingBlock: "var(--space-xl) var(--section-gap-s)" }}>
      <Link href="/" className="link back">
        <ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" />
        Home
      </Link>
      <article className="sheet stock stock--framed seal reveal" style={{ marginTop: "var(--space-xl)" }}>
        <h1 className="display-s">{loveLetter.title}</h1>
        <p className="lead muted">Sealed until {birthday.date.replace(/\s\d{4}$/, "")}</p>
        <Countdown />
      </article>
    </main>
  )
}
