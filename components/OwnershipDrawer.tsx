"use client"

import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { trackDrawerOpened } from "@/lib/analytics"
import { CheckIcon } from "@/components/icons"
import { useState } from "react"

interface OwnershipDrawerProps {
  children: React.ReactNode
}

const benefits = [
  "Keep rights to your work",
  "Set clear licensing terms",
  "Benefit as your work is reused",
  "Enable any time. Wallet optional at first",
]

export function OwnershipDrawer({ children }: OwnershipDrawerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (open) {
      trackDrawerOpened("ownership")
    }
  }

  return (
    <Drawer open={isOpen} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="bg-white">
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-2xl font-black text-[#0a0a0a]">Ownership & Tokens</DrawerTitle>
          <DrawerDescription className="text-gray-600 text-base mt-2">
            Optional features that give you more control and earnings potential
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-8 space-y-6">
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#ff914c]/10 flex items-center justify-center">
                  <CheckIcon className="w-4 h-4 text-[#ff914c]" />
                </div>
                <p className="text-gray-700 leading-relaxed pt-0.5">{benefit}</p>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 leading-relaxed">
              <strong className="text-[#0a0a0a]">Note:</strong> All core features—collaboration, payments, and portfolio—work without these features. Enable them
              anytime when you're ready to explore advanced ownership and revenue options.
            </p>
          </div>
          <DrawerClose asChild>
            <button className="w-full bg-[#ff914c] hover:bg-[#ff914c]/90 text-[#0a0a0a] font-bold py-3 rounded-lg transition-colors">
              Got it
            </button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

