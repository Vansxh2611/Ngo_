import type { Metadata } from 'next'
import BlogPageClient from './BlogPageClient'

export const metadata: Metadata = {
  title: 'Blog — Stories of Impact & Community',
  description:
    'Read the latest stories, news, and updates from Dua Charitable Trust — covering education, healthcare, community welfare, and more.',
}

export default function BlogPage() {
  return <BlogPageClient />
}
