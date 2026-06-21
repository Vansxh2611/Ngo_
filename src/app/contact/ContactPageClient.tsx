'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Mail, MapPin, Send, ChevronDown, ChevronUp, Users, Share2 } from 'lucide-react'
import { InstagramIcon, FacebookIcon, XIcon, LinkedInIcon, YouTubeIcon } from '@/components/ui/SocialIcons'
import { ScrollRevealTypewriter, ScrollRevealWords, ScrollRevealCard, ScrollRevealStagger, ScrollRevealStaggerItem } from '@/components/ui/ScrollAnimations'
import { PremiumCard } from '@/components/ui/PremiumCard'

const faqs = [
  {
    q: 'How do I donate to Dua Trust?',
    a: 'You can donate online through our secure payment portal, via bank transfer, or by contacting us directly. All donations are eligible for 80G tax exemption under the Income Tax Act.',
  },
  {
    q: 'How can I volunteer with the trust?',
    a: 'We welcome volunteers for field programs, events, content creation, education, healthcare support, and administrative roles. You can click our Volunteer CTA to get started.',
  },
  {
    q: 'Is my donation tax-deductible?',
    a: 'Yes. Dua Trust is registered under Section 12A and 80G of the Income Tax Act. You will receive a tax receipt within 48 hours of your donation.',
  },
  {
    q: 'How can I partner with Dua Trust?',
    a: 'We partner with corporates, institutions, and international organizations for CSR initiatives, co-funded programs, and capacity building. Reach out via email or our contact form.',
  },
  {
    q: 'Where does my donation go?',
    a: 'At least 85% of every donation goes directly to programs. We publish transparent annual reports — you can track impact on our Archive page.',
  },
]

export default function ContactPageClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // Contact form state
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  // Volunteer form state
  const [volState, setVolState] = useState({ name: '', email: '', area: '', message: '' })
  const [volSubmitted, setVolSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setFormState({ name: '', email: '', subject: '', message: '' })
  }

  const handleVolSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setVolSubmitted(true)
    setTimeout(() => setVolSubmitted(false), 4000)
    setVolState({ name: '', email: '', area: '', message: '' })
  }

  return (
    <>
      {/* ════════ HERO ════════ */}
      <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden" aria-label="Contact hero">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&q=85"
            alt="Let's create impact together"
            fill priority className="object-cover" sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#111827]/40 backdrop-blur-[1px]" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#111827]/20 via-transparent to-[#FBF7F0]" aria-hidden="true" />
        </div>

        <div className="relative container-wide pt-36 pb-28 z-10 text-center px-4">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="badge bg-brand-amber/30 text-brand-amber border border-brand-amber/20 text-xs font-semibold tracking-widest uppercase mb-4 inline-block shadow-sm"
          >
            Get In Touch
          </motion.span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl !text-white font-bold leading-tight mb-5">
            <ScrollRevealTypewriter text="Let's Create Impact " />
            <span className="text-brand-amber italic font-normal">
              <ScrollRevealTypewriter text="Together" delay={0.4} />
            </span>
          </h1>
          <p className="font-body text-white/90 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            <ScrollRevealWords text="Have a question, want to volunteer, or looking to partner? We'd love to hear from you." />
          </p>
        </div>
      </section>

      {/* ════════ INFO CARDS (4 Cards Grid, Overlapping the Hero) ════════ */}
      <section id="donate" className="section-bg-soft py-16 md:py-24 relative z-20" aria-label="Contact info cards">
        <div id="donor" className="absolute -top-24" />
        <div className="container-wide px-4">
          <ScrollRevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-30">
            {[
              {
                type: 'info',
                icon: Phone,
                label: 'Phone',
                value: '+91 (022) 234-4567',
                href: 'tel:+910222344567',
                sub: 'Mon–Sat, 9am–6pm IST',
                glowClass: 'group-hover/card:shadow-[0_20px_50px_rgba(240,169,42,0.06)]',
                borderHoverClass: 'hover:border-brand-amber/30',
                iconGlow: 'bg-[#FBF7F0] border-brand-sand/40 group-hover/card:bg-brand-amber/10 group-hover/card:border-brand-amber/30 group-hover/card:text-brand-amber-dark',
                iconColor: 'text-brand-blue group-hover/card:text-brand-amber-dark'
              },
              {
                type: 'info',
                icon: Mail,
                label: 'Email',
                value: 'hello@duacharitabletrust.org',
                href: 'mailto:hello@duacharitabletrust.org',
                sub: 'We reply within 24 hours',
                glowClass: 'group-hover/card:shadow-[0_20px_50px_rgba(74,127,165,0.08)]',
                borderHoverClass: 'hover:border-brand-blue-light/30',
                iconGlow: 'bg-[#FBF7F0] border-brand-sand/40 group-hover/card:bg-brand-blue-light/10 group-hover/card:border-brand-blue-light/30 group-hover/card:text-brand-blue-light',
                iconColor: 'text-brand-blue-light'
              },
              {
                type: 'info',
                icon: MapPin,
                label: 'Location',
                value: '123 Charity Lane, Mumbai',
                href: 'https://maps.google.com/?q=123+Charity+Lane,+Mumbai+400001',
                sub: 'Maharashtra, India',
                glowClass: 'group-hover/card:shadow-[0_20px_50px_rgba(26,58,92,0.06)]',
                borderHoverClass: 'hover:border-brand-blue/30',
                iconGlow: 'bg-[#FBF7F0] border-brand-sand/40 group-hover/card:bg-brand-blue/10 group-hover/card:border-brand-blue/30 group-hover/card:text-brand-blue',
                iconColor: 'text-brand-blue'
              },
              {
                type: 'social',
                icon: Share2,
                label: 'Connect',
                value: '',
                href: '#',
                sub: 'Follow our journey online',
                glowClass: 'group-hover/card:shadow-[0_20px_50px_rgba(240,169,42,0.08)]',
                borderHoverClass: 'hover:border-brand-amber/30',
                iconGlow: 'bg-[#FBF7F0] border-brand-sand/40 group-hover/card:bg-brand-amber/10 group-hover/card:border-brand-amber/30 group-hover/card:text-brand-amber-dark',
                iconColor: 'text-brand-blue group-hover/card:text-brand-amber-dark'
              }
            ].map((card, i) => {
              const Icon = card.icon
              const isAmber = card.label === 'Phone' || card.label === 'Connect'
              return (
                <ScrollRevealStaggerItem key={card.label} className="h-full">
                  <PremiumCard
                    variant={isAmber ? 'amber' : 'blue'}
                    className="bg-white/90 backdrop-blur-xl p-7 md:p-8 flex flex-col items-start justify-between text-left gap-5 border border-brand-sand/25 h-full min-h-[300px] relative overflow-hidden group/card"
                  >
                    {/* Premium top accent sliding gradient line */}
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-blue via-brand-amber to-brand-blue-light opacity-0 group-hover/card:opacity-100 transition-all duration-500" />

                    {/* Large absolute faint watermark icon in bottom-right - aligned and sized properly */}
                    <div className="absolute bottom-[-15px] right-[-15px] text-brand-sand/20 pointer-events-none transition-all duration-500 scale-100 group-hover/card:scale-110 group-hover/card:text-brand-amber/15 z-0">
                      <Icon size={96} strokeWidth={1} />
                    </div>

                    {/* Top content wrapper - stays above watermark background */}
                    <div className="flex flex-col items-start w-full relative z-10 flex-1">
                      {/* Animated Premium Icon Holder */}
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] mb-5 ${card.iconGlow}`}>
                        <Icon size={20} className={`${card.iconColor} transition-all duration-500`} />
                      </div>

                      <p className="font-body text-[10px] font-bold uppercase tracking-widest text-brand-grey/50 mb-1.5">{card.label}</p>

                      {card.type === 'info' ? (
                        <a
                          href={card.href}
                          {...(card.label === 'Location' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          className="font-body font-semibold text-brand-charcoal text-base sm:text-lg leading-relaxed hover:text-brand-blue transition-colors duration-200 break-all sm:break-normal w-full"
                        >
                          {card.value}
                        </a>
                      ) : (
                        <div className="flex flex-wrap gap-2 pt-1 w-full" aria-label="Social media channels">
                          {[
                            { icon: InstagramIcon, href: 'https://instagram.com', label: 'Instagram' },
                            { icon: FacebookIcon, href: 'https://facebook.com', label: 'Facebook' },
                            { icon: XIcon, href: 'https://twitter.com', label: 'Twitter' },
                            { icon: LinkedInIcon, href: 'https://linkedin.com', label: 'LinkedIn' },
                            { icon: YouTubeIcon, href: 'https://youtube.com', label: 'YouTube' }
                          ].map((soc, idx) => {
                            const SocIcon = soc.icon
                            return (
                              <a
                                key={idx}
                                href={soc.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={soc.label}
                                className="w-9 h-9 rounded-xl bg-[#FBF7F0] border border-brand-sand/50 flex items-center justify-center hover:bg-brand-blue hover:text-white hover:border-brand-blue hover:-translate-y-1 hover:shadow-md transition-all duration-300 group/soc"
                              >
                                <SocIcon className="w-4 h-4 text-brand-grey group-hover/soc:text-white transition-colors duration-300" />
                              </a>
                            )
                          })}
                        </div>
                      )}
                    </div>

                    {/* Subtext aligned at the bottom with thin divider line */}
                    <p className="font-body text-xs text-brand-grey/60 pt-4 border-t border-brand-sand/15 relative z-10 w-full mt-auto">{card.sub}</p>
                  </PremiumCard>
                </ScrollRevealStaggerItem>
              )
            })}
          </ScrollRevealStagger>
        </div>
      </section>

      {/* ════════ MAP & FORM GRID (Map Left, Form Right) ════════ */}
      <section id="join" className="py-20 md:py-28 lg:py-32 section-bg-soft border-t border-brand-sand/30" aria-label="Contact form and map">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch px-4">

            {/* Map (Left) */}
            <ScrollRevealCard
              className="rounded-2xl overflow-hidden shadow-elev-1 min-h-[400px] lg:h-full relative border border-brand-sand/40 group"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823055!2d72.74109995709657!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1718000000000!5m2!1sen!2sin"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" title="Dua Trust location"
                className="absolute inset-0 w-full h-full grayscale-[25%] opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
              />
            </ScrollRevealCard>

            {/* Form (Right) */}
            <div className="flex flex-col justify-center">
              <p className="section-label mb-3">Send a Message</p>
              <h2 className="section-title mb-6">
                <ScrollRevealTypewriter text="Contact Us" />
              </h2>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl text-green-700 font-body text-sm"
                >
                  ✓ Message sent! We&apos;ll get back to you within 24 hours.
                </motion.div>
              )}

              <ScrollRevealCard delay={0.1}>
                <form onSubmit={handleSubmit} className="space-y-5" aria-label="Contact form" id="contact-form">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-body font-semibold text-brand-charcoal mb-2">Full Name *</label>
                      <input
                        id="contact-name" type="text" required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="Your name"
                        className="w-full px-5 py-3.5 rounded-full border border-brand-sand/80 bg-[#FBF7F0]/40 font-body text-sm
                                   text-brand-charcoal placeholder:text-brand-grey/40
                                   focus:outline-none focus:border-brand-blue-light focus:bg-white focus:ring-4 focus:ring-brand-blue/5 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-body font-semibold text-brand-charcoal mb-2">Email Address *</label>
                      <input
                        id="contact-email" type="email" required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full px-5 py-3.5 rounded-full border border-brand-sand/80 bg-[#FBF7F0]/40 font-body text-sm
                                   text-brand-charcoal placeholder:text-brand-grey/40
                                   focus:outline-none focus:border-brand-blue-light focus:bg-white focus:ring-4 focus:ring-brand-blue/5 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-body font-semibold text-brand-charcoal mb-2">Subject *</label>
                    <input
                      id="contact-subject" type="text" required
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      placeholder="What is your message about?"
                      className="w-full px-5 py-3.5 rounded-full border border-brand-sand/80 bg-[#FBF7F0]/40 font-body text-sm
                                 text-brand-charcoal placeholder:text-brand-grey/40
                                 focus:outline-none focus:border-brand-blue-light focus:bg-white focus:ring-4 focus:ring-brand-blue/5 transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-body font-semibold text-brand-charcoal mb-2">Message *</label>
                    <textarea
                      id="contact-message" required rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Tell us how we can help or how you'd like to get involved…"
                      className="w-full px-5 py-4 rounded-[24px] border border-brand-sand/80 bg-[#FBF7F0]/40 font-body text-sm
                                 text-brand-charcoal placeholder:text-brand-grey/40
                                 focus:outline-none focus:border-brand-blue-light focus:bg-white focus:ring-4 focus:ring-brand-blue/5 transition-all duration-300 resize-none"
                    />
                  </div>

                  <button type="submit" className="btn-amber w-full justify-center py-3.5 font-semibold text-brand-charcoal rounded-full shadow-md hover:scale-[1.01] active:scale-95 transition-all cursor-pointer" id="contact-submit-btn">
                    <Send size={14} className="inline mr-1.5" /> Send Message
                  </button>
                </form>
              </ScrollRevealCard>
            </div>

          </div>
        </div>
      </section>

      {/* ════════ VOLUNTEER (Cream bg, Rebuilt full interactive form) ════════ */}
      <section id="volunteer" className="py-20 md:py-28 lg:py-32 section-bg-soft relative overflow-hidden" aria-label="Volunteer Section">

        {/* Concentric rotating wave lines background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04] flex items-center justify-center" aria-hidden="true">
          <svg viewBox="0 0 200 200" className="w-[600px] h-[600px] text-brand-blue" fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="100" cy="100" r="40" strokeDasharray="3 3" />
            <circle cx="100" cy="100" r="85" />
            <circle cx="100" cy="100" r="130" strokeDasharray="6 6" />
          </svg>
        </div>

        <div className="container-wide relative z-10 px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left Column: Copy & Bullet Points */}
            <div>
              <p className="section-label mb-3">Get Involved</p>
              <h2 className="section-title mb-5">
                <ScrollRevealTypewriter text="Join Us as a " />
                <span className="text-brand-blue italic font-normal">
                  <ScrollRevealTypewriter text="Volunteer" delay={0.3} />
                </span>
              </h2>
              <p className="section-subtitle mb-8">
                <ScrollRevealWords text="Dua Trust runs dynamic field programs across education, maternal health, and community kitchens. Whether you have an hour a week or looking for full-time involvement, your unique skills can transform lives." />
              </p>
              <ScrollRevealCard delay={0.2}>
                <ul className="space-y-4 mb-8">
                  {['Field program support', 'Content & communications', 'IT & web development support', 'Event coordination', 'Healthcare outreach support'].map((item) => (
                    <li key={item} className="flex items-center gap-3 font-body text-sm text-brand-charcoal/80 font-medium">
                      <span className="w-2 h-2 rounded-full bg-brand-amber flex-shrink-0 animate-pulse-dot" />
                      {item}
                    </li>
                  ))}
                </ul>
              </ScrollRevealCard>
            </div>

            {/* Right Column: Rebuilt Volunteer Application Form Card */}
            <ScrollRevealCard
              delay={0.1}
              className="bg-white rounded-[32px] p-8 shadow-card border border-brand-sand/30 relative overflow-hidden"
            >
              <h3 className="font-heading font-bold text-brand-charcoal text-2xl mb-6 flex items-center gap-2">
                <Users size={20} className="text-brand-blue" />
                Volunteer Application
              </h3>

              {volSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-[20px] text-green-700 font-body text-sm"
                >
                  ✓ Application submitted successfully! Our community director will contact you shortly.
                </motion.div>
              )}

              <form className="space-y-4" onSubmit={handleVolSubmit} aria-label="Volunteer form" id="volunteer-form">
                <div>
                  <label htmlFor="vol-name" className="block text-xs font-body font-semibold text-brand-charcoal mb-2">Full Name *</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    required
                    id="vol-name"
                    value={volState.name}
                    onChange={(e) => setVolState({ ...volState, name: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-full border border-brand-sand/80 bg-[#FBF7F0]/40 font-body text-sm
                               text-brand-charcoal placeholder:text-brand-grey/40
                               focus:outline-none focus:border-brand-blue-light focus:bg-white focus:ring-4 focus:ring-brand-blue/5 transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="vol-email" className="block text-xs font-body font-semibold text-brand-charcoal mb-2">Email Address *</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    required
                    id="vol-email"
                    value={volState.email}
                    onChange={(e) => setVolState({ ...volState, email: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-full border border-brand-sand/80 bg-[#FBF7F0]/40 font-body text-sm
                               text-brand-charcoal placeholder:text-brand-grey/40
                               focus:outline-none focus:border-brand-blue-light focus:bg-white focus:ring-4 focus:ring-brand-blue/5 transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="vol-area" className="block text-xs font-body font-semibold text-brand-charcoal mb-2">Area of Interest *</label>
                  <select
                    id="vol-area"
                    required
                    value={volState.area}
                    onChange={(e) => setVolState({ ...volState, area: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-full border border-brand-sand bg-white font-body text-sm
                               text-brand-grey focus:outline-none focus:border-brand-blue-light focus:ring-4 focus:ring-brand-blue/5 transition-all duration-300 cursor-pointer"
                  >
                    <option value="">Select Area of Interest</option>
                    <option value="Education">Education & Tutoring</option>
                    <option value="Healthcare">Healthcare Support</option>
                    <option value="Women Empowerment">Women Empowerment</option>
                    <option value="Environment">Environmental Plantation</option>
                    <option value="Emergency Relief">Emergency relief aid</option>
                    <option value="Technology">Technology & Web support</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="vol-message" className="block text-xs font-body font-semibold text-brand-charcoal mb-2">Availability & Experience *</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about yourself, your skills, and when you are available..."
                    required
                    id="vol-message"
                    value={volState.message}
                    onChange={(e) => setVolState({ ...volState, message: e.target.value })}
                    className="w-full px-5 py-3 rounded-[20px] border border-brand-sand/80 bg-[#FBF7F0]/40 font-body text-sm
                               text-brand-charcoal placeholder:text-brand-grey/40
                               focus:outline-none focus:border-brand-blue-light focus:bg-white focus:ring-4 focus:ring-brand-blue/5 transition-all duration-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary bg-brand-charcoal text-white hover:bg-black hover:scale-[1.01] active:scale-95 rounded-full w-full justify-center py-3.5 font-semibold shadow-sm transition-all mt-2 cursor-pointer"
                  id="vol-submit-btn"
                >
                  Become a Volunteer
                </button>
              </form>
            </ScrollRevealCard>

          </div>
        </div>
      </section>

      {/* ════════ FAQ (Accordions, 24px Radius, Animated) ════════ */}
      <section id="faq" className="py-20 md:py-28 lg:py-32 section-bg-soft" aria-label="Frequently asked questions">
        <div className="container-wide max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="section-label mb-3">Got Questions?</p>
            <h2 className="section-title">
              <ScrollRevealTypewriter text="FAQ" />
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i
              return (
                <ScrollRevealCard
                  key={i}
                  delay={i * 0.08}
                  yOffset={20}
                  className="bg-[#FBF7F0]/50 rounded-[24px] overflow-hidden border border-brand-sand/40 shadow-sm transition-all duration-300 hover:shadow-md"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-brand-sand/15 transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                    id={`faq-btn-${i}`}
                  >
                    <span className="font-body font-bold text-brand-charcoal text-sm sm:text-base pr-4">{faq.q}</span>
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-brand-sand/30 flex-shrink-0">
                      {isOpen
                        ? <ChevronUp size={16} className="text-brand-blue" />
                        : <ChevronDown size={16} className="text-brand-grey" />
                      }
                    </div>
                  </button>

                  {/* Smooth height animation */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out
                      ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 pt-2 font-body text-xs sm:text-sm text-brand-grey leading-relaxed border-t border-brand-sand/30 bg-white/30">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                </ScrollRevealCard>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
