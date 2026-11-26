import Link from "next/link"
import Countdown from "./countdown"
import { isUnlocked } from "@/lib/birthday"
import { loveLetter } from "@/lib/letter"
import { features } from "@/lib/siteConfig"

// The letter's first lines, as a card handed across: the rest is one link away
const opening = loveLetter.paragraphs[0].split(/(?<=[.!?])\s+/).slice(0, 2).join(" ")

export default function FeaturesSection() {
  const open = isUnlocked()
  return (
    <section id="features" aria-labelledby="features-heading" className="section--l container">
      <div className="split split--text">
        <div className="stack">
          <h2 id="features-heading">{features.title}</h2>
          <p className="lead">{features.description}</p>
          <div style={{ paddingTop: "var(--space-xs)" }}>
            <Link href={features.buttonLink} className="btn">
              {features.buttonText}
            </Link>
          </div>
        </div>

        {!open ? (
          <div className="letter-card stock stock--framed seal">
            <p className="sign">Sealed</p>
            <Countdown />
          </div>
        ) : (
        <blockquote className="letter-card stock stock--framed" style={{ margin: 0 }} cite={features.buttonLink}>
          <p>{loveLetter.opening}</p>
          <p className="dropcap">{opening}</p>
          <p className="sign" style={{ marginTop: "var(--space-xl)" }}>
            {loveLetter.senderName}
          </p>
        </blockquote>
        )}
      </div>
    </section>
  )
}
