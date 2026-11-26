'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';

export default function LiteYouTube({ id, title }: { id: string; title: string }) {
  const [play, setPlay] = useState(false);

  if (play) {
    return (
      <iframe
        className="aspect-video w-full rounded-xl"
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
        title={title}
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlay(true)}
      className="relative aspect-video w-full overflow-hidden rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
      aria-label={`Play video: ${title}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt={title}
        loading="lazy"
        width={480}
        height={360}
        className="h-full w-full object-cover"
      />
      <span className="absolute inset-0 grid place-items-center bg-black/25">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-brand-900 shadow-lg">
          <Play className="h-6 w-6 fill-current" aria-hidden="true" />
        </span>
      </span>
    </button>
  );
}
