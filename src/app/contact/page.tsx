import type { Metadata } from 'next'
import ContactPageClient from './ContactPageClient'

export const metadata: Metadata = {
  title: 'Contact Us — Get In Touch',
  description:
    'Contact Dua Charitable Trust to donate, volunteer, partner, or ask questions. We\'re here to help.',
}

export default function ContactPage() {
  return <ContactPageClient />
}
