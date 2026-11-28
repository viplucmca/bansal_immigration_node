import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Calculator,
  Search,
  MapPin,
  GraduationCap,
  Briefcase,
  Wrench,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Wallet,
  HelpCircle,
  Users,
  Compass,
} from 'lucide-react';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import RichText from '@/components/content/RichText';
import {
  container,
  sectionY,
  card,
  cardHover,
  cardPad,
  btnPrimaryLight,
  btnGhostLight,
  focusRing,
  SectionHeader,
  IconTile,
  PageHero,
  CtaBand,
  FaqList,
} from '@/components/ui/brand';
import { getContent, plainText } from '@/lib/content';
import { SKILLED_PAGE_REVIEWER, SKILLED_PAGE_UPDATED } from '@/lib/siteConfig';

/** This hub is a file in content/pages.json, built with the rest of the visa pages. */
export const dynamic = 'force-static';

const PATH = '/migrate-to-australia';
const SITE = 'https://www.bansalimmigration.com.au';

const TITLE = 'Skilled Migration Melbourne: 189, 190, 491 | Bansal Immigration';
const DESCRIPTION =
  'Compare skilled visas 189, 190 and 491, check your points and plan your route to PR with registered migration agents in Melbourne and Adelaide.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'skilled migration Melbourne',
    'skilled migration agent Melbourne',
    'subclass 189 visa',
    'subclass 190 visa',
    'subclass 491 visa',
    'skilled visa Australia',
    'state nomination Victoria',
    'registered migration agent Adelaide',
  ],
  alternates: { canonical: `${SITE}${PATH}` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE}${PATH}`, type: 'website', images: ['/img/team/team-bansal-960.jpg'] },
};

/* ---------------- content ---------------- */

const mainVisas = [
  {
    id: 'visa-189',
    name: 'Skilled Independent',
    sub: 'Subclass 189',
    kind: 'Permanent',
    sponsor: 'No sponsor',
    points: '0 extra points',
    where: 'Live and work anywhere in Australia',
    best: 'High-scoring applicants in an in-demand occupation who want to live anywhere in Australia.',
    href: '/migrate-to-australia/skilled-independent-visa-subclass-189',
    link: 'Subclass 189 requirements',
  },
  {
    id: 'visa-190',
    name: 'Skilled Nominated',
    sub: 'Subclass 190',
    kind: 'Permanent',
    sponsor: 'State or territory nominates you',
    points: '5 extra points',
    where: 'Intend to settle in the nominating state',
    best: 'Applicants whose occupation is on a state list and who are happy to settle in that state.',
    href: '/migrate-to-australia/skilled-nominated-visa-subclass-190',
    link: 'Subclass 190 requirements',
  },
  {
    id: 'visa-491',
    name: 'Skilled Work Regional',
    sub: 'Subclass 491',
    kind: 'Provisional, up to 5 years',
    sponsor: 'State, territory or eligible relative',
    points: '15 extra points',
    where: 'Live and work in a designated regional area',
    best: 'Applicants who want a lower-competition route and will live and work in regional Australia.',
    href: '/migrate-to-australia/skilled-work-regional-provisional-visa-subclass-491',
    link: 'Subclass 491 requirements',
  },
];

const otherPathways = [
  {
    name: 'PR Skilled Regional (191)',
    desc: 'Permanent visa for eligible 491 holders who have lived and worked in a regional area.',
    href: '/migrate-to-australia/permanent-residence-skilled-regional-visa-subclass-191',
  },
  {
    name: 'Skilled Regional (887)',
    desc: 'Permanent visa for holders of eligible older regional provisional visas.',
    href: '/migrate-to-australia/skilled-regional-visa-subclass-887',
  },
  {
    name: 'Temporary Graduate (485)',
    desc: 'Temporary post-study work visa. It is not points-tested and does not lead to PR on its own.',
    href: '/migrate-to-australia/temporary-graduate-visa-subclass-485',
  },
];

const startHere = [
  {
    situation: 'Your points are high and your occupation is on the national list',
    start: 'Skilled Independent (189)',
    href: '/migrate-to-australia/skilled-independent-visa-subclass-189',
  },
  {
    situation: 'A state lists your occupation and you are happy to settle there',
    start: 'Skilled Nominated (190)',
    href: '/migrate-to-australia/skilled-nominated-visa-subclass-190',
  },
  {
    situation: 'Your points are lower, or you will live and work in a regional area',
    start: 'Skilled Work Regional (491)',
    href: '/migrate-to-australia/skilled-work-regional-provisional-visa-subclass-491',
  },
  {
    situation: 'You are finishing, or have finished, study in Australia',
    start: 'Temporary Graduate (485)',
    href: '/migrate-to-australia/temporary-graduate-visa-subclass-485',
  },
];

const whoFor = [
  {
    icon: GraduationCap,
    title: 'Graduates studying or working in Australia',
    desc: 'You may hold a Temporary Graduate visa (subclass 485). You can use Australian study points, regional study points and a state nomination.',
    href: '/migrate-to-australia/temporary-graduate-visa-subclass-485',
    link: 'Temporary Graduate visa (485)',
  },
  {
    icon: Briefcase,
    title: 'Skilled professionals overseas',
    desc: 'You have a degree and several years in fields such as health, engineering, IT, teaching or accounting. You will need a skills assessment before you can be invited.',
    href: '/migrate-to-australia#check-you-are-ready',
    link: 'Check you are ready',
  },
  {
    icon: Wrench,
    title: 'Tradespeople',
    desc: 'Electricians, chefs, mechanics, carpenters and plumbers need a trade skills assessment from the assessing authority for your occupation.',
    href: '/occupation-finder',
    link: 'Find your assessing authority',
  },
];

const readiness = [
  { title: 'Your occupation', desc: 'It must be on the Skilled Occupation List that applies to your visa.', href: '/occupation-finder', link: 'Use the Occupation Finder' },
  { title: 'A skills assessment', desc: 'The assessing authority for your occupation confirms your qualification and experience.', href: '/skill-assessment', link: 'How assessments work' },
  { title: 'An English test', desc: 'Competent English is the minimum. Test results expire, so check the dates.', href: '/migrate-to-australia/points-for-english-score', link: 'English points' },
  { title: 'Your age', desc: 'You must be under 45 when you are invited.', href: '/skilled-migration/how-points-are-calculated', link: 'Age points' },
  { title: 'Your points', desc: 'You need at least 65 points to lodge an Expression of Interest. Invitations often go to higher scores.', href: '/migrate-to-australia/pr-point-calculator', link: 'Check my points' },
  { title: 'An Expression of Interest', desc: 'You lodge it in SkillSelect. It is not a visa application.', href: '#how-the-pathway-runs', link: 'How the pathway runs' },
];

const timeline = [
  { title: 'Skills assessment', desc: 'Confirms your occupation.' },
  { title: 'English test', desc: 'Shows your level.' },
  { title: 'Points and EOI', desc: 'You lodge it in SkillSelect.' },
  { title: 'Invitation', desc: 'Issued by the Department or a state.' },
  { title: 'Visa application', desc: 'Lodged after you are invited.' },
  { title: 'Decision', desc: 'Made by the Department.' },
];

const studyPath = [
  { title: 'Study in Australia', desc: 'Complete a course on a student visa.', href: '/study-australia' },
  { title: 'Temporary Graduate (485)', desc: 'Work in Australia after your course.', href: '/migrate-to-australia/temporary-graduate-visa-subclass-485' },
  { title: 'Assessment and EOI', desc: 'Get a skills assessment and lodge an Expression of Interest.', href: '#how-the-pathway-runs' },
  { title: 'Invitation', desc: 'Apply for the 189, 190 or 491.', href: '/migrate-to-australia/skilled-independent-visa-subclass-189' },
  { title: 'PR Skilled Regional (191)', desc: 'If you hold a 491, apply after meeting its requirements.', href: '/migrate-to-australia/permanent-residence-skilled-regional-visa-subclass-191' },
];

const states = [
  {
    name: 'Victoria',
    desc: '190 Registrations of Interest are open. The 491 is not. Rank yourself with the Victorian Points Test.',
    href: '/migrate-to-australia/victoria-state-nomination',
    link: 'Victoria state nomination',
  },
  {
    name: 'New South Wales',
    desc: 'The 190 is by invitation. New 491 applications are closed this program year.',
    href: '/migrate-to-australia/nsw-state-nomination',
    link: 'New South Wales state nomination',
  },
  {
    name: 'Queensland',
    desc: 'You need a new Registration of Interest for 2026–27, plus a current Expression of Interest.',
    href: '/migrate-to-australia/queensland-state-nomination',
    link: 'Queensland state nomination',
  },
  {
    name: 'Western Australia',
    desc: 'WA invites from SkillSelect. There is no separate Registration of Interest.',
    href: '/migrate-to-australia/western-australia-state-nomination',
    link: 'Western Australia state nomination',
  },
  {
    name: 'South Australia',
    desc: 'Read the graduate, employment and offshore streams Migration SA uses.',
    href: '/south-australia-state-nomination',
    link: 'South Australia state nomination',
  },
  {
    name: 'Tasmania',
    desc: 'A free Registration of Interest is ranked using Gold, Green and Orange attributes.',
    href: '/migrate-to-australia/tasmania-state-nomination',
    link: 'Tasmania state nomination',
  },
  {
    name: 'Australian Capital Territory',
    desc: 'Canberra uses the Canberra Matrix, which is separate from the Home Affairs points test.',
    href: '/migrate-to-australia/act-state-nomination',
    link: 'ACT state nomination',
  },
  {
    name: 'Northern Territory',
    desc: 'Most new applications are closed. A few onshore 491 cases can still apply.',
    href: '/migrate-to-australia/northern-territory-state-nomination',
    link: 'Northern Territory state nomination',
  },
];

const costTypes = [
  { title: 'Skills assessment fee', desc: 'Paid to the assessing authority for your occupation.' },
  { title: 'English test fee', desc: 'Paid to the test provider.' },
  { title: 'Visa application charge', desc: 'Paid to the Department of Home Affairs. Check the Department’s website for the current figure.' },
  { title: 'Health checks and police certificates', desc: 'Paid to the clinic or the police authority for you and any family on the application.' },
  { title: 'State nomination, where it applies', desc: 'A state may have its own requirements and fees. Check the state’s website.' },
  { title: 'Professional fees', desc: 'Our fees are agreed with you in writing before you proceed.' },
];

const notInvited = [
  'SkillSelect ranks Expressions of Interest by points, then by the date you reached that score.',
  'Invitation rounds depend on the number of places for each occupation.',
  'A high score does not guarantee an invitation, and the minimum of 65 points is often not enough in a competitive occupation.',
  'You can improve your position with a better English result, extra eligible points or a state nomination. A registered agent can tell you which is realistic.',
];

const tools = [
  { title: 'PR Points Calculator', desc: 'Estimates your points for 189, 190 and 491.', href: '/migrate-to-australia/pr-point-calculator', icon: Calculator },
  { title: 'Occupation Finder', desc: 'Searches occupations, codes and assessing authorities.', href: '/occupation-finder', icon: Search },
  { title: 'Regional Postcode Checker', desc: 'Shows whether a postcode is regional.', href: '/postcode-checker', icon: MapPin },
  { title: 'How points are calculated', desc: 'The full points table and a worked example.', href: '/skilled-migration/how-points-are-calculated', icon: Compass },
  { title: 'How the pathway runs', desc: 'Six stages, from the skills assessment to the Department’s decision.', href: '#how-the-pathway-runs', icon: Clock },
];

const agents = [
  { name: 'Arun Bansal', marn: '2418466', href: '/team/arun-bansal' },
  { name: 'Vipul Goyal', marn: '2418571', href: '/team/vipul-goyal' },
  { name: 'Mamta Puri', marn: '2418481', href: '/team/mamta-puri' },
  { name: 'Shubam Kumar', marn: '2619683', href: '/team/shubam-kumar' },
  { name: 'Shaveena', marn: '2619533', href: '/team/shaveena' },
  { name: 'Celesty Parmar', marn: '2619664', href: '/team/celesty-parmar' },
];

const whyUs = [
  'Your matter is handled by registered migration agents. Each agent’s MARN is on their profile.',
  'We assess your occupation, points and circumstances, then recommend a realistic pathway.',
  'Our fees, Department charges and third-party costs are explained before you proceed.',
  'We keep you updated on requests, deadlines and decisions as they happen.',
];

const textLink = `font-bold text-brand-800 hover:text-brand-950 underline underline-offset-4 decoration-brand-600 decoration-2 rounded ${focusRing}`;

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

/* ---------------- page ---------------- */

export default function Page() {
  const c = getContent(PATH);
  if (!c) notFound();

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faqs.map((f) => ({
      '@type': 'Question',
      name: plainText(f.q),
      acceptedAnswer: { '@type': 'Answer', text: plainText(f.a).replace(/\n- /g, ' ') },
    })),
  };

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Skilled migration visa assistance',
    serviceType: 'Skilled migration (subclasses 189, 190 and 491)',
    url: `${SITE}${PATH}`,
    areaServed: [
      { '@type': 'City', name: 'Melbourne' },
      { '@type': 'City', name: 'Adelaide' },
      { '@type': 'Country', name: 'Australia' },
    ],
    provider: {
      '@type': 'LegalService',
      name: 'Bansal Immigration',
      url: SITE,
      telephone: '+61-3-9602-1330',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Skilled visa pathways',
      itemListElement: mainVisas.map((v) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: `${v.name} visa (${v.sub})`, url: `${SITE}${v.href}` },
      })),
    },
  };

  return (
    <div className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />

      <div className="border-b border-slate-200 bg-white">
        <Breadcrumbs items={[{ label: 'Skilled Migration' }]} className={container} />
      </div>

      {/* 1. HERO */}
      <PageHero
        title="Skilled Migration to Australia: Choose Your Visa Pathway"
        intro="Australia invites skilled people to live and work here permanently. Compare the 189, 190 and 491, check your points and see your next step with registered migration agents in Melbourne and Adelaide."
        actions={
          <>
            <Link href="/migrate-to-australia/pr-point-calculator" className={btnPrimaryLight}>
              <Calculator className="w-5 h-5" aria-hidden="true" />
              Check my points
            </Link>
            <Link href="/occupation-finder" className={btnGhostLight}>
              <Search className="w-5 h-5" aria-hidden="true" />
              Find my occupation
            </Link>
          </>
        }
        aside={
          <div className={`${card} ${cardPad}`}>
            <h2 className="text-lg font-bold text-slate-900">The three main visas at a glance</h2>
            <ul className="mt-4 divide-y divide-slate-100">
              {mainVisas.map((v) => (
                <li key={v.id}>
                  <a href={`#${v.id}`} className={`group flex items-center justify-between gap-3 py-3 ${focusRing}`}>
                    <span>
                      <span className="block text-base font-bold text-slate-900">{v.sub}</span>
                      <span className="block text-sm text-slate-600">
                        {v.kind}. {v.sponsor}.
                      </span>
                    </span>
                    <ArrowRight className="w-4 h-4 shrink-0 text-brand-800 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        }
        below={
          <p className="mt-8 text-sm text-slate-600">
            Last updated <time dateTime={SKILLED_PAGE_UPDATED}>{formatDate(SKILLED_PAGE_UPDATED)}</time>.
            {SKILLED_PAGE_REVIEWER ? ` Reviewed by ${SKILLED_PAGE_REVIEWER}.` : ''} Figures come from the Department of Home Affairs and are checked on the dates shown.
          </p>
        }
      />

      {/* 2. COMPARE */}
      <section id="compare" className={`${sectionY} scroll-mt-24`}>
        <div className={container}>
          <SectionHeader
            title="Compare the three main skilled visas"
            lede="All three are points-tested. They differ in who sponsors you, how many extra points you get and where you live."
          />
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {mainVisas.map((v) => (
              <article key={v.id} id={v.id} className={`${card} ${cardPad} flex flex-col scroll-mt-24`}>
                <p className="text-sm font-bold text-brand-800">{v.sub}</p>
                <h3 className="mt-1 text-xl font-bold text-slate-900">{v.name}</h3>
                <dl className="mt-5 space-y-3 text-sm">
                  {[
                    ['Visa type', v.kind],
                    ['Sponsor', v.sponsor],
                    ['Points from nomination', v.points],
                    ['Where you live', v.where],
                  ].map(([k, val]) => (
                    <div key={k} className="grid grid-cols-5 gap-3">
                      <dt className="col-span-2 font-semibold text-slate-900">{k}</dt>
                      <dd className="col-span-3 text-slate-700">{val}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 text-sm leading-relaxed text-slate-600 flex-1">
                  <span className="font-semibold text-slate-900">Best for: </span>
                  {v.best}
                </p>
                <Link href={v.href} className={`mt-6 inline-flex items-center gap-1.5 ${textLink}`}>
                  {v.link}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>

          <h3 className="mt-14 text-xl font-bold text-slate-900">Other skilled pathways</h3>
          <ul className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
            {otherPathways.map((p) => (
              <li key={p.href} className="flex">
                <Link href={p.href} className={`group ${card} ${cardHover} p-5 w-full ${focusRing}`}>
                  <span className="block text-base font-bold text-slate-900">{p.name}</span>
                  <span className="mt-1.5 block text-sm text-slate-600 leading-relaxed">{p.desc}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. START HERE */}
      <section id="which-visa" className={`${sectionY} bg-slate-50 border-y border-slate-200/70 scroll-mt-24`}>
        <div className={container}>
          <SectionHeader
            title="Which visa should you look at first?"
            lede="Find the line that sounds most like you. It is a starting point, not advice."
          />
          <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
            {startHere.map((r) => (
              <li key={r.start} className="flex">
                <Link href={r.href} className={`group ${card} ${cardHover} p-6 w-full flex items-center justify-between gap-4 ${focusRing}`}>
                  <span>
                    <span className="block text-sm font-semibold text-slate-600">If this is you</span>
                    <span className="mt-1 block text-base font-bold text-slate-900 leading-snug">{r.situation}</span>
                    <span className="mt-3 block text-sm text-slate-600">
                      Start with <strong className="text-brand-900">{r.start}</strong>
                    </span>
                  </span>
                  <ArrowRight className="w-5 h-5 shrink-0 text-brand-800 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-slate-700">
            Still unsure?{' '}
            <Link href="/#pathways" className={textLink}>
              browse visa pathways on the home page
            </Link>{' '}
            or{' '}
            <Link href="/book-an-appointment" className={textLink}>
              book a consultation
            </Link>
            .
          </p>
        </div>
      </section>

      {/* 4. WHO IT IS FOR */}
      <section id="is-it-right-for-you" className={`${sectionY} scroll-mt-24`}>
        <div className={container}>
          <SectionHeader
            title="Is skilled migration right for you?"
            lede="It suits you if you have a qualification and work experience in an occupation Australia needs. Most people fall into one of three groups."
          />
          <ul className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {whoFor.map((w) => (
              <li key={w.title} className="flex">
                <div className={`${card} ${cardPad} w-full flex flex-col`}>
                  <IconTile icon={w.icon} />
                  <h3 className="mt-5 text-lg font-bold text-slate-900 leading-snug">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 flex-1">{w.desc}</p>
                  <Link href={w.href} className={`mt-5 inline-flex items-center gap-1.5 text-sm ${textLink}`}>
                    {w.link}
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. READINESS */}
      <section id="check-you-are-ready" className={`${sectionY} bg-brand-50 border-y border-brand-100 scroll-mt-24`}>
        <div className={container}>
          <SectionHeader
            title="Check you are ready"
            lede="Six things decide whether you can lodge an Expression of Interest. Work through them in this order."
          />
          <ol className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {readiness.map((r, i) => (
              <li key={r.title} className={`${card} p-6 flex flex-col`}>
                <span className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-brand-700 text-white font-extrabold text-sm flex items-center justify-center" aria-hidden="true">
                    {i + 1}
                  </span>
                  <h3 className="text-base font-bold text-slate-900">{r.title}</h3>
                </span>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 flex-1">{r.desc}</p>
                <Link href={r.href} className={`mt-4 inline-flex items-center gap-1.5 text-sm ${textLink}`}>
                  {r.link}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-slate-600">
            Minimum of 65 points: Department of Home Affairs, checked 12 November 2026. Tools give an estimate only. A registered agent can confirm your result.
          </p>
        </div>
      </section>

      {/* 6. TIMELINE */}
      <section id="how-the-pathway-runs" className={`${sectionY} scroll-mt-24`}>
        <div className={container}>
          <SectionHeader
            title="How the pathway runs"
            lede="Six stages, in order. How long each takes depends on the assessing authority, invitation rounds and Department processing, so we do not promise times."
          />
          <ol className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 relative">
            <div aria-hidden="true" className="hidden lg:block absolute top-5 left-[6%] right-[6%] h-px bg-brand-200" />
            {timeline.map((t, i) => (
              <li key={t.title} className="relative">
                <span className="relative z-10 w-10 h-10 rounded-full bg-brand-700 text-white font-extrabold flex items-center justify-center ring-8 ring-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-base font-bold text-slate-900">{t.title}</h3>
                <p className="mt-1 text-sm text-slate-600 leading-relaxed">{t.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 7. STUDY TO PR */}
      <section id="from-study-to-pr" className={`${sectionY} bg-slate-50 border-y border-slate-200/70 scroll-mt-24`}>
        <div className={container}>
          <SectionHeader
            title="From study to permanent residency"
            lede="Many people reach PR through study in Australia first. A 485 does not lead to PR on its own. It gives you time and work experience to build points."
          />
          <ol className="mt-12 grid grid-cols-1 md:grid-cols-5 gap-5">
            {studyPath.map((s, i) => (
              <li key={s.title} className="flex">
                <Link href={s.href} className={`group ${card} ${cardHover} p-5 w-full flex flex-col ${focusRing}`}>
                  <span className="text-sm font-extrabold text-brand-700">Step {i + 1}</span>
                  <span className="mt-2 block text-base font-bold text-slate-900 leading-snug">{s.title}</span>
                  <span className="mt-2 block text-sm text-slate-600 leading-relaxed">{s.desc}</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 8. STATES */}
      <section id="which-state" className={`${sectionY} scroll-mt-24`}>
        <div className={container}>
          <SectionHeader
            title="Which state or territory?"
            lede="For the 190 and 491, a state or territory nominates you. Each publishes its own occupation list and requirements, and they can differ from the national list."
          />
          <ul className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {states.map((s) => (
              <li key={s.name} className="flex">
                <div className={`${card} ${cardPad} w-full flex flex-col`}>
                  <h3 className="text-lg font-bold text-slate-900">{s.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 flex-1">{s.desc}</p>
                  <Link href={s.href} className={`mt-5 inline-flex items-center gap-1.5 text-sm ${textLink}`}>
                    {s.link}
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-slate-600">
            State rules change. Check the state’s website, use the{' '}
            <Link href="/postcode-checker" className={textLink}>Postcode Checker</Link> for regional areas, or{' '}
            <Link href="/book-an-appointment" className={textLink}>ask an adviser</Link>.
          </p>
        </div>
      </section>

      {/* 9. COSTS */}
      <section id="costs" className={`${sectionY} bg-brand-50 border-y border-brand-100 scroll-mt-24`}>
        <div className={container}>
          <SectionHeader
            title="What skilled migration can cost"
            lede="Costs come from several places. We list the types here and not the amounts, because government figures change. Each visa page tells you where to check the current charge."
          />
          <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {costTypes.map((t) => (
              <li key={t.title} className={`${card} p-6 flex items-start gap-4`}>
                <IconTile icon={Wallet} />
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">{t.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{t.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 10. NOT INVITED + FAMILY */}
      <section id="invitations" className={`${sectionY} scroll-mt-24`}>
        <div className={container}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <SectionHeader title="Not invited yet? Why that happens" />
              <ul className="mt-8 space-y-4">
                {notInvited.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-slate-700 leading-relaxed">
                    <HelpCircle className="w-5 h-5 mt-0.5 shrink-0 text-brand-700" aria-hidden="true" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeader title="Your partner and children" />
              <p className="mt-8 flex items-start gap-3 text-slate-700 leading-relaxed">
                <Users className="w-5 h-5 mt-0.5 shrink-0 text-brand-700" aria-hidden="true" />
                <span>
                  Usually you can include them as secondary applicants. Your partner may also add points if they meet the criteria.
                  Everyone on the application must meet health and character requirements.
                </span>
              </p>
              <p className="mt-4 text-slate-700 leading-relaxed">
                If your partner will apply in their own right, read about{' '}
                <Link href="/family-visa" className={textLink}>partner and family visas</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. TOOLS */}
      <section id="tools" className={`${sectionY} bg-slate-50 border-y border-slate-200/70 scroll-mt-24`}>
        <div className={container}>
          <SectionHeader
            title="Guides and tools"
            lede="Get a quick answer before you book. Tools give an estimate only."
          />
          <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {tools.map((t) => (
              <li key={t.title} className="flex">
                <Link href={t.href} className={`group ${card} ${cardHover} p-6 w-full flex flex-col ${focusRing}`}>
                  <IconTile icon={t.icon} />
                  <h3 className="mt-5 text-base font-bold text-slate-900 leading-snug">{t.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed flex-1">{t.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-800 group-hover:text-brand-950">
                    Open
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 12. WHY US */}
      <section id="why-us" className={`${sectionY} scroll-mt-24`}>
        <div className={container}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-6">
              <SectionHeader title="Why people choose us for skilled migration" />
              <ul className="mt-8 space-y-4">
                {whyUs.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-slate-700 leading-relaxed">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0 text-brand-700" aria-hidden="true" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`lg:col-span-6 ${card} ${cardPad}`}>
              <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                <ShieldCheck className="w-5 h-5 text-brand-800" aria-hidden="true" />
                Your registered migration agents
              </h3>
              <ul className="mt-4 divide-y divide-slate-100">
                {agents.map((a) => (
                  <li key={a.name}>
                    <Link href={a.href} className={`group flex items-center justify-between gap-3 py-3 ${focusRing}`}>
                      <span>
                        <span className="block text-base font-bold text-slate-900 group-hover:underline underline-offset-4 decoration-gold-400 decoration-2">{a.name}</span>
                        {a.marn && <span className="block text-sm text-slate-600">MARN {a.marn}</span>}
                      </span>
                      <ArrowRight className="w-4 h-4 text-brand-800" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-600">Appointments in Melbourne and Adelaide, or by phone or video.</p>
              <Link href="/book-an-appointment" className={`${btnPrimaryLight} mt-5 w-full sm:w-auto`}>
                Book a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 13. FAQ */}
      <section id="faq" className={`${sectionY} bg-slate-50 border-t border-slate-200/70 scroll-mt-24`}>
        <div className={container}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            <div className="lg:col-span-4">
              <SectionHeader title="Frequently asked questions" lede="Straight answers to what people ask us most." />
              <p className="mt-4 text-sm text-slate-600">
                Still unsure?{' '}
                <Link href="/contact" className={textLink}>Send us an enquiry</Link>.
              </p>
            </div>
            <div className="lg:col-span-8">
              <FaqList
                items={c.faqs.map((f) => ({
                  q: plainText(f.q),
                  a: (
                    <div className="space-y-3">
                      {f.a.split('\n').map((line, i) => (
                        <p key={i}>
                          <RichText text={line.startsWith('- ') ? line.slice(2) : line} />
                        </p>
                      ))}
                    </div>
                  ),
                }))}
              />
            </div>
          </div>
        </div>
      </section>

      <CtaBand title={c.cta.title} text={c.cta.text} />
    </div>
  );
}
