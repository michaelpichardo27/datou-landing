"use client"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { HelpCircleIcon } from "@/components/icons"

interface TooltipInfoProps {
  term: string
  className?: string
  variant?: "default" | "inline"
}

const tooltipContent: Record<string, string> = {
  Token: "A digital certificate that tracks value for your work.",
  Web3: "Tech that helps you control rights and earnings.",
  Ownership: "You keep rights to your content and how it's used.",
  Licensing: "Let clients use your work under your terms.",
  "Tokenized Monetization": "Earn more as your work's reused. Enable later - totally optional.",
}

export function TooltipInfo({ term, className, variant = "default" }: TooltipInfoProps) {
  const content = tooltipContent[term] || `Information about ${term}`

  if (variant === "inline") {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className="inline-flex items-center text-[#ff914c] hover:text-[#ff914c]/80 focus:outline-none focus:ring-2 focus:ring-[#ff914c] rounded"
            aria-label={`Learn more about ${term}`}
          >
            <HelpCircleIcon className="w-4 h-4 ml-1" />
          </button>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p className="text-sm">{content}</p>
        </TooltipContent>
      </Tooltip>
    )
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className={`inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#ff914c]/10 hover:bg-[#ff914c]/20 text-[#ff914c] transition-colors focus:outline-none focus:ring-2 focus:ring-[#ff914c] ${className}`}
          aria-label={`Learn more about ${term}`}
        >
          <HelpCircleIcon className="w-3 h-3" />
        </button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <p className="text-sm">{content}</p>
      </TooltipContent>
    </Tooltip>
  )
}

