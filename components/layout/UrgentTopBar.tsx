import Link from 'next/link';
import { Phone } from 'lucide-react';
import { focusRing } from '@/components/ui/brand';

export default function UrgentTopBar() {
  return (
    <div className="bg-amber-950 text-amber-50 text-sm border-b border-amber-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
        <p className="font-semibold">
          <span className="text-amber-200 uppercase text-xs tracking-wide mr-2">Urgent</span>
          Visa refused or deadline approaching?
        </p>
        <p className="text-amber-100/95">
          <a
            href="tel:+61396021330"
            className={`inline-flex items-center gap-1.5 font-bold underline underline-offset-2 rounded ${focusRing}`}
            data-analytics-event="phone_click"
            data-analytics-location="urgent_bar"
          >
            <Phone className="w-3.5 h-3.5" aria-hidden="true" />
            Call +61 3 9602 1330
          </a>
          <span className="hidden sm:inline text-amber-200/80"> · </span>
          <Link href="/contact" className={`sm:ml-2 font-semibold underline underline-offset-2 rounded ${focusRing}`}>
            Request urgent call back
          </Link>
        </p>
      </div>
    </div>
  );
}