'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics/events';

/** Delegates click tracking for elements with data-analytics-event. */
export default function AnalyticsListener() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-analytics-event]');
      if (!target) return;
      const event = target.dataset.analyticsEvent;
      if (!event) return;
      const title = target.dataset.analyticsTitle;
      const location = target.dataset.analyticsLocation;
      const tool = target.dataset.analyticsTool;
      trackEvent(event, {
        ...(title ? { card_title: title } : {}),
        ...(location ? { location } : {}),
        ...(tool ? { tool_name: tool } : {}),
      });
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);
  return null;
}