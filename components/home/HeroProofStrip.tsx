import Link from 'next/link';
import { container, focusRing } from '@/components/ui/brand';

const OMARA = 'https://portal.mara.gov.au/search-the-register-of-migration-agents/';

const PROOF = [
  {
    title: 'MARN registered',
    line: 'Every adviser is a registered migration agent. Check the register.',
    href: OMARA,
    external: true,
    label: 'Check the register',
  },
  {
    title: '12+ years experience',
    line: 'Helping people with Australian visas.',
    href: '/about',
    external: false,
    label: 'About us',
  },
  {
    title: '1,000+ client stories',
    line: 'Clients we have helped.',
    href: '/success-stories',
    external: false,
    label: 'Client stories',
  },
] as const;

export default function HeroProofStrip() {
  return (
    <section aria-label="Why you can trust us" className="border-b border-slate-200 bg-white">
      <div className={`${container} py-8`}>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROOF.map((p) => (
            <li key={p.title}>
              <h3 className="text-base font-bold text-slate-900">{p.title}</h3>
              <p className="mt-1 text-sm text-slate-600 leading-relaxed">{p.line}</p>
              {p.external ? (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-2 inline-block text-sm font-bold text-brand-800 underline underline-offset-2 rounded ${focusRing}`}
                >
                  {p.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <Link href={p.href} className={`mt-2 inline-block text-sm font-bold text-brand-800 underline underline-offset-2 rounded ${focusRing}`}>
                  {p.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}