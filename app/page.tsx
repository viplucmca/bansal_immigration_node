import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  GraduationCap,
  Award,
  Calendar,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Calculator,
  Search,
  Star,
  Quote,
  Phone,
  Mail,
  ExternalLink,
  Clock,
  Languages,
  FileText,
  BadgeCheck,
} from "lucide-react";
import HeroLeadForm from "@/components/home/HeroLeadForm";
import OfficeStatus from "@/components/home/OfficeStatus";
import HomeFaqAccordion from "@/components/home/HomeFaqAccordion";
import OfficeMapReveal from "@/components/home/OfficeMapReveal";
import LiteYouTube from "@/components/video/LiteYouTube";
import AccreditationTicker from "@/components/home/AccreditationTicker";
import ChecklistLead from "@/components/home/ChecklistLead";
import JsonLd from "@/components/seo/JsonLd";
import { latestYouTube } from "@/lib/home/latestVideos";
import {
  container,
  card,
  cardHover,
  btnPrimaryLight,
  btnGhostLight,
  focusRing,
  SectionHeader,
  IconTile,
} from "@/components/ui/brand";
import { fallbackSuccessStories } from "@/lib/data/fallbackSuccessStories";
import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT, GOOGLE_PROFILE_URL } from "@/lib/siteConfig";
import { homeSchema } from "@/lib/seo/homeSchema";
import { getBlogs } from "@/lib/db";

const TITLE = "Registered Migration Agents Australia | Bansal Immigration";
const DESCRIPTION =
  "Book an appointment with OMARA-registered migration agents. Clear advice on skilled, student, partner and employer visas, in person, by phone or video.";
const OG_IMAGE = "/img/og/home-1200x630.jpg";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Bansal Immigration",
    locale: "en_AU",
    url: "/",
    title: "Book a Registered Migration Agent",
    description:
      "Plain-English visa advice from OMARA-registered migration agents. Book in person, by phone or by video.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Bansal Immigration: registered migration agents in Melbourne and Adelaide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Registered Migration Agent",
    description: "Plain-English visa advice from OMARA-registered migration agents.",
    images: [OG_IMAGE],
  },
};

export const dynamic = "force-dynamic";

/* ---------------- content ---------------- */

const proofPoints = [
  {
    title: "MARN Registered",
    desc: "Every adviser is a registered migration agent. Check the register.",
    href: "https://portal.mara.gov.au/search-the-register-of-migration-agents/",
    external: true,
  },
  {
    title: "12+ Years Experience",
    desc: "Helping people with Australian visas.",
    href: "/about",
    external: false,
  },
  {
    title: "10,000+ Success Stories",
    desc: "Clients we have helped.",
    href: "/success-stories",
    external: false,
  },
];

const helpAreas = [
  {
    title: "Skilled migration visas",
    desc: "Subclass 189, 190 and 491, points testing and state nomination.",
    href: "/migrate-to-australia",
    image: "/img/services/skilled-640.webp",
  },
  {
    title: "Partner and family visas",
    desc: "Partner, parent and child visas, and the evidence you need.",
    href: "/family-visa",
    image: "/img/services/partner-640.webp",
  },
  {
    title: "Student and graduate visas",
    desc: "Courses, student visa applications and the Temporary Graduate (485) visa.",
    href: "/study-australia",
    image: "/img/services/student-640.webp",
  },
  {
    title: "Employer-sponsored visas",
    desc: "Skills in Demand (482), Employer Nomination (186) and regional visas.",
    href: "/employer-sponsored",
    image: "/img/services/employer-640.webp",
  },
  {
    title: "Visitor visas",
    desc: "Tourist, business and family visits to Australia.",
    href: "/visitor-visa",
    image: "/img/services/visitor-640.webp",
  },
  {
    title: "Skills assessments",
    desc: "Find the right assessing authority for your occupation.",
    href: "/skill-assessment",
    image: "/img/services/skills-640.webp",
  },
  {
    title: "Citizenship",
    desc: "Citizenship by conferral or by descent.",
    href: "/citizenship",
    image: "/img/services/citizenship-640.webp",
  },
  {
    title: "Refused or cancelled visas",
    desc: "Review rights, strict deadlines and your next options. Call us as soon as you can.",
    href: "/appeals",
    image: "/img/services/appeals-640.webp",
  },
];

const popularVisas = [
  { label: "Skilled Independent (189)", href: "/migrate-to-australia/skilled-independent-visa-subclass-189" },
  { label: "Skilled Nominated (190)", href: "/migrate-to-australia/skilled-nominated-visa-subclass-190" },
  { label: "Skilled Work Regional (491)", href: "/migrate-to-australia/skilled-work-regional-provisional-visa-subclass-491" },
  { label: "Skills in Demand (482)", href: "/employer-sponsored/sid-visa-482" },
  { label: "Employer Nomination (186)", href: "/employer-sponsored/ens-186-trt" },
  { label: "Partner visa (820)", href: "/family-visa/partner-provisional-visa-subclass-820" },
  { label: "Partner visa (309)", href: "/family-visa/partner-provisional-visa-subclass-309" },
  { label: "Student visa (500)", href: "/study-australia/student-visa-subclass-500" },
  { label: "Temporary Graduate (485)", href: "/migrate-to-australia/temporary-graduate-visa-subclass-485" },
  { label: "Visitor visa (600)", href: "/visitor-visa/visitor-visa-600" },
];

const processSteps = [
  {
    heading: "Book Consultation",
    desc: "Book online in about two minutes, or request a call back. The fee for your appointment type is shown before you confirm.",
  },
  {
    heading: "Expert Advice",
    desc: "A registered migration agent goes through your situation, the visas that may fit, the evidence you would need and any risks. You decide what to do next, with no obligation to sign anything on the day.",
  },
  {
    heading: "Commence Your PR Pathway",
    desc: "If you decide to go ahead, we agree the scope, our fees and what we need from you in a written service agreement, then start preparing your application.",
  },
];

const whyChoose = [
  {
    title: "Registered migration agents",
    desc: "Every adviser is on the OMARA register with a MARN you can check before you book.",
    href: "https://portal.mara.gov.au/search-the-register-of-migration-agents/",
    linkLabel: "Check the register",
    external: true,
    icon: ShieldCheck,
  },
  {
    title: "Advice in your language",
    desc: "Our team speaks English, Hindi and Punjabi, and some of us speak Gujarati.",
    href: "/team",
    linkLabel: "Meet the team",
    external: false,
    icon: Languages,
  },
  {
    title: "Honest about your chances",
    desc: "We tell you whether a pathway is realistic before you spend money on a course, assessment or application. We never promise a visa.",
    href: "/about",
    linkLabel: "How we work",
    external: false,
    icon: BadgeCheck,
  },
  {
    title: "Fees in writing",
    desc: "You see the consultation fee before you book. If you go ahead, we agree the work and fees in writing first.",
    href: "#fees",
    linkLabel: "See our fees",
    external: false,
    icon: FileText,
  },
];

const usefulTools = [
  { title: "PR Points Calculator", desc: "Estimate your points for visas 189, 190 and 491.", href: "/migrate-to-australia/pr-point-calculator", icon: Calculator },
  { title: "Occupation Finder", desc: "Search occupations, ANZSCO codes and assessing authorities.", href: "/occupation-finder", icon: Search },
  { title: "Regional Postcode Checker", desc: "See if a postcode is regional for extra points.", href: "/postcode-checker", icon: MapPin },
  { title: "Student Visa Financial Calculator", desc: "Estimate the funds needed for a Subclass 500 visa.", href: "/study-australia/student-visa-financial-calculator", icon: GraduationCap },
  { title: "Victorian Points Test", desc: "Check your fit for Victorian state nomination.", href: "/migrate-to-australia/victorian-points-test", icon: Award },
];

const expertTeam = [
  { name: "Arun Bansal", title: "Director and Registered Migration Agent", marn: "2418466", languages: "English, Hindi, Punjabi", profileHref: "/team/arun-bansal", image: "/img/team/arun-bansal.avif" },
  { name: "Vipul Goyal", title: "Managing Director and Migration Consultant", marn: "2418571", languages: "English, Hindi", profileHref: "/team/vipul-goyal", image: "/img/team/vipul-goyal.avif" },
  { name: "Mamta Puri", title: "Registered Migration Agent", marn: "2418481", languages: "English, Hindi", profileHref: "/team/mamta-puri", image: "/img/team/mamta-puri.avif" },
  { name: "Shubam Kumar", title: "Registered Migration Agent", marn: "2619683", languages: "English, Hindi, Punjabi", profileHref: "/team/shubam-kumar", image: "/img/team/shubam-kumar.svg" },
  { name: "Shaveena", title: "Registered Migration Agent", marn: "2619533", languages: "English, Hindi, Punjabi", profileHref: "/team/shaveena", image: "/img/team/shaveena.svg" },
  { name: "Celesty Parmar", title: "Registered Migration Agent", marn: "2619664", languages: "English, Hindi, Gujarati", profileHref: "/team/celesty-parmar", image: "/img/team/celesty-parmar.svg" },
];

const verifiedReviews = [
  {
    name: "Ranjita Samyal",
    initials: "RS",
    serviceCategory: "Skilled PR (Subclass 190)",
    location: "Melbourne, VIC",
    excerpt:
      "The Bansal Immigration team provided extraordinary support throughout our PR journey. Their proactive, transparent communication and attention to detail made our migration process seamless and stress-free.",
  },
  {
    name: "Vik Singh",
    initials: "VS",
    serviceCategory: "Student Visa (Subclass 500)",
    location: "Adelaide, SA",
    excerpt:
      "From start to finish, the team was professional, supportive, and clear with every requirement. They handled my student visa application with exceptional care and kept me informed at every stage.",
  },
  {
    name: "Shipra Sharma",
    initials: "SS",
    serviceCategory: "General Skilled Migration",
    location: "Melbourne, VIC",
    excerpt:
      "I have trusted Bansal Immigration for over six years. Their strategic advice and consistent guidance have proven invaluable in achieving my Australian permanent residency goals.",
  },
];

const videoStoryMeta: Record<string, { title: string; summary: string; uploadDate: string }> = {
  "student-visa-granted-in-1-month": {
    title: "Client story: student visa, Adelaide",
    summary: "A couple needed clear steps for student visas. We reviewed their situation, prepared the applications and kept them updated through lodgement.",
    uploadDate: "2025-02-01",
  },
  "482-to-186-visa-granted-indian-restaurant-owner-gets-pr-in-australia-after-11-years": {
    title: "Client story: employer-sponsored visa, Melbourne",
    summary: "A hospitality professional explored employer-sponsored options. We mapped the pathway from temporary work to permanent residency and prepared each stage.",
    uploadDate: "2025-07-01",
  },
  "visa-refusal-overturned-dependent-visa-approved-after-error-fixed": {
    title: "Client story: visa refusal review",
    summary: "After a dependent visa refusal, we reviewed the decision letter, identified issues to raise and helped the client understand the next steps available.",
    uploadDate: "2025-02-01",
  },
};

const videoStories = fallbackSuccessStories
  .filter((s) => s.has_youtube && s.youtube_url)
  .slice(0, 3)
  .map((s) => {
    const id = /embed\/([A-Za-z0-9_-]{11})/.exec(s.youtube_url || "")?.[1] ?? "";
    const meta = videoStoryMeta[s.slug];
    return {
      slug: s.slug,
      title: meta?.title || s.title,
      summary: meta?.summary || s.excerpt || "",
      uploadDate: meta?.uploadDate || (s.created_at || "").slice(0, 10),
      id,
    };
  })
  .filter((v) => v.id);

const offices = [
  {
    name: "Melbourne office",
    address: "Level 8, 278 Collins Street, Melbourne VIC 3000",
    phone: "+61 3 9602 1330",
    tel: "+61396021330",
    email: "info@bansalimmigration.com.au",
    tz: "Australia/Melbourne",
    map: "Level 8, 278 Collins Street, Melbourne VIC 3000",
    photo: "/img/offices/melbourne-office.webp",
    photoAlt: "Bansal Immigration team at the Melbourne office on Collins Street",
  },
  {
    name: "Adelaide office",
    address: "Unit 5, 55 Gawler Place, Adelaide SA 5000",
    phone: "+61 8 8317 1340",
    tel: "+61883171340",
    email: "adelaide@bansalimmigration.com.au",
    tz: "Australia/Adelaide",
    map: "Unit 5, 55 Gawler Place, Adelaide SA 5000",
    photo: "",
    photoAlt: "",
  },
];

function videoObject(video: { title: string; summary: string; id: string; uploadDate?: string }) {
  if (!video.id || !video.uploadDate) return null;
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.summary,
    thumbnailUrl: `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`,
    uploadDate: video.uploadDate,
    embedUrl: `https://www.youtube.com/embed/${video.id}`,
    publisher: { "@id": "https://bansalimmigration.com.au/#organization" },
  };
}

function guessCategory(title: string, keywords?: string | null) {
  const hay = `${title} ${keywords || ""}`.toLowerCase();
  if (hay.includes("student") || hay.includes("485") || hay.includes("study")) return "Student";
  if (hay.includes("partner") || hay.includes("family") || hay.includes("spouse")) return "Partner";
  if (hay.includes("employer") || hay.includes("482") || hay.includes("186") || hay.includes("sponsor")) return "Employer";
  if (hay.includes("skilled") || hay.includes("189") || hay.includes("190") || hay.includes("491") || hay.includes("points")) return "Skilled";
  return "Policy";
}

function resolveBlogImage(imgName?: string | null) {
  if (!imgName) return null;
  if (imgName.startsWith("http://") || imgName.startsWith("https://") || imgName.startsWith("/")) return imgName;
  return `/img/blog/${imgName}`;
}

function formatDate(dateStr?: string | null) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" });
}

function RatingLine({ className = "" }: { className?: string }) {
  const text = `Rated ${GOOGLE_RATING} out of 5 on Google${GOOGLE_REVIEW_COUNT ? ` from ${GOOGLE_REVIEW_COUNT} reviews` : ""}`;
  const inner = (
    <>
      <span className="flex text-gold-500" aria-hidden="true">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-current" />
        ))}
      </span>
      <span className="text-sm font-bold text-brand-950">{text}</span>
      {GOOGLE_PROFILE_URL && <ExternalLink className="w-3.5 h-3.5 text-brand-800" aria-hidden="true" />}
    </>
  );
  const base = `inline-flex items-center gap-2.5 rounded-xl bg-brand-50 border border-brand-200 px-4 py-2.5 ${className}`;
  return GOOGLE_PROFILE_URL ? (
    <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer" className={`${base} hover:bg-brand-100 ${focusRing}`}>
      {inner}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    <span className={base}>{inner}</span>
  );
}

export default async function HomePage() {
  let newsPosts: Awaited<ReturnType<typeof getBlogs>> = [];
  try {
    newsPosts = (await getBlogs()).slice(0, 3);
  } catch {
    newsPosts = [];
  }
  const channelVideos = await latestYouTube(3);
  const newestBlog = newsPosts[0];
  const newestBlogTime = new Date(newestBlog?.published_at || newestBlog?.created_at || 0).getTime();
  const blogsAreCurrent = Number.isFinite(newestBlogTime) && Date.now() - newestBlogTime < 1000 * 60 * 60 * 24 * 120;
  const videoSchema = [
    ...videoStories.map((video) => videoObject(video)),
    ...channelVideos.map((video) =>
      videoObject({
        id: video.id,
        title: video.title,
        summary: video.summary || video.title,
        uploadDate: video.published,
      }),
    ),
  ].filter(Boolean);

  return (
    <div className="bg-white text-slate-700">
      <JsonLd data={[...homeSchema, ...videoSchema]} />

      {/* 3.2 HERO */}
      <section id="top" className="bg-brand-50 text-slate-900 border-b border-slate-200 scroll-mt-20">
        <div className={`${container} pt-12 pb-16 lg:pt-16 lg:pb-20`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-7">
              <p className="text-sm font-bold tracking-wide text-brand-800">OMARA-registered migration agents</p>
              <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-brand-900">
                Registered Migration Agents for Your Australian Visa
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-600 max-w-xl">
                Get clear, honest advice on your skilled, student, partner or employer visa from OMARA-registered
                migration agents. From first question to final decision, we guide you through each step of your visa
                pathway.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3">
                <Link href="/book-an-appointment" className={btnPrimaryLight}>
                  <Calendar className="w-5 h-5" aria-hidden="true" />
                  Book a Consultation
                </Link>
              </div>
              <p className="mt-3 text-sm text-slate-600">Takes about two minutes. You see the fee before you confirm.</p>
            </div>

            <div className="lg:col-span-5">
              <HeroLeadForm variant="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* Proof points under hero */}
      <section aria-label="Why you can trust us" className="relative z-10 -mt-8">
        <div className={container}>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_20px_40px_-20px_rgba(26,26,43,0.35)] grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            {proofPoints.map((item) => {
              const content = (
                <>
                  <p className="text-sm font-bold text-slate-900 leading-snug">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </>
              );
              return item.external ? (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block p-6 hover:bg-brand-50/60 ${focusRing}`}
                >
                  {content}
                </a>
              ) : (
                <Link key={item.title} href={item.href} className={`block p-6 hover:bg-brand-50/60 ${focusRing}`}>
                  {content}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <AccreditationTicker />

      {/* 3.3 Visa services */}
      <section id="pathways" className="pt-20 pb-16 lg:pt-28 lg:pb-24 scroll-mt-20">
        <div className={container}>
          <SectionHeader
            title="Your Path to Australia Starts Here"
            lede="Choose the area closest to your situation. Each page explains who can apply, the steps involved and how we can help."
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {helpAreas.map((p) => (
              <Link
                key={p.title}
                href={p.href}
                className={`group relative block overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700`}
              >
                <Image
                  src={p.image}
                  alt=""
                  width={640}
                  height={400}
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="absolute inset-0 -z-0 h-full w-full object-cover opacity-20 transition-opacity duration-300 motion-reduce:transition-none [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-visible:opacity-100"
                />
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 transition-opacity motion-reduce:transition-none [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-visible:opacity-100" />
                <h3 className="relative font-bold text-slate-900 group-hover:text-white group-focus-visible:text-white">
                  {p.title}
                </h3>
                <p className="relative mt-2 text-sm text-slate-600 group-hover:text-white group-focus-visible:text-white leading-relaxed">
                  {p.desc}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-12">
            <h3 className="text-base font-bold text-slate-900">Most searched visas</h3>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {popularVisas.map((v) => (
                <li key={v.href}>
                  <Link
                    href={v.href}
                    className={`inline-flex items-center min-h-10 px-4 rounded-full border border-slate-300 bg-white text-sm font-semibold text-brand-900 hover:border-brand-700 hover:bg-brand-50 transition-colors motion-reduce:transition-none ${focusRing}`}
                  >
                    {v.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3.5 Urgent panel */}
      <section id="urgent" className="py-16 lg:py-24 bg-brand-950 text-white scroll-mt-20">
        <div className={container}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-6">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                Visa refused or deadline approaching? Speak to an agent today.
              </h2>
              <ul className="mt-8 space-y-3 text-slate-200 leading-relaxed">
                <li>Review rights have strict deadlines, sometimes only days.</li>
                <li>A refusal, cancellation notice or looming deadline is stressful. You don’t have to face it alone.</li>
                <li>An agent reads your decision letter and explains what it means.</li>
                <li>You learn what can be done next.</li>
                <li>A registered migration agent calls you back.</li>
              </ul>
              <p className="mt-6 text-sm text-slate-400 leading-relaxed">
                Have your decision letter, passport and visa details ready. A call-back does not extend any legal
                deadline, so do not wait. We cannot guarantee the outcome of any review, appeal or application.
              </p>
            </div>
            <div className="lg:col-span-6">
              <HeroLeadForm variant="urgent" defaultHelp="Visa refused or cancelled" />
            </div>
          </div>
        </div>
      </section>

      {/* 3.6 How it works */}
      <section className="py-16 lg:py-24 bg-slate-50 border-y border-slate-200/70">
        <div className={container}>
          <SectionHeader
            title="Start Your Visa Journey in Three Simple Steps"
            lede="Three clear steps, so you always know what happens next."
          />
          <ol className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 relative">
            <div aria-hidden="true" className="hidden md:block absolute top-6 left-[8%] right-[8%] h-px bg-brand-200" />
            {processSteps.map((step, idx) => (
              <li key={step.heading} className="relative">
                <div className="relative z-10 w-12 h-12 rounded-full bg-brand-700 text-white font-extrabold text-lg flex items-center justify-center ring-8 ring-slate-50">
                  {idx + 1}
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{step.heading}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-sm">{step.desc}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12">
            <Link href="/book-an-appointment" className={btnPrimaryLight}>
              <Calendar className="w-5 h-5" aria-hidden="true" />
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* 3.7 Why choose us */}
      <section className="py-16 lg:py-24">
        <div className={container}>
          <SectionHeader
            title="Why clients choose Bansal Immigration"
            lede="Straight advice from registered migration agents, in plain English and in your language."
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyChoose.map((item) => (
              <div key={item.title} className={`${card} p-6 flex flex-col`}>
                <IconTile icon={item.icon} />
                <h3 className="mt-5 text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed flex-1">{item.desc}</p>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-800 hover:text-brand-950 ${focusRing}`}
                  >
                    {item.linkLabel}
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                ) : (
                  <Link href={item.href} className={`mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-800 hover:text-brand-950 ${focusRing}`}>
                    {item.linkLabel}
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                )}
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/book-an-appointment" className={btnPrimaryLight}>
              <Calendar className="w-5 h-5" aria-hidden="true" />
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* 3.8 Clear fees */}
      <section id="fees" className="py-16 lg:py-24 bg-brand-50 border-y border-brand-100 scroll-mt-20">
        <div className={container}>
          <SectionHeader
            title="Know the Cost Before You Commit"
            lede="No surprises. You know what each step costs before you commit."
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`${card} p-7`}>
              <h3 className="text-xl font-bold text-slate-900">Free initial assessment</h3>
              <p className="mt-3 text-slate-600 leading-relaxed">
                A free 10-minute assessment is available for clients already in Australia.
              </p>
            </div>
            <div className={`${card} p-7`}>
              <h3 className="text-xl font-bold text-slate-900">Urgent Consultation</h3>
              <p className="mt-3 text-slate-600 leading-relaxed">
                A 30-minute appointment with a registered migration agent is $150.
              </p>
            </div>
          </div>
          <p className="mt-6 text-sm text-slate-600 leading-relaxed max-w-3xl">
            Fees for visa applications depend on the visa and your situation, so we quote after your consultation.
            Government visa charges are separate.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/book-an-appointment" className={btnPrimaryLight}>
              <Calendar className="w-5 h-5" aria-hidden="true" />
              Book a Consultation
            </Link>
            <a
              href="/consumer_guide_english.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={btnGhostLight}
            >
              Read our consumer guide
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* 3.9 Reviews and stories */}
      <section className="py-16 lg:py-24">
        <div className={container}>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <SectionHeader title="Hear from Clients We Have Helped" />
            <RatingLine className="self-start" />
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {verifiedReviews.map((rev) => (
              <figure key={rev.name} className={`${card} p-7 flex flex-col`}>
                <Quote className="w-9 h-9 text-brand-600" aria-hidden="true" />
                <blockquote className="mt-4 text-base text-slate-700 leading-relaxed flex-1">{rev.excerpt}</blockquote>
                <figcaption className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-brand-900 text-white font-bold text-sm flex items-center justify-center shrink-0">
                    {rev.initials}
                  </div>
                  <div className="leading-tight">
                    <div className="text-sm font-bold text-slate-900">{rev.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {rev.serviceCategory} · {rev.location}
                    </div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>

          {GOOGLE_PROFILE_URL && (
            <div className="mt-8">
              <a
                href={GOOGLE_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={btnGhostLight}
              >
                Read all Google reviews
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          )}

          {videoStories.length > 0 && (
            <div className="mt-14">
              <h3 className="text-xl font-bold text-slate-900">Watch client stories</h3>
              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
                {videoStories.map((v) => (
                  <li key={v.slug}>
                    <LiteYouTube id={v.id} title={v.title} />
                    <p className="mt-3 text-base font-semibold text-slate-900 leading-snug">{v.title}</p>
                    <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{v.summary}</p>
                    <Link
                      href={`/success-stories/${v.slug}`}
                      className={`mt-2 inline-flex text-sm font-bold text-brand-800 hover:text-brand-950 ${focusRing}`}
                    >
                      Read the full story
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-slate-500">
                Every case is different. Past results do not guarantee future outcomes.
              </p>
              <div className="mt-6">
                <Link href="/success-stories" className={btnGhostLight}>
                  View all client stories
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3.10 Free tools */}
      <section className="py-16 lg:py-24 bg-slate-50 border-y border-slate-200/70">
        <div className={container}>
          <SectionHeader
            title="Free tools to check where you stand"
            lede="Get a quick answer before you book. Tools give an estimate only. A registered agent can confirm your result."
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {usefulTools.map((tool) => (
              <Link key={tool.title} href={tool.href} className={`group ${card} ${cardHover} p-6 flex flex-col ${focusRing}`}>
                <IconTile icon={tool.icon} />
                <h3 className="mt-5 text-base font-bold text-slate-900 leading-snug">{tool.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed flex-1">{tool.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-800 group-hover:text-brand-950">
                  Open the {tool.title}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
          <ChecklistLead />
        </div>
      </section>

      {/* 3.11 Latest news */}
      <section className="py-16 lg:py-24">
        <div className={container}>
          <SectionHeader
            title="Latest Immigration News"
            lede="Stay up to date with changes that may affect your visa."
          />
          {blogsAreCurrent ? (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {newsPosts.map((post) => {
                const img = resolveBlogImage(post.image);
                const date = formatDate(post.published_at || post.created_at);
                const category = guessCategory(post.title, post.meta_keywords);
                return (
                  <article key={post.slug} className={`${card} flex flex-col`}>
                    {img && (
                      <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl bg-brand-50">
                        <Image src={img} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-brand-800">
                        <span>{category}</span>
                        {date && (
                          <>
                            <span aria-hidden="true">·</span>
                            <time dateTime={post.published_at || post.created_at || undefined}>{date}</time>
                          </>
                        )}
                      </div>
                      <h3 className="mt-3 text-lg font-bold text-slate-900 leading-snug break-words">
                        <Link href={`/blogs/${post.slug}`} className={`hover:underline underline-offset-4 decoration-brand-600 ${focusRing}`}>
                          {post.title}
                        </Link>
                      </h3>
                      {post.short_description && (
                        <p className="mt-2 text-sm text-slate-600 leading-relaxed">{post.short_description}</p>
                      )}
                      <Link
                        href={`/blogs/${post.slug}`}
                        className={`mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-800 hover:text-brand-950 ${focusRing}`}
                      >
                        Read more
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {channelVideos.map((video) => {
                const date = formatDate(video.published);
                return (
                  <article key={video.id} className={`${card} p-6 flex flex-col`}>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-brand-800">
                      <span>{guessCategory(video.title)}</span>
                      {date && (
                        <>
                          <span aria-hidden="true">·</span>
                          <time dateTime={video.published}>{date}</time>
                        </>
                      )}
                    </div>
                    <h3 className="mt-3 text-lg font-bold text-slate-900 leading-snug break-words">
                      <a
                        href={`https://www.youtube.com/watch?v=${video.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`hover:underline underline-offset-4 decoration-brand-600 ${focusRing}`}
                      >
                        {video.title}
                      </a>
                    </h3>
                    {video.summary && <p className="mt-2 text-sm text-slate-600 leading-relaxed">{video.summary}</p>}
                    <a
                      href={`https://www.youtube.com/watch?v=${video.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-800 hover:text-brand-950 ${focusRing}`}
                    >
                      Watch update
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  </article>
                );
              })}
            </div>
          )}
          {channelVideos[0] && (
            <div className="mt-12 max-w-3xl">
              <h3 className="text-xl font-bold text-slate-900">Latest update</h3>
              <div className="mt-4">
                <LiteYouTube id={channelVideos[0].id} title={channelVideos[0].title} />
              </div>
              <p className="mt-3 text-base font-semibold text-slate-900 leading-snug break-words">{channelVideos[0].title}</p>
              <a
                href="https://www.youtube.com/@bansalimmigrationconsultants"
                target="_blank"
                rel="noopener noreferrer"
                className={`${btnGhostLight} mt-5`}
              >
                Watch more on YouTube
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          )}
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link href="/blogs" className={btnGhostLight}>
              View all news and updates
            </Link>
            <Link href="/book-an-appointment" className={btnPrimaryLight}>
              <Calendar className="w-5 h-5" aria-hidden="true" />
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* 3.12 Team */}
      <section className="py-16 lg:py-24 bg-slate-50 border-y border-slate-200/70">
        <div className={container}>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <SectionHeader
              title="Meet our registered migration agents"
              lede="Our agents work under the Migration Agents Code of Conduct. Read each profile and check their registration on the OMARA register."
            />
            <Link href="/team" className={btnGhostLight}>
              Meet the whole team
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertTeam.map((agent) => (
              <Link key={agent.name} href={agent.profileHref} className={`group ${card} ${cardHover} overflow-hidden flex flex-col ${focusRing}`}>
                <div className="relative aspect-[4/5] bg-brand-50 overflow-hidden">
                  <Image
                    src={agent.image}
                    alt={`${agent.name}, ${agent.title}`}
                    fill
                    sizes="(min-width: 1024px) 220px, (min-width: 640px) 33vw, 50vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-slate-900">{agent.name}</h3>
                  <p className="mt-1 text-sm text-slate-600">{agent.title}</p>
                  {agent.marn && (
                    <p className="mt-3 inline-flex self-start items-center gap-1.5 text-xs font-bold text-brand-900 bg-brand-50 border border-brand-100 rounded-full px-2.5 py-1">
                      <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                      MARN {agent.marn}
                    </p>
                  )}
                  <p className="mt-3 text-xs text-slate-600">{agent.languages}</p>
                  <span className="mt-4 pt-4 border-t border-slate-100 inline-flex items-center gap-1.5 text-sm font-bold text-brand-800 group-hover:text-brand-950">
                    View {agent.name.split(" ")[0]}’s profile
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3.13 Offices */}
      <section id="offices" className="py-16 lg:py-24 scroll-mt-20">
        <div className={container}>
          <SectionHeader
            title="Visit our Melbourne and Adelaide offices"
            lede="Meet us in person, or by phone or video. Monday to Friday, 9:30 am to 6:00 pm. Please book before you visit so an adviser can confirm availability."
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {offices.map((o) => (
              <div key={o.name} className={`${card} overflow-hidden flex flex-col`}>
                {o.photo && (
                  <div className="relative aspect-[3/2] bg-brand-50">
                    <Image src={o.photo} alt={o.photoAlt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                  </div>
                )}
                <div className="p-7">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-bold text-slate-900">{o.name}</h3>
                    <OfficeStatus timeZone={o.tz} />
                  </div>
                  <p className="mt-3 text-base text-slate-700">{o.address}</p>
                  <dl className="mt-4 space-y-2 text-sm">
                    <div className="flex gap-3">
                      <dt className="w-14 font-semibold text-slate-900 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" aria-hidden="true" />Phone</dt>
                      <dd>
                        <a href={`tel:${o.tel}`} className={`font-semibold text-brand-800 hover:text-brand-950 underline underline-offset-2 rounded ${focusRing}`}>
                          {o.phone}
                        </a>
                      </dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className="w-14 font-semibold text-slate-900 flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" aria-hidden="true" />Email</dt>
                      <dd>
                        <a href={`mailto:${o.email}`} className={`font-semibold text-brand-800 hover:text-brand-950 underline underline-offset-2 rounded break-all ${focusRing}`}>
                          {o.email}
                        </a>
                      </dd>
                    </div>
                  </dl>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(o.map)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-800 hover:text-brand-950 underline underline-offset-4 decoration-brand-600 decoration-2 rounded ${focusRing}`}
                  >
                    Get directions<span className="sr-only"> to the {o.name} (opens in a new tab)</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
                <OfficeMapReveal name={o.name} query={o.map} />
              </div>
            ))}
          </div>
          <p className="mt-6 flex items-start gap-2 text-sm text-slate-700">
            <Clock className="w-4 h-4 mt-0.5 text-brand-700 shrink-0" aria-hidden="true" />
            Please book before you visit so an adviser can confirm availability. In-person, phone and video appointments are available.
          </p>
        </div>
      </section>

      {/* 3.14 FAQ */}
      <section className="py-16 lg:py-24 bg-slate-50 border-y border-slate-200/70">
        <div className={container}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeader
                title="Frequently asked questions"
                lede="Straight answers to the questions we hear most. Still have a question? Send us an enquiry."
              />
              <p className="mt-6 text-sm text-slate-600">
                <Link href="/contact" className={`font-bold text-brand-800 underline underline-offset-4 decoration-brand-600 decoration-2 rounded ${focusRing}`}>
                  Send us an enquiry
                </Link>
              </p>
            </div>
            <div className="lg:col-span-8">
              <HomeFaqAccordion />
            </div>
          </div>
        </div>
      </section>

      {/* 3.15 Final CTA with form */}
      <section className="relative overflow-hidden py-20 lg:py-28 bg-brand-950 text-white">
        <div className={container}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Ready to talk about your visa?
              </h2>
              <p className="mt-5 text-lg text-slate-300 leading-relaxed">
                Tell us where you are now and where you want to be. We will explain your options in plain English.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link href="/book-an-appointment" className="inline-flex items-center justify-center gap-2 min-h-12 px-6 rounded-xl font-bold text-brand-950 bg-white hover:bg-brand-50 shadow-sm transition-colors text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300">
                  <Calendar className="w-5 h-5" aria-hidden="true" />
                  Book a Consultation
                </Link>
                <a
                  href="tel:+61396021330"
                  className="inline-flex items-center justify-center gap-2 min-h-12 px-6 rounded-xl font-semibold text-white border border-white/35 hover:bg-white/10 transition-colors text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  Call +61 3 9602 1330
                </a>
              </div>
              <p className="mt-8 text-xs text-slate-400 max-w-xl leading-relaxed">
                Visa outcomes are decided by the Department of Home Affairs. Information on this site is general and does not replace personal advice.
              </p>
            </div>
            <div className="lg:col-span-7">
              <HeroLeadForm variant="final" className="text-slate-700" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
