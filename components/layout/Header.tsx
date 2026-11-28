'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  ArrowRight,
  Award,
  BookOpen,
  Calculator,
  ChevronDown,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  MessageSquareQuote,
  Phone,
  PlayCircle,
  Search,
  ShieldCheck,
  Users,
  Building2,
  ClipboardList,
  Landmark,
  X,
} from 'lucide-react';
import { COMPANY, CONTACT, TOOLS, VISA_GROUPS } from '@/lib/nav';
import MobileActionBar from '@/components/layout/MobileActionBar';
import type { NavLink } from '@/lib/nav';

type MenuId = 'visa' | 'tools' | 'about';

const ABOUT_LINKS: NavLink[] = COMPANY.filter((l) => l.href !== '/contact');

type Rich = NavLink & { icon: React.ElementType };

const TOOL_ICONS: Record<string, React.ElementType> = {
  '/migrate-to-australia/pr-point-calculator': Calculator,
  '/migrate-to-australia/victorian-points-test': Award,
  '/occupation-finder': Search,
  '/postcode-checker': MapPin,
  '/study-australia/student-visa-financial-calculator': GraduationCap,
  '/south-australia-state-nomination': Landmark,
  '/afp-national-police-check': ShieldCheck,
  '/office-visit-form': ClipboardList,
};
const TOOL_CALCULATORS = [
  '/migrate-to-australia/pr-point-calculator',
  '/migrate-to-australia/victorian-points-test',
  '/occupation-finder',
  '/postcode-checker',
  '/study-australia/student-visa-financial-calculator',
];
const toolsRich = (hrefs: string[]): Rich[] =>
  hrefs.map((h) => {
    const l = TOOLS.find((t) => t.href === h)!;
    return { ...l, icon: TOOL_ICONS[h] ?? FileText };
  });
const TOOLS_CALC = toolsRich(TOOL_CALCULATORS);
const TOOLS_FORMS = toolsRich(TOOLS.map((t) => t.href).filter((h) => !TOOL_CALCULATORS.includes(h)));

const ABOUT_CARDS: Rich[] = [
  { label: 'About us', href: '/about', desc: 'Who we are and how we work', icon: Building2 },
  { label: 'Our team', href: '/team', desc: 'Meet our registered migration agents', icon: Users },
  { label: 'Client reviews', href: '/testimonials', desc: 'What clients say about working with us', icon: MessageSquareQuote },
  { label: 'Success stories', href: '/success-stories', desc: 'Video stories from our clients', icon: PlayCircle },
  { label: 'Blogs and guides', href: '/blogs', desc: 'Migration news and how-to guides', icon: BookOpen },
  { label: 'Contact us', href: '/contact', desc: 'Call, email or visit our offices', icon: Mail },
];

const focus =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700';
const focusDark =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300';

const logoImg = (
  <Image
    src="/img/logo/logo_transparent.png"
    alt="Bansal Immigration Consultants"
    width={180}
    height={64}
    priority
    className="h-10 sm:h-11 w-auto object-contain"
  />
);

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + '/');
}

/** Flat, de-duplicated list of every page in the nav data for search. */
function buildSearchIndex() {
  const seen = new Set<string>();
  const out: { label: string; href: string; ctx: string }[] = [];
  const add = (l: NavLink, ctx: string) => {
    if (seen.has(l.href)) return;
    seen.add(l.href);
    out.push({ label: l.label, href: l.href, ctx });
  };
  VISA_GROUPS.forEach((g) => {
    add(g.hub, g.label);
    g.columns.forEach((c) => c.links.forEach((l) => add(l, g.label)));
  });
  TOOLS.forEach((l) => add(l, 'Tools'));
  COMPANY.forEach((l) => add(l, 'Company'));
  return out;
}

function SearchBox({
  onNavigate,
  autoFocus,
  className = '',
}: {
  onNavigate: () => void;
  autoFocus?: boolean;
  className?: string;
}) {
  const [q, setQ] = useState('');
  const index = useMemo(buildSearchIndex, []);
  const results = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return index
      .filter((r) => {
        const hay = `${r.label} ${r.ctx} ${r.href}`.toLowerCase();
        return terms.every((t) => hay.includes(t));
      })
      .slice(0, 8);
  }, [q, index]);

  return (
    <div className={className}>
      <label htmlFor={autoFocus ? 'site-search-desktop' : 'site-search-mobile'} className="sr-only">
        Search visas, tools and pages
      </label>
      <div className="relative">
        <Search
          aria-hidden="true"
          className="w-5 h-5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
        />
        <input
          id={autoFocus ? 'site-search-desktop' : 'site-search-mobile'}
          type="search"
          value={q}
          autoFocus={autoFocus}
          autoComplete="off"
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search visas, tools and pages"
          className="w-full min-h-12 pl-11 pr-4 rounded-xl border border-slate-300 bg-white text-base text-slate-900 placeholder:text-slate-500 focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-700/25"
        />
      </div>
      {q.trim() && (
        <ul className="mt-2 max-h-72 overflow-y-auto" aria-live="polite">
          {results.map((r) => (
            <li key={r.href}>
              <Link
                href={r.href}
                onClick={onNavigate}
                className={`flex flex-col min-h-12 justify-center px-3 py-2 rounded-lg hover:bg-brand-50 ${focus}`}
              >
                <span className="text-sm font-semibold text-slate-900">{r.label}</span>
                <span className="text-xs text-slate-600">{r.ctx}</span>
              </Link>
            </li>
          ))}
          {!results.length && (
            <li className="px-3 py-3 text-sm text-slate-600">
              No pages match.{' '}
              <Link
                href={`/occupation-finder?q=${encodeURIComponent(q.trim())}`}
                onClick={onNavigate}
                className={`font-semibold text-brand-800 underline underline-offset-4 ${focus}`}
              >
                Search occupations
              </Link>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState(0);
  const [mobileSection, setMobileSection] = useState<string | null>(null);

  const headerRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const railRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeAll = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setOpenMenu(null);
    setSearchOpen(false);
    setMobileOpen(false);
  }, []);

  // Close everything on route change.
  useEffect(() => {
    closeAll();
  }, [pathname, closeAll]);

  // Escape + outside click.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      const hadMenu = openMenu !== null || searchOpen;
      setOpenMenu(null);
      setSearchOpen(false);
      setMobileOpen(false);
      if (hadMenu) {
        const el = headerRef.current?.querySelector<HTMLElement>('[aria-expanded="true"]');
        el?.focus();
      }
    };
    const onDown = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
        setSearchOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
    };
  }, [openMenu, searchOpen]);

  // Drawer: lock scroll, focus, trap focus, restore focus.
  useEffect(() => {
    if (!mobileOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();
    const trigger = hamburgerRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !drawerRef.current) return;
      const f = drawerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
      );
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
      trigger?.focus();
    };
  }, [mobileOpen]);

  // Close drawer if resized to desktop.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const h = () => mq.matches && setMobileOpen(false);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);

  const openHover = (id: MenuId) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setSearchOpen(false);
      setOpenMenu(id);
    }, 80);
  };
  const leaveHover = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpenMenu(null), 180);
  };
  const keepOpen = () => {
    if (timer.current) clearTimeout(timer.current);
  };
  const toggle = (id: MenuId) => {
    if (timer.current) clearTimeout(timer.current);
    setSearchOpen(false);
    setOpenMenu((m) => (m === id ? null : id));
  };

  const visaActive = VISA_GROUPS.some(
    (g) =>
      isActive(pathname, g.hub.href) ||
      g.columns.some((c) => c.links.some((l) => isActive(pathname, l.href))),
  );
  const toolsActive = TOOLS.some((l) => isActive(pathname, l.href));
  const aboutActive = ABOUT_LINKS.some((l) => isActive(pathname, l.href));

  const triggerCls = (active: boolean, open: boolean) =>
    `inline-flex items-center gap-1 min-h-12 px-3 rounded-lg text-[15px] font-semibold whitespace-nowrap transition-colors motion-reduce:transition-none ${focus} ${
      active || open ? 'text-brand-900 bg-brand-50' : 'text-slate-800 hover:text-brand-900 hover:bg-slate-50'
    } ${active ? 'underline decoration-brand-600 decoration-2 underline-offset-8' : ''}`;

  const group = VISA_GROUPS[activeGroup];

  const onRailKey = (e: React.KeyboardEvent, i: number) => {
    const n = VISA_GROUPS.length;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const next = (i + (e.key === 'ArrowDown' ? 1 : -1) + n) % n;
      setActiveGroup(next);
      railRefs.current[next]?.focus();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      panelRef.current?.querySelector<HTMLElement>('a[href]')?.focus();
    }
  };

  if (pathname.startsWith('/admin')) return null;

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-3 focus:rounded-lg focus:bg-brand-700 focus:text-white focus:font-bold"
      >
        Skip to main content
      </a>
      <div className="sticky top-0 z-50">
        <div className="bg-brand-950 text-white text-sm border-b border-brand-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
            <p className="font-semibold">
              <span className="text-brand-300">Urgent:</span> Visa refused or deadline approaching?
            </p>
            <a
              href={CONTACT.phoneHref}
              className={`inline-flex items-center gap-1.5 font-bold underline underline-offset-2 decoration-brand-400 hover:text-brand-200 rounded ${focusDark}`}
            >
              <Phone aria-hidden="true" className="w-3.5 h-3.5" />
              Call {CONTACT.phone}
            </a>
          </div>
        </div>
        <header ref={headerRef} className="bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px] gap-3">
            <Link href="/" className={`shrink-0 rounded-lg ${focus}`} aria-label="Bansal Immigration Consultants home">
              {logoImg}
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center" aria-label="Primary">
              <Link
                href="/"
                aria-current={pathname === '/' ? 'page' : undefined}
                className={triggerCls(pathname === '/', false)}
              >
                Home
              </Link>
              <div onMouseEnter={() => openHover('visa')} onMouseLeave={leaveHover}>
                <button
                  type="button"
                  aria-expanded={openMenu === 'visa'}
                  aria-controls="menu-visa"
                  aria-haspopup="true"
                  onClick={() => toggle('visa')}
                  className={triggerCls(visaActive, openMenu === 'visa')}
                >
                  Visa services
                  <ChevronDown aria-hidden="true" className={`w-4 h-4 transition-transform motion-reduce:transition-none ${openMenu === 'visa' ? 'rotate-180' : ''}`} />
                </button>
              </div>

              <div onMouseEnter={() => openHover('tools')} onMouseLeave={leaveHover}>
                <button
                  type="button"
                  aria-expanded={openMenu === 'tools'}
                  aria-controls="menu-tools"
                  aria-haspopup="true"
                  onClick={() => toggle('tools')}
                  className={triggerCls(toolsActive, openMenu === 'tools')}
                >
                  Tools
                  <ChevronDown aria-hidden="true" className={`w-4 h-4 transition-transform motion-reduce:transition-none ${openMenu === 'tools' ? 'rotate-180' : ''}`} />
                </button>
              </div>

              <div onMouseEnter={() => openHover('about')} onMouseLeave={leaveHover}>
                <button
                  type="button"
                  aria-expanded={openMenu === 'about'}
                  aria-controls="menu-about"
                  aria-haspopup="true"
                  onClick={() => toggle('about')}
                  className={triggerCls(aboutActive, openMenu === 'about')}
                >
                  About
                  <ChevronDown aria-hidden="true" className={`w-4 h-4 transition-transform motion-reduce:transition-none ${openMenu === 'about' ? 'rotate-180' : ''}`} />
                </button>
              </div>

              <Link
                href="/contact"
                aria-current={isActive(pathname, '/contact') ? 'page' : undefined}
                className={triggerCls(isActive(pathname, '/contact'), false)}
              >
                Contact
              </Link>
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <div className="relative hidden lg:block">
                <button
                  type="button"
                  aria-label="Search the site"
                  aria-expanded={searchOpen}
                  aria-controls="site-search-panel"
                  onClick={() => {
                    setOpenMenu(null);
                    setSearchOpen((s) => !s);
                  }}
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-lg text-slate-800 hover:bg-slate-50 ${focus}`}
                >
                  <Search aria-hidden="true" className="w-5 h-5" />
                </button>
                {searchOpen && (
                  <div
                    id="site-search-panel"
                    className="absolute right-0 top-full mt-2 w-[24rem] bg-white rounded-2xl border border-slate-200 shadow-xl p-3"
                  >
                    <SearchBox autoFocus onNavigate={closeAll} />
                  </div>
                )}
              </div>
              <a
                href={CONTACT.phoneHref}
                aria-label={`Call ${CONTACT.phone}`}
                className={`hidden lg:inline-flex items-center gap-2 min-h-12 px-3 rounded-lg text-sm font-bold text-brand-900 hover:bg-slate-50 whitespace-nowrap ${focus}`}
              >
                <Phone aria-hidden="true" className="w-4 h-4" />
                <span className="hidden xl:inline">{CONTACT.phone}</span>
              </a>
              <Link
                href="/book-an-appointment"
                className={`hidden sm:inline-flex items-center justify-center min-h-12 px-5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-sm whitespace-nowrap shadow-sm transition-colors motion-reduce:transition-none ${focus}`}
              >
                Book a Consultation
              </Link>
              <button
                ref={hamburgerRef}
                type="button"
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-drawer"
                onClick={() => setMobileOpen(true)}
                className={`lg:hidden inline-flex items-center justify-center w-12 h-12 rounded-lg text-brand-900 hover:bg-slate-50 ${focus}`}
              >
                <Menu aria-hidden="true" className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mega menu panel */}
        <div
          id="menu-visa"
          onMouseEnter={keepOpen}
          onMouseLeave={leaveHover}
          className={`hidden absolute inset-x-0 top-full z-40 ${openMenu === 'visa' ? 'lg:block' : ''}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-b-2xl border border-t-0 border-slate-200 shadow-2xl grid grid-cols-[18rem_1fr] max-h-[calc(100vh-7rem)] overflow-hidden">
              <ul className="bg-slate-50 border-r border-slate-200 p-3 overflow-y-auto" aria-label="Visa categories">
                {VISA_GROUPS.map((g, i) => (
                  <li key={g.id}>
                    <button
                      type="button"
                      ref={(el) => {
                        railRefs.current[i] = el;
                      }}
                      onMouseEnter={() => setActiveGroup(i)}
                      onFocus={() => setActiveGroup(i)}
                      onClick={() => setActiveGroup(i)}
                      onKeyDown={(e) => onRailKey(e, i)}
                      aria-current={i === activeGroup ? 'true' : undefined}
                      className={`w-full text-left px-3 py-2.5 rounded-lg min-h-12 ${focus} ${
                        i === activeGroup ? 'bg-white shadow-sm ring-1 ring-slate-200' : 'hover:bg-white/70'
                      }`}
                    >
                      <span className="flex items-center justify-between gap-2 text-sm font-bold text-brand-900">
                        {g.label}
                        <ArrowRight aria-hidden="true" className={`w-4 h-4 text-brand-600 ${i === activeGroup ? 'opacity-100' : 'opacity-0'}`} />
                      </span>
                      <span className="block text-xs text-slate-600 leading-snug mt-0.5">{g.blurb}</span>
                    </button>
                  </li>
                ))}
              </ul>
              <div ref={panelRef} className="p-6 lg:p-8 overflow-y-auto min-h-[26rem]">
                <div className="flex items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-200">
                  <p className="text-lg font-bold text-brand-950">{group.label}</p>
                  <Link
                    href={group.hub.href}
                    onClick={closeAll}
                    className={`inline-flex items-center gap-1.5 min-h-10 text-sm font-bold text-brand-800 hover:text-brand-950 underline underline-offset-4 decoration-brand-600 decoration-2 rounded ${focus}`}
                  >
                    View all: {group.hub.label}
                    <ArrowRight aria-hidden="true" className="w-4 h-4" />
                  </Link>
                </div>
                <div
                  className="grid gap-x-8 gap-y-6"
                  style={{ gridTemplateColumns: `repeat(${group.columns.length}, minmax(0, 1fr))` }}
                >
                  {group.columns.map((c) => (
                    <div key={c.heading}>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">{c.heading}</p>
                      <ul>
                        {c.links.map((l) => (
                          <li key={l.href}>
                            <Link
                              href={l.href}
                              onClick={closeAll}
                              aria-current={pathname === l.href ? 'page' : undefined}
                              className={`block px-2 -mx-2 py-1.5 rounded-lg hover:bg-brand-50 ${focus} ${pathname === l.href ? 'bg-brand-50' : ''}`}
                            >
                              <span className="block text-sm font-semibold text-slate-900 leading-snug">{l.label}</span>
                              {l.desc && <span className="block text-xs text-slate-600">{l.desc}</span>}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tools panel */}
        <div
          id="menu-tools"
          onMouseEnter={keepOpen}
          onMouseLeave={leaveHover}
          className={`hidden absolute inset-x-0 top-full z-40 ${openMenu === 'tools' ? 'lg:block' : ''}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-b-2xl border border-t-0 border-slate-200 shadow-2xl grid grid-cols-12 overflow-hidden">
              <div className="col-span-3 bg-brand-950 text-white p-8 flex flex-col">
                <p className="mt-3 text-xl font-extrabold leading-snug">Check where you stand before you book</p>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  Calculators and finders give you a quick estimate. A registered agent can confirm your result.
                </p>
                <Link
                  href="/book-an-appointment"
                  onClick={closeAll}
                  className={`mt-auto pt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-200 hover:text-white ${focusDark} rounded`}
                >
                  Book a consultation
                  <ArrowRight aria-hidden="true" className="w-4 h-4" />
                </Link>
              </div>
              <div className="col-span-9 p-8 grid grid-cols-2 gap-x-10 gap-y-4">
                {[
                  { heading: 'Calculators and finders', items: TOOLS_CALC },
                  { heading: 'Guides, police checks and forms', items: TOOLS_FORMS },
                ].map((col) => (
                  <div key={col.heading}>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">{col.heading}</p>
                    <ul className="space-y-1">
                      {col.items.map((l) => (
                        <li key={l.href}>
                          <Link
                            href={l.href}
                            onClick={closeAll}
                            aria-current={isActive(pathname, l.href) ? 'page' : undefined}
                            className={`group flex items-start gap-3 p-2.5 -mx-2.5 rounded-xl hover:bg-brand-50 ${focus} ${isActive(pathname, l.href) ? 'bg-brand-50' : ''}`}
                          >
                            <span className="mt-0.5 w-10 h-10 shrink-0 rounded-lg bg-brand-50 group-hover:bg-white border border-brand-100 text-brand-900 flex items-center justify-center">
                              <l.icon aria-hidden="true" className="w-5 h-5" />
                            </span>
                            <span>
                              <span className="block text-sm font-bold text-slate-900 leading-snug">{l.label}</span>
                              {l.desc && <span className="block text-xs text-slate-600 leading-snug mt-0.5">{l.desc}</span>}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* About panel */}
        <div
          id="menu-about"
          onMouseEnter={keepOpen}
          onMouseLeave={leaveHover}
          className={`hidden absolute inset-x-0 top-full z-40 ${openMenu === 'about' ? 'lg:block' : ''}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-b-2xl border border-t-0 border-slate-200 shadow-2xl grid grid-cols-12 overflow-hidden">
              <div className="col-span-3 bg-brand-950 text-white p-8 flex flex-col">
                <p className="mt-3 text-xl font-extrabold leading-snug">Registered migration agents in Melbourne and Adelaide</p>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  Know who is advising you, read what clients say, and see how we work.
                </p>
                <a
                  href={CONTACT.phoneHref}
                  className={`mt-auto pt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-200 hover:text-white ${focusDark} rounded`}
                >
                  <Phone aria-hidden="true" className="w-4 h-4" />
                  {CONTACT.phone}
                </a>
              </div>
              <ul className="col-span-9 p-8 grid grid-cols-3 gap-4">
                {ABOUT_CARDS.map((l) => (
                  <li key={l.href} className="flex">
                    <Link
                      href={l.href}
                      onClick={closeAll}
                      aria-current={isActive(pathname, l.href) ? 'page' : undefined}
                      className={`group flex items-start gap-3 w-full p-4 rounded-xl border border-slate-200 hover:border-brand-300 hover:bg-brand-50 transition-colors motion-reduce:transition-none ${focus} ${isActive(pathname, l.href) ? 'bg-brand-50 border-brand-300' : ''}`}
                    >
                      <span className="w-11 h-11 shrink-0 rounded-lg bg-brand-50 group-hover:bg-white border border-brand-100 text-brand-900 flex items-center justify-center">
                        <l.icon aria-hidden="true" className="w-5 h-5" />
                      </span>
                      <span>
                        <span className="block text-sm font-bold text-slate-900 leading-snug">{l.label}</span>
                        <span className="block text-xs text-slate-600 leading-snug mt-0.5">{l.desc}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </header>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          id="mobile-drawer"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="lg:hidden fixed inset-0 z-[60] bg-white flex flex-col"
        >
          <div className="flex items-center justify-between h-[72px] px-4 sm:px-6 border-b border-slate-200 shrink-0">
            <Link href="/" onClick={closeAll} className={`rounded-lg ${focus}`} aria-label="Bansal Immigration Consultants home">
              {logoImg}
            </Link>
            <button
              ref={closeBtnRef}
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className={`inline-flex items-center justify-center w-12 h-12 rounded-lg text-brand-900 hover:bg-slate-50 ${focus}`}
            >
              <X aria-hidden="true" className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-6 py-4">
            <SearchBox onNavigate={closeAll} className="mb-4" />

            <div className="divide-y divide-slate-200 border-y border-slate-200">
              <Link
                href="/"
                onClick={closeAll}
                aria-current={pathname === '/' ? 'page' : undefined}
                className={`flex items-center min-h-12 px-1 py-2 text-base font-bold text-brand-950 ${focus} ${pathname === '/' ? 'underline decoration-brand-600 decoration-2 underline-offset-8' : ''}`}
              >
                Home
              </Link>
              <div>
                <p className="px-1 pt-4 pb-1 text-xs font-bold uppercase tracking-wider text-slate-600">Visa services</p>
                {VISA_GROUPS.map((g) => {
                  const open = mobileSection === g.id;
                  return (
                    <div key={g.id}>
                      <button
                        type="button"
                        aria-expanded={open}
                        aria-controls={`m-${g.id}`}
                        onClick={() => setMobileSection(open ? null : g.id)}
                        className={`w-full flex items-center justify-between gap-3 min-h-12 px-1 py-2 text-left text-base font-semibold text-slate-900 ${focus}`}
                      >
                        {g.label}
                        <ChevronDown aria-hidden="true" className={`w-5 h-5 shrink-0 text-brand-800 transition-transform motion-reduce:transition-none ${open ? 'rotate-180' : ''}`} />
                      </button>
                      <div id={`m-${g.id}`} hidden={!open} className="pb-3 pl-3 border-l-2 border-brand-700 ml-1">
                        <Link
                          href={g.hub.href}
                          onClick={closeAll}
                          className={`flex items-center justify-between min-h-12 px-3 rounded-lg bg-brand-50 text-sm font-bold text-brand-900 ${focus}`}
                        >
                          {g.hub.label}
                          <ArrowRight aria-hidden="true" className="w-4 h-4" />
                        </Link>
                        {g.columns.map((c) => (
                          <div key={c.heading} className="mt-3">
                            <p className="px-3 text-xs font-bold uppercase tracking-wider text-slate-600">{c.heading}</p>
                            <ul>
                              {c.links.map((l) => (
                                <li key={l.href}>
                                  <Link
                                    href={l.href}
                                    onClick={closeAll}
                                    aria-current={pathname === l.href ? 'page' : undefined}
                                    className={`flex flex-col justify-center min-h-12 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-50 ${focus} ${pathname === l.href ? 'bg-brand-50 font-bold' : ''}`}
                                  >
                                    {l.label}
                                    {l.desc && <span className="text-xs text-slate-600 font-normal">{l.desc}</span>}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {[
                { id: 'tools', label: 'Tools', links: TOOLS },
                { id: 'about', label: 'About', links: ABOUT_LINKS },
              ].map((s) => {
                const open = mobileSection === s.id;
                return (
                  <div key={s.id}>
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={`m-${s.id}`}
                      onClick={() => setMobileSection(open ? null : s.id)}
                      className={`w-full flex items-center justify-between gap-3 min-h-12 px-1 py-2 text-left text-base font-bold text-brand-950 ${focus}`}
                    >
                      {s.label}
                      <ChevronDown aria-hidden="true" className={`w-5 h-5 shrink-0 text-brand-800 transition-transform motion-reduce:transition-none ${open ? 'rotate-180' : ''}`} />
                    </button>
                    <ul id={`m-${s.id}`} hidden={!open} className="pb-3 pl-3 border-l-2 border-brand-700 ml-1">
                      {s.links.map((l) => (
                        <li key={l.href}>
                          <Link
                            href={l.href}
                            onClick={closeAll}
                            aria-current={pathname === l.href ? 'page' : undefined}
                            className={`flex flex-col justify-center min-h-12 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-50 ${focus} ${pathname === l.href ? 'bg-brand-50 font-bold' : ''}`}
                          >
                            {l.label}
                            {l.desc && <span className="text-xs text-slate-600 font-normal">{l.desc}</span>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}

              <Link
                href="/contact"
                onClick={closeAll}
                className={`flex items-center min-h-12 px-1 py-2 text-base font-bold text-brand-950 ${focus}`}
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="shrink-0 border-t border-slate-200 bg-white px-4 sm:px-6 py-4 grid grid-cols-1 min-[420px]:grid-cols-2 gap-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <a
              href={CONTACT.phoneHref}
              className={`inline-flex items-center justify-center gap-2 min-h-12 px-4 rounded-xl border border-slate-300 text-brand-900 font-bold text-base hover:bg-brand-50 ${focus}`}
            >
              <Phone aria-hidden="true" className="w-5 h-5" />
              Call us
            </a>
            <Link
              href="/book-an-appointment"
              onClick={closeAll}
              className={`inline-flex items-center justify-center min-h-12 px-4 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-base ${focus}`}
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      )}
      <MobileActionBar />
    </>
  );
}
