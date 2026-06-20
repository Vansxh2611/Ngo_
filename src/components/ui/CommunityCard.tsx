import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface CommunityCardProps {
  id: string
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
  id,
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
  const category = focusTags[0] || 'Community'

  return (
    <div
      className={cn(
        "group relative overflow-hidden cursor-pointer rounded-[20px] p-5 border border-[#E8A53D]/15 transition-all duration-[450ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-2 hover:scale-[1.01] hover:border-[#E8A53D]/35 hover:shadow-[0_24px_48px_rgba(10,26,58,0.12),0_8px_20px_rgba(10,26,58,0.08),0_0_0_1px_rgba(232,165,61,0.2)] flex flex-col justify-between h-full",
        className
      )}
      style={{
        background: 'radial-gradient(ellipse at center, rgba(232,165,61,0.05), transparent 70%), linear-gradient(160deg, #FFFFFF 0%, #FDFAF4 50%, #FAF6ED 100%)',
        boxShadow: '0 1px 2px rgba(10,26,58,0.04), 0 4px 16px rgba(10,26,58,0.06), 0 12px 32px rgba(10,26,58,0.05)'
      }}
    >
      {/* ── SHIMMER TOP LINE ── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1.5px] pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(232,165,61,0.7), transparent)'
        }}
      />

      {/* ── HOVER ANIMATED GOLD LINE BOTTOM ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E8A53D] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] pointer-events-none"
      />

      {/* ── THIN ARC LINE DECORATION TOP LEFT ── */}
      <svg
        className="absolute top-0 left-0 w-16 h-16 pointer-events-none"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M 0 60 A 60 60 0 0 0 60 0"
          stroke="rgba(232, 165, 61, 0.12)"
          strokeWidth="1"
          fill="none"
        />
      </svg>

      {/* ── SMALL BLOB TOP RIGHT ── */}
      <div
        className="absolute -top-5 -right-5 w-28 h-28 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(232,165,61,0.05) 0%, transparent 70%)'
        }}
      />

      {/* ── TINY DOT GRID BOTTOM LEFT ── */}
      <div className="absolute bottom-4 left-4 grid grid-cols-3 gap-1 pointer-events-none opacity-30">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="w-0.5 h-0.5 rounded-full"
            style={{ background: 'rgba(232,165,61,0.5)' }}
          />
        ))}
      </div>

      <div>
        {/* ════════ PROFILE HEADER ════════ */}
        <div className="relative flex items-center gap-3 mb-4">
          {/* AVATAR */}
          <div className="relative flex-shrink-0">
            <div
              className="w-[50px] h-[50px] rounded-full p-[2px] group-hover:scale-105 transition-transform duration-300"
              style={{
                background: 'linear-gradient(135deg, #E8A53D, #F4C06A, #E8A53D)',
              }}
            >
              <div className="w-full h-full rounded-full p-[1.5px] bg-white relative overflow-hidden">
                <Image
                  src={avatarSrc}
                  alt={name}
                  fill
                  className="rounded-full object-cover"
                  sizes="50px"
                />
              </div>
            </div>

            {/* ROLE DOT */}
            <div
              className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ring-2 ring-white ${
                role === 'DONOR'
                  ? 'bg-gradient-to-br from-[#E8A53D] to-[#F4C06A]'
                  : 'bg-gradient-to-br from-[#0A1A3A] to-[#1E3A6E]'
              }`}
            />
          </div>

          {/* NAME + BADGES */}
          <div className="flex-1 min-w-0 font-body">
            {/* NAME */}
            <h3
              className="text-[#0A1A3A] font-bold leading-tight mb-1.5 truncate tracking-[-0.3px] group-hover:text-brand-blue transition-colors duration-300"
              style={{ fontSize: '15px' }}
            >
              {name}
            </h3>

            {/* BADGES */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {role === 'DONOR' && (
                <span
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-[1.2px] text-white"
                  style={{
                    background: 'linear-gradient(135deg, #C8860D, #E8A53D, #F4C06A)',
                    boxShadow: '0 2px 8px rgba(232,165,61,0.40)'
                  }}
                >
                  ♦ Donor
                </span>
              )}

              {role === 'VOLUNTEER' && (
                <span
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-[1.2px] text-white"
                  style={{
                    background: 'linear-gradient(135deg, #060F22, #0A1A3A, #1E3A6E)',
                    boxShadow: '0 2px 8px rgba(10,26,58,0.35)'
                  }}
                >
                  ✦ Volunteer
                </span>
              )}

              {category && (
                <span
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border"
                  style={{
                    color: 'rgba(10,26,58,0.60)',
                    borderColor: 'rgba(10,26,58,0.12)',
                    background: 'rgba(10,26,58,0.03)'
                  }}
                >
                  {category}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ── DIAMOND DIVIDER ── */}
        <div className="relative mb-3">
          <div
            className="h-px w-full"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(232,165,61,0.3), transparent)'
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rotate-45"
            style={{ background: 'rgba(232,165,61,0.5)' }}
          />
        </div>

        {/* ════════ CONTRIBUTION BLOCK ════════ */}
        <div
          className="relative rounded-xl p-3 mb-3 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #FFFDF7 0%, #FDF6E8 100%)',
            border: '1px solid rgba(232,165,61,0.15)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)'
          }}
        >
          {/* LEFT ACCENT */}
          <div
            className="absolute left-0 top-2.5 bottom-2.5 w-[2.5px] rounded-full"
            style={{
              background: 'linear-gradient(180deg, #F4C06A, #E8A53D, #C8860D)'
            }}
          />

          <p
            className="flex items-center gap-1 pl-3 mb-1"
            style={{
              fontSize: '8px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              fontWeight: '700',
              color: '#E8A53D'
            }}
          >
            <span>✦</span> Contribution
          </p>

          <h4
            className="text-[#0A1A3A] font-bold leading-snug pl-3 font-heading"
            style={{ fontSize: '13px', letterSpacing: '-0.1px' }}
          >
            {contributionTitle}
          </h4>
        </div>

        {/* ════════ DESCRIPTION ════════ */}
        <p
          className="leading-relaxed mb-4 line-clamp-3 font-body"
          style={{
            fontSize: '12.5px',
            color: 'rgba(10,26,58,0.60)',
            lineHeight: '1.6'
          }}
        >
          {contributionSummary}
        </p>
      </div>

      <div>
        {/* ── BOTTOM DIVIDER ── */}
        <div
          className="h-px mb-3"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(232,165,61,0.25), transparent)'
          }}
        />

        {/* ════════ FOOTER ════════ */}
        <div className="flex items-center justify-between font-body">
          {/* JOINED */}
          <div className="flex items-center gap-1.5">
            <div
              className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(232,165,61,0.10)' }}
            >
              <svg
                className="w-2 h-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#E8A53D"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <span
              style={{
                fontSize: '11px',
                color: 'rgba(10,26,58,0.40)',
                fontWeight: '500'
              }}
            >
              Since {joinedYear}
            </span>
          </div>

          {/* VIEW PROFILE */}
          <Link
            href={`/community/${slug}`}
            className="group/btn flex items-center gap-1.5 font-semibold rounded-full px-3 py-1.5 hover:gap-2 transition-all duration-250 cursor-pointer text-center"
            style={{
              fontSize: '11.5px',
              color: '#E8A53D',
              background: 'rgba(232,165,61,0.08)',
              border: '1px solid rgba(232,165,61,0.20)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(232,165,61,0.14)'
              e.currentTarget.style.borderColor = 'rgba(232,165,61,0.35)'
              e.currentTarget.style.boxShadow = '0 3px 12px rgba(232,165,61,0.18)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(232,165,61,0.08)'
              e.currentTarget.style.borderColor = 'rgba(232,165,61,0.20)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            View Profile
            <svg
              className="w-2.5 h-2.5 group-hover/btn:translate-x-0.5 transition-transform duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
