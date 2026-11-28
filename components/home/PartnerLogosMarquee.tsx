import Image from 'next/image';

const LOGOS = [
  { src: '/img/registered_partner_logos/MA-Logo.webp', alt: 'Migration Alliance' },
  { src: '/img/registered_partner_logos/mia-logo.webp', alt: 'Migration Institute of Australia' },
  { src: '/img/registered_partner_logos/ISANA-Logo.webp', alt: 'ISANA' },
  { src: '/img/registered_partner_logos/ICEF_logo.svg', alt: 'ICEF' },
  { src: '/img/registered_partner_logos/IELTS_Trusted Partner Certificate.avif', alt: 'IELTS trusted partner' },
  { src: '/img/registered_partner_logos/ECA-GROUP.webp', alt: 'ECA Group' },
] as const;

export default function PartnerLogosMarquee() {
  return (
    <section aria-label="Accreditations and partners" className="bg-slate-50 border-y border-slate-200/80 py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-[0.14em] text-slate-500 mb-6">
          Accreditations and partners
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {LOGOS.map((logo) => (
            <li key={logo.src} className="opacity-80 hover:opacity-100 transition-opacity">
              <Image src={logo.src} alt={logo.alt} width={120} height={48} className="h-10 w-auto object-contain" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}