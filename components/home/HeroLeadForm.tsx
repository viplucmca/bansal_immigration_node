'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, CheckCircle2, Phone } from 'lucide-react';
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

type Variant = 'hero' | 'urgent' | 'final';

export default function HeroLeadForm({
  variant = 'hero',
  defaultHelp,
  className = '',
}: {
  variant?: Variant;
  defaultHelp?: string;
  className?: string;
}) {
  const isUrgent = variant === 'urgent';
  const showTabs = variant === 'hero';
  const [tab, setTab] = useState<'book' | 'callback'>('book');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dial, setDial] = useState('+61');
  const [phone, setPhone] = useState('');
  const [help, setHelp] = useState(defaultHelp || (isUrgent ? 'Visa refused or cancelled' : HELP_OPTIONS[0]));
  const [decisionDate, setDecisionDate] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const turnstileSiteKey = useTurnstileSiteKey();
  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileKey, setTurnstileKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const titleId = `${variant}-form-title`;
  const submitLabel = isUrgent
    ? 'Request an urgent call back'
    : variant === 'final' || tab === 'callback'
      ? 'Request a call back'
      : 'Book your consultation';

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (honeypot) {
      setDone(true);
      return;
    }
    if (!name.trim()) return setError('Please enter your name.');
    if (phone.replace(/\D/g, '').length < 6) return setError('Please enter a valid phone number.');
    if (!email.trim() || !email.includes('@')) return setError('Please enter a valid email address.');
    if (turnstileSiteKey && !turnstileToken) return setError('Please complete the security check before sending.');
    setLoading(true);
    try {
      const urgentPrefix = isUrgent ? 'URGENT: ' : '';
      const res = await fetch('/contact/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: `${dial} ${phone.trim()}`,
          subject: `${urgentPrefix}Callback Request: ${help}`,
          message: [
            `Visa / Service Enquiry: ${help}`,
            decisionDate ? `Decision letter date: ${decisionDate}` : null,
            `Requested from the home page (${variant}).`,
          ]
            .filter(Boolean)
            .join('\n'),
          form_source: `homepage_${variant}`,
          form_variant: isUrgent ? 'urgent_callback' : 'callback',
          website_honeypot: honeypot,
          cf_turnstile_response: turnstileToken,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success !== false) {
        setDone(true);
        const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
        if (typeof gtag === 'function') {
          gtag('event', 'callback_submit', {
            location: variant,
            help_topic: help,
          });
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
      <div className={`rounded-2xl bg-white border border-slate-200 shadow-xl p-7 sm:p-8 text-center ${className}`} role="status">
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

  const formFields = (
    <div className="space-y-4">
      <div>
        <label htmlFor={`${variant}-name`} className={fieldLabel}>
          Full name <span className="text-red-700" aria-hidden="true">*</span>
        </label>
        <input
          id={`${variant}-name`}
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
        <label htmlFor={`${variant}-phone`} className={fieldLabel}>
          Phone number <span className="text-red-700" aria-hidden="true">*</span>
        </label>
        <PhoneField
          id={`${variant}-phone`}
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
        <label htmlFor={`${variant}-email`} className={fieldLabel}>
          Email address <span className="text-red-700" aria-hidden="true">*</span>
        </label>
        <input
          id={`${variant}-email`}
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={fieldInput}
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor={`${variant}-help`} className={fieldLabel}>
          I need help with <span className="text-red-700" aria-hidden="true">*</span>
        </label>
        <select
          id={`${variant}-help`}
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

      {isUrgent && (
        <div>
          <label htmlFor={`${variant}-decision-date`} className={fieldLabel}>
            Date on your decision letter <span className="font-normal text-slate-500">(optional)</span>
          </label>
          <input
            id={`${variant}-decision-date`}
            type="date"
            value={decisionDate}
            onChange={(e) => setDecisionDate(e.target.value)}
            className={fieldInput}
          />
        </div>
      )}

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
        {loading ? 'Sending...' : submitLabel}
        {!loading && (isUrgent || variant === 'final' ? <Phone className="w-4 h-4" aria-hidden="true" /> : <Calendar className="w-4 h-4" aria-hidden="true" />)}
      </button>
    </div>
  );

  if (showTabs) {
    return (
      <div id={variant === 'hero' ? 'hero-lead' : undefined} className={`rounded-2xl bg-white border border-slate-200 shadow-xl p-6 sm:p-8 ${className}`}>
        <h2 id={titleId} className="text-2xl font-extrabold tracking-tight text-slate-900">
          Book your consultation
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-1 rounded-xl bg-slate-100 p-1" role="tablist" aria-label="Booking options">
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'book'}
            onClick={() => setTab('book')}
            className={`min-h-11 rounded-lg text-sm font-bold transition-colors ${
              tab === 'book' ? 'bg-white text-brand-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Book online
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'callback'}
            onClick={() => setTab('callback')}
            className={`min-h-11 rounded-lg text-sm font-bold transition-colors ${
              tab === 'callback' ? 'bg-white text-brand-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Request a call back
          </button>
        </div>

        <div className="mt-6" role="tabpanel" hidden={tab !== 'book'}>
          <p className="text-sm text-slate-600 leading-relaxed">
            Choose a time that suits you. The fee for your appointment type is shown before you confirm.
          </p>
          <Link href="/book-an-appointment" className={`${btnPrimaryLight} w-full mt-5`}>
            <Calendar className="w-4 h-4" aria-hidden="true" />
            Book a Consultation
          </Link>
          <p className="mt-4 text-xs text-slate-500 leading-relaxed">
            Takes about two minutes. You see the fee before you confirm.
          </p>
        </div>
        <form onSubmit={submit} noValidate className="mt-6" role="tabpanel" aria-labelledby={titleId} hidden={tab !== 'callback'}>
          <p className="mb-4 text-sm text-slate-600">Tell us how to reach you. We reply within one business day.</p>
          {formFields}
          <p className="mt-4 text-xs text-slate-500 leading-relaxed">
            We use your details only to contact you about your enquiry. See our{' '}
            <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-slate-800">
              privacy policy
            </Link>
            .
          </p>
        </form>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className={`rounded-2xl bg-white border border-slate-200 shadow-xl p-6 sm:p-8 ${className}`}
      aria-labelledby={titleId}
    >
      <h2 id={titleId} className="text-2xl font-extrabold tracking-tight text-slate-900">
        {isUrgent ? 'Request an urgent call back' : 'Request a call back'}
      </h2>
      <p className="mt-1.5 text-sm text-slate-600">
        {isUrgent
          ? 'Have your decision letter ready. We will call you back as soon as we can.'
          : 'Tell us how to reach you. We reply within one business day.'}
      </p>
      <div className="mt-6">{formFields}</div>
      <p className="mt-4 text-xs text-slate-500 leading-relaxed">
        We use your details only to contact you about your enquiry. See our{' '}
        <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-slate-800">
          privacy policy
        </Link>
        .
      </p>
      {!isUrgent && (
        <p className="mt-3 pt-3 border-t border-slate-100 text-sm text-slate-600">
          Prefer to choose a time?{' '}
          <Link href="/book-an-appointment" className={`font-bold text-brand-800 hover:text-brand-950 inline-flex items-center gap-1 rounded ${focusRing}`}>
            Book an appointment online <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </p>
      )}
    </form>
  );
}
