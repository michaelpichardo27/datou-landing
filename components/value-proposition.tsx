"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function ValueProposition() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
            DATOU is a marketplace where photographers, videographers, models, and agencies connect for real jobs,
            manage licensing, and get paid. You keep ownership of your work, and advanced token/ownership features are
            optional.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

