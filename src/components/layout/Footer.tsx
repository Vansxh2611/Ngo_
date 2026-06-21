'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { InstagramIcon, FacebookIcon, XIcon, LinkedInIcon, YouTubeIcon } from '@/components/ui/SocialIcons'

const footerNav = {
  pages: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Programmes', href: '/programmes' },
    { label: 'Projects', href: '/projects' },
    { label: 'Blog', href: '/blog' },
    { label: 'Community', href: '/community' },
    { label: 'Contact', href: '/contact' },
  ],
  programs: [
    { label: 'Education', href: '/programmes?category=Education' },
    { label: 'Healthcare', href: '/programmes?category=Healthcare' },
    { label: 'Women Empowerment', href: '/programmes?category=Women%20Empowerment' },
    { label: 'Environment', href: '/programmes?category=Environment' },
    { label: 'Emergency Relief', href: '/programmes?category=Emergency%20Relief' },
    { label: 'Community Welfare', href: '/programmes?category=Community%20Welfare' },
  ],
  get_involved: [
    { label: 'Volunteer', href: '/contact#volunteer' },
    { label: 'Donate', href: '/projects' },
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
    <footer className="relative bg-[#060F1E] text-white border-t border-white/10 overflow-hidden" aria-label="Site footer">
      
      {/* ─── Layered Luxury Animated Background ─── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Deep blue-light glow top-right */}
        <div className="absolute top-[-10%] right-[-5%] w-[550px] h-[550px] bg-brand-blue-light/30 blur-[90px] rounded-full animate-pulse-soft" />
        {/* Soft amber glow bottom-left */}
        <div className="absolute bottom-[-10%] left-[-5%] w-[450px] h-[450px] bg-brand-amber/20 blur-[80px] rounded-full animate-pulse-soft" style={{ animationDelay: '1.5s' }} />
        {/* Fixed gold border line on top */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-amber/30 via-brand-amber to-brand-amber/30" />
      </div>

      <div className="container-wide relative z-10 pt-20 pb-16">

        {/* ─── Middle Section: Navigational Matrix ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10 py-16">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="group inline-flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-amber to-amber-300 flex items-center justify-center flex-shrink-0 shadow-elev-2 ring-4 ring-brand-amber/15 group-hover:scale-105 transition-all duration-300">
                <span className="text-brand-charcoal font-heading font-bold text-xl leading-none">D</span>
              </div>
              <div>
                <p className="font-heading font-bold text-white text-lg tracking-wide leading-none group-hover:text-brand-amber transition-colors">Dua Charitable Trust</p>
                <p className="font-body text-white/50 text-[10px] mt-1.5 tracking-wider uppercase font-bold">NGO Registration No. 102345/IN</p>
              </div>
            </Link>

            <p className="font-body text-white/80 text-sm leading-relaxed max-w-sm">
              An international organization dedicated to establishing sustainable programs across maternal health, education literacy, and emergency disaster relief.
            </p>

            {/* Floating Social links */}
            <div className="flex items-center gap-3 pt-2" aria-label="Social media links">
              {socials.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -6, scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-amber hover:border-brand-amber hover:text-brand-charcoal focus-visible:ring-2 focus-visible:ring-brand-amber/30 outline-none transition-all duration-300"
                >
                  <Icon className="w-4.5 h-4.5 text-white hover:text-brand-charcoal transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Pages Column */}
          <div>
            <h3 className="font-body font-bold !text-white text-xs mb-6 uppercase tracking-widest relative after:content-[''] after:block after:w-8 after:h-[2px] after:bg-brand-amber after:mt-2.5">
              Pages
            </h3>
            <ul className="space-y-3.5" role="list">
              {footerNav.pages.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-body text-sm text-white/70 hover:text-brand-amber transition-colors duration-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs Column */}
          <div>
            <h3 className="font-body font-bold !text-white text-xs mb-6 uppercase tracking-widest relative after:content-[''] after:block after:w-8 after:h-[2px] after:bg-brand-amber after:mt-2.5">
              Programs
            </h3>
            <ul className="space-y-3.5" role="list">
              {footerNav.programs.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="font-body text-sm text-white/70 hover:text-brand-amber transition-colors duration-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved Column */}
          <div>
            <h3 className="font-body font-bold !text-white text-xs mb-6 uppercase tracking-widest relative after:content-[''] after:block after:w-8 after:h-[2px] after:bg-brand-amber after:mt-2.5">
              Get Involved
            </h3>
            <ul className="space-y-3.5" role="list">
              {footerNav.get_involved.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="font-body text-sm text-white/70 hover:text-brand-amber transition-colors duration-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ─── Shimmering Divider Line ─── */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-full my-8 relative overflow-hidden animate-line-shimmer" />

        {/* ─── Bottom Bar: Legal & Signature ─── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 relative z-10">
          <p className="font-body text-xs text-white/45 order-2 md:order-1 text-center md:text-left">
            © {new Date().getFullYear()} Dua Charitable Trust. Registered NGO under sections 12A & 80G. All rights reserved.
          </p>

          <div className="flex items-center gap-6 order-1 md:order-2">
            <Link href="/privacy" className="font-body text-xs text-white/45 hover:text-brand-amber transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/15 text-xs">|</span>
            <Link href="/terms" className="font-body text-xs text-white/45 hover:text-brand-amber transition-colors">
              Terms of Use
            </Link>
          </div>

          <p className="font-body text-xs text-white/40 flex items-center gap-1.5 order-3 font-semibold">
            Made with <Heart size={11} className="text-brand-amber fill-brand-amber animate-pulse-dot" /> for community impact
          </p>
        </div>

      </div>
    </footer>
  )
}
