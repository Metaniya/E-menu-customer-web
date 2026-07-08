import { UtensilsCrossed, Facebook, Instagram, Twitter, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { cn } from '../../shared/utils/cn'

const FOOTER_SECTIONS = [
  {
    title: 'About E-MENU',
    links: [
      { label: 'How It Works', href: '#' },
      { label: 'Our Story', href: '#' },
      { label: 'Careers', href: '#' },
    ],
  },
  {
    title: 'For Restaurants',
    links: [
      { label: 'Partner Portal', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'Features', href: '#' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '#' },
      { label: 'Contact Us', href: '#' },
      { label: 'FAQ', href: '#' },
    ],
  },
  {
    title: 'Follow Us',
    links: [
      { label: 'Facebook', href: '#', icon: Facebook },
      { label: 'Instagram', href: '#', icon: Instagram },
      { label: 'Twitter', href: '#', icon: Twitter },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="hidden md:grid md:grid-cols-4 gap-8 mb-8">
          {FOOTER_SECTIONS.map(section => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold text-foreground mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                    >
                      {link.icon && <link.icon size={14} />}
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="md:hidden space-y-2 mb-8">
          {FOOTER_SECTIONS.map(section => (
            <MobileFooterSection key={section.title} section={section} />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <UtensilsCrossed size={13} className="text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold text-foreground">E-MENU</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <span>2026 E-MENU Ethiopia</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

function MobileFooterSection({ section }: { section: typeof FOOTER_SECTIONS[number] }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-foreground bg-muted/30"
      >
        {section.title}
        {open ? <ChevronUp size= {15} className="text-muted-foreground" /> : <ChevronDown size={15} className="text-muted-foreground" />}
      </button>
      {open && (
        <div className="px-4 py-3 space-y-2">
          {section.links.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
