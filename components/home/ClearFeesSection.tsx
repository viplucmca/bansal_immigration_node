import Link from 'next/link';
import { container, SectionHeader, card, focusRing } from '@/components/ui/brand';

export default function ClearFeesSection() {
  return (
    <section id="clear-fees" className="py-16 lg:py-24 bg-slate-50 border-y border-slate-200/70 scroll-mt-24">
      <div className={container}>
        <SectionHeader title="Know the cost before you commit" lede="No surprises. You know what each step costs before you commit." />
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <article className={`${card} p-6 sm:p-7`}>
            <h3 className="text-lg font-bold text-slate-900">Free initial assessment</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              A free 10-minute assessment is available for clients already in Australia.
            </p>
          </article>
          <article className={`${card} p-6 sm:p-7`}>
            <h3 className="text-lg font-bold text-slate-900">Consultation</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              A 30-minute appointment with a registered migration agent is $150. The price for your appointment type is shown when you book online.
            </p>
          </article>
        </div>
        <p className="mt-6 text-sm text-slate-600 leading-relaxed max-w-3xl">
          Fees for visa applications depend on the visa and your situation, so we quote after your consultation. Government visa charges are separate.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link href="/book-an-appointment" className={`inline-flex items-center justify-center min-h-12 px-6 rounded-xl font-bold text-white bg-brand-700 hover:bg-brand-800 ${focusRing}`}>
            Book a Consultation
          </Link>
          <Link href="/terms-conditions" className={`inline-flex items-center justify-center min-h-12 px-6 rounded-xl font-bold text-brand-900 border border-slate-300 bg-white hover:bg-slate-50 ${focusRing}`}>
            Read our consumer guide
          </Link>
        </div>
      </div>
    </section>
  );
}