'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Users } from 'lucide-react'
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
    img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    tag: 'Wellness',
  },
  {
    title: 'Food Community Programs',
    desc: 'Nourishing underserved families through community kitchen initiatives.',
    img: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80',
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
    <section className="py-20 md:py-28 lg:py-32 bg-[#FBF7F0] overflow-hidden" aria-label="Who We Are">
      <div className="container-wide">
        
        {/* Intro text with viewport-triggered entrance animation */}
        <div className="max-w-[720px] mx-auto text-center mb-16 px-4">
          <p className="section-label mb-3">Who We Are</p>
          <h2 className="section-title mb-6 leading-tight">
            <ScrollRevealTypewriter text="Building Strong Communities Through " />
            <span className="text-brand-blue italic font-normal">
              <ScrollRevealTypewriter text="Meaningful" delay={0.6} />
            </span>
            <ScrollRevealTypewriter text=" Action" delay={0.9} />
          </h2>
          <p className="section-subtitle mx-auto text-base sm:text-lg">
            <ScrollRevealWords text="Since 2006, Dua Trust has been at the forefront of social change, partnering with communities to address education gaps, health disparities, and social inequalities across India and internationally." />
          </p>
        </div>

        {/* Card Grid (4 image cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 items-stretch">
          {cards.map((card, idx) => {
            const cardContent = (
              <>
                {/* Card Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden flex-shrink-0 bg-brand-cream border-b border-brand-sand/20">
                  <Image
                    src={card.img}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Premium Golden Tag on Upper Right Corner */}
                  <div className="absolute top-4 right-4 z-20">
                    <span className="bg-gradient-to-r from-brand-amber to-amber-300 text-brand-charcoal text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full shadow-lg border border-brand-amber/20 group-hover:scale-105 transition-transform duration-300">
                      {card.tag}
                    </span>
                  </div>
                </div>
                
                {/* Card Content */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-heading text-lg font-bold text-brand-charcoal mb-2.5 group-hover:text-brand-blue transition-colors duration-300">
                      {card.title}
                    </h3>
                    <p className="font-body text-xs text-brand-grey leading-relaxed line-clamp-3">
                      {card.desc}
                    </p>
                  </div>

                  {card.href && (
                    <div className="flex items-center gap-2 text-xs font-semibold text-brand-blue group-hover:gap-3 transition-all duration-300 pt-3 border-t border-brand-sand/30 mt-4">
                      <span>View Directory</span>
                      <ArrowRight size={12} />
                    </div>
                  )}
                </div>
              </>
            )

            const className = "flex flex-col bg-white rounded-[32px] overflow-hidden shadow-card group hover:-translate-y-2.5 hover:shadow-card-hover hover:border-brand-amber/30 transition-all duration-300 border border-brand-sand/30 w-full relative text-left cursor-pointer"

            return (
              <ScrollRevealCard
                key={card.title}
                delay={idx * 0.1}
                className="flex"
              >
                {card.href ? (
                  <Link href={card.href} className={className}>
                    {cardContent}
                  </Link>
                ) : (
                  <div className={className}>
                    {cardContent}
                  </div>
                )}
              </ScrollRevealCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}

