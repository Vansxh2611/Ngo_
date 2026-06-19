import type { Metadata } from 'next'
import { ScrollRevealTypewriter, ScrollRevealWords, ScrollRevealCard } from '@/components/ui/ScrollAnimations'

export const metadata: Metadata = {
  title: 'Privacy Policy — Dua Charitable Trust',
  description: 'Learn how Dua Charitable Trust protects your personal data, donation history, and privacy rights.',
}

export default function PrivacyPage() {
  return (
    <>
      {/* ════════ HEADER ════════ */}
      <section className="relative bg-[#0F233B] pt-36 pb-20 overflow-hidden" aria-label="Privacy Policy Header">
        {/* Ambient blurs */}
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-brand-amber/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-30%] left-[-10%] w-[500px] h-[500px] bg-brand-blue-light/10 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Mesh grid pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" aria-hidden="true">
          <div className="w-full h-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        <div className="relative container-wide z-10 text-center px-4">
          <p className="section-label text-brand-amber/80 mb-3">Legal & Compliance</p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl !text-white font-bold mb-5 leading-tight">
            <ScrollRevealTypewriter text="Privacy Policy" />
          </h1>
          <p className="font-body text-white/90 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            <ScrollRevealWords text="Our commitment to safeguarding your personal information, donation details, and communication preferences." />
          </p>
        </div>
      </section>

      {/* ════════ CONTENT BODY ════════ */}
      <section className="py-20 md:py-28 bg-[#FBF7F0]" aria-label="Privacy Policy content">
        <div className="container-wide max-w-3xl mx-auto px-4">
          <ScrollRevealCard delay={0.1}>
            <div className="bg-white rounded-[32px] p-8 sm:p-12 border border-brand-sand/35 shadow-card space-y-8 text-left">
              
              <div className="space-y-3">
                <h2 className="font-heading font-bold text-brand-charcoal text-xl">1. Information We Collect</h2>
                <p className="font-body text-brand-grey text-sm sm:text-base leading-relaxed">
                  We collect personal information that you provide to us, including your name, email address, mailing address, telephone number, and payment details when you make a donation, volunteer, or subscribe to our newsletter.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="font-heading font-bold text-brand-charcoal text-xl">2. How We Use Your Information</h2>
                <p className="font-body text-brand-grey text-sm sm:text-base leading-relaxed">
                  We use your personal information to process donations, send tax-exempt receipts, coordinate volunteer events, distribute impact newsletters, and respond to your inquiries. We do not sell, rent, or trade donor lists or email databases.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="font-heading font-bold text-brand-charcoal text-xl">3. Payment & Security</h2>
                <p className="font-body text-brand-grey text-sm sm:text-base leading-relaxed">
                  All online donations are processed securely through industry-standard encrypted gateways. Dua Trust does not store credit card or bank details on our servers. Financial audits are conducted annually to maintain compliance with government regulations.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="font-heading font-bold text-brand-charcoal text-xl">4. Cookies & Analytics</h2>
                <p className="font-body text-brand-grey text-sm sm:text-base leading-relaxed">
                  Our website uses cookies to enhance browsing experiences and analyze site traffic. You can choose to disable cookies in your web browser preferences, although this may affect specific features of the payment portal.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="font-heading font-bold text-brand-charcoal text-xl">5. Your Rights</h2>
                <p className="font-body text-brand-grey text-sm sm:text-base leading-relaxed">
                  You have the right to request a copy of the personal information we hold about you, request corrections, or ask us to remove your details from our communication lists. Contact us at hello@duacharitabletrust.org for inquiries.
                </p>
              </div>

              <div className="pt-6 border-t border-brand-sand/30 flex justify-between items-center text-xs text-brand-grey">
                <span>Last Updated: June 18, 2026</span>
                <span>Dua Charitable Trust © 2026</span>
              </div>

            </div>
          </ScrollRevealCard>
        </div>
      </section>
    </>
  )
}
