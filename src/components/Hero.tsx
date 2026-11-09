import React, { useEffect, useState } from 'react';
import { Play } from 'lucide-react';
import { sound } from '../utils/audio';
import { GTA_PROMO_DATA } from '../data/gamingData';
import { SEATS, FLOOR_IN_USE, FLOOR_TOTAL } from '../data/floor';
import type { Seat, ZoneId } from '../data/floor';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenTrailer: () => void;
  onExploreGta: () => void;
}

const pad = (v: number) => String(v).padStart(2, '0');
const rigId = (n: number) => `RIG-${pad(n)}`;

function useCountdown(target: string) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const s = Math.floor(Math.max(0, new Date(target).getTime() - now) / 1000);
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
}

/* One desk on the 3D floor, with a monitor standing up off its back edge */
const Desk: React.FC<{ seat: Seat; onPick: () => void }> = ({ seat, onPick }) => {
  const state = seat.held ? 'held' : seat.busy ? 'busy' : 'free';
  const label = `${rigId(seat.n)}, ${seat.held ? 'held for GTA VI' : seat.busy ? 'in a match' : 'free'}`;
  const screen =
    state === 'held' ? 'bg-accent shadow-[0_0_16px_rgba(255,91,20,0.9)]'
    : state === 'free' ? 'bg-ok/70 shadow-[0_0_12px_rgba(163,255,60,0.7)]'
    : 'bg-[#6d7cff]/60 shadow-[0_0_10px_rgba(109,124,255,0.5)]';
  const El = state === 'busy' ? 'span' : 'button';
  return (
    <El
      title={label}
      aria-label={label}
      onClick={state === 'busy' ? undefined : onPick}
      className={`desk desk-${state} relative block w-9 h-9 rounded-[4px] ${state === 'held' ? 'animate-live' : ''}`}
    >
      <span
        className={`absolute left-1 right-1 top-0 h-4 rounded-[2px] origin-top ${screen}`}
        style={{ transform: 'rotateX(-90deg)' }}
      />
    </El>
  );
};

const Zone: React.FC<{ zone: ZoneId; cols: number; label: string; onPick: () => void }> = ({ zone, cols, label, onPick }) => (
  <div>
    <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-fg-3">{label}</div>
    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, 36px)` }}>
      {SEATS.filter((s) => s.zone === zone).map((s) => (
        <Desk key={s.n} seat={s} onPick={onPick} />
      ))}
    </div>
  </div>
);

const Floor3D: React.FC<{ onPick: () => void }> = ({ onPick }) => (
  <div className="floor-stage relative h-[340px] sm:h-[520px] flex items-center justify-center overflow-hidden lg:overflow-visible" aria-label="Live map of the lounge floor">
    {/* light spilling off the screens */}
    <div className="absolute inset-0 bg-[radial-gradient(closest-side,rgba(255,91,20,0.22),transparent)] pointer-events-none" />
    <div className="shrink-0 scale-[0.54] sm:scale-90 xl:scale-100">
    <div className="floor-plane relative p-8 rounded-2xl floor-grid border border-line bg-ink-card/40">
      <div className="flex gap-10">
        <Zone zone="pc" cols={8} label="PC bank" onPick={onPick} />
        <div className="flex flex-col gap-8">
          <Zone zone="console" cols={4} label="Console" onPick={onPick} />
          <div className="flex gap-8">
            <Zone zone="sim" cols={3} label="Sim" onPick={onPick} />
            <Zone zone="vr" cols={2} label="VR" onPick={onPick} />
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
);

const LiveCard: React.FC = () => {
  const t = useCountdown(GTA_PROMO_DATA.countdownTarget);
  const free = SEATS.filter((s) => !s.busy);
  return (
    <div className="rounded-xl bg-ink-card/85 backdrop-blur-md border border-line p-5 w-full sm:w-[380px]">
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em]">
        <span className="inline-flex items-center gap-2 text-fg">
          <span className="w-2 h-2 rounded-full bg-ok animate-live" />
          Live floor
        </span>
        <span className="text-fg-3 tabular-nums">{FLOOR_IN_USE}/{FLOOR_TOTAL} in use</span>
      </div>
      <div className="mt-3 text-[13px] text-fg-2 leading-6 tabular-nums">
        <span className="text-ok">Free</span> {free.map((s) => rigId(s.n)).join(' · ')}
      </div>
      <div className="mt-4 pt-4 border-t border-line flex items-end justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-fg-3">GTA VI in</span>
        <span className="font-display font-extrabold text-3xl leading-none tabular-nums text-fg whitespace-nowrap">
          {t.d}<span className="text-accent">D</span> {pad(t.h)}<span className="text-accent">H</span> {pad(t.m)}<span className="text-accent">M</span>{' '}
          <span className="text-fg-3">{pad(t.s)}</span>
        </span>
      </div>
    </div>
  );
};

const FACTS = [
  ['RTX 4090/5090', 'Liquid-cooled PCs'],
  ['360Hz', 'QD-OLED on esports desks'],
  ['10 Gbps', 'Fiber, under 2ms locally'],
  ['24/7', 'Kitchen and bar all night'],
];

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenTrailer }) => {
  const pick = () => {
    sound.playSuccess();
    onOpenBooking();
  };

  return (
    <section className="relative overflow-hidden border-b border-line">
      {/* soft dark pool behind the headline so text stays readable over the grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_20%_45%,rgba(6,6,8,0.85),transparent_60%)]"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 pt-16 sm:pt-20 pb-16">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-4 lg:gap-8 items-center">
          <div className="animate-rise relative z-10 min-w-0">
            <p className="eyebrow mb-6">Gaming lounge · open 24/7</p>
            <h1 className="font-display font-black uppercase leading-[0.86] text-[64px] sm:text-[104px] lg:text-[120px]">
              Fifty rigs.
              <br />
              <span className="text-accent">Open all night.</span>
            </h1>
            <p className="mt-8 text-lg leading-[1.55] text-fg-2 max-w-[32rem]">
              RTX 4090 and 5090 PCs, PS5 Pro lounges, motion sim cockpits and VR, booked by the hour. Food comes to your desk.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <button onClick={pick} onMouseEnter={() => sound.playHover()} className="btn btn-lg btn-primary">
                Book a rig
              </button>
              <button
                onClick={() => {
                  sound.playGtaPowerup();
                  onOpenTrailer();
                }}
                onMouseEnter={() => sound.playHover()}
                className="btn btn-lg btn-secondary"
              >
                <Play className="w-4 h-4 fill-current" strokeWidth={1.5} />
                GTA VI trailer
              </button>
            </div>
          </div>

          <div className="relative animate-rise [animation-delay:120ms] min-w-0">
            <Floor3D onPick={pick} />
            <div className="-mt-20 sm:-mt-12 relative z-10 flex justify-end">
              <LiveCard />
            </div>
          </div>
        </div>

        <dl className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line rounded-xl overflow-hidden">
          {FACTS.map(([k, v]) => (
            <div key={k} className="bg-ink-deep px-4 sm:px-6 py-5">
              <dt className="font-display font-extrabold uppercase text-2xl sm:text-4xl leading-none text-fg">{k}</dt>
              <dd className="mt-2 text-sm text-fg-3">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
