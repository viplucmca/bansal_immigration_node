'use client';

import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { focusRing } from '@/components/ui/brand';

export default function OfficeMapReveal({
  name,
  query,
}: {
  name: string;
  query: string;
}) {
  const [show, setShow] = useState(false);

  if (!show) {
    return (
      <div className="h-56 bg-slate-100 flex items-center justify-center">
        <button
          type="button"
          onClick={() => setShow(true)}
          className={`inline-flex items-center gap-2 min-h-12 px-5 rounded-xl bg-white border border-slate-300 text-sm font-bold text-brand-900 hover:border-brand-700 hover:bg-brand-50 ${focusRing}`}
        >
          <MapPin className="w-4 h-4" aria-hidden="true" />
          Show map
          <span className="sr-only"> for {name}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="h-56 bg-slate-100">
      <iframe
        title={`Map of the ${name}`}
        src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
        className="w-full h-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
