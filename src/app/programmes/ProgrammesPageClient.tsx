'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, ArrowRight, Award } from 'lucide-react'
import { ScrollRevealCard } from '@/components/ui/ScrollAnimations'

const categories = [
  'All Programmes',
  'Education',
  'Healthcare',
  'Women Empowerment',
  'Environment',
  'Emergency Relief',
  'Community Welfare',
]

const programmesData = [
  {
    id: 1,
    category: 'Education',
    title: 'Primary School Infrastructure',
    excerpt: 'Building and renovating classroom facilities, libraries, and science labs in rural government schools.',
    location: 'Maharashtra, India',
    impact: '15 schools upgraded, 3,200+ students benefited',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80',
  },
  {
    id: 2,
    category: 'Healthcare',
    title: 'Mobile Health Outreach',
    excerpt: 'Equipping mobile medical vans to deliver primary diagnosis, pediatric care, and essential medicines to remote villages.',
    location: 'Rajasthan, India',
    impact: '45,000+ patients treated annually',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&q=80',
  },
  {
    id: 3,
    category: 'Women Empowerment',
    title: 'Vocational Sewing & Tailoring',
    excerpt: 'Empowering women with industrial sewing skills, tailoring certificates, and micro-grants to start self-sufficient home businesses.',
    location: 'Gujarat, India',
    impact: '600+ women graduated, 80% self-employed',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=80',
  },
  {
    id: 4,
    category: 'Environment',
    title: 'Solar Wells & Rainwater Harvesting',
    excerpt: 'Creating solar-powered deep borewells and building community rainwater harvesting structures to combat drought.',
    location: 'Somalia & Kenya border',
    impact: '22 deep wells, 18,000+ residents with daily clean water',
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80',
  },
  {
    id: 5,
    category: 'Emergency Relief',
    title: 'Winter Refugee Assistance',
    excerpt: 'Distributing thermal clothes, heavy blankets, fuel, and modular shelter insulation to displaced families in refugee camps.',
    location: 'Syria & Lebanon border',
    impact: '12,000 families aided with winter survival kits',
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&q=80',
  },
  {
    id: 6,
    category: 'Community Welfare',
    title: 'Community Kitchens Network',
    excerpt: 'Operating clean, communal cooking spaces that serve hot, highly nutritious meals to daily wage earners and families.',
    location: 'Mumbai & Pune, India',
    impact: '250,000+ meals served this year',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80',
  },
  {
    id: 7,
    category: 'Education',
    title: 'Girls Academic Scholarships',
    excerpt: 'Providing complete financial coverage for secondary and college education of high-performing girls from marginalized communities.',
    location: 'Uttar Pradesh, India',
    impact: '450 girls sponsored, 94% graduation rate',
    image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=600&q=80',
  },
  {
    id: 8,
    category: 'Healthcare',
    title: 'Maternal Health Centers',
    excerpt: 'Establishing community-level maternity clinics equipped with prenatal diagnostic tools and trained midwives.',
    location: 'Kenya, East Africa',
    impact: '4,500+ safe deliveries supported',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80',
  },
  {
    id: 9,
    category: 'Women Empowerment',
    title: 'Micro-business Incubator',
    excerpt: 'Training women in bookkeeping, basic inventory management, and digital payments, and providing starter capital.',
    location: 'West Bengal, India',
    impact: '350 micro-businesses successfully launched',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&q=80',
  },
  {
    id: 10,
    category: 'Environment',
    title: 'Sustainable Farming Outreach',
    excerpt: 'Teaching smallholder farmers water-efficient organic cultivation methods, seed saving, and composting.',
    location: 'Madhya Pradesh, India',
    impact: '1,200 farmers trained, 30% average income increase',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80',
  },
  {
    id: 11,
    category: 'Emergency Relief',
    title: 'Emergency Monsoon Relief',
    excerpt: 'Deploying rescue boats, setting up medical aid camps, and distributing hygiene kits during heavy seasonal flooding.',
    location: 'Assam, India',
    impact: '15,000+ flood-affected residents assisted',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80',
  },
  {
    id: 12,
    category: 'Community Welfare',
    title: 'Community Clean Water Pumps',
    excerpt: 'Drilling boreholes and installing heavy-duty manual handpumps to provide adjacent rural communities with clean drinking water.',
    location: 'Bihar & Jharkhand, India',
    impact: '140+ pumps installed, 50,000+ daily beneficiaries',
    image: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=600&q=80',
  },
]

const getBadgeStyles = (category: string) => {
  switch (category) {
    case 'Education':
      return 'bg-blue-50 text-blue-700 border-blue-100'
    case 'Healthcare':
      return 'bg-rose-50 text-rose-700 border-rose-100'
    case 'Women Empowerment':
      return 'bg-purple-50 text-purple-700 border-purple-100'
    case 'Environment':
      return 'bg-emerald-50 text-emerald-700 border-emerald-100'
    case 'Emergency Relief':
      return 'bg-amber-50 text-amber-700 border-amber-100'
    case 'Community Welfare':
      return 'bg-cyan-50 text-cyan-700 border-cyan-100'
    default:
      return 'bg-gray-50 text-gray-700 border-gray-100'
  }
}

export default function ProgrammesPageClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')

  const [activeCategory, setActiveCategory] = useState('All Programmes')

  // Sync category state with query parameters
  useEffect(() => {
    if (categoryParam) {
      const decodedParam = decodeURIComponent(categoryParam)
      const matched = categories.find(
        (cat) => cat.toLowerCase() === decodedParam.toLowerCase()
      )
      if (matched) {
        setActiveCategory(matched)
      }
    } else {
      setActiveCategory('All Programmes')
    }
  }, [categoryParam])

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat)
    if (cat === 'All Programmes') {
      router.push('/programmes')
    } else {
      router.push(`/programmes?category=${encodeURIComponent(cat)}`)
    }
  }

  const filtered = programmesData.filter((p) => {
    if (activeCategory === 'All Programmes') return true
    return p.category === activeCategory
  })

  return (
    <>
      {/* Hero Section */}
      <section
        className="bg-brand-cream pt-36 pb-16 md:pt-44 md:pb-24 border-b border-brand-sand/30 relative"
        aria-labelledby="programmes-hero-heading"
      >
        {/* Editorial ambient light glows */}
        <div className="absolute top-[-10%] right-[-5%] w-[350px] h-[350px] bg-brand-amber/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute top-[10%] left-[-5%] w-[350px] h-[350px] bg-brand-blue-light/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="container-wide px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-cream/80 border border-brand-sand/60 text-xs font-bold tracking-widest text-brand-blue-light uppercase mb-6 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-amber animate-pulse-dot" />
              Social Impact
            </span>
            <h1
              id="programmes-hero-heading"
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-blue leading-[1.15] mb-6"
            >
              Development <span className="italic font-normal text-brand-amber-dark">Programmes</span>
            </h1>
            <p className="font-body text-brand-grey text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
              Sustainable social impact programs designed to uplift and empower communities
            </p>
          </div>
        </div>
      </section>

      {/* Filter Navigation */}
      <section
        className="bg-[#FBF7F0] border-b border-brand-sand/40 py-4"
        aria-label="Category filter"
      >
        <div className="container-wide px-4 lg:px-8 flex items-center justify-center">
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1.5 sm:pb-0 scrollbar-none w-full md:w-auto justify-start md:justify-center">
            {categories.map((cat) => {
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`flex-shrink-0 px-5 py-2.5 rounded-full text-xs font-semibold font-body transition-all duration-300 cursor-pointer border relative group
                    ${
                      isActive
                        ? 'bg-brand-blue border-brand-blue text-white shadow-sm hover:bg-brand-blue/90'
                        : 'bg-white border-brand-sand/60 text-brand-grey hover:text-brand-blue hover:border-brand-blue/30'
                    }`}
                  aria-pressed={isActive}
                  id={`filter-${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
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
        </div>
      </section>

      {/* Programmes Listing */}
      <section className="py-16 md:py-24 bg-white" aria-label="Programmes list">
        <div className="container-wide px-4 lg:px-8">
          <div className="max-w-[1100px] mx-auto">
            {/* Show Count */}
            <div className="flex items-center justify-between mb-8">
              <p className="font-body text-sm text-brand-grey">
                Showing{' '}
                <span className="font-semibold text-brand-blue">{filtered.length}</span>{' '}
                of{' '}
                <span className="font-semibold text-brand-blue">
                  {programmesData.length}
                </span>{' '}
                programmes
              </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
              <AnimatePresence mode="popLayout">
                {filtered.map((programme) => {
                  const badgeStyles = getBadgeStyles(programme.category)
                  return (
                    <motion.div
                      key={programme.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                    >
                      <ScrollRevealCard delay={0} className="h-full">
                        <article className="card overflow-hidden flex flex-col group border border-brand-sand/30 hover:border-brand-amber/30 hover:scale-[1.02] hover:shadow-card-hover transition-all duration-300 h-full w-full bg-white relative">
                          {/* Image with gradient overlay */}
                          <div className="relative h-52 w-full overflow-hidden bg-brand-cream border-b border-brand-sand/20">
                            <Image
                              src={programme.image}
                              alt={programme.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                              sizes="(max-width: 768px) 100vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                            {/* Category Badge */}
                            <span
                              className={`absolute top-4 right-4 z-20 border text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-sm ${badgeStyles}`}
                            >
                              {programme.category}
                            </span>
                          </div>

                          {/* Content */}
                          <div className="p-6 flex flex-col flex-grow">
                            {/* Location */}
                            <span className="flex items-center gap-1.5 text-xs text-brand-grey font-body mb-3">
                              <MapPin size={14} className="text-brand-blue-light" />
                              {programme.location}
                            </span>

                            {/* Title */}
                            <h3 className="font-heading font-bold text-brand-charcoal text-lg mb-3 leading-snug group-hover:text-brand-blue transition-colors duration-200 min-h-[56px] flex items-start">
                              {programme.title}
                            </h3>

                            {/* Description */}
                            <p className="font-body text-brand-grey text-sm mb-6 leading-relaxed line-clamp-3">
                              {programme.excerpt}
                            </p>

                            {/* Stats */}
                            <div className="mt-auto space-y-4">
                              {/* Impact Stats Box */}
                              <div className="bg-brand-cream/50 p-3.5 rounded-2xl border border-brand-sand/30 flex items-start gap-2.5">
                                <Award size={16} className="text-brand-amber-dark flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-[10px] uppercase font-bold tracking-wider text-brand-grey/60 mb-0.5">
                                    Programme Impact
                                  </p>
                                  <p className="text-xs font-body font-semibold text-brand-charcoal leading-snug">
                                    {programme.impact}
                                  </p>
                                </div>
                              </div>

                              {/* Buttons */}
                              <div className="flex items-center justify-between pt-4 border-t border-brand-sand/20 gap-2">
                                <Link
                                  href={`/contact`}
                                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand-blue hover:text-brand-amber transition-colors"
                                >
                                  Learn More
                                  <ArrowRight size={12} />
                                </Link>
                                <Link
                                  href={`/contact#donate`}
                                  className="btn-amber text-xs font-semibold px-4 py-2 rounded-full hover:scale-102 transition-transform cursor-pointer text-center whitespace-nowrap"
                                >
                                  Sponsor Programme
                                </Link>
                              </div>
                            </div>
                          </div>
                        </article>
                      </ScrollRevealCard>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
