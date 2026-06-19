'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Mail, MapPin, Send, ChevronDown, ChevronUp, Users, Share2 } from 'lucide-react'
import { InstagramIcon, FacebookIcon, XIcon, LinkedInIcon, YouTubeIcon } from '@/components/ui/SocialIcons'
import { ScrollRevealTypewriter, ScrollRevealWords, ScrollRevealCard } from '@/components/ui/ScrollAnimations'

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
          <div className="absolute inset-0 bg-[#0F233B]/40 backdrop-blur-[1px]" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F233B]/20 via-transparent to-[#FBF7F0]" aria-hidden="true" />
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
      <section id="donate" className="bg-[#FBF7F0] pb-16 relative z-20" aria-label="Contact info cards">
        <div id="donor" className="absolute -top-24" />
        <div className="container-wide px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 -mt-20 relative z-30">
            {[
              { type: 'info', icon: Phone,  label: 'Phone',    value: '+91 (022) 234-4567',            sub: 'Mon–Sat, 9am–6pm IST' },
              { type: 'info', icon: Mail,   label: 'Email',    value: 'hello@duacharitabletrust.org',  sub: 'We reply within 24 hours' },
              { type: 'info', icon: MapPin, label: 'Location', value: '123 Charity Lane, Mumbai 400001', sub: 'Maharashtra, India' },
              { type: 'social', icon: Share2, label: 'Connect', value: '', sub: 'Follow our journey online' }
            ].map((card, i) => {
              const Icon = card.icon
              return (
                <ScrollRevealCard 
                  key={card.label}
                  delay={i * 0.1}
                  className="bg-white rounded-[32px] p-8 flex flex-col items-center text-center gap-4 shadow-card hover:shadow-card-hover transition-all duration-300 border border-brand-sand/30 hover:-translate-y-1.5 group"
                >
                  <div className="w-12 h-12 bg-brand-blue/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon size={20} className="text-brand-blue" />
                  </div>
                  <p className="font-body text-xs font-semibold uppercase tracking-wider text-brand-grey">{card.label}</p>
                  
                  {card.type === 'info' ? (
                    <p className="font-body font-bold text-brand-charcoal text-sm min-h-[40px] flex items-center justify-center leading-relaxed">{card.value}</p>
                  ) : (
                    <div className="flex items-center gap-2.5 min-h-[40px]" aria-label="Social media channels">
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
                            className="w-8 h-8 rounded-full bg-brand-cream border border-brand-sand/40 flex items-center justify-center hover:bg-brand-amber hover:border-brand-amber transition-all duration-200 shadow-sm"
                          >
                            <SocIcon className="w-3.5 h-3.5 text-brand-charcoal transition-transform" />
                          </a>
                        )
                      })}
                    </div>
                  )}
                  
                  <p className="font-body text-xs text-brand-grey">{card.sub}</p>
                </ScrollRevealCard>
              )
            })}
          </div>
        </div>
      </section>

      {/* ════════ MAP & FORM GRID (Map Left, Form Right) ════════ */}
      <section id="join" className="py-20 md:py-28 lg:py-32 bg-white border-t border-brand-sand/30" aria-label="Contact form and map">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch px-4">
            
            {/* Map (Left) */}
            <ScrollRevealCard 
              className="rounded-[32px] overflow-hidden shadow-card min-h-[400px] lg:h-full relative border border-brand-sand/30 group"
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
      <section id="volunteer" className="py-20 md:py-28 lg:py-32 bg-[#FBF7F0] relative overflow-hidden" aria-label="Volunteer Section">
        
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
      <section id="faq" className="py-20 md:py-28 lg:py-32 bg-white" aria-label="Frequently asked questions">
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

      {/* ════════ PREMIUM NEWSLETTER CARD ════════ */}
      <section id="newsletter" className="py-20 md:py-28 lg:py-32 bg-[#FBF7F0] relative overflow-hidden" aria-label="Newsletter signup">
        <div className="container-wide px-4 relative z-10">
          <ScrollRevealCard 
            className="bg-gradient-to-br from-[#1A3A5C] via-[#11243B] to-[#1C1C1E] rounded-[32px] px-8 py-16 md:py-20 text-center max-w-[900px] mx-auto shadow-card-hover relative overflow-hidden border border-white/10"
            yOffset={40}
          >
            {/* Soft background glow elements */}
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-brand-amber/15 rounded-full blur-[90px] pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-brand-blue-light/10 rounded-full blur-[90px] pointer-events-none" />
            
            <span className="badge bg-brand-amber/20 text-brand-amber border border-brand-amber/10 text-xs font-semibold tracking-widest uppercase mb-4 inline-block shadow-sm">
              Newsletter
            </span>
            
            {/* Added !text-white to completely override global charcoal heading selectors */}
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4 !text-white leading-tight">
              <ScrollRevealTypewriter text="Subscribe to our " />
              <span className="text-brand-amber italic font-normal">
                <ScrollRevealTypewriter text="newsletter" delay={0.3} />
              </span>
            </h2>
            
            <p className="font-body text-white/75 text-sm sm:text-base mb-8 max-w-md mx-auto leading-relaxed">
              <ScrollRevealWords text="Stay connected with our latest updates, stories of impact, and upcoming community initiatives." />
            </p>

            {/* Form */}
            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()} aria-label="Newsletter form">
              <input
                type="email" placeholder="Your email address" required
                className="flex-1 px-6 py-3.5 rounded-full bg-white/10 border border-white/20
                           text-white text-sm placeholder:text-white/40
                           focus:outline-none focus:border-brand-amber focus:ring-2 focus:ring-brand-amber/20 transition-all duration-300"
                aria-label="Email for newsletter" id="contact-newsletter-email"
              />
              <button type="submit" className="btn-amber text-xs font-semibold px-8 py-3.5 rounded-full flex-shrink-0 hover:scale-[1.02] active:scale-98 transition-all cursor-pointer" id="contact-newsletter-btn">
                Subscribe
              </button>
            </form>
          </ScrollRevealCard>
        </div>
      </section>
    </>
  )
}
