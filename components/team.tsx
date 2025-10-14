"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"

const team = [
  {
    name: "Joseph Ngata",
    role: "Founder & CEO",
    image: "/joseph-ngata.jpg",
    bio: "Visionary leader passionate about empowering creators through Web3 technology.",
    objectPosition: "center 20%",
  },
  {
    name: "Michael Pichardo",
    role: "Co-Founder & Engineer",
    image: "/michael-pichardo.jpg",
    bio: "Technical architect building the future of creator collaboration.",
    objectPosition: "center 30%",
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
              <Card className="overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 group">
                <div className="relative h-[500px] overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    style={{ objectPosition: member.objectPosition || "center 30%" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
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
