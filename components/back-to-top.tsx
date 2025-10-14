"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpIcon } from "@/components/icons"

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button after scrolling 40% of page height
      const scrolled = window.scrollY
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight
      setIsVisible(scrolled > pageHeight * 0.4)
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href="#home"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-[#ff6600] hover:bg-[#ff6600]/90 flex items-center justify-center text-white shadow-lg shadow-[#ff6600]/50 transition-colors focus-visible:outline-[#ff6600]"
          aria-label="Back to top"
        >
          <ArrowUpIcon className="w-6 h-6" />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
