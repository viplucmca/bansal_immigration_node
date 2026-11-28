import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  User,
  ShieldCheck,
  CheckCircle2,
  Share2,
  ArrowRight,
  BookOpen,
  Phone,
  Building,
  Check,
} from 'lucide-react';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import { getBlog, getRelatedBlogs } from '@/lib/db';
import { buildArticleSchema } from '@/lib/seo/articleSchema';

/** A post is read from the database on each request so a new article does not wait for a rebuild. */
export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) return { title: 'Blog Not Found | Bansal Immigration' };

  const url = `https://www.bansalimmigration.com.au/blogs/${slug}`;
  return {
    title: blog.meta_title || `${blog.title} | Bansal Immigration`,
    description: blog.meta_description || blog.short_description || undefined,
    alternates: { canonical: url },
    openGraph: {
      title: blog.meta_title || blog.title,
      description: blog.meta_description || blog.short_description || undefined,
      url,
      type: 'article',
    },
  };
}

function resolveBlogImage(imgName?: string | null) {
  if (!imgName) return null;
  if (imgName.startsWith('http://') || imgName.startsWith('https://') || imgName.startsWith('/')) {
    return imgName;
  }
  return `/img/blog/${imgName}`;
}

function formatDate(dateStr?: string | null) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
}

function formatFullDate(dateStr?: string | null) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' });
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) notFound();

  const relatedBlogs = await getRelatedBlogs(blog.id, 3);
  const img = resolveBlogImage(blog.image);
  const wordCount = (blog.description || '').replace(/<[^>]+>/g, '').split(/\s+/).length;
  const readingTime = Math.max(1, Math.round(wordCount / 200));

  const displayAuthor =
    !blog.author || blog.author.toLowerCase() === 'admin'
      ? 'Arun Bansal (MARN 2418466)'
      : blog.author;

  const currentUrl = `https://www.bansalimmigration.com.au/blogs/${blog.slug}`;
  const articleLd = buildArticleSchema({
    headline: blog.title,
    slug: blog.slug,
    image: img,
    datePublished: blog.published_at || blog.created_at,
    dateModified: blog.updated_at || blog.published_at,
    authorName: displayAuthor.replace(/\s*\(MARN.*\)/, '').trim(),
    authorMarn: '2418466',
  });

  return (
    <div className="bg-slate-50/60 min-h-screen">
      <JsonLd data={articleLd} />
      {/* Breadcrumb Navigation */}
      <div className="border-b border-slate-200/80 bg-white">
        <Breadcrumbs
          items={[
            { label: 'News & Guides', href: '/blogs' },
            { label: blog.title },
          ]}
          className="max-w-7xl mx-auto"
        />
      </div>

      {/* Article Hero Header - Wide & Spacious */}
      <header className="bg-white border-b border-slate-200/80 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            {/* Regulatory Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-brand-50 text-brand-900 border border-brand-200/80 mb-4 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-brand-900 shrink-0" />
              <span>Reviewed by Registered Migration Agent • Code of Conduct Compliant</span>
            </div>

            {/* Article Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-900 leading-tight tracking-tight mb-5">
              {blog.title}
            </h1>

            {/* Metadata Bar */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs sm:text-sm text-slate-600">
              <div className="flex items-center gap-1.5 font-medium">
                <User className="w-4 h-4 text-brand-900 shrink-0" />
                <span>By <strong className="text-slate-900">{displayAuthor}</strong></span>
              </div>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-brand-900 shrink-0" />
                <span>{formatFullDate(blog.published_at || blog.created_at)}</span>
              </div>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-brand-900 shrink-0" />
                <span>{readingTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area - Generous 12-Column Grid */}
      <main className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left/Center Column: Spacious Reading Article (8 of 12 columns = ~820px-850px wide) */}
            <article className="lg:col-span-8 space-y-8">
              
              {/* Featured Image */}
              {img && (
                <div className="rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-md">
                  <img
                    src={img}
                    alt={blog.image_alt || blog.title}
                    className="w-full h-auto max-h-[520px] object-cover"
                  />
                </div>
              )}

              {/* Main Reading Card - Spacious Padding & Generous Typography */}
              <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200 shadow-sm">
                
                {/* Prose Body Content */}
                <div
                  className="prose prose-slate prose-lg max-w-none [&_.flex.space-x-4]:flex-wrap [&_.flex.space-x-4]:gap-2
                    text-slate-800 leading-relaxed
                    prose-headings:font-extrabold prose-headings:text-brand-900 prose-headings:tracking-tight
                    prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-slate-100 prose-h2:pb-3
                    prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
                    prose-p:text-slate-700 prose-p:leading-relaxed prose-p:text-base sm:prose-p:text-lg prose-p:mb-5
                    prose-ul:my-5 prose-ul:space-y-2 prose-li:text-slate-700 prose-li:text-base sm:prose-li:text-lg
                    prose-ol:my-5 prose-ol:space-y-2 prose-ol:text-slate-700
                    prose-table:w-full prose-table:my-6 prose-table:border prose-table:border-slate-200 prose-table:text-sm
                    prose-th:bg-slate-100/80 prose-th:p-3 prose-th:text-slate-900 prose-th:font-bold
                    prose-td:p-3 prose-td:border-b prose-td:border-slate-100 prose-td:text-slate-700
                    prose-a:text-brand-800 prose-a:font-semibold prose-a:underline hover:prose-a:text-brand-900
                    prose-blockquote:border-l-4 prose-blockquote:border-brand-700 prose-blockquote:bg-brand-50/40 prose-blockquote:p-4 prose-blockquote:rounded-r-xl prose-blockquote:italic prose-blockquote:text-slate-700
                    prose-strong:text-slate-900 prose-strong:font-bold"
                  dangerouslySetInnerHTML={{ __html: blog.description }}
                />

                {/* Social Share Bar */}
                <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                    <Share2 className="w-4 h-4 text-brand-900" />
                    <span>Share this publication:</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-xs font-semibold transition"
                    >
                      Facebook
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(blog.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-xs font-semibold transition"
                    >
                      Twitter / X
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-xs font-semibold transition"
                    >
                      LinkedIn
                    </a>
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${blog.title} - ${currentUrl}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* Author & OMARA Legal Attestation Card */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-900 border border-brand-200/80 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      Legal Review &amp; Quality Attestation
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-100 text-emerald-800">
                      MARN: 2418466
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    This article was authored and reviewed by <strong>Arun Bansal</strong> (Principal Migration Agent, Master of Laws, Bachelor of Laws) to ensure strict alignment with the <em>Migration Act 1958</em> and current Australian Department of Home Affairs statutory standards.
                  </p>
                  <p className="text-xs text-slate-500">
                    Regulated by the Office of the Migration Agents Registration Authority (OMARA).
                  </p>
                </div>
              </div>

              {/* Related Practice Area Hubs */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-brand-900" />
                  <span>Explore Australian Visa Categories</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <Link
                    href="/migrate-to-australia"
                    className="p-3.5 rounded-2xl bg-slate-50 hover:bg-brand-50 text-slate-800 hover:text-brand-900 font-semibold transition border border-slate-200 flex items-center justify-between"
                  >
                    <span>General Skilled Migration (189, 190, 491)</span>
                    <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                  </Link>
                  <Link
                    href="/study-australia"
                    className="p-3.5 rounded-2xl bg-slate-50 hover:bg-brand-50 text-slate-800 hover:text-brand-900 font-semibold transition border border-slate-200 flex items-center justify-between"
                  >
                    <span>Student Visa (Subclass 500)</span>
                    <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                  </Link>
                  <Link
                    href="/family-visa"
                    className="p-3.5 rounded-2xl bg-slate-50 hover:bg-brand-50 text-slate-800 hover:text-brand-900 font-semibold transition border border-slate-200 flex items-center justify-between"
                  >
                    <span>Partner &amp; Family Visas (820/801)</span>
                    <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                  </Link>
                  <Link
                    href="/visitor-visa"
                    className="p-3.5 rounded-2xl bg-slate-50 hover:bg-brand-50 text-slate-800 hover:text-brand-900 font-semibold transition border border-slate-200 flex items-center justify-between"
                  >
                    <span>Visitor Visas (Subclass 600)</span>
                    <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                  </Link>
                </div>
              </div>

              {/* Statutory Disclaimer */}
              <div className="p-5 rounded-2xl bg-slate-100/90 border border-slate-200 text-xs text-slate-600 leading-relaxed">
                <strong>Regulatory Disclaimer:</strong> The information contained in this publication is provided for general informational and educational purposes only. Australian immigration law is subject to ongoing statutory changes and ministerial directives. Reading this publication does not create a migration agent-client relationship. For formal case evaluation, schedule a consultation with our registered migration agents.
              </div>
            </article>

            {/* Right Sidebar (4 of 12 columns = ~380px wide, sticky) */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              
              {/* Consultation Booking CTA Card */}
              <div className="bg-brand-950 rounded-3xl p-6 sm:p-7 text-white shadow-lg space-y-4">
                <h3 className="text-xl font-extrabold leading-tight">
                  Need Help With Your Australian Visa?
                </h3>
                <p className="text-brand-100 text-xs sm:text-sm leading-relaxed">
                  Book a consultation with our registered migration agents in Melbourne or Adelaide. Get clear, reliable advice on your options and eligibility.
                </p>
                <div className="pt-2 space-y-2.5">
                  <Link
                    href="/book-an-appointment"
                    className="block w-full min-h-12 py-3 px-4 rounded-xl text-center bg-brand-700 hover:bg-brand-800 text-white font-bold text-sm shadow-sm transition-colors"
                  >
                    Book Consultation
                  </Link>
                  <a
                    href="tel:+61396021330"
                    className="block w-full py-2.5 px-4 rounded-xl text-center border border-white/30 text-white hover:bg-white/10 font-bold text-xs transition flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" /> Call +61 3 9602 1330
                  </a>
                </div>
              </div>

              {/* Publication Details Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100">
                  Publication Overview
                </h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="block font-semibold uppercase text-slate-400">Author</span>
                    <p className="text-slate-900 font-bold mt-0.5">{displayAuthor}</p>
                  </div>
                  <div>
                    <span className="block font-semibold uppercase text-slate-400">Date Published</span>
                    <p className="text-slate-900 font-semibold mt-0.5">
                      {formatFullDate(blog.published_at || blog.created_at)}
                    </p>
                  </div>
                  <div>
                    <span className="block font-semibold uppercase text-slate-400">Estimated Reading Time</span>
                    <p className="text-slate-900 font-semibold mt-0.5">{readingTime} minutes</p>
                  </div>
                  <div>
                    <span className="block font-semibold uppercase text-slate-400">Regulatory Standard</span>
                    <p className="text-emerald-700 font-semibold mt-0.5 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 stroke-[3]" /> OMARA Code Compliant
                    </p>
                  </div>
                </div>
              </div>

              {/* Office Locations Quick Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3.5">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Building className="w-4 h-4 text-brand-900" />
                  <span>Our Offices</span>
                </h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900">Melbourne Head Office</h4>
                    <p className="text-slate-600 mt-0.5">Level 8/278 Collins St, Melbourne VIC 3000</p>
                    <a href="tel:+61396021330" className="text-brand-900 font-semibold mt-0.5 inline-block hover:underline">
                      +61 3 9602 1330
                    </a>
                  </div>
                  <div className="pt-2 border-t border-slate-100">
                    <h4 className="font-bold text-slate-900">Adelaide Office</h4>
                    <p className="text-slate-600 mt-0.5">Unit 5, 55 Gawler Pl, Adelaide SA 5000</p>
                    <a href="tel:+61883171340" className="text-brand-900 font-semibold mt-0.5 inline-block hover:underline">
                      +61 8 8317 1340
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Related Articles Grid - Full Width 7xl */}
      {relatedBlogs.length > 0 && (
        <section className="py-14 bg-white border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-900">Related Articles</h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Continue exploring Australian visa updates and migration guidance.
                </p>
              </div>
              <Link
                href="/blogs"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-900 hover:underline"
              >
                <span>View All Articles</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {relatedBlogs.map((rel) => {
                const relImg = resolveBlogImage(rel.image);
                return (
                  <article
                    key={rel.id}
                    className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col group"
                  >
                    {relImg && (
                      <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                        <img
                          src={relImg}
                          alt={rel.image_alt || rel.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-1 justify-between">
                      <div>
                        <div className="text-xs text-slate-500 mb-2 font-medium">
                          {formatDate(rel.published_at || rel.created_at)}
                        </div>
                        <h3 className="font-extrabold text-slate-900 text-base mb-2 line-clamp-2 group-hover:text-brand-900 transition-colors">
                          <Link href={`/blogs/${rel.slug}`}>{rel.title}</Link>
                        </h3>
                        {rel.short_description && (
                          <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                            {rel.short_description}
                          </p>
                        )}
                      </div>
                      <Link
                        href={`/blogs/${rel.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-900 hover:underline pt-2 border-t border-slate-100"
                      >
                        <span>Read Full Guide</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
