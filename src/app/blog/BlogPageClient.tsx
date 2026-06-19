'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Search } from 'lucide-react'
import BlogCard from '@/components/ui/BlogCard'
import { ScrollRevealTypewriter, ScrollRevealWords, ScrollRevealCard } from '@/components/ui/ScrollAnimations'

const categories = ['All', 'Education', 'Healthcare', 'Projects', 'Events', 'Community', 'Environment']

const allPosts = [
  {
    slug: 'empowering-future-generations',
    title: 'Empowering Future Generations Through Education',
    excerpt: 'Our new scholarship program has reached over 1,200 students in rural areas, providing access to quality education and life-changing opportunities for underserved youth.',
    coverImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80',
    author: 'Fatima Ahmed',
    publishDate: '2026-06-10',
    category: 'Education',
    featured: true,
  },
  {
    slug: 'maternal-health-initiative',
    title: 'Maternal Health Initiative Reaches 500 Villages',
    excerpt: 'Our mobile healthcare units have provided prenatal care to thousands of mothers across remote villages, reducing maternal mortality by 30%.',
    coverImage: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&q=80',
    author: 'Dr. Raza Khan',
    publishDate: '2026-05-28',
    category: 'Healthcare',
  },
  {
    slug: 'community-food-program',
    title: 'Community Food Program Celebrates 3rd Year',
    excerpt: 'What started as a small initiative now feeds over 10,000 families monthly through our growing network of community kitchens.',
    coverImage: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80',
    author: 'Ahmed Siddiqui',
    publishDate: '2026-05-15',
    category: 'Community',
  },
  {
    slug: 'women-empowerment-skills',
    title: 'Skills Training Program Transforms 800 Women',
    excerpt: 'Our vocational training initiative has equipped 800 women with marketable skills, enabling financial independence and entrepreneurship.',
    coverImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80',
    author: 'Zara Hussain',
    publishDate: '2026-04-20',
    category: 'Projects',
  },
  {
    slug: 'annual-medical-camp',
    title: 'Annual Medical Camp: 3,000 Patients Treated',
    excerpt: 'Our largest free medical camp to date brought together 80+ doctors and specialists to provide healthcare to underserved communities.',
    coverImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80',
    author: 'Dr. Nadia Rehman',
    publishDate: '2026-04-05',
    category: 'Events',
  },
  {
    slug: 'tree-plantation-drive',
    title: '10,000 Trees Planted in Environmental Drive',
    excerpt: 'Community volunteers joined forces to plant 10,000 saplings across deforested areas, contributing to regional climate resilience.',
    coverImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80',
    author: 'Omar Khan',
    publishDate: '2026-03-21',
    category: 'Environment',
  },
]

export default function BlogPageClient() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const featured = allPosts[0]

  // Filter posts
  const filtered = allPosts.filter((p) => {
    // If not searching and category is 'All', exclude the featured post from the grid
    if (!searchQuery && activeCategory === 'All' && p.slug === featured.slug) {
      return false
    }

    const matchCat = activeCategory === 'All' || p.category === activeCategory
    const matchSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchCat && matchSearch
  })

  const showFeaturedSection = !searchQuery && activeCategory === 'All'

  return (
    <>
      {/* ════════ HERO & SEARCH ════════ */}
      <section className="relative bg-[#0F233B] pt-36 pb-20 overflow-hidden" aria-label="Blog Hero">
        {/* Editorial ambient blurs */}
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-brand-amber/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-30%] left-[-10%] w-[500px] h-[500px] bg-brand-blue-light/10 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Thin mesh grid lines for structural design */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" aria-hidden="true">
          <div className="w-full h-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        <div className="relative container-wide z-10 text-center px-4">
          <span className="badge bg-brand-amber/20 text-brand-amber border border-brand-amber/10 text-xs font-semibold tracking-widest uppercase mb-4 inline-block shadow-sm">
            Our Publications
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl !text-white font-bold leading-tight mb-6">
            <ScrollRevealTypewriter text="Stories That " />
            <span className="text-brand-amber italic font-normal">
              <ScrollRevealTypewriter text="Inspire" delay={0.4} />
            </span>
            <ScrollRevealTypewriter text=" Change" delay={0.7} />
          </h1>

          {/* Search box */}
          <div className="w-full max-w-[580px] mx-auto relative shadow-lg rounded-full overflow-hidden">
            <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/50" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search stories, campaigns, projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white placeholder:text-white/40
                         focus:outline-none focus:border-brand-amber focus:ring-4 focus:ring-brand-amber/10 text-sm sm:text-base transition-all rounded-full"
              aria-label="Search articles"
              id="blog-search"
            />
          </div>
        </div>
      </section>

      {/* ════════ CATEGORY TABS ════════ */}
      <section
        className="bg-[#FBF7F0] sticky top-[56px] lg:top-[68px] z-30 border-b border-brand-sand/40 py-4 shadow-sm"
        aria-label="Category filter"
      >
        <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-4 px-4">
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1.5 sm:pb-0 scrollbar-none w-full md:w-auto">
            {categories.map((cat) => {
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 px-5 py-2.5 rounded-full text-xs font-semibold font-body transition-all duration-300 cursor-pointer border
                    ${isActive
                      ? 'bg-brand-blue border-brand-blue text-white shadow-sm'
                      : 'bg-white border-brand-sand/60 text-brand-grey hover:text-brand-blue hover:border-brand-blue/30'
                    }`}
                  aria-pressed={isActive}
                  id={`filter-${cat.toLowerCase()}`}
                >
                  {cat}
                </button>
              )
            })}
          </div>
          
          <Link 
            href="/archive" 
            className="text-xs font-body font-bold text-brand-blue hover:text-brand-amber transition-colors flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
            id="blog-archive-discover-btn"
          >
            Archive Library
            <ArrowRight size={12} />
          </Link>
        </div>
      </section>

      {/* ════════ FEATURED POST ════════ */}
      {showFeaturedSection && (
        <section className="pt-16 pb-8 bg-[#FBF7F0]" aria-label="Featured Story">
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
                  {/* Premium tag placed in top right */}
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
                    <span className="font-body text-xs text-brand-grey/70">Published {featured.publishDate}</span>
                    <Link href={`/blog/${featured.slug}`} className="btn-amber text-xs font-semibold px-6 py-3 rounded-full hover:scale-102 transition-transform cursor-pointer" id="featured-read-btn">
                      Read Story
                    </Link>
                  </div>
                </div>

              </div>
            </ScrollRevealCard>
          </div>
        </section>
      )}

      {/* ════════ POSTS GRID ════════ */}
      <section className="py-16 bg-[#FBF7F0]" aria-label="Blog posts">
        <div className="container-wide px-4">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((post, idx) => (
                <ScrollRevealCard key={post.slug} delay={idx % 3 * 0.08}>
                  <BlogCard {...post} />
                </ScrollRevealCard>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-[32px] shadow-sm border border-brand-sand/30">
              <p className="font-heading text-2xl text-brand-charcoal mb-2">No posts found</p>
              <p className="font-body text-brand-grey text-sm">Try a different category or search query.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

