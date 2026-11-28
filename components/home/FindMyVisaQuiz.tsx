"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, RotateCcw, Calculator } from "lucide-react";
import { card, btnPrimaryLight, btnGhostLight, focusRing } from "@/components/ui/brand";
import { trackEvent } from "@/lib/analytics/events";

type ResultLink = { label: string; href: string };
type Result = {
  title: string;
  body: string;
  links: ResultLink[];
  tool?: ResultLink;
};
type Option = { label: string; hint?: string; next?: string; result?: Result };
type Node = { question: string; options: Option[] };

const nodes: Record<string, Node> = {
  root: {
    question: "What do you want to do in Australia?",
    options: [
      { label: "Study", hint: "A course, or a change to your course", next: "study" },
      { label: "Work or live here permanently", hint: "Skilled, employer or business visas", next: "work" },
      { label: "Join a partner or family member", next: "family" },
      { label: "Visit or take a working holiday", next: "visit" },
      { label: "Fix a visa problem", hint: "Refused, cancelled or waiting on a decision", next: "problem" },
      {
        label: "Become an Australian citizen",
        result: {
          title: "Citizenship",
          body: "Citizenship by conferral and by descent each have their own requirements. Read the overview, then speak to an adviser about your situation.",
          links: [{ label: "Citizenship", href: "/citizenship" }],
        },
      },
    ],
  },
  study: {
    question: "Where are you now?",
    options: [
      {
        label: "Outside Australia",
        result: {
          title: "Student visa (subclass 500)",
          body: "A student visa is the usual pathway to study in Australia. You will need an offer and a confirmation of enrolment, and you must show you meet the visa requirements.",
          links: [
            { label: "Student visa (500)", href: "/study-australia/student-visa-subclass-500" },
            { label: "Family on a student visa (500)", href: "/study-australia/student-dependent-visa-500" },
          ],
          tool: { label: "Student visa financial calculator", href: "/study-australia/student-visa-financial-calculator" },
        },
      },
      {
        label: "Already in Australia",
        result: {
          title: "Change or extend your study",
          body: "Changing course, provider or extending your student visa can affect your visa conditions. Check the page that matches what you want to do before you act.",
          links: [
            { label: "Extend your student visa", href: "/study-australia/student-visa-extension" },
            { label: "Change course in Australia", href: "/study-australia/course-change-in-australia" },
            { label: "New confirmation of enrolment", href: "/study-australia/new-coe" },
            { label: "Request to defer your studies", href: "/study-australia/request-to-defer-your-studies" },
          ],
        },
      },
    ],
  },
  work: {
    question: "Which sounds most like you?",
    options: [
      {
        label: "I have skills and want permanent residency",
        hint: "Points-tested or state-nominated visas",
        result: {
          title: "Skilled migration (189, 190 and 491)",
          body: "These visas are based on your occupation, points and, for some, nomination by a state or a regional sponsor. Check your occupation and your points first.",
          links: [
            { label: "Skilled Independent (189)", href: "/migrate-to-australia/skilled-independent-visa-subclass-189" },
            { label: "Skilled Nominated (190)", href: "/migrate-to-australia/skilled-nominated-visa-subclass-190" },
            { label: "Skilled Work Regional (491)", href: "/migrate-to-australia/skilled-work-regional-provisional-visa-subclass-491" },
            { label: "How points are calculated", href: "/skilled-migration/how-points-are-calculated" },
          ],
          tool: { label: "PR points calculator", href: "/migrate-to-australia/pr-point-calculator" },
        },
      },
      {
        label: "I am finishing, or have finished, study in Australia",
        result: {
          title: "Temporary Graduate (485) and skilled options",
          body: "A graduate visa lets some students stay and work after study. It can also give you time to build points for a skilled visa.",
          links: [
            { label: "Temporary Graduate (485)", href: "/migrate-to-australia/temporary-graduate-visa-subclass-485" },
            { label: "Skilled Independent (189)", href: "/migrate-to-australia/skilled-independent-visa-subclass-189" },
            { label: "Skilled Nominated (190)", href: "/migrate-to-australia/skilled-nominated-visa-subclass-190" },
          ],
          tool: { label: "PR points calculator", href: "/migrate-to-australia/pr-point-calculator" },
        },
      },
      {
        label: "An Australian employer wants to sponsor me",
        result: {
          title: "Employer-sponsored visas",
          body: "The employer must be an approved sponsor and nominate a position. The right visa depends on the role, location and your experience.",
          links: [
            { label: "Skills in Demand (482)", href: "/employer-sponsored/sid-visa-482" },
            { label: "Employer Nomination, Temporary Residence Transition (186)", href: "/employer-sponsored/ens-186-trt" },
            { label: "Employer Nomination, Direct Entry (186)", href: "/employer-sponsored/ens-186-direct" },
            { label: "Regional employer visa (494)", href: "/employer-sponsored/skilled-regional-494" },
            { label: "Application process guide", href: "/employer-sponsored/application-process-guide" },
          ],
        },
      },
      {
        label: "I want to start a business or invest",
        result: {
          title: "Business and investment visas",
          body: "These visas have their own eligibility, investment and reporting rules. Speak to an adviser early, because planning matters.",
          links: [
            { label: "Business visas", href: "/business-visa" },
            { label: "Business Innovation and Investment (188)", href: "/business-visa/business-innovation-and-investment-provisional-visa-subclass-188" },
            { label: "Business Innovation and Investment (888)", href: "/business-visa/business-innovation-and-investment-permanent-visa-subclass-888" },
          ],
        },
      },
    ],
  },
  family: {
    question: "Who is the visa for?",
    options: [
      {
        label: "My partner or spouse",
        result: {
          title: "Partner visas",
          body: "The visa depends on whether the applicant is in Australia or overseas. Most partner applications go through a temporary stage before a permanent visa.",
          links: [
            { label: "Partner visas overview", href: "/family-visa/partner-visa" },
            { label: "Partner visa, applying in Australia (820 then 801)", href: "/family-visa/partner-provisional-visa-subclass-820" },
            { label: "Partner visa, applying outside Australia (309 then 100)", href: "/family-visa/partner-provisional-visa-subclass-309" },
            { label: "Prospective Marriage visa (300)", href: "/family-visa/prospective-marriage-visa-subclass-300" },
          ],
        },
      },
      {
        label: "My parent",
        result: {
          title: "Parent visas",
          body: "There are several parent visa types with different costs and waiting times. The right one depends on your parent's circumstances and what you can afford.",
          links: [
            { label: "Parent visa (103)", href: "/family-visa/parent-visa-subclass-103" },
            { label: "Contributory Parent (143)", href: "/family-visa/contributory-parent-visa-subclass-143" },
            { label: "Aged Parent (804)", href: "/family-visa/aged-parent-visa-subclass-804" },
            { label: "Contributory Aged Parent (864)", href: "/family-visa/contributory-aged-parent-visa-subclass-864" },
            { label: "Sponsored Parent, temporary (870)", href: "/family-visa/sponsored-parent-temporary-visa-subclass-870" },
          ],
        },
      },
      {
        label: "My child",
        result: {
          title: "Child visas",
          body: "Your child's visa depends on where they are and their circumstances.",
          links: [
            { label: "Child visa, outside Australia (101)", href: "/family-visa/child-visa-subclass-101" },
            { label: "Child visa, in Australia (802)", href: "/family-visa/child-visa-subclass-802" },
            { label: "Dependent child visa", href: "/family-visa/dependent-child-visa" },
            { label: "Adoption visa", href: "/family-visa/adoption-visa" },
          ],
        },
      },
      {
        label: "Another relative",
        result: {
          title: "Other family visas",
          body: "These categories have strict relationship requirements. Read the page that matches your relative, then speak to an adviser.",
          links: [
            { label: "Carer visa, outside Australia (116)", href: "/family-visa/carer-visa-offshore-subclass-116" },
            { label: "Carer visa, in Australia (836)", href: "/family-visa/carer-visa-onshore-subclass-836" },
            { label: "Remaining Relative (115)", href: "/family-visa/remaining-relative-visa-subclass-115" },
            { label: "Aged Dependent Relative (114)", href: "/family-visa/aged-dependent-114" },
            { label: "All family visas", href: "/family-visa" },
          ],
        },
      },
    ],
  },
  visit: {
    question: "What is the purpose of your trip?",
    options: [
      {
        label: "Holiday, family visit or business visit",
        result: {
          title: "Visitor visas",
          body: "Which visitor visa you can apply for depends on your passport. Read the options and check which one applies to you.",
          links: [
            { label: "Visitor visa (600)", href: "/visitor-visa/visitor-visa-600" },
            { label: "Electronic Travel Authority (601)", href: "/visitor-visa/electronic-travel-authority-601" },
            { label: "eVisitor (651)", href: "/visitor-visa/evisitor-651" },
            { label: "Sponsored Family Visitor", href: "/visitor-visa/sponsored-family" },
          ],
        },
      },
      {
        label: "A working holiday",
        result: {
          title: "Working holiday visas",
          body: "Working holiday visas are only open to citizens of certain countries. Check the page for your visa and the eligibility rules.",
          links: [
            { label: "Working Holiday (417)", href: "/visitor-visa/work-holiday-417" },
            { label: "Work and Holiday (462)", href: "/visitor-visa/work-holiday-462" },
          ],
        },
      },
      {
        label: "I am already here and want to stay longer",
        result: {
          title: "Extend your visit",
          body: "If you are in Australia and your visa is about to end, act before it expires. Check which extension page matches you.",
          links: [
            { label: "Extend a visitor visa in Australia", href: "/visitor-visa/onshore-visitor-visa-extension" },
            { label: "Bridging visa A (010)", href: "/bridging-return-visas/bridging-visa-a-010" },
          ],
        },
      },
    ],
  },
  problem: {
    question: "What has happened?",
    options: [
      {
        label: "My visa application was refused",
        result: {
          title: "Visa refusal",
          body: "Review rights often have strict deadlines. Read about your options now and speak to an adviser as soon as you can.",
          links: [
            { label: "Visa refusal", href: "/appeals/visa-refusal" },
            { label: "Review process", href: "/appeals/review-process" },
            { label: "Administrative Review Tribunal appeals", href: "/appeals/art-appeals" },
          ],
        },
      },
      {
        label: "My visa was cancelled, or I got a notice",
        result: {
          title: "Visa cancellation",
          body: "A notice of intention to consider cancellation has a short response time. Do not ignore it. Speak to an adviser as soon as you can.",
          links: [
            { label: "Visa cancellation", href: "/appeals/visa-cancellation" },
            { label: "Notice of intention to consider cancellation", href: "/appeals/notice-of-intention-to-consider-cancellation" },
            { label: "Ministerial intervention", href: "/appeals/ministerial-intervention" },
          ],
        },
      },
      {
        label: "I am waiting on a decision and need to stay lawfully",
        result: {
          title: "Bridging visas",
          body: "A bridging visa may let you stay in Australia while your application or review is being decided. The type depends on your situation.",
          links: [
            { label: "Bridging visa A (010)", href: "/bridging-return-visas/bridging-visa-a-010" },
            { label: "Bridging visa B (020)", href: "/bridging-return-visas/bridging-visa-b-020" },
            { label: "Bridging visa C (030)", href: "/bridging-return-visas/bridging-visa-c-030" },
            { label: "Bridging visa E (050 and 051)", href: "/bridging-return-visas/bridging-visa-e-050-051" },
          ],
        },
      },
    ],
  },
};

export default function FindMyVisaQuiz() {
  // path of option indexes taken from "root"
  const [path, setPath] = useState<number[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);

  // walk the tree
  let nodeKey = "root";
  let result: Result | undefined;
  const chosen: string[] = [];
  for (const idx of path) {
    const opt = nodes[nodeKey].options[idx];
    chosen.push(opt.label);
    if (opt.result) {
      result = opt.result;
      break;
    }
    nodeKey = opt.next as string;
  }
  const node = nodes[nodeKey];

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [path]);

  useEffect(() => {
    if (path.length === 1) trackEvent('quiz_start', { location: 'quiz' });
  }, [path.length]);

  useEffect(() => {
    if (result) trackEvent('quiz_finish', { location: 'quiz', result_title: result.title });
  }, [result]);

  const stepNumber = path.length + 1;

  return (
    <div className={`${card} p-6 sm:p-8 max-w-3xl mx-auto`}>
      <div aria-live="polite">
        {result ? (
          <div>
            <p className="text-sm font-semibold text-slate-600">Based on: {chosen.join(" › ")}</p>
            <h3 ref={headingRef} tabIndex={-1} className="mt-2 text-2xl font-bold text-slate-900 outline-none">
              {result.title}
            </h3>
            <p className="mt-3 text-slate-700 leading-relaxed">{result.body}</p>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {result.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`group flex items-center justify-between gap-3 min-h-12 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-900 hover:border-brand-700 hover:bg-brand-50 transition-colors motion-reduce:transition-none ${focusRing}`}
                  >
                    <span>{l.label}</span>
                    <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>

            {result.tool && (
              <Link
                href={result.tool.href}
                className={`mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-800 hover:text-brand-950 underline underline-offset-4 decoration-brand-600 decoration-2 rounded ${focusRing}`}
              >
                <Calculator className="w-4 h-4" aria-hidden="true" />
                Try the {result.tool.label.toLowerCase()}
              </Link>
            )}

            <p className="mt-6 text-sm text-slate-600 leading-relaxed">
              This is a starting point, not advice. Your eligibility depends on facts only a registered agent can check with you.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link href="/book-an-appointment" className={btnPrimaryLight}>
                <Calendar className="w-5 h-5" aria-hidden="true" />
                Book a consultation
              </Link>
              <button type="button" onClick={() => setPath([])} className={btnGhostLight}>
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                Start again
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-sm font-semibold text-slate-600">Question {stepNumber}</p>
            <h3 ref={headingRef} tabIndex={-1} className="mt-2 text-2xl font-bold text-slate-900 outline-none">
              {node.question}
            </h3>
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {node.options.map((o, i) => (
                <li key={o.label} className="flex">
                  <button
                    type="button"
                    onClick={() => setPath([...path, i])}
                    className={`group w-full text-left min-h-14 rounded-xl border border-slate-300 bg-white px-4 py-3 hover:border-brand-700 hover:bg-brand-50 transition-colors motion-reduce:transition-none ${focusRing}`}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span>
                        <span className="block text-base font-bold text-slate-900 leading-snug">{o.label}</span>
                        {o.hint && <span className="mt-0.5 block text-sm text-slate-600">{o.hint}</span>}
                      </span>
                      <ArrowRight className="w-4 h-4 shrink-0 text-brand-800 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            {path.length > 0 && (
              <button
                type="button"
                onClick={() => setPath(path.slice(0, -1))}
                className={`mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-800 hover:text-brand-950 rounded ${focusRing}`}
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                Back
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
