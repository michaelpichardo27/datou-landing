"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircleIcon, UsersIcon, StarIcon, CreditCardIcon, SearchIcon, CoinsIcon } from "@/components/icons"
import { TooltipInfo } from "@/components/TooltipInfo"
import { OwnershipDrawer } from "@/components/OwnershipDrawer"

const features = [
  {
    icon: CheckCircleIcon,
    title: "Verified Profiles",
    description: "Build trust with verified creator and agency accounts.",
  },
  {
    icon: UsersIcon,
    title: "Collaboration Boards",
    description: "Post and discover gigs, castings, and shoots.",
  },
  {
    icon: StarIcon,
    title: "Portfolio & Ratings",
    description: "Showcase work with social proof.",
  },
  {
    icon: CreditCardIcon,
    title: "Payments & Licensing",
    description: "Secure payouts and content protection.",
  },
  {
    icon: SearchIcon,
    title: "Creator Discovery",
    description: "Powerful search and matching.",
  },
  {
    icon: CoinsIcon,
    title: "Tokenized Monetization",
    description: "Reward participation and virality. Earn more as your work's reused. Enable later — totally optional.",
    hasTooltip: true,
  },
]

export function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="features" ref={ref} className="py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-black text-[#0a0a0a] mb-4">
            The DATOU <span className="text-[#ff914c]">Platform</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to collaborate, create, and monetize your work.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full border-2 border-transparent hover:border-[#ff914c] transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-[#ff914c]/20 bg-white">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <feature.icon className="w-12 h-12 text-[#ff914c]" />
                    {feature.hasTooltip && (
                      <div className="flex items-center gap-2">
                        <OwnershipDrawer>
                          <button className="text-xs text-[#ff914c] hover:text-[#ff914c]/80 font-semibold underline decoration-[#ff914c]/30 hover:decoration-[#ff914c]">
                            Why tokens?
                          </button>
                        </OwnershipDrawer>
                        <TooltipInfo term={feature.title} />
                      </div>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-[#0a0a0a] mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
