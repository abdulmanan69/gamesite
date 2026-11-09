import React, { useState } from 'react';
import { GAMING_RIGS } from '../data/gamingData';
import type { GamingRig } from '../data/gamingData';
import { sound } from '../utils/audio';
import { SectionHeader } from './SectionHeader';
import { rs } from '../data/money';

interface RigStatusTrackerProps {
  onSelectRig: (rig: GamingRig) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'pc-ultra', label: 'PC' },
  { id: 'console', label: 'Console' },
  { id: 'racing-sim', label: 'Sim racing' },
  { id: 'vr-suite', label: 'VR' },
];

export const RigStatusTracker: React.FC<RigStatusTrackerProps> = ({ onSelectRig }) => {
  const [active, setActive] = useState('all');
  const rigs = active === 'all' ? GAMING_RIGS : GAMING_RIGS.filter((r) => r.category === active);
  const free = GAMING_RIGS.filter((r) => r.status === 'available').length;
  const busy = GAMING_RIGS.filter((r) => r.status === 'occupied').length;

  return (
    <section id="rigs-section" className="py-24 sm:py-32 border-t border-line scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHeader
          eyebrow="Stations"
          title="Pick the desk, not just the hour"
          lede="Every station lists its exact hardware and whether someone is on it. Liquid-cooled 14900KS PCs, 360Hz displays and direct-drive sim cockpits."
          aside={
            <div className="flex items-center gap-6 font-mono text-xs text-fg-2 tabular-nums">
              <span className="inline-flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-ok" />{free} free</span>
              <span className="inline-flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-fg-3" />{busy} in a match</span>
            </div>
          }
        />

        <div className="inline-flex gap-1 p-1 rounded-lg bg-ink-card border border-line mb-8 max-w-full overflow-x-auto no-scrollbar">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                sound.playClick();
                setActive(c.id);
              }}
              className={`tab ${active === c.id ? 'tab-active' : ''}`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {rigs.map((rig) => {
            const isFree = rig.status === 'available';
            return (
              <article key={rig.id} className="card overflow-hidden flex flex-col">
                <div className="relative aspect-[16/10] overflow-hidden bg-ink-raised">
                  <img
                    src={rig.image}
                    alt={rig.name}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.visibility = 'hidden';
                    }}
                    className={`w-full h-full object-cover ${isFree ? '' : 'opacity-60 grayscale-[40%]'}`}
                  />
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="inline-flex items-center gap-2 text-fg-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${isFree ? 'bg-ok' : 'bg-fg-3'}`} />
                      {rig.id}
                    </span>
                    <span className="text-fg-2 tabular-nums">{rs(rig.pricePerHour)}/hr</span>
                  </div>

                  <h3 className="mt-3 text-[17px] font-medium text-fg">{rig.name}</h3>
                  <p className="text-sm text-fg-3 mt-1">{rig.categoryLabel}</p>

                  <dl className="mt-4 pt-4 border-t border-line space-y-1.5 text-[13px]">
                    <div className="truncate text-fg-2" title={rig.specs.gpu}>{rig.specs.gpu}</div>
                    <div className="truncate text-fg-3" title={rig.specs.display}>{rig.specs.display}</div>
                  </dl>

                  <div className="mt-4 text-[13px] text-fg-3 min-h-5">
                    {isFree ? 'Free now' : `${rig.currentGame} · about ${rig.timeRemaining} left`}
                  </div>

                  <div className="flex-1" />
                  <button
                    onClick={() => {
                      sound.playSuccess();
                      onSelectRig(rig);
                    }}
                    onMouseEnter={() => sound.playHover()}
                    className={`btn mt-5 w-full ${isFree ? 'btn-light' : 'btn-secondary'}`}
                  >
                    {isFree ? 'Reserve' : 'Take the next slot'}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
