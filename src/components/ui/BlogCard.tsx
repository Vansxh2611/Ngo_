import Link from 'next/link'
import Image from 'next/image'
import { Calendar, User, ArrowRight, Tag } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { PremiumCard } from '@/components/ui/PremiumCard'

export interface BlogCardProps {
  slug: string
  title: string
  excerpt: string
  coverImage: string
  author?: string
  publishDate: string
  category: string
  featured?: boolean
}

export default function BlogCard({
  slug,
  title,
  excerpt,
  coverImage,
  author,
  publishDate,
  category,
  featured = false,
}: BlogCardProps) {
  return (
    <PremiumCard
      variant="blue"
      className={`overflow-hidden flex flex-col group ${featured ? 'md:flex-row' : ''}`}
      aria-label={`Blog post: ${title}`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden flex-shrink-0 ${featured ? 'md:w-2/5' : ''}`}>
        <div className={`relative ${featured ? 'h-56 md:h-full' : 'h-48'}`}>
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes={featured ? '(max-width:768px) 100vw, 40vw' : '(max-width:768px) 100vw, 33vw'}
          />
        </div>
        {/* Category badge over image - premium top-right position */}
        <span className="absolute top-4 right-4 z-20 bg-gradient-to-r from-brand-amber to-amber-300 text-brand-charcoal text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full shadow-lg border border-brand-amber/20 transition-transform group-hover:scale-105 duration-300">
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Meta */}
        <div className="flex items-center gap-3 mb-3">
          <span className="flex items-center gap-1 text-xs text-brand-grey font-body">
            <Calendar size={12} />
            {formatDate(publishDate)}
          </span>
          {author && (
            <span className="flex items-center gap-1 text-xs text-brand-grey font-body">
              <User size={12} />
              {author}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className={`font-heading font-semibold text-brand-charcoal mb-2 leading-snug
                        group-hover:text-brand-blue transition-colors duration-200
                        ${featured ? 'text-xl sm:text-2xl' : 'text-lg'}`}>
          {title}
        </h3>

        {/* Excerpt */}
        <p className="font-body text-sm text-brand-grey leading-relaxed line-clamp-3 flex-1 mb-4">
          {excerpt}
        </p>

        {/* Read More */}
        <Link
          href={`/blog/${slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium font-body text-brand-blue
                     hover:text-brand-amber-dark hover:gap-2.5
                     transition-all duration-200 mt-auto"
          aria-label={`Read more about ${title}`}
        >
          Read More
          <ArrowRight size={14} />
        </Link>
      </div>
    </PremiumCard>
  )
}
