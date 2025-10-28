import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { trackFAQViewed } from "@/lib/analytics"
import { useEffect, useRef } from "react"
import Link from "next/link"

const faqItems = [
  {
    question: "Do I need crypto to use DATOU?",
    answer: "No. Sign up with email and get paid normally.",
    id: "need-crypto",
  },
  {
    question: "What is tokenized monetization?",
    answer: "An optional way to share in value as your work spreads.",
    id: "tokenized-monetization",
  },
  {
    question: "How do payouts work?",
    answer: "Standard payouts (e.g., bank or card processor).",
    id: "payouts",
  },
  {
    question: "Can I skip the blockchain stuff?",
    answer: "Yes — all core features work without it.",
    id: "skip-blockchain",
  },
  {
    question: "When should I enable tokens?",
    answer: "When you want advanced ownership/revenue features.",
    id: "enable-tokens",
  },
]

export default function FAQPage() {
  const hasTracked = useRef(false)

  useEffect(() => {
    if (!hasTracked.current) {
      trackFAQViewed()
      hasTracked.current = true
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-black text-[#0a0a0a] mb-6">
              Frequently Asked <span className="text-[#ff914c]">Questions</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12">
              Short answers for creators who just want to get to work.
            </p>

            {/* Quick jump links */}
            <div className="mb-12 p-6 bg-gray-50 rounded-lg border-2 border-gray-100">
              <h2 className="text-sm font-bold text-[#0a0a0a] mb-4 uppercase tracking-wide">Quick Jump</h2>
              <div className="flex flex-wrap gap-3">
                {faqItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="text-sm text-[#ff914c] hover:text-[#ff914c]/80 font-semibold transition-colors"
                  >
                    {item.question}
                  </a>
                ))}
              </div>
            </div>

            {/* FAQ Items */}
            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <div key={item.id} id={item.id} className="scroll-mt-24">
                  <div className="p-6 border-2 border-gray-200 rounded-lg hover:border-[#ff914c] transition-colors">
                    <h3 className="text-xl font-bold text-[#0a0a0a] mb-3">{item.question}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 p-8 bg-gradient-to-r from-[#ff914c]/10 to-[#0a0a0a]/10 rounded-lg border-2 border-[#ff914c]/20">
              <h3 className="text-2xl font-bold text-[#0a0a0a] mb-4">Still have questions?</h3>
              <p className="text-gray-600 mb-6">
                Reach out to our team—we're here to help you get started.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/#contact"
                  className="bg-[#ff914c] hover:bg-[#ff914c]/90 text-[#0a0a0a] font-bold px-6 py-3 rounded-lg transition-colors text-center"
                >
                  Contact Us
                </Link>
                <Link
                  href="/#waitlist"
                  className="border-2 border-[#ff914c] text-[#ff914c] hover:bg-[#ff914c] hover:text-white font-bold px-6 py-3 rounded-lg transition-colors text-center"
                >
                  Join Waitlist
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

