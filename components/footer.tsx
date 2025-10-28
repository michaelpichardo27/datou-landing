import { InstagramIcon, LinkedinIcon, TwitterIcon } from "@/components/icons"

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Vision", href: "#vision" },
  { name: "Features", href: "#features" },
  { name: "Team", href: "#team" },
  { name: "Waitlist", href: "#waitlist" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "#contact" },
]

const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/datouapp/", icon: InstagramIcon },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/createdatou/posts/?feedView=all", icon: LinkedinIcon },
  { name: "X", href: "https://x.com/DatouApp", icon: TwitterIcon },
]

export function Footer() {
  return (
    <footer className="bg-white border-t border-[#ff914c]/20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <a href="#home" className="text-2xl font-black text-[#ff914c] hover:opacity-80 transition-opacity">
              DATOU
            </a>
            <p className="text-gray-600 mt-2">Connecting creators. Empowering collaboration.</p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-[#0a0a0a] font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-600 hover:text-[#ff914c] transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[#0a0a0a] font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[#ff914c] hover:bg-[#ff914c] hover:text-white transition-all"
                  aria-label={social.name}
                >
                  {social.icon({ className: "w-5 h-5" })}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-200 text-center text-gray-600">
          <p>© 2025 DATOU. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
