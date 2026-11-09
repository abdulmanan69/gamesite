import React from 'react';
import { Check } from 'lucide-react';
import { PRICING_PLANS, TESTIMONIALS } from '../data/gamingData';
import type { PricingPlan } from '../data/gamingData';
import { sound } from '../utils/audio';
import { SectionHeader } from './SectionHeader';
import { rs } from '../data/money';

interface PricingSectionProps {
  onSelectPlan: (plan: PricingPlan) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  return (
    <section id="pricing-section" className="py-24 sm:py-32 border-t border-line scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHeader
          eyebrow="Passes"
          title="Pay for the hours you play"
          lede="No membership, no contract. Drop in for an hour, stay the night, or hold your seat for GTA VI."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRICING_PLANS.map((plan) => {
            const featured = plan.popular;
            return (
              <div
                key={plan.id}
                className={`rounded-2xl p-6 flex flex-col border ${
                  featured ? 'bg-ink-raised border-accent/60' : 'bg-ink-card border-line'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-[17px] font-medium text-fg">{plan.name}</h3>
                  {featured && <span className="font-mono text-xs text-accent">Most picked</span>}
                  {plan.isGtaSpecial && <span className="font-mono text-xs text-fg-3">Launch only</span>}
                </div>
                <p className="mt-2 text-sm text-fg-3 min-h-10">{plan.description}</p>

                <div className="mt-6 pb-6 border-b border-line flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className={`font-display font-black text-5xl leading-none whitespace-nowrap tabular-nums ${featured ? 'text-accent' : 'text-fg'}`}>{rs(plan.price)}</span>
                  <span className="text-sm text-fg-3">{plan.duration}</span>
                </div>

                <ul className="mt-6 space-y-3 text-sm text-fg-2 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="grid grid-cols-[16px_1fr] gap-3">
                      <Check className="w-4 h-4 mt-0.5 text-fg-3" strokeWidth={1.5} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => {
                    if (plan.isGtaSpecial) sound.playGtaPowerup();
                    else sound.playSuccess();
                    onSelectPlan(plan);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className={`btn mt-8 w-full ${featured ? 'btn-primary' : 'btn-secondary'}`}
                >
                  Choose {plan.name.toLowerCase()}
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="border-t border-line pt-6">
              <blockquote className="text-[15px] leading-[1.6] text-fg">{t.quote}</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <img src={t.avatar} alt="" loading="lazy" className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <div className="text-sm text-fg">{t.name}</div>
                  <div className="text-[13px] text-fg-3">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
