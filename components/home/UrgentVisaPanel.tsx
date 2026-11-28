import Link from 'next/link';
import { CheckCircle2, Phone } from 'lucide-react';
import { container, focusRing } from '@/components/ui/brand';

const CHECKLIST = [
  'Decision or notice type',
  'Your deadline date',
  'Reply by the next business day',
];

export default function UrgentVisaPanel() {
  return (
    <section
      id="visa-urgent"
      className="relative scroll-mt-24 border-y border-brand-900/50 bg-gradient-to-r from-brand-950 via-brand-900 to-indigo-950 text-white"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400"
      />
      <div className={`${container} py-12 lg:py-14`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-cyan-200">
              <span className="h-2 w-2 rounded-full bg-cyan-300" aria-hidden="true" />
              Urgent visa help
            </p>
            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-[2.35rem] font-extrabold leading-tight tracking-tight">
              <span className="text-white">Visa refused or</span>
              <br />
              <span className="text-cyan-300">deadline approaching?</span>
            </h2>
            <p className="mt-4 text-base text-slate-300 leading-relaxed max-w-lg">
              Tell us the decision or notice type and your deadline. We aim to respond by the next business day.
            </p>
            <ul className="mt-7 space-y-3">
              {CHECKLIST.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-cyan-400" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:text-right flex flex-col items-stretch lg:items-end gap-5">
            <Link
              href="/contact"
              className={`inline-flex items-center justify-center min-h-14 px-8 rounded-full bg-cyan-400 text-brand-950 text-base font-extrabold shadow-lg shadow-cyan-900/30 hover:bg-cyan-300 transition-colors motion-reduce:transition-none ${focusRing}`}
              data-analytics-event="urgent_callback_click"
              data-analytics-location="urgent_panel"
            >
              Request an urgent call back
            </Link>
            <p className="text-sm text-slate-400 max-w-sm lg:ml-auto">
              Tell us your decision type and deadline on our contact page. If you have your decision letter, mention the date
              on the form.
            </p>
            <div className="pt-2 lg:ml-auto w-full max-w-sm">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-amber-400">
                Deadline today or next business day?
              </p>
              <a
                href="tel:+61396021330"
                className={`mt-2 inline-flex items-center gap-3 text-3xl sm:text-4xl font-extrabold text-white tracking-tight hover:text-cyan-200 transition-colors rounded ${focusRing}`}
                data-analytics-event="phone_click"
                data-analytics-location="urgent_panel"
              >
                <Phone className="w-8 h-8 text-cyan-300 hidden sm:block" aria-hidden="true" />
                +61 3 9602 1330
              </a>
              <p className="mt-3 text-xs text-slate-400 leading-relaxed">
                Call us now rather than waiting for a call back. A call back does not extend any legal deadline.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}