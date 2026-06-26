import { footer } from "@/lib/siteConfig"

export default function FooterSection() {
  return (
    <footer className="border-t border-blue-900/50 py-16 px-4 bg-orange-900/10">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-blue-300 mb-4 text-lg">{footer.message}</p>
        <p className="text-slate-500 text-sm">{footer.creator}</p>
      </div>
    </footer>
  )
}