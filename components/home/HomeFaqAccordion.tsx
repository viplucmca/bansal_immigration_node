'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { HomeFaq } from '@/lib/data/homeFaqs';

export default function HomeFaqAccordion({ faqs }: { faqs: HomeFaq[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="space-y-3">
      {faqs.map((faq, idx) => {
        const isOpen = openIdx === idx;
        const panelId = `home-faq-panel-${idx}`;
        return (
          <div
            key={idx}
            className={`rounded-2xl border bg-white transition-colors ${
              isOpen ? 'border-brand-300 shadow-sm' : 'border-slate-200 hover:border-brand-200'
            }`}
          >
            <h3>
              <button
                onClick={() => toggle(idx)}
                className="w-full min-h-14 py-4 px-5 sm:px-6 text-left flex items-center justify-between gap-4 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span className="font-bold text-slate-900 text-base sm:text-lg leading-snug">
                  {faq.question}
                </span>
                <span
                  className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center transition-colors ${
                    isOpen ? 'bg-brand-700 text-white' : 'bg-brand-50 text-brand-900'
                  }`}
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 motion-reduce:transition-none ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              hidden={!isOpen}
              className="px-5 sm:px-6 pb-6 text-slate-600 text-base leading-relaxed"
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
