import type { Metadata } from "next"
import Link from "next/link"
import Navigation from "@/components/navigation"
import Print from "@/components/print"
import ShareButton from "@/components/share-button"
import { birthday, name } from "@/lib/siteConfig"

const title = `Come celebrate ${name.first}`
const text = `${name.first}'s birthday is on ${birthday.date.replace(/\s\d{4}$/, "")}. Leave her a wish.`

export const metadata: Metadata = {
  title,
  description: text,
  openGraph: { title, description: text },
  twitter: { card: "summary_large_image", title, description: text },
}

export default function InvitePage() {
  return (
    <>
      <Navigation />
      <main className="hero container">
        <div className="split">
          <div className="stack reveal">
            <h1>{title}</h1>
            <p className="lead">{text}</p>
            <div className="actions" style={{ paddingTop: "var(--space-xs)" }}>
              <Link href="/contact" className="link" style={{ order: 1 }}>
                Leave a wish
              </Link>
              <ShareButton url="/invite" title={title} text={text} />
            </div>
          </div>
          <div className="reveal" style={{ ["--i" as string]: 1, display: "grid" }}>
            <Print src="/data/pic/3.jpg" number={3} />
          </div>
        </div>
      </main>
    </>
  )
}
