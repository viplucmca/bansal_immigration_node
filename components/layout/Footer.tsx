'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Mail, Phone, Clock, ShieldCheck, ChevronDown } from 'lucide-react';
import { COMPANY, CONTACT, LEGAL, TOOLS, VISA_GROUPS } from '@/lib/nav';
import type { NavLink } from '@/lib/nav';
import { SOCIAL_ICONS } from '@/components/layout/socialIcons';

const MARNS = ['2418466', '2418571', '2418481', '2619683', '2619533', '2619664'];
const OMARA = 'https://portal.mara.gov.au/search-the-register-of-migration-agents/';
const CODE_OF_CONDUCT =
  'https://www.legislation.gov.au/F2021L01856/2026-04-01/2026-04-01/text/original/pdf';

const SOCIALS = [
  { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/share/1HLkRjHfdu/' },
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/bansalimmigrationconsultants?igsh=ZmZxNzA1ZW03OTRw' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/bansal-immigration-consultants/?viewAsMember=true' },
  { id: 'x', label: 'X', href: 'https://x.com/Bansalimmi' },
  { id: 'youtube', label: 'YouTube', href: 'https://youtube.com/@bansalimmigrationconsultants?si=HDryW37a5lffs4Qj' },
  { id: 'pinterest', label: 'Pinterest', href: 'https://pin.it/3G66spsLH' },
  { id: 'threads', label: 'Threads', href: 'https://www.threads.com/@bansalimmigrationconsultants?hl=en' },
];

const focus =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700';
const linkCls = `inline-flex items-center min-h-8 py-1 text-sm text-slate-700 hover:text-brand-950 underline-offset-4 decoration-brand-600 decoration-2 hover:underline rounded transition-colors motion-reduce:transition-none ${focus}`;
const headingCls = 'text-xs font-bold uppercase tracking-[0.14em] text-brand-900 mb-3';

function Column({ title, links }: { title: string; links: NavLink[] }) {
  return (
    <nav aria-label={title}>
      <p className={headingCls}>{title}</p>
      <ul>
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className={linkCls}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Footer() {
  const pathname = usePathname();
  const [iasHtml, setIasHtml] = useState<{ href: string; src: string } | null>(null);
  // Visa list: open on larger screens, folded on phones (open by default so it works without JavaScript).
  const [wide, setWide] = useState(true);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)');
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // ICEF IAS accreditation badge (same account as the live site). Nothing is shown unless it loads.
  useEffect(() => {
    let cancelled = false;
    fetch('https://api2.icef.com/public/account/certificate/7064')
      .then((r) => r.json())
      .then((data) => {
        const rec = data?.records?.[0];
        if (cancelled || !rec?.CDN_link_to_IAS_logo__c) return;
        setIasHtml({
          href: `https://www.icef.com/agency/${rec.Master_Account__c}`,
          src: rec.CDN_link_to_IAS_logo__c,
        });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  if (pathname.startsWith('/admin')) return null;

  return (
    <footer className="bg-slate-100 text-slate-700 border-t-4 border-brand-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        {/* Brand, contact and registration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-300">
          <div className="lg:col-span-5">
            <Link
              href="/"
              aria-label="Bansal Immigration Consultants home"
              className={`inline-block rounded-lg ${focus}`}
            >
              <Image
                src="/img/logo/logo_transparent.png"
                alt="Bansal Immigration Consultants"
                width={220}
                height={80}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-slate-700 max-w-sm">
              Registered migration agents helping individuals, families and employers with Australian visas.
              Offices in Melbourne and Adelaide.
            </p>
            <Link
              href="/book-an-appointment"
              className={`mt-5 inline-flex items-center justify-center min-h-12 px-6 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-sm transition-colors motion-reduce:transition-none ${focus}`}
            >
              Book a Consultation
            </Link>
          </div>

          <div className="lg:col-span-4">
            <p className={headingCls}>Contact us</p>
            <ul className="space-y-1">
              <li>
                <a href={CONTACT.phoneHref} className={`${linkCls} gap-2 font-semibold`}>
                  <Phone aria-hidden="true" className="w-4 h-4 text-brand-800 shrink-0" />
                  Melbourne {CONTACT.phone}
                </a>
              </li>
              {CONTACT.offices
                .filter((o) => o.phone)
                .map((o) => (
                  <li key={o.name}>
                    <a href={o.phoneHref} className={`${linkCls} gap-2 font-semibold`}>
                      <Phone aria-hidden="true" className="w-4 h-4 text-brand-800 shrink-0" />
                      Adelaide {o.phone}
                    </a>
                  </li>
                ))}
              <li>
                <a href={`mailto:${CONTACT.email}`} className={`${linkCls} gap-2 font-semibold break-all`}>
                  <Mail aria-hidden="true" className="w-4 h-4 text-brand-800 shrink-0" />
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-2 pt-1 text-sm text-slate-700">
                <Clock aria-hidden="true" className="w-4 h-4 mt-0.5 text-brand-800 shrink-0" />
                {CONTACT.hours}
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className={headingCls}>Registered migration agents</p>
            <p className="flex items-start gap-2 text-sm leading-relaxed text-slate-700">
              <ShieldCheck aria-hidden="true" className="w-4 h-4 mt-0.5 text-brand-800 shrink-0" />
              MARN {MARNS.join(', ')}
            </p>
            <a
              href={OMARA}
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkCls} font-semibold underline`}
            >
              Check the OMARA register
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            {iasHtml && (
              <a
                href={iasHtml.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-4 block w-fit rounded-lg ${focus}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={iasHtml.src} alt="ICEF IAS Accredited" width={120} height={40} loading="lazy" decoding="async" style={{ width: 120, height: 'auto' }} />
              </a>
            )}
          </div>
        </div>

        {/* Full visa catalogue */}
        <div className="py-12 border-b border-slate-300">
          <p className="text-xl font-extrabold text-brand-950">All visa services</p>
          <p className="mt-1 text-sm text-slate-600">Every visa and service we help with, by category.</p>
          <div className="mt-8 sm:columns-2 lg:columns-4 gap-x-8 space-y-3 sm:space-y-0">
            {VISA_GROUPS.map((g) => {
              const isOpen = wide || !!openGroups[g.id];
              return (
                <section key={g.id} aria-labelledby={`f-${g.id}`} className="break-inside-avoid sm:mb-10 rounded-xl border border-slate-300 bg-white sm:border-0 sm:bg-transparent">
                  <div className="flex items-center justify-between gap-2 px-4 py-1 sm:p-0">
                    <p id={`f-${g.id}`} className="sm:mb-2">
                      <Link
                        href={g.hub.href}
                        className={`inline-flex items-center min-h-11 sm:min-h-0 text-sm font-bold text-brand-900 underline underline-offset-4 decoration-brand-600 decoration-2 hover:text-brand-950 rounded ${focus}`}
                      >
                        {g.label}
                      </Link>
                    </p>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`f-panel-${g.id}`}
                      aria-label={`${isOpen ? 'Hide' : 'Show'} ${g.label} links`}
                      onClick={() => setOpenGroups((o) => ({ ...o, [g.id]: !o[g.id] }))}
                      className={`sm:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-brand-900 ${focus}`}
                    >
                      <ChevronDown aria-hidden="true" className={`w-5 h-5 transition-transform motion-reduce:transition-none ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                  <div id={`f-panel-${g.id}`} hidden={!isOpen} className="px-4 pb-4 sm:p-0">
                    {g.columns.map((c, ci) => (
                      <div
                        key={c.heading}
                        className={`mt-2 sm:mt-4 pt-4 ${ci === 0 && g.columns.length === 1 ? 'sm:pt-0 pt-0' : 'border-t border-slate-300'}`}
                      >
                        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-800 mb-1.5">
                          <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-brand-600 shrink-0" />
                          {c.heading}
                        </p>
                        <ul>
                          {c.links.map((l) => (
                            <li key={l.href}>
                              <Link href={l.href} className={linkCls}>
                                {l.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>

        {/* Tools, company, registration */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-10 py-12 border-b border-slate-300">
          <Column title="Tools and forms" links={TOOLS} />
          <Column title="Company" links={COMPANY} />
          <nav aria-label="Standards and guides">
            <p className={headingCls}>Standards and guides</p>
            <ul>
              <li>
                <a href={CODE_OF_CONDUCT} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  Code of Conduct<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a href="/consumer_guide_english.pdf" target="_blank" rel="noopener noreferrer" className={linkCls}>
                  Consumer Guide<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* ABN and social */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5 py-6 border-b border-slate-300">
          <p className="text-sm text-slate-700 text-center lg:text-left">
            ABN: 70 958 120 428 | The Trustee for EASYVISA TRUST
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-2" aria-label="Follow us">
            {SOCIALS.map((s) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  target="_blank"
                  rel={s.id === 'threads' ? 'noopener noreferrer nofollow' : 'noopener noreferrer'}
                  aria-label={`${s.label} (opens in a new tab)`}
                  className={`inline-flex items-center justify-center w-11 h-11 rounded-full bg-brand-900 text-white hover:bg-brand-700 hover:text-white transition-colors motion-reduce:transition-none ${focus}`}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-[18px] h-[18px]">
                    {SOCIAL_ICONS[s.id]}
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col lg:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-700 text-center lg:text-left">
            &copy; {new Date().getFullYear()} Bansal Immigration. All rights reserved. | MARN Registered Migration Agents
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
            {LEGAL.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkCls}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-4 text-xs text-slate-600 text-center lg:text-left max-w-3xl">
          Visa outcomes are decided by the Department of Home Affairs. Information on this site is general and does not replace personal advice.
        </p>
      </div>
    </footer>
  );
}
