export type HomeVideo = {
  id: string;
  title: string;
  published: string;
  summary: string;
};

const FALLBACK: HomeVideo[] = [
  {
    id: 'KFS0K4SqSFU',
    title: 'Australia Protection Visa 866 update: Bridging Visa B travel from 1 November 2026',
    published: '2026-11-25',
    summary:
      'What the new Bridging Visa B rules mean if a Protection Visa application or review is still pending and you plan to travel.',
  },
  {
    id: 'OS_datjPMhw',
    title: 'Visa refused? How an ART review works in 2026',
    published: '2026-11-24',
    summary:
      'Deadlines, fees, bridging visas and hearings after a refusal or cancellation. This is general information, not advice on your case.',
  },
  {
    id: 'lhcmEKoCE6s',
    title: 'SkillSelect shutdown: submit your EOI before 24 November',
    published: '2026-11-23',
    summary:
      'SkillSelect was unavailable from 24 to 28 November 2026. Draft expressions of interest needed to be submitted before the shutdown.',
  },
];

function decode(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

export async function latestYouTube(limit = 3): Promise<HomeVideo[]> {
  try {
    const res = await fetch('https://www.youtube.com/feeds/videos.xml?channel_id=UC50igq1FkF8fNjsPqLvgNzA', {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return FALLBACK.slice(0, limit);
    const xml = await res.text();
    const videos = xml
      .split('<entry>')
      .slice(1)
      .map((entry) => {
        const id = /<yt:videoId>([^<]+)<\/yt:videoId>/.exec(entry)?.[1] ?? '';
        const title = decode(/<title>([\s\S]*?)<\/title>/.exec(entry)?.[1] ?? '');
        const published = (/<published>([^<]+)<\/published>/.exec(entry)?.[1] ?? '').slice(0, 10);
        const raw = decode(/<media:description>([\s\S]*?)<\/media:description>/.exec(entry)?.[1] ?? '');
        const clean = raw.replace(/\s+/g, ' ').trim();
        const sentence = clean.split(/(?<=[.!?])\s/)[0] || clean;
        const summary = sentence.length > 220 ? `${sentence.slice(0, 200).replace(/\s+\S*$/, '')}.` : sentence;
        return { id, title, published, summary };
      })
      .filter((video) => video.id && video.title);
    return videos.length ? videos.slice(0, limit) : FALLBACK.slice(0, limit);
  } catch {
    return FALLBACK.slice(0, limit);
  }
}
