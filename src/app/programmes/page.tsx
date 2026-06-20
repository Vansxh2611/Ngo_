import type { Metadata } from 'next'
import { Suspense } from 'react'
import ProgrammesPageClient from './ProgrammesPageClient'

export const metadata: Metadata = {
  title: 'Our Development Programmes — Dua Charitable Trust',
  description:
    'Discover our sustainable development programmes in education, healthcare, women empowerment, environmental conservation, emergency relief, and community welfare.',
}

export default function ProgrammesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-brand-cream pt-36 text-center text-brand-grey font-body">
          Loading programmes...
        </div>
      }
    >
      <ProgrammesPageClient />
    </Suspense>
  )
}
