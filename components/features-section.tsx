import Link from "next/link"
import { features } from "@/lib/siteConfig"

export default function FeaturesSection() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="border-t border-ink/8 px-6 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[5fr_7fr] md:gap-16">
        <h2
          id="features-heading"
          className="font-serif text-4xl leading-[1.1] font-normal tracking-[-0.02em] text-balance md:text-5xl"
        >
          {features.title}
        </h2>
        <div>
          <p className="max-w-[36rem] text-lg leading-[30px] text-ink-2">{features.description}</p>
          <Link href={features.buttonLink} className="btn-secondary mt-8">
            {features.buttonText}
          </Link>
        </div>
      </div>
    </section>
  )
}
