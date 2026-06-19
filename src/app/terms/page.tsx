import type { Metadata } from 'next'
import { ScrollRevealTypewriter, ScrollRevealWords, ScrollRevealCard } from '@/components/ui/ScrollAnimations'

export const metadata: Metadata = {
  title: 'Terms of Use — Dua Charitable Trust',
  description: 'Terms and conditions governing the use of the Dua Charitable Trust website and services.',
}

export default function TermsPage() {
  return (
    <>
      {/* ════════ HEADER ════════ */}
      <section className="relative bg-[#0F233B] pt-36 pb-20 overflow-hidden" aria-label="Terms of Use Header">
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
            <ScrollRevealTypewriter text="Terms of Use" />
          </h1>
          <p className="font-body text-white/90 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            <ScrollRevealWords text="The rules and guidelines for interacting with our digital channels, donation portals, and community services." />
          </p>
        </div>
      </section>

      {/* ════════ CONTENT BODY ════════ */}
      <section className="py-20 md:py-28 bg-[#FBF7F0]" aria-label="Terms of Use content">
        <div className="container-wide max-w-3xl mx-auto px-4">
          <ScrollRevealCard delay={0.1}>
            <div className="bg-white rounded-[32px] p-8 sm:p-12 border border-brand-sand/35 shadow-card space-y-8 text-left">
              
              <div className="space-y-3">
                <h2 className="font-heading font-bold text-brand-charcoal text-xl">1. Acceptance of Terms</h2>
                <p className="font-body text-brand-grey text-sm sm:text-base leading-relaxed">
                  By accessing and using this website, you agree to comply with and be bound by these Terms of Use and our Privacy Policy. If you do not agree, please discontinue using our digital platforms.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="font-heading font-bold text-brand-charcoal text-xl">2. Proper Use</h2>
                <p className="font-body text-brand-grey text-sm sm:text-base leading-relaxed">
                  You agree to use this site only for lawful purposes related to learning about, volunteering with, or donating to the Dua Charitable Trust. You may not upload malicious code, attempt unauthorized access, or misrepresent your identity.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="font-heading font-bold text-brand-charcoal text-xl">3. Donations & Refunds</h2>
                <p className="font-body text-brand-grey text-sm sm:text-base leading-relaxed">
                  All donations made through our secure portal are voluntary. Once a donation is finalized, refunds are generally not permitted unless a technical error occurred. Tax exemption documentation (Section 80G) will be emailed within 48 hours.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="font-heading font-bold text-brand-charcoal text-xl">4. Intellectual Property</h2>
                <p className="font-body text-brand-grey text-sm sm:text-base leading-relaxed">
                  All content, branding logos, text, and images on this website are the property of Dua Charitable Trust or licensed Unsplash contributors. Content may not be copied, modified, or republished without written consent.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="font-heading font-bold text-brand-charcoal text-xl">5. Limitation of Liability</h2>
                <p className="font-body text-brand-grey text-sm sm:text-base leading-relaxed">
                  Dua Trust makes every effort to keep our web services online and free of errors. However, we are not liable for any temporary service interruptions, network failures, or details provided by third-party links.
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
