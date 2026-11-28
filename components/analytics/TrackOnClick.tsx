'use client';

import type { ReactNode } from 'react';
import { trackEvent, type AnalyticsParams } from '@/lib/analytics/events';

type Props = {
  event: string;
  params?: AnalyticsParams;
  children: ReactNode;
  className?: string;
  as?: 'span' | 'div';
};

export default function TrackOnClick({ event, params, children, className, as = 'span' }: Props) {
  const Tag = as;
  return (
    <Tag
      className={className}
      onClick={() => trackEvent(event, params)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') trackEvent(event, params);
      }}
    >
      {children}
    </Tag>
  );
}