import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { ValueProposition } from "@/components/value-proposition"
import { Vision } from "@/components/vision"
import { Features } from "@/components/features"
import { Team } from "@/components/team"
import { WaitlistSection } from "@/components/waitlist-section"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { BackToTop } from "@/components/back-to-top"

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <ValueProposition />
      <Vision />
      <Features />
      <Team />
      <WaitlistSection />
      <Contact />
      <Footer />
      <BackToTop />
    </main>
  )
}
