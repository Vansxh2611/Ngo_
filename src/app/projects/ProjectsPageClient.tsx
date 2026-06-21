'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, ArrowRight, LayoutGrid, Map } from 'lucide-react'
import { ScrollRevealStagger, ScrollRevealStaggerItem } from '@/components/ui/ScrollAnimations'
import IndiaImpactMap from '@/components/ui/IndiaImpactMap'
import { PremiumCard } from '@/components/ui/PremiumCard'
import { Project } from '@/types'
import { INDIA_IMPACT_COORDINATES } from '@/config/indiaImpactCoordinates'

const categories = [
  'All Projects',
  'Education',
  'Healthcare',
  'Water & Sanitation',
  'Orphan Care',
  'Emergency Relief',
]

const projectsData: Project[] = [
  {
    id: 1,
    category: 'Education',
    title: 'Build Schools in Rural Yemen',
    location: 'mumbai',
    raised: 32500,
    goal: 50000,
    beneficiaries: '300 students',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80',
  },
  {
    id: 2,
    category: 'Water & Sanitation',
    title: 'Clean Water Wells in Somalia',
    location: 'delhi',
    raised: 12000,
    goal: 30000,
    beneficiaries: '1,200 residents',
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80',
  },
  {
    id: 3,
    category: 'Healthcare',
    title: 'Mobile Medical Clinics',
    location: 'kolkata',
    raised: 32000,
    goal: 40000,
    beneficiaries: '800 families',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&q=80',
  },
  {
    id: 4,
    category: 'Orphan Care',
    title: 'Sponsor Orphan Education',
    location: 'chennai',
    raised: 13750,
    goal: 25000,
    beneficiaries: '150 children',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80',
  },
  {
    id: 5,
    category: 'Emergency Relief',
    title: 'Winter Warmth Relief Kits',
    location: 'hyderabad',
    raised: 13500,
    goal: 15000,
    beneficiaries: '2,000 refugees',
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&q=80',
  },
  {
    id: 6,
    category: 'Education',
    title: 'Vocational Training Centers',
    location: 'lucknow',
    raised: 18000,
    goal: 20000,
    beneficiaries: '450 youth',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80',
  },
  {
    id: 7,
    category: 'Healthcare',
    title: 'Maternal Healthcare Centers',
    location: 'jaipur',
    raised: 28000,
    goal: 35000,
    beneficiaries: '500 mothers',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80',
  },
  {
    id: 8,
    category: 'Water & Sanitation',
    title: 'Rainwater Harvesting Systems',
    location: 'patna',
    raised: 8000,
    goal: 10000,
    beneficiaries: '350 households',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80',
  },
  {
    id: 9,
    category: 'Education',
    title: 'Solar-Powered Rural Classrooms',
    location: 'bhopal',
    raised: 15000,
    goal: 25000,
    beneficiaries: '200 students',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=80',
  },
  {
    id: 10,
    category: 'Healthcare',
    title: 'Emergency Pediatric Ward',
    location: 'ahmedabad',
    raised: 42000,
    goal: 60000,
    beneficiaries: '400 children/month',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&q=80',
  },
  {
    id: 11,
    category: 'Water & Sanitation',
    title: 'Deep Well Water Handpumps',
    location: 'mumbai',
    raised: 9000,
    goal: 15000,
    beneficiaries: '900 villagers',
    image: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=600&q=80',
  },
  {
    id: 12,
    category: 'Orphan Care',
    title: 'Orphan Shelter Renovation',
    location: 'delhi',
    raised: 21000,
    goal: 30000,
    beneficiaries: '120 orphans',
    image: 'https://images.unsplash.com/photo-1540479859555-17af45c78602?w=600&q=80',
  },
  {
    id: 13,
    category: 'Emergency Relief',
    title: 'Emergency Food Basket Distribution',
    location: 'kolkata',
    raised: 11000,
    goal: 12000,
    beneficiaries: '1,500 families',
    image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&q=80',
  },
  {
    id: 14,
    category: 'Education',
    title: 'Girls Secondary School Scholarships',
    location: 'chennai',
    raised: 19500,
    goal: 30000,
    beneficiaries: '100 girls',
    image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=600&q=80',
  },
  {
    id: 15,
    category: 'Healthcare',
    title: 'Rural Eye Cataract Surgery Camp',
    location: 'hyderabad',
    raised: 7500,
    goal: 10000,
    beneficiaries: '250 patients',
    image: 'https://images.unsplash.com/photo-1579684389782-64d84b5e905d?w=600&q=80',
  },
  {
    id: 16,
    category: 'Water & Sanitation',
    title: 'Sanitation Facilities in Urban Slums',
    location: 'lucknow',
    raised: 25000,
    goal: 40000,
    beneficiaries: '2,500 residents',
    image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=600&q=80',
  },
  {
    id: 17,
    category: 'Orphan Care',
    title: 'Nutritional Support Program',
    location: 'jaipur',
    raised: 14000,
    goal: 20000,
    beneficiaries: '300 children',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&q=80',
  },
  {
    id: 18,
    category: 'Emergency Relief',
    title: 'Flood Relief Shelter Kits',
    location: 'patna',
    raised: 35000,
    goal: 50000,
    beneficiaries: '1,000 families',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80',
  },
  {
    id: 19,
    category: 'Education',
    title: 'Teacher Training Workshops',
    location: 'bhopal',
    raised: 6000,
    goal: 10000,
    beneficiaries: '150 teachers',
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=80',
  },
  {
    id: 20,
    category: 'Healthcare',
    title: 'Mobile Dental Clinic Outreach',
    location: 'ahmedabad',
    raised: 11000,
    goal: 15000,
    beneficiaries: '600 students',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&q=80',
  },
  {
    id: 21,
    category: 'Water & Sanitation',
    title: 'Solar Water Wells Project',
    location: 'mumbai',
    raised: 22000,
    goal: 35000,
    beneficiaries: '1,800 residents',
    image: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=600&q=80',
  },
  {
    id: 22,
    category: 'Orphan Care',
    title: 'Medical Sponsorship for Orphans',
    location: 'delhi',
    raised: 16500,
    goal: 25000,
    beneficiaries: '200 children',
    image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&q=80',
  },
  {
    id: 23,
    category: 'Emergency Relief',
    title: 'Earthquake Recovery Assistance',
    location: 'kolkata',
    raised: 45000,
    goal: 50000,
    beneficiaries: '500 families',
    image: 'https://images.unsplash.com/photo-1594897030264-ab7d87efc473?w=600&q=80',
  },
  {
    id: 24,
    category: 'Orphan Care',
    title: 'School Supplies and Uniforms',
    location: 'chennai',
    raised: 8500,
    goal: 12000,
    beneficiaries: '400 orphans',
    image: 'https://images.unsplash.com/photo-1495556650867-99590cea3657?w=600&q=80',
  },
]

const getBadgeStyles = (category: string) => {
  switch (category) {
    case 'Education':
      return 'bg-blue-50 text-blue-700 border-blue-100'
    case 'Healthcare':
      return 'bg-rose-50 text-rose-700 border-rose-100'
    case 'Water & Sanitation':
      return 'bg-cyan-50 text-cyan-700 border-cyan-100'
    case 'Orphan Care':
      return 'bg-purple-50 text-purple-700 border-purple-100'
    case 'Emergency Relief':
      return 'bg-amber-50 text-amber-700 border-amber-100'
    default:
      return 'bg-gray-50 text-gray-700 border-gray-100'
  }
}

export default function ProjectsPageClient() {
  const [activeCategory, setActiveCategory] = useState('All Projects')
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid')

  const filtered = projectsData.filter((p) => {
    if (activeCategory === 'All Projects') return true
    return p.category === activeCategory
  })

  return (
    <>
      {/* Hero Section */}
      <section
        className="section-bg-soft pt-36 pb-16 md:pt-44 md:pb-24 border-b border-brand-sand/30 relative"
        aria-labelledby="projects-hero-heading"
      >
        <div className="container-wide px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-cream/80 border border-brand-sand/60 text-xs font-bold tracking-widest text-brand-blue-light uppercase mb-6 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-amber animate-pulse-dot" />
              Our Initiatives
            </span>
            <h1
              id="projects-hero-heading"
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-blue leading-[1.15] mb-6"
            >
              Our Active <span className="italic font-normal text-brand-amber-dark">Projects</span>
            </h1>
            <p className="font-body text-brand-grey text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
              Empowering communities through sustainable development
            </p>
          </div>
        </div>
      </section>

      {/* Filter Navigation */}
      <section
        className="section-bg-soft border-b border-brand-sand/40 py-4"
        aria-label="Category filter"
      >
        <div className="container-wide px-4 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1.5 sm:pb-0 scrollbar-none w-full md:w-auto justify-start">
            {categories.map((cat) => {
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 px-5 py-2.5 rounded-full text-xs font-semibold font-body transition-all duration-300 cursor-pointer border relative group
                    ${isActive
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

          {/* Grid / Map Segmented Control */}
          <div className="flex items-center bg-brand-sand/30 p-1 rounded-full border border-brand-sand/50 flex-shrink-0 self-center md:self-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold font-body transition-all duration-300 cursor-pointer
                ${viewMode === 'grid'
                  ? 'bg-brand-blue text-white shadow-sm'
                  : 'text-brand-grey hover:text-brand-blue'
                }`}
              aria-pressed={viewMode === 'grid'}
              aria-label="Grid View"
            >
              <LayoutGrid size={14} />
              <span>Grid View</span>
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold font-body transition-all duration-300 cursor-pointer
                ${viewMode === 'map'
                  ? 'bg-brand-blue text-white shadow-sm'
                  : 'text-brand-grey hover:text-brand-blue'
                }`}
              aria-pressed={viewMode === 'map'}
              aria-label="Map View"
            >
              <Map size={14} />
              <span>Map View</span>
            </button>
          </div>
        </div>
      </section>

      {/* Projects Listing */}
      <section className="py-16 md:py-24 section-bg-soft" aria-label="Projects list">
        <div className="container-wide px-4 lg:px-8">
          <div className="max-w-[1100px] mx-auto">
            {/* Show Count */}
            <div className="flex items-center justify-between mb-8">
              <p className="font-body text-sm text-brand-grey">
                Showing{' '}
                <span className="font-semibold text-brand-blue">{filtered.length}</span>{' '}
                of{' '}
                <span className="font-semibold text-brand-blue">
                  {projectsData.length}
                </span>{' '}
                projects
              </p>
            </div>

            {/* Dynamic View Modes with smooth wait transition */}
            <AnimatePresence mode="wait">
              {viewMode === 'grid' ? (
                <motion.div
                  key="grid-view"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  <ScrollRevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
                    <AnimatePresence mode="popLayout">
                      {filtered.map((project) => {
                        const percent = Math.min(
                          Math.round((project.raised / project.goal) * 100),
                          100
                        )
                        const badgeStyles = getBadgeStyles(project.category)
                        return (
                          <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.35, ease: 'easeInOut' }}
                          >
                            <ScrollRevealStaggerItem>
                              <PremiumCard
                                variant="blue"
                                className="overflow-hidden flex flex-col group border-brand-sand/30 bg-white"
                              >
                                {/* Image with gradient overlay */}
                                <div className="relative h-52 w-full overflow-hidden bg-brand-cream border-b border-brand-sand/20">
                                  <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                                  {/* Category Badge */}
                                  <span
                                    className={`absolute top-4 right-4 z-20 border text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-sm ${badgeStyles}`}
                                  >
                                    {project.category}
                                  </span>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-grow">
                                  {/* Location */}
                                  <span className="flex items-center gap-1.5 text-xs text-brand-grey font-body mb-3">
                                    <MapPin size={14} className="text-brand-blue-light" />
                                    {INDIA_IMPACT_COORDINATES[project.location]?.label || project.location}
                                  </span>

                                  {/* Title */}
                                  <h3 className="font-heading font-bold text-brand-charcoal text-lg mb-4 leading-snug group-hover:text-brand-blue transition-colors duration-200 min-h-[56px] flex items-start">
                                    {project.title}
                                  </h3>

                                  {/* Stats */}
                                  <div className="mt-auto space-y-4">
                                    {/* Animated Progress Bar */}
                                    <div>
                                      <div className="flex justify-between text-xs font-body font-semibold text-brand-charcoal mb-1.5">
                                        <span>{percent}% Funded</span>
                                      </div>
                                      <div className="w-full bg-brand-sand/40 h-2 rounded-full overflow-hidden">
                                        <motion.div
                                          initial={{ width: 0 }}
                                          whileInView={{ width: `${percent}%` }}
                                          viewport={{ once: true }}
                                          transition={{ duration: 1, ease: 'easeOut' }}
                                          className="bg-brand-blue h-full rounded-full"
                                        />
                                      </div>
                                    </div>

                                    {/* Raised & Goal */}
                                    <div className="flex items-center justify-between text-xs font-body text-brand-grey border-t border-brand-sand/20 pt-3">
                                      <div>
                                        <p className="text-[10px] uppercase font-bold tracking-wider text-brand-grey/50">
                                          Raised
                                        </p>
                                        <p className="font-semibold text-brand-blue">
                                          ${project.raised.toLocaleString()}
                                        </p>
                                      </div>
                                      <div className="text-right">
                                        <p className="text-[10px] uppercase font-bold tracking-wider text-brand-grey/50">
                                          Goal
                                        </p>
                                        <p className="font-semibold text-brand-charcoal">
                                          ${project.goal.toLocaleString()}
                                        </p>
                                      </div>
                                    </div>

                                    {/* Quick stats: Beneficiaries */}
                                    <div className="text-xs font-body text-brand-grey bg-brand-cream/40 p-2 rounded-lg border border-brand-sand/10 italic flex items-center justify-between">
                                      <span>Beneficiaries:</span>
                                      <span className="font-semibold text-brand-charcoal not-italic">
                                        {project.beneficiaries}
                                      </span>
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
                                        id={`donate-project-${project.id}`}
                                      >
                                        {project.id === 1 ? 'Donate to This Project' : 'Donate'}
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </PremiumCard>
                            </ScrollRevealStaggerItem>
                          </motion.div>
                        )
                      })}
                    </AnimatePresence>
                  </ScrollRevealStagger>
                </motion.div>
              ) : (
                <motion.div
                  key="map-view"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  <IndiaImpactMap projects={filtered} />
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </section>
    </>
  )
}
