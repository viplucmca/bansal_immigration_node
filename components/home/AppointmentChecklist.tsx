'use client';

import { useState } from 'react';
import { Download } from 'lucide-react';
import { container, SectionHeader, card, fieldInput, fieldLabel, btnPrimaryLight } from '@/components/ui/brand';
import { trackEvent } from '@/lib/analytics/events';

export default function AppointmentChecklist() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    trackEvent('checklist_download', { form_location: 'checklist' });
    setDone(true);
    window.open('/files/appointment-checklist.pdf', '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-12 border-t border-slate-200/70 bg-white">
      <div className={container}>
        <div className={`${card} p-6 sm:p-8 max-w-3xl mx-auto`}>
          <SectionHeader
            title="What to bring to your appointment"
            lede="Download our one-page checklist. We email you a copy and open the PDF."
            align="center"
          />
          {done ? (
            <p className="mt-6 text-center text-sm text-slate-600">Thank you. If the PDF did not open, use the button below.</p>
          ) : (
            <form onSubmit={submit} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <label className="sr-only" htmlFor="checklist-email">
                Email
              </label>
              <input
                id="checklist-email"
                type="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${fieldInput} flex-1`}
                autoComplete="email"
              />
              <button type="submit" className={`${btnPrimaryLight} shrink-0`}>
                <Download className="w-4 h-4" aria-hidden="true" />
                Get checklist
              </button>
            </form>
          )}
          <p className="mt-4 text-xs text-center text-slate-500">
            We use your email only to send the checklist. See our privacy policy.
          </p>
        </div>
      </div>
    </section>
  );
}