import React from 'react';
import { sound } from '../utils/audio';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenGta: () => void;
}

const linkCls = 'text-fg-2 hover:text-fg transition-colors duration-150 ease-out';

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenGta }) => {
  return (
    <footer className="bg-ink-deep/85 backdrop-blur-sm border-t border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 pb-12 border-b border-line">
          <div className="max-w-sm">
            <div className="font-display font-black uppercase text-4xl leading-none text-fg">
              Nexus<span className="text-accent">9</span>
            </div>
            <p className="mt-3 text-sm leading-[1.6] text-fg-3">
              A gaming lounge with high-end PCs, console lounges, sim cockpits and VR. Open every hour of every day.
            </p>
            <button
              onClick={() => {
                sound.playSuccess();
                onOpenBooking();
              }}
              className="btn btn-primary mt-6"
            >
              Book a rig
            </button>
          </div>

          <div>
            <h4 className="text-sm text-fg mb-4">Lounge</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  onClick={() => {
                    sound.playGtaPowerup();
                    onOpenGta();
                  }}
                  className={linkCls}
                >
                  GTA VI launch night
                </button>
              </li>
              <li><a href="#rigs-section" onClick={() => sound.playClick()} className={linkCls}>Stations</a></li>
              <li><a href="#games-section" onClick={() => sound.playClick()} className={linkCls}>Games</a></li>
              <li><a href="#tournaments-section" onClick={() => sound.playClick()} className={linkCls}>Tournaments</a></li>
              <li><a href="#fuel-bar" onClick={() => sound.playClick()} className={linkCls}>Food and drinks</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm text-fg mb-4">Visit</h4>
            <ul className="space-y-3 text-sm text-fg-2">
              <li>742 Cyber Boulevard<br />Neo District, Sector 4</li>
              <li>Open 24/7</li>
              <li className="font-mono tabular-nums">+1 (800) 909-NEXUS</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm text-fg mb-4">Community</h4>
            <p className="text-sm text-fg-3 mb-4">Scrims, giveaways and team-finding on Discord.</p>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => sound.playClick()} className={linkCls}>Discord</button></li>
              <li><button onClick={() => sound.playClick()} className={linkCls}>Twitch</button></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row md:items-start justify-between gap-6 text-xs text-fg-3">
          <div className="max-w-2xl space-y-2">
            <div>© {new Date().getFullYear()} Nexus 9</div>
            <p>
              Grand Theft Auto VI is a trademark of Rockstar Games and Take-Two Interactive. Nexus 9 is an independent gaming lounge and is not affiliated with them.
            </p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-fg-2">Terms</a>
            <a href="#" className="hover:text-fg-2">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
