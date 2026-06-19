import type { Metadata } from 'next'
import CommunityPageClient from './CommunityPageClient'

export const metadata: Metadata = {
  title: 'Community — Meet Our Donors & Volunteers',
  description:
    'Meet the extraordinary changemakers — donors and volunteers — who power the Dua Charitable Trust mission.',
}

export default function CommunityPage() {
  return <CommunityPageClient />
}
