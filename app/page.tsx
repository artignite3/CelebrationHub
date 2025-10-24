"use client"
import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import GallerySection from "@/components/gallery-section"
import FeaturesSection from "@/components/features-section"
import FooterSection from "@/components/footer-section"
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <HeroSection />
      <GallerySection />
      <FeaturesSection />
      <FooterSection />
    </div>
  )
}
