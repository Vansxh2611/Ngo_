'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ScrollRevealTypewriter, ScrollRevealWords, ScrollRevealCard } from '@/components/ui/ScrollAnimations'

const cards = [
  {
    id: 'domains',
    title: 'Domains We Serve',
    desc: 'Empowering communities through education, health, and local program support.',
    tag: 'Domains',
    img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80',
    href: '/about#programs',
  },
  {
    id: 'projects',
    title: 'Our Projects',
    desc: 'Building clean water systems, schools, and health infrastructure directly with locals.',
    tag: 'Impact',
    img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
    href: '/projects',
  },
  {
    id: 'training',
    title: 'Training Mothers',
    desc: 'Vocational training and workshops for maternal health.',
    tag: 'Training',
    img: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80',
    href: '/about#programs',
  },
  {
    id: 'programs',
    title: 'Development Programs',
    desc: 'Targeted support for self-sustaining communities.',
    tag: 'Programs',
    img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&q=80',
    href: '/about#programs',
  },
]

export default function DomainMosaic() {
  return (
    <section className="py-20 md:py-28 lg:py-32 bg-white overflow-hidden" aria-label="Domains We Serve">
      <div className="container-wide">
        
        {/* Top: Text & CTA with reveal animation */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 px-4">
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
              href="/about" 
              className="btn-ghost border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white cursor-pointer" 
              id="domain-learn-btn"
            >
              Learn More About Programs
              <ArrowRight size={14} className="ml-1.5 inline" />
            </Link>
          </div>
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
                
                <div>
                  <span className="inline-flex items-center gap-1.5 font-body text-xs sm:text-sm font-semibold text-brand-blue group-hover/card:text-brand-amber-dark transition-colors cursor-pointer">
                    Learn More
                    <ArrowRight size={14} className="group-hover/card:translate-x-1 transition-transform duration-300" />
                  </span>
                </div>
              </>
            )

            return (
              <div key={card.id} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-stretch">
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
                  <Link
                    href={card.href}
                    className="bg-[#FBF7F0]/90 backdrop-blur-md rounded-[32px] p-6 md:p-8 lg:p-10 shadow-card hover:shadow-card-hover border border-brand-sand/35 hover:border-brand-amber/30 hover:-translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between w-full h-full min-h-[250px] sm:min-h-[280px] md:min-h-[330px] group/card"
                  >
                    {cardContent}
                  </Link>
                </ScrollRevealCard>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
