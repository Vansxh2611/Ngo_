import type { Metadata } from 'next'
import BlogPageClient from './BlogPageClient'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Blog — Stories of Impact & Community',
  description:
    'Read the latest stories, news, and updates from Dua Charitable Trust — covering education, healthcare, community welfare, and more.',
}

export default function BlogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FBF7F0] pt-36 text-center text-brand-grey font-body text-sm">Loading stories...</div>}>
      <BlogPageClient />
    </Suspense>
  )
}

