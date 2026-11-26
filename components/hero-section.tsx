import Link from "next/link"
import Print from "./print"
import { name, hero } from "@/lib/siteConfig"

export default function HeroSection() {
  return (
    <section id="home" aria-labelledby="hero-heading" className="hero container">
      <div className="split">
        <div className="reveal">
          <h1 id="hero-heading" className="display-s">
            {hero.greeting}, {name.first}
          </h1>
          <p className="lead" style={{ marginTop: "var(--space-lg)" }}>
            {hero.celebrationMessage}
          </p>
          <ul className="index" style={{ marginTop: "var(--space-xl)" }}>
            {hero.index.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>
                  <span className="index__title">{item.title}</span>
                  <span className="index__meta">{item.meta}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal" style={{ ["--i" as string]: 1, display: "grid" }}>
          <Print src="/data/pic/3.jpg" number={3} priority />
        </div>
      </div>
    </section>
  )
}
