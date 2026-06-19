  'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, Users, Heart, SlidersHorizontal, ChevronDown } from 'lucide-react'
import CommunityCard from '@/components/ui/CommunityCard'
import { ScrollRevealTypewriter, ScrollRevealWords, ScrollRevealCard } from '@/components/ui/ScrollAnimations'
import { communityMembers } from '@/data/communityMembers'
import { cn } from '@/lib/utils'

const domains = ['All Domains', 'Education', 'Healthcare', 'Women Empowerment', 'Environment', 'Emergency Relief', 'Community Welfare']
const types = ['All', 'Donor', 'Volunteer'] as const
type ContribType = typeof types[number]

export default function CommunityPageClient() {
  const [domain, setDomain] = useState('All Domains')
  const [ctype, setCtype] = useState<ContribType>('All')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<'newest' | 'oldest' | 'az'>('newest')
  const [isDomainOpen, setIsDomainOpen] = useState(false)
  const [isSortOpen, setIsSortOpen] = useState(false)

  const filtered = useMemo(() => {
    let list = communityMembers.filter((m) => {
      const matchDomain = domain === 'All Domains' || m.focusTags.includes(domain)
      const matchType = ctype === 'All' || m.role.toLowerCase() === ctype.toLowerCase()
      const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.focusTags.some(tag => tag.toLowerCase().includes(search.toLowerCase())) ||
        m.contributionSummary.toLowerCase().includes(search.toLowerCase())
      return matchDomain && matchType && matchSearch
    })
    if (sort === 'newest') list = [...list].sort((a, b) => Number(b.joinedYear) - Number(a.joinedYear))
    if (sort === 'oldest') list = [...list].sort((a, b) => Number(a.joinedYear) - Number(b.joinedYear))
    if (sort === 'az') list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [domain, ctype, search, sort])

  const donorCount = communityMembers.filter(m => m.role === 'DONOR').length
  const volunteerCount = communityMembers.filter(m => m.role === 'VOLUNTEER').length

  return (
    <>
      {/* ════════ HEADER ════════ */}
      <section className="relative bg-[#0F233B] pt-36 pb-20 overflow-hidden" aria-label="Community header">
        {/* Editorial ambient light glows */}
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-brand-amber/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-30%] left-[-10%] w-[500px] h-[500px] bg-brand-blue-light/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Thin mesh grid lines for structural design */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" aria-hidden="true">
          <div className="w-full h-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        <div className="relative container-wide z-10">
          <p className="section-label text-brand-amber/80 mb-3">Our People</p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl !text-white font-bold mb-5 leading-tight">
            <ScrollRevealTypewriter text="Meet Our " />
            <span className="text-brand-amber italic font-normal">
              <ScrollRevealTypewriter text="Changemakers" delay={0.4} />
            </span>
          </h1>
          <p className="font-body text-white/90 text-base sm:text-lg max-w-xl mb-10 leading-relaxed">
            <ScrollRevealWords text="The extraordinary individuals — donors and volunteers — who make our mission possible." />
          </p>

          <div className="flex flex-wrap gap-6">
            <ScrollRevealCard delay={0.1} yOffset={15}>
              <div className="flex items-center gap-3.5 bg-white/5 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/10 shadow-lg hover:border-brand-amber/30 transition-all duration-300">
                <div className="w-10 h-10 bg-brand-amber/15 rounded-xl flex items-center justify-center">
                  <Heart size={20} className="text-brand-amber fill-brand-amber/20" />
                </div>
                <div>
                  <p className="font-heading font-bold text-white text-2xl leading-none">{donorCount}+</p>
                  <p className="font-body text-white/50 text-[10px] uppercase tracking-wider mt-1.5 font-bold">Active Donors</p>
                </div>
              </div>
            </ScrollRevealCard>
            <ScrollRevealCard delay={0.2} yOffset={15}>
              <div className="flex items-center gap-3.5 bg-white/5 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/10 shadow-lg hover:border-brand-amber/30 transition-all duration-300">
                <div className="w-10 h-10 bg-brand-blue-light/15 rounded-xl flex items-center justify-center">
                  <Users size={20} className="text-brand-blue-light" />
                </div>
                <div>
                  <p className="font-heading font-bold text-white text-2xl leading-none">{volunteerCount}+</p>
                  <p className="font-body text-white/50 text-[10px] uppercase tracking-wider mt-1.5 font-bold">Active Volunteers</p>
                </div>
              </div>
            </ScrollRevealCard>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[#FBF7F0]" aria-label="Community directory">
        <div className="container-wide">
          {/* ════════ FILTER BAR ════════ */}
          <div className="bg-white rounded-[24px] p-5 mb-10 flex flex-wrap items-center gap-4 border border-brand-sand/35 shadow-card relative z-30" aria-label="Filters">
            <div className="relative flex-1 min-w-[200px]">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-grey" aria-hidden="true" />
              <input
                type="search"
                placeholder="Search members…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-brand-sand/80 bg-[#FBF7F0]/40 font-body text-xs sm:text-sm
                           text-brand-charcoal placeholder:text-brand-grey/40
                           focus:outline-none focus:border-brand-blue-light focus:bg-white focus:ring-4 focus:ring-brand-blue/5 transition-all duration-300"
                aria-label="Search community members"
                id="community-search"
              />
            </div>

            {/* Domain Filter Dropdown */}
            <div className="relative min-w-[180px]">
              <button
                type="button"
                onClick={() => {
                  setIsDomainOpen(!isDomainOpen)
                  setIsSortOpen(false)
                }}
                className="w-full flex items-center justify-between pl-4 pr-3.5 py-2.5 rounded-full border border-brand-sand/80 bg-white font-body text-xs sm:text-sm text-brand-grey focus:outline-none focus:border-brand-blue-light focus:ring-4 focus:ring-brand-blue/5 transition-all duration-300 cursor-pointer text-left"
                id="community-domain-filter"
                aria-haspopup="listbox"
                aria-expanded={isDomainOpen}
              >
                <span className="truncate">{domain}</span>
                <ChevronDown size={14} className={cn("text-brand-grey/80 transition-transform duration-200 flex-shrink-0 ml-2", isDomainOpen && "transform rotate-180")} />
              </button>
              {isDomainOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsDomainOpen(false)} />
                  <ul className="absolute top-[calc(100%+6px)] left-0 w-full bg-white border border-brand-sand/40 rounded-2xl shadow-card overflow-hidden z-50 py-1.5 animate-[fadeIn_0.15s_ease-out]">
                    {domains.map((d) => (
                      <li key={d}>
                        <button
                          type="button"
                          onClick={() => {
                            setDomain(d)
                            setIsDomainOpen(false)
                          }}
                          className={cn(
                            "w-full text-left px-4 py-2 text-xs sm:text-sm font-body transition-colors duration-150 cursor-pointer",
                            domain === d
                              ? "bg-brand-blue/5 text-brand-blue font-semibold"
                              : "text-brand-grey hover:bg-[#FBF7F0] hover:text-brand-blue"
                          )}
                        >
                          {d}
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <div className="flex gap-1.5 p-1 bg-[#FBF7F0]/40 rounded-full border border-brand-sand/40">
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => setCtype(t)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold font-body transition-all duration-300 cursor-pointer
                    ${ctype === t
                      ? 'bg-brand-blue text-white shadow-sm'
                      : 'text-brand-grey hover:text-brand-blue'}`}
                  aria-pressed={ctype === t}
                  id={`community-type-${t.toLowerCase()}`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Sort Filter Dropdown */}
            <div className="flex items-center gap-2 lg:ml-auto">
              <SlidersHorizontal size={14} className="text-brand-grey" aria-hidden="true" />
              <div className="relative min-w-[150px]">
                <button
                  type="button"
                  onClick={() => {
                    setIsSortOpen(!isSortOpen)
                    setIsDomainOpen(false)
                  }}
                  className="w-full flex items-center justify-between pl-4 pr-3.5 py-2.5 rounded-full border border-brand-sand/80 bg-white font-body text-xs sm:text-sm text-brand-grey focus:outline-none focus:border-brand-blue-light focus:ring-4 focus:ring-brand-blue/5 transition-all duration-300 cursor-pointer text-left"
                  id="community-sort"
                  aria-haspopup="listbox"
                  aria-expanded={isSortOpen}
                >
                  <span className="truncate">
                    {sort === 'newest' && 'Newest First'}
                    {sort === 'oldest' && 'Oldest First'}
                    {sort === 'az' && 'A–Z'}
                  </span>
                  <ChevronDown size={14} className={cn("text-brand-grey/80 transition-transform duration-200 flex-shrink-0 ml-2", isSortOpen && "transform rotate-180")} />
                </button>
                {isSortOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsSortOpen(false)} />
                    <ul className="absolute top-[calc(100%+6px)] right-0 w-full bg-white border border-brand-sand/40 rounded-2xl shadow-card overflow-hidden z-50 py-1.5 animate-[fadeIn_0.15s_ease-out]">
                      {[
                        { value: 'newest', label: 'Newest First' },
                        { value: 'oldest', label: 'Oldest First' },
                        { value: 'az', label: 'A–Z' },
                      ].map((item) => (
                        <li key={item.value}>
                          <button
                            type="button"
                            onClick={() => {
                              setSort(item.value as any)
                              setIsSortOpen(false)
                            }}
                            className={cn(
                              "w-full text-left px-4 py-2 text-xs sm:text-sm font-body transition-colors duration-150 cursor-pointer",
                              sort === item.value
                                ? "bg-brand-blue/5 text-brand-blue font-semibold"
                                : "text-brand-grey hover:bg-[#FBF7F0] hover:text-brand-blue"
                            )}
                          >
                            {item.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>

          <p className="font-body text-sm text-brand-grey mb-6">
            Showing <span className="font-semibold text-brand-blue">{filtered.length}</span> members
          </p>

          {/* ════════ CARDS GRID ════════ */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.map((m, idx) => (
                <ScrollRevealCard key={m.name} delay={idx * 0.05} yOffset={25} className="flex">
                  <CommunityCard {...m} className="w-full" />
                </ScrollRevealCard>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Users size={32} className="text-brand-grey mx-auto mb-3 opacity-40" />
              <p className="font-heading text-xl text-brand-charcoal mb-2">No members found</p>
              <p className="font-body text-sm text-brand-grey">Try adjusting your filters.</p>
            </div>
          )}

          {/* ════════ JOIN CTA ════════ */}
          <div className="mt-20 grid sm:grid-cols-2 gap-8">
            <ScrollRevealCard delay={0}>
              <div className="bg-gradient-to-br from-[#1A3A5C] via-[#11243B] to-[#1C1C1E] border border-white/10 rounded-[32px] p-8 text-center h-full flex flex-col justify-between shadow-card-hover hover:border-brand-amber/30 transition-all duration-300 relative overflow-hidden group">
                {/* Gold ambient glow */}
                <div className="absolute -top-20 -right-20 w-44 h-44 bg-brand-amber/10 rounded-full blur-2xl pointer-events-none group-hover:scale-110 transition-transform duration-500" />

                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-14 h-14 bg-brand-amber/15 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                    <Heart size={26} className="text-brand-amber fill-brand-amber/20" />
                  </div>
                  <h3 className="font-heading !text-white font-bold text-2xl mb-3">Become a Donor</h3>
                  <p className="font-body text-white/80 text-sm max-w-sm mb-8">
                    Your contribution directly funds life-changing health, education, and nutrition programs across underprivileged communities.
                  </p>
                </div>

                <Link href="/contact#donor" className="btn-amber w-full justify-center py-3.5 font-semibold text-brand-charcoal rounded-full shadow-md hover:scale-[1.01] active:scale-95 transition-all cursor-pointer relative z-10" id="community-donor-cta">
                  Become a Donor
                </Link>
              </div>
            </ScrollRevealCard>

            <ScrollRevealCard delay={0.15}>
              <div className="bg-gradient-to-br from-white to-brand-cream border border-brand-sand/40 rounded-[32px] p-8 text-center h-full flex flex-col justify-between shadow-card hover:shadow-card-hover hover:border-brand-blue-light/30 transition-all duration-300 relative overflow-hidden group">
                {/* Blue ambient glow */}
                <div className="absolute -top-20 -right-20 w-44 h-44 bg-brand-blue-light/10 rounded-full blur-2xl pointer-events-none group-hover:scale-110 transition-transform duration-500" />

                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-14 h-14 bg-brand-blue/10 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                    <Users size={26} className="text-brand-blue" />
                  </div>
                  <h3 className="font-heading text-brand-charcoal font-bold text-2xl mb-3">Become a Volunteer</h3>
                  <p className="font-body text-brand-grey text-sm max-w-sm mb-8">
                    Give your time, skills, and energy to volunteer in field offices, teach children, support kitchens, or plant trees.
                  </p>
                </div>

                <Link href="/contact#volunteer" className="btn-primary bg-brand-charcoal text-white hover:bg-black w-full justify-center py-3.5 font-semibold rounded-full shadow-sm hover:scale-[1.01] active:scale-95 transition-all cursor-pointer relative z-10" id="community-volunteer-cta">
                  Apply to Volunteer
                </Link>
              </div>
            </ScrollRevealCard>
          </div>
        </div>
      </section>
    </>
  )
}

