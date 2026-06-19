export type CommunityMember = {
  id: string;          // stable ID
  slug: string;        // e.g. "sara-al-noor"
  name: string;
  role: 'DONOR' | 'VOLUNTEER' | 'STAFF' | 'PARTNER';
  focusTags: string[]; // e.g. ["Women Empowerment"]
  contributionTitle: string;
  contributionSummary: string; // the short description currently on the card
  joinedYear: string;
  location?: string;
  avatarSrc: string;
  heroImageSrc?: string;       // optional banner image
  longBio: string;             // 2–4 paragraphs
  impactStats?: Array<{
    label: string;
    value: string;
  }>;
};

export const communityMembers: CommunityMember[] = [
  {
    id: 'amina-rashid',
    slug: 'amina-rashid',
    name: 'Amina Rashid',
    role: 'DONOR',
    focusTags: ['Education', 'Girls Empowerment'],
    contributionTitle: '₹5 Lakh Annual Scholarship Fund',
    contributionSummary: 'Amina has funded over 40 scholarships, believing every girl deserves an education.',
    joinedYear: '2022',
    location: 'New Delhi, India',
    avatarSrc: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    heroImageSrc: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&q=80',
    longBio: 'Amina is a dedicated philanthropist who believes deeply in the transformative power of education. Born and raised in New Delhi, she pursued a successful career in financial technology before turning her focus towards social impact projects. She believes that education is the single most potent tool for breaking cycles of generational poverty, particularly for young girls in underserved areas.\n\nSince partnering with the Dua Charitable Trust in 2022, Amina has established a dedicated scholarship fund targeting girls who show academic promise but lack financial support. Her contributions go beyond funding; she also participates in quarterly mentoring sessions to guide the students through their academic journeys and inspire them to reach their full potential.',
    impactStats: [
      { label: 'Scholarship Fund', value: '₹5 Lakh / Yr' },
      { label: 'Girls Supported', value: '40+ Students' },
      { label: 'Success Rate', value: '100% Graduation' }
    ]
  },
  {
    id: 'rahul-mehta',
    slug: 'rahul-mehta',
    name: 'Rahul Mehta',
    role: 'VOLUNTEER',
    focusTags: ['Healthcare', 'Rural Outreach'],
    contributionTitle: '200+ Medical Camp Hours',
    contributionSummary: 'A retired doctor who spends weekends at mobile health camps across rural Maharashtra.',
    joinedYear: '2021',
    location: 'Pune, Maharashtra',
    avatarSrc: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    heroImageSrc: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=1200&q=80',
    longBio: 'Dr. Rahul Mehta is a retired general practitioner with over 35 years of clinical experience. After winding down his private clinic in Pune, Rahul wanted to dedicate his skills and remaining active years to community health services. He joined Dua Trust as a medical volunteer in 2021 and has since been a pillar of our rural health outreach program.\n\nRahul coordinates and leads weekend mobile medical camps that travel to remote hamlets across Maharashtra. He provides primary care diagnosis, basic treatments, and crucial health awareness workshops. His warm, empathetic approach has built deep trust with rural families who often lack access to regular clinics.',
    impactStats: [
      { label: 'Volunteer Hours', value: '200+ Hours' },
      { label: 'Patients Diagnosed', value: '1,200+' },
      { label: 'Camps Led', value: '24 Camps' }
    ]
  },
  {
    id: 'sara-al-noor',
    slug: 'sara-al-noor',
    name: 'Sara Al-Noor',
    role: 'DONOR',
    focusTags: ['Women Empowerment', 'Vocational Skills'],
    contributionTitle: 'Skills Lab Equipment Donor',
    contributionSummary: 'Sara donated equipment for 3 vocational training labs, empowering 300 women annually.',
    joinedYear: '2023',
    location: 'Mumbai, Maharashtra',
    avatarSrc: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
    heroImageSrc: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1200&q=80',
    longBio: 'Sara Al-Noor is an entrepreneur and fashion designer who has dedicated her philanthropic efforts to helping women achieve economic independence. She believes that true empowerment comes from self-reliance and the acquisition of marketable vocational skills. After visiting one of the Dua Trust center sites, she decided to sponsor three new vocational lab training sites.\n\nHer support has equipped these centers with sewing machines, computer systems, and design software. She also facilitates guest lectures from industry professionals to help trainees understand market trends and start their own tailoring or micro-enterprises.',
    impactStats: [
      { label: 'Vocational Labs', value: '3 Sponsored' },
      { label: 'Trainees Annually', value: '300+ Women' },
      { label: 'Employment Rate', value: '85%' }
    ]
  },
  {
    id: 'imran-syed',
    slug: 'imran-syed',
    name: 'Imran Syed',
    role: 'VOLUNTEER',
    focusTags: ['Environment', 'Youth Outreach'],
    contributionTitle: 'Led 5 Plantation Drives',
    contributionSummary: 'Imran coordinates tree plantation campaigns with local youth groups across 4 cities.',
    joinedYear: '2020',
    location: 'Hyderabad, India',
    avatarSrc: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    heroImageSrc: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&q=80',
    longBio: 'Imran Syed is an environmentalist and community coordinator. He began volunteering with the Dua Trust during his college years, organizing local neighborhood cleanups. Recognizing a critical need for urban afforestation, he initiated tree plantation drives and community gardening projects in major cities.\n\nToday, Imran leads a network of young green volunteers across Hyderabad, Mumbai, Bangalore, and Pune. He coordinates with local municipal corporations to acquire saplings, secure planting zones, and ensure long-term care for the planted forests. He also leads workshops in local schools teaching kids about biodiversity.',
    impactStats: [
      { label: 'Drives Conducted', value: '5 Large-Scale' },
      { label: 'Trees Planted', value: '10,000+' },
      { label: 'Youth Recruited', value: '150+ Volunteers' }
    ]
  },
  {
    id: 'priya-sharma',
    slug: 'priya-sharma',
    name: 'Priya Sharma',
    role: 'VOLUNTEER',
    focusTags: ['Education', 'Tech Training'],
    contributionTitle: '500+ Teaching Hours',
    contributionSummary: 'A software engineer by day, Priya runs weekend coding classes for underprivileged teens.',
    joinedYear: '2022',
    location: 'Bangalore, Karnataka',
    avatarSrc: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    heroImageSrc: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80',
    longBio: 'Priya Sharma is a software engineer working at a major tech firm in Bangalore. Believing that tech literacy is the gateway to high-opportunity careers, she began volunteering with the trust to teach basic computer science and programming to teens in underprivileged neighborhoods.\n\nOn weekends, Priya runs interactive coding labs, introducing students to HTML, CSS, and basic JavaScript. She also hosts resume workshops and mentoring circles, helping students prepare for higher education and career paths in the tech sector. Her courses have inspired several students to pursue degrees in computer applications.',
    impactStats: [
      { label: 'Teaching Hours', value: '500+ Hours' },
      { label: 'Students Mentored', value: '120+' },
      { label: 'Placements/Admissions', value: '15 Students' }
    ]
  },
  {
    id: 'khalid-farooq',
    slug: 'khalid-farooq',
    name: 'Khalid Farooq',
    role: 'DONOR',
    focusTags: ['Emergency Relief', 'Community Welfare'],
    contributionTitle: 'Emergency Relief Corpus Donor',
    contributionSummary: 'Khalid established a dedicated corpus fund that activates automatically during disasters.',
    joinedYear: '2019',
    location: 'Kolkata, West Bengal',
    avatarSrc: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    heroImageSrc: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1200&q=80',
    longBio: 'Khalid Farooq is a businessman with deep roots in East India. Having witnessed the devastation caused by regional floods and cyclones, Khalid committed to creating a dedicated disaster response resource that could deploy help without delay. In 2019, he partnered with Dua Trust to establish our Emergency Relief Corpus.\n\nThis fund is structured to trigger immediate logistical and relief material deployment during cyclones, floods, and earthquakes. Thanks to Khalid\'s foresight and persistent backing, Dua Trust has been able to provide food, shelter, and medical kits to affected families within hours of disaster strikes.',
    impactStats: [
      { label: 'Corpus Established', value: '2019' },
      { label: 'Disasters Responded', value: '6 Deployments' },
      { label: 'Families Helped', value: '8,000+' }
    ]
  },
  {
    id: 'nadia-hussain',
    slug: 'nadia-hussain',
    name: 'Nadia Hussain',
    role: 'VOLUNTEER',
    focusTags: ['Community Welfare', 'Food Security'],
    contributionTitle: 'Community Kitchen Coordinator',
    contributionSummary: 'Nadia manages 3 community kitchens, coordinating 50+ volunteers to feed 2,000 families.',
    joinedYear: '2023',
    location: 'Mumbai, Maharashtra',
    avatarSrc: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80',
    heroImageSrc: 'https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?w=1200&q=80',
    longBio: 'Nadia Hussain is a retired nutritionist who spends her time managing public nutrition and food programs. Realizing that nutritional insecurity severely impacts children\'s physical and mental development, she volunteered to expand and streamline Dua Trust\'s community kitchen efforts in urban slums.\n\nNadia oversees three kitchens, ensuring high nutritional standards, hygienic food prep, and efficient volunteer schedules. She coordinates with wholesale vegetable markets and food surplus organizations to minimize food waste while serving hot, balanced meals to thousands of families every week.',
    impactStats: [
      { label: 'Kitchens Managed', value: '3 Centers' },
      { label: 'Active Volunteers', value: '50+ Team' },
      { label: 'Meals Served', value: '2,000+ Families/Wk' }
    ]
  },
  {
    id: 'arjun-patel',
    slug: 'arjun-patel',
    name: 'Arjun Patel',
    role: 'DONOR',
    focusTags: ['Healthcare', 'Rural Outreach'],
    contributionTitle: 'Mobile Medical Unit Sponsor',
    contributionSummary: 'Arjun sponsored 2 mobile medical units, bringing healthcare to 60+ remote villages.',
    joinedYear: '2021',
    location: 'Ahmedabad, Gujarat',
    avatarSrc: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
    heroImageSrc: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80',
    longBio: 'Arjun Patel is a corporate executive who strongly believes in improving access to healthcare. After reading about the health disparities faced by tribal and remote villages in Gujarat and Maharashtra, Arjun sponsored two fully equipped mobile medical units.\n\nThese vehicles are staffed with a nurse, diagnostic equipment, and essential pharmacy stocks. They complete weekly rounds to remote villages, providing regular diabetes screenings, maternal health checks, and child immunization support. Arjun continues to support operational funds to expand their reach.',
    impactStats: [
      { label: 'Mobile Units', value: '2 Sponsored' },
      { label: 'Villages Covered', value: '60+ Villages' },
      { label: 'Monthly Checkups', value: '900+ Patients' }
    ]
  }
];
