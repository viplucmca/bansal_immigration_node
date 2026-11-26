import { FAQS } from '@/lib/data/homeFaqs';

const SITE = 'https://bansalimmigration.com.au';

export const homeSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE}/#organization`,
    name: 'Bansal Immigration',
    alternateName: 'Bansal Immigration Consultants',
    url: `${SITE}/`,
    logo: `${SITE}/img/logo/logo.webp`,
    sameAs: [
      'https://www.facebook.com/share/1HLkRjHfdu/',
      'https://www.instagram.com/bansalimmigrationconsultants',
      'https://www.linkedin.com/company/bansal-immigration-consultants/',
      'https://x.com/Bansalimmi',
      'https://www.youtube.com/@bansalimmigrationconsultants',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+61-3-9602-1330',
        contactType: 'customer service',
        areaServed: 'AU',
        availableLanguage: ['English', 'Hindi', 'Punjabi'],
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE}/#website`,
    url: `${SITE}/`,
    name: 'Bansal Immigration',
    inLanguage: 'en-AU',
    publisher: { '@id': `${SITE}/#organization` },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE}/#melbourne-office`,
    name: 'Bansal Immigration Melbourne',
    url: `${SITE}/`,
    image: `${SITE}/img/offices/melbourne-office.webp`,
    telephone: '+61-3-9602-1330',
    email: 'info@bansalimmigration.com.au',
    parentOrganization: { '@id': `${SITE}/#organization` },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Level 8, 278 Collins Street',
      addressLocality: 'Melbourne',
      addressRegion: 'VIC',
      postalCode: '3000',
      addressCountry: 'AU',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -37.8145,
      longitude: 144.9655,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:30',
        closes: '18:00',
      },
    ],
    areaServed: [{ '@type': 'City', name: 'Melbourne' }],
    knowsLanguage: ['en', 'hi', 'pa'],
    hasMap: 'https://maps.google.com/?q=Level+8%2C+278+Collins+Street%2C+Melbourne+VIC+3000',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE}/#adelaide-office`,
    name: 'Bansal Immigration Adelaide',
    url: `${SITE}/`,
    image: `${SITE}/img/team/team-bansal-1280.webp`,
    telephone: '+61-8-8317-1340',
    email: 'adelaide@bansalimmigration.com.au',
    parentOrganization: { '@id': `${SITE}/#organization` },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Unit 5, 55 Gawler Place',
      addressLocality: 'Adelaide',
      addressRegion: 'SA',
      postalCode: '5000',
      addressCountry: 'AU',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -34.9237,
      longitude: 138.6012,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:30',
        closes: '18:00',
      },
    ],
    areaServed: [{ '@type': 'City', name: 'Adelaide' }],
    knowsLanguage: ['en', 'hi', 'pa'],
    hasMap: 'https://maps.google.com/?q=Unit+5%2C+55+Gawler+Place%2C+Adelaide+SA+5000',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  },
];
