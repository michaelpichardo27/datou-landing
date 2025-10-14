"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { MailIcon, MapPinIcon } from "@/components/icons"

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    })

    setFormData({ name: "", email: "", message: "" })
    setIsSubmitting(false)

    setTimeout(() => {
      document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })
    }, 500)
  }

  return (
    <section id="contact" ref={ref} className="py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-black text-[#0a0a0a] mb-6">
              Get in <span className="text-[#ff914c]">Touch</span>
            </h2>
            <p className="text-xl text-gray-700">Have questions? We'd love to hear from you.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#ff914c]/10 flex items-center justify-center flex-shrink-0">
                  <MailIcon className="w-6 h-6 text-[#ff914c]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0a0a0a] mb-2">Email</h3>
                  <a href="mailto:hello@datou.app" className="text-gray-600 hover:text-[#ff914c] transition-colors">
                    hello@datou.app
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#ff914c]/10 flex items-center justify-center flex-shrink-0">
                  <MapPinIcon className="w-6 h-6 text-[#ff914c]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0a0a0a] mb-2">Location</h3>
                  <p className="text-gray-600">San Francisco, USA</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <form
                onSubmit={handleSubmit}
                className="space-y-6 border-2 border-[#ff914c]/20 rounded-2xl p-8 bg-white shadow-lg"
              >
                <div>
                  <Label htmlFor="contact-name" className="text-gray-900 font-semibold">
                    Name
                  </Label>
                  <Input
                    id="contact-name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-[#ff914c] focus:ring-[#ff914c]"
                  />
                </div>
                <div>
                  <Label htmlFor="contact-email" className="text-gray-900 font-semibold">
                    Email
                  </Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-[#ff914c] focus:ring-[#ff914c]"
                  />
                </div>
                <div>
                  <Label htmlFor="contact-message" className="text-gray-900 font-semibold">
                    Message
                  </Label>
                  <Textarea
                    id="contact-message"
                    placeholder="Tell us what's on your mind..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-[#ff914c] focus:ring-[#ff914c]"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  className="w-full bg-[#ff914c] hover:bg-[#ff914c]/90 text-[#0a0a0a] shadow-lg shadow-[#ff914c]/30 font-bold text-lg py-6 border-2 border-[#ff914c]"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
