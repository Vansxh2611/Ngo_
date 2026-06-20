'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Globe, Users } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'

const words = ['Sustainable', 'Compassionate', 'Meaningful', 'Community-Led']

function StatCounterInline({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number | null = null

    const animate = (now: number) => {
      if (!startTime) startTime = now
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
      setCount(Math.floor(eased * end))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [end, duration])

  return <>{count.toLocaleString()}{suffix}</>
}

export default function HeroSection() {
  const [wordIdx, setWordIdx] = useState(0)
  const [subText, setSubText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  // Typewriter effect logic
  useEffect(() => {
    const activeWord = words[wordIdx]
    let timer: NodeJS.Timeout

    if (isDeleting) {
      timer = setTimeout(() => {
        setSubText(activeWord.substring(0, subText.length - 1))
      }, 50)
    } else {
      timer = setTimeout(() => {
        setSubText(activeWord.substring(0, subText.length + 1))
      }, 120)
    }

    if (!isDeleting && subText === activeWord) {
      timer = setTimeout(() => setIsDeleting(true), 2000) // Hold word
    } else if (isDeleting && subText === '') {
      setIsDeleting(false)
      setWordIdx((prev) => (prev + 1) % words.length)
    }

    return () => clearTimeout(timer)
  }, [subText, isDeleting, wordIdx])

  // Parallax scroll effect on background image
  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 800], ['0%', '18%'])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden" aria-label="Hero section">
      {/* Parallax Background Image */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        <Image
          src="https://images.unsplash.com/photo-1524069290683-0457abfe42c3?w=1600&q=80"
          alt="Dua Trust — Creating sustainable change together"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {/* 20% dark overlay to match spec and maintain readability */}
      <div className="absolute inset-0 bg-black/30 z-0" aria-hidden="true" />

      {/* Hero content */}
      <div className="relative container-wide z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-[720px] mx-auto flex flex-col items-center"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20
                           text-brand-amber font-body text-xs font-semibold tracking-widest uppercase mb-6">
            Empowering Communities Since 2006
          </span>

          <h1 className="font-heading text-[40px] md:text-[52px] lg:text-[64px] !text-white font-bold leading-[1.1] mb-6">
            Creating{' '}
            <span className="text-brand-amber italic font-normal min-w-[200px] inline-block border-r-2 border-brand-amber pr-1 animate-pulse">
              {subText || '\u00A0'}
            </span>
            <br /> Change Together
          </h1>

          <p className="font-body text-white/90 text-sm sm:text-base md:text-lg leading-relaxed mb-8 max-w-xl">
            Building strong communities through education, healthcare, and meaningful action
            that uplifts lives across India and beyond.
          </p>

          {/* Statistics subheadline */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 text-white/90 text-xs sm:text-sm font-semibold mb-10 font-body bg-white/5 px-5 py-3 rounded-2xl border border-white/10 shadow-sm max-w-xl mx-auto z-10 relative">
            <div className="flex items-center gap-1.5">
              <Globe size={14} className="text-brand-amber" />
              <span>Serving humanity across <strong className="text-brand-amber font-heading text-sm sm:text-base"><StatCounterInline end={15} /></strong> countries</span>
            </div>
            <span className="text-white/20 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5">
              <Heart size={14} className="text-brand-amber animate-pulse" />
              <span>with <strong className="text-brand-amber font-heading text-sm sm:text-base"><StatCounterInline end={45} /></strong> active projects</span>
            </div>
            <span className="text-white/20 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5">
              <Users size={14} className="text-brand-amber" />
              <span>impacting <strong className="text-brand-amber font-heading text-sm sm:text-base"><StatCounterInline end={200000} suffix="+" /></strong> lives</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-amber px-8 py-3.5 rounded-full text-brand-charcoal font-semibold shadow-md hover:scale-105 transition-transform" id="hero-get-involved-btn">
              Get Involved
            </Link>
            <Link href="/programmes" className="btn-white-solid px-8 py-3.5 bg-white text-brand-charcoal hover:bg-white/90 hover:scale-105 rounded-full font-medium transition-all" id="hero-our-impact-btn">
              Our Impact
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
