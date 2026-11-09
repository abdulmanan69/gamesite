import React, { useState } from 'react';
import { Plus, Check } from 'lucide-react';
import { FUEL_MENU } from '../data/gamingData';
import type { FuelItem } from '../data/gamingData';
import { sound } from '../utils/audio';
import { SectionHeader } from './SectionHeader';
import { rs } from '../data/money';

interface FuelBarSectionProps {
  onAddFuelItem: (item: FuelItem) => void;
}

const CATS = ['All', 'Drinks', 'Mains', 'Snacks'] as const;

export const FuelBarSection: React.FC<FuelBarSectionProps> = ({ onAddFuelItem }) => {
  const [cat, setCat] = useState<(typeof CATS)[number]>('All');
  const [added, setAdded] = useState<Record<string, boolean>>({});
  const items = cat === 'All' ? FUEL_MENU : FUEL_MENU.filter((i) => i.category === cat);

  const add = (item: FuelItem) => {
    sound.playSuccess();
    onAddFuelItem(item);
    setAdded((p) => ({ ...p, [item.id]: true }));
    setTimeout(() => setAdded((p) => ({ ...p, [item.id]: false })), 1500);
  };

  return (
    <section id="fuel-bar" className="py-24 sm:py-32 border-t border-line bg-ink-deep/70 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHeader
          eyebrow="Kitchen and bar · open all night"
          title="Order from your desk, keep playing"
          lede="Smash burgers, wings, cold brew and the house drinks. Order from your screen and it comes to your station."
          aside={
            <div className="inline-flex gap-1 p-1 rounded-lg bg-ink-card border border-line">
              {CATS.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    sound.playClick();
                    setCat(c);
                  }}
                  className={`tab ${cat === c ? 'tab-active' : ''}`}
                >
                  {c}
                </button>
              ))}
            </div>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => {
            const isAdded = !!added[item.id];
            return (
              <article key={item.id} className="card p-3 flex gap-4">
                <div className="w-28 h-28 rounded-lg overflow-hidden bg-ink-raised shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.visibility = 'hidden';
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 flex flex-col py-1 pr-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-[15px] font-medium text-fg leading-snug">{item.name}</h3>
                    <span className="font-mono text-sm text-fg tabular-nums shrink-0">{rs(item.price)}</span>
                  </div>
                  <p className="mt-1 text-[13px] text-fg-3 line-clamp-2">{item.energyBonus}</p>
                  <div className="flex-1" />
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-mono text-xs text-fg-3">{item.tag}</span>
                    <button
                      onClick={() => add(item)}
                      onMouseEnter={() => sound.playHover()}
                      aria-label={`Add ${item.name}`}
                      className={`h-8 px-3 rounded-md inline-flex items-center gap-1.5 text-[13px] transition-colors duration-150 ease-out ${
                        isAdded ? 'text-ok' : 'bg-ink-raised text-fg hover:bg-ink-hover border border-line'
                      }`}
                    >
                      {isAdded ? <Check className="w-4 h-4" strokeWidth={1.5} /> : <Plus className="w-4 h-4" strokeWidth={1.5} />}
                      {isAdded ? 'Added' : 'Add'}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
