import type { HomeFaq } from '@/lib/data/homeFaqs';
import { OFFICES, ORG_ID, SITE_ORIGIN, WEBSITE_ID } from '@/lib/site/offices';
import { ORG_SOCIAL_URLS } from '@/lib/site/social';

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const;

export type HomeVideoSchema = {
  title: string;
  youtubeId: string;
  description?: string;
  uploadDate?: string;
};

function openingHours() {
  return [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [...WEEKDAYS],
      opens: '09:30',
      closes: '18:00',
    },
  ];
}

function officeSchema(office: (typeof OFFICES)[number]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': office.schemaId,
    name: office.id === 'melbourne' ? 'Bansal Immigration Melbourne' : 'Bansal Immigration Adelaide',
    url: SITE_ORIGIN,
    image: `${SITE_ORIGIN}${office.image}`,
    telephone:
      office.id === 'melbourne' ? '+61-3-9602-1330' : '+61-8-8317-1340',
    email: office.email,
    parentOrganization: { '@id': ORG_ID },
    address: {
      '@type': 'PostalAddress',
      streetAddress: office.streetAddress,
      addressLocality: office.locality,
      addressRegion: office.region,
      postalCode: office.postalCode,
      addressCountry: 'AU',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: office.latitude,
      longitude: office.longitude,
    },
    openingHoursSpecification: openingHours(),
    areaServed: { '@type': 'City', name: office.locality },
    knowsLanguage: ['en', 'hi', 'pa'],
    hasMap: office.hasMap,
  };
}

function videoObjects(videos: HomeVideoSchema[]) {
  return videos.map((v) => ({
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: v.title,
    description: v.description || v.title,
    thumbnailUrl: `https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`,
    uploadDate: v.uploadDate || undefined,
    embedUrl: `https://www.youtube.com/embed/${v.youtubeId}`,
    publisher: { '@id': ORG_ID },
  }));
}

export function buildHomeSchema(faqs: HomeFaq[], videos: HomeVideoSchema[] = []) {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'Bansal Immigration',
    alternateName: 'Bansal Immigration Consultants',
    url: SITE_ORIGIN,
    logo: `${SITE_ORIGIN}/img/logo/logo.webp`,
    sameAs: [...ORG_SOCIAL_URLS],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+61-3-9602-1330',
      contactType: 'customer service',
      areaServed: 'AU',
      availableLanguage: ['English', 'Hindi', 'Punjabi'],
    },
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_ORIGIN,
    name: 'Bansal Immigration',
    inLanguage: 'en-AU',
    publisher: { '@id': ORG_ID },
  };

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return [
    organization,
    website,
    officeSchema(OFFICES[0]),
    officeSchema(OFFICES[1]),
    faqPage,
    ...videoObjects(videos),
  ];
}