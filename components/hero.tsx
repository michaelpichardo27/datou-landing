"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#ff914c]/10 to-[#0a0a0a]/20">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#ff914c] rounded-full blur-[150px] animate-pulse opacity-20" 
          style={{ background: 'radial-gradient(circle, #ff914c 0%, #ffb380 50%, transparent 100%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#ffb380] rounded-full blur-[150px] animate-pulse opacity-20"
          style={{ background: 'radial-gradient(circle, #ffb380 0%, #ff914c 50%, transparent 100%)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[200px] opacity-15"
          style={{ background: 'radial-gradient(circle, #ff914c 0%, #ffb380 30%, transparent 70%)' }} />
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
            className="text-xl md:text-2xl text-gray-700 mb-12 text-pretty max-w-4xl mx-auto leading-relaxed"
          >
            DATOU unites photographers, videographers, models, and agencies to collaborate, monetize, and own their
            work.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center"
          >
            <Button
              asChild
              size="lg"
              className="bg-[#ff914c] hover:bg-[#ff914c]/90 text-[#0a0a0a] text-lg px-10 py-7 shadow-xl shadow-[#ff914c]/30 font-bold hover:scale-105 transition-transform"
            >
              <a href="#waitlist">Join Waitlist</a>
            </Button>
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
    </section>
  )
}
