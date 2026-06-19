import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface CommunityCardProps {
  name: string
  avatarSrc: string
  role: 'DONOR' | 'VOLUNTEER' | 'STAFF' | 'PARTNER'
  focusTags: string[]
  joinedYear: string
  contributionTitle: string
  contributionSummary: string
  slug: string
  className?: string
}

export default function CommunityCard({
  name,
  avatarSrc,
  role,
  focusTags,
  joinedYear,
  contributionTitle,
  contributionSummary,
  slug,
  className,
}: CommunityCardProps) {
  const displayRole = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()
  const primaryDomain = focusTags[0] || 'Community'

  return (
    <div className={cn('bg-white rounded-[32px] p-6 flex flex-col gap-5 border border-brand-sand/30 hover:border-brand-amber/30 hover:-translate-y-1.5 hover:shadow-card-hover transition-all duration-300 group relative overflow-hidden', className)}>
      
      {/* Soft Hover Ambient Glow Inside Card */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-brand-amber/5 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="flex items-center gap-4 relative z-10">
        {/* Profile Avatar with Dual-Gradient Ring and Micro-Zoom */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-brand-blue to-brand-amber p-[2px] flex-shrink-0 shadow-md ring-4 ring-brand-blue/5 group-hover:scale-105 transition-transform duration-300">
          <div className="w-full h-full rounded-full overflow-hidden bg-brand-cream relative">
            <Image 
              src={avatarSrc} 
              alt={name} 
              fill 
              className="object-cover transition-transform duration-500 group-hover:scale-105" 
              sizes="64px" 
            />
          </div>
        </div>
        
        {/* Name and Tags */}
        <div className="space-y-1.5 flex-1 min-w-0">
          <h3 className="font-heading font-bold text-brand-charcoal text-base truncate leading-snug group-hover:text-brand-blue transition-colors duration-300">
            {name}
          </h3>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={cn(
              'text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border shadow-sm', 
              role === 'DONOR' 
                ? 'bg-brand-amber/10 text-brand-amber-dark border-brand-amber/25' 
                : 'bg-brand-blue/10 text-brand-blue border-brand-blue/25'
            )}>
              {displayRole}
            </span>
            <span className="bg-brand-sand/40 text-brand-charcoal/70 text-[10px] font-semibold px-2.5 py-1 rounded-full border border-brand-sand/60">
              {primaryDomain}
            </span>
          </div>
        </div>
      </div>

      {/* Contribution Details */}
      <div className="bg-[#FBF7F0]/40 rounded-2xl p-4 border border-brand-sand/20 space-y-1 relative z-10">
        <p className="text-[10px] font-body font-bold text-brand-grey uppercase tracking-wider">Contribution</p>
        <p className="text-xs sm:text-sm font-body font-bold text-brand-blue line-clamp-1">{contributionTitle}</p>
      </div>

      {/* Story Text */}
      <p className="text-xs font-body text-brand-grey/90 leading-relaxed line-clamp-3 flex-1 relative z-10">
        {contributionSummary}
      </p>

      {/* Footer Details */}
      <div className="flex items-center justify-between pt-4 border-t border-brand-sand/30 relative z-10 mt-auto">
        <span className="text-[11px] text-brand-grey/70 font-body">Joined {joinedYear}</span>
        <Link 
          href={`/community/${slug}`}
          className="text-xs font-semibold text-brand-blue hover:text-brand-amber inline-flex items-center gap-1 transition-colors duration-200 cursor-pointer"
        >
          View Profile <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </div>
  )
}

