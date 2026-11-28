import HeroLeadForm from '@/components/home/HeroLeadForm';
import { container } from '@/components/ui/brand';

/** Section 3.15 — final CTA with same short callback form as hero. */
export default function HomeFinalCta() {
  return (
    <section id="final-callback" className="py-16 lg:py-24 bg-brand-950 text-white border-t border-brand-900">
      <div className={container}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Ready to talk about your visa?</h2>
            <p className="mt-4 text-lg text-slate-300 leading-relaxed">
              Tell us where you are now and where you want to be. We will explain your options in plain English.
            </p>
            <p className="mt-6 text-xs text-slate-400 leading-relaxed">
              Visa outcomes are decided by the Department of Home Affairs. Information on this site is general and does not replace personal advice.
            </p>
          </div>
          <div className="lg:max-w-md lg:ml-auto w-full">
            <HeroLeadForm embedded location="footer_final" />
          </div>
        </div>
      </div>
    </section>
  );
}