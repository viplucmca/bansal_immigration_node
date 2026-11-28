export type GoogleReviewCategory =
  | 'skilled'
  | 'student'
  | 'partner'
  | 'employer'
  | 'family';

export interface GoogleReview {
  id: string;
  name: string;
  role: string;
  category: GoogleReviewCategory;
  serviceLabel: string;
  serviceHref: string;
  date: string;
  /** Shown under the name, Google-style (e.g. "3 months ago"). */
  relativeTime: string;
  rating: number;
  quote: string;
  /** Avatar background Tailwind class when no photo is available. */
  avatarClass: string;
  confirmed: boolean;
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: '1',
    name: 'Ranjita Samyal',
    role: 'Google Local Guide',
    category: 'skilled',
    serviceLabel: 'Skilled PR (Subclass 190)',
    serviceHref: '/migrate-to-australia',
    date: 'August 2026',
    relativeTime: '3 months ago',
    rating: 5,
    confirmed: true,
    avatarClass: 'bg-violet-600',
    quote:
      'We had the privilege of working with Bansal Immigration. I cannot express enough gratitude for the exceptional support we received throughout our PR journey. The team demonstrated extraordinary empathy, understanding our situation in depth and tailoring their advice with precision.',
  },
  {
    id: '2',
    name: 'Vik Singh',
    role: 'Google review',
    category: 'student',
    serviceLabel: 'Student Visa (Subclass 500)',
    serviceHref: '/study-australia',
    date: 'May 2026',
    relativeTime: '6 months ago',
    rating: 5,
    confirmed: true,
    avatarClass: 'bg-slate-500',
    quote:
      'I am extremely happy and grateful to Bansal Immigration Consultants for helping me successfully get my student visa grant. From start to finish, the team was professional, supportive, and very clear with every step of the process. They handled my application with care, answered all my questions patiently, and guided me with honesty and confidence.',
  },
  {
    id: '3',
    name: 'Shipra Sharma',
    role: 'Google Local Guide',
    category: 'skilled',
    serviceLabel: 'General Skilled Migration',
    serviceHref: '/migrate-to-australia',
    date: 'August 2026',
    relativeTime: '3 months ago',
    rating: 5,
    confirmed: true,
    avatarClass: 'bg-amber-500',
    quote:
      'I have been with Bansal Immigration for almost six years now and I am very happy with the services provided by them. I have achieved what I came to Australia for, with the excellent advice provided through Bansal Immigration. I have found worth for my every penny with them. I followed everything they asked me to and got the results I wanted for myself.',
  },
  {
    id: '4',
    name: 'Rajesh & Priya Sharma',
    role: 'Google review',
    category: 'partner',
    serviceLabel: 'Partner Visa (Subclass 820/801)',
    serviceHref: '/family-visa',
    date: 'July 2026',
    relativeTime: '4 months ago',
    rating: 5,
    confirmed: false,
    avatarClass: 'bg-rose-500',
    quote:
      'Bansal Immigration made our dream of living together in Australia come true. Their professional guidance in assembling the four pillars of relationship evidence and statutory declarations was exceptional. The partner visa was granted smoothly without any Requests for Information.',
  },
  {
    id: '5',
    name: 'David & Maria Rodriguez',
    role: 'Google review',
    category: 'family',
    serviceLabel: 'Contributory Parent Visa (Subclass 143)',
    serviceHref: '/family-visa',
    date: 'April 2026',
    relativeTime: '7 months ago',
    rating: 5,
    confirmed: false,
    avatarClass: 'bg-teal-600',
    quote:
      'Professional, reliable, and knowledgeable. Bansal Immigration helped our family navigate the complex balance of family test and assurance of support requirements for our parents. Their thorough approach gave us confidence at every step.',
  },
  {
    id: '6',
    name: 'James Wilson',
    role: 'Google review',
    category: 'employer',
    serviceLabel: 'Skills in Demand (Subclass 482)',
    serviceHref: '/employer-sponsored',
    date: 'June 2026',
    relativeTime: '5 months ago',
    rating: 5,
    confirmed: false,
    avatarClass: 'bg-brand-800',
    quote:
      'The employer-sponsored nomination process seemed overwhelming with labour market testing and salary benchmarking rules, but Bansal Immigration made it clear and manageable. Their corporate expertise saved our company time and ensured complete compliance.',
  },
  {
    id: '7',
    name: 'Michael & Anna Singh',
    role: 'Google review',
    category: 'skilled',
    serviceLabel: 'Skilled Work Regional (Subclass 491)',
    serviceHref: '/migrate-to-australia',
    date: 'March 2026',
    relativeTime: '8 months ago',
    rating: 5,
    confirmed: false,
    avatarClass: 'bg-indigo-600',
    quote:
      'From our initial skills assessment to South Australia regional nomination and final visa grant, the service was outstanding. Their deep knowledge of regional occupation lists and points calculation made all the difference.',
  },
];

export const CONFIRMED_GOOGLE_REVIEWS = GOOGLE_REVIEWS.filter((r) => r.confirmed);

export function reviewInitials(review: GoogleReview): string {
  return initials(review.name);
}