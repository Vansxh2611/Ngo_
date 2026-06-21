
'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useReducedMotion, useMotionValueEvent } from 'framer-motion'
import { cn } from '@/lib/utils'

const timelineData = [
  {
    year: "2010",
    title: "Trust Founded",
    description: "Dua Charitable Trust began its journey with a simple yet powerful vision: to provide sustainable support and act as a bridge of hope for marginalized communities.",
    icon: "🌱",
  },
  {
    year: "2014",
    title: "5,000+ Lives Impacted",
    description: "Expanded our operations deep into remote rural areas, successfully establishing primary school initiatives and safe water-well programs for over 5,000 residents.",
    icon: "💧",
  },
  {
    year: "2018",
    title: "Healthcare Expansion",
    description: "Launched mobile clinics and primary health centers in low-income urban settlements, providing free pediatric and maternal care to vulnerable families.",
    icon: "🏥",
  },
  {
    year: "2022",
    title: "Women Empowerment Programs",
    description: "Initiated structured vocational training classes, digital literacy, and self-help group micro-grants to foster true financial independence for local women.",
    icon: "👩‍🏫",
  },
  {
    year: "2026",
    title: "50,000+ Beneficiaries Reached",
    description: "Achieved a monumental milestone of reaching and empowering over 50,000 individuals through integrated education, healthcare, and livelihood programs.",
    icon: "✨",
  },
]

export default function ImpactJourney() {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)

  // Track scroll position of the section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  })

  // Complete drawing the line and lighting all dots by 85% scroll progress
  const lineProgress = useTransform(scrollYProgress, [0, 0.85], [0, 1])

  // Smooth scroll line filling
  const scaleY = useSpring(lineProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Direct state updates for glowing active nodes
  useMotionValueEvent(lineProgress, "change", (latest) => {
    let active = 0
    timelineData.forEach((_, idx) => {
      const threshold = idx / (timelineData.length - 1)
      // Allow a small offset so dot illuminates slightly before the line reaches it
      if (latest >= threshold - 0.08) {
        active = idx
      }
    })
    setActiveIndex(active)
  })

  // Subtle parallax translation of background ambient blobs
  const yBlob1 = useTransform(scrollYProgress, [0, 1], [-50, 50])
  const yBlob2 = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section
      ref={containerRef}
      id="impact-journey"
      className="py-24 section-bg-soft border-t border-brand-sand/30 relative overflow-hidden"
      aria-labelledby="timeline-heading"
    >

      {/* Decorative Wave SVG Path */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex items-center justify-center" aria-hidden="true">
        <svg viewBox="0 0 200 200" className="w-[800px] h-[800px] text-brand-blue" fill="none" stroke="currentColor" strokeWidth="0.8">
          <circle cx="100" cy="100" r="80" strokeDasharray="4 4" />
          <path d="M10,100 Q50,20 100,100 T190,100" />
        </svg>
      </div>

      <div className="container-wide px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* ════════ LEFT COLUMN: STICKY STORYTELLING ════════ */}
          <div className="lg:col-span-5 lg:sticky lg:top-36 flex flex-col items-start text-left">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/70 border border-brand-sand/60 text-xs font-bold tracking-widest text-brand-blue-light uppercase mb-6 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-amber animate-pulse-dot" />
              Our Legacy
            </span>

            <div className="space-y-4 mb-8">
              <h2
                id="timeline-heading"
                className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-blue leading-tight tracking-tight"
              >
                Impact <span className="italic font-normal text-brand-amber-dark">Journey</span>
              </h2>

              <p className="font-body text-brand-grey text-base sm:text-lg leading-relaxed max-w-md">
                A timeline of meaningful milestones that reflect our commitment to creating lasting change in communities.
              </p>
            </div>

            {/* Desktop progress tracker link list */}
            <nav className="hidden lg:flex flex-col gap-4 border-l border-brand-sand/40 pl-6" aria-label="Timeline navigation">
              {timelineData.map((item, idx) => {
                const isActive = activeIndex >= idx
                const isCurrent = activeIndex === idx
                return (
                  <button
                    key={item.year}
                    onClick={() => {
                      const el = document.getElementById(`milestone-${item.year}`)
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
                      }
                    }}
                    className={cn(
                      "text-left font-body text-sm transition-all duration-300 cursor-pointer flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber focus-visible:ring-offset-2 rounded-lg p-1 hover:translate-x-1",
                      isActive ? "text-brand-blue font-semibold" : "text-brand-grey/50 hover:text-brand-blue/70"
                    )}
                    aria-current={isCurrent ? "true" : undefined}
                  >
                    <span className={cn(
                      "w-2 h-2 rounded-full transition-all duration-300 flex-shrink-0",
                      isActive
                        ? "bg-brand-amber scale-110 shadow-[0_0_6px_rgba(240,169,42,0.6)]"
                        : "bg-brand-blue/20"
                    )} />
                    <span className="font-heading font-bold text-base leading-none">{item.year}</span>
                    <span className="text-xs font-normal text-brand-grey/70 group-hover:text-brand-blue transition-colors">
                      · {item.title}
                    </span>
                  </button>
                )
              })}
            </nav>
          </div>

          {/* ════════ RIGHT COLUMN: SCROLLING TIMELINE ════════ */}
          <div className="lg:col-span-7 relative pl-4 sm:pl-8">

            {/* Base Background Track Line */}
            <div className="absolute left-[32px] sm:left-[48px] top-4 bottom-4 w-[1px] bg-brand-sand/40 pointer-events-none transition-opacity duration-300 shadow-[0_0_10px_rgba(0,0,0,0.05)]" />

            {/* Active Highlight Line */}
            <motion.div
              style={{ scaleY: prefersReducedMotion ? 1 : scaleY, transformOrigin: "top" }}
              className="absolute left-[32px] sm:left-[48px] top-4 bottom-4 w-[1px] bg-brand-amber/80 z-10 origin-top pointer-events-none transition-opacity duration-300 shadow-[0_0_10px_rgba(0,0,0,0.05)]"
            />

            <div className="space-y-16">
              {timelineData.map((item, idx) => {
                const isPassed = activeIndex >= idx;
                return (
                  <div key={item.year} className="relative pl-14 sm:pl-20">

                    {/* Glowing Timeline Dot */}
                    <div className="absolute left-[20px] sm:left-[36px] top-[22px] z-20 flex items-center justify-center pointer-events-none group-hover/card:scale-110 transition-transform duration-300">
                      {/* Inner Dot */}
                      <div className={cn(
                        "w-3 h-3 rounded-full border border-white shadow-sm transition-all duration-500",
                        isPassed
                          ? "bg-brand-amber shadow-[0_0_8px_rgba(240,169,42,0.6)]"
                          : "bg-brand-sand"
                      )} />
                      {/* Outer Ring */}
                      <div className={cn(
                        "absolute w-6 h-6 rounded-full border transition-all duration-500",
                        isPassed
                          ? "border-brand-amber/40 bg-brand-amber/5"
                          : "border-brand-sand/40 bg-transparent"
                      )} />
                    </div>

                    {/* Premium Glass Card Container */}
                    <motion.article
                      id={`milestone-${item.year}`}
                      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-120px" }}
                      transition={{
                        type: "spring",
                        stiffness: 90,
                        damping: 18,
                        delay: prefersReducedMotion ? 0 : 0.05
                      }}
                      className={cn(
                        "rounded-[24px] p-4 sm:p-5 border bg-white/90 backdrop-blur-xl transition-all duration-500 flex flex-col gap-2 relative overflow-hidden group/card shadow-[0_4px_24px_rgba(26,58,92,0.03)] max-w-md",
                        isPassed
                          ? "border-brand-amber/35 shadow-[0_24px_48px_rgba(26,58,92,0.07),0_8px_20px_rgba(240,169,42,0.04)]"
                          : "border-brand-sand/30",
                        idx % 2 === 1 && "translate-x-2 md:translate-x-4"
                      )}
                      whileHover={prefersReducedMotion ? {} : {
                        y: -8,
                        scale: 1.01,
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        borderColor: 'rgba(240, 169, 42, 0.40)',
                        boxShadow: '0 28px 56px rgba(26, 58, 92, 0.09), 0 10px 24px rgba(240, 169, 42, 0.06), 0 0 0 1px rgba(240, 169, 42, 0.25)'
                      }}
                    >
                      {/* Slide-in Top Gradient Highlight Bar on Hover */}
                      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-blue via-brand-amber to-brand-blue-light opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

                      {/* Card Content Header */}
                      <div className="flex items-baseline justify-between flex-wrap gap-2">
                        <span className={cn(
                          "font-heading font-semibold text-3xl sm:text-4xl leading-none tracking-wide transition-colors duration-500",
                          isPassed ? "text-brand-blue/90" : "text-brand-grey/30"
                        )}>
                          {item.year}
                        </span>

                        <span className="font-body text-[10px] uppercase tracking-widest text-brand-grey/60">
                          {item.icon} Milestone 0{idx + 1}
                        </span>
                      </div>

                      <h3 className="font-heading font-semibold text-[#0A1A3A] text-lg sm:text-xl leading-snug mt-1.5 group-hover/card:text-brand-blue transition-colors duration-300">
                        {item.title}
                      </h3>

                      <p className="font-body text-brand-grey text-xs sm:text-[13.5px] leading-relaxed mt-2">
                        {item.description}
                      </p>
                    </motion.article>

                  </div>
                )
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
