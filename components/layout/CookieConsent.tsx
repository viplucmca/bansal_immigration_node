'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { btnPrimaryLight, focusRing } from '@/components/ui/brand';

const KEY = 'bic_cookie_consent';

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!localStorage.getItem(KEY)) setShow(true);
  }, []);

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      className="fixed bottom-20 md:bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 rounded-2xl border border-slate-200 bg-white p-5 shadow-xl"
    >
      <p className="text-sm text-slate-700 leading-relaxed">
        We use cookies for analytics to improve our website. See our{' '}
        <Link href="/cookie-policy" className="font-semibold text-brand-800 underline">
          cookie policy
        </Link>{' '}
        and{' '}
        <Link href="/privacy-policy" className="font-semibold text-brand-800 underline">
          privacy policy
        </Link>
        .
      </p>
      <button
        type="button"
        className={`${btnPrimaryLight} mt-4 w-full !min-h-10 text-sm ${focusRing}`}
        onClick={() => {
          localStorage.setItem(KEY, 'accepted');
          setShow(false);
        }}
      >
        Accept analytics cookies
      </button>
    </div>
  );
}