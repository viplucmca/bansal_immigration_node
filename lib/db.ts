import mysql from 'mysql2/promise';

let pool: mysql.Pool | null = null;

export function getDb() {
  if (!pool) {
    pool = mysql.createPool({
      // Prefer DB_*; fall back to MYSQL_* so .env.local configs keep working
      host: process.env.DB_HOST || process.env.MYSQL_HOST || '127.0.0.1',
      user: process.env.DB_USERNAME || process.env.MYSQL_USER || 'bansal',
      password: process.env.DB_PASSWORD ?? process.env.MYSQL_PASSWORD ?? 'bansal',
      database: process.env.DB_DATABASE || process.env.MYSQL_DATABASE || 'bansal_immigration_node',
      port: Number(process.env.DB_PORT || process.env.MYSQL_PORT) || 3306,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
}

export interface PageRecord {
  id: number;
  title: string;
  slug: string;
  route_name?: string | null;
  content?: string | null;
  excerpt?: string | null;
  template?: string | null;
  category: string;
  subcategory?: string | null;
  image?: string | null;
  image_alt?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string | null;
  status: number | boolean;
  featured?: number | boolean;
  order?: number;
  parent_id?: number | null;
  created_at?: string;
  updated_at?: string;
  visa_highlights?: any;
  visa_eligibility?: any;
  visa_benefits?: any;
  visa_steps?: any;
  visa_faqs?: any;
  visa_processing_times?: any;
  visa_costs?: any;
  visa_duration?: any;
  visa_pathways?: any;
}

export async function getPage(category: string, slug?: string): Promise<PageRecord | null> {
  const db = getDb();
  if (!slug) {
    const [rows] = await db.query<any[]>(
      'SELECT * FROM pages WHERE category = ? AND parent_id IS NULL AND slug = ? AND status = 1 LIMIT 1',
      [category, category]
    );
    if (rows && rows.length > 0) return rows[0] as PageRecord;

    const [fallbackRows] = await db.query<any[]>(
      'SELECT * FROM pages WHERE category = ? AND parent_id IS NULL AND status = 1 ORDER BY id ASC LIMIT 1',
      [category]
    );
    if (fallbackRows && fallbackRows.length > 0) return fallbackRows[0] as PageRecord;

    const [anyRows] = await db.query<any[]>(
      'SELECT * FROM pages WHERE category = ? AND status = 1 ORDER BY id ASC LIMIT 1',
      [category]
    );
    return anyRows && anyRows.length > 0 ? (anyRows[0] as PageRecord) : null;
  }

  const [rows] = await db.query<any[]>(
    'SELECT * FROM pages WHERE category = ? AND slug = ? AND status = 1 LIMIT 1',
    [category, slug]
  );
  return rows && rows.length > 0 ? (rows[0] as PageRecord) : null;
}

export async function getRelatedPages(category: string, excludeId: number, limit = 6): Promise<PageRecord[]> {
  const db = getDb();
  const [rows] = await db.query<any[]>(
    'SELECT id, title, slug, category, excerpt, image FROM pages WHERE category = ? AND id != ? AND slug != ? AND status = 1 LIMIT ?',
    [category, excludeId, category, limit]
  );
  return (rows as PageRecord[]) || [];
}

export interface BlogRecord {
  id: number;
  title: string;
  slug: string;
  parent_category?: string | null;
  short_description?: string | null;
  description: string;
  image?: string | null;
  image_alt?: string | null;
  author?: string | null;
  status: number | boolean;
  featured: number | boolean;
  published_at?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface PaginatedBlogsResult {
  blogs: BlogRecord[];
  total: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

export async function getPaginatedBlogs(options: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  featuredOnly?: boolean;
}): Promise<PaginatedBlogsResult> {
  const db = getDb();
  const page = Math.max(1, Number(options.page) || 1);
  const limit = Math.max(1, Number(options.limit) || 12);
  const offset = (page - 1) * limit;

  const whereClauses: string[] = ['status = 1', 'slug <> ?'];
  const params: any[] = ['test-title'];

  if (options.featuredOnly) {
    whereClauses.push('featured = 1');
  }

  if (options.search && options.search.trim()) {
    whereClauses.push('(title LIKE ? OR short_description LIKE ? OR meta_keywords LIKE ?)');
    const searchTerm = `%${options.search.trim()}%`;
    params.push(searchTerm, searchTerm, searchTerm);
  }

  if (options.category && options.category.trim()) {
    whereClauses.push('(title LIKE ? OR short_description LIKE ? OR meta_keywords LIKE ?)');
    const catTerm = `%${options.category.trim()}%`;
    params.push(catTerm, catTerm, catTerm);
  }

  const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

  // Get total count
  const [countRows] = await db.query<any[]>(
    `SELECT COUNT(*) as total FROM blogs ${whereSql}`,
    params
  );
  const total = Number(countRows[0]?.total || 0);
  const totalPages = Math.max(1, Math.ceil(total / limit));

  // Get paginated rows
  const [rows] = await db.query<any[]>(
    `SELECT * FROM blogs ${whereSql} ORDER BY COALESCE(published_at, created_at) DESC LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  );

  return {
    blogs: (rows as BlogRecord[]) || [],
    total,
    totalPages,
    currentPage: page,
    limit,
  };
}

/** Posts that must not be public, even if a database row is turned back on. */
const HIDDEN_BLOG_SLUGS = new Set(['test-title']);

export async function getBlogs(featuredOnly = false, search = ''): Promise<BlogRecord[]> {
  const db = getDb();
  let sql = 'SELECT * FROM blogs WHERE status = 1 AND slug <> ?';
  const params: any[] = ['test-title'];

  if (featuredOnly) {
    sql += ' AND featured = 1';
  }
  if (search) {
    sql += ' AND (title LIKE ? OR short_description LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
  }
  sql += ' ORDER BY COALESCE(published_at, created_at) DESC';

  const [rows] = await db.query<any[]>(sql, params);
  return (rows as BlogRecord[]) || [];
}

export async function getBlog(slug: string): Promise<BlogRecord | null> {
  if (HIDDEN_BLOG_SLUGS.has(slug)) return null;
  const db = getDb();
  const [rows] = await db.query<any[]>(
    'SELECT * FROM blogs WHERE slug = ? AND status = 1 LIMIT 1',
    [slug]
  );
  return rows && rows.length > 0 ? (rows[0] as BlogRecord) : null;
}

export async function getRelatedBlogs(excludeId: number, limit = 3): Promise<BlogRecord[]> {
  const db = getDb();
  const [rows] = await db.query<any[]>(
    'SELECT * FROM blogs WHERE status = 1 AND slug <> ? AND id != ? ORDER BY COALESCE(published_at, created_at) DESC LIMIT ?',
    ['test-title', excludeId, limit]
  );
  return (rows as BlogRecord[]) || [];
}

import { fallbackSuccessStories } from '@/lib/data/fallbackSuccessStories';

export interface SuccessStoryRecord {
  id: number;
  title: string;
  slug: string;
  client_name: string;
  client_country?: string | null;
  visa_type?: string | null;
  excerpt?: string | null;
  content: string;
  image?: string | null;
  image_alt?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string | null;
  status: number | boolean;
  featured: number | boolean;
  order?: number;
  created_at?: string;
  youtube_url?: string | null;
  date?: string | null;
  has_youtube?: boolean;
  outcome?: string | null;
  parent_category?: number | null;
  pdf_doc?: string | null;
  updated_at?: string | null;
  success_date?: string | null;
  [key: string]: any;
}

export async function getSuccessStories(): Promise<SuccessStoryRecord[]> {
  try {
    const db = getDb();
    const [rows] = await db.query<any[]>(
      'SELECT * FROM success_stories WHERE status = 1 ORDER BY `order` ASC, id DESC'
    );
    if (rows && rows.length > 0) {
      return rows as SuccessStoryRecord[];
    }
  } catch (error) {
    console.warn('Could not query success_stories table, using fallback:', error);
  }
  return fallbackSuccessStories as unknown as SuccessStoryRecord[];
}

export async function getSuccessStory(slug: string): Promise<SuccessStoryRecord | null> {
  try {
    const db = getDb();
    const [rows] = await db.query<any[]>(
      'SELECT * FROM success_stories WHERE slug = ? AND status = 1 LIMIT 1',
      [slug]
    );
    if (rows && rows.length > 0) {
      return rows[0] as SuccessStoryRecord;
    }
  } catch (error) {
    console.warn('Could not query success_story, using fallback:', error);
  }
  const match = fallbackSuccessStories.find((s) => s.slug === slug);
  return (match as unknown as SuccessStoryRecord) || null;
}

export interface AnzscoOccupationRecord {
  id?: number;
  anzsco_code: string;
  occupation_title: string;
  list_label?: string | null;
  assessing_authority?: string | null;
  skill_level?: number | null;
  is_csol?: boolean | number;
  eligible_189?: boolean | number;
  eligible_190?: boolean | number;
  eligible_491?: boolean | number;
  eligible_482?: boolean | number;
  eligible_186?: boolean | number;
  eligible_491_fs?: boolean | number;
  eligible_485?: boolean | number;
  eligible_482_special?: boolean | number;
  eligible_407?: boolean | number;
  eligible_186_trt?: boolean | number;
  eligible_494?: boolean | number;
  eligible_dama?: boolean | number;
  is_active?: boolean | number;
  visa_options?: any;
}

const VISA_ROWS = [
  { key: 'eligible_189', visa_type: '189', visa_name: 'Skilled Independent', permanent_visa: true, dha_path: '/skilled-189/skilled-independent' },
  { key: 'eligible_190', visa_type: '190', visa_name: 'Skilled Nominated', permanent_visa: true, dha_path: '/skilled-190' },
  { key: 'eligible_491', visa_type: '491', visa_name: 'Skilled Work Regional', permanent_visa: false, dha_path: '/skilled-491' },
  { key: 'eligible_491_fs', visa_type: '491', visa_name: 'Family Sponsored', permanent_visa: false, dha_path: '/skilled-491' },
  { key: 'eligible_485', visa_type: '485', visa_name: 'Graduate: Post-Vocational', permanent_visa: false, dha_path: '/temporary-485' },
  { key: 'eligible_482', visa_type: '482', visa_name: 'SID: Core Skills', permanent_visa: false, dha_path: '/skilled-482' },
  { key: 'eligible_482_special', visa_type: '482', visa_name: 'SID: Specialist Skills', permanent_visa: false, dha_path: '/skilled-482' },
  { key: 'eligible_186', visa_type: '186', visa_name: 'ENS: Direct Entry', permanent_visa: true, dha_path: '/employer-sponsored-186' },
  { key: 'eligible_186_trt', visa_type: '186', visa_name: 'ENS: TRT', permanent_visa: true, dha_path: '/employer-sponsored-186' },
  { key: 'eligible_407', visa_type: '407', visa_name: 'Training: Enhance Skills', permanent_visa: false, dha_path: '/training-407' },
  { key: 'eligible_494', visa_type: '494', visa_name: 'SESR: Employer Sponsored', permanent_visa: false, dha_path: '/skilled-employer-sponsored-regional-494' },
  { key: 'eligible_dama', visa_type: 'DAMA', visa_name: 'Labour Agreement', permanent_visa: false, dha_path: '/labour-agreement' },
];

export function transformOccupationPayload(occ: any) {
  const ll = (occ.list_label || '').toString().trim().toUpperCase();
  const MLTSSL = ll === 'MLTSSL';
  const STSOL = ll === 'STSOL';
  const ROL = ll === 'ROL';
  const CSOL = Boolean(occ.is_csol) || ll === 'CSOL';

  const visa_options: Record<string, any> = {};
  for (const row of VISA_ROWS) {
    let eligible = Boolean(occ[row.key]);
    if (!eligible) {
      switch (row.key) {
        case 'eligible_189': eligible = MLTSSL; break;
        case 'eligible_190': eligible = MLTSSL || STSOL; break;
        case 'eligible_491':
        case 'eligible_491_fs': eligible = MLTSSL || STSOL || ROL; break;
        case 'eligible_482':
        case 'eligible_482_special': eligible = CSOL; break;
        case 'eligible_186':
        case 'eligible_186_trt': eligible = MLTSSL || STSOL; break;
        case 'eligible_485': eligible = MLTSSL || STSOL; break;
        case 'eligible_407':
        case 'eligible_494': eligible = MLTSSL || STSOL || ROL; break;
        case 'eligible_dama': eligible = false; break;
      }
    }
    visa_options[row.key] = {
      visa_type: row.visa_type,
      visa_name: row.visa_name,
      eligibility: eligible,
      MLTSSL,
      STSOL,
      ROL,
      CSOL,
      permanent_visa: row.permanent_visa,
      dha_path: row.dha_path,
    };
  }

  return {
    anzsco_code: occ.anzsco_code,
    occupation_title: occ.occupation_title,
    list_label: occ.list_label,
    assessing_authority: occ.assessing_authority,
    skill_level: occ.skill_level,
    is_csol: Boolean(occ.is_csol),
    visa_options,
  };
}

export async function searchOccupations(query: string, limit = 50) {
  const db = getDb();
  const cleanQ = query.trim().toLowerCase();
  const like = `%${cleanQ}%`;
  const [rows] = await db.query<any[]>(
    'SELECT * FROM anzsco_occupations WHERE is_active = 1 AND (LOWER(occupation_title) LIKE ? OR anzsco_code LIKE ?) ORDER BY occupation_title ASC LIMIT ?',
    [like, like, limit]
  );
  return (rows || []).map(transformOccupationPayload);
}
