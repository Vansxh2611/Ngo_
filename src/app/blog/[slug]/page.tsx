import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar, User, Share2, Globe } from 'lucide-react'
import { formatDate } from '@/lib/utils'

// Placeholder — will be replaced with Sanity GROQ query in Phase 2
const getPost = (slug: string) => ({
  slug,
  title: 'Empowering Future Generations Through Education',
  excerpt: 'Our new scholarship program has reached over 1,200 students in rural areas.',
  coverImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=85',
  author: 'Fatima Ahmed',
  publishDate: '2026-06-10',
  category: 'Education',
  content: `
    Our education scholarship program has reached a significant milestone, providing access to
    quality learning for over 1,200 students across rural communities in Maharashtra and Rajasthan.

    The program, launched in early 2025, partners with local schools and colleges to identify
    promising students from economically disadvantaged backgrounds. Each scholarship covers tuition,
    books, and a monthly stipend to reduce the financial burden on families.

    "Before this scholarship, I was going to drop out to help my father in the fields," shares
    Arjun, a 16-year-old recipient from Nashik. "Now I'm studying engineering and I want to
    build water systems for villages like mine."

    The impact extends beyond individual students. As educated youth return to their communities,
    they become change-makers who uplift those around them — tutoring younger children, starting
    small businesses, and advocating for local infrastructure.

    In the next phase, we aim to expand the program to 5,000 students across 10 states,
    partnering with corporations, diaspora donors, and government schemes to create a
    sustainable funding model.
  `,
  relatedPosts: [
    { slug: 'maternal-health-initiative', title: 'Maternal Health Initiative Reaches 500 Villages', category: 'Healthcare', img: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&q=80' },
    { slug: 'community-food-program', title: 'Community Food Program Celebrates 3rd Year', category: 'Community', img: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&q=80' },
  ],
})

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
      type: 'article',
    },
  }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    image: post.coverImage,
    author: { '@type': 'Person', name: post.author },
    datePublished: post.publishDate,
    description: post.excerpt,
    publisher: {
      '@type': 'Organization',
      name: 'Dua Charitable Trust',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />

      {/* ════════ HERO IMAGE ════════ */}
      <section className="relative h-[50vh] sm:h-[60vh] rounded-b-[40px] overflow-hidden" aria-label="Article header image">
        <Image src={post.coverImage} alt={post.title} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F233B]/80 via-[#0F233B]/20 to-transparent" />
      </section>

      <div className="container-wide py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* ════════ ARTICLE BODY ════════ */}
          <article className="lg:col-span-2" aria-label={post.title}>
            {/* Back link */}
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-body text-brand-grey hover:text-brand-blue mb-6 transition-colors">
              <ArrowLeft size={14} /> Back to Blog
            </Link>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="badge-blue">{post.category}</span>
              <span className="flex items-center gap-1.5 text-xs text-brand-grey font-body">
                <Calendar size={12} /> {formatDate(post.publishDate)}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-brand-grey font-body">
                <User size={12} /> {post.author}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-brand-charcoal mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Content */}
            <div className="prose prose-lg max-w-none font-body text-brand-grey leading-relaxed space-y-4">
              {post.content.trim().split('\n\n').map((para, i) => (
                <p key={i}>{para.trim()}</p>
              ))}
            </div>

            {/* Share */}
            <div className="mt-10 pt-6 border-t border-brand-sand flex items-center gap-4">
              <span className="font-body text-sm font-medium text-brand-charcoal flex items-center gap-2">
                <Share2 size={14} /> Share:
              </span>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
                target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-brand-sand flex items-center justify-center
                           hover:bg-brand-blue hover:text-white transition-all duration-200 text-brand-grey"
                aria-label="Share on Twitter"
              >
                <Globe size={14} />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`/blog/${post.slug}`)}`}
                target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-brand-sand flex items-center justify-center
                           hover:bg-brand-blue hover:text-white transition-all duration-200 text-brand-grey"
                aria-label="Share on Facebook"
              >
                <Share2 size={14} />
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(post.title + ' https://duacharitabletrust.org/blog/' + post.slug)}`}
                target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-brand-sand flex items-center justify-center
                           hover:bg-[#25D366] hover:text-white transition-all duration-200 text-brand-grey text-xs font-bold"
                aria-label="Share on WhatsApp"
              >
                WA
              </a>
            </div>
          </article>

          {/* ════════ SIDEBAR ════════ */}
          <aside aria-label="Related posts and sidebar">
            <div className="sticky top-24 space-y-6">
              {/* Related Posts */}
              <div className="bg-white rounded-[28px] p-6 border border-brand-sand/35 shadow-card">
                <h2 className="font-heading font-bold text-brand-charcoal text-base mb-4">Related Posts</h2>
                <div className="space-y-4">
                  {post.relatedPosts.map((r) => (
                    <Link key={r.slug} href={`/blog/${r.slug}`} className="flex gap-3.5 group">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-brand-cream border border-brand-sand/20">
                        <Image src={r.img} alt={r.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="64px" />
                      </div>
                      <div className="flex flex-col justify-center min-w-0">
                        <span className="text-[9px] font-bold text-brand-blue uppercase tracking-wider mb-0.5">{r.category}</span>
                        <p className="font-body text-xs font-semibold text-brand-charcoal group-hover:text-brand-blue transition-colors leading-snug line-clamp-2">
                          {r.title}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-[#1A3A5C] via-[#11243B] to-[#1C1C1E] border border-white/10 rounded-[28px] p-6 text-center shadow-card-hover relative overflow-hidden group">
                {/* Gold ambient glow */}
                <div className="absolute -top-20 -right-20 w-44 h-44 bg-brand-amber/10 rounded-full blur-2xl pointer-events-none group-hover:scale-110 transition-transform duration-500" />
                
                <h3 className="font-heading !text-white font-bold text-lg mb-2 relative z-10">Support Our Work</h3>
                <p className="font-body text-white/80 text-xs mb-5 relative z-10">Your contribution directly funds maternal healthcare, education, and kitchen programs.</p>
                <Link href="/projects" className="btn-amber w-full justify-center text-xs font-semibold py-3 rounded-full relative z-10 cursor-pointer shadow-md hover:scale-102 transition-transform" id="article-donate-btn">
                  Donate Now
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
