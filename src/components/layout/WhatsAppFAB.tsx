'use client'

import { MessageCircle } from 'lucide-react'

export default function WhatsAppFAB() {
  const number  = process.env.NEXT_PUBLIC_WHATSAPP?.replace(/\D/g, '') ?? '91XXXXXXXXXX'
  const message = encodeURIComponent('Hello Dua Charitable Trust, I would like to know more.')
  const href    = `https://wa.me/${number}?text=${message}`

  const handleClick = () => {
    // GA4 event tracking (will be active once GA is connected)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'whatsapp_click', {
        event_category: 'engagement',
        event_label: 'whatsapp_fab',
      })
    }
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label="Chat with us on WhatsApp"
      id="whatsapp-fab"
      className="
        fixed bottom-6 right-6 z-50
        flex items-center justify-center
        w-14 h-14 rounded-full
        bg-[#25D366] text-white shadow-lg
        hover:scale-110 hover:shadow-xl
        active:scale-95
        transition-all duration-200
        group
      "
    >
      {/* Pulse ring */}
      <span
        className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-dot opacity-60 -z-10"
        aria-hidden="true"
      />
      <MessageCircle size={26} strokeWidth={2} />

      {/* Tooltip on hover (desktop) */}
      <span
        className="
          absolute right-16 whitespace-nowrap
          bg-brand-charcoal text-white text-xs font-body px-3 py-1.5 rounded-lg
          opacity-0 group-hover:opacity-100
          pointer-events-none
          transition-opacity duration-200
          hidden sm:block
        "
        aria-hidden="true"
      >
        Chat with us
      </span>
    </a>
  )
}
