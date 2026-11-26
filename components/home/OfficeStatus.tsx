'use client';

import React, { useEffect, useState } from 'react';

/** Hours: Monday to Friday, 9:30 am to 6:00 pm, in the office's own time zone. */
export function officeStatus(timeZone: string, now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-AU', {
    timeZone,
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const day = get('weekday');
  const mins = (parseInt(get('hour'), 10) % 24) * 60 + parseInt(get('minute'), 10);
  const weekday = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(day);
  const opens = 9 * 60 + 30;
  const closes = 18 * 60;
  if (weekday && mins >= opens && mins < closes) {
    return { open: true, label: 'Open now' };
  }
  if (weekday && mins < opens) {
    return { open: false, label: 'Opens today at 9:30 am' };
  }
  if (day === 'Fri' || day === 'Sat' || day === 'Sun') {
    return { open: false, label: 'Opens Monday at 9:30 am' };
  }
  return { open: false, label: 'Opens tomorrow at 9:30 am' };
}

export default function OfficeStatus({ timeZone }: { timeZone: string }) {
  const [text, setText] = useState(() => officeStatus(timeZone));

  useEffect(() => {
    const compute = () => setText(officeStatus(timeZone));
    compute();
    const id = setInterval(compute, 60000);
    return () => clearInterval(id);
  }, [timeZone]);

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${
        text.open ? 'bg-emerald-50 text-emerald-800' : 'bg-slate-100 text-slate-600'
      }`}
    >
      <span aria-hidden="true" className={`h-2 w-2 rounded-full ${text.open ? 'bg-emerald-500' : 'bg-slate-400'}`} />
      {text.label}
    </span>
  );
}
