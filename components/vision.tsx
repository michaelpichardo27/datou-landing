"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { CheckCircleIcon } from "@/components/icons"

export function Vision() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const bullets = [
    "Empower creators with ownership",
    "Make collaboration effortless",
    "Align incentives with tokenized value",
  ]

  return (
    <section id="vision" ref={ref} className="py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-5xl md:text-6xl font-black text-[#0a0a0a] mb-6 leading-tight">
              Our{" "}
              <span className="text-[#ff914c] relative">
                Vision
                <span className="absolute bottom-0 left-0 w-full h-1 bg-[#ff914c]" />
              </span>
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed mb-8">
              <p className="text-xl font-semibold">
                DATOU is a marketplace where photographers, videographers, models, and agencies connect for real jobs,
                manage licensing, and get paid. You keep ownership of your work, and advanced token/ownership features
                are optional.
              </p>
              <p>
                Today's algorithms suppress genuine interaction, forcing creators into a race for views rather than
                meaningful collaboration.
              </p>
              <p>
                DATOU reimagines the creative marketplace—where photographers, videographers, and artists connect
                directly, collaborate authentically, and own their work through Web3 technology.
              </p>
              <p className="text-[#ff914c] font-semibold">
                We're building a platform that values quality over quantity, collaboration over competition, and
                ownership over exploitation.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              {bullets.map((bullet, index) => (
                <motion.div
                  key={bullet}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircleIcon className="w-6 h-6 text-[#ff914c] flex-shrink-0" />
                  <span className="text-gray-900 font-medium">{bullet}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#ff914c] to-[#0a0a0a] opacity-20" />
            <img
              src="/creative-collaboration-workspace.jpg"
              alt="Creative collaboration"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
