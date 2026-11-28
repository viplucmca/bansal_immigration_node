'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PlayCircle } from 'lucide-react';
import { focusRing } from '@/components/ui/brand';
import { trackEvent } from '@/lib/analytics/events';

type Props = {
  youtubeId: string;
  title: string;
  href?: string;
};

/** Item J — click-to-load YouTube embed (no iframe until play). */
export default function ClickToLoadVideo({ youtubeId, title, href }: Props) {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200 bg-black">
        <iframe
          title={title}
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
          className="absolute inset-0 h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      className={`group relative block w-full aspect-video rounded-2xl overflow-hidden border border-slate-200 text-left ${focusRing}`}
      onClick={() => {
        trackEvent('video_play', { video_title: title, location: 'homepage' });
        setActive(true);
      }}
      data-analytics-event="video_play"
      data-analytics-title={title}
    >
      <Image
        src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
        alt=""
        fill
        sizes="(max-width: 640px) 100vw, 33vw"
        className="object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none"
        unoptimized
      />
      <span className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/35 transition-colors">
        <PlayCircle className="w-14 h-14 text-white drop-shadow-lg" aria-hidden="true" />
      </span>
      <span className="sr-only">Play video: {title}</span>
      {href && <span className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
        <span className="text-sm font-semibold text-white line-clamp-2">{title}</span>
      </span>}
    </button>
  );
}