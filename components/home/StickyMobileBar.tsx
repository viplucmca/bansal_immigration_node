'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, Phone } from 'lucide-react';
import { CONTACT } from '@/lib/nav';

export default function StickyMobileBar() {
  const [covered, setCovered] = useState(false);

  useEffect(() => {
    const form = document.getElementById('hero-lead');
    if (!form) return;
    const observer = new IntersectionObserver(([entry]) => setCovered(entry.isIntersecting), { threshold: 0 });
    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 pb-[env(safe-area-inset-bottom)] transition-transform motion-reduce:transition-none lg:hidden ${
        covered ? 'translate-y-full' : ''
      }`}
    >
      <div className="grid grid-cols-2 gap-2 p-2">
        <Link
          href="/book-an-appointment"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-700 px-3 text-sm font-bold text-white hover:bg-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
        >
          <Calendar className="w-4 h-4" aria-hidden="true" />
          Book a Consultation
        </Link>
        <a
          href={CONTACT.phoneHref}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-3 text-sm font-bold text-brand-900 hover:border-brand-700 hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
        >
          <Phone className="w-4 h-4" aria-hidden="true" />
          Call
        </a>
      </div>
    </div>
  );
}
