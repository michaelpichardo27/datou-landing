"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const result = await response.json()

      if (response.ok) {
        toast({
          title: "You're on the list!",
          description: "We'll notify you when DATOU launches.",
        })
        setEmail("")
      } else {
        toast({
          title: "Error",
          description: result.error || "Something went wrong. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error adding to waitlist:', error)
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-grow bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-[#ff914c] focus:ring-[#ff914c]"
      />
      <Button
        type="submit"
        disabled={isSubmitting}
        className="bg-[#ff914c] hover:bg-[#ff914c]/90 text-[#0a0a0a] shadow-lg shadow-[#ff914c]/30 whitespace-nowrap font-bold border-2 border-[#ff914c]"
      >
        {isSubmitting ? "Joining..." : "Join Waitlist"}
      </Button>
    </form>
  )
}
