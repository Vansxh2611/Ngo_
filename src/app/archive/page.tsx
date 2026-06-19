import type { Metadata } from 'next'
import ArchivePageClient from './ArchivePageClient'

export const metadata: Metadata = {
  title: 'Archive — Browse All Content by Year & Month',
  description:
    'Browse our complete collection of blogs and achievements filtered by year, month, and content type.',
}

export default function ArchivePage() {
  return <ArchivePageClient />
}
