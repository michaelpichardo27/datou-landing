/**
 * Lightweight analytics tracking hooks
 * Currently console logs events for development
 * TODO: Integrate with production analytics service (Segment, Mixpanel, etc.)
 */

export function track(eventName: string, payload?: Record<string, any>) {
  if (typeof window !== "undefined") {
    console.info("[Analytics]", eventName, payload || {})
    // TODO: Integrate with production analytics SDK
    // Example: analytics.track(eventName, payload)
  }
}

// Convenience functions for common events
export function trackModalOpened(modalName: string) {
  track("modal_opened", { modal_name: modalName })
}

export function trackButtonClicked(buttonName: string, location?: string) {
  track("button_clicked", { button_name: buttonName, location })
}

export function trackFAQViewed() {
  track("faq_viewed")
}

export function trackOnboardingChoice(choice: "simple" | "advanced") {
  track("onboarding_choice_selected", { choice })
}

export function trackChecklistCompleted(item: string) {
  track("checklist_item_completed", { item })
}

export function trackDrawerOpened(drawerName: string) {
  track("drawer_opened", { drawer_name: drawerName })
}

