"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface AnimatedSectionTitleProps {
  children: React.ReactNode
  className?: string
}

export function AnimatedSectionTitle({ children, className = "" }: AnimatedSectionTitleProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

