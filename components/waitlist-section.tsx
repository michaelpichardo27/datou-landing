"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { WaitlistForm } from "@/components/waitlist-form"

export function WaitlistSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="waitlist" ref={ref} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#ff914c]/5 via-white to-[#0a0a0a]/5">
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-[#ff914c]/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-[#0a0a0a]/10 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-black text-[#0a0a0a] mb-6">
            Join the DATOU <span className="text-[#ff914c]">Waitlist</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto text-pretty leading-relaxed">
            Be first to know when we launch.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.07 }}
          className="max-w-md mx-auto"
        >
          <WaitlistForm />
        </motion.div>
      </div>
    </section>
  )
}
