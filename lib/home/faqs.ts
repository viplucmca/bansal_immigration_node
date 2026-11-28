import type { RowDataPacket } from 'mysql2';
import { getDb } from '@/lib/db';
import { HOME_FAQ_FALLBACK, type HomeFaq } from '@/lib/data/homeFaqs';

export async function getHomeFaqs(): Promise<HomeFaq[]> {
  try {
    const db = getDb();
    const [rows] = await db.query<RowDataPacket[]>(
      'SELECT question, answer FROM home_faqs WHERE status = 1 ORDER BY sort_order ASC, id ASC'
    );
    if (rows?.length) {
      return rows.map((r) => ({
        question: String(r.question),
        answer: String(r.answer),
      }));
    }
  } catch (error) {
    console.warn('Could not load home_faqs, using fallback:', error);
  }
  return HOME_FAQ_FALLBACK;
}