'use client'

import Link from 'next/link'
import { Heart } from 'lucide-react'
import { InstagramIcon, FacebookIcon, XIcon, LinkedInIcon, YouTubeIcon } from '@/components/ui/SocialIcons'

const footerNav = {
  pages: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Blog', href: '/blog' },
    { label: 'Archive', href: '/archive' },
    { label: 'Community', href: '/community' },
    { label: 'Contact', href: '/contact' },
  ],
  programs: [
    { label: 'Education', href: '/about#programs' },
    { label: 'Healthcare', href: '/about#programs' },
    { label: 'Women Empowerment', href: '/about#programs' },
    { label: 'Environment', href: '/about#programs' },
    { label: 'Emergency Relief', href: '/about#programs' },
    { label: 'Community Welfare', href: '/about#programs' },
  ],
  get_involved: [
    { label: 'Volunteer', href: '/contact#volunteer' },
    { label: 'Donate', href: '/contact#donate' },
    { label: 'Join NGO', href: '/contact#join' },
    { label: 'Become a Donor', href: '/contact#donor' },
  ],
}

const socials = [
  { icon: InstagramIcon, label: 'Instagram', href: 'https://instagram.com' },
  { icon: FacebookIcon, label: 'Facebook', href: 'https://facebook.com' },
  { icon: XIcon, label: 'Twitter/X', href: 'https://twitter.com' },
  { icon: LinkedInIcon, label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: YouTubeIcon, label: 'YouTube', href: 'https://youtube.com' },
]

export default function Footer() {
  return (
    <footer className="relative bg-[#0F233B] text-white border-t border-white/10 overflow-hidden" aria-label="Site footer">
      {/* Decorative Gold Border Line and Soft Top Ambient Glow */}
      <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-brand-amber/35 via-brand-amber to-brand-amber/35" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[120px] bg-brand-amber/5 blur-[80px] pointer-events-none rounded-full" />

      {/* ── Main Footer ───────────────────────────────────── */}
      <div className="container-wide py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">

          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="group inline-flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-brand-amber to-amber-300 flex items-center justify-center flex-shrink-0 shadow-md ring-4 ring-brand-amber/15 group-hover:scale-105 transition-all duration-300">
                <span className="text-brand-charcoal font-heading font-bold text-lg leading-none">D</span>
              </div>
              <div>
                <p className="font-heading font-bold text-white text-lg tracking-wide leading-none group-hover:text-brand-amber transition-colors">Dua Charitable Trust</p>
                <p className="font-body text-white/60 text-xs mt-1 tracking-wider uppercase">Building Communities Together</p>
              </div>
            </Link>

            <p className="font-body text-white/95 text-sm leading-relaxed max-w-sm">
              Creating sustainable change through meaningful action across education, healthcare,
              and community empowerment.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 pt-2" aria-label="Social media links">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group/social w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center
                             hover:bg-brand-amber hover:border-brand-amber hover:shadow-lg hover:shadow-brand-amber/20
                             transition-all duration-300"
                >
                  <Icon className="w-4.5 h-4.5 text-white group-hover/social:text-brand-charcoal group-hover/social:scale-110 transition-all duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Pages Column */}
          <div>
            <h3 className="font-body font-bold !text-white text-xs mb-6 uppercase tracking-widest relative after:content-[''] after:block after:w-6 after:h-[2px] after:bg-brand-amber after:mt-2">
              Pages
            </h3>
            <ul className="space-y-3" role="list">
              {footerNav.pages.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-body text-sm text-white/90 hover:text-brand-amber hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs Column */}
          <div>
            <h3 className="font-body font-bold !text-white text-xs mb-6 uppercase tracking-widest relative after:content-[''] after:block after:w-6 after:h-[2px] after:bg-brand-amber after:mt-2">
              Programs
            </h3>
            <ul className="space-y-3" role="list">
              {footerNav.programs.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="font-body text-sm text-white/90 hover:text-brand-amber hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved Column */}
          <div>
            <h3 className="font-body font-bold !text-white text-xs mb-6 uppercase tracking-widest relative after:content-[''] after:block after:w-6 after:h-[2px] after:bg-brand-amber after:mt-2">
              Get Involved
            </h3>
            <ul className="space-y-3" role="list">
              {footerNav.get_involved.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="font-body text-sm text-white/90 hover:text-brand-amber hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ────────────────────────────────────── */}
      <div className="border-t border-white/10 bg-black/10 relative z-10">
        <div className="container-wide py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/50 order-2 md:order-1 text-center md:text-left">
            © {new Date().getFullYear()} Dua Trust. All rights reserved.
          </p>

          <div className="flex items-center gap-6 order-1 md:order-2">
            <Link href="/privacy" className="font-body text-xs text-white/50 hover:text-brand-amber transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/20 text-xs">|</span>
            <Link href="/terms" className="font-body text-xs text-white/50 hover:text-brand-amber transition-colors">
              Terms of Use
            </Link>
          </div>

          <p className="font-body text-xs text-white/45 flex items-center gap-1.5 order-3">
            Made with <Heart size={11} className="text-brand-amber fill-brand-amber animate-pulse-dot" /> for community impact
          </p>
        </div>
      </div>
    </footer>
  )
}

