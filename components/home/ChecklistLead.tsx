'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, FileDown } from 'lucide-react';
import { TurnstileField, useTurnstileSiteKey } from '@/components/forms/TurnstileField';
import { btnPrimaryLight, fieldInput, fieldLabel } from '@/components/ui/brand';

const PDF = '/appointment-checklist.pdf';

export default function ChecklistLead() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const turnstileSiteKey = useTurnstileSiteKey();
  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileKey, setTurnstileKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (honeypot) {
      setDone(true);
      return;
    }
    if (!name.trim()) return setError('Please enter your name.');
    if (!email.trim() || !email.includes('@')) return setError('Please enter a valid email address.');
    if (turnstileSiteKey && !turnstileToken) return setError('Please complete the security check before sending.');
    setLoading(true);
    try {
      const res = await fetch('/contact/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: 'Appointment checklist download',
          message: 'Requested the what-to-bring appointment checklist.',
          form_source: 'homepage_checklist',
          form_variant: 'checklist',
          website_honeypot: honeypot,
          cf_turnstile_response: turnstileToken,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success !== false) {
        setDone(true);
        const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
        if (typeof gtag === 'function') gtag('event', 'checklist_download', { location: 'homepage' });
      } else {
        setTurnstileToken('');
        setTurnstileKey((key) => key + 1);
        setError(data.message || 'We could not send that. Please call +61 3 9602 1330.');
      }
    } catch {
      setTurnstileToken('');
      setTurnstileKey((key) => key + 1);
      setError('Connection problem. Please call +61 3 9602 1330.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      <div className="lg:col-span-5">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">What to bring to your appointment</h2>
        <p className="mt-3 text-slate-600 leading-relaxed">
          A one-page checklist: passport, current visa, decision letters, and your qualifications and work history. Enter your email and we will open the PDF.
        </p>
      </div>
      <div className="lg:col-span-7">
        {done ? (
          <div role="status" className="rounded-xl bg-emerald-50 border border-emerald-200 p-5">
            <p className="flex items-center gap-2 font-bold text-emerald-900">
              <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
              Your checklist is ready
            </p>
            <a href={PDF} download className={`${btnPrimaryLight} mt-4`}>
              <FileDown className="w-4 h-4" aria-hidden="true" />
              Download the checklist
            </a>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="checklist-name" className={fieldLabel}>
                Full name <span className="text-red-700" aria-hidden="true">*</span>
              </label>
              <input id="checklist-name" autoComplete="name" required value={name} onChange={(e) => setName(e.target.value)} className={fieldInput} />
            </div>
            <div>
              <label htmlFor="checklist-email" className={fieldLabel}>
                Email address <span className="text-red-700" aria-hidden="true">*</span>
              </label>
              <input id="checklist-email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={fieldInput} />
            </div>
            <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} className="hidden" name="website_honeypot" />
            <div className="sm:col-span-2">
              <TurnstileField resetKey={turnstileKey} onToken={setTurnstileToken} />
            </div>
            {error && (
              <p role="alert" className="sm:col-span-2 rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-800">
                {error}
              </p>
            )}
            <div className="sm:col-span-2">
              <button type="submit" disabled={loading} className={`${btnPrimaryLight} disabled:opacity-60`}>
                <FileDown className="w-4 h-4" aria-hidden="true" />
                {loading ? 'Sending...' : 'Email me the checklist'}
              </button>
              <p className="mt-3 text-xs text-slate-500 leading-relaxed">
                We use your details only to send this checklist and reply to your enquiry. See our{' '}
                <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-slate-800">
                  privacy policy
                </Link>
                .
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
