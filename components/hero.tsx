"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CheckCircleIcon } from "@/components/icons"
import { trackModalOpened } from "@/lib/analytics"

export function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false)

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
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#ff914c]/10 to-[#0a0a0a]/20">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#ff914c]/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#0a0a0a]/10 rounded-full blur-[150px] animate-pulse" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-6xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-[#0a0a0a] mb-6 text-balance leading-[0.9] tracking-tight"
          >
            Web3 Marketplace for Creators. <span className="text-[#ff914c]">Effortless Collaboration.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl md:text-2xl text-gray-700 mb-4 text-pretty max-w-4xl mx-auto leading-relaxed"
          >
            DATOU unites photographers, videographers, models, and agencies to collaborate, monetize, and own their
            work.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg text-[#ff914c] font-semibold mb-8"
          >
            No crypto know-how needed — create, collaborate, and get paid fairly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-[#ff914c] hover:bg-[#ff914c]/90 text-[#0a0a0a] text-lg px-10 py-7 shadow-xl shadow-[#ff914c]/30 font-bold hover:scale-105 transition-transform"
              >
                <a href="#waitlist">Join Waitlist</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-[#0a0a0a] text-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-white text-lg px-10 py-7 font-bold hover:scale-105 transition-all bg-transparent"
              >
                <a href="#vision">Our Vision</a>
              </Button>
            </div>
            <p className="text-xs text-gray-500">Start free • Wallet optional</p>
            <button
              onClick={handleOpenModal}
              className="text-sm text-[#ff914c] hover:text-[#ff914c]/80 font-semibold transition-colors"
            >
              How it works (1 min)
            </button>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-2">
              <Button
                asChild
                variant="outline"
                className="border border-[#ff914c] text-[#ff914c] hover:bg-[#ff914c] hover:text-white px-6"
              >
                <a href="/signup?role=creator">I'm a Creator</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border border-[#ff914c] text-[#ff914c] hover:bg-[#ff914c] hover:text-white px-6"
              >
                <a href="/signup?role=agency">I'm an Agency</a>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-[#ff914c] rounded-full flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-[#ff914c] rounded-full" />
        </motion.div>
      </motion.div>

      {/* How It Works Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white z-[100]">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black text-[#0a0a0a]">
              How DATOU Works
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-base pt-2">
              Get started in 60 seconds — no crypto required
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
