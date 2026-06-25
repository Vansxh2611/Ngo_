'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import HeroSection from '@/components/sections/HeroSection'
import WhoWeAre from '@/components/sections/WhoWeAre'
import ImpactJourney from '@/components/sections/ImpactJourney'
import DomainMosaicSection from '@/components/home/DomainMosaicSection'
import CTASection from '@/components/sections/CTASection'
import StatCounter from '@/components/ui/StatCounter'
import BlogCard from '@/components/ui/BlogCard'
import { ScrollRevealTypewriter, ScrollRevealWords, ScrollRevealCard } from '@/components/ui/ScrollAnimations'

const categories = ['All', 'Education', 'Healthcare', 'Emergency Relief', 'Community']

const latestPosts = [
  {
    slug: 'new-school-opens',
    title: 'New School Opens in Rural Pakistan',
    excerpt: 'Thanks to generous donors, 200 children now have access to quality education...',
    coverImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80',
    author: 'Fatima Ahmed',
    publishDate: '2024-03-15',
    category: 'Education',
  },
  {
    slug: 'mobile-clinic-serves-families',
    title: 'Mobile Clinic Serves 500 Families',
    excerpt: 'Our newly deployed mobile healthcare unit has successfully delivered essential medical aid and check-ups to 500 remote families.',
    coverImage: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&q=80',
    author: 'Dr. Raza Khan',
    publishDate: '2024-03-10',
    category: 'Healthcare',
  },
  {
    slug: 'winter-relief-kits-distributed',
    title: 'Winter Relief Kits Distributed',
    excerpt: 'Over 1,000 thermal blankets, coats, and emergency food supplies have been delivered to families facing extreme cold in remote mountain regions.',
    coverImage: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80',
    author: 'Omar Farooq',
    publishDate: '2024-03-05',
    category: 'Emergency Relief',
  },
  {
    slug: 'community-food-program-3rd-year',
    title: 'Community Food Program Celebrates 3rd Year',
    excerpt: 'What started as a small initiative now feeds over 10,000 families monthly through our community kitchens.',
    coverImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80',
    author: 'Ahmed Siddiqui',
    publishDate: '2024-02-28',
    category: 'Community',
  },
]

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredPosts = latestPosts.filter((post) => {
    return activeCategory === 'All' || post.category === activeCategory
  })

  return (
    <>
      {/* 1. HERO SECTION */}
      <HeroSection />

      {/* 2. WHO WE ARE */}
      <WhoWeAre />

      {/* IMPACT JOURNEY */}
      <ImpactJourney />

      {/* 3. DOMAIN MOSAIC */}
      <DomainMosaicSection />

      {/* 4. IMPACT STATS */}
      <section className="py-20 md:py-28 lg:py-32 section-bg-soft border-t border-brand-sand/50" aria-label="Impact Stats">
        <div className="container-wide px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center max-w-[1000px] mx-auto">
            <ScrollRevealCard delay={0}>
              <StatCounter end={50000} suffix="+" label="Beneficiaries Reached" />
            </ScrollRevealCard>
            <ScrollRevealCard delay={0.15}>
              <StatCounter end={120} suffix="+" label="Countries & Partners" />
            </ScrollRevealCard>
            <ScrollRevealCard delay={0.3}>
              <StatCounter end={18} suffix="+" label="Years of Service" />
            </ScrollRevealCard>
          </div>
        </div>
      </section>

      {/* 5. CHANGE CTA */}
      <CTASection />

      {/* 6. STORIES OF CHANGE (NEWS / BLOG GRID) */}
      <section className="py-20 md:py-28 lg:py-32 section-bg-soft border-t border-b border-brand-sand/30" aria-label="Latest Stories">
        <div className="container-wide px-4">

          {/* Header */}
          <div className="text-center mb-8">
            <p className="section-label mb-3">Stay Informed</p>
            <h2 className="section-title mb-8">
              <ScrollRevealTypewriter text="Stories of Change" />
            </h2>
          </div>

          {/* Existing style category tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
            {categories.map((cat) => {
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 px-5 py-2.5 rounded-full text-xs font-semibold font-body transition-all duration-300 cursor-pointer border
                    ${isActive
                      ? 'bg-brand-blue border-brand-blue text-white shadow-sm'
                      : 'bg-white border-brand-sand/60 text-brand-grey hover:text-brand-blue hover:border-brand-blue/30'
                    }`}
                  aria-pressed={isActive}
                  id={`filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          {/* Blog Card Grid with smooth Framer Motion fade animation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 min-h-[400px]">
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post) => (
                <motion.div
                  key={post.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  <BlogCard {...post} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Secondary Actions */}
          <div className="text-center max-w-lg mx-auto">
            <p className="font-body text-xs sm:text-sm text-brand-grey mb-8 leading-relaxed">
              <ScrollRevealWords text="Looking for past newsletters, annual reports, campaign achievements, or legacy articles? Search our complete historical library." />
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/blog"
                className="btn-ghost border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white px-6 py-2.5 rounded-full text-xs font-semibold transition-colors duration-200 cursor-pointer"
                id="news-view-more-btn"
              >
                Read More
              </Link>
              <Link
                href="/archive"
                className="btn-amber px-6 py-2.5 rounded-full text-brand-charcoal text-xs font-semibold shadow-sm hover:scale-102 transition-transform duration-200 cursor-pointer"
                id="news-archive-btn"
              >
                View Publication Archive
                <ArrowRight size={12} className="ml-1.5 inline" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. JOIN CTA */}
      <section className="py-20 md:py-28 lg:py-32 section-bg-soft relative overflow-hidden" aria-label="Join our mission">

        {/* Inline decorative SVG line/paths to match spec exactly */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.06] flex items-center justify-center" aria-hidden="true">
          <svg viewBox="0 0 300 150" className="w-[900px] h-[450px] text-brand-blue" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M-50,75 C50,25 100,125 150,75 C200,25 250,125 350,75" strokeDasharray="3 3" />
            <path d="M-50,90 C50,40 100,140 150,90 C200,40 250,140 350,90" />
            <path d="M-50,60 C50,10 100,110 150,60 C200,10 250,110 350,60" opacity="0.5" />
          </svg>
        </div>

        <div className="container-wide text-center relative z-10">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-brand-charcoal font-bold mb-6 leading-tight">
            <ScrollRevealTypewriter text="Join Our " />
            <span className="text-brand-amber italic font-normal">
              <ScrollRevealTypewriter text="Mission" delay={0.4} />
            </span>
          </h2>
          <p className="font-body text-brand-grey text-sm sm:text-base mb-10 max-w-xl mx-auto leading-relaxed">
            <ScrollRevealWords text="Your support — whether through donating time, vocational skills, or financial resources — helps us empower more communities to stand strong." />
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/community" className="btn-ghost border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white px-8 py-3.5 rounded-full font-medium cursor-pointer" id="home-join-community-btn">
              Explore Community
            </Link>
            <Link href="/contact#volunteer" className="btn-ghost border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white px-8 py-3.5 cursor-pointer" id="home-join-volunteer-btn">
              Volunteer
            </Link>
            <Link href="/projects" className="btn-amber px-8 py-3.5 rounded-full text-brand-charcoal font-semibold shadow-md cursor-pointer" id="home-join-donate-btn">
              Donate Now
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
