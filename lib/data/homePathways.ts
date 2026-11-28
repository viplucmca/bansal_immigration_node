import {
  Award,
  Briefcase,
  Building,
  Flag,
  GraduationCap,
  Heart,
  Plane,
  Scale,
} from 'lucide-react';
import type { ServicePathway } from '@/components/home/ServicePathwayCard';

/** Eight pathway cards — hover images per homepage handoff 6.1. */
export const HOME_PATHWAYS: ServicePathway[] = [
  {
    title: 'Skilled migration visas',
    desc: 'Subclass 189, 190 and 491, points testing and state nomination.',
    href: '/migrate-to-australia',
    icon: Briefcase,
    image: '/img/homepage-1280.webp',
  },
  {
    title: 'Partner and family visas',
    desc: 'Partner, parent and child visas, and the evidence you need.',
    href: '/family-visa',
    icon: Heart,
    image: '/img/homepage-480.webp',
  },
  {
    title: 'Student and graduate visas',
    desc: 'Courses, student visa applications and the Temporary Graduate (485) visa.',
    href: '/study-australia',
    icon: GraduationCap,
    image: '/img/homepage-768.webp',
  },
  {
    title: 'Employer-sponsored visas',
    desc: 'Skills in Demand (482), Employer Nomination (186) and regional visas.',
    href: '/employer-sponsored',
    icon: Building,
    image: '/img/employer-sponosred-hero.webp',
  },
  {
    title: 'Visitor visas',
    desc: 'Tourist, business and family visits to Australia.',
    href: '/visitor-visa',
    icon: Plane,
    image: '/img/homepage-480.webp',
  },
  {
    title: 'Skills assessments',
    desc: 'Find the right assessing authority for your occupation.',
    href: '/occupation-finder',
    icon: Award,
    image: '/img/homepage-768.webp',
  },
  {
    title: 'Citizenship',
    desc: 'Citizenship by conferral or by descent.',
    href: '/citizenship',
    icon: Flag,
    image: '/img/evidence-of-citizenship-hero.webp',
  },
  {
    title: 'Refused or cancelled visas',
    desc: 'Review rights, strict deadlines and your next options. Call us as soon as you can.',
    href: '/appeals',
    icon: Scale,
    image: '/img/employer-sponosred-hero.webp',
  },
];