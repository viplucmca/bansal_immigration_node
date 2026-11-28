/** Office facts shared by homepage, schema, and nav. */
export const SITE_ORIGIN = 'https://www.bansalimmigration.com.au';

export const ORG_ID = `${SITE_ORIGIN}#organization`;
export const WEBSITE_ID = `${SITE_ORIGIN}/#website`;
export const MELBOURNE_OFFICE_ID = `${SITE_ORIGIN}/#melbourne-office`;
export const ADELAIDE_OFFICE_ID = `${SITE_ORIGIN}/#adelaide-office`;

export type OfficeRecord = {
  id: 'melbourne' | 'adelaide';
  schemaId: string;
  name: string;
  shortName: string;
  streetAddress: string;
  address: string;
  locality: string;
  region: string;
  postalCode: string;
  phone: string;
  tel: string;
  email: string;
  timeZone: string;
  mapQuery: string;
  latitude: number;
  longitude: number;
  hasMap: string;
  image: string;
  directionsEvent: 'melbourne' | 'adelaide';
};

export const OFFICES: OfficeRecord[] = [
  {
    id: 'melbourne',
    schemaId: MELBOURNE_OFFICE_ID,
    name: 'Melbourne head office',
    shortName: 'Melbourne',
    streetAddress: 'Level 8, 278 Collins Street',
    address: 'Level 8, 278 Collins Street, Melbourne VIC 3000',
    locality: 'Melbourne',
    region: 'VIC',
    postalCode: '3000',
    phone: '+61 3 9602 1330',
    tel: '+61396021330',
    email: 'info@bansalimmigration.com.au',
    timeZone: 'Australia/Melbourne',
    mapQuery: 'Level 8/278 Collins St, Melbourne VIC 3000',
    latitude: -37.8169,
    longitude: 144.9655,
    hasMap: 'https://maps.google.com/?q=Level+8%2F278+Collins+St%2C+Melbourne+VIC+3000',
    image: '/img/homepage-1280.webp',
    directionsEvent: 'melbourne',
  },
  {
    id: 'adelaide',
    schemaId: ADELAIDE_OFFICE_ID,
    name: 'Adelaide office',
    shortName: 'Adelaide',
    streetAddress: 'Unit 5, 55 Gawler Place',
    address: 'Unit 5, 55 Gawler Place, Adelaide SA 5000',
    locality: 'Adelaide',
    region: 'SA',
    postalCode: '5000',
    phone: '+61 8 8317 1340',
    tel: '+61883171340',
    email: 'adelaide@bansalimmigration.com.au',
    timeZone: 'Australia/Adelaide',
    mapQuery: 'Unit 5, 55 Gawler Pl, Adelaide SA 5000',
    latitude: -34.9287,
    longitude: 138.6012,
    hasMap: 'https://maps.google.com/?q=Unit+5%2C+55+Gawler+Pl%2C+Adelaide+SA+5000',
    image: '/img/homepage-768.webp',
    directionsEvent: 'adelaide',
  },
];