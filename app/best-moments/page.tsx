import Navigation from "@/components/navigation"
import BestMomentsCard from "@/components/best-moments-card"
import FooterSection from "@/components/footer-section"
import { bestMoments } from "@/lib/siteConfig"

export default function BestMomentsPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="mx-auto max-w-6xl px-6 pt-32 pb-24 md:px-8 md:pt-40">
        <h1 className="font-serif text-[44px] leading-[1.06] font-normal tracking-[-0.02em] md:text-[64px] md:tracking-[-0.03em]">
          {bestMoments.title}
        </h1>
        <p className="mt-4 max-w-[36rem] text-lg leading-[30px] text-ink-2">{bestMoments.description}</p>

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {bestMoments.moments.map((moment) => (
            <BestMomentsCard key={moment.title} title={moment.title} description={moment.description} date={moment.date} />
          ))}
        </div>
      </main>

      <FooterSection />
    </div>
  )
}
