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

        {/* Trust Markers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.14 }}
          className="mt-16"
        >
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600">
            {["Secure payouts", "No hidden fees", "Your rights protected", "Verified profiles"].map((marker) => (
              <div key={marker} className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-[#ff914c]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span className="font-semibold">{marker}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
