'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Calendar, User, ArrowRight, BookOpen, Trophy, Filter, X, ChevronDown } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { publicationsData, PublicationItem, PublicationType } from '@/data/publications'
import { ScrollRevealTypewriter, ScrollRevealWords, ScrollRevealCard } from '@/components/ui/ScrollAnimations'

const categories = [
  'All',
  'Education',
  'Healthcare',
  'Community',
  'Environment',
  'Projects',
  'Events',
  'Milestones',
  'Awards',
  'Campaigns',
]

const years = ['All Years', '2026', '2025']
const months = ['All Months', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
const monthLabels: Record<string, string> = {
  '01': 'January',
  '02': 'February',
  '03': 'March',
  '04': 'April',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'August',
  '09': 'September',
  '10': 'October',
  '11': 'November',
  '12': 'December',
}

function PublicationCard({ item }: { item: PublicationItem }) {
  const isBlog = item.type === 'blog'

  return (
    <article
      className="card overflow-hidden flex flex-col group border border-brand-sand/35 hover:border-brand-amber/35 hover:-translate-y-1.5 hover:shadow-card-hover transition-all duration-300 bg-white h-full relative"
      aria-label={`${isBlog ? 'Blog post' : 'Achievement'}: ${item.title}`}
    >
      {/* Card Image */}
      <div className="relative h-48 overflow-hidden bg-brand-cream border-b border-brand-sand/20">
        <Image
          src={item.coverImage}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        {/* Premium Tag on Upper Right Corner */}
        <div className="absolute top-4 right-4 z-20">
          <span
            className={`flex items-center gap-1 text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full shadow-lg border backdrop-blur-md transition-transform group-hover:scale-105 duration-300
            ${
              isBlog
                ? 'bg-gradient-to-r from-brand-blue to-brand-blue-light text-white border-white/10'
                : 'bg-gradient-to-r from-brand-amber to-amber-300 text-brand-charcoal border-brand-amber/20'
            }`}
          >
            {isBlog ? (
              <>
                <BookOpen size={10} className="inline" />
                {item.category}
              </>
            ) : (
              <>
                <Trophy size={10} className="inline" />
                {item.category}
              </>
            )}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 flex flex-col flex-1">
        {/* Meta */}
        <div className="flex items-center gap-3 mb-3">
          <span className="flex items-center gap-1.5 text-xs text-brand-grey font-body">
            <Calendar size={12} className="text-brand-blue" />
            {formatDate(item.publishDate)}
          </span>
          {isBlog && item.author && (
            <span className="flex items-center gap-1.5 text-xs text-brand-grey font-body">
              <User size={12} className="text-brand-blue" />
              {item.author}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-heading font-semibold text-brand-charcoal text-base mb-2 leading-snug group-hover:text-brand-blue transition-colors duration-200">
          {item.title}
        </h3>

        {/* Excerpt */}
        <p className="font-body text-xs text-brand-grey/90 leading-relaxed line-clamp-3 mb-5 flex-1">
          {item.excerpt}
        </p>

        {/* Action Link */}
        {isBlog ? (
          <Link
            href={`/blog/${item.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold font-body text-brand-blue
                       hover:text-brand-amber-dark hover:gap-2.5
                       transition-all duration-200 mt-auto"
            aria-label={`Read story: ${item.title}`}
          >
            Read Story
            <span>→</span>
          </Link>
        ) : (
          <div className="text-[10px] font-bold text-brand-amber-dark uppercase tracking-wider mt-auto flex items-center gap-1">
            <Trophy size={12} /> Milestone Reached
          </div>
        )}
      </div>
    </article>
  )
}

export default function BlogPageClient() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const typeParam = searchParams.get('type')
  const catParam = searchParams.get('category')
  const yearParam = searchParams.get('year')
  const monthParam = searchParams.get('month')
  const searchParam = searchParams.get('search')

  const [activeCategory, setActiveCategory] = useState('All')
  const [activeType, setActiveType] = useState<'all' | 'blog' | 'achievement'>('all')
  const [activeYear, setActiveYear] = useState('All Years')
  const [activeMonth, setActiveMonth] = useState('All Months')
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Sync state from query parameters on mount & when they change
  useEffect(() => {
    if (typeParam === 'blog' || typeParam === 'achievement') {
      setActiveType(typeParam)
    } else {
      setActiveType('all')
    }

    if (catParam) {
      const decodedCat = decodeURIComponent(catParam)
      const matched = categories.find((c) => c.toLowerCase() === decodedCat.toLowerCase())
      if (matched) setActiveCategory(matched)
    } else {
      setActiveCategory('All')
    }

    if (yearParam) {
      setActiveYear(yearParam)
    } else {
      setActiveYear('All Years')
    }

    if (monthParam) {
      setActiveMonth(monthParam)
    } else {
      setActiveMonth('All Months')
    }

    if (searchParam) {
      setSearchQuery(searchParam)
    } else {
      setSearchQuery('')
    }
  }, [typeParam, catParam, yearParam, monthParam, searchParam])

  // Central function to update routing parameters
  const updateFilters = ({
    type = activeType,
    category = activeCategory,
    year = activeYear,
    month = activeMonth,
    search = searchQuery,
  }: {
    type?: 'all' | 'blog' | 'achievement'
    category?: string
    year?: string
    month?: string
    search?: string
  }) => {
    const params = new URLSearchParams()
    if (type !== 'all') params.set('type', type)
    if (category !== 'All') params.set('category', category)
    if (year !== 'All Years') params.set('year', year)
    if (month !== 'All Months') params.set('month', month)
    if (search) params.set('search', search)

    const queryString = params.toString()
    router.push(`/blog${queryString ? `?${queryString}` : ''}`, { scroll: false })
  }

  // Handle resets
  const handleReset = () => {
    setActiveCategory('All')
    setActiveType('all')
    setActiveYear('All Years')
    setActiveMonth('All Months')
    setSearchQuery('')
    router.push('/blog', { scroll: false })
    setMobileFiltersOpen(false)
  }

  // Find Featured Post
  const featured = useMemo(() => {
    return publicationsData.find((p) => p.featured && p.type === 'blog') || publicationsData[0]
  }, [])

  // Filter posts
  const filtered = useMemo(() => {
    return publicationsData.filter((item) => {
      // Exclude featured post from primary grid ONLY if no filters are active
      const noFiltersActive =
        activeCategory === 'All' &&
        activeType === 'all' &&
        activeYear === 'All Years' &&
        activeMonth === 'All Months' &&
        !searchQuery

      if (noFiltersActive && item.id === featured.id) {
        return false
      }

      // Check Category
      const matchCat = activeCategory === 'All' || item.category === activeCategory

      // Check Type
      const matchType = activeType === 'all' || item.type === activeType

      // Check Date
      const dateObj = new Date(item.publishDate)
      const itemYear = dateObj.getFullYear().toString()
      const itemMonth = String(dateObj.getMonth() + 1).padStart(2, '0')

      const matchYear = activeYear === 'All Years' || itemYear === activeYear
      const matchMonth = activeMonth === 'All Months' || itemMonth === activeMonth

      // Check Search
      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.author && item.author.toLowerCase().includes(searchQuery.toLowerCase()))

      return matchCat && matchType && matchYear && matchMonth && matchSearch
    })
  }, [activeCategory, activeType, activeYear, activeMonth, searchQuery, featured])

  // Check if we should display the Featured Banner
  const showFeaturedSection = useMemo(() => {
    return (
      activeCategory === 'All' &&
      activeType === 'all' &&
      activeYear === 'All Years' &&
      activeMonth === 'All Months' &&
      !searchQuery
    )
  }, [activeCategory, activeType, activeYear, activeMonth, searchQuery])

  return (
    <>
      {/* ════════ HERO SECTION ════════ */}
      <section className="relative bg-[#0F233B] pt-36 pb-20 overflow-hidden" aria-label="Publications Hero">
        {/* Editorial ambient blurs */}
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-brand-amber/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-30%] left-[-10%] w-[500px] h-[500px] bg-brand-blue-light/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Thin mesh grid lines for structural design */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" aria-hidden="true">
          <div className="w-full h-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        <div className="relative container-wide z-10 text-center px-4">
          <span className="badge bg-brand-amber/20 text-brand-amber border border-brand-amber/10 text-xs font-semibold tracking-widest uppercase mb-4 inline-block shadow-sm">
            Publications & Milestones
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl !text-white font-bold leading-tight mb-5">
            <ScrollRevealTypewriter text="Stories That " />
            <span className="text-brand-amber italic font-normal">
              <ScrollRevealTypewriter text="Inspire" delay={0.4} />
            </span>
            <ScrollRevealTypewriter text=" Change" delay={0.7} />
          </h1>
          <p className="font-body text-white/80 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            <ScrollRevealWords text="Explore our complete content library of stories from the ground, press updates, and community milestones." />
          </p>
        </div>
      </section>

      {/* ════════ CATEGORY TABS ════════ */}
      <section
        className="bg-[#FBF7F0] border-b border-brand-sand/40 py-4"
        aria-label="Category filter"
      >
        <div className="container-wide px-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1.5 sm:pb-0 scrollbar-none w-full justify-start">
            {categories.map((cat) => {
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat)
                    updateFilters({ category: cat })
                  }}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold font-body transition-all duration-300 cursor-pointer border relative group
                    ${
                      isActive
                        ? 'bg-brand-blue border-brand-blue text-white shadow-sm'
                        : 'bg-white border-brand-sand/60 text-brand-grey hover:text-brand-blue hover:border-brand-blue/30'
                    }`}
                  aria-pressed={isActive}
                  id={`filter-cat-${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                >
                  <span className="relative inline-block py-0.5">
                    {cat}
                    {!isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                    )}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Mobile Filter Toggle Button */}
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-1.5 px-4 py-2 bg-white border border-brand-sand/60 rounded-full text-xs font-semibold text-brand-grey hover:text-brand-blue transition-colors cursor-pointer flex-shrink-0"
            aria-label="Open filters drawer"
          >
            <Filter size={14} />
            Filters
          </button>
        </div>
      </section>

      {/* ════════ FEATURED STORY BANNER ════════ */}
      {showFeaturedSection && featured && (
        <section className="pt-16 pb-8 bg-[#FBF7F0]" aria-label="Featured Publication">
          <div className="container-wide px-4">
            <ScrollRevealCard delay={0}>
              <div className="grid md:grid-cols-[6fr_5fr] gap-8 bg-white rounded-[32px] shadow-card overflow-hidden p-6 sm:p-8 border border-brand-sand/35 hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300">
                {/* Left Side: Image */}
                <div className="relative h-[300px] md:h-[400px] rounded-[24px] overflow-hidden shadow-sm group">
                  <Image
                    src={featured.coverImage}
                    alt={featured.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute top-4 right-4 z-20">
                    <span className="bg-gradient-to-r from-brand-amber to-amber-300 text-brand-charcoal text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full shadow-lg border border-brand-amber/20">
                      Featured
                    </span>
                  </div>
                </div>

                {/* Right Side: Content */}
                <div className="flex flex-col justify-center py-4 text-left">
                  <span className="badge bg-brand-amber/25 text-brand-amber-dark border border-brand-amber/15 text-[9px] uppercase font-bold tracking-wider mb-4 self-start shadow-sm">
                    Featured Story
                  </span>

                  <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-charcoal mb-4 hover:text-brand-blue transition-colors leading-tight">
                    <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
                  </h2>

                  <p className="font-body text-xs sm:text-sm text-brand-grey/90 leading-relaxed mb-6">
                    {featured.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-5 border-t border-brand-sand/30">
                    <div className="flex flex-col gap-1">
                      <span className="font-body text-[10px] text-brand-grey/50 uppercase tracking-wider">
                        Published {formatDate(featured.publishDate)}
                      </span>
                      {featured.author && (
                        <span className="font-body text-xs font-semibold text-brand-charcoal">
                          By {featured.author}
                        </span>
                      )}
                    </div>
                    <Link
                      href={`/blog/${featured.slug}`}
                      className="btn-amber text-xs font-semibold px-6 py-3 rounded-full hover:scale-102 transition-transform cursor-pointer"
                      id="featured-read-btn"
                    >
                      Read Story
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollRevealCard>
          </div>
        </section>
      )}

      {/* ════════ MAIN CONTENT AREA (TWO-COLUMN) ════════ */}
      <section className="py-12 bg-[#FBF7F0]" aria-label="Publications Feed">
        <div className="container-wide px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* ── Main Column (Grid of Cards) ── */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <p className="font-body text-sm text-brand-grey">
                  Showing <span className="font-semibold text-brand-blue">{filtered.length}</span> publications
                </p>
              </div>

              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <AnimatePresence mode="popLayout">
                    {filtered.map((item, idx) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                      >
                        <ScrollRevealCard delay={idx % 2 * 0.05} yOffset={15} className="h-full">
                          <PublicationCard item={item} />
                        </ScrollRevealCard>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-[32px] shadow-sm border border-brand-sand/30 px-6">
                  <p className="font-heading text-2xl text-brand-charcoal mb-2">No publications found</p>
                  <p className="font-body text-brand-grey text-sm mb-6">
                    Try adjusting your category, search filters, or reset options.
                  </p>
                  <button
                    onClick={handleReset}
                    className="btn-amber px-6 py-2.5 rounded-full text-xs font-semibold hover:scale-102 transition-transform cursor-pointer"
                    id="no-results-reset-btn"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>

            {/* ── Desktop Sticky Sidebar ── */}
            <aside className="hidden lg:block lg:col-span-1" aria-label="Publications sidebar filters">
              <ScrollRevealCard delay={0.1}>
                <div className="bg-white rounded-[32px] p-6 sticky top-24 space-y-6 border border-brand-sand/35 shadow-card">
                  {/* Search */}
                  <div className="space-y-2">
                    <label
                      htmlFor="desktop-search"
                      className="block text-[10px] font-body font-bold text-brand-grey uppercase tracking-wider"
                    >
                      Search Archive
                    </label>
                    <div className="relative group">
                      <input
                        id="desktop-search"
                        type="search"
                        placeholder="Search publications..."
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value)
                          updateFilters({ search: e.target.value })
                        }}
                        className="w-full pl-10 pr-10 py-2.5 rounded-full border border-brand-sand bg-[#FBF7F0]/40 text-xs font-body
                                   text-brand-charcoal placeholder:text-brand-grey/50
                                   focus:outline-none focus-visible:outline-none focus:border-brand-blue-light focus:bg-white focus:ring-4 focus:ring-brand-blue/10 transition-all duration-300 shadow-sm"
                        aria-label="Search articles"
                      />
                      <Search
                        size={14}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-grey pointer-events-none z-10 transition-colors duration-300 group-focus-within:text-brand-blue"
                        aria-hidden="true"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => {
                            setSearchQuery('')
                            updateFilters({ search: '' })
                          }}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-brand-sand/50 hover:bg-brand-sand text-brand-grey hover:text-brand-charcoal flex items-center justify-center transition-all duration-200 cursor-pointer z-10"
                          aria-label="Clear search"
                        >
                          <span className="text-[8px] leading-none">✕</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Content Type Filter */}
                  <div className="space-y-2.5">
                    <p className="text-[10px] font-body font-bold text-brand-grey uppercase tracking-wider">
                      Content Type
                    </p>
                    <div className="grid grid-cols-1 gap-1.5">
                      {(['all', 'blog', 'achievement'] as const).map((t) => (
                        <button
                          key={t}
                          onClick={() => {
                            setActiveType(t)
                            updateFilters({ type: t })
                          }}
                          className={`w-full text-left px-4 py-2 rounded-full text-xs font-semibold font-body transition-all duration-300 capitalize cursor-pointer
                            ${
                              activeType === t
                                ? 'bg-brand-blue text-white shadow-sm'
                                : 'text-brand-grey hover:bg-[#FBF7F0] hover:text-brand-blue'
                            }`}
                          aria-pressed={activeType === t}
                          id={`desktop-filter-type-${t}`}
                        >
                          {t === 'all'
                            ? 'All Publications'
                            : t === 'blog'
                            ? 'Blog Posts / Stories'
                            : 'Achievements'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Year Filter */}
                  <div className="space-y-2.5">
                    <p className="text-[10px] font-body font-bold text-brand-grey uppercase tracking-wider">Year</p>
                    <div className="grid grid-cols-1 gap-1.5">
                      {years.map((y) => (
                        <button
                          key={y}
                          onClick={() => {
                            setActiveYear(y)
                            updateFilters({ year: y })
                          }}
                          className={`w-full text-left px-4 py-2 rounded-full text-xs font-semibold font-body transition-all duration-300 cursor-pointer
                            ${
                              activeYear === y
                                ? 'bg-brand-amber text-brand-charcoal shadow-sm'
                                : 'text-brand-grey hover:bg-[#FBF7F0] hover:text-brand-blue'
                            }`}
                          aria-pressed={activeYear === y}
                          id={`desktop-filter-year-${y.replace(' ', '-')}`}
                        >
                          {y}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Month Filter */}
                  <div className="space-y-2">
                    <label
                      htmlFor="desktop-month-select"
                      className="block text-[10px] font-body font-bold text-brand-grey uppercase tracking-wider"
                    >
                      Month
                    </label>
                    <div className="relative">
                      <select
                        id="desktop-month-select"
                        value={activeMonth}
                        onChange={(e) => {
                          setActiveMonth(e.target.value)
                          updateFilters({ month: e.target.value })
                        }}
                        className="w-full pl-4 pr-10 py-2.5 rounded-full border border-brand-sand bg-white text-xs font-body
                                   text-brand-grey focus:outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 transition-all duration-300 cursor-pointer appearance-none"
                        aria-label="Filter by month"
                      >
                        {months.map((m) => (
                          <option key={m} value={m}>
                            {m === 'All Months' ? m : monthLabels[m]}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={14}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-grey pointer-events-none"
                      />
                    </div>
                  </div>

                  {/* Reset Button */}
                  <button
                    onClick={handleReset}
                    className="w-full text-center text-xs font-bold text-brand-grey hover:text-brand-blue transition-colors pt-4 border-t border-brand-sand/50 cursor-pointer"
                    id="desktop-filter-reset-btn"
                  >
                    Reset All Filters
                  </button>
                </div>
              </ScrollRevealCard>
            </aside>
          </div>
        </div>
      </section>

      {/* ════════ MOBILE FILTER DRAWER OVERLAY ════════ */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex items-end justify-end" role="dialog" aria-modal="true">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="absolute inset-0 bg-brand-charcoal/50 backdrop-blur-sm"
            />

            {/* Sliding Bottom Drawer */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="absolute left-0 right-0 bottom-0 bg-white rounded-t-[32px] shadow-card-hover border-t border-brand-sand/40 max-h-[85vh] overflow-y-auto z-50 p-6 space-y-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-brand-sand/30 pb-4">
                <h2 className="font-heading font-bold text-brand-charcoal text-lg">Filter Publications</h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1.5 rounded-full bg-brand-sand/30 text-brand-grey hover:text-brand-charcoal transition-colors cursor-pointer"
                  aria-label="Close filters"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Search */}
              <div className="space-y-2">
                <label
                  htmlFor="mobile-search"
                  className="block text-[10px] font-body font-bold text-brand-grey uppercase tracking-wider"
                >
                  Search
                </label>
                <div className="relative">
                  <input
                    id="mobile-search"
                    type="search"
                    placeholder="Search publications..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      updateFilters({ search: e.target.value })
                    }}
                    className="w-full pl-10 pr-10 py-2.5 rounded-full border border-brand-sand bg-[#FBF7F0]/40 text-xs font-body
                               text-brand-charcoal focus:outline-none focus:border-brand-blue transition-all"
                  />
                  <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-grey" />
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery('')
                        updateFilters({ search: '' })
                      }}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-brand-sand/50 text-brand-grey flex items-center justify-center cursor-pointer"
                      aria-label="Clear search"
                    >
                      <span className="text-[8px]">✕</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Content Type */}
              <div className="space-y-2.5">
                <p className="text-[10px] font-body font-bold text-brand-grey uppercase tracking-wider">Content Type</p>
                <div className="grid grid-cols-3 gap-2">
                  {(['all', 'blog', 'achievement'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setActiveType(t)
                        updateFilters({ type: t })
                      }}
                      className={`px-3 py-2 rounded-full text-[10px] sm:text-xs font-semibold font-body text-center transition-all cursor-pointer border
                        ${
                          activeType === t
                            ? 'bg-brand-blue border-brand-blue text-white shadow-sm'
                            : 'bg-white border-brand-sand/60 text-brand-grey'
                        }`}
                      aria-pressed={activeType === t}
                      id={`mobile-filter-type-${t}`}
                    >
                      {t === 'all' ? 'All' : t === 'blog' ? 'Blogs' : 'Achievements'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Year */}
              <div className="space-y-2.5">
                <p className="text-[10px] font-body font-bold text-brand-grey uppercase tracking-wider">Year</p>
                <div className="grid grid-cols-3 gap-2">
                  {years.map((y) => (
                    <button
                      key={y}
                      onClick={() => {
                        setActiveYear(y)
                        updateFilters({ year: y })
                      }}
                      className={`px-3 py-2 rounded-full text-[10px] sm:text-xs font-semibold font-body text-center transition-all cursor-pointer border
                        ${
                          activeYear === y
                            ? 'bg-brand-amber border-brand-amber text-brand-charcoal shadow-sm'
                            : 'bg-white border-brand-sand/60 text-brand-grey'
                        }`}
                      aria-pressed={activeYear === y}
                      id={`mobile-filter-year-${y.replace(' ', '-')}`}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>

              {/* Month */}
              <div className="space-y-2">
                <label
                  htmlFor="mobile-month-select"
                  className="block text-[10px] font-body font-bold text-brand-grey uppercase tracking-wider"
                >
                  Month
                </label>
                <div className="relative">
                  <select
                    id="mobile-month-select"
                    value={activeMonth}
                    onChange={(e) => {
                      setActiveMonth(e.target.value)
                      updateFilters({ month: e.target.value })
                    }}
                    className="w-full pl-4 pr-10 py-2.5 rounded-full border border-brand-sand bg-white text-xs font-body
                               text-brand-grey focus:outline-none focus:border-brand-blue cursor-pointer appearance-none"
                  >
                    {months.map((m) => (
                      <option key={m} value={m}>
                        {m === 'All Months' ? m : monthLabels[m]}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-grey" />
                </div>
              </div>

              {/* Drawer Action Buttons */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-brand-sand/30">
                <button
                  onClick={handleReset}
                  className="py-3 text-xs font-bold text-brand-grey hover:text-brand-blue border border-brand-sand/60 rounded-full text-center transition-colors cursor-pointer"
                  id="mobile-drawer-reset-btn"
                >
                  Reset All
                </button>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="py-3 text-xs font-bold bg-brand-blue text-white rounded-full text-center hover:bg-brand-blue/90 shadow-sm cursor-pointer"
                  id="mobile-drawer-apply-btn"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
