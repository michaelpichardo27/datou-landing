"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { AnimatedSectionTitle } from "@/components/animated-section-title"

export function Vision() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="vision" ref={ref} className="py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnimatedSectionTitle>
              <h2 className="text-5xl md:text-6xl font-black text-[#0a0a0a] mb-6 leading-tight">
                Our{" "}
                <span className="text-[#ff914c] relative">
                  Vision
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-[#ff914c]" />
                </span>
              </h2>
            </AnimatedSectionTitle>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed mb-8">
              <p className="text-xl font-semibold">
                A creator-first marketplace where photographers, videographers, models, and agencies book real work, manage licensing, and get paid.
              </p>
              <p>
                Today, creators chase views instead of collaborations. DATOU connects professionals directly so they can find the right partners, protect their work, and earn from it. Ownership is built in; advanced tokenization is optional.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
