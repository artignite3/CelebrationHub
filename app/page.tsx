import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import GallerySection from "@/components/gallery-section"
import FeaturesSection from "@/components/features-section"
import FooterSection from "@/components/footer-section"
import WishWall from "@/components/wish-wall"

// The letter teaser opens on the birthday: re-render every five minutes
export const revalidate = 300

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <GallerySection />
        <FeaturesSection />
        <WishWall />
      </main>
      <FooterSection />
    </>
  )
}
