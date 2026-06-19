
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ScrollRevealTypewriter, ScrollRevealWords, ScrollRevealCard } from '@/components/ui/ScrollAnimations'

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
  return (
    <section className="py-20 md:py-28 lg:py-32 bg-white overflow-hidden" aria-label="Who We Are">
      <div className="container-wide">
        
        {/* Intro text with viewport-triggered entrance animation */}
        <div className="max-w-[720px] mx-auto text-center mb-16 px-4">
          <p className="section-label mb-3">Who We Are</p>
          <h2 className="section-title mb-6 leading-tight italic">
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

        {/* Alternating Row Grid (Wix-style layout) */}
        <div className="space-y-12 md:space-y-16 mt-16 px-4 lg:px-8 max-w-[1100px] mx-auto">
          {cards.map((card, idx) => {
            const isImageRight = idx % 2 !== 0
            const cardContent = (
              <>
                <div>
                  <div className="mb-5 flex items-center">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/85 border border-brand-sand/60 text-[10px] font-bold tracking-widest text-brand-blue-light uppercase shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-amber animate-pulse-dot" />
                      {card.tag}
                    </span>
                  </div>
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-brand-blue mb-4 leading-tight group-hover/card:text-brand-amber-dark transition-colors duration-500">
                    {card.title}
                  </h3>
                  <p className="font-body text-sm sm:text-base text-brand-grey/90 leading-relaxed mb-6">
                    {card.desc}
                  </p>
                </div>
                
                {card.href ? (
                  <div>
                    <span className="inline-flex items-center gap-1.5 font-body text-xs sm:text-sm font-semibold text-brand-blue group-hover/card:text-brand-amber-dark transition-colors cursor-pointer">
                      View Directory
                      <ArrowRight size={14} className="group-hover/card:translate-x-1 transition-transform duration-300" />
                    </span>
                  </div>
                ) : null}
              </>
            )

            return (
              <div key={card.title} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-stretch">
                {/* Image Tile */}
                <ScrollRevealCard
                  delay={0.1}
                  className={cn(
                    "w-full order-1 flex flex-col h-full",
                    isImageRight ? "md:order-2" : "md:order-1"
                  )}
                >
                  <div className="relative w-full h-[200px] sm:h-[240px] md:h-full min-h-[200px] rounded-[32px] overflow-hidden group/img shadow-card border border-brand-sand/30 hover:border-brand-amber/30 hover:-translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <Image
                      src={card.img}
                      alt={card.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover/img:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Modern subtle overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/15 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>
                </ScrollRevealCard>

                {/* Text Tile */}
                <ScrollRevealCard
                  delay={0.2}
                  className={cn(
                    "w-full order-2 flex flex-col h-full",
                    isImageRight ? "md:order-1" : "md:order-2"
                  )}
                >
                  {card.href ? (
                    <Link
                      href={card.href}
                      className="bg-[#FBF7F0]/90 backdrop-blur-md rounded-[32px] p-6 md:p-8 lg:p-10 shadow-card hover:shadow-card-hover border border-brand-sand/35 hover:border-brand-amber/30 hover:-translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between w-full h-full min-h-[250px] sm:min-h-[280px] md:min-h-[330px] group/card"
                    >
                      {cardContent}
                    </Link>
                  ) : (
                    <div className="bg-[#FBF7F0]/90 backdrop-blur-md rounded-[32px] p-6 md:p-8 lg:p-10 shadow-card hover:shadow-card-hover border border-brand-sand/35 hover:border-brand-amber/30 hover:-translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between w-full h-full min-h-[250px] sm:min-h-[280px] md:min-h-[330px] group/card">
                      {cardContent}
                    </div>
                  )}
                </ScrollRevealCard>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
