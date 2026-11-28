import Link from 'next/link';
import { container, SectionHeader, card, cardHover, focusRing } from '@/components/ui/brand';

const CARDS = [
  {
    title: 'Registered migration agents',
    text: 'Every adviser is on the OMARA register with a MARN you can check before you book.',
    href: 'https://portal.mara.gov.au/search-the-register-of-migration-agents/',
    link: 'Check the register',
    external: true,
  },
  {
    title: 'Advice in your language',
    text: 'Our team speaks English, Hindi and Punjabi, and some of us speak Gujarati.',
    href: '/team',
    link: 'Meet the team',
    external: false,
  },
  {
    title: 'Honest about your chances',
    text: 'We tell you whether a pathway is realistic before you spend money on a course, assessment or application. We never promise a visa.',
    href: '/about',
    link: 'How we work',
    external: false,
  },
  {
    title: 'Fees in writing',
    text: 'You see the consultation fee before you book. If you go ahead, we agree the work and fees in writing first.',
    href: '#clear-fees',
    link: 'See our fees',
    external: false,
  },
  {
    title: 'Melbourne and Adelaide',
    text: 'Meet in person, or by phone or video. Two offices in Australia.',
    href: '#offices',
    link: 'Our offices',
    external: false,
  },
] as const;

export default function WhyChooseSection() {
  return (
    <section className="py-16 lg:py-24 bg-white border-t border-slate-200/70">
      <div className={container}>
        <SectionHeader
          title="Why clients choose Bansal Immigration"
          lede="Straight advice from registered migration agents, in plain English and in your language."
        />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CARDS.map((c) => (
            <article key={c.title} className={`${card} ${cardHover} p-6`}>
              <h3 className="text-lg font-bold text-slate-900 leading-snug">{c.title}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{c.text}</p>
              {c.external ? (
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-4 inline-block text-sm font-bold text-brand-800 underline underline-offset-2 rounded ${focusRing}`}
                >
                  {c.link}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <Link href={c.href} className={`mt-4 inline-block text-sm font-bold text-brand-800 underline underline-offset-2 rounded ${focusRing}`}>
                  {c.link}
                </Link>
              )}
            </article>
          ))}
        </div>
        <div className="mt-10">
          <Link href="/book-an-appointment" className={`inline-flex items-center min-h-12 px-6 rounded-xl font-bold text-white bg-brand-700 hover:bg-brand-800 ${focusRing}`}>
            Book a Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}