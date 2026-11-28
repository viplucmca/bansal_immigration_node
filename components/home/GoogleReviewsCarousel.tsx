'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import GoogleReviewCard from '@/components/home/GoogleReviewCard';
import { CONFIRMED_GOOGLE_REVIEWS } from '@/lib/data/googleReviews';
import type { GoogleReview } from '@/lib/data/googleReviews';
import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT } from '@/lib/siteConfig';
import { focusRing } from '@/components/ui/brand';

const GOOGLE_SEARCH_LINK =
  'https://www.google.com/search?q=Bansal+Immigration+Consultants+reviews';

const AUTO_MS = 4500;

function slidesForCarousel(reviews: GoogleReview[]): GoogleReview[] {
  if (reviews.length === 0) return [];
  if (reviews.length >= 6) return reviews;
  return [...reviews, ...reviews];
}

function perViewForWidth(width: number): number {
  if (width >= 1280) return 4;
  if (width >= 1024) return 3;
  if (width >= 640) return 2;
  return 1;
}

export default function GoogleReviewsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(1);
  const [paused, setPaused] = useState(false);

  const slides = useMemo(() => slidesForCarousel(CONFIRMED_GOOGLE_REVIEWS), []);
  const uniqueCount = CONFIRMED_GOOGLE_REVIEWS.length;
  const maxIndex = Math.max(0, slides.length - perView);

  const scrollToIndex = useCallback(
    (next: number, behavior: ScrollBehavior = 'smooth') => {
      const el = trackRef.current;
      if (!el) return;
      const card = el.querySelector<HTMLElement>('[data-review-card]');
      if (!card) return;
      const step = card.offsetWidth + 24;
      el.scrollTo({ left: next * step, behavior });
    },
    []
  );

  const syncArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-review-card]');
    if (!card) return;
    const step = card.offsetWidth + 24;
    const i = Math.round(el.scrollLeft / step);
    setIndex(Math.min(i, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    const update = () => {
      const pv = perViewForWidth(window.innerWidth);
      setPerView(pv);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const cap = Math.max(0, slides.length - perView);
    setIndex((i) => {
      const clamped = Math.min(i, cap);
      scrollToIndex(clamped, 'auto');
      return clamped;
    });
  }, [perView, scrollToIndex, slides.length]);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    if (uniqueCount <= 1 || maxIndex === 0) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches) return;

    const tick = () => {
      if (pausedRef.current) return;
      setIndex((current) => {
        const next = current >= maxIndex ? 0 : current + 1;
        scrollToIndex(next);
        return next;
      });
    };

    const id = window.setInterval(tick, AUTO_MS);
    return () => window.clearInterval(id);
  }, [maxIndex, scrollToIndex, uniqueCount]);

  const go = (dir: -1 | 1) => {
    setIndex((current) => {
      const next = dir === 1 ? (current >= maxIndex ? 0 : current + 1) : current <= 0 ? maxIndex : current - 1;
      scrollToIndex(next);
      return next;
    });
  };

  const ratingLine =
    GOOGLE_REVIEW_COUNT != null
      ? `${GOOGLE_RATING} on Google · ${GOOGLE_REVIEW_COUNT} reviews`
      : `${GOOGLE_RATING} on Google`;

  const canMove = maxIndex > 0;

  return (
    <div className="text-center">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Google reviews</p>
      <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-[2.5rem] font-medium text-slate-800 tracking-tight text-balance">
        What our clients are saying
      </h2>
      <p className="mt-3 text-sm text-slate-600">
        Rated{' '}
        <a
          href={GOOGLE_SEARCH_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className={`font-semibold text-brand-900 underline underline-offset-2 ${focusRing} rounded`}
        >
          {ratingLine}
        </a>
        . Reviews are from our public Google Business profile.
      </p>

      <div
        className="relative mt-12 max-w-6xl mx-auto"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false);
        }}
      >
        {canMove && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Show previous reviews"
              className={`absolute left-0 top-[108px] z-10 -translate-x-1/2 hidden md:flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-md hover:border-slate-300 hover:text-slate-900 ${focusRing}`}
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Show next reviews"
              className={`absolute right-0 top-[108px] z-10 translate-x-1/2 hidden md:flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-md hover:border-slate-300 hover:text-slate-900 ${focusRing}`}
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </>
        )}

        <div
          ref={trackRef}
          onScroll={syncArrows}
          aria-live="polite"
          aria-roledescription="carousel"
          aria-label="Google client reviews"
          className="flex gap-6 overflow-x-hidden scroll-smooth snap-x snap-mandatory pb-2 touch-pan-x"
        >
          {slides.map((review, i) => (
            <div
              key={`${review.id}-${i}`}
              data-review-card
              className="snap-start shrink-0 w-[min(88vw,320px)] sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-4.5rem)/4)] lg:min-w-[240px] text-left"
            >
              <GoogleReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}