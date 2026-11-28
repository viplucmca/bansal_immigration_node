import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  GraduationCap,
  Briefcase,
  Heart,
  Scale,
  Award,
  Calendar,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Calculator,
  Search,
  Star,
  Phone,
  Mail,
  ExternalLink,
  Clock,
} from "lucide-react";
import OfficeStatus from "@/components/home/OfficeStatus";
import HomeFaqAccordion from "@/components/home/HomeFaqAccordion";
import ServicePathwayCard from "@/components/home/ServicePathwayCard";
import HomeLatestNews from "@/components/home/HomeLatestNews";
import HeroLeadForm from "@/components/home/HeroLeadForm";
import HeroProofStrip from "@/components/home/HeroProofStrip";
import PartnerLogosMarquee from "@/components/home/PartnerLogosMarquee";
import UrgentVisaPanel from "@/components/home/UrgentVisaPanel";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import ClearFeesSection from "@/components/home/ClearFeesSection";
import AppointmentChecklist from "@/components/home/AppointmentChecklist";
import ClickToLoadVideo from "@/components/home/ClickToLoadVideo";
import GoogleReviewsCarousel from "@/components/home/GoogleReviewsCarousel";
import JsonLd from "@/components/seo/JsonLd";
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
import { HOME_PATHWAYS } from "@/lib/data/homePathways";
import { getHomeFaqs } from "@/lib/home/faqs";
import { getSuccessStories } from "@/lib/db";
import { buildHomeSchema } from "@/lib/seo/homeSchema";
import { OFFICES } from "@/lib/site/offices";
import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT, GOOGLE_PROFILE_URL } from "@/lib/siteConfig";

/** FAQs, news and success stories come from MySQL — refresh on each request. */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Registered Migration Agents Australia | Bansal Immigration",
  description:
    "Book an appointment with OMARA-registered migration agents. Clear advice on skilled, student, partner and employer visas, in person, by phone or video.",
  alternates: {
    canonical: "https://www.bansalimmigration.com.au/",
  },
  openGraph: {
    title: "Book a Registered Migration Agent",
    description:
      "Plain English visa advice from OMARA registered migration agents. Book in person, by phone or by video.",
    url: "https://www.bansalimmigration.com.au/",
    siteName: "Bansal Immigration",
    locale: "en_AU",
    type: "website",
    images: [{ url: "/img/logo/logo-og.jpg", width: 1200, height: 630, alt: "Bansal Immigration" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Registered Migration Agent",
    description:
      "Plain English visa advice from OMARA registered migration agents. Book in person, by phone or by video.",
    images: ["/img/logo/logo-og.jpg"],
  },
};

/* ---------------- content ---------------- */

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
    heading: "Book consultation",
    desc: "Book online in about two minutes, or request a call back. The fee for your appointment type is shown before you confirm.",
  },
  {
    heading: "Expert advice",
    desc: "A registered migration agent goes through your situation, the visas that may fit, the evidence you would need and any risks. You decide what to do next, with no obligation to sign anything on the day.",
  },
  {
    heading: "Commence your PR pathway",
    desc: "If you decide to go ahead, we agree the scope, our fees and what we need from you in a written service agreement, then start preparing your application.",
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
  { name: "Arun Bansal", title: "Director and Registered Migration Agent", marn: "2418466", profileHref: "/team/arun-bansal", image: "/img/team/arun-bansal.avif" },
  { name: "Vipul Goyal", title: "Managing Director and Migration Consultant", marn: "2418571", profileHref: "/team/vipul-goyal", image: "/img/team/vipul-goyal.avif" },
  { name: "Mamta Puri", title: "Registered Migration Agent", marn: "2418481", profileHref: "/team/mamta-puri", image: "/img/team/mamta-puri.avif" },
  { name: "Shubam Kumar", title: "Registered Migration Agent", marn: "2619683", profileHref: "/team/shubam-kumar", image: "/img/team/shubam-kumar.svg" },
  { name: "Shaveena", title: "Registered Migration Agent", marn: "2619533", profileHref: "/team/shaveena", image: "/img/team/shaveena.svg" },
  { name: "Celesty Parmar", title: "Registered Migration Agent", marn: "2619664", profileHref: "/team/celesty-parmar", image: "/img/team/celesty-parmar.svg" },
];

function storiesToVideos(
  stories: Awaited<ReturnType<typeof getSuccessStories>>
) {
  return stories
    .filter((s) => s.has_youtube && s.youtube_url)
    .slice(0, 3)
    .map((s) => ({
      slug: s.slug,
      title: s.title,
      id: /embed\/([A-Za-z0-9_-]{11})/.exec(s.youtube_url || "")?.[1] ?? "",
      uploadDate: s.success_date || s.date || s.published_at || undefined,
    }))
    .filter((v) => v.id);
}

/* ---------------- page ---------------- */

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
  const [faqs, successStories] = await Promise.all([getHomeFaqs(), getSuccessStories()]);
  const videoStories = storiesToVideos(successStories);
  const schemaVideos = videoStories.map((v) => ({
    title: v.title,
    youtubeId: v.id,
    uploadDate: v.uploadDate ?? undefined,
  }));
  const jsonLd = buildHomeSchema(faqs, schemaVideos);

  return (
    <div className="bg-white text-slate-700">
      <JsonLd data={jsonLd} />

      {/* 1. HERO with call-back form */}
      <section id="top" className="bg-brand-50 text-slate-900 border-b border-slate-200 scroll-mt-20">
        <div className={`${container} pt-12 pb-24 lg:pt-16 lg:pb-32`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <p className="text-sm font-bold uppercase tracking-wide text-brand-800">OMARA registered migration agents</p>
              <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-brand-900">
                Registered Migration Agents for Your Australian Visa
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-600 max-w-xl">
                Get clear, honest advice on your skilled, student, partner or employer visa from OMARA registered migration
                agents. From first question to final decision, we guide you through each step of your visa pathway.
              </p>
              <p className="mt-3 text-sm font-semibold text-slate-700">English · Hindi · Punjabi</p>
              <Link href="/book-an-appointment" className={`${btnPrimaryLight} mt-6`}>
                <Calendar className="w-5 h-5" aria-hidden="true" />
                Book a Consultation
              </Link>
              <p className="mt-3 text-xs text-slate-500">Takes about two minutes. You see the fee before you confirm.</p>
            </div>

            <div className="lg:col-span-5">
              <HeroLeadForm />
            </div>
          </div>
        </div>
      </section>

      <HeroProofStrip />
      <PartnerLogosMarquee />

      {/* 3. WHAT DO YOU NEED HELP WITH */}
      <section id="pathways" className="pt-20 pb-16 lg:pt-28 lg:pb-24 scroll-mt-20">
        <div className={container}>
          <SectionHeader
            title="Your path to Australia starts here"
            lede="Choose the area closest to your situation. Each page explains who can apply, the steps involved and how we can help."
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {HOME_PATHWAYS.map((p) => (
              <ServicePathwayCard key={p.title} item={p} />
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

      <UrgentVisaPanel />

      {/* 4. HOW IT WORKS */}
      <section className="py-16 lg:py-24 bg-slate-50 border-y border-slate-200/70">
        <div className={container}>
          <SectionHeader
            title="Start your visa journey in three simple steps"
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
          <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Not sure where to begin?</h3>
              <p className="mt-1 text-slate-600">Book a consultation and we will explain your options in plain English.</p>
            </div>
            <Link href="/book-an-appointment" className={`${btnPrimaryLight} shrink-0`}>
              <Calendar className="w-5 h-5" aria-hidden="true" />
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>

      <WhyChooseSection />
      <ClearFeesSection />
      <AppointmentChecklist />

      {/* 5. GOOGLE REVIEWS and VIDEO STORIES */}
      <section className="py-16 lg:py-24 bg-[#f4f4f4] border-y border-slate-200/80">
        <div className={container}>
          <GoogleReviewsCarousel />

          {videoStories.length > 0 && (
            <div className="mt-20 pt-16 border-t border-slate-300/60">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <SectionHeader title="Watch client stories" />
                <RatingLine className="self-start" />
              </div>
              <ul className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
                {videoStories.map((v) => (
                  <li key={v.slug}>
                    <ClickToLoadVideo youtubeId={v.id} title={v.title} />
                    <Link
                      href={`/success-stories/${v.slug}`}
                      className={`mt-3 block text-base font-semibold text-slate-900 leading-snug hover:underline underline-offset-4 decoration-brand-600 decoration-2 rounded ${focusRing}`}
                    >
                      {v.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex justify-center">
                <Link href="/success-stories" className={btnGhostLight}>
                  View all client stories
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 6. TOOLS */}
      <section className="py-16 lg:py-24 bg-slate-50 border-y border-slate-200/70">
        <div className={container}>
          <SectionHeader
            title="Free tools to check where you stand"
            lede="Get a quick answer before you book. Tools give an estimate only. A registered agent can confirm your result."
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {usefulTools.map((tool) => (
              <Link
                key={tool.title}
                href={tool.href}
                className={`group ${card} ${cardHover} p-6 flex flex-col ${focusRing}`}
                data-analytics-event="tool_open"
                data-analytics-tool={tool.title}
              >
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
        </div>
      </section>

      <HomeLatestNews />

      {/* 7. TEAM */}
      <section className="py-16 lg:py-24">
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
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertTeam.map((agent) => (
              <Link key={agent.name} href={agent.profileHref} className={`group ${card} ${cardHover} overflow-hidden flex flex-col ${focusRing}`}>
                <div className="relative aspect-[4/5] bg-brand-50 overflow-hidden">
                  <Image
                    src={agent.image}
                    alt={`${agent.name}, ${agent.title}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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

      {/* 8. OFFICES */}
      <section id="offices" className="py-16 lg:py-24 bg-brand-50 border-y border-brand-100 scroll-mt-20">
        <div className={container}>
          <SectionHeader
            title="Visit our Melbourne and Adelaide offices"
            lede="Meet us in person, or by phone or video. Monday to Friday, 9:30 am to 6:00 pm. Please book before you visit so an adviser can confirm availability."
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {OFFICES.map((o) => (
              <div key={o.name} className={`${card} overflow-hidden flex flex-col`}>
                <div className="p-7">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-bold text-slate-900">{o.name}</h3>
                    <OfficeStatus timeZone={o.timeZone} />
                  </div>
                  <p className="mt-3 text-base text-slate-700">{o.address}</p>
                  <dl className="mt-4 space-y-2 text-sm">
                    <div className="flex gap-3">
                      <dt className="w-14 font-semibold text-slate-900 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" aria-hidden="true" />Phone</dt>
                      <dd>
                        <a
                          href={`tel:${o.tel}`}
                          className={`font-semibold text-brand-800 hover:text-brand-950 underline underline-offset-2 rounded ${focusRing}`}
                          data-analytics-event="phone_click"
                          data-analytics-location="offices"
                        >
                          {o.phone}
                        </a>
                      </dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className="w-14 font-semibold text-slate-900 flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" aria-hidden="true" />Email</dt>
                      <dd>
                        <a
                          href={`mailto:${o.email}`}
                          className={`font-semibold text-brand-800 hover:text-brand-950 underline underline-offset-2 rounded break-all ${focusRing}`}
                          data-analytics-event="email_click"
                          data-analytics-location="offices"
                        >
                          {o.email}
                        </a>
                      </dd>
                    </div>
                  </dl>
                  <a
                    href={o.hasMap}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-800 hover:text-brand-950 underline underline-offset-4 decoration-brand-600 decoration-2 rounded ${focusRing}`}
                    data-analytics-event="directions_click"
                    data-analytics-location={o.directionsEvent}
                  >
                    Get directions<span className="sr-only"> to the {o.name} (opens in a new tab)</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
                <div className="h-56 bg-slate-100 mt-auto">
                  <iframe
                    title={`Map of the ${o.name}`}
                    src={`https://www.google.com/maps?q=${encodeURIComponent(o.mapQuery)}&output=embed`}
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 flex items-start gap-2 text-sm text-slate-700">
            <Clock className="w-4 h-4 mt-0.5 text-brand-700 shrink-0" aria-hidden="true" />
            Please book before you visit so an adviser can confirm availability. In-person, phone and video appointments are available.
          </p>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="py-16 lg:py-24">
        <div className={container}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeader title="Frequently asked questions" lede="Straight answers to the questions we hear most." />
              <p className="mt-6 text-sm text-slate-600">
                Still have a question?{" "}
                <Link href="/contact" className={`font-bold text-brand-800 underline underline-offset-4 decoration-brand-600 decoration-2 rounded ${focusRing}`}>
                  Send us an enquiry
                </Link>
                .
              </p>
            </div>
            <div className="lg:col-span-8">
              <HomeFaqAccordion faqs={faqs} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
