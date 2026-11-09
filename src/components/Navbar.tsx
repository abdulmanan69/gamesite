import React, { useState } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowRight } from 'lucide-react';
import { sound } from '../utils/audio';
import { FLOOR_IN_USE, FLOOR_TOTAL } from '../data/floor';

interface NavbarProps {
  onOpenBooking: (prefillCategory?: string) => void;
  onOpenGtaModal: () => void;
}

const LINKS = [
  { id: 'gta6-zone', label: 'GTA VI night' },
  { id: 'rigs-section', label: 'Stations' },
  { id: 'games-section', label: 'Games' },
  { id: 'tournaments-section', label: 'Tournaments' },
  { id: 'fuel-bar', label: 'Food' },
  { id: 'pricing-section', label: 'Passes' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenGtaModal }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const next = !isMuted;
    sound.isMuted = next;
    setIsMuted(next);
    if (!next) sound.playClick();
  };

  const go = (id: string) => {
    sound.playClick();
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Announcement */}
      <div className="bg-ink-deep border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-10 flex items-center justify-center gap-3 text-[13px] text-fg-2">
          <span className="hidden sm:inline">GTA VI launch night passes are on sale</span>
          <span className="sm:hidden">GTA VI passes on sale</span>
          <button
            onClick={() => {
              sound.playGtaPowerup();
              onOpenGtaModal();
            }}
            className="inline-flex items-center gap-1 text-fg hover:text-accent transition-colors duration-150 ease-out"
          >
            Get a pass
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-ink-bg/90 backdrop-blur-md border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-8">
          <a href="#" onClick={() => sound.playClick()} className="flex items-center gap-3">
            <span className="font-display font-black uppercase text-[28px] leading-none text-fg">
              Nexus<span className="text-accent">9</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-fg-3 tabular-nums">
              <span className="w-1.5 h-1.5 rounded-full bg-ok animate-live" />
              {FLOOR_IN_USE}/{FLOOR_TOTAL} in use
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold uppercase tracking-[0.12em] text-fg-2">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                onMouseEnter={() => sound.playHover()}
                className="hover:text-fg transition-colors duration-150 ease-out"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleSound}
              aria-label={isMuted ? 'Turn sound on' : 'Turn sound off'}
              title={isMuted ? 'Turn sound on' : 'Turn sound off'}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-fg-3 hover:text-fg hover:bg-ink-raised transition-colors duration-150 ease-out"
            >
              {isMuted ? <VolumeX className="w-4 h-4" strokeWidth={1.5} /> : <Volume2 className="w-4 h-4" strokeWidth={1.5} />}
            </button>

            <button
              onClick={() => {
                sound.playSuccess();
                onOpenBooking();
              }}
              className="btn btn-primary h-9"
            >
              Book a rig
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
              className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-fg-2 hover:bg-ink-raised"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" strokeWidth={1.5} /> : <Menu className="w-5 h-5" strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-line bg-ink-bg px-4 py-4 animate-rise">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="w-full h-11 px-3 rounded-lg text-left text-[15px] text-fg-2 hover:text-fg hover:bg-ink-raised"
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </header>
    </>
  );
};
