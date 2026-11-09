import React, { useEffect, useState } from 'react';
import { SEATS, FLOOR_TOTAL } from '../data/floor';

// Boot sequence for the lounge:
//  1. the wordmark slides up letter by letter
//  2. all 50 stations power on in a sweep, a scan line runs over them
//  3. the counter hits 100, the screen splits like two doors along an orange seam
// Shown once per browser session. Add ?skipboot to the URL to skip it.

const STEPS = [
  'Waking PC bank 01–32',
  'Warming console lounges',
  'Calibrating sim cockpits',
  'Pairing VR headsets',
  'Floor ready',
];

const KEY = 'nx9-booted';
const DURATION = 2200;
const WORD = 'NEXUS';

function alreadyBooted() {
  try {
    if (new URLSearchParams(window.location.search).has('skipboot')) return true;
    return sessionStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
}

// Stations light in a diagonal sweep rather than reading order
const ORDER = (() => {
  const cols = 10;
  return SEATS.map((_, i) => ({ i, k: (i % cols) + Math.floor(i / cols) * 1.6 }))
    .sort((a, b) => a.k - b.k)
    .map((x, rank) => ({ i: x.i, rank }))
    .sort((a, b) => a.i - b.i)
    .map((x) => x.rank);
})();

// One half of the screen. Both halves hold the same full-height scene, pinned to
// the top or bottom edge, so together they look like one screen until they part.
const Door: React.FC<{ side: 'top' | 'bottom'; opening: boolean; children: React.ReactNode }> = ({ side, opening, children }) => (
  <div
    className={`absolute inset-x-0 overflow-hidden bg-ink-deep boot-door ${side === 'top' ? 'top-0 h-1/2' : 'bottom-0 h-1/2'}`}
    style={{ transform: opening ? `translateY(${side === 'top' ? '-100%' : '100%'})` : 'translateY(0)' }}
  >
    <div className={`absolute inset-x-0 h-[100dvh] ${side === 'top' ? 'top-0' : 'bottom-0'}`}>{children}</div>
  </div>
);

export const BootScreen: React.FC = () => {
  const [visible, setVisible] = useState(() => !alreadyBooted());
  const [pct, setPct] = useState(0);
  const [phase, setPhase] = useState<'boot' | 'open' | 'done'>('boot');

  useEffect(() => {
    if (!visible) return;
    document.documentElement.style.overflow = 'hidden';

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const total = reduce ? 300 : DURATION;
    const start = performance.now();
    let raf = 0;
    const timers: number[] = [];

    const pageReady = new Promise<void>((resolve) => {
      if (document.readyState === 'complete') resolve();
      else window.addEventListener('load', () => resolve(), { once: true });
    });
    const fontsReady = (document.fonts?.ready ?? Promise.resolve()).then(() => undefined);

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / total);
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setPct(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        Promise.all([pageReady, fontsReady]).then(() => {
          timers.push(window.setTimeout(() => setPhase('open'), 350));
          timers.push(
            window.setTimeout(() => {
              try {
                sessionStorage.setItem(KEY, '1');
              } catch {
                // ignore
              }
              document.documentElement.style.overflow = '';
              setPhase('done');
              setVisible(false);
            }, 350 + 1000),
          );
        });
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      document.documentElement.style.overflow = '';
    };
  }, [visible]);

  if (!visible) return null;

  const lit = Math.round((pct / 100) * FLOOR_TOTAL);
  const step = STEPS[Math.min(STEPS.length - 1, Math.floor((pct / 100) * (STEPS.length - 1) + 0.0001))];
  const opening = phase === 'open';

  const Scene = (
    <div className="relative h-full flex flex-col text-fg">
      {/* faint dot field */}
      <div
        className="absolute inset-0 opacity-60"
        style={{ backgroundImage: 'radial-gradient(rgba(242,242,245,0.1) 1px, transparent 1.5px)', backgroundSize: '24px 24px' }}
      />
      <div className="relative flex items-center justify-between px-5 sm:px-10 h-16 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-fg-3">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-live" />
          Nexus 9 · Lounge OS v2.6
        </span>
        <span className="hidden sm:inline">Open 24/7</span>
      </div>

      <div className="relative flex-1 flex flex-col items-center justify-center px-5">
        <div className="flex font-display font-black uppercase leading-[0.82] text-[24vw] sm:text-[180px] overflow-hidden" aria-label="Nexus 9">
          {WORD.split('').map((ch, i) => (
            <span key={i} className="boot-letter inline-block" style={{ animationDelay: `${80 + i * 70}ms` }}>
              {ch}
            </span>
          ))}
          <span className="boot-letter inline-block text-accent" style={{ animationDelay: `${80 + WORD.length * 70 + 60}ms` }}>
            9
          </span>
        </div>

        <div className="relative mt-8 sm:mt-10 w-full max-w-[340px] sm:max-w-[400px]">
          <div className="grid gap-1.5" style={{ gridTemplateColumns: 'repeat(10, minmax(0, 1fr))' }} aria-hidden>
            {SEATS.map((s, i) => (
              <span key={s.n} className={`boot-tile aspect-square rounded-[3px] ${ORDER[i] < lit ? 'on' : ''} ${s.held ? 'held' : ''}`} />
            ))}
          </div>
          <div className="boot-scan" aria-hidden />
        </div>

        <div className="mt-6 h-5 text-[13px] text-fg-2 tabular-nums text-center">
          {step} <span className="text-fg-3">· {String(lit).padStart(2, '0')}/{FLOOR_TOTAL}</span>
        </div>
      </div>

      <div className="relative px-5 sm:px-10 pb-6 sm:pb-8 flex items-end justify-between gap-4">
        <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-fg-3 leading-6">
          <div>Powering stations</div>
          <div className="text-fg-2">PC 32 · Console 8 · Sim 6 · VR 4</div>
        </div>
        <span className="font-display font-black text-7xl sm:text-9xl leading-[0.8] tabular-nums">
          {String(pct).padStart(3, '0')}
          <span className="text-accent text-3xl sm:text-5xl align-top ml-1">%</span>
        </span>
      </div>
      <div className="relative h-1 bg-ink-raised">
        <div className="h-full bg-accent" style={{ width: `${pct}%`, boxShadow: '0 0 18px rgba(255,91,20,0.9)' }} />
      </div>
    </div>
  );

  return (
    <div aria-live="polite" aria-label={`Loading ${pct}%`} className="fixed inset-0 z-[100] pointer-events-auto">
      <Door side="top" opening={opening}>{Scene}</Door>
      <Door side="bottom" opening={opening}>
        <div aria-hidden className="h-full">{Scene}</div>
      </Door>
      {/* the seam: draws across at 100%, then fades as the doors part */}
      <div
        className="absolute left-0 right-0 top-1/2 h-[2px] bg-accent boot-seam"
        style={{
          transform: `translateY(-50%) scaleX(${pct >= 100 ? 1 : 0})`,
          opacity: opening ? 0 : 1,
          boxShadow: '0 0 24px rgba(255,91,20,1)',
        }}
      />
    </div>
  );
};
