import React from 'react';
import { TOURNAMENTS } from '../data/gamingData';
import type { Tournament } from '../data/gamingData';
import { sound } from '../utils/audio';
import { SectionHeader } from './SectionHeader';

interface TournamentSectionProps {
  onRegister: (tourney: Tournament) => void;
}

export const TournamentSection: React.FC<TournamentSectionProps> = ({ onRegister }) => {
  return (
    <section id="tournaments-section" className="py-24 sm:py-32 border-t border-line scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHeader
          eyebrow="Tournaments"
          title="Every week, someone takes the pot home"
          lede="Cash prizes on LAN stations with anti-cheat on. Finals go up on the big screens and our Twitch channel."
        />

        {/* A schedule reads better as a list than as a wall of posters */}
        <div className="card divide-y divide-line">
          {TOURNAMENTS.map((t) => (
            <div key={t.id} className="grid grid-cols-[64px_1fr] md:grid-cols-[96px_1fr_auto] gap-4 md:gap-6 p-4 sm:p-5 items-center">
              <img src={t.image} alt="" loading="lazy" className="w-16 h-16 md:w-24 md:h-16 rounded-lg object-cover" />

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-fg-3">
                  <span>{t.date}</span>
                  <span>{t.time}</span>
                  <span className={t.status === 'Registration Open' ? 'text-fg-3' : 'text-accent'}>{t.status === 'Registration Open' ? 'Open' : t.status}</span>
                </div>
                <h3 className="mt-1 text-[17px] font-medium text-fg truncate">{t.title}</h3>
                <div className="mt-1 text-sm text-fg-3">
                  {t.game} · {t.slots} · entry {t.entryFee}
                </div>
              </div>

              <div className="col-span-2 md:col-span-1 flex items-center justify-between md:justify-end gap-6">
                <div className="md:text-right">
                  <div className="text-xs text-fg-3">Prize</div>
                  <div className="text-lg font-medium tabular-nums text-fg">{t.prizePool}</div>
                </div>
                <button
                  onClick={() => {
                    sound.playSuccess();
                    onRegister(t);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className="btn btn-secondary"
                >
                  Register
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
