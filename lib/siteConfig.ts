/**
 * Facts the business still needs to confirm. Leave a value as null until it is known:
 * the pages simply leave that detail out. See pending-questions.md.
 */
export const GOOGLE_RATING = '4.8';
/** Public Google listing for the Melbourne office (Level 8, 278 Collins Street). */
export const GOOGLE_REVIEW_COUNT: number | null = 1142;
/** Opens the Google listing so visitors can read every review. */
export const GOOGLE_PROFILE_URL: string | null =
  'https://www.google.com/maps/search/?api=1&query=Bansal+Immigration+Consultants+Level+8+278+Collins+Street+Melbourne+VIC+3000';

/**
 * Name and MARN of the registered agent who reviewed the skilled migration pages,
 * e.g. 'Arun Bansal, MARN 2418466'. When null, no reviewer line is shown. Only set it once that person agrees.
 */
export const SKILLED_PAGE_REVIEWER: string | null = null;
/** Date the skilled migration pages were last checked, shown under the heading. */
export const SKILLED_PAGE_UPDATED = '2026-11-14';
