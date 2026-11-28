import Image from 'next/image';

/** Placeholder partners until final logo files are on the server (6 items). */
const DUMMY_PARTNERS = [
  { id: 'omara', label: 'OMARA', sublabel: 'Registered agents' },
  { id: 'mia', label: 'MIA', sublabel: 'Migration Institute' },
  { id: 'icef', label: 'ICEF', sublabel: 'Partner agency', image: '/img/registered_partner_logos/ICEF_logo.svg' },
  { id: 'ielts', label: 'IELTS', sublabel: 'Trusted partner' },
  { id: 'isana', label: 'ISANA', sublabel: 'Education network' },
  { id: 'eca', label: 'ECA', sublabel: 'Skills assessment' },
] as const;

function PartnerMark({
  partner,
  duplicated,
}: {
  partner: (typeof DUMMY_PARTNERS)[number];
  duplicated: boolean;
}) {
  const alt = duplicated ? '' : `${partner.label} — ${partner.sublabel}`;

  if ('image' in partner && partner.image) {
    return (
      <span className="flex h-14 w-40 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 shadow-sm">
        <Image
          src={partner.image}
          alt={alt}
          width={120}
          height={48}
          className="max-h-10 w-auto object-contain"
        />
      </span>
    );
  }

  return (
    <span className="flex h-14 w-40 shrink-0 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-3 shadow-sm">
      <span className="text-sm font-extrabold tracking-wide text-slate-800">{partner.label}</span>
      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">{partner.sublabel}</span>
    </span>
  );
}

export default function PartnerLogosMarquee() {
  const row = [...DUMMY_PARTNERS, ...DUMMY_PARTNERS];

  return (
    <section aria-label="Accreditations and partners" className="bg-slate-50 border-y border-slate-200/80 py-8">
      <p className="text-center text-xs font-bold uppercase tracking-[0.14em] text-slate-500 px-4">
        Accreditations and partners
      </p>
      <div className="accreditation-wrap mt-6 overflow-hidden">
        <ul className="accreditation-track flex w-max items-center gap-8 px-6">
          {row.map((partner, i) => (
            <li key={`${partner.id}-${i}`}>
              <PartnerMark partner={partner} duplicated={i >= DUMMY_PARTNERS.length} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}