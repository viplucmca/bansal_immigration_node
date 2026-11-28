import { SITE_ORIGIN, ORG_ID } from '@/lib/site/offices';

export function buildArticleSchema(input: {
  headline: string;
  slug: string;
  image?: string | null;
  datePublished?: string | null;
  dateModified?: string | null;
  authorName?: string | null;
  authorMarn?: string | null;
}) {
  const author: Record<string, unknown> = {
    '@type': 'Person',
    name: input.authorName || 'Bansal Immigration',
  };
  if (input.authorMarn) {
    author.identifier = {
      '@type': 'PropertyValue',
      name: 'MARN',
      value: input.authorMarn,
    };
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.headline,
    datePublished: input.datePublished || undefined,
    dateModified: input.dateModified || input.datePublished || undefined,
    image: input.image ? (input.image.startsWith('http') ? input.image : `${SITE_ORIGIN}${input.image}`) : undefined,
    author,
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: `${SITE_ORIGIN}/blogs/${input.slug}`,
  };
}