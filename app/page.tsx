import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Vision } from "@/components/vision"
import { Features } from "@/components/features"
import { Team } from "@/components/team"
import { WaitlistSection } from "@/components/waitlist-section"
import { Footer } from "@/components/footer"
import { BackToTop } from "@/components/back-to-top"

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Vision />
      <Features />
      <Team />
      <WaitlistSection />
      <Footer />
      <BackToTop />
    </main>
  )
}
