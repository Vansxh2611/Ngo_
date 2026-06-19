'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ScrollRevealTypewriter, ScrollRevealWords, ScrollRevealCard } from '@/components/ui/ScrollAnimations'

const cards = [
  {
    id: 'domains',
    title: 'Domains We Serve',
    desc: 'Empowering communities through education, health, and local program support.',
    tag: 'Domains',
    img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80',
  },
  {
    id: 'projects',
    title: 'Our Projects',
    desc: 'Building clean water systems, schools, and health infrastructure directly with locals.',
    tag: 'Impact',
    img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
  },
  {
    id: 'training',
    title: 'Training Mothers',
    desc: 'Vocational training and workshops for maternal health.',
    tag: 'Training',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80',
  },
  {
    id: 'programs',
    title: 'Development Programs',
    desc: 'Targeted support for self-sustaining communities.',
    tag: 'Programs',
    img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&q=80',
  },
]

export default function DomainMosaic() {
  return (
    <section className="py-20 md:py-28 lg:py-32 bg-white overflow-hidden" aria-label="Domains We Serve">
      <div className="container-wide px-4">
        
        {/* Top: Text & CTA with reveal animation */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div className="max-w-[720px]">
            <p className="section-label mb-3">What We Do</p>
            <h2 className="section-title mb-6 leading-tight">
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

        {/* Bottom: Uniform Equal Width Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {cards.map((card, idx) => (
            <ScrollRevealCard 
              key={card.id}
              delay={idx * 0.1}
              className="flex"
            >
              <div className="relative h-[280px] md:h-[320px] lg:h-[380px] rounded-[32px] overflow-hidden group shadow-card border border-brand-sand/30 hover:border-brand-amber/30 transition-all duration-300 flex flex-col justify-end w-full">
                <Image
                  src={card.img}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                
                {/* Premium Golden Tag on Upper Right Corner */}
                {card.tag && (
                  <div className="absolute top-4 right-4 z-20">
                    <span className="bg-gradient-to-r from-brand-amber to-amber-300 text-brand-charcoal text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full shadow-lg border border-brand-amber/20 group-hover:scale-105 transition-transform duration-300">
                      {card.tag}
                    </span>
                  </div>
                )}
                
                {/* Overlay: linear-gradient for 100% white text readability */}
                <div 
                  className="absolute inset-0 z-10 transition-opacity duration-300 group-hover:opacity-95"
                  style={{
                    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.8) 100%)'
                  }}
                  aria-hidden="true"
                />
                
                {/* Content Overlay */}
                <div className="absolute bottom-6 left-6 right-6 text-white z-20">
                  <h3 className="font-heading text-lg sm:text-xl font-bold mb-1.5 group-hover:text-brand-amber transition-colors duration-300 !text-white">
                    {card.title}
                  </h3>
                  <p className="font-body text-xs text-white/85 leading-relaxed line-clamp-2">
                    {card.desc}
                  </p>
                </div>
              </div>
            </ScrollRevealCard>
          ))}
        </div>

      </div>
    </section>
  )
}

