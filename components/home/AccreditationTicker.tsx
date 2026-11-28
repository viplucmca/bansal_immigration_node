const LOGOS = [
  { src: '/img/registered_partner_logos/mia-logo.png', alt: 'Migration Institute of Australia' },
  { src: '/img/registered_partner_logos/ICEF_logo.svg', alt: 'ICEF' },
  { src: '/img/registered_partner_logos/IELTS_Trusted Partner.jpeg', alt: 'IELTS Trusted Partner' },
  { src: '/img/registered_partner_logos/ISANA-Logo.png', alt: 'ISANA' },
  { src: '/img/registered_partner_logos/MA-Logo.png', alt: 'Migration Alliance' },
  { src: '/img/registered_partner_logos/ECA-GROUP.png', alt: 'ECA' },
  { src: '/img/registered_partner_logos/ACAP-202211222220-ACAP40Years-FinalLogo.webp', alt: 'ACAP' },
  { src: '/img/registered_partner_logos/southern-cross-university.png', alt: 'Southern Cross University' },
  { src: '/img/registered_partner_logos/logo-up-education.svg', alt: 'UP Education' },
];

export default function AccreditationTicker() {
  const row = [...LOGOS, ...LOGOS];
  return (
    <section aria-label="Accreditations and education partners" className="border-y border-slate-200 bg-white py-8">
      <p className="text-center text-xs font-bold uppercase tracking-[0.16em] text-brand-800">Accreditations and partners</p>
      <div className="accreditation-wrap mt-5 overflow-hidden">
        <ul className="accreditation-track flex w-max items-center gap-10 px-6">
          {row.map((logo, i) => (
            <li key={`${logo.src}-${i}`} className="flex h-14 w-36 shrink-0 items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logo.src} alt={i < LOGOS.length ? logo.alt : ''} width={144} height={56} className="max-h-12 w-auto object-contain" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
