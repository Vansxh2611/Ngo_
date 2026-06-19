'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Home', href: '/' },
  {
    label: 'About Us',
    href: '/about',
    subLinks: [
      { label: 'About Us', href: '/about' },
      { label: 'Community', href: '/community' },
    ],
  },
  {
    label: 'Blog',
    href: '/blog',
    subLinks: [
      { label: 'Blog Feed', href: '/blog' },
      { label: 'Archive', href: '/archive' },
    ],
  },
  { label: 'Contact Us', href: '/contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Detect scroll state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* ── Desktop Floating Navbar ────────────────── */}
      <nav
        className="fixed left-1/2 -translate-x-1/2 z-50 text-brand-charcoal hidden lg:flex items-center justify-between"
        style={{
          top: scrolled ? '16px' : '0px',
          width: scrolled ? 'min(1280px, calc(100% - 2rem))' : '100%',
          borderRadius: scrolled ? '999px' : '0px',
          paddingTop: scrolled ? '0.75rem' : '1.25rem',
          paddingBottom: scrolled ? '0.75rem' : '1.25rem',
          paddingLeft: scrolled ? '2rem' : '3rem',
          paddingRight: scrolled ? '2rem' : '3rem',
          background: 'rgba(251, 247, 240, 0.95)',
          backdropFilter: 'blur(12px)',
          border: scrolled ? '1px solid rgba(240, 234, 216, 0.8)' : '1px solid transparent',
          borderBottom: scrolled ? '1px solid rgba(240, 234, 216, 0.8)' : '1px solid rgba(240, 234, 216, 0.5)',
          boxShadow: scrolled ? '0 10px 30px -10px rgba(26, 58, 92, 0.15)' : 'none',
          transition: 'all 500ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
          <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center transition-transform group-hover:scale-105">
            <span className="text-white font-heading font-bold text-sm leading-none">D</span>
          </div>
          <span className="font-heading font-bold text-sm tracking-wide text-brand-blue transition-colors duration-300">
            Dua Charitable Trust
          </span>
        </Link>

        {/* Nav Links */}
        <ul className="flex items-center gap-1" role="list">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.subLinks && link.subLinks.some(sub => pathname === sub.href))
            if (link.subLinks) {
              return (
                <li key={link.href} className="relative group/nav-item py-2">
                  <div className="flex items-center">
                    <Link
                      href={link.href}
                      className={cn(
                        'px-4 py-1.5 rounded-pill text-xs font-body font-medium transition-all duration-200 flex items-center gap-1 text-brand-grey hover:text-brand-blue hover:bg-brand-sand/40',
                        isActive && 'bg-brand-blue text-white hover:text-white hover:bg-brand-blue/90'
                      )}
                    >
                      {link.label}
                      <ChevronDown size={12} className="opacity-60 group-hover/nav-item:rotate-180 transition-transform duration-300" />
                    </Link>
                  </div>
                  {/* Dropdown menu */}
                  <div className="absolute top-[calc(100%-4px)] left-0 min-w-[160px] rounded-2xl overflow-hidden shadow-lg border bg-[#FBF7F0] border-brand-sand/50 backdrop-blur-md text-brand-charcoal opacity-0 pointer-events-none group-hover/nav-item:opacity-100 group-hover/nav-item:pointer-events-auto transition-all duration-300 transform translate-y-2 group-hover/nav-item:translate-y-0 z-50">
                    <div className="py-2 flex flex-col">
                      {link.subLinks.map((sub) => {
                        const isSubActive = pathname === sub.href
                        return (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className={cn(
                              'px-4 py-2 text-[11px] font-body font-medium transition-colors text-left block text-brand-grey hover:text-brand-blue hover:bg-brand-sand/40',
                              isSubActive && 'bg-brand-sand text-brand-blue font-semibold'
                            )}
                          >
                            {sub.label}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                </li>
              )
            }

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'px-4 py-1.5 rounded-pill text-xs font-body font-medium transition-all duration-200 block text-brand-grey hover:text-brand-blue hover:bg-brand-sand/40',
                    isActive && 'bg-brand-blue text-white hover:text-white hover:bg-brand-blue/90'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Actions: Volunteer (Ghost) + Donate (Filled) */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link
            href="/contact#volunteer"
            className="btn-ghost text-xs py-2 px-4 border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white transition-all duration-200"
            id="nav-volunteer-btn"
          >
            Volunteer
          </Link>
          <Link
            href="/contact#donate"
            className="btn-amber text-xs py-2 px-4 font-semibold shadow-sm"
            id="nav-donate-btn"
          >
            Donate
          </Link>
        </div>
      </nav>

      {/* ── Mobile Navbar ─────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 lg:hidden flex items-center justify-between px-4 py-3 bg-[#FBF7F0] border-b border-brand-sand/30 backdrop-blur-md shadow-sm"
        aria-label="Mobile navigation"
      >
        {/* Logo: D icon only */}
        <Link href="/" className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center">
          <span className="text-white font-heading font-bold text-sm leading-none">D</span>
        </Link>

        {/* Menu toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-xl text-brand-blue hover:bg-brand-sand/40 transition-colors"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          id="mobile-menu-btn"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* ── Mobile Drawer ─────────────────────────────────── */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-brand-charcoal/40 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          {/* Drawer */}
          <div className="absolute top-[56px] left-0 right-0 bg-[#FBF7F0] shadow-card-hover
                          rounded-b-3xl overflow-hidden animate-fade-up text-brand-charcoal border-b border-brand-sand/30">
            <ul className="py-4 px-4 space-y-1" role="list">
              {navLinks.map((link) => {
                if (link.subLinks) {
                  return (
                    <li key={link.href} className="space-y-1">
                      <div className="px-4 py-2 text-xs font-heading font-semibold uppercase tracking-wider text-brand-grey/50">
                        {link.label}
                      </div>
                      <ul className="pl-4 space-y-1">
                        {link.subLinks.map((sub) => {
                          const isSubActive = pathname === sub.href
                          return (
                            <li key={sub.href}>
                              <Link
                                href={sub.href}
                                onClick={() => setMenuOpen(false)}
                                className={cn(
                                  'block px-4 py-2 rounded-2xl text-sm font-body font-medium transition-all duration-200 text-brand-grey hover:text-brand-blue hover:bg-brand-sand/20',
                                  isSubActive && 'bg-brand-blue text-white'
                                )}
                              >
                                {sub.label}
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    </li>
                  )
                }
                const isActive = pathname === link.href
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        'block px-4 py-2.5 rounded-2xl text-sm font-body font-medium transition-all duration-200 text-brand-grey hover:text-brand-blue hover:bg-brand-sand/20',
                        isActive && 'bg-brand-blue text-white'
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
            <div className="grid grid-cols-2 gap-3 px-8 pb-6 pt-2">
              <Link
                href="/contact#volunteer"
                onClick={() => setMenuOpen(false)}
                className="btn-ghost justify-center text-xs py-2 px-4 border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
                id="mobile-volunteer-btn"
              >
                Volunteer
              </Link>
              <Link
                href="/contact#donate"
                onClick={() => setMenuOpen(false)}
                className="btn-amber justify-center text-xs py-2 px-4 text-brand-charcoal"
                id="mobile-donate-btn"
              >
                Donate
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
