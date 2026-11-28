'use client';

import Link from 'next/link';
import { Calendar, Phone } from 'lucide-react';
import { btnPrimaryLight, focusRing } from '@/components/ui/brand';

const WHATSAPP =
  process.env.NEXT_PUBLIC_WHATSAPP_URL || 'https://wa.me/61396021330';

export default function MobileActionBar() {
  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-md p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] md:hidden shadow-[0_-8px_24px_rgba(15,23,42,0.08)]"
      aria-label="Quick actions"
    >
      <div className="grid grid-cols-2 gap-2">
        <Link href="/book-an-appointment" className={`${btnPrimaryLight} !min-h-11 text-sm py-2`}>
          <Calendar className="w-4 h-4" aria-hidden="true" />
          Book
        </Link>
        <a
          href="tel:+61396021330"
          className={`inline-flex items-center justify-center gap-2 min-h-11 px-4 rounded-xl font-bold text-brand-900 border border-slate-300 bg-white text-sm ${focusRing}`}
          data-analytics-event="phone_click"
          data-analytics-location="sticky_mobile"
        >
          <Phone className="w-4 h-4" aria-hidden="true" />
          Call
        </a>
      </div>
      {process.env.NEXT_PUBLIC_WHATSAPP_ENABLED === '1' && (
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-2 block text-center text-xs font-bold text-emerald-800 underline rounded ${focusRing}`}
          data-analytics-event="whatsapp_click"
          data-analytics-location="sticky_mobile"
        >
          WhatsApp us
        </a>
      )}
    </div>
  );
}