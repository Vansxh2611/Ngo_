'use client'

import Link from 'next/link'
import { Heart } from 'lucide-react'
import { motion } from 'framer-motion'

export default function CTASection() {
  return (
    <section className="py-[60px] md:py-[80px] lg:py-[100px] bg-[#FBF7F0] relative overflow-hidden" aria-label="Become part of the change">
      
      {/* Decorative SVG concentric circles slowly spinning in the background */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 pointer-events-none opacity-[0.06] flex items-center justify-center z-0" 
        aria-hidden="true"
      >
        <svg viewBox="0 0 400 400" className="w-[800px] h-[800px] stroke-brand-blue" fill="none" strokeWidth="0.75">
          <circle cx="200" cy="200" r="40" strokeDasharray="3 3" />
          <circle cx="200" cy="200" r="80" />
          <circle cx="200" cy="200" r="120" strokeDasharray="6 6" />
          <circle cx="200" cy="200" r="160" />
          <circle cx="200" cy="200" r="200" strokeDasharray="2 4" />
          <circle cx="200" cy="200" r="240" />
        </svg>
      </motion.div>
      
      <div className="container-wide relative z-10">
        {/* Centered Dark Surface Card with viewport-triggered reveal animation */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="bg-brand-charcoal text-white rounded-[32px] px-8 py-16 md:py-24 text-center max-w-[1000px] mx-auto shadow-card-hover relative overflow-hidden border border-white/5"
        >
          {/* Ambient gold glow in card */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-amber/10 rounded-full blur-3xl pointer-events-none" />

          <span className="badge bg-brand-amber text-brand-charcoal text-xs font-semibold tracking-widest uppercase mb-4 inline-block">
            Join the Movement
          </span>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 !text-white leading-tight">
            Become Part of <span className="text-brand-amber italic font-normal">The Change</span>
          </h2>

          <p className="font-body text-white/70 text-sm sm:text-base mb-10 max-w-xl mx-auto leading-relaxed">
            Whether you choose to donate, volunteer, or spread the word — every action creates
            ripples of lasting impact that transform lives.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/about" 
              className="btn-ghost-white px-6 py-3 border border-white text-white hover:bg-white hover:text-brand-charcoal rounded-full font-medium transition-all" 
              id="cta-continue-btn"
            >
              Our Mission
            </Link>
            <Link 
              href="/contact#donate" 
              className="btn-amber px-6 py-3 bg-brand-amber text-brand-charcoal hover:bg-brand-amber-dark rounded-full font-semibold transition-all" 
              id="cta-donate-btn"
            >
              <Heart size={14} className="inline mr-1.5 fill-current" />
              Donate Now
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
