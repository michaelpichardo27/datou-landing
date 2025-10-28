"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MenuIcon, XIcon } from "@/components/icons"
import { usePathname } from "next/navigation"

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Vision", href: "#vision" },
  { name: "Features", href: "#features" },
  { name: "Team", href: "#team" },
  { name: "Waitlist", href: "#waitlist" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "#contact" },
]

export function Navbar() {
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  const [activeSection, setActiveSection] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 },
    )

    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => observer.observe(section))

    return () => sections.forEach((section) => observer.unobserve(section))
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black/95 backdrop-blur-md ${
        scrolled ? "border-b border-[#ff914c]/20 shadow-lg shadow-[#ff914c]/10" : ""
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <a href={isHomePage ? "#home" : "/#home"} className="flex items-center hover:opacity-80 transition-opacity">
            <img src="/datou-logo-transparent.png" alt="DATOU" className="h-12" />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const href = link.href.startsWith("#") && !isHomePage ? `/${link.href}` : link.href
              return (
                <a
                  key={link.name}
                  href={href}
                  className={`text-sm font-semibold transition-colors relative group ${
                    link.href.startsWith("#") && activeSection === link.href.slice(1) ? "text-[#ff914c]" : "text-white hover:text-[#ff914c]"
                  }`}
                >
                  {link.name}
                  {link.href.startsWith("#") && (
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-[#ff914c] transition-all ${
                        activeSection === link.href.slice(1) ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  )}
                </a>
              )
            })}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-[#ff914c] hover:bg-[#ff914c]/90 text-[#0a0a0a] shadow-lg shadow-[#ff914c]/30 font-bold border-2 border-[#ff914c]"
            >
              <a href={isHomePage ? "#waitlist" : "/#waitlist"}>Join Waitlist</a>
            </Button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4 space-y-4 border-t border-[#ff914c]/20 pt-4"
          >
            {navLinks.map((link) => {
              const href = link.href.startsWith("#") && !isHomePage ? `/${link.href}` : link.href
              return (
                <a
                  key={link.name}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-sm font-semibold ${
                    activeSection === link.href.slice(1) ? "text-[#ff914c]" : "text-white"
                  }`}
                >
                  {link.name}
                </a>
              )
            })}
            <div className="flex flex-col gap-2 pt-4">
              <Button asChild className="bg-[#ff914c] hover:bg-[#ff914c]/90 text-[#0a0a0a] w-full font-bold border-2 border-[#ff914c]">
                <a href={isHomePage ? "#waitlist" : "/#waitlist"} onClick={() => setMobileMenuOpen(false)}>
                  Join Waitlist
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
