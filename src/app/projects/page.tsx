import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ScrollRevealCard } from '@/components/ui/ScrollAnimations'

export const metadata: Metadata = {
  title: 'Our Projects — Seeds of Change in Action',
  description:
    'Explore the social impact programs, educational workshops, and healthcare initiatives run by Dua Charitable Trust.',
}

const projects = [
  {
    id: 1,
    titleMain: 'Digital Literacy',
    titleItalic: 'for All',
    desc: 'Equipping rural schools with computer labs, high-speed internet, and a custom digital skills curriculum to prepare young minds for a connected world.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
    alt: 'Children in a rural classroom smiling as they interact with computer screens during a digital literacy class',
    orientation: 'image-left' as const,
  },
  {
    id: 2,
    titleMain: 'STEAM Workshops',
    titleItalic: 'in Rural Peru',
    desc: 'Empowering children in remote Andean communities with hands-on science, technology, engineering, arts, and mathematics training to solve local problems.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
    alt: 'Local community members and students engaging in a collaborative science and technology workshop',
    orientation: 'image-right' as const,
  },
  {
    id: 3,
    titleMain: 'The Mobile Library',
    titleItalic: 'Initiative',
    desc: 'Bringing books, reading materials, and interactive learning sessions to children in remote urban slums and villages without access to libraries.',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
    alt: 'A group of children reading books together with a teacher in an outdoor setting',
    orientation: 'image-left' as const,
  },
]

function ProjectRow({
  project,
}: {
  project: typeof projects[number]
}) {
  const isImageRight = project.orientation === 'image-right'

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-stretch py-4 md:py-6 max-w-[1100px] mx-auto">
      {/* Image Tile */}
      <ScrollRevealCard
        delay={0.1}
        className={cn(
          "w-full order-1 flex flex-col h-full",
          isImageRight ? "md:order-2" : "md:order-1"
        )}
      >
        <div className="relative w-full h-[200px] sm:h-[240px] md:h-full min-h-[200px] rounded-[32px] overflow-hidden group/img shadow-card border border-brand-sand/30 hover:border-brand-amber/30 hover:-translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
          <Image
            src={project.image}
            alt={project.alt}
            fill
            className="object-cover transition-transform duration-700 group-hover/img:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Modern subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/15 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>
      </ScrollRevealCard>

      {/* Text Tile */}
      <ScrollRevealCard
        delay={0.2}
        className={cn(
          "w-full order-2 flex flex-col h-full",
          isImageRight ? "md:order-1" : "md:order-2"
        )}
      >
        <article className="bg-[#FBF7F0]/90 backdrop-blur-md rounded-[32px] p-6 md:p-8 lg:p-10 shadow-card hover:shadow-card-hover border border-brand-sand/35 hover:border-brand-amber/30 hover:-translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between w-full h-full min-h-[250px] sm:min-h-[280px] md:min-h-[330px] group/card">
          <div>
            <h2 className="font-body text-lg sm:text-xl lg:text-2xl font-bold text-brand-blue mb-3 tracking-tight leading-snug group-hover/card:text-brand-amber-dark transition-colors duration-500 flex flex-wrap items-baseline gap-x-2">
              <span>{project.titleMain}</span>
              {project.titleItalic && (
                <span className="text-brand-blue-light italic font-light text-base sm:text-lg lg:text-xl block sm:inline">
                  {project.titleItalic}
                </span>
              )}
            </h2>
            <p className="font-body text-sm sm:text-base text-brand-grey/85 font-light tracking-wide leading-relaxed mb-6">
              {project.desc}
            </p>
          </div>
          <div>
            <Link
              href="#"
              className="inline-flex items-center gap-1 font-body text-[11px] font-bold uppercase tracking-widest text-brand-charcoal group-hover/card:text-brand-amber-dark transition-colors duration-300 cursor-pointer"
              id={`project-learn-more-${project.id}`}
            >
              Learn More
              <ArrowRight size={12} className="group-hover/card:translate-x-1 transition-transform duration-300 text-brand-charcoal group-hover/card:text-brand-amber-dark" />
            </Link>
          </div>
        </article>
      </ScrollRevealCard>
    </div>
  )
}

export default function ProjectsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-brand-cream pt-36 pb-16 md:pt-44 md:pb-24 border-b border-brand-sand/30 relative" aria-labelledby="projects-hero-heading">
        {/* Editorial ambient light glows */}
        <div className="absolute top-[-10%] right-[-5%] w-[350px] h-[350px] bg-brand-amber/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute top-[10%] left-[-5%] w-[350px] h-[350px] bg-brand-blue-light/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="container-wide px-4 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 max-w-6xl mx-auto">
            {/* Left Side */}
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-cream/80 border border-brand-sand/60 text-xs font-bold tracking-widest text-brand-blue-light uppercase mb-6 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-amber animate-pulse-dot" />
                Our Work
              </span>
              <h1 id="projects-hero-heading" className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-blue leading-[1.15] mb-6">
                Seeds of <span className="italic font-normal text-brand-amber-dark">Change</span> in Action
              </h1>
              <p className="font-body text-brand-grey text-base sm:text-lg leading-relaxed max-w-xl">
                Building self-sustaining communities through education, healthcare, and targeted vocational programs that empower individuals to shape their own futures.
              </p>
            </div>

            {/* Right Side */}
            <div className="flex-shrink-0">
              <ScrollRevealCard delay={0.1}>
                <Link
                  href="#projects-listing"
                  className="btn-amber px-8 py-3.5 rounded-full text-brand-charcoal font-semibold shadow-md inline-flex items-center gap-2 text-sm hover:bg-brand-amber-dark transition-all hover:scale-105"
                  id="explore-all-projects-btn"
                >
                  Explore All Projects
                  <ArrowRight size={14} />
                </Link>
              </ScrollRevealCard>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section id="projects-listing" className="py-16 md:py-24 bg-white" aria-label="Dua Charitable Trust projects listing">
        <div className="container-wide px-4 lg:px-8">
          <div className="space-y-4 md:space-y-6">
            {projects.map((project) => (
              <ProjectRow key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
