import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, MapPin, ExternalLink } from 'lucide-react'
import { communityMembers } from '@/data/communityMembers'
import { cn } from '@/lib/utils'

export async function generateStaticParams() {
  return communityMembers.map((m) => ({ slug: m.slug }))
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const member = communityMembers.find((m) => m.slug === slug)
  if (!member) {
    return {
      title: 'Member Not Found | Dua Charitable Trust',
    }
  }
  return {
    title: `${member.name} — Community Member | Dua Charitable Trust`,
    description: member.contributionSummary,
  }
}

export default async function CommunityMemberProfilePage({ params }: PageProps) {
  const { slug } = await params
  const member = communityMembers.find((m) => m.slug === slug)

  if (!member) {
    notFound()
  }

  const displayRole = member.role.charAt(0).toUpperCase() + member.role.slice(1).toLowerCase()

  return (
    <main className="bg-[#FBF7F0] min-h-screen pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-24 animate-[fadeIn_0.5s_ease-out]">
      <div className="max-w-5xl mx-auto px-4 lg:px-8 space-y-10">
        
        {/* Back Link */}
        <div className="flex items-center">
          <Link 
            href="/community" 
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-grey hover:text-brand-blue transition-colors duration-200"
          >
            <ArrowLeft size={14} /> Back to Community
          </Link>
        </div>

        {/* Hero Card */}
        <section 
          className="relative bg-white/90 backdrop-blur-md rounded-[32px] border border-brand-sand/30 shadow-card overflow-hidden"
          aria-label={`${member.name} profile card`}
        >
          {/* Top wide hero image / banner placeholder */}
          <div className="relative h-44 sm:h-56 md:h-72 w-full bg-brand-sand/20">
            {member.heroImageSrc ? (
              <Image 
                src={member.heroImageSrc} 
                alt="" 
                fill 
                className="object-cover" 
                priority 
                sizes="1024px" 
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/25 via-brand-amber/10 to-brand-blue/10" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent opacity-60" />
          </div>

          {/* Overlapping Avatar and Info Grid */}
          <div className="relative z-10 px-6 pb-8 md:px-10 md:pb-10 -mt-16 sm:-mt-20 md:-mt-24">
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8 text-center md:text-left">
              {/* Profile Avatar */}
              <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 min-w-28 min-h-28 sm:min-w-32 sm:min-h-32 md:min-w-36 md:min-h-36 rounded-full bg-gradient-to-tr from-brand-blue to-brand-amber p-[3px] flex-shrink-0 shadow-lg ring-8 ring-white relative mx-auto md:mx-0">
                <div className="w-full h-full rounded-full overflow-hidden bg-brand-cream relative">
                  <Image 
                    src={member.avatarSrc} 
                    alt={member.name} 
                    fill 
                    className="object-cover" 
                    priority 
                    sizes="(max-width: 768px) 112px, 144px" 
                  />
                </div>
              </div>

              {/* Main Info */}
              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <span className={cn(
                    'text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border shadow-sm', 
                    member.role === 'DONOR' 
                      ? 'bg-brand-amber/10 text-brand-amber-dark border-brand-amber/25' 
                      : 'bg-brand-blue/10 text-brand-blue border-brand-blue/25'
                  )}>
                    {displayRole}
                  </span>
                  {member.focusTags.map((tag) => (
                    <span 
                      key={tag} 
                      className="bg-brand-sand/40 text-brand-charcoal/70 text-[10px] font-semibold px-3 py-1 rounded-full border border-brand-sand/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="font-heading font-bold text-brand-charcoal text-3xl sm:text-4xl md:text-5xl leading-tight">
                  {member.name}
                </h1>
                <p className="text-sm md:text-base font-body font-bold text-brand-blue">
                  {member.contributionTitle}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Details Grid */}
        <div className="grid gap-8 md:grid-cols-[2fr,1.3fr]">
          
          {/* Left Column: About & Story */}
          <section className="space-y-6" aria-label="About and Bio">
            <div className="bg-white rounded-[32px] p-6 sm:p-8 md:p-10 border border-brand-sand/30 shadow-card space-y-6">
              <h2 className="font-heading font-bold text-brand-charcoal text-2xl md:text-3xl">
                About {member.name}
              </h2>
              <div className="prose prose-lg max-w-none font-body text-brand-grey leading-relaxed space-y-5">
                {member.longBio.trim().split('\n\n').map((para, i) => (
                  <p key={i} className="text-sm sm:text-base">{para.trim()}</p>
                ))}
              </div>
              
              <div className="pt-6 border-t border-brand-sand/30 flex flex-wrap gap-4 text-xs font-body text-brand-grey/80">
                <span className="flex items-center gap-1.5 bg-[#FBF7F0] px-3.5 py-2 rounded-full border border-brand-sand/40">
                  <Calendar size={14} className="text-brand-blue" />
                  Joined {member.joinedYear}
                </span>
                <span className="flex items-center gap-1.5 bg-[#FBF7F0] px-3.5 py-2 rounded-full border border-brand-sand/40">
                  <MapPin size={14} className="text-brand-amber-dark" />
                  {member.location || 'Location not specified'}
                </span>
              </div>
            </div>
          </section>

          {/* Right Column: Impact & Highlights */}
          <section className="space-y-6" aria-label="Highlights and Stats">
            {/* Card 1: Key Contribution */}
            <div className="bg-white rounded-[32px] p-6 border border-brand-sand/30 shadow-card space-y-4">
              <h3 className="font-heading font-bold text-brand-charcoal text-base">Key Contribution</h3>
              <div className="bg-[#FBF7F0]/60 rounded-2xl p-4 border border-brand-sand/20 space-y-1">
                <p className="text-[10px] font-body font-bold text-brand-grey uppercase tracking-wider">Contribution</p>
                <p className="text-xs sm:text-sm font-body font-bold text-brand-blue">{member.contributionTitle}</p>
              </div>
              <p className="text-xs font-body text-brand-grey/90 leading-relaxed">
                {member.contributionSummary}
              </p>
            </div>

            {/* Card 2: Impact Snapshot */}
            {member.impactStats && member.impactStats.length > 0 && (
              <div className="bg-white rounded-[32px] p-6 border border-brand-sand/30 shadow-card space-y-4">
                <h3 className="font-heading font-bold text-brand-charcoal text-base">Impact Snapshot</h3>
                <div className="grid gap-3">
                  {member.impactStats.map((stat, idx) => (
                    <div 
                      key={idx} 
                      className="bg-[#FBF7F0]/40 rounded-xl p-4 border border-brand-sand/20 flex flex-col justify-center gap-1 hover:border-brand-amber/30 transition-all duration-300"
                    >
                      <p className="font-heading font-bold text-brand-blue text-lg leading-none">{stat.value}</p>
                      <p className="font-body text-[9px] uppercase tracking-wider font-bold text-brand-grey/70">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Card 3: Connect CTA */}
            <div className="bg-gradient-to-br from-[#1A3A5C] via-[#11243B] to-[#1C1C1E] border border-white/10 rounded-[32px] p-6 text-white shadow-card-hover relative overflow-hidden group">
              {/* Ambient Glow */}
              <div className="absolute -top-20 -right-20 w-32 h-32 bg-brand-amber/15 rounded-full blur-2xl pointer-events-none group-hover:scale-110 transition-transform duration-500" />
              
              <div className="relative z-10 space-y-4">
                <h3 className="font-heading font-bold text-base text-white">Connect</h3>
                <p className="font-body text-white/80 text-xs leading-relaxed">
                  Interested in collaborating with {member.name} or supporting their initiatives? Reach out via Dua Charitable Trust.
                </p>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-amber hover:text-white transition-colors duration-200"
                >
                  Contact Us <ExternalLink size={12} />
                </Link>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  )
}
