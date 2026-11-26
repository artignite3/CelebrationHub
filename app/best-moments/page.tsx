import Navigation from "@/components/navigation"
import BestMomentsCard from "@/components/best-moments-card"
import FooterSection from "@/components/footer-section"
import { bestMoments } from "@/lib/siteConfig"

export default function BestMomentsPage() {
  return (
    <>
      <Navigation />

      <main className="section container">
        <div className="stack reveal">
          <h1 className="display-s">{bestMoments.title}</h1>
          <p className="lead">{bestMoments.description}</p>
        </div>

        <ol className="rows rows--moments reveal" style={{ marginTop: "var(--space-2xl)", ["--i" as string]: 1 }}>
          {bestMoments.moments.map((moment) => (
            <BestMomentsCard key={moment.title} title={moment.title} description={moment.description} date={moment.date} />
          ))}
        </ol>
      </main>

      <FooterSection />
    </>
  )
}
