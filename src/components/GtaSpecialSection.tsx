import React from 'react';
import { Play, Check } from 'lucide-react';
import { sound } from '../utils/audio';
import { GTA_PROMO_DATA } from '../data/gamingData';

interface GtaSpecialSectionProps {
  onOpenBooking: (prefill?: string) => void;
  onOpenTrailer: () => void;
}

export const GtaSpecialSection: React.FC<GtaSpecialSectionProps> = ({ onOpenBooking, onOpenTrailer }) => {
  return (
    <section id="gta6-zone" className="py-24 sm:py-32 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-2xl mb-12">
          <p className="eyebrow mb-3">Launch night · 100 stations</p>
          <h2 className="section-title">{GTA_PROMO_DATA.title}</h2>
          <p className="mt-4 text-base sm:text-lg leading-[1.55] text-fg-2">{GTA_PROMO_DATA.tagline}</p>
        </div>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
          {/* Trailer: the photo carries the colour, the chrome stays out of its way */}
          <button
            onClick={() => {
              sound.playGtaPowerup();
              onOpenTrailer();
            }}
            className="group relative block min-h-[320px] lg:min-h-0 rounded-2xl overflow-hidden border border-line text-left"
            aria-label="Play the GTA VI trailer"
          >
            <img
              src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute left-6 right-6 bottom-6 flex items-end justify-between gap-4">
              <div>
                <div className="text-lg font-medium text-white">Watch the trailer</div>
                <div className="font-mono text-xs text-white/70 mt-1">Rockstar Games · 4K</div>
              </div>
              <span className="w-14 h-14 shrink-0 rounded-full bg-fg text-ink-deep flex items-center justify-center transition-transform duration-150 ease-out group-hover:scale-[1.04] group-active:scale-[0.98]">
                <Play className="w-5 h-5 ml-0.5 fill-current" strokeWidth={1.5} />
              </span>
            </div>
          </button>

          {/* The pass */}
          <div className="card p-6 sm:p-8 flex flex-col">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-xl font-medium text-fg">Launch night pass</h3>
              <span className="font-mono text-xs text-fg-3">4 hours from midnight</span>
            </div>

            <ul className="mt-6 space-y-4 flex-1">
              {GTA_PROMO_DATA.features.map((item) => (
                <li key={item.title} className="grid grid-cols-[16px_1fr] gap-3">
                  <Check className="w-4 h-4 mt-1 text-fg-3" strokeWidth={1.5} />
                  <div>
                    <div className="text-[15px] text-fg">{item.title}</div>
                    <div className="text-sm text-fg-3 mt-0.5">{item.desc}</div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-line flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="font-display font-black text-5xl sm:text-6xl leading-none whitespace-nowrap tabular-nums text-accent">Rs 4,000</div>
                <div className="text-xs text-fg-3 mt-2">Limited to 100 stations</div>
              </div>
              <button
                onClick={() => {
                  sound.playGtaPowerup();
                  onOpenBooking('gta6-vip');
                }}
                className="btn btn-lg btn-primary"
              >
                Get a pass
              </button>
            </div>
          </div>
        </div>

        {/* Heist invitational */}
        <div className="mt-6 card p-6 sm:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <p className="eyebrow mb-2">Launch weekend · 8:00 PM PKT</p>
            <h3 className="text-xl font-medium text-fg">The heist invitational</h3>
            <p className="text-sm text-fg-2 mt-2">
              First squad to clear the prologue bank heist with the top score takes the pot, live on the big screens.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 shrink-0">
            <div>
              <div className="text-xs text-fg-3">Prize pool</div>
              <div className="font-display font-black text-4xl sm:text-5xl leading-none whitespace-nowrap tabular-nums text-fg mt-1">Rs 500,000</div>
            </div>
            <button
              onClick={() => {
                sound.playSuccess();
                onOpenBooking('tournament-gta6');
              }}
              className="btn btn-secondary"
            >
              Register a squad
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
