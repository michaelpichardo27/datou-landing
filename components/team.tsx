"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"

const team = [
  {
    name: "Joseph Ngata",
    role: "Founder & CEO",
    bio: "Visionary leader passionate about empowering creators through Web3 technology.",
  },
  {
    name: "Michael Pichardo",
    role: "Co-Founder & Engineer",
    bio: "Technical architect building the future of creator collaboration.",
  },
]

export function Team() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="team" ref={ref} className="py-32 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-black text-[#0a0a0a] mb-4">
            The People Behind <span className="text-[#ff914c]">DATOU</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A passionate team dedicated to empowering creators worldwide.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
            >
              <Card className="border-none shadow-lg hover:shadow-2xl transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-[#0a0a0a] mb-2">{member.name}</h3>
                  <p className="text-[#ff914c] font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
