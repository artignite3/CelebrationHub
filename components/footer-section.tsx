import { footer } from "@/lib/siteConfig"

export default function FooterSection() {
  return (
    <footer className="border-t border-ink/8 px-6 py-12 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 text-sm md:flex-row md:justify-between">
        <p className="text-ink-2">{footer.message}</p>
        <p className="text-ink-3">{footer.creator}</p>
      </div>
    </footer>
  )
}
