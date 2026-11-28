import Link from 'next/link';
import { ArrowRight, Newspaper } from 'lucide-react';
import { getPaginatedBlogs } from '@/lib/db';
import { btnGhostLight, btnPrimaryLight, card, cardHover, container, focusRing, SectionHeader } from '@/components/ui/brand';

export default async function HomeLatestNews() {
  let blogs: { slug: string; title: string; short_description?: string | null }[] = [];
  try {
    const result = await getPaginatedBlogs({ page: 1, limit: 3 });
    blogs = result.blogs;
  } catch {
    blogs = [];
  }

  if (blogs.length === 0) return null;

  return (
    <section aria-labelledby="home-news-heading" className="py-16 lg:py-24 border-t border-slate-200/70">
      <div className={container}>
        <SectionHeader
          title="Latest immigration news"
          lede="Stay up to date with changes that may affect your visa."
        />
        <ul className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blogs/${post.slug}`}
                className={`group ${card} ${cardHover} p-6 flex flex-col h-full ${focusRing}`}
                data-analytics-event="news_click"
                data-analytics-title={post.title}
              >
                <Newspaper className="w-8 h-8 text-brand-700" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-bold text-slate-900 group-hover:underline underline-offset-4 decoration-brand-600 decoration-2 leading-snug">
                  {post.title}
                </h3>
                {post.short_description && (
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3 flex-1">{post.short_description}</p>
                )}
                <span className="mt-4 text-sm font-bold text-brand-800 inline-flex items-center gap-1">
                  Read article
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/blogs" className={btnGhostLight} data-analytics-event="news_click" data-analytics-title="View all news">
            View all news and updates
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <Link href="/book-an-appointment" className={btnPrimaryLight}>
            Book a Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}