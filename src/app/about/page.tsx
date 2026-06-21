import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  Heart, Users, Eye, Target,
  Shield, Lightbulb, HandHeart
} from 'lucide-react'
import { ScrollRevealTypewriter, ScrollRevealWords, ScrollRevealCard, ScrollRevealStagger, ScrollRevealStaggerItem } from '@/components/ui/ScrollAnimations'

export const metadata: Metadata = {
  title: 'About Us — Our Story, Mission & Team',
  description:
    'Learn about Dua Trust — our story since 2006, mission, vision, values, milestones, team, and global partners.',
}

const values = [
  {
    icon: Shield,
    title: 'Transparency',
    desc: 'We publish detailed annual reports and maintain open books so every donor knows exactly where their contribution goes.',
    color: 'bg-blue-50 text-brand-blue',
  },
  {
    icon: Heart,
    title: 'Compassion',
    desc: 'Every program begins with listening. We build with communities, not for them, ensuring dignity at every step.',
    color: 'bg-rose-50 text-rose-600',
  },
  {
    icon: Lightbulb,
    title: 'Impact',
    desc: 'We measure success by sustainable outcomes — families lifted, children educated, health improved.',
    color: 'bg-amber-50 text-brand-amber-dark',
  },
  {
    icon: HandHeart,
    title: 'Community',
    desc: 'We believe lasting change happens when communities lead. We exist to amplify local voices and strengths.',
    color: 'bg-green-50 text-green-700',
  },
]

const milestones = [
  {
    year: '2006',
    title: 'Foundation',
    desc: 'Dua Trust founded with a single community kitchen serving 50 families in Mumbai.',
  },
  {
    year: '2012',
    title: 'Growth',
    desc: 'Expanded to 5 states, launched the Education Scholarship Fund, reached 5,000 beneficiaries.',
  },
  {
    year: '2018',
    title: 'National Scale',
    desc: 'Opened 20+ field offices, launched maternal health program, passed 25,000 lives impacted milestone.',
  },
  {
    year: '2024',
    title: 'Global Reach',
    desc: 'Partnered with 120+ international organizations, 50,000+ beneficiaries, 6 active program domains.',
  },
]

const team = [
  { name: 'Sheikh Abdullah Dua', role: 'Founder & Chairman', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80' },
  { name: 'Dr. Fatima Rashid', role: 'Executive Director', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80' },
  { name: 'Ahmed Khan', role: 'Program Director', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80' },
  { name: 'Zara Siddiqui', role: 'Head of Community', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80' },
  { name: 'Omar Farooq', role: 'Head of Healthcare', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80' },
  { name: 'Nadia Hussain', role: 'Head of Education', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80' },
]

const partners = ['NGO Alliance', 'Global Health Fund', 'Education First', 'UNICEF Partner', 'WHO Affiliate', 'UN SDG Partner']

export default function AboutPage() {
  return (
    <>
      {/* ════════════════ HERO ════════════════ */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden" aria-label="About hero">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1600&q=85"
            alt="Driven by purpose"
            fill priority className="object-cover" sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#022c22]/45 backdrop-blur-[1px]" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#022c22]/20 via-transparent to-[#FBF7F0]" aria-hidden="true" />
        </div>

        {/* Mesh grid pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" aria-hidden="true">
          <div className="w-full h-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        <div className="relative container-wide pt-36 pb-24 z-10 px-4">
          <span className="badge bg-brand-amber/30 text-brand-amber border border-brand-amber/20 text-xs font-semibold tracking-widest uppercase mb-4 inline-block shadow-sm">
            Who We Are
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-7xl !text-white font-bold leading-tight mb-4">
            <ScrollRevealTypewriter text="Driven By " />
            <span className="text-brand-amber italic font-normal">
              <ScrollRevealTypewriter text="Purpose" delay={0.4} />
            </span>
          </h1>
          <p className="font-body text-white/95 text-base sm:text-lg max-w-xl leading-relaxed">
            <ScrollRevealWords text="Creating lasting impact across communities — one life, one family, one village at a time." />
          </p>
        </div>
      </section>

      {/* ════════════════ OUR STORY (Content / Decorative SVG split) ════════════════ */}
      <section id="programs" className="py-20 md:py-28 lg:py-32 section-bg-soft overflow-hidden" aria-label="Our story">
        <div className="container-wide">
          <div className="grid lg:grid-cols-[5fr_8fr] gap-16 items-center">

            {/* Story Text */}
            <div>
              <p className="section-label mb-3">Our Journey</p>
              <h2 className="section-title mb-6 leading-tight">
                <ScrollRevealTypewriter text="Our Story" />
              </h2>
              <div className="space-y-6 font-body text-brand-grey leading-relaxed text-base">
                <p>
                  <ScrollRevealWords text="Dua Trust was born in 2006 from a simple belief: that every person deserves access to education, healthcare, and a life of dignity. What began as a community kitchen serving 50 families in Mumbai has grown into a national movement touching over 50,000 lives." />
                </p>
                <p>
                  <ScrollRevealWords text="Our founder, Sheikh Abdullah Dua, witnessed firsthand the devastating effects of poverty and inequality. Driven by faith, compassion, and an unshakeable belief in human potential, he gathered a small group of volunteers and started with what he had — a kitchen, a prayer, and a promise." />
                </p>
                <p>
                  <ScrollRevealWords text="Today, Dua Trust operates across 6 program domains, partnering with over 120 organizations globally to deliver education, healthcare, women empowerment, environmental conservation, emergency relief, and community welfare programs." />
                </p>
              </div>
            </div>

            {/* Right: Decorative SVG Art */}
            <ScrollRevealCard delay={0.2} yOffset={40}>
              <div className="relative h-[320px] lg:h-[450px] bg-[#FBF7F0] rounded-[32px] border border-brand-sand/65 flex items-center justify-center overflow-hidden group hover:border-brand-amber/35 transition-colors duration-300">
                {/* Ambient radial gradient */}
                <div className="absolute inset-0 bg-radial-gradient from-brand-amber/10 to-transparent pointer-events-none" />

                {/* Inline Editorial SVG representing Organic Growth and Connection */}
                <svg viewBox="0 0 200 200" className="w-[85%] h-[85%] text-brand-blue" fill="none" stroke="currentColor" strokeWidth="1.5">
                  {/* Intersecting wavy orbital paths */}
                  <path d="M20,100 Q60,20 100,100 T180,100" strokeDasharray="3 3" opacity="0.4" />
                  <path d="M20,100 Q60,180 100,100 T180,100" strokeDasharray="1 2" opacity="0.4" strokeWidth="1" />

                  {/* Spiral flower of life / growth structure */}
                  <circle cx="100" cy="100" r="10" className="fill-brand-amber/20 stroke-brand-amber" strokeWidth="1" />
                  <circle cx="100" cy="100" r="30" opacity="0.8" />
                  <circle cx="100" cy="100" r="50" strokeDasharray="5 5" opacity="0.6" />
                  <circle cx="100" cy="100" r="70" opacity="0.4" />

                  {/* Floating nodes representing community milestones */}
                  <circle cx="60" cy="60" r="4" className="fill-brand-blue" />
                  <circle cx="140" cy="60" r="5" className="fill-brand-amber" />
                  <circle cx="140" cy="140" r="4" className="fill-brand-blue" />
                  <circle cx="60" cy="140" r="6" className="fill-brand-amber" />

                  {/* Handdrawn organic lines connecting them */}
                  <path d="M60,60 C80,80 80,90 100,100" opacity="0.7" />
                  <path d="M140,60 C120,80 120,90 100,100" opacity="0.7" />
                  <path d="M140,140 C120,120 120,110 100,100" opacity="0.7" strokeDasharray="2 2" />
                  <path d="M60,140 C80,120 80,110 100,100" opacity="0.7" />
                </svg>

                {/* Floating micro stats label */}
                <div className="absolute bottom-6 right-6 bg-white py-3 px-5 rounded-2xl shadow-card border border-brand-sand/50 text-right group-hover:-translate-y-1 transition-transform">
                  <span className="font-heading text-xl font-bold text-brand-blue">18+ Years</span>
                  <p className="font-body text-[10px] text-brand-grey uppercase tracking-wider">Active Service</p>
                </div>
              </div>
            </ScrollRevealCard>

          </div>
        </div>
      </section>

      {/* ════════════════ MISSION & VISION (Blue and Amber Borders) ════════════════ */}
      <section className="py-20 md:py-28 lg:py-32 section-bg-soft border-t border-b border-brand-sand/40 overflow-hidden" aria-label="Mission and vision">
        <div className="container-wide">
          <div className="text-center mb-16">
            <p className="section-label mb-3">Our Purpose</p>
            <h2 className="section-title leading-tight">
              <ScrollRevealTypewriter text="Mission & Vision" />
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto px-4">
            {/* Mission Card: Blue border */}
            <ScrollRevealCard delay={0}>
              <div className="bg-white rounded-[32px] p-8 md:p-12 border-2 border-brand-blue shadow-card h-full hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300">
                <div className="w-12 h-12 bg-brand-blue/10 rounded-2xl flex items-center justify-center mb-6">
                  <Target size={22} className="text-brand-blue" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-brand-charcoal mb-4">Mission</h3>
                <p className="font-body text-brand-grey leading-relaxed text-sm sm:text-base">
                  To create equitable, compassionate, and sustainable communities by delivering transformative
                  programs in education, health, and social welfare — empowering individuals to reach their
                  full potential.
                </p>
              </div>
            </ScrollRevealCard>

            {/* Vision Card: Amber border */}
            <ScrollRevealCard delay={0.15}>
              <div className="bg-white rounded-[32px] p-8 md:p-12 border-2 border-brand-amber shadow-card h-full hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300">
                <div className="w-12 h-12 bg-brand-amber/10 rounded-2xl flex items-center justify-center mb-6">
                  <Eye size={22} className="text-brand-amber-dark" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-brand-charcoal mb-4">Vision</h3>
                <p className="font-body text-brand-grey leading-relaxed text-sm sm:text-base">
                  A world where no child goes uneducated, no mother lacks healthcare, and every community
                  has the resources and dignity to flourish — driven by the collective will to act.
                </p>
              </div>
            </ScrollRevealCard>
          </div>
        </div>
      </section>

      {/* ════════════════ VALUES (White cards, Centered, Soft Shadow) ════════════════ */}
      <section className="py-20 md:py-28 lg:py-32 section-bg-soft overflow-hidden" aria-label="Our values">
        <div className="container-wide">
          <div className="text-center mb-16">
            <p className="section-label mb-3">What Drives Us</p>
            <h2 className="section-title leading-tight">
              <ScrollRevealTypewriter text="Our Values" />
            </h2>
          </div>

          <ScrollRevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
            {values.map(({ icon: Icon, title, desc, color }, idx) => (
              <ScrollRevealStaggerItem key={title}>
                <div className="bg-white rounded-[32px] p-8 text-center flex flex-col items-center gap-5 shadow-card hover:shadow-card-hover hover:border-brand-amber/20 transition-all duration-300 border border-brand-sand/30 h-full">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color}`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="font-heading font-bold text-brand-charcoal text-lg">{title}</h3>
                  <p className="font-body text-xs sm:text-sm text-brand-grey leading-relaxed">{desc}</p>
                </div>
              </ScrollRevealStaggerItem>
            ))}
          </ScrollRevealStagger>
        </div>
      </section>

      {/* ════════════════ MILESTONES (Alternate Blue / Amber node timeline) ════════════════ */}
      <section className="py-20 md:py-28 lg:py-32 section-bg-soft overflow-hidden" aria-label="Our milestones">
        <div className="container-wide">
          <div className="text-center mb-16">
            <p className="section-label mb-3">Our Journey</p>
            <h2 className="section-title leading-tight">
              <ScrollRevealTypewriter text="Milestones" />
            </h2>
          </div>

          <div className="relative max-w-3xl mx-auto px-4">
            {/* Timeline center line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-brand-sand hidden sm:block" aria-hidden="true" />

            <div className="space-y-10">
              {milestones.map((m, i) => {
                const isBlue = i % 2 === 0
                return (
                  <ScrollRevealCard key={m.year} delay={i * 0.1}>
                    <div className="flex gap-6 items-start">
                      <div className="relative flex-shrink-0">
                        {/* Alternating Blue and Amber timeline circle nodes */}
                        <div
                          className={`w-16 h-16 rounded-full flex items-center justify-center shadow-card z-10 relative border-2 border-white
                            ${isBlue ? 'bg-brand-blue text-white' : 'bg-brand-amber text-brand-charcoal'}`}
                        >
                          <span className="font-body text-xs font-bold">{m.year}</span>
                        </div>
                      </div>

                      {/* Content Box */}
                      <div className="bg-white rounded-[32px] p-6 sm:p-8 flex-1 mt-2 shadow-card hover:shadow-card-hover transition-shadow duration-300 border border-brand-sand/30">
                        <h3 className="font-heading font-bold text-brand-charcoal text-lg mb-2">{m.title}</h3>
                        <p className="font-body text-xs sm:text-sm text-brand-grey leading-relaxed">{m.desc}</p>
                      </div>
                    </div>
                  </ScrollRevealCard>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ TEAM ════════════════ */}
      <section className="py-20 md:py-28 lg:py-32 section-bg-soft overflow-hidden" aria-label="Our team">
        <div className="container-wide">
          <div className="text-center mb-16">
            <p className="section-label mb-3">The People</p>
            <h2 className="section-title leading-tight">
              <ScrollRevealTypewriter text="Meet Our Team" />
            </h2>
            <p className="section-subtitle mx-auto mt-4 text-center">
              <ScrollRevealWords text="Dedicated professionals united by a shared commitment to creating lasting change." />
            </p>
          </div>
          <ScrollRevealStagger className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 px-4">
            {team.map((member, idx) => (
              <ScrollRevealStaggerItem key={member.name}>
                <div className="bg-white rounded-[32px] p-5 text-center group shadow-card hover:shadow-card-hover border border-brand-sand/30 hover:border-brand-amber/35 hover:-translate-y-1.5 transition-all duration-300 h-full flex flex-col justify-between">
                  <div>
                    {/* Avatar Ring with dual gradient */}
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-tr from-brand-blue to-brand-amber p-[2px] shadow-md ring-4 ring-brand-blue/5 group-hover:scale-105 transition-transform duration-300">
                      <div className="w-full h-full rounded-full overflow-hidden relative bg-brand-cream">
                        <Image src={member.img} alt={member.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="80px" />
                      </div>
                    </div>
                    <h3 className="font-heading font-bold text-brand-charcoal text-xs sm:text-sm leading-snug group-hover:text-brand-blue transition-colors duration-200">{member.name}</h3>
                  </div>
                  <p className="font-body text-[10px] sm:text-xs text-brand-grey mt-2 uppercase tracking-wide">{member.role}</p>
                </div>
              </ScrollRevealStaggerItem>
            ))}
          </ScrollRevealStagger>
        </div>
      </section>

      {/* ════════════════ PARTNERS ════════════════ */}
      <section className="py-20 md:py-28 section-bg-soft overflow-hidden" aria-label="Our partners">
        <div className="container-wide">
          <div className="text-center mb-12">
            <p className="section-label mb-3">Trusted By</p>
            <h2 className="section-title leading-tight">
              <ScrollRevealTypewriter text="Our Partners" />
            </h2>
          </div>
          <ScrollRevealStagger className="flex flex-wrap justify-center gap-4 px-4">
            {partners.map((p, idx) => (
              <ScrollRevealStaggerItem key={p}>
                <div
                  className="px-6 py-3 bg-white rounded-full shadow-card font-body font-semibold
                             text-xs sm:text-sm text-brand-blue hover:shadow-card-hover hover:text-brand-amber-dark
                             transition-all duration-200 cursor-default border border-brand-sand/30"
                >
                  {p}
                </div>
              </ScrollRevealStaggerItem>
            ))}
          </ScrollRevealStagger>
        </div>
      </section>

      {/* ════════════════ JOIN CTA ════════════════ */}
      <section className="py-20 md:py-28 lg:py-32 section-bg-soft relative overflow-hidden" aria-label="Join our mission">

        {/* Inline decorative SVG line/paths to match spec exactly */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.06] flex items-center justify-center" aria-hidden="true">
          <svg viewBox="0 0 300 150" className="w-[900px] h-[450px] text-brand-blue" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M-50,75 C50,25 100,125 150,75 C200,25 250,125 350,75" strokeDasharray="3 3" />
            <path d="M-50,90 C50,40 100,140 150,90 C200,40 250,140 350,90" />
            <path d="M-50,60 C50,10 100,110 150,60 C200,10 250,110 350,60" opacity="0.5" />
          </svg>
        </div>

        <div className="container-wide text-center relative z-10">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-brand-charcoal font-bold mb-6 leading-tight">
            <ScrollRevealTypewriter text="Join Our " />
            <span className="text-brand-amber italic font-normal">
              <ScrollRevealTypewriter text="Mission" delay={0.4} />
            </span>
          </h2>
          <p className="font-body text-brand-grey text-sm sm:text-base mb-10 max-w-xl mx-auto leading-relaxed">
            <ScrollRevealWords text="Your support — whether through donating time, vocational skills, or financial resources — helps us empower more communities to stand strong." />
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/community" className="btn-ghost border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white px-8 py-3.5 rounded-full font-medium cursor-pointer" id="about-community-btn">
              Explore Community
            </Link>
            <Link href="/contact#volunteer" className="btn-ghost border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white px-8 py-3.5 cursor-pointer" id="about-volunteer-btn">
              Volunteer
            </Link>
            <Link href="/projects" className="btn-amber px-8 py-3.5 rounded-full text-brand-charcoal font-semibold shadow-md cursor-pointer" id="about-donate-btn">
              Donate Now
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

