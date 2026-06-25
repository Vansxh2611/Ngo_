'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { 
  ScrollRevealTypewriter, 
  ScrollRevealWords, 
  ScrollRevealCard,
  ScrollRevealStagger, 
  ScrollRevealStaggerItem 
} from '@/components/ui/ScrollAnimations'

// Hardcoded cards data representing our core trust pillars
const cards = [
  {
    title: 'Congregational Communities',
    desc: 'Supporting sacred and secular community spaces that foster solidarity.',
    img: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&q=80',
    tag: 'Community',
  },
  {
    title: 'Maternal Health & Donor',
    desc: 'Providing essential healthcare and support networks for maternal wellness.',
    img: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&q=80',
    tag: 'Wellness',
  },
  {
    title: 'Food Community Programs',
    desc: 'Nourishing underserved families through community kitchen initiatives.',
    img: 'https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?w=800&q=80',
    tag: 'Kitchen',
  },
  {
    title: 'Explore Our Community',
    desc: 'Meet the volunteers, donors, and change-makers driving our daily operations. Check out profiles and personal stories.',
    img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
    tag: 'Directory',
    href: '/community',
  },
]

export default function WhoWeAre() {
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      id="who-we-are"
      aria-labelledby="who-we-are-heading"
      // Warm tint page background that contrasts nicely with pure white cards
      className="py-24 md:py-32 bg-[#FFF7EC] relative overflow-hidden"
    >
      {/* Soft warm light ambient blob for visual depth */}
      <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-brand-amber/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container-wide relative z-10 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
        
        {/* Intro text header */}
        <div className="max-w-[720px] mx-auto text-center mb-16">
          <p className="section-label mb-3">Who We Are</p>
          <h2 id="who-we-are-heading" className="section-title mb-6 leading-tight italic">
            <ScrollRevealTypewriter text="Building Strong Communities" />
            <br />
            <ScrollRevealTypewriter text="through" delay={0.3} />
            <br />
            <span className="inline-block whitespace-nowrap">
              <span className="text-brand-blue italic font-normal">
                <ScrollRevealTypewriter text="Meaningful" delay={0.6} />
              </span>
              <ScrollRevealTypewriter text=" Action" delay={0.9} />
            </span>
          </h2>
          <p className="section-subtitle mx-auto text-base sm:text-lg">
            <ScrollRevealWords text="Since 2006, Dua Trust has been at the forefront of social change, partnering with communities to address education gaps, health disparities, and social inequalities across India and internationally." />
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-stretch">
          
          {/* Left Column: Image/Media Display */}
          <div className="lg:col-span-5 w-full order-1 lg:flex lg:flex-col">
            <ScrollRevealCard delay={0.1} className="lg:flex-1 flex flex-col h-full lg:h-auto">
              <div className="flex flex-col lg:flex-1 lg:pr-4 h-full lg:h-auto">
                {/* Stretches to the exact end-to-end height of the card stack */}
                <figure 
                  className="relative w-full overflow-hidden rounded-3xl bg-transparent shadow-[0_18px_60px_rgba(15,23,42,0.16)] h-80 sm:h-[400px] md:h-[480px] lg:h-auto lg:flex-1 transform-gpu"
                  style={{ 
                    maskImage: 'radial-gradient(white, black)', 
                    WebkitMaskImage: '-webkit-radial-gradient(white, black)' 
                  }}
                >
                  {cards.map((card, idx) => {
                    const isActive = activeCardIndex === idx
                    return (
                      <div
                        key={card.title}
                        style={{ zIndex: isActive ? 10 : 0 }}
                        className={`absolute inset-0 w-full h-full transition duration-700 ease-out transform-gpu
                                   ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
                      >
                        <Image
                          src={card.img}
                          alt={`Visual representation of ${card.title}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          priority={idx === 0}
                        />
                      </div>
                    )
                  })}
                </figure>
              </div>
            </ScrollRevealCard>
          </div>

          {/* Right Column: Stacked Text Cards */}
          <div className="lg:col-span-7 space-y-6 w-full order-2">
            <ScrollRevealStagger className="space-y-6">
              {cards.map((card, idx) => {
                const isInteractive = !!card.href
                const isActive = activeCardIndex === idx
                
                // Assigned distinct soft-bg/accent-text themes to make cards readable and vibrant
                const themes = [
                  { bg: 'bg-sky-50', text: 'text-sky-800', border: 'border-sky-100' },
                  { bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-100' },
                  { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-100' },
                  { bg: 'bg-indigo-50', text: 'text-indigo-800', border: 'border-indigo-100' },
                ]
                const theme = themes[idx % themes.length]

                const cardContent = (
                  <>
                    <div className="flex flex-col items-start gap-4">
                      {/* Label chip */}
                      <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase border ${theme.bg} ${theme.text} ${theme.border}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-amber animate-pulse" />
                        {card.tag}
                      </span>
                      
                      {/* Card Title (high-contrast slate-900) */}
                      <h3 className="text-xl md:text-2xl font-heading font-bold text-slate-900">
                        {card.title}
                      </h3>
                      
                      {/* Card Description (high-contrast slate-700) */}
                      <p className="text-slate-700 text-sm md:text-base leading-relaxed max-w-xl">
                        {card.desc}
                      </p>
                    </div>

                    {/* Optional CTA Link */}
                    {isInteractive && (
                      <div className="mt-4">
                        <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-blue-light group-hover:text-brand-blue transition-colors">
                          View Directory
                          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                      </div>
                    )}
                  </>
                )

                const hoverAnim = shouldReduceMotion ? {} : { scale: 1.02 }

                if (isInteractive) {
                  return (
                    <ScrollRevealStaggerItem key={card.title}>
                      <motion.a
                        href={card.href}
                        onMouseEnter={() => setActiveCardIndex(idx)}
                        onFocus={() => setActiveCardIndex(idx)}
                        whileHover={hoverAnim}
                        className={`relative block rounded-3xl bg-white border p-8 md:p-10 transition duration-300 transform-gpu cursor-pointer select-none outline-none group
                                  shadow-[0_18px_60px_rgba(15,23,42,0.06)] hover:shadow-[0_22px_80px_rgba(15,23,42,0.11)]
                                  ${isActive ? 'border-brand-amber/60' : 'border-brand-sand/60'}
                                  focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFF7EC] focus-visible:ring-brand-amber/40`}
                      >
                        {cardContent}
                      </motion.a>
                    </ScrollRevealStaggerItem>
                  )
                }

                return (
                  <ScrollRevealStaggerItem key={card.title}>
                    <motion.article
                      onMouseEnter={() => setActiveCardIndex(idx)}
                      onFocus={() => setActiveCardIndex(idx)}
                      whileHover={hoverAnim}
                      className={`relative rounded-3xl bg-white border p-8 md:p-10 transition duration-300 transform-gpu select-none outline-none
                                shadow-[0_18px_60px_rgba(15,23,42,0.06)] hover:shadow-[0_22px_80px_rgba(15,23,42,0.11)]
                                ${isActive ? 'border-brand-amber/60' : 'border-brand-sand/60'}
                                focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-[#FFF7EC] focus-within:ring-brand-amber/40`}
                      tabIndex={0}
                    >
                      {cardContent}
                    </motion.article>
                  </ScrollRevealStaggerItem>
                )
              })}
            </ScrollRevealStagger>
          </div>
          
        </div>
      </div>
    </section>
  )
}
