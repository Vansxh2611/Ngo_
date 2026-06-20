export type PublicationType = 'blog' | 'achievement'

export interface PublicationItem {
  id: string
  type: PublicationType
  slug: string
  title: string
  excerpt: string
  coverImage: string
  publishDate: string
  category: string
  author?: string
  featured?: boolean
}

export const publicationsData: PublicationItem[] = [
  {
    id: '1',
    type: 'blog',
    slug: 'empowering-future-generations',
    title: 'Empowering Future Generations Through Education',
    excerpt: 'Our new scholarship program has reached over 1,200 students in rural areas, providing access to quality education and life-changing opportunities for underserved youth.',
    coverImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
    author: 'Fatima Ahmed',
    publishDate: '2026-06-10',
    category: 'Education',
    featured: true,
  },
  {
    id: '2',
    type: 'achievement',
    slug: '50k-milestone',
    title: '50,000 Beneficiaries Milestone Reached',
    excerpt: 'A landmark moment for Dua Trust — 50,000 lives touched across 6 key program domains with emergency aid, education support, and medical care.',
    coverImage: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=800&q=80',
    publishDate: '2026-05-01',
    category: 'Milestones',
  },
  {
    id: '3',
    type: 'blog',
    slug: 'maternal-health-initiative',
    title: 'Maternal Health Initiative Reaches 500 Villages',
    excerpt: 'Our mobile healthcare units have provided prenatal care to thousands of mothers across remote villages, reducing maternal mortality by 30%.',
    coverImage: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80',
    author: 'Dr. Raza Khan',
    publishDate: '2026-05-28',
    category: 'Healthcare',
  },
  {
    id: '4',
    type: 'blog',
    slug: 'community-food-program',
    title: 'Community Food Program Celebrates 3rd Year',
    excerpt: 'What started as a small initiative now feeds over 10,000 families monthly through our growing network of community kitchens.',
    coverImage: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80',
    author: 'Ahmed Siddiqui',
    publishDate: '2026-05-15',
    category: 'Community',
  },
  {
    id: '5',
    type: 'achievement',
    slug: 'ngo-award-2026',
    title: 'National NGO Excellence Award 2026',
    excerpt: 'Dua Charitable Trust has been recognized by the Ministry of Social Justice for outstanding and transparent community service in rural development.',
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    publishDate: '2026-04-15',
    category: 'Awards',
  },
  {
    id: '6',
    type: 'blog',
    slug: 'women-empowerment-skills',
    title: 'Skills Training Program Transforms 800 Women',
    excerpt: 'Our vocational training initiative has equipped 800 women with marketable skills, enabling financial independence and entrepreneurship.',
    coverImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
    author: 'Zara Hussain',
    publishDate: '2026-04-20',
    category: 'Projects',
  },
  {
    id: '7',
    type: 'blog',
    slug: 'annual-medical-camp',
    title: 'Annual Medical Camp: 3,000 Patients Treated',
    excerpt: 'Our largest free medical camp to date brought together 80+ doctors and specialists to provide healthcare to underserved communities.',
    coverImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    author: 'Dr. Nadia Rehman',
    publishDate: '2026-04-05',
    category: 'Events',
  },
  {
    id: '8',
    type: 'achievement',
    slug: '20th-anniversary',
    title: 'Two Decades of Compassion: 20th Anniversary',
    excerpt: 'Reflecting on 20 years of sustainable impact, restoring dignity, and creating community-led solutions for vulnerable populations.',
    coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    publishDate: '2026-03-15',
    category: 'Milestones',
  },
  {
    id: '9',
    type: 'blog',
    slug: 'tree-plantation-drive',
    title: '10,000 Trees Planted in Environmental Drive',
    excerpt: 'Community volunteers joined forces to plant 10,000 saplings across deforested areas, contributing to regional climate resilience.',
    coverImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80',
    author: 'Omar Khan',
    publishDate: '2026-03-21',
    category: 'Environment',
  },
  {
    id: '10',
    type: 'blog',
    slug: 'winter-relief-camp',
    title: 'Winter Relief Camp Distributed 5,000 Kits',
    excerpt: 'Emergency warm clothing and nutrition kits successfully reached flood-affected families in remote mountainous terrains before the peak of winter.',
    coverImage: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80',
    author: 'Dua Welfare Team',
    publishDate: '2025-12-10',
    category: 'Community',
  },
  {
    id: '11',
    type: 'achievement',
    slug: 'fundraiser-2025',
    title: '₹2 Crore Fundraiser Goal Surpassed',
    excerpt: 'Thanks to our global network of donors, our annual charity fundraiser exceeded expectations, securing funding for three major new projects.',
    coverImage: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80',
    publishDate: '2025-11-20',
    category: 'Campaigns',
  },
  {
    id: '12',
    type: 'blog',
    slug: 'scholarship-2025',
    title: 'Scholarship Fund Opens for 2025–26 Season',
    excerpt: 'Applications are officially open for 500 new academic scholarships supporting higher education for girls and marginalized youth.',
    coverImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
    author: 'Fatima Ahmed',
    publishDate: '2025-09-01',
    category: 'Education',
  },
]
