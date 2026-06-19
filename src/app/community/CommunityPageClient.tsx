'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, Users, Heart, SlidersHorizontal } from 'lucide-react'
import CommunityCard from '@/components/ui/CommunityCard'
import { ScrollRevealTypewriter, ScrollRevealWords, ScrollRevealCard } from '@/components/ui/ScrollAnimations'

const domains = ['All Domains', 'Education', 'Healthcare', 'Women Empowerment', 'Environment', 'Emergency Relief', 'Community Welfare']
const types   = ['All', 'Donor', 'Volunteer'] as const
type ContribType = typeof types[number]

const members = [
  { name: 'Amina Rashid',  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80', type: 'donor'     as const, domain: 'Education',        joinedYear: 2022, contribution: '₹5 Lakh Annual Scholarship Fund',  story: 'Amina has funded over 40 scholarships, believing every girl deserves an education.' },
  { name: 'Rahul Mehta',   image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80', type: 'volunteer' as const, domain: 'Healthcare',        joinedYear: 2021, contribution: '200+ Medical Camp Hours',          story: 'A retired doctor who spends weekends at mobile health camps across rural Maharashtra.' },
  { name: 'Sara Al-Noor',  image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80', type: 'donor'     as const, domain: 'Women Empowerment', joinedYear: 2023, contribution: 'Skills Lab Equipment Donor',      story: 'Sara donated equipment for 3 vocational training labs, empowering 300 women annually.' },
  { name: 'Imran Syed',    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80', type: 'volunteer' as const, domain: 'Environment',       joinedYear: 2020, contribution: 'Led 5 Plantation Drives',         story: 'Imran coordinates tree plantation campaigns with local youth groups across 4 cities.' },
  { name: 'Priya Sharma',  image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80', type: 'volunteer' as const, domain: 'Education',         joinedYear: 2022, contribution: '500+ Teaching Hours',            story: 'A software engineer by day, Priya runs weekend coding classes for underprivileged teens.' },
  { name: 'Khalid Farooq', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80', type: 'donor'     as const, domain: 'Emergency Relief',  joinedYear: 2019, contribution: 'Emergency Relief Corpus Donor',  story: 'Khalid established a dedicated corpus fund that activates automatically during disasters.' },
  { name: 'Nadia Hussain', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80', type: 'volunteer' as const, domain: 'Community Welfare', joinedYear: 2023, contribution: 'Community Kitchen Coordinator',  story: 'Nadia manages 3 community kitchens, coordinating 50+ volunteers to feed 2,000 families.' },
  { name: 'Arjun Patel',   image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80', type: 'donor'     as const, domain: 'Healthcare',        joinedYear: 2021, contribution: 'Mobile Medical Unit Sponsor',   story: 'Arjun sponsored 2 mobile medical units, bringing healthcare to 60+ remote villages.' },
]

export default function CommunityPageClient() {
  const [domain, setDomain] = useState('All Domains')
  const [ctype,  setCtype]  = useState<ContribType>('All')
  const [search, setSearch] = useState('')
  const [sort,   setSort]   = useState<'newest' | 'oldest' | 'az'>('newest')

  const filtered = useMemo(() => {
    let list = members.filter((m) => {
      const matchDomain = domain === 'All Domains' || m.domain === domain
      const matchType   = ctype  === 'All'         || m.type.toLowerCase() === ctype.toLowerCase()
      const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
                          m.domain.toLowerCase().includes(search.toLowerCase()) ||
                          m.story.toLowerCase().includes(search.toLowerCase())
      return matchDomain && matchType && matchSearch
    })
    if (sort === 'newest') list = [...list].sort((a, b) => b.joinedYear - a.joinedYear)
    if (sort === 'oldest') list = [...list].sort((a, b) => a.joinedYear - b.joinedYear)
    if (sort === 'az')     list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [domain, ctype, search, sort])

  const donorCount     = members.filter(m => m.type === 'donor').length
  const volunteerCount = members.filter(m => m.type === 'volunteer').length

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

            <select
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="px-4 py-2.5 rounded-full border border-brand-sand/80 bg-white font-body text-xs sm:text-sm text-brand-grey
                         focus:outline-none focus:border-brand-blue-light focus:ring-4 focus:ring-brand-blue/5 transition-all duration-300 cursor-pointer"
              aria-label="Filter by domain"
              id="community-domain-filter"
            >
              {domains.map((d) => <option key={d}>{d}</option>)}
            </select>

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

            <div className="flex items-center gap-2 lg:ml-auto">
              <SlidersHorizontal size={14} className="text-brand-grey" aria-hidden="true" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="px-4 py-2.5 rounded-full border border-brand-sand/80 bg-white font-body text-xs sm:text-sm text-brand-grey
                           focus:outline-none focus:border-brand-blue-light focus:ring-4 focus:ring-brand-blue/5 transition-all duration-300 cursor-pointer"
                aria-label="Sort members"
                id="community-sort"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="az">A–Z</option>
              </select>
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

