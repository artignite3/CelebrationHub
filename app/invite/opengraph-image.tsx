import { ImageResponse } from "next/og"
import { birthday, name } from "@/lib/siteConfig"

export const alt = `An invitation to celebrate ${name.first}'s birthday`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// The share card for WhatsApp and friends: the site's paper, ink and pencilled edition line.
// Satori cannot read CSS custom properties, so the theme's tokens are restated here as hex.
const T = { paper: "#ece6dd", card: "#f8f5f0", edge: "#d7cfc4", ink: "#1f160f", muted: "#6b6157", pencil: "#7a7168" }

export default function OpengraphImage() {
  const day = birthday.date.replace(/\s\d{4}$/, "")
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: T.paper, padding: 64, fontFamily: "serif" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            background: T.card,
            border: `1px solid ${T.edge}`,
            padding: 64,
          }}
        >
          <div style={{ display: "flex", fontSize: 28, color: T.muted }}>You are invited</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 96, color: T.ink, lineHeight: 1.02, letterSpacing: -2 }}>Come celebrate</div>
            <div style={{ fontSize: 96, color: T.ink, lineHeight: 1.02, letterSpacing: -2 }}>{name.first}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 28, color: T.pencil }}>
            <div style={{ width: 72, borderBottom: `2px solid ${T.pencil}` }} />
            <div>{day}</div>
          </div>
        </div>
      </div>
    ),
    size,
  )
}
