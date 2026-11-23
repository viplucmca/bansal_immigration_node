import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  Users,
  Compass,
  FileCheck,
  Phone,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Scale,
  GraduationCap,
  Briefcase,
  Heart,
  Building,
  Flag,
  FileText,
  Star,
  Target,
  Eye,
  Lock,
  MessageSquare,
  BadgeCheck,
  Calendar,
} from 'lucide-react';
import AboutFaqAccordion from '@/components/about/AboutFaqAccordion';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import {
  container,
  sectionY,
  card,
  cardPad,
  cardHover,
  btnPrimaryDark,
  btnPrimaryLight,
  btnGhostDark,
  btnGhostLight,
  focusRing,
  linkText,
  SectionHeader,
  IconTile,
  PageHero,
  CtaBand,
  ArrowLabel,
} from '@/components/ui/brand';

export const metadata: Metadata = {
  title: 'About Bansal Immigration | Migration Agents Melbourne',
  description:
    'Meet the registered migration agents at Bansal Immigration in Melbourne and Adelaide. See how we work, what we cover and why clients trust us.',
  keywords: [
    'Bansal Immigration',
    'about Bansal Immigration',
    'Bansal Immigration Consultants',
    'Australian migration consultancy',
    'registered migration agents',
    'registered migration agents Melbourne',
    'OMARA registered agent',
    'migration agency Melbourne and Adelaide',
  ],
  alternates: {
    canonical: 'https://www.bansalimmigration.com.au/about',
  },
  openGraph: {
    title: 'About Bansal Immigration | Migration Agents Melbourne',
    description:
      'Meet the registered migration agents at Bansal Immigration in Melbourne and Adelaide. See how we work, what we cover and why clients trust us.',
    images: ['/img/team/team-bansal-960.jpg'],
    type: 'website',
    url: 'https://www.bansalimmigration.com.au/about',
  },
};

const servicePathways = [
  {
    title: 'Skilled migration',
    desc: 'Visas 189, 190 and 491, points, skills assessment and state nomination.',
    href: '/migrate-to-australia',
    icon: Briefcase,
  },
  {
    title: 'Study and graduate visas',
    desc: 'Student visa (Subclass 500), course changes and the Temporary Graduate visa (485).',
    href: '/study-australia',
    icon: GraduationCap,
  },
  {
    title: 'Partner and family visas',
    desc: 'Partner, prospective marriage, parent and child visas.',
    href: '/family-visa',
    icon: Heart,
  },
  {
    title: 'Employer sponsorship',
    desc: 'Skills in Demand 482, ENS 186, regional visas and DAMA.',
    href: '/employer-sponsored',
    icon: Building,
  },
  {
    title: 'Visitor visas',
    desc: 'Tourist, business and family visitor options.',
    href: '/visitor-visa',
    icon: Compass,
  },
  {
    title: 'Citizenship',
    desc: 'Eligibility and applications for citizenship.',
    href: '/citizenship',
    icon: Flag,
  },
  {
    title: 'Appeals and reviews',
    desc: 'Refusals, cancellations and the Administrative Review Tribunal (ART).',
    href: '/appeals',
    icon: Scale,
  },
  {
    title: 'Skills assessments',
    desc: 'Find your assessing authority and prepare your evidence.',
    href: '/occupation-finder',
    icon: FileCheck,
  },
];

const teamMembers = [
  {
    name: 'Arun Bansal',
    title: 'Director and Registered Migration Agent',
    marn: '2418466',
    slug: 'arun-bansal',
    qualifications: 'LLM, Grad Cert Australian Migration Law',
    image: '/img/team/arun-bansal.avif',
  },
  {
    name: 'Vipul Goyal',
    title: 'Managing Director and Migration Consultant',
    marn: '2418571',
    slug: 'vipul-goyal',
    qualifications: 'Grad Cert Australian Migration Law, Bachelor of Business',
    image: '/img/team/vipul-goyal.avif',
  },
  {
    name: 'Mamta Puri',
    title: 'Registered Migration Agent',
    marn: '2418481',
    slug: 'mamta-puri',
    qualifications: 'Grad Cert Australian Migration Law, Master of Commerce',
    image: '/img/team/mamta-puri.avif',
  },
  {
    name: 'Shubam Kumar',
    title: 'Registered Migration Agent',
    marn: '2619683',
    slug: 'shubam-kumar',
    qualifications: 'Registered migration agent',
    image: '/img/team/shubam-kumar.svg',
  },
  {
    name: 'Shaveena',
    title: 'Registered Migration Agent',
    marn: '2619533',
    slug: 'shaveena',
    qualifications: 'Registered migration agent',
    image: '/img/team/shaveena.svg',
  },
  {
    name: 'Celesty Parmar',
    title: 'Registered Migration Agent',
    marn: '2619664',
    slug: 'celesty-parmar',
    qualifications: 'Registered with OMARA',
    image: '/img/team/celesty-parmar.svg',
  },
];

const whyChooseDifferentiators = [
  {
    title: 'You deal with registered professionals',
    desc: 'Your matter is handled by registered migration agents who work under the Migration Agents Code of Conduct, not a sales team. Each agent’s MARN is on their profile.',
    icon: ShieldCheck,
  },
  {
    title: 'Honest advice, including “not yet”',
    desc: 'We assess your case against current law and policy. If a pathway is not realistic, we say so and discuss other options.',
    icon: Scale,
  },
  {
    title: 'Costs explained in writing',
    desc: 'Our professional fees, Department charges and third-party costs are different things. We explain each before you proceed.',
    icon: FileCheck,
  },
  {
    title: 'More than one route',
    desc: 'We look at your situation from several angles, such as state nomination, regional visas and employer sponsorship, so you have a Plan B.',
    icon: Compass,
  },
  {
    title: 'Where and how you prefer',
    desc: 'Meet in person in Melbourne or Adelaide, or speak by phone or video from anywhere.',
    icon: Users,
  },
];

const missionCommitments = [
  {
    title: 'No unrealistic recommendations',
    desc: 'We will not recommend a visa you are unlikely to qualify for.',
    icon: Scale,
  },
  {
    title: 'No guarantees',
    desc: 'We will not guarantee a result. Only the Department of Home Affairs decides.',
    icon: ShieldCheck,
  },
  {
    title: 'Your documents stay private',
    desc: 'We keep your personal documents private under the Privacy Act 1988.',
    icon: Lock,
  },
  {
    title: 'Replies within one business day',
    desc: 'We reply to enquiries within one business day.',
    icon: MessageSquare,
  },
];

const clientProcessSteps = [
  {
    step: '01',
    title: 'Tell us what you want',
    desc: 'Share your goal, your current visa and any dates that are close.',
    icon: MessageSquare,
  },
  {
    step: '02',
    title: 'Go through your options',
    desc: 'We explain the requirements, the evidence and the issues that may affect you.',
    icon: Compass,
  },
  {
    step: '03',
    title: 'Agree the work in writing',
    desc: 'A service agreement sets out what we will do, what it costs and what we need from you.',
    icon: FileText,
  },
  {
    step: '04',
    title: 'Prepare and follow through',
    desc: 'We help you gather evidence, prepare the application work agreed and respond to Department requests.',
    icon: CheckCircle2,
  },
];

const clientReviews = [
  {
    name: 'Ranjita Samyal',
    service: 'Skilled PR (Subclass 190)',
    source: 'Google Review',
    text: 'We had the privilege of working with Bansal Immigration under the guidance of Mr. Arun Bansal. I cannot express enough gratitude for the exceptional support we received throughout our PR journey. Their team demonstrated extraordinary empathy, understanding our situation in depth and tailoring their advice with precision.',
  },
  {
    name: 'Vipin Sharma',
    service: 'Subclass 482 to ENS 186 PR',
    source: 'Google Review',
    text: 'Exceptional service from the team at Bansal Immigration. From initial consultation to visa grant, their guidance was transparent, professional, and reliable. Highly recommended for employer-sponsored and permanent residency visas.',
  },
  {
    name: 'Simranjit Singh',
    service: 'Graduate & Skilled Pathway',
    source: 'Google Review',
    text: 'The best migration consultancy experience. They don’t make false promises—they tell you the real legal pathway and prepare your documents with extreme care. Thank you to the whole team.',
  },
];

const credentials = [
  { title: 'Registered agents', desc: 'Our migration agents are registered with OMARA. Check any agent on the official register.' },
  { title: '10+ years in Australian migration', desc: 'Our practice has worked in Australian migration for more than ten years.' },
  { title: 'Written service agreements', desc: 'You see the scope, professional fees and government charges in writing before work begins.' },
  { title: 'Two offices', desc: 'Melbourne head office and Adelaide office, plus phone and video appointments.' },
];

const approachPoints = [
  { title: 'A realistic pathway assessment', desc: 'We check the criteria and the risks before you commit to an application.', icon: CheckCircle2 },
  { title: 'Evidence that fits your case', desc: 'We review your documents against the rules that apply to your visa, not a generic checklist.', icon: ShieldCheck },
  { title: 'Checks before lodgement', desc: 'We look for gaps and inconsistencies before anything goes to the Department of Home Affairs.', icon: FileCheck },
];

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="border-b border-slate-100 bg-white">
        <Breadcrumbs items={[{ label: 'About Us' }]} className="max-w-7xl mx-auto" />
      </div>

      {/* 1. Hero */}
      <PageHero
        badge="Registered migration agents, regulated by OMARA"
        badgeIcon={<ShieldCheck className="w-4 h-4" aria-hidden="true" />}
        title="About Bansal Immigration: Registered Migration Agents in Melbourne11 and Adelaide"
        intro="Australian migration decisions affect your work, your studies and the people you want beside you. Bansal Immigration helps individuals, families and employers understand the rules, choose a realistic pathway and prepare their application properly. We tell you where you stand, including when the answer is not the one you hoped for."
        actions={
          <>
            <Link href="/book-an-appointment" className={btnPrimaryDark}>
              Book a Consultation
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link href="/team" className={btnGhostDark}>
              <Users className="w-4 h-4" aria-hidden="true" />
              Meet Our Team
            </Link>
            <a href="tel:+61396021330" className={btnGhostDark}>
              <Phone className="w-4 h-4" aria-hidden="true" />
              Call +61 3 9602 1330
            </a>
          </>
        }
        below={
          <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {credentials.map((c) => (
              <li key={c.title} className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5">
                <p className="text-base font-bold text-brand-900">{c.title}</p>
                <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{c.desc}</p>
              </li>
            ))}
          </ul>
        }
      />

      {/* 2. Approach */}
      <section id="approach" className={`${sectionY} bg-white scroll-mt-24`}>
        <div className={container}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <SectionHeader eyebrow="Our approach" title="Advice that starts with your circumstances" />
              <div className="mt-6 space-y-4 text-slate-600 leading-relaxed text-base sm:text-lg max-w-2xl">
                <p>
                  Before we talk about an application, we need to know where you are now and where you want to be. Your current visa, earlier applications, qualifications, work history and family situation all change the options you have.
                </p>
                <p>
                  We then explain the issues that need a closer look, the evidence you will need and the work involved. If a pathway has limits, you hear about them at the start, not after you have paid for a course or a skills assessment.
                </p>
              </div>
              <ul className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
                {approachPoints.map((pt) => (
                  <li key={pt.title} className={`${card} p-5`}>
                    <IconTile icon={pt.icon} />
                    <h3 className="mt-4 text-base font-bold text-slate-900 leading-snug">{pt.title}</h3>
                    <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{pt.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-[0_12px_32px_-12px_rgba(26,26,43,0.25)] bg-slate-100">
                <Image
                  src="/img/team/team-bansal-960.jpg"
                  alt="The Bansal Immigration team of registered migration agents"
                  width={960}
                  height={640}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Why choose */}
      <section id="why-choose" className={`${sectionY} bg-slate-50 scroll-mt-24`}>
        <div className={container}>
          <SectionHeader eyebrow="Why choose us" title="Why people choose us" lede="Five reasons clients tell us they chose to work with us." />
          <ul className="mt-12 grid grid-cols-1 lg:grid-cols-5 gap-5">
            {whyChooseDifferentiators.map((d) => (
              <li key={d.title} className={`${card} ${cardPad} flex flex-col`}>
                <IconTile icon={d.icon} />
                <h3 className="mt-5 text-lg font-bold text-slate-900 leading-snug">{d.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{d.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Services */}
      <section id="services" className={`${sectionY} bg-white scroll-mt-24`}>
        <div className={container}>
          <SectionHeader eyebrow="What we do" title="What our team can help with" lede="Pick the area closest to your situation." />
          <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {servicePathways.map((svc) => (
              <li key={svc.title} className="flex">
                <Link href={svc.href} className={`group ${card} ${cardHover} ${cardPad} flex flex-col w-full ${focusRing}`}>
                  <IconTile icon={svc.icon} />
                  <h3 className="mt-5 text-lg font-bold text-slate-900 leading-snug">{svc.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{svc.desc}</p>
                  <div className="mt-auto pt-5">
                    <ArrowLabel>Learn more</ArrowLabel>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Team */}
      <section id="team" className={`${sectionY} bg-slate-50 scroll-mt-24`}>
        <div className={container}>
          <SectionHeader
            eyebrow="The people behind your matter"
            title="Know who is advising you"
            lede="Read each profile, check registration on the OMARA register, and ask for a particular adviser if you prefer."
          />
          <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((agent) => (
              <li key={agent.slug} className="flex">
                <Link href={`/team/${agent.slug}`} className={`group ${card} ${cardHover} flex flex-col w-full overflow-hidden ${focusRing}`}>
                  <div className="relative w-full aspect-[4/3] sm:aspect-square bg-slate-100">
                    <Image
                      src={agent.image}
                      alt={`${agent.name}, ${agent.title}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <h3 className="text-lg font-bold text-slate-900">{agent.name}</h3>
                    <p className="mt-0.5 text-sm font-semibold text-brand-800">{agent.title}</p>
                    {agent.marn.startsWith('2') && (
                      <p className="mt-2 text-xs font-bold text-slate-700">MARN {agent.marn}</p>
                    )}
                    <p className="mt-3 flex items-start gap-2 text-sm text-slate-600 leading-relaxed">
                      <BookOpen className="w-4 h-4 mt-0.5 shrink-0 text-slate-500" aria-hidden="true" />
                      <span>{agent.qualifications}</span>
                    </p>
                    <div className="mt-auto pt-5">
                      <ArrowLabel>View profile</ArrowLabel>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Link href="/team" className={btnPrimaryLight}>
              <Users className="w-4 h-4" aria-hidden="true" />
              Meet the whole team
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Process */}
      <section id="process" className={`${sectionY} bg-white scroll-mt-24`}>
        <div className={container}>
          <SectionHeader eyebrow="Client process" title="How we work with you" lede="Four clear steps, so you always know what happens next." />
          <ol className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {clientProcessSteps.map((st) => (
              <li key={st.step} className={`${card} ${cardPad} flex flex-col`}>
                <div className="flex items-center justify-between">
                  <IconTile icon={st.icon} />
                  <span className="text-sm font-extrabold text-brand-700" aria-label={`Step ${st.step}`}>{st.step}</span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900 leading-snug">{st.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{st.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 7. Mission and vision */}
      <section id="mission-and-vision" className={`${sectionY} bg-slate-50 scroll-mt-24`}>
        <div className={container}>
          <SectionHeader eyebrow="Why we do this" title="Our mission and vision" />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <article className={`${card} ${cardPad}`}>
              <IconTile icon={Target} />
              <h3 className="mt-5 text-xl font-bold text-slate-900">Our mission</h3>
              <p className="mt-3 text-slate-600 leading-relaxed">
                To give clear, lawful and honest advice about Australian migration, so you can make decisions with a realistic view of your options.
              </p>
              <p className="mt-3 text-slate-600 leading-relaxed">
                We will not recommend a visa pathway that is unlikely to work just to earn a fee. Every case plan is built on current law and the evidence you can provide.
              </p>
            </article>
            <article className={`${card} ${cardPad}`}>
              <IconTile icon={Eye} />
              <h3 className="mt-5 text-xl font-bold text-slate-900">Our vision</h3>
              <p className="mt-3 text-slate-600 leading-relaxed">
                To be a migration practice that clients and referrers trust, because we are honest about what is possible, clear about costs and careful with every file.
              </p>
              <p className="mt-3 text-slate-600 leading-relaxed">
                We want migrants and businesses to get advice without misleading marketing, hidden fees or promises nobody can keep.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* 8. Standards */}
      <section id="standards" className={`${sectionY} bg-white scroll-mt-24`}>
        <div className={container}>
          <SectionHeader eyebrow="Our standards" title="Our promise to you, in plain words" lede="What you can expect every time you deal with us." />
          <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {missionCommitments.map((c) => (
              <li key={c.title} className={`${card} ${cardPad}`}>
                <IconTile icon={c.icon} />
                <h3 className="mt-5 text-lg font-bold text-slate-900 leading-snug">{c.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{c.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 9. Testimonials */}
      <section id="testimonials" className={`${sectionY} bg-slate-50 scroll-mt-24`}>
        <div className={container}>
          <SectionHeader
            eyebrow="Client experiences"
            title="What clients say"
            lede="Rated 4.9 out of 5 on Google. Read what individuals and families say about working with us."
          />
          <ul className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {clientReviews.map((rev) => (
              <li key={rev.name} className={`${card} ${cardPad} flex flex-col`}>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-0.5" role="img" aria-label="5 out of 5 stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" aria-hidden="true" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">{rev.source}</span>
                </div>
                <p className="mt-4 text-sm font-bold text-brand-800">{rev.service}</p>
                <blockquote className="mt-3 text-slate-700 leading-relaxed text-sm sm:text-base">
                  &ldquo;{rev.text}&rdquo;
                </blockquote>
                <div className="mt-auto pt-5 flex items-center justify-between border-t border-slate-100">
                  <span className="font-bold text-slate-900 text-sm mt-4">{rev.name}</span>
                  <BadgeCheck className="w-5 h-5 mt-4 text-brand-700" aria-hidden="true" />
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link href="/testimonials" className={btnPrimaryLight}>
              Read all reviews
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link href="/success-stories" className={btnGhostLight}>
              See case studies
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* 10. Offices */}
      <section id="offices" className={`${sectionY} bg-white scroll-mt-24`}>
        <div className={container}>
          <SectionHeader eyebrow="Offices" title="Visit us in Melbourne or Adelaide" lede="Monday to Friday, 9:30 am to 6:00 pm. Closed Saturday and Sunday." />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`${card} ${cardPad}`}>
              <h3 className="text-xl font-bold text-slate-900">Melbourne head office</h3>
              <p className="mt-2 text-slate-600">Level 8, 278 Collins Street, Melbourne VIC 3000</p>
            </div>
            <div className={`${card} ${cardPad}`}>
              <h3 className="text-xl font-bold text-slate-900">Adelaide office</h3>
              <p className="mt-2 text-slate-600">Unit 5, 55 Gawler Place, Adelaide SA 5000</p>
            </div>
          </div>
          <div className="mt-8 space-y-2 text-slate-700">
            <p>
              Phone: <a href="tel:+61396021330" className={linkText}>+61 3 9602 1330</a>
              <span className="mx-2 text-slate-400" aria-hidden="true">|</span>
              Email: <a href="mailto:info@bansalimmigration.com.au" className={linkText}>info@bansalimmigration.com.au</a>
            </p>
            <p className="text-slate-600">Please book before you visit so an adviser is free to see you.</p>
          </div>
        </div>
      </section>

      {/* 11. FAQ */}
      <section id="faq" className={`${sectionY} bg-slate-50 scroll-mt-24`}>
        <div className={container}>
          <SectionHeader eyebrow="FAQ" title="Frequently asked questions" />
          <div className="mt-12 max-w-3xl">
            <AboutFaqAccordion />
          </div>
        </div>
      </section>

      <CtaBand
        title="Talk to us about your next step"
        text="Tell us where you are and where you want to be. We will explain your options in plain English."
      />
    </div>
  );
}
