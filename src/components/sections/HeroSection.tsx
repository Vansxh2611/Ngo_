'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Heart } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'

const words = ['Sustainable', 'Compassionate', 'Meaningful', 'Community-Led']

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

          <p className="font-body text-white/90 text-sm sm:text-base md:text-lg leading-relaxed mb-10 max-w-xl">
            Building strong communities through education, healthcare, and meaningful action
            that uplifts lives across India and beyond.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/about" className="btn-white-solid px-8 py-3.5 bg-white text-brand-charcoal hover:bg-white/90 hover:scale-105 rounded-full font-medium transition-all" id="hero-about-btn">
              Our Programs
            </Link>
            <Link href="/contact#donate" className="btn-amber px-8 py-3.5 rounded-full text-brand-charcoal font-semibold shadow-md" id="hero-donate-btn">
              <Heart size={14} className="inline mr-1 fill-current" />
              Donate Now
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
