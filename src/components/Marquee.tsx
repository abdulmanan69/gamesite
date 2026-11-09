import React from 'react';

// Two scrolling bands, running in opposite directions. The orange one leads,
// the dark one sits behind it at a slight angle. Pauses on hover.

const TOP = ['RTX 4090 / 5090', 'PS5 Pro lounges', 'Motion sim cockpits', 'Room-scale VR', 'Open 24/7', 'GTA VI launch night'];
const BOTTOM = ['Book by the hour', '360Hz QD-OLED', '10 Gbps fiber', 'Food to your desk', 'Weekly tournaments', '50 stations'];

const Row: React.FC<{ items: string[]; reverse?: boolean; tone: 'accent' | 'dark' }> = ({ items, reverse, tone }) => {
  // the list is rendered twice so the loop is seamless at -50%
  const loop = [...items, ...items];
  return (
    <div className={`marquee-track ${reverse ? 'marquee-reverse' : ''}`}>
      {[0, 1].map((half) => (
        <div key={half} className="flex shrink-0 items-center" aria-hidden={half === 1}>
          {loop.map((t, i) => (
            <span key={`${half}-${i}`} className="flex items-center">
              <span
                className={`px-6 sm:px-8 font-display font-black uppercase leading-none whitespace-nowrap text-[32px] sm:text-[52px] ${
                  tone === 'accent' ? 'text-black' : i % 2 ? 'text-transparent [-webkit-text-stroke:1px_rgba(242,242,245,0.5)]' : 'text-fg'
                }`}
              >
                {t}
              </span>
              <span className={`text-2xl sm:text-4xl font-display font-black ${tone === 'accent' ? 'text-black/60' : 'text-accent'}`}>✕</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export const Marquee: React.FC = () => (
  <section aria-label="What is at Nexus 9" className="relative py-16 sm:py-24 overflow-hidden marquee-pause">
    <div className="relative -rotate-[2deg] scale-[1.04] bg-ink-raised border-y border-line py-4 sm:py-5">
      <Row items={BOTTOM} reverse tone="dark" />
    </div>
    <div className="relative mt-2 sm:mt-3 rotate-[1.5deg] scale-[1.04] bg-accent py-4 sm:py-5 shadow-[0_0_60px_rgba(255,91,20,0.35)]">
      <Row items={TOP} tone="accent" />
    </div>
  </section>
);
