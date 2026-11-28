import Link from 'next/link';
import Image from 'next/image';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { card, cardHover, focusRing, IconTile } from '@/components/ui/brand';

export type ServicePathway = {
  title: string;
  desc: string;
  href: string;
  image: string;
  icon: LucideIcon;
};

/** Item L — service card with CSS-only hover image (handoff). */
export default function ServicePathwayCard({ item }: { item: ServicePathway }) {
  return (
    <Link href={item.href} className={`group relative block overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 ${cardHover} ${focusRing}`}>
      <Image
        src={item.image}
        alt=""
        width={640}
        height={400}
        sizes="(min-width: 1024px) 25vw, 50vw"
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-20 transition-opacity duration-300 motion-reduce:transition-none [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-visible:opacity-100"
      />
      <div className="absolute inset-0 z-[1] bg-slate-900/60 opacity-0 transition-opacity duration-300 motion-reduce:transition-none [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-visible:opacity-100" aria-hidden="true" />
      <div className="relative z-[2] flex flex-col min-h-[11rem] transition-colors duration-300 [@media(hover:hover)]:group-hover:text-white [@media(hover:hover)]:group-focus-visible:text-white">
        <IconTile icon={item.icon} />
        <h3 className="mt-5 text-lg font-bold text-slate-900 leading-snug [@media(hover:hover)]:group-hover:text-white [@media(hover:hover)]:group-focus-visible:text-white">
          {item.title}
        </h3>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed flex-1 [@media(hover:hover)]:group-hover:text-slate-100 [@media(hover:hover)]:group-focus-visible:text-slate-100">
          {item.desc}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-800 [@media(hover:hover)]:group-hover:text-white [@media(hover:hover)]:group-focus-visible:text-white">
          {item.title}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}