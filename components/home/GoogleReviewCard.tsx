'use client';

import { useState } from 'react';
import { BadgeCheck, Star } from 'lucide-react';
import type { GoogleReview } from '@/lib/data/googleReviews';
import { reviewInitials } from '@/lib/data/googleReviews';

function GoogleMark({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

type Props = {
  review: GoogleReview;
  className?: string;
};

export default function GoogleReviewCard({ review, className = '' }: Props) {
  const [expanded, setExpanded] = useState(false);
  const clamped = review.quote.length > 160 && !expanded;

  return (
    <article className={`flex flex-col min-w-0 ${className}`}>
      <div className="relative rounded-xl bg-white shadow-[0_2px_12px_rgba(15,23,42,0.08)] border border-slate-100 px-5 pt-5 pb-6">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5" role="img" aria-label={`${review.rating} out of 5 stars`}>
            {Array.from({ length: review.rating }).map((_, i) => (
              <Star key={i} className="w-[18px] h-[18px] text-amber-400 fill-amber-400" aria-hidden="true" />
            ))}
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <BadgeCheck className="w-5 h-5 text-[#1a73e8]" aria-hidden="true" />
            <GoogleMark className="w-5 h-5" />
          </div>
        </div>

        <blockquote
          className={`mt-4 text-[15px] leading-relaxed text-slate-700 ${
            clamped ? 'line-clamp-4' : ''
          }`}
        >
          {review.quote}
        </blockquote>

        {review.quote.length > 160 && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-2 text-sm font-medium text-slate-500 hover:text-slate-800 underline-offset-2 hover:underline"
          >
            {expanded ? 'Show less' : 'Read more'}
          </button>
        )}

        <span
          aria-hidden="true"
          className="absolute -bottom-[7px] left-9 w-3.5 h-3.5 rotate-45 bg-white border-r border-b border-slate-100"
        />
      </div>

      <div className="mt-5 flex items-center gap-3 pl-1">
        <div
          className={`w-11 h-11 rounded-full ${review.avatarClass} text-white text-sm font-bold flex items-center justify-center shrink-0 shadow-sm`}
        >
          {reviewInitials(review)}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-slate-900 truncate">{review.name}</p>
          <p className="text-xs text-slate-500 mt-0.5">{review.relativeTime}</p>
        </div>
      </div>
    </article>
  );
}