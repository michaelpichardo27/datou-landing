"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { HowItWorksModal } from "@/components/HowItWorksModal"

export function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false)

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
            className="text-lg text-[#ff914c] font-semibold mb-12"
          >
            No crypto know-how required — collaborate, get paid, and own your work.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
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
            <p className="text-sm text-gray-600">Start free • Wallet optional</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-sm text-[#ff914c] hover:text-[#ff914c]/80 font-semibold transition-colors underline decoration-[#ff914c]/30 hover:decoration-[#ff914c]"
            >
              How it works (1 min)
            </button>
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

      <HowItWorksModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}
