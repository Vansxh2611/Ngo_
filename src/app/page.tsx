'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import HeroSection from '@/components/sections/HeroSection'
import WhoWeAre from '@/components/sections/WhoWeAre'
import DomainMosaic from '@/components/sections/DomainMosaic'
import CTASection from '@/components/sections/CTASection'
import StatCounter from '@/components/ui/StatCounter'
import BlogCard from '@/components/ui/BlogCard'

import { ScrollRevealTypewriter, ScrollRevealWords, ScrollRevealCard } from '@/components/ui/ScrollAnimations'

const latestPosts = [
  {
    slug: 'empowering-future-generations',
    title: 'Empowering Future Generations Through Education',
    excerpt: 'Our new scholarship program has reached over 1,200 students in rural areas, providing access to quality education.',
    coverImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80',
    author: 'Fatima Ahmed',
    publishDate: '2026-06-10',
    category: 'Education',
  },
  {
    slug: 'maternal-health-initiative',
    title: 'Maternal Health Initiative Reaches 500 Villages',
    excerpt: 'Our mobile healthcare units have provided prenatal care to thousands of mothers across remote villages.',
    coverImage: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&q=80',
    author: 'Dr. Raza Khan',
    publishDate: '2026-05-28',
    category: 'Healthcare',
  },
  {
    slug: 'community-food-program',
    title: 'Community Food Program Celebrates 3rd Year',
    excerpt: 'What started as a small initiative now feeds over 10,000 families monthly through our community kitchens.',
    coverImage: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80',
    author: 'Ahmed Siddiqui',
    publishDate: '2026-05-15',
    category: 'Community',
  },
]

export default function HomePage() {
  return (
    <>
      {/* 1. HERO SECTION */}
      <HeroSection />

      {/* 2. WHO WE ARE */}
      <WhoWeAre />

      {/* 3. DOMAIN MOSAIC */}
      <DomainMosaic />

      {/* 4. IMPACT STATS */}
      <section className="py-20 md:py-28 lg:py-32 bg-white border-t border-brand-sand/50" aria-label="Impact Stats">
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

      {/* 6. LATEST NEWS */}
      <section className="py-20 md:py-28 lg:py-32 bg-white border-t border-b border-brand-sand/30" aria-label="Latest News">
        <div className="container-wide px-4">
          <div className="text-center mb-16">
            <p className="section-label mb-3">Stay Informed</p>
            <h2 className="section-title">
              <ScrollRevealTypewriter text="Latest News" />
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {latestPosts.map((post, idx) => (
              <ScrollRevealCard key={post.slug} delay={idx * 0.1}>
                <BlogCard {...post} />
              </ScrollRevealCard>
            ))}
          </div>

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
      <section className="py-20 md:py-28 lg:py-32 bg-[#FBF7F0] relative overflow-hidden" aria-label="Join our mission">
        
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
            <Link href="/contact#donate" className="btn-amber px-8 py-3.5 rounded-full text-brand-charcoal font-semibold shadow-md cursor-pointer" id="home-join-donate-btn">
              Donate Now
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

