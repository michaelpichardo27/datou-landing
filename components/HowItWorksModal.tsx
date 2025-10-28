"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CheckCircleIcon } from "@/components/icons"
import { trackModalOpened } from "@/lib/analytics"
import { useEffect, useState } from "react"

interface HowItWorksModalProps {
  isOpen: boolean
  onClose: () => void
}

export function HowItWorksModal({ isOpen, onClose }: HowItWorksModalProps) {
  const [hasTracked, setHasTracked] = useState(false)

  useEffect(() => {
    if (isOpen && !hasTracked) {
      trackModalOpened("how_it_works")
      setHasTracked(true)
    }
  }, [isOpen, hasTracked])

  const steps = [
    {
      title: "Create Profile",
      description: "Sign up with your email and upload your portfolio",
      icon: "👤",
    },
    {
      title: "Connect & Collaborate",
      description: "Post gigs, apply to opportunities, and connect with creators",
      icon: "🤝",
    },
    {
      title: "Get Paid",
      description: "Receive standard payouts. Enable ownership & tokens anytime (optional)",
      icon: "💰",
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle className="text-3xl font-black text-[#0a0a0a]">
            How DATOU Works
          </DialogTitle>
          <DialogDescription className="text-gray-600 text-base pt-2">
            Get started in 60 seconds — no crypto required
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 space-y-8">
          {steps.map((step, index) => (
            <div key={step.title} className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#ff914c]/10 flex items-center justify-center text-3xl">
                {step.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-[#0a0a0a]">{step.title}</h3>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute ml-20 mt-10 w-0.5 h-12 bg-gradient-to-b from-[#ff914c]/30 to-transparent" />
                  )}
                </div>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Video placeholder */}
        <div className="mt-8 rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200">
          <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-[#ff914c]/10 to-[#0a0a0a]/10">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-[#ff914c] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#ff914c]/30">
                <svg
                  className="w-10 h-10 text-white ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-sm text-gray-600 font-semibold">Watch How It Works</p>
              <p className="text-xs text-gray-500 mt-1">60-second overview</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-600">
          <CheckCircleIcon className="w-5 h-5 text-[#ff914c]" />
          <span className="font-semibold">No wallet required to get started</span>
        </div>
      </DialogContent>
    </Dialog>
  )
}

