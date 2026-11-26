import Link from "next/link"
import { footer, name, navItems } from "@/lib/siteConfig"

export default function FooterSection() {
  return (
    <footer className="footer container">
      <p className="footer__mark">{name.first}</p>
      <nav aria-label="Footer" className="footer__links">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
        <Link href="/invite">Invite someone</Link>
      </nav>
      <div className="footer__base">
        <p>{footer.message}</p>
        <p>{footer.creator}</p>
      </div>
    </footer>
  )
}
