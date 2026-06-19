import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppFAB from '@/components/layout/WhatsAppFAB'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://duacharitabletrust.org'),
  title: {
    template: '%s | Dua Charitable Trust',
    default: 'Dua Charitable Trust — Building Communities Together',
  },
  description:
    'Dua Charitable Trust creates sustainable change through education, healthcare, women empowerment, and community programs across India.',
  keywords: ['NGO', 'charitable trust', 'education', 'healthcare', 'community', 'volunteer', 'donate'],
  authors: [{ name: 'Dua Charitable Trust' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://duacharitabletrust.org',
    siteName: 'Dua Charitable Trust',
    title: 'Dua Charitable Trust — Building Communities Together',
    description:
      'Creating sustainable change through meaningful action across education, healthcare, and community empowerment.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Dua Charitable Trust' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dua Charitable Trust',
    description: 'Creating sustainable change through meaningful action.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'NGO',
  name: 'Dua Charitable Trust',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://duacharitabletrust.org',
  logo: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://duacharitabletrust.org'}/logo.png`,
  description: 'Creating sustainable change through education, healthcare, and community empowerment.',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@duacharitabletrust.org',
    contactType: 'customer support',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="bg-brand-cream antialiased">
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <WhatsAppFAB />
      </body>
    </html>
  )
}
