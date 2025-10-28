"use client"

import { CheckCircleIcon } from "@/components/icons"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { trackChecklistCompleted } from "@/lib/analytics"
import Link from "next/link"
import { useState } from "react"

interface ChecklistItem {
  id: string
  label: string
  href: string
}

const checklistItems: ChecklistItem[] = [
  { id: "complete-profile", label: "Complete profile", href: "/profile" },
  { id: "upload-portfolio", label: "Upload 3 portfolio items", href: "/portfolio" },
  { id: "browse-boards", label: "Browse or post to Collaboration Boards", href: "/boards" },
  { id: "setup-payouts", label: "Set up payouts (standard)", href: "/settings/payouts" },
  { id: "learn-ownership", label: "(Optional) Learn about ownership & tokens", href: "/faq#enable-tokens" },
]

interface OnboardingChecklistProps {
  userId?: string
  isNew?: boolean
}

export function OnboardingChecklist({ userId = "1", isNew = true }: OnboardingChecklistProps) {
  const [completedItems, setCompletedItems] = useState<string[]>([])
  const [isHidden, setIsHidden] = useState(false)

  const handleToggle = (itemId: string) => {
    const isCompleted = completedItems.includes(itemId)
    if (!isCompleted) {
      setCompletedItems([...completedItems, itemId])
      trackChecklistCompleted(itemId)
    } else {
      setCompletedItems(completedItems.filter((id) => id !== itemId))
    }
  }

  const allCompleted = completedItems.length === checklistItems.length

  if (!isNew || isHidden) {
    return null
  }

  return (
    <Card className="border-2 border-[#ff914c]/20 bg-gradient-to-br from-white to-[#ff914c]/5">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-black text-[#0a0a0a]">Get Started</CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              Complete these steps to make the most of DATOU
            </CardDescription>
          </div>
          <button
            onClick={() => setIsHidden(true)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Hide checklist"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {checklistItems.map((item) => {
            const isCompleted = completedItems.includes(item.id)
            return (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#ff914c]/5 transition-colors"
              >
                <button
                  onClick={() => handleToggle(item.id)}
                  className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    isCompleted
                      ? "bg-[#ff914c] border-[#ff914c]"
                      : "border-gray-300 hover:border-[#ff914c]"
                  }`}
                  aria-label={`Mark "${item.label}" as ${isCompleted ? "incomplete" : "complete"}`}
                >
                  {isCompleted && <CheckCircleIcon className="w-4 h-4 text-white" />}
                </button>
                <Link
                  href={item.href}
                  className={`flex-1 text-gray-700 hover:text-[#ff914c] transition-colors ${
                    isCompleted ? "line-through text-gray-400" : ""
                  }`}
                >
                  {item.label}
                </Link>
              </div>
            )
          })}
        </div>

        {allCompleted && (
          <div className="mt-6 p-4 bg-[#ff914c]/10 rounded-lg border-2 border-[#ff914c]/30">
            <div className="flex items-center gap-2 text-[#ff914c] font-bold">
              <CheckCircleIcon className="w-6 h-6" />
              <span>All done! You're ready to go.</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

