'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Phone } from 'lucide-react';
import PhoneField from '@/components/forms/PhoneField';
import { TurnstileField, useTurnstileSiteKey } from '@/components/forms/TurnstileField';
import { btnPrimaryLight, fieldInput, fieldLabel, focusRing } from '@/components/ui/brand';

const HELP_OPTIONS = [
  'Study in Australia',
  'Skilled migration and permanent residency',
  'Partner or family visa',
  'Employer-sponsored visa',
  'Visitor visa',
  'Visa refused or cancelled',
  'Citizenship',
  'Something else',
];

export default function HeroLeadForm() {
  const [name, setName] = useState('');
  const [dial, setDial] = useState('+61');
  const [phone, setPhone] = useState('');
  const [help, setHelp] = useState(HELP_OPTIONS[0]);
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
    if (phone.replace(/\D/g, '').length < 6) return setError('Please enter a valid phone number.');
    if (turnstileSiteKey && !turnstileToken) return setError('Please complete the security check before sending.');
    setLoading(true);
    try {
      const res = await fetch('/contact/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: `${dial} ${phone.trim()}`,
          subject: `Callback Request: ${help}`,
          message: `Visa / Service Enquiry: ${help}\nRequested from the home page.`,
          form_source: 'homepage_hero',
          form_variant: 'callback',
          website_honeypot: honeypot,
          cf_turnstile_response: turnstileToken,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success !== false) {
        setDone(true);
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'generate_lead', { event_category: 'Hero Form', event_label: help });
        }
      } else {
        setTurnstileToken('');
        setTurnstileKey((key) => key + 1);
        setError(data.message || 'We could not send your request. Please call +61 3 9602 1330.');
      }
    } catch {
      setTurnstileToken('');
      setTurnstileKey((key) => key + 1);
      setError('Connection problem. Please call +61 3 9602 1330.');
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-2xl bg-white border border-slate-200 shadow-xl p-7 sm:p-8 text-center" role="status">
        <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
        </div>
        <h2 className="mt-4 text-2xl font-extrabold text-brand-900">Thank you, {name.split(' ')[0] || 'we have it'}</h2>
        <p className="mt-2 text-slate-600 leading-relaxed">
          A member of our team will call you on {dial} {phone}. Our hours are Monday to Friday, 9:30 am to 6:00 pm.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className="rounded-2xl bg-white border border-slate-200 shadow-xl p-6 sm:p-8"
      aria-labelledby="hero-form-title"
    >
      <h2 id="hero-form-title" className="text-2xl font-extrabold tracking-tight text-slate-900">
        Request a call back
      </h2>
      <p className="mt-1.5 text-sm text-slate-600">Tell us how to reach you. We reply within one business day.</p>

      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor="hero-name" className={fieldLabel}>
            Full name <span className="text-red-700" aria-hidden="true">*</span>
          </label>
          <input
            id="hero-name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={fieldInput}
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="hero-phone" className={fieldLabel}>
            Phone number <span className="text-red-700" aria-hidden="true">*</span>
          </label>
          <PhoneField
            id="hero-phone"
            required
            dial={dial}
            onDialChange={setDial}
            value={phone}
            onValueChange={setPhone}
            selectClassName={`${fieldInput} !w-auto`}
            inputClassName={fieldInput}
          />
        </div>

        <div>
          <label htmlFor="hero-help" className={fieldLabel}>
            I need help with
          </label>
          <select
            id="hero-help"
            value={help}
            onChange={(e) => setHelp(e.target.value)}
            className={`${fieldInput} cursor-pointer`}
          >
            {HELP_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="hidden"
          name="website_honeypot"
        />

        {error && (
          <p role="alert" className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-800">
            {error}
          </p>
        )}

        <TurnstileField resetKey={turnstileKey} onToken={setTurnstileToken} />

        <button type="submit" disabled={loading} className={`${btnPrimaryLight} w-full disabled:opacity-60`}>
          {loading ? 'Sending...' : 'Request a call back'}
          {!loading && <Phone className="w-4 h-4" aria-hidden="true" />}
        </button>
      </div>

      <p className="mt-4 text-xs text-slate-500 leading-relaxed">
        We use your details only to contact you about your enquiry. See our{' '}
        <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-slate-800">
          privacy policy
        </Link>
        .
      </p>
      <p className="mt-3 pt-3 border-t border-slate-100 text-sm text-slate-600">
        Prefer to choose a time?{' '}
        <Link href="/book-an-appointment" className={`font-bold text-brand-800 hover:text-brand-950 inline-flex items-center gap-1 rounded ${focusRing}`}>
          Book an appointment online <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </p>
    </form>
  );
}
