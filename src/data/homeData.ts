export type DepartmentId =
  | 'cyber-security'
  | 'database'
  | 'graphics'
  | 'networking'
  | 'marketing'
  | 'government'
  | 'web-dev';

export interface DepartmentItem {
  id: DepartmentId;
  title: string;
  subtitle: string;
  coursesCount: number;
  stackSummary: string;
}

export interface CourseItem {
  id: string;
  departmentId: DepartmentId;
  categoryLabel: string;
  title: string;
  subtitle: string;
  rating: string;
  reviewsCount: string;
  studentsCount: string;
  durationMonths: number;
  classesCount: number;
  mode: 'Offline + Online' | 'Live Online' | 'On-Campus Lab';
  offlineFee: string;
  onlineFee: string;
  weeklyHoursMin: number;
  weeklyHoursMax: number;
  shifts: ('Morning' | 'Afternoon' | 'Evening / Weekend')[];
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  goalTag: 'Design & Creative' | 'Coding & Web' | 'Cyber & Networking' | 'Marketing & Freelancing';
  posterTheme: 'purple' | 'navy' | 'cyan' | 'cobalt' | 'crimson' | 'indigo';
  posterTitle: string;
  posterHighlight: string;
  posterSub: string;
  syllabus: string[];
}

export interface SuccessStoryItem {
  id: string;
  name: string;
  location: string;
  course: string;
  beforeRole: string;
  currentRole: string;
  monthlyOutcome: string;
  timeframe: string;
  quote: string;
  avatarHue: string;
  avatarImage?: string;
}

export interface TrainerItem {
  id: string;
  name: string;
  role: string;
  department: string;
  rating: string;
  projects: string;
  students: string;
  experience: string;
  message: string;
  accentHue: 'emerald' | 'sky' | 'amber' | 'violet' | 'teal' | 'rose';
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  featured?: boolean;
  fullText: string;
  visualTone: 'emerald' | 'teal' | 'slate' | 'amber' | 'indigo';
}

export interface BlogItem {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  visualTone: 'analytics' | 'freelance' | 'fullstack' | 'design' | 'cyber' | 'ai';
  image?: string;
  fullText: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface BranchItem {
  id: string;
  city: string;
  address: string;
  phones: string[];
  email: string;
  mapImage: string;
  mapUrl: string;
}

export interface MemberItem {
  id: string;
  shortCode: string;
  name: string;
  category: string;
  description: string;
}

export interface StudentTestimonialItem {
  id: string;
  name: string;
  courseTrack: string;
  rating: number;
  quote: string;
  hue: 'emerald' | 'sky' | 'amber' | 'violet' | 'teal' | 'rose' | 'indigo';
  avatarImage?: string;
}

export const TRUST_STATS = [
  {
    id: 'entrepreneurs',
    value: '4K+',
    title: 'Entrepreneurs Built',
    body: 'Agency founders & studio leads launched from campus.',
    featured: false,
  },
  {
    id: 'students',
    value: '100,000+',
    title: 'Students Trained',
    body: 'Hands-on IT graduates across 42+ district campuses.',
    featured: true,
  },
  {
    id: 'freelancers',
    value: '410K+',
    title: 'Successful Freelancers',
    body: 'Verified earners working on Upwork, Fiverr & direct clients.',
    featured: false,
  },
  {
    id: 'placements',
    value: '180K+',
    title: 'Job Placements',
    body: 'Graduates placed in local & remote engineering teams.',
    featured: false,
  },
];

export const DEPARTMENTS: DepartmentItem[] = [
  {
    id: 'cyber-security',
    title: 'Cyber Security',
    subtitle: 'Professional Cyber Security & Ethical Hacking',
    coursesCount: 4,
    stackSummary: 'CEHv13 · SOC · Kali',
  },
  {
    id: 'database',
    title: 'Database Management',
    subtitle: 'Professional Diploma in Database Architecture',
    coursesCount: 3,
    stackSummary: 'PostgreSQL · Oracle · SQL',
  },
  {
    id: 'graphics',
    title: 'Graphics Design',
    subtitle: 'Professional Diploma in Graphics & UI/UX Design',
    coursesCount: 6,
    stackSummary: 'Figma · Illustrator · AI',
  },
  {
    id: 'networking',
    title: 'Networking',
    subtitle: 'CCNA, MikroTik & Enterprise Server Infrastructure',
    coursesCount: 5,
    stackSummary: 'CCNA · MikroTik · CCTV',
  },
  {
    id: 'marketing',
    title: 'Digital Marketing',
    subtitle: 'SEO, Performance Ads & Freelance Growth Strategy',
    coursesCount: 5,
    stackSummary: 'GA4 · SEO · Meta Ads',
  },
  {
    id: 'government',
    title: 'Government Course',
    subtitle: 'NSDA & ICT Division Funded Skill Programs',
    coursesCount: 4,
    stackSummary: 'NSDA · ICT · 64 Districts',
  },
];

export const COURSE_TABS: { id: 'all' | DepartmentId; label: string }[] = [
  { id: 'all', label: 'All Courses' },
  { id: 'graphics', label: 'Graphics & Multimedia' },
  { id: 'cyber-security', label: 'Cyber Security' },
  { id: 'marketing', label: 'Digital Marketing' },
  { id: 'web-dev', label: 'Web Development' },
  { id: 'networking', label: 'Networking & Hardware' },
];

export const COURSES: CourseItem[] = [
  {
    id: 'graphics-design',
    departmentId: 'graphics',
    categoryLabel: 'Graphics & Multimedia',
    title: 'Graphics Design & UI/UX',
    subtitle: 'Master End-to-End Brand Identity, UI/UX, Print & AI-Powered Design Workflows',
    rating: '4.9',
    reviewsCount: '4,000',
    studentsCount: '6,400+',
    durationMonths: 8,
    classesCount: 104,
    mode: 'Offline + Online',
    offlineFee: 'BDT 20,000',
    onlineFee: 'BDT 10,000',
    weeklyHoursMin: 4,
    weeklyHoursMax: 10,
    shifts: ['Morning', 'Afternoon', 'Evening / Weekend'],
    level: 'Beginner',
    goalTag: 'Design & Creative',
    posterTheme: 'purple',
    posterTitle: 'Professional',
    posterHighlight: 'GRAPHIC DESIGN',
    posterSub: 'For Freelancing & Studio',
    syllabus: [
      'Adobe Photoshop & Illustrator Studio Mastery',
      'Brand Identity, Packaging & Print Production',
      'Figma UI/UX Systems & Client Portfolio Build',
      'Fiverr, Upwork & Behance Client Acquisition',
    ],
  },
  {
    id: 'ethical-hacker',
    departmentId: 'cyber-security',
    categoryLabel: 'Cyber Security',
    title: 'Certified Ethical Hacker (CEHv13)',
    subtitle: 'Complete Penetration Testing, SOC Operations & AI-Assisted Threat Defense',
    rating: '4.9',
    reviewsCount: '2,850',
    studentsCount: '4,200+',
    durationMonths: 8,
    classesCount: 104,
    mode: 'Offline + Online',
    offlineFee: 'BDT 60,000',
    onlineFee: 'BDT 30,000',
    weeklyHoursMin: 8,
    weeklyHoursMax: 16,
    shifts: ['Afternoon', 'Evening / Weekend'],
    level: 'Intermediate',
    goalTag: 'Cyber & Networking',
    posterTheme: 'navy',
    posterTitle: 'Certified',
    posterHighlight: 'Ethical Hacker',
    posterSub: 'CEHv13 Powered By AI',
    syllabus: [
      'Network Reconnaissance, Scanning & Enumeration',
      'Web Application & API Vulnerability Testing',
      'Active Directory Exploitation & Defense Labs',
      'SOC Monitoring, SIEM & Bug Bounty Workflows',
    ],
  },
  {
    id: 'digital-marketing',
    departmentId: 'marketing',
    categoryLabel: 'Digital Marketing',
    title: 'Professional Digital Marketing',
    subtitle: 'Turn Analytics, SEO, Meta/Google Ads & Funnel Strategy into Global Retainers',
    rating: '4.9',
    reviewsCount: '3,600',
    studentsCount: '7,100+',
    durationMonths: 6,
    classesCount: 78,
    mode: 'Offline + Online',
    offlineFee: 'BDT 35,000',
    onlineFee: 'BDT 18,000',
    weeklyHoursMin: 4,
    weeklyHoursMax: 8,
    shifts: ['Morning', 'Evening / Weekend'],
    level: 'Beginner',
    goalTag: 'Marketing & Freelancing',
    posterTheme: 'cyan',
    posterTitle: 'Professional',
    posterHighlight: 'DIGITAL MARKETING',
    posterSub: 'For Freelancing & Agencies',
    syllabus: [
      'Technical & Content SEO with GA4 & Search Console',
      'Meta Business Suite & Performance Ad Scaling',
      'Google Ads Search, Shopping & Conversion Tracking',
      'International Agency Pitching & Retainer Systems',
    ],
  },
  {
    id: 'it-support-cctv',
    departmentId: 'networking',
    categoryLabel: 'Networking & Hardware',
    title: 'IT Support, Networking & CCTV',
    subtitle: 'Hands-On CCNA Routing, MikroTik Configuration & Enterprise CCTV Deployment',
    rating: '4.8',
    reviewsCount: '2,100',
    studentsCount: '5,300+',
    durationMonths: 6,
    classesCount: 84,
    mode: 'Offline + Online',
    offlineFee: 'BDT 40,000',
    onlineFee: 'BDT 22,000',
    weeklyHoursMin: 6,
    weeklyHoursMax: 12,
    shifts: ['Morning', 'Afternoon'],
    level: 'Beginner',
    goalTag: 'Cyber & Networking',
    posterTheme: 'cobalt',
    posterTitle: 'Professional',
    posterHighlight: 'IT SUPPORT & CCTV',
    posterSub: 'CCNA & MikroTik Lab Track',
    syllabus: [
      'Enterprise Hardware Troubleshooting & Windows Server',
      'Cisco CCNA Switching, VLANs & OSPF Routing',
      'MikroTik ISP Bandwidth & Firewall Management',
      'IP Camera NVR Architecture & Structured Cabling',
    ],
  },
  {
    id: 'wordpress-theme',
    departmentId: 'web-dev',
    categoryLabel: 'Web Development',
    title: 'WordPress Theme & WooCommerce',
    subtitle: 'Build Custom Themes, High-Speed E-Commerce Stores & Freelance Client Sites',
    rating: '4.9',
    reviewsCount: '3,120',
    studentsCount: '5,800+',
    durationMonths: 5,
    classesCount: 64,
    mode: 'Offline + Online',
    offlineFee: 'BDT 15,000',
    onlineFee: 'BDT 10,000',
    weeklyHoursMin: 4,
    weeklyHoursMax: 10,
    shifts: ['Morning', 'Afternoon', 'Evening / Weekend'],
    level: 'Beginner',
    goalTag: 'Coding & Web',
    posterTheme: 'crimson',
    posterTitle: 'Customization',
    posterHighlight: 'WordPress Theme',
    posterSub: 'WooCommerce & Custom Blocks',
    syllabus: [
      'HTML5, CSS3, Tailwind & Modern Responsive Layouts',
      'Elementor Pro, ACF & Custom Post Type Architecture',
      'WooCommerce Payment Gateways & Speed Optimization',
      'Security Hardening & Marketplace Gig Launch',
    ],
  },
  {
    id: 'web-app-laravel',
    departmentId: 'web-dev',
    categoryLabel: 'Web Development',
    title: 'Web Application Development',
    subtitle: 'Full-Stack Engineering with PHP, Laravel, Vue.js, REST APIs & Cloud Deployment',
    rating: '4.9',
    reviewsCount: '3,950',
    studentsCount: '6,000+',
    durationMonths: 8,
    classesCount: 104,
    mode: 'Offline + Online',
    offlineFee: 'BDT 30,000',
    onlineFee: 'BDT 20,000',
    weeklyHoursMin: 8,
    weeklyHoursMax: 16,
    shifts: ['Afternoon', 'Evening / Weekend'],
    level: 'Intermediate',
    goalTag: 'Coding & Web',
    posterTheme: 'indigo',
    posterTitle: 'Full-Stack',
    posterHighlight: 'WEB APPLICATION',
    posterSub: 'Using PHP, Laravel & Vue.js',
    syllabus: [
      'Modern JavaScript, TypeScript & Vue 3 Composition API',
      'OOP PHP 8, Laravel MVC & Eloquent ORM Architecture',
      'Multi-Tenant SaaS APIs, Auth & Payment Integration',
      'Linux VPS Deployment, CI/CD & Technical Interviews',
    ],
  },
];

export const SUCCESS_STORIES: SuccessStoryItem[] = [
  {
    id: 'tahmid-hasan',
    name: 'Tahmid Hasan',
    location: 'Bogura Campus · Batch 42',
    course: 'Web Application Development',
    beforeRole: 'University Undergraduate',
    currentRole: 'Top-Rated Full-Stack Freelancer, Upwork',
    monthlyOutcome: '$2,800 / month within 7 months',
    timeframe: 'Graduated Nov 2025',
    quote:
      'Joining the evening Laravel lab completely changed my trajectory. Within four months of completing my capstone SaaS project, I secured two long-term European SaaS retainers from Bogura.',
    avatarHue: 'emerald',
    avatarImage: '/assets/students/tahmid-hasan.jpg',
  },
  {
    id: 'farhana-akter',
    name: 'Farhana Akter',
    location: 'Dhaka Mirpur · Batch 38',
    course: 'Graphics Design & UI/UX',
    beforeRole: 'Homemaker & Part-time Tutor',
    currentRole: 'Level 2 Brand & UI Designer, Fiverr',
    monthlyOutcome: '$1,650 / month recurring clients',
    timeframe: 'Graduated Aug 2025',
    quote:
      'The daily portfolio critiques and live marketplace bid reviews helped me land my first international branding client in week nine. Today I lead a three-person remote design studio.',
    avatarHue: 'teal',
    avatarImage: '/assets/students/farhana-akter.jpg',
  },
  {
    id: 'rafiqul-islam',
    name: 'Rafiqul Islam',
    location: 'Chattogram · Batch 51',
    course: 'Certified Ethical Hacker (CEHv13)',
    beforeRole: 'Junior IT Assistant',
    currentRole: 'SOC Analyst, FinTech Security Group',
    monthlyOutcome: 'BDT 95,000 / mo + Bug Bounties',
    timeframe: 'Graduated Jan 2026',
    quote:
      'Hands-on penetration testing labs and realistic SIEM incident drills gave me the exact confidence interviewers tested for. I cleared my technical round on the first attempt.',
    avatarHue: 'indigo',
    avatarImage: '/assets/students/tanvir-ahmed.jpg',
  },
  {
    id: 'mehedi-mim',
    name: 'Mehedi & Sumaiya',
    location: 'Sylhet · Live Online Track',
    course: 'Professional Digital Marketing',
    beforeRole: 'Fresh Graduates',
    currentRole: 'Co-Founders, ScaleCraft Agency',
    monthlyOutcome: '$4,200 / mo across 6 US clients',
    timeframe: 'Graduated Oct 2025',
    quote:
      'Instead of theory slides, we ran real GA4 audits and Meta conversion campaigns in class. Having 24/7 mentor review on client proposals gave us an unfair edge.',
    avatarHue: 'amber',
    avatarImage: '/assets/students/sumaiya-akter.jpg',
  },
  {
    id: 'tanvir-ahmed',
    name: 'Tanvir Ahmed',
    location: 'Rajshahi Campus · Batch 39',
    course: 'Web Application Development',
    beforeRole: 'Diploma Student',
    currentRole: 'Remote Full-Stack Engineer, Toptal',
    monthlyOutcome: '$3,100 / month within 6 months',
    timeframe: 'Graduated Dec 2025',
    quote:
      'Building real client APIs and shipping Vue 3 dashboards during lab hours gave me the exact portfolio I needed to pass technical vetting on Toptal.',
    avatarHue: 'sky',
  },
  {
    id: 'sabina-yasmin',
    name: 'Sabina Yasmin',
    location: 'Khulna Campus · Batch 44',
    course: 'Professional Digital Marketing',
    beforeRole: 'College Lecturer',
    currentRole: 'Growth Marketing Strategist, Remote US',
    monthlyOutcome: '$2,400 / month recurring retainers',
    timeframe: 'Graduated Sep 2025',
    quote:
      'The evening online cohort fit smoothly around my teaching schedule. I launched 4 high-ROI Meta campaigns during class and earned back my tuition in month two.',
    avatarHue: 'rose',
  },
  {
    id: 'imran-hossain',
    name: 'Imran Hossain',
    location: 'Cumilla Campus · Batch 33',
    course: 'Certified Ethical Hacker (CEHv13)',
    beforeRole: 'Hardware Support Tech',
    currentRole: 'Cloud Security & Penetration Tester',
    monthlyOutcome: 'BDT 110,000 / mo + Bounties',
    timeframe: 'Graduated Jul 2025',
    quote:
      'Realistic Active Directory attack scenarios and SIEM incident drills gave me the exact hands-on edge that enterprise security teams look for.',
    avatarHue: 'violet',
  },
  {
    id: 'nusrat-jahan',
    name: 'Nusrat Jahan',
    location: 'Dhaka Dhanmondi · Batch 40',
    course: 'Graphics Design & UI/UX',
    beforeRole: 'Fine Arts Graduate',
    currentRole: 'Senior Product Designer, SaaS Studio',
    monthlyOutcome: '$3,600 / month contract',
    timeframe: 'Graduated Jan 2026',
    quote:
      'From design system tokens in Figma to clickable prototypes and developer handoffs, ELE mentors pushed my craft to international standard.',
    avatarHue: 'emerald',
  },
];

export const TRAINERS: TrainerItem[] = [
  {
    id: 'arifur-rahman',
    name: 'Arifur Rahman',
    role: 'Principal Cyber Security Architect',
    department: 'Digital Marketing & Security',
    rating: '4.9',
    projects: '120+',
    students: '2500+',
    experience: '4+',
    message:
      'Build one real workflow every single week - consistency turns curious learners into global automation engineers',
    accentHue: 'emerald',
  },
  {
    id: 'nusrat-jahan',
    name: 'Nusrat Jahan',
    role: 'Senior Product & UI/UX Designer',
    department: 'Digital Marketing & Design',
    rating: '4.9',
    projects: '120+',
    students: '2500+',
    experience: '4+',
    message:
      'Build one real workflow every single week - consistency turns curious learners into global automation engineers',
    accentHue: 'teal',
  },
  {
    id: 'mahmudul-hasan',
    name: 'Mahmudul Hasan',
    role: 'Staff Laravel & Vue.js Engineer',
    department: 'Web Application Development',
    rating: '4.9',
    projects: '120+',
    students: '2,800+',
    experience: '7+ yrs',
    message:
      'Every student ships three production-grade repositories and learns how to pass technical client calls.',
    accentHue: 'sky',
  },
  {
    id: 'sadia-afrin',
    name: 'Sadia Afrin',
    role: 'Performance Marketing Strategist',
    department: 'Digital Marketing & Analytics',
    rating: '4.8',
    projects: '210+',
    students: '3,500+',
    experience: '7+ yrs',
    message:
      'Master attribution, creative testing, and clear client reporting—and international retainers will follow.',
    accentHue: 'amber',
  },
];

export const AT_A_GLANCE_METRICS = [
  {
    id: 'branches',
    value: '42+',
    title: 'District Branches',
    body: 'Modern IT campuses operating across Bangladesh.',
  },
  {
    id: 'mentors',
    value: '150+',
    title: 'Industry Mentors',
    body: 'Active practitioners leading daily lab reviews.',
  },
  {
    id: 'tracks',
    value: '28+',
    title: 'Career Tracks',
    body: 'Updated 2026 curricula for global remote work.',
  },
  {
    id: 'completion',
    value: '92%',
    title: 'Completion Rate',
    body: 'Consistent accountability with assistant lab support.',
  },
  {
    id: 'support',
    value: '24/7',
    title: 'Freelance Support',
    body: 'Dedicated proposal review & client pitch desk.',
  },
  {
    id: 'districts',
    value: '64',
    title: 'Districts Reached',
    body: 'Campus labs and live online studio access.',
  },
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 'nsda-mou',
    title: 'জাতীয় দক্ষতা উন্নয়ন কর্তৃপক্ষের (NSDA) সাথে ই-লার্নিং অ্যান্ড আর্নিং-এর নতুন স্কলারশিপ চুক্তি স্বাক্ষরিত',
    excerpt:
      'দেশের ৮টি বিভাগের তরুণ-তরুণীদের জন্য আন্তর্জাতিক মানের ফ্রিল্যান্সিং ও আইটি প্রশিক্ষণে ৪০% থেকে ১০০% পর্যন্ত মেধা বৃত্তি চালু করা হয়েছে।',
    category: 'Institutional Partnership',
    date: '14 Oct 2026',
    readTime: '3 min read',
    featured: true,
    visualTone: 'emerald',
    fullText:
      'ই-লার্নিং অ্যান্ড আর্নিং লিমিটেড এবং জাতীয় দক্ষতা উন্নয়ন কর্তৃপক্ষের (NSDA) যৌথ উদ্যোগে ২০২৬-২৭ অর্থবছরের জন্য নতুন স্কিল ডেভেলপমেন্ট প্রোগ্রাম ঘোষণা করা হয়েছে। এই চুক্তির আওতায় দেশের ৪২টিরও বেশি জেলা শাখায় ওয়েব ডেভেলপমেন্ট, গ্রাফিক্স ডিজাইন, সাইবার সিকিউরিটি এবং ডিজিটাল মার্কেটিং বিষয়ে হাতে-কলমে প্রশিক্ষণ এবং জাতীয় সনদ প্রদান করা হবে।',
  },
  {
    id: 'dhaka-lab-launch',
    title: 'ঢাকা ও চট্টগ্রাম ক্যাম্পাসে আধুনিক এআই-রেডি ফ্রিল্যান্সিং ল্যাব উদ্বোধন',
    excerpt: 'হাই-পারফরম্যান্স ওয়ার্কস্টেশন এবং ডেডিকেটেড মেন্টর কর্নার নিয়ে নতুন দুটি ল্যাব চালু।',
    category: 'Campus Expansion',
    date: '08 Oct 2026',
    readTime: '2 min read',
    visualTone: 'teal',
    fullText:
      'শিক্ষার্থীদের প্রজেক্ট-ভিত্তিক অনুশীলন আরও বেগবান করতে ঢাকা কল্যাণপুর প্রধান ক্যাম্পাস এবং চট্টগ্রাম শাখায় মোট ১২০টি নতুন ওয়ার্কস্টেশন সংযুক্ত করা হয়েছে। প্রতিটি ল্যাবে রিয়েল-টাইম কোড ও ডিজাইন রিভিউ সুবিধা থাকছে।',
  },
  {
    id: 'client-hunting-workshop',
    title: 'নতুন ফ্রিল্যান্সারদের জন্য পেমেন্ট গেটওয়ে ও ক্লায়েন্ট হান্টিং বুটক্যাম্প সম্পন্ন',
    excerpt: 'আন্তর্জাতিক মার্কেটপ্লেস ও ডিরেক্ট আউটরিচ কৌশল নিয়ে অংশগ্রহণ করেন ১,২০০ শিক্ষার্থী।',
    category: 'Workshop',
    date: '02 Oct 2026',
    readTime: '3 min read',
    visualTone: 'amber',
    fullText:
      'সফল ফ্রিল্যান্সারদের প্রত্যক্ষ তত্ত্বাবধানে পোর্টফোলিও সাজানো, প্রপোজাল লেখা এবং Payoneer/ব্যাংকিং সেটআপ নিয়ে দিনব্যাপী ওয়ার্কশপ অনুষ্ঠিত হয়েছে।',
  },
  {
    id: 'ict-division-project',
    title: 'সরকারি প্রজেক্টের অধীনে ১০,০০০ তরুণ-তরুণীর বিনামূল্যে আইটি প্রশিক্ষণ শুরু',
    excerpt: 'জেলা পর্যায়ের শিক্ষিত বেকার যুবকদের আত্মকর্মসংস্থানে ৬ মাসব্যাপী বিশেষায়িত ব্যাচ।',
    category: 'Government Project',
    date: '25 Sep 2026',
    readTime: '4 min read',
    visualTone: 'indigo',
    fullText:
      'তথ্য ও যোগাযোগ প্রযুক্তি বিভাগের সহযোগিতায় দেশের ৬৪ জেলার তরুণ-তরুণীদের জন্য দক্ষতা উন্নয়ন ও ফ্রিল্যান্সিং প্রশিক্ষণের নতুন ধাপ শুরু হয়েছে।',
  },
  {
    id: 'remote-job-fair',
    title: 'রিমোট জব ফেয়ার ২০২৬: দেশি-বিদেশি ৩৫টি টেক কোম্পানির সরাসরি নিয়োগ',
    excerpt: 'ইএলই গ্র্যাজুয়েটদের মধ্য থেকে ২৮০ জন শিক্ষার্থী অন-স্পট ইন্টার্নশিপ ও চাকরির অফার পেয়েছেন।',
    category: 'Career Placement',
    date: '18 Sep 2026',
    readTime: '3 min read',
    visualTone: 'slate',
    fullText:
      'ই-লার্নিং অ্যান্ড আর্নিং লিমিটেডের ক্যারিয়ার প্লেসমেন্ট সেলের আয়োজনে অনুষ্ঠিত জব ফেয়ারে সফটওয়্যার ফার্ম, ক্রিয়েটিভ এজেন্সি এবং সিকিউরিটি টিমগুলো সরাসরি নিয়োগ প্রক্রিয়া পরিচালনা করে।',
  },
];

export const BLOG_POSTS: BlogItem[] = [
  {
    id: 'eeat-ai-era',
    title: 'E-E-A-T in the AI Era: A Practical Guide for 2026',
    excerpt:
      'How Bangladeshi SEO specialists and content strategists structure first-hand expertise, GA4 attribution, and verifiable authority signals.',
    author: 'Sadia Afrin',
    date: '2026-09-04',
    readTime: '6 min read',
    category: 'Digital Marketing',
    visualTone: 'analytics',
    image: '/assets/blogs/blog_cover_1.jpg',
    fullText:
      'Search engines in 2026 heavily reward verifiable human experience, structured technical schema, and authentic data citations. In this guide, we walk through how to pair Google Analytics 4 engagement cohorts with original case-study evidence so your freelance client sites rank reliably.',
  },
  {
    id: 'first-1000-upwork',
    title: 'How to Land Your First $1,000 Client on Upwork from Bangladesh',
    excerpt:
      'A step-by-step breakdown of niche specialization, diagnostic Loom audits, and pricing structures that outperform generic proposals.',
    author: 'Nusrat Jahan',
    date: '2026-08-22',
    readTime: '5 min read',
    category: 'How To Guide',
    visualTone: 'freelance',
    image: '/assets/blogs/blog_cover_2.jpg',
    fullText:
      'Top-earning freelancers rarely compete on lowest hourly rate. By presenting a focused 3-project portfolio and sending a concise 90-second video audit of the client’s current product or website, conversion rates rise dramatically even on new profiles.',
  },
  {
    id: 'laravel-vue-roadmap',
    title: 'Full-Stack Roadmap: PHP, Laravel & Vue.js Production Architecture',
    excerpt:
      'Why Laravel + Vue continues to dominate agency contracts and remote SME SaaS engineering roles worldwide.',
    author: 'Mahmudul Hasan',
    date: '2026-08-11',
    readTime: '7 min read',
    category: 'Web',
    visualTone: 'fullstack',
    image: '/assets/blogs/blog_cover_3.jpg',
    fullText:
      'From database indexing and queue workers to reactive Vue 3 dashboards, understanding the complete request lifecycle makes junior developers immediately productive in real engineering teams.',
  },
  {
    id: 'figma-design-systems',
    title: 'From Figma to Production Code: Design Systems That Convert',
    excerpt:
      'How to design token-driven, accessible interfaces in Figma and ship them smoothly with Tailwind CSS.',
    author: 'Farhana Akter',
    date: '2026-07-28',
    readTime: '5 min read',
    category: 'Graphic Design',
    visualTone: 'design',
    image: '/assets/blogs/blog_cover_4.jpg',
    fullText:
      'A great design is more than aesthetics; it is about user retention, accessible typography, and smooth responsiveness across devices.',
  },
  {
    id: 'cyber-security-playbook',
    title: 'Defensive Cyber Security: Hands-On SOC Drills & Incident Response',
    excerpt:
      'Core tools and methodologies beginner analysts need to master network penetration testing and SIEM alert monitoring.',
    author: 'Rafiqul Islam',
    date: '2026-07-14',
    readTime: '6 min read',
    category: 'Cyber Security',
    visualTone: 'cyber',
    image: '/assets/blogs/blog_cover_5.jpg',
    fullText:
      'Security is learned by breaking and defending live testbeds. We break down the real steps required to detect intrusions and pass CEH certifications.',
  },
  {
    id: 'ai-freelance-tools-2026',
    title: 'Mastering AI Automation & Workflow Orchestration for Global Freelancing',
    excerpt:
      'How top remote freelancers use AI-assisted tools to double their delivery speed and retain international clients.',
    author: 'Tahmid Hasan',
    date: '2026-06-30',
    readTime: '4 min read',
    category: 'Career Growth',
    visualTone: 'ai',
    image: '/assets/blogs/blog_cover_6.jpg',
    fullText:
      'AI does not replace engineers or marketers—professionals who leverage AI workflows replace those who do not. Learn practical ways to integrate AI assistants into daily deliverables.',
  },
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Do I need prior coding or IT experience to join beginner courses?',
    answer:
      'No prior technical background is required for foundation tracks like Graphics Design, Digital Marketing, WordPress, or IT Support. Every batch starts from core computer workflows before progressing into live client projects.',
  },
  {
    id: 'faq-2',
    question: 'What is the difference between Offline Campus Labs and Live Online classes?',
    answer:
      'Both tracks follow the exact same syllabus, live instructor feedback, and project milestones. Offline students practice on high-spec campus workstations across our 42+ district branches, while Live Online students join interactive Zoom studio sessions with full recordings and 24/7 Discord/lab support.',
  },
  {
    id: 'faq-3',
    question: 'Are certificates nationally recognized and verifiable online?',
    answer:
      'Yes. Graduates receive a QR-verifiable e-Learning & Earning Ltd. completion certificate (plus NSDA assessment pathways for eligible government-aligned tracks) that employers and international clients can verify directly on our portal.',
  },
  {
    id: 'faq-4',
    question: 'How does the Freelance & Job Placement support work after course completion?',
    answer:
      'Our dedicated Career & Freelancing Support Desk helps you build marketplace profiles, review client proposals, practice mock technical interviews, and connect with 35+ local and remote hiring partner companies.',
  },
  {
    id: 'faq-5',
    question: 'Can I pay course fees in installments or apply for a scholarship discount?',
    answer:
      'Yes. You can split tuition into flexible monthly installments or apply for up to 40%–100% merit and need-based scholarships through our "Get Discount" and Free Seminar assessment programs.',
  },
  {
    id: 'faq-6',
    question: 'What happens if I miss a live class due to university exams or work?',
    answer:
      'Every live class is recorded in HD and uploaded to your student portal within two hours, and you can also book a backup lab session with an assistant mentor during the same week.',
  },
];

export const MEMBERS: MemberItem[] = [
  {
    id: 'basis',
    shortCode: 'BASIS',
    name: 'Bangladesh Association of Software & Information Services',
    category: 'Industry Member',
    description: 'Active member supporting software engineering & export-ready IT talent.',
  },
  {
    id: 'nsda',
    shortCode: 'NSDA',
    name: 'National Skills Development Authority',
    category: 'Registered STP',
    description: 'Government-accredited skills training provider & assessment partner.',
  },
  {
    id: 'ecab',
    shortCode: 'e-CAB',
    name: 'e-Commerce Association of Bangladesh',
    category: 'Digital Commerce Member',
    description: 'Collaborating on WooCommerce, digital retail, and growth careers.',
  },
  {
    id: 'ict',
    shortCode: 'ICT Div.',
    name: 'ICT Division Bangladesh',
    category: 'Training Partner',
    description: 'Delivering nationwide youth freelancing & skill initiatives.',
  },
  {
    id: 'bcs',
    shortCode: 'BCS',
    name: 'Bangladesh Computer Samity',
    category: 'Tech Hardware Alliance',
    description: 'Partnering on enterprise networking, hardware, and IT infrastructure.',
  },
  {
    id: 'iso',
    shortCode: 'ISO 9001',
    name: 'ISO 9001:2015 Quality Management',
    category: 'Certified Institute',
    description: 'Audited educational delivery and student support standards.',
  },
];

export interface PartnerClientItem {
  id: string;
  name: string;
  logo: string;
}

export const PARTNERS_AND_CLIENTS: PartnerClientItem[] = [
  { id: 'muslim-aid', name: 'Muslim Aid - Serving Humanity', logo: '/assets/partners/muslim-aid.png' },
  { id: 'edge', name: 'EDGE - Enhancing Digital Government and Economy', logo: '/assets/partners/edge.png' },
  { id: 'ict-division', name: 'ICT Division - Government of Bangladesh', logo: '/assets/partners/ict-division.png' },
  { id: 'kormoi-jibon', name: 'Kormoi Jibon', logo: '/assets/partners/kormoi-jibon.png' },
  { id: 'dshe', name: 'Technical & Madrashah Education Division', logo: '/assets/partners/dshe.png' },
  { id: 'du-crest', name: 'University of Dhaka', logo: '/assets/partners/du-crest.png' },
  { id: 'army', name: 'Bangladesh Army', logo: '/assets/partners/army.png' },
  { id: 'swisscontact', name: 'Swisscontact - Swiss Foundation for Technical Cooperation', logo: '/assets/partners/swisscontact.png' },
  { id: 'bitm', name: 'BITM - BASIS Institute of Technology & Management', logo: '/assets/partners/bitm.png' },
  { id: 'teletalk', name: 'Teletalk Bangladesh Limited', logo: '/assets/partners/teletalk.png' },
  { id: 'iit-du', name: 'Institute of Information Technology (IIT) - University of Dhaka', logo: '/assets/partners/iit-du.png' },
  { id: 'pksf', name: 'Palli Karma-Sahayak Foundation (PKSF)', logo: '/assets/partners/pksf.png' },
  { id: 'govt-seal', name: 'Government of Bangladesh Organization', logo: '/assets/partners/govt-seal.png' },
  { id: 'youth-sports', name: 'Ministry of Youth and Sports', logo: '/assets/partners/youth-sports.png' },
];

export const STUDENT_TESTIMONIALS: StudentTestimonialItem[] = [
  {
    id: 'st-tanvir',
    name: 'Tanvir Ahmed',
    courseTrack: 'Web App Development',
    rating: 5,
    quote:
      'Before joining ELE, I struggled to build real client APIs. After 104 lab classes with Laravel and Vue, I shipped my first SaaS dashboard and landed two remote contracts from Dhaka.',
    hue: 'emerald',
    avatarImage: '/assets/students/tanvir-ahmed.jpg',
  },
  {
    id: 'st-nusrat',
    name: 'Sumaiya Akter',
    courseTrack: 'Graphics & UI/UX',
    rating: 5,
    quote:
      'I never thought I could design international brand systems from scratch. Live mentor feedback every week helped me move from zero experience to Level 2 Seller on Fiverr.',
    hue: 'teal',
    avatarImage: '/assets/students/sumaiya-akter.jpg',
  },
  {
    id: 'st-rakibul',
    name: 'Rakibul Hasan',
    courseTrack: 'Certified Ethical Hacker',
    rating: 5,
    quote:
      'Clean labs, real Active Directory drills, and no useless theory fillers. Within two months of finishing CEHv13, I passed my technical interview as a Junior SOC Analyst.',
    hue: 'indigo',
    avatarImage: '/assets/students/tahmid-hasan.jpg',
  },
  {
    id: 'st-fahim',
    name: 'Fahim Chowdhury',
    courseTrack: 'Digital Marketing',
    rating: 5,
    quote:
      'After the GA4 and Meta conversion modules, managing global ad retainers became second nature. Our student team now handles five US e-commerce accounts every month.',
    hue: 'amber',
    avatarImage: '/assets/students/fahim-chowdhury.png',
  },
  {
    id: 'st-sabina',
    name: 'Sabina Yasmin',
    courseTrack: 'WordPress & WooCommerce',
    rating: 5,
    quote:
      'The evening online cohort fit smoothly around my university schedule. I built four speed-optimized stores during class and earned back my tuition fee in week eleven.',
    hue: 'sky',
    avatarImage: '/assets/students/farhana-akter.jpg',
  },
  {
    id: 'st-imran',
    name: 'Imran Hossain',
    courseTrack: 'IT Support & CCNA',
    rating: 5,
    quote:
      'Hands-on MikroTik routing and structured CCTV lab setups gave me practical confidence that textbooks never taught. I joined an ISP engineering team right after graduation.',
    hue: 'violet',
    avatarImage: '/assets/students/rakibul-hasan.png',
  },
];

export const BRANCH_ITEMS: BranchItem[] = [
  {
    id: 'dhaka',
    city: 'Dhaka',
    address: 'Khaja IT Park (2nd - 6th Floor), 07 South Kallyanpur, Kallyanpur Bus Stand, Mirpur Road, Dhaka-1207',
    phones: ['01550-666800', '01550-666900'],
    email: 'dhaka.elel@gmail.com',
    mapImage: '/assets/branches/branch_dhaka.jpg',
    mapUrl: 'https://maps.google.com/?q=Khaja+IT+Park+Dhaka',
  },
  {
    id: 'gazipur',
    city: 'Gazipur',
    address: 'Habiba Sharkar Complex (4th Floor), Tongi College Gate, Dhaka Maymensingh Road, Tangi, Gazipur',
    phones: ['01515611602'],
    email: 'gazipur.elel@gmail.com',
    mapImage: '/assets/branches/branch_gazipur.jpg',
    mapUrl: 'https://maps.google.com/?q=Tongi+College+Gate+Gazipur',
  },
  {
    id: 'chattogram',
    city: 'Chattogram',
    address: 'Johor Tower (5th Floor), Sheikh Mujib Road, Double Mooring, Agrabad, Chattogram',
    phones: ['01332852610', '01332852611'],
    email: 'chattogram.elel@gmail.com',
    mapImage: '/assets/branches/branch_chattogram.jpg',
    mapUrl: 'https://maps.google.com/?q=Johor+Tower+Agrabad+Chattogram',
  },
  {
    id: 'brahmanbaria',
    city: 'Brahmanbaria',
    address: '437/1, Asma Mahal (Ground Floor), Shyamoli Barir Mor, Fulbaria, Brahmanbaria',
    phones: ['8801332852645'],
    email: 'b_baria.elel@gmail.com',
    mapImage: '/assets/branches/branch_brahmanbaria.jpg',
    mapUrl: 'https://maps.google.com/?q=Fulbaria+Brahmanbaria',
  },
  {
    id: 'sylhet',
    city: 'Sylhet',
    address: 'Al-Hamra Shopping City (8th Floor), Hazrat Shahjalal Road, Zindabazar, Sylhet-3100',
    phones: ['01332852620', '01332852621'],
    email: 'sylhet.elel@gmail.com',
    mapImage: '/assets/branches/branch_sylhet.jpg',
    mapUrl: 'https://maps.google.com/?q=Al+Hamra+Shopping+City+Sylhet',
  },
  {
    id: 'rajshahi',
    city: 'Rajshahi',
    address: 'Natore Road, Shaheb Bazar Commercial Zone, Boalia, Rajshahi-6000',
    phones: ['01332852630', '01332852631'],
    email: 'rajshahi.elel@gmail.com',
    mapImage: '/assets/branches/branch_rajshahi.jpg',
    mapUrl: 'https://maps.google.com/?q=Shaheb+Bazar+Rajshahi',
  },
];


