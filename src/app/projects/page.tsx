import type { Metadata } from 'next'
import ProjectsPageClient from './ProjectsPageClient'

export const metadata: Metadata = {
  title: 'Our Projects — Seeds of Change in Action',
  description:
    'Explore the social impact programs, educational workshops, and healthcare initiatives run by Dua Charitable Trust.',
}

export default function ProjectsPage() {
  return <ProjectsPageClient />
}
