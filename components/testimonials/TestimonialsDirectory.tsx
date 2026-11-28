'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import GoogleReviewCard from '@/components/home/GoogleReviewCard';
import { GOOGLE_REVIEWS } from '@/lib/data/googleReviews';
import { focusRing } from '@/components/ui/brand';

const CATEGORIES = [
  { id: 'all', label: 'All reviews' },
  { id: 'skilled', label: 'Skilled Migration (189/190/491)' },
  { id: 'student', label: 'Student Visas (500)' },
  { id: 'partner', label: 'Partner Visas (820/801)' },
  { id: 'employer', label: 'Employer Sponsored (482/186)' },
  { id: 'family', label: 'Parent and Family Visas' },
] as const;

const VISIBLE = GOOGLE_REVIEWS.filter((r) => r.confirmed);
const TABS = CATEGORIES.filter((c) => c.id === 'all' || VISIBLE.some((r) => r.category === c.id));

export default function TestimonialsDirectory() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all' ? VISIBLE : VISIBLE.filter((r) => r.category === activeCategory);

  return (
    <div>
      <div role="group" aria-label="Filter reviews by visa type" className="flex flex-wrap gap-2">
        {TABS.map((cat) => {
          const active = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              aria-pressed={active}
              onClick={() => setActiveCategory(cat.id)}
              className={`min-h-12 px-5 rounded-xl text-sm font-semibold border transition-colors motion-reduce:transition-none cursor-pointer ${focusRing} ${
                active
                  ? 'bg-brand-900 text-white border-brand-900'
                  : 'bg-white text-slate-800 border-slate-300 hover:border-brand-700 hover:bg-brand-50'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        {filtered.map((r) => (
          <li key={r.id} className="flex flex-col">
            <GoogleReviewCard review={r} />
            <Link
              href={r.serviceHref}
              className={`mt-4 self-start text-sm font-semibold text-brand-800 hover:text-brand-950 underline-offset-2 hover:underline rounded ${focusRing}`}
            >
              {r.serviceLabel}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}