'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, Filter, Calendar, BookOpen, Trophy } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { ScrollRevealTypewriter, ScrollRevealWords, ScrollRevealCard } from '@/components/ui/ScrollAnimations'

type ArchiveItem = {
  id: string
  type: 'blog' | 'achievement'
  title: string
  excerpt: string
  image: string
  date: string
  category?: string
  slug: string
}

const archiveItems: ArchiveItem[] = [
  { id: '1',  type: 'blog',        title: 'Empowering Future Generations Through Education',   excerpt: 'Our scholarship program reached 1,200 students in rural areas.',                           image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=75', date: '2026-06-10', category: 'Education',   slug: 'empowering-future-generations' },
  { id: '2',  type: 'achievement', title: '50,000 Beneficiaries Milestone Reached',             excerpt: 'A landmark moment — 50,000 lives touched across 6 program domains.',                     image: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=400&q=75', date: '2026-05-01', slug: '50k-milestone' },
  { id: '3',  type: 'blog',        title: 'Maternal Health Initiative Reaches 500 Villages',    excerpt: 'Mobile healthcare units provided prenatal care to thousands of mothers.',                  image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&q=75', date: '2026-05-28', category: 'Healthcare',  slug: 'maternal-health-initiative' },
  { id: '4',  type: 'blog',        title: 'Community Food Program Celebrates 3rd Year',         excerpt: '10,000 families fed monthly through our community kitchen network.',                      image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&q=75', date: '2026-05-15', category: 'Community',   slug: 'community-food-program' },
  { id: '5',  type: 'achievement', title: 'National NGO Excellence Award 2026',                 excerpt: 'Recognized by the Ministry of Social Justice for outstanding community service.',        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=75', date: '2026-04-15', slug: 'ngo-award-2026' },
  { id: '6',  type: 'blog',        title: 'Skills Training Transforms 800 Women',               excerpt: 'Vocational training enables financial independence across 8 districts.',                  image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=75', date: '2026-04-20', category: 'Projects',    slug: 'women-empowerment-skills' },
  { id: '7',  type: 'blog',        title: 'Annual Medical Camp: 3,000 Patients Treated',        excerpt: '80+ doctors provided free healthcare to underserved communities.',                       image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=75', date: '2026-04-05', category: 'Events',      slug: 'annual-medical-camp' },
  { id: '8',  type: 'achievement', title: '20th Anniversary Celebration',                       excerpt: 'Two decades of meaningful action — Dua Charitable Trust turns 20.',                     image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=75', date: '2026-03-15', slug: '20th-anniversary' },
  { id: '9',  type: 'blog',        title: '10,000 Trees Planted in Environmental Drive',        excerpt: 'Community volunteers planted saplings across deforested areas.',                         image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&q=75', date: '2026-03-21', category: 'Environment', slug: 'tree-plantation-drive' },
  { id: '10', type: 'blog',        title: 'Winter Relief Camp Distributed 5,000 Kits',          excerpt: 'Emergency warm clothing kits reached flood-affected families before winter.',            image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&q=75', date: '2025-12-10', category: 'Community',   slug: 'winter-relief-camp' },
  { id: '11', type: 'achievement', title: '₹2 Crore Fundraiser Goal Surpassed',                 excerpt: 'Our annual fundraiser exceeded targets, enabling 3 new program launches.',              image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400&q=75', date: '2025-11-20', slug: 'fundraiser-2025' },
  { id: '12', type: 'blog',        title: 'Scholarship Fund Opens for 2025–26 Season',          excerpt: 'Applications now open for 500 new education scholarships across India.',                image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&q=75', date: '2025-09-01', category: 'Education',   slug: 'scholarship-2025' },
]

const years  = ['All Years', '2026', '2025']
const months = ['All Months', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
const monthLabels: Record<string, string> = {
  '01': 'January', '02': 'February', '03': 'March',     '04': 'April',
  '05': 'May',     '06': 'June',     '07': 'July',      '08': 'August',
  '09': 'September','10': 'October', '11': 'November',  '12': 'December',
}

export default function ArchivePageClient() {
  const [year,   setYear]   = useState('All Years')
  const [month,  setMonth]  = useState('All Months')
  const [type,   setType]   = useState<'all' | 'blog' | 'achievement'>('all')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return archiveItems.filter((item) => {
      const d          = new Date(item.date)
      const itemYear   = d.getFullYear().toString()
      const itemMonth  = String(d.getMonth() + 1).padStart(2, '0')
      const matchYear  = year  === 'All Years'  || itemYear  === year
      const matchMonth = month === 'All Months' || itemMonth === month
      const matchType  = type  === 'all'        || item.type === type
      const matchSrch  = item.title.toLowerCase().includes(search.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(search.toLowerCase())
      return matchYear && matchMonth && matchType && matchSrch
    })
  }, [year, month, type, search])

  return (
    <>
      {/* ════════ HEADER ════════ */}
      <section className="relative bg-[#0F233B] pt-36 pb-20 overflow-hidden" aria-label="Archive header">
        {/* Editorial ambient glows */}
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-brand-amber/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-30%] left-[-10%] w-[500px] h-[500px] bg-brand-blue-light/10 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Thin mesh grid lines for structural design */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" aria-hidden="true">
          <div className="w-full h-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        <div className="relative container-wide z-10">
          <p className="section-label text-brand-amber/80 mb-3">Content Library</p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl !text-white font-bold mb-5 leading-tight">
            <ScrollRevealTypewriter text="Archive" />
          </h1>
          <p className="font-body text-white/90 text-base sm:text-lg max-w-xl leading-relaxed">
            <ScrollRevealWords text="Browse our complete collection of blogs, stories, and achievements — filtered by year, month, or content type." />
          </p>
        </div>
      </section>

      <div className="py-20 md:py-28 bg-[#FBF7F0]">
        <div className="container-wide">
          <div className="grid lg:grid-cols-4 gap-8">

            {/* ════════ SIDEBAR FILTERS ════════ */}
            <aside className="lg:col-span-1" aria-label="Archive filters">
              <ScrollRevealCard delay={0.1}>
                <div className="bg-white rounded-[28px] p-6 sticky top-24 space-y-6 border border-brand-sand/35 shadow-card">
                  {/* Search */}
                  <div className="space-y-2">
                    <label htmlFor="archive-search" className="block text-[10px] font-body font-bold text-brand-grey uppercase tracking-wider">
                      Search
                    </label>
                    <div className="relative">
                      <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-grey" aria-hidden="true" />
                      <input
                        id="archive-search"
                        type="search"
                        placeholder="Search archive…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-full border border-brand-sand bg-[#FBF7F0]/30 text-xs font-body
                                   text-brand-charcoal placeholder:text-brand-grey/40
                                   focus:outline-none focus:border-brand-blue-light focus:bg-white focus:ring-4 focus:ring-brand-blue/5 transition-all duration-300"
                        aria-label="Search archive"
                      />
                    </div>
                  </div>

                  {/* Year */}
                  <div className="space-y-2.5">
                    <p className="text-[10px] font-body font-bold text-brand-grey uppercase tracking-wider">Year</p>
                    <div className="grid grid-cols-1 gap-1.5">
                      {years.map((y) => (
                        <button
                          key={y}
                          onClick={() => setYear(y)}
                          className={`w-full text-left px-4 py-2.5 rounded-full text-xs font-semibold font-body transition-all duration-300 cursor-pointer
                            ${year === y
                              ? 'bg-brand-blue text-white shadow-sm'
                              : 'text-brand-grey hover:bg-[#FBF7F0] hover:text-brand-blue'}`}
                          aria-pressed={year === y}
                          id={`filter-year-${y.replace(' ', '-')}`}
                        >
                          {y}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Month */}
                  <div className="space-y-2">
                    <p className="text-[10px] font-body font-bold text-brand-grey uppercase tracking-wider">Month</p>
                    <select
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-full border border-brand-sand bg-white text-xs font-body
                                 text-brand-grey focus:outline-none focus:border-brand-blue-light focus:ring-4 focus:ring-brand-blue/5 transition-all duration-300 cursor-pointer"
                      aria-label="Filter by month"
                      id="filter-month"
                    >
                      {months.map((m) => (
                        <option key={m} value={m}>{m === 'All Months' ? m : monthLabels[m]}</option>
                      ))}
                    </select>
                  </div>

                  {/* Content Type */}
                  <div className="space-y-2.5">
                    <p className="text-[10px] font-body font-bold text-brand-grey uppercase tracking-wider">Content Type</p>
                    <div className="grid grid-cols-1 gap-1.5">
                      {(['all', 'blog', 'achievement'] as const).map((t) => (
                        <button
                          key={t}
                          onClick={() => setType(t)}
                          className={`w-full text-left px-4 py-2.5 rounded-full text-xs font-semibold font-body transition-all duration-300 capitalize cursor-pointer
                            ${type === t
                              ? 'bg-brand-amber text-brand-charcoal shadow-sm'
                              : 'text-brand-grey hover:bg-[#FBF7F0] hover:text-brand-blue'}`}
                          aria-pressed={type === t}
                          id={`filter-type-${t}`}
                        >
                          {t === 'all' ? 'All Content' : t === 'blog' ? 'Blog Posts' : 'Achievements'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Reset */}
                  <button
                     onClick={() => { setYear('All Years'); setMonth('All Months'); setType('all'); setSearch('') }}
                     className="w-full text-center text-xs font-bold text-brand-grey hover:text-brand-blue transition-colors pt-4 border-t border-brand-sand/50 cursor-pointer"
                     id="filter-reset-btn"
                  >
                    Reset Filters
                  </button>
                </div>
              </ScrollRevealCard>
            </aside>

            {/* ════════ RESULTS GRID ════════ */}
            <main className="lg:col-span-3" aria-label={`Archive results: ${filtered.length} items`}>
              <div className="flex items-center justify-between mb-6">
                <p className="font-body text-sm text-brand-grey">
                  Showing <span className="font-semibold text-brand-blue">{filtered.length}</span> results
                </p>
              </div>

              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {filtered.map((item, idx) => (
                    <ScrollRevealCard key={item.id} delay={idx % 4 * 0.05} yOffset={20} className="flex">
                      <article className="bg-white rounded-[28px] overflow-hidden flex flex-col group h-full border border-brand-sand/30 hover:border-brand-amber/30 hover:-translate-y-1.5 hover:shadow-card-hover transition-all duration-300 w-full relative">
                        
                        {/* Card Image */}
                        <div className="relative h-48 overflow-hidden bg-brand-cream border-b border-brand-sand/20">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width:640px) 100vw, 50vw"
                          />
                          
                          {/* Premium Tag on Upper Right Corner */}
                          <div className="absolute top-4 right-4 z-20">
                            <span className={`flex items-center gap-1 text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full shadow-lg border backdrop-blur-md group-hover:scale-105 transition-transform duration-300
                              ${item.type === 'blog' 
                                ? 'bg-gradient-to-r from-brand-blue to-brand-blue-light text-white border-white/10' 
                                : 'bg-gradient-to-r from-brand-amber to-amber-300 text-brand-charcoal border-brand-amber/20'
                              }`}
                            >
                              {item.type === 'blog'
                                ? <><BookOpen size={10} className="inline" /> {item.category ?? 'Blog'}</>
                                : <><Trophy size={10} className="inline" /> Achievement</>
                              }
                            </span>
                          </div>
                        </div>

                        {/* Content Body */}
                        <div className="p-6 flex flex-col flex-1">
                          <span className="flex items-center gap-1.5 text-[10px] font-semibold text-brand-grey/85 uppercase tracking-wider mb-3">
                            <Calendar size={12} className="text-brand-blue" /> {formatDate(item.date)}
                          </span>
                          <h3 className="font-heading font-bold text-brand-charcoal text-base mb-2 leading-snug group-hover:text-brand-blue transition-colors duration-300">
                            {item.title}
                          </h3>
                          <p className="font-body text-xs text-brand-grey/90 leading-relaxed line-clamp-2 mb-4">
                            {item.excerpt}
                          </p>

                          {item.type === 'blog' && (
                            <Link
                              href={`/blog/${item.slug}`}
                              className="text-xs font-semibold text-brand-blue hover:text-brand-amber transition-colors duration-200 mt-auto inline-flex items-center gap-1 group/btn cursor-pointer"
                            >
                              <span>Read Story</span>
                              <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                            </Link>
                          )}
                        </div>
                      </article>
                    </ScrollRevealCard>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <Filter size={32} className="text-brand-grey mx-auto mb-3 opacity-40" />
                  <p className="font-heading text-xl text-brand-charcoal mb-2">No results found</p>
                  <p className="font-body text-sm text-brand-grey">Try adjusting your filters or search term.</p>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  )
}
