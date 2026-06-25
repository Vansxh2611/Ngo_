'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { ScrollRevealTypewriter, ScrollRevealWords, ScrollRevealCard } from '@/components/ui/ScrollAnimations'

// TypeScript interface for the domain items
export interface DomainItem {
  id: string
  title: string
  description: string
  stat: string
  image: string
  href: string
  tag: string
}

// Hardcoded domain objects - structured for easy CMS/sanity integration later
const domainsData: DomainItem[] = [
  {
    id: 'education',
    title: 'Education',
    description: 'Ensuring children access quality learning.',
    stat: '12,000+ children supported',
    // Swap in real CMS image URLs here
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80',
    href: '/about#programs',
    tag: 'Learning'
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    description: 'Bringing care to underserved communities.',
    stat: '50+ mobile clinics',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80',
    href: '/about#programs',
    tag: 'Medical aid'
  },
  {
    id: 'environment',
    title: 'Environment',
    description: 'Protecting our shared natural ecosystems.',
    stat: '200+ green projects',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80',
    href: '/about#programs',
    tag: 'Ecology'
  },
  {
    id: 'relief',
    title: 'Emergency Relief',
    description: 'Providing immediate support in times of crisis.',
    stat: '30,000+ families reached',
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80',
    href: '/about#programs',
    tag: 'Crisis aid'
  },
  {
    id: 'women',
    title: 'Women Empowerment',
    description: 'Empowering women with vocational self-reliance.',
    stat: '5,000+ women empowered',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
    href: '/about#programs',
    tag: 'Vocational'
  },
  {
    id: 'community',
    title: 'Community Support',
    description: 'Strengthening local bonds and cooperation.',
    stat: '10,000+ active supporters',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80',
    href: '/about#programs',
    tag: 'Sustenance'
  }
]

interface DomainCardProps {
  domain: DomainItem
  index: number
}

function DomainCard({ domain, index }: DomainCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  // Motion values for magnetic displacement
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring configuration for smooth follow-through and return animations
  const springConfig = { damping: 30, stiffness: 220, mass: 0.8 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (shouldReduceMotion || !cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    // Calculate mouse position relative to the center of the card
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = e.clientX - centerX
    const deltaY = e.clientY - centerY

    // Apply a subtle 5% magnetic factor
    const maxTranslation = 15 // clamp shift to 15px max
    const targetX = Math.max(-maxTranslation, Math.min(maxTranslation, deltaX * 0.05))
    const targetY = Math.max(-maxTranslation, Math.min(maxTranslation, deltaY * 0.05))

    x.set(targetX)
    y.set(targetY)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
    x.set(0)
    y.set(0)
  }

  const isRevealed = isHovered || isFocused

  return (
    <ScrollRevealCard delay={index * 0.08}>
      <motion.a
        ref={cardRef}
        href={domain.href}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{
          x: shouldReduceMotion ? 0 : xSpring,
          y: shouldReduceMotion ? 0 : ySpring,
        }}
        // Using transform-gpu and will-change: transform for hardware acceleration
        className="relative block w-full aspect-[4/3] sm:aspect-[1.35] lg:aspect-[4/3] rounded-3xl overflow-hidden
                   bg-gradient-to-br from-white/95 to-brand-cream/80
                   border border-brand-sand/55 shadow-card hover:shadow-card-hover
                   transform-gpu will-change-transform select-none cursor-pointer outline-none group"
        aria-labelledby={`domain-title-${domain.id}`}
        role="group"
      >
        {/* Next.js optimized background image with cover layout */}
        <div
          className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out transform-gpu
                     ${isRevealed ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}
        >
          <Image
            src={domain.image}
            alt="" // Decorative since title/stat is visible and descriptive
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={index < 3}
          />
        </div>

        {/* Ambient Overlay: Neutral default gradient -> Rich dark indigo vignette on reveal */}
        <div
          className={`absolute inset-0 transition-all duration-500 ease-out pointer-events-none z-10
                     ${isRevealed 
                       ? 'bg-gradient-to-t from-brand-blue/95 via-brand-blue/55 to-brand-blue/20 opacity-100' 
                       : 'bg-gradient-to-br from-brand-cream/50 via-transparent to-transparent opacity-80'}`}
        />

        {/* Focus Ring Affordance (Accessible Outline) */}
        <div
          className={`absolute inset-0 rounded-3xl border-2 pointer-events-none z-30 transition-opacity duration-300
                     ${isFocused ? 'border-brand-amber opacity-100' : 'border-transparent opacity-0'}`}
        />

        {/* Card Content Wrapper */}
        <div className="absolute inset-0 p-8 flex flex-col justify-between z-20 h-full">
          {/* Top Row: Tag / Label */}
          <div className="flex justify-between items-start">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold tracking-widest uppercase transition-all duration-500
                         ${isRevealed 
                           ? 'bg-white/10 border-white/20 text-brand-amber' 
                           : 'bg-brand-cream/90 border-brand-sand/60 text-brand-blue-light'}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full bg-brand-amber ${isRevealed ? 'animate-pulse' : ''}`} />
              {domain.tag}
            </span>
          </div>

          {/* Bottom Column: Title, Description, Stat Reveal */}
          <div className="space-y-3">
            {/* Title */}
            <h3
              id={`domain-title-${domain.id}`}
              className={`font-heading text-2xl md:text-3xl font-bold leading-tight transition-colors duration-500
                         ${isRevealed ? 'text-white' : 'text-brand-blue'}`}
            >
              {domain.title}
            </h3>

            {/* Content stack */}
            <div className="relative overflow-hidden h-[54px] sm:h-[60px]">
              {/* Default State: Description */}
              <p
                className={`font-body text-sm md:text-base leading-relaxed absolute inset-x-0 top-0 transition-all duration-500 ease-out transform-gpu
                           ${isRevealed ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'}`}
              >
                {domain.description}
              </p>

              {/* Reveal State: Stat + CTA Button */}
              <div
                className={`absolute inset-x-0 top-0 flex flex-col justify-end transition-all duration-500 ease-out transform-gpu
                           ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
              >
                {/* Stat text from CMS */}
                <p className="font-heading text-brand-amber font-semibold text-lg md:text-xl leading-snug">
                  {domain.stat}
                </p>
                {/* CTA Link */}
                <span className="inline-flex items-center gap-1.5 font-body text-xs font-bold text-white/90 mt-1 hover:text-brand-amber transition-colors">
                  Explore Programs
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.a>
    </ScrollRevealCard>
  )
}

export default function DomainMosaicSection() {
  return (
    <section 
      className="py-24 md:py-32 section-bg-cool overflow-hidden relative" 
      aria-label="Domains We Serve"
    >
      {/* Premium Ambient Light Blobs matching other homepage sections */}
      <div className="absolute top-[8%] right-[5%] w-[480px] h-[480px] bg-brand-amber/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[8%] left-[3%] w-[380px] h-[380px] bg-brand-blue-light/5 rounded-full blur-[110px] pointer-events-none" />
      
      <div className="container-wide relative z-10 px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 max-w-[1200px] mx-auto">
          <div className="max-w-[720px]">
            <p className="section-label mb-3">What We Do</p>
            <h2 className="section-title mb-6 leading-tight italic">
              <ScrollRevealTypewriter text="Domains We Serve and Build" />
            </h2>
            <p className="section-subtitle text-brand-grey text-base sm:text-lg leading-relaxed">
              <ScrollRevealWords text="Our social impact programs are built directly with the communities we serve. We focus on key verticals including education, healthcare, local infrastructure, and women-led vocational projects to build self-sustaining ecosystems." />
            </p>
          </div>
          
          <div className="flex-shrink-0">
            <Link 
              href="/about#programs" 
              className="btn-ghost border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white cursor-pointer" 
              id="domain-learn-btn"
            >
              Learn More About Programs
              <ArrowRight size={14} className="ml-1.5 inline" />
            </Link>
          </div>
        </div>

        {/* Responsive Domain Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-[1200px] mx-auto mt-12">
          {domainsData.map((domain, index) => (
            <DomainCard key={domain.id} domain={domain} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
