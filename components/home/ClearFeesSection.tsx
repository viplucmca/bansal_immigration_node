import Link from 'next/link';
import { container, btnPrimaryLight, btnGhostLight } from '@/components/ui/brand';

export default function ClearFeesSection() {
  return (
    <section id="clear-fees" className="py-16 lg:py-24 bg-slate-50/80 border-y border-slate-200/70 scroll-mt-24">
      <div className={container}>
        <div className="max-w-3xl">
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
            Know the Cost Before You Commit
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            No surprises. You know what each step costs before you commit.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <article className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-9 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900">Free initial assessment</h3>
            <p className="mt-4 text-[2.75rem] sm:text-5xl font-extrabold text-brand-700 leading-none tracking-tight">Free</p>
            <p className="mt-5 text-sm text-slate-600 leading-relaxed max-w-md">
              A free 10-minute assessment is available for clients already in Australia.
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-9 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900">Urgent Consultation</h3>
            <p className="mt-4 text-[2.75rem] sm:text-5xl font-extrabold text-brand-700 leading-none tracking-tight">$150</p>
            <p className="mt-5 text-sm text-slate-600 leading-relaxed max-w-md">
              A 30-minute appointment with a registered migration agent.
            </p>
          </article>
        </div>

        <p className="mt-8 text-sm text-slate-600 leading-relaxed max-w-3xl">
          Fees for visa applications depend on the visa and your situation, so we quote after your consultation. Government visa
          charges are separate.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
          <Link href="/book-an-appointment" className={btnPrimaryLight}>
            Book a Consultation
          </Link>
          <Link href="/terms-conditions" className={btnGhostLight}>
            Read our consumer guide
          </Link>
        </div>
      </div>
    </section>
  );
}