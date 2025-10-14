"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Account created!",
      description: "We'll be in touch soon.",
    })

    setFormData({ name: "", email: "", password: "" })
    setIsSubmitting(false)

    // Scroll to contact section
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
    }, 500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="signup-name" className="text-white">
          Name
        </Label>
        <Input
          id="signup-name"
          type="text"
          placeholder="Your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="bg-[#0d0d0d] border-[#2a2a2a] text-white placeholder:text-gray-500 focus:border-[#ff6600] focus:ring-[#ff6600]"
        />
      </div>
      <div>
        <Label htmlFor="signup-email" className="text-white">
          Email
        </Label>
        <Input
          id="signup-email"
          type="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="bg-[#0d0d0d] border-[#2a2a2a] text-white placeholder:text-gray-500 focus:border-[#ff6600] focus:ring-[#ff6600]"
        />
      </div>
      <div>
        <Label htmlFor="signup-password" className="text-white">
          Password
        </Label>
        <Input
          id="signup-password"
          type="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
          className="bg-[#0d0d0d] border-[#2a2a2a] text-white placeholder:text-gray-500 focus:border-[#ff6600] focus:ring-[#ff6600]"
        />
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#ff6600] hover:bg-[#ff6600]/90 text-white shadow-lg shadow-[#ff6600]/50"
      >
        {isSubmitting ? "Creating Account..." : "Create Account"}
      </Button>
    </form>
  )
}
