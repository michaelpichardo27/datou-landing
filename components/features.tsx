"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircleIcon, UsersIcon, StarIcon, CreditCardIcon, SearchIcon, CoinsIcon } from "@/components/icons"
import { TooltipInfo } from "@/components/TooltipInfo"
import { OwnershipDrawer } from "@/components/OwnershipDrawer"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { trackModalOpened } from "@/lib/analytics"
import { AnimatedSectionTitle } from "@/components/animated-section-title"

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
    previewImage: "/creative-collaboration-workspace.jpg",
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
    description: "Reward participation and virality. Earn more as your work's reused. Enable later - totally optional.",
    hasTooltip: true,
  },
]

export function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)
  
  const handleOpenModal = () => {
    setIsModalOpen(true)
    trackModalOpened("how_it_works")
  }

  const steps = [
    {
      title: "Create Profile",
      description: "Sign up with your email and upload your portfolio",
      icon: "👤",
    },
    {
      title: "Connect & Collaborate",
      description: "Post gigs, apply to opportunities, and connect with creators",
      icon: "🤝",
    },
    {
      title: "Get Paid",
      description: "Receive standard payouts. Enable ownership & tokens anytime (optional)",
      icon: "💰",
    },
  ]

  return (
    <section id="features" ref={ref} className="py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <AnimatedSectionTitle>
            <h2 className="text-5xl md:text-6xl font-black text-[#0a0a0a] mb-4">
              The DATOU <span className="text-[#ff914c]">Platform</span>
            </h2>
          </AnimatedSectionTitle>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Everything you need to collaborate, create, and monetize your work.
          </motion.p>
        </div>

        <div className="relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => feature.previewImage && setHoveredFeature(feature.title)}
                onMouseLeave={() => setHoveredFeature(null)}
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
          
          {/* Image Preview on Hover */}
          {hoveredFeature && (() => {
            const feature = features.find(f => f.title === hoveredFeature && f.previewImage)
            if (!feature?.previewImage) return null
            return (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute top-0 right-0 w-96 h-64 rounded-lg overflow-hidden shadow-2xl z-10 border-2 border-[#ff914c]/30 hidden lg:block"
                style={{ pointerEvents: 'none' }}
              >
                <img
                  src={feature.previewImage}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )
          })()}
        </div>

        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <h3 className="text-3xl font-black text-[#0a0a0a] mb-4">
            How It <span className="text-[#ff914c]">Works</span>
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get started in 60 seconds - no crypto required
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 rounded-full bg-[#ff914c]/10 flex items-center justify-center text-4xl mb-4">
                  {step.icon}
                </div>
                <h4 className="text-xl font-bold text-[#0a0a0a] mb-2">{step.title}</h4>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-col items-center gap-4"
          >
            <Button
              onClick={handleOpenModal}
              className="bg-[#ff914c] hover:bg-[#ff914c]/90 text-[#0a0a0a] font-bold px-8 py-6 text-lg"
            >
              Watch 60-Second Overview
            </Button>
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <CheckCircleIcon className="w-5 h-5 text-[#ff914c]" />
              <span>No wallet required to get started</span>
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* How It Works Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white z-[100]">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black text-[#0a0a0a]">
              How DATOU Works
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-base pt-2">
              Get started in 60 seconds - no crypto required
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-6">
            {steps.map((step, index) => (
              <div key={step.title} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[#ff914c]/10 flex items-center justify-center text-2xl">
                  {step.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#0a0a0a] mb-2">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Video placeholder */}
          <div className="mt-6 rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200">
            <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-[#ff914c]/10 to-[#0a0a0a]/10">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-[#ff914c] flex items-center justify-center mx-auto mb-3 shadow-lg shadow-[#ff914c]/30">
                  <svg
                    className="w-8 h-8 text-white ml-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-600 font-semibold">Watch How It Works</p>
                <p className="text-xs text-gray-500 mt-1">60-second overview</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
            <CheckCircleIcon className="w-5 h-5 text-[#ff914c]" />
            <span className="font-semibold">No wallet required to get started</span>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
