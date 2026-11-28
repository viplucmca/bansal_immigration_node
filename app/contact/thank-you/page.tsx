import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { container, btnPrimaryLight, focusRing } from '@/components/ui/brand';

export const metadata: Metadata = {
  title: 'Thank you | Bansal Immigration',
  description: 'We received your enquiry. A registered migration agent will contact you.',
  robots: { index: false, follow: false },
};

export default function ContactThankYouPage() {
  return (
    <div className="bg-brand-50 min-h-[60vh] py-16">
      <div className={`${container} max-w-xl text-center`}>
        <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" aria-hidden="true" />
        <h1 className="mt-6 text-3xl font-extrabold text-brand-900">Thank you</h1>
        <p className="mt-4 text-slate-600 leading-relaxed">
          We received your message. Our team will contact you during business hours, Monday to Friday, 9:30 am to 6:00 pm AEST/ACST.
        </p>
        <p className="mt-4 text-sm text-slate-500">
          If you have a strict visa deadline, call{' '}
          <a href="tel:+61396021330" className={`font-bold text-brand-800 underline ${focusRing}`}>
            +61 3 9602 1330
          </a>{' '}
          now rather than waiting for email.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/book-an-appointment" className={btnPrimaryLight}>
            Book a consultation
          </Link>
          <Link href="/" className={`inline-flex items-center justify-center min-h-12 px-6 rounded-xl font-bold border border-slate-300 bg-white text-slate-900 ${focusRing}`}>
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}