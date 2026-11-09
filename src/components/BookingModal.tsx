import React, { useState, useEffect } from 'react';
import { X, Monitor, Gamepad2, Car, Glasses, QrCode, Printer, Plus, Minus } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';
import { PRICING_PLANS, FUEL_MENU } from '../data/gamingData';
import type { PricingPlan, GamingRig } from '../data/gamingData';
import { rs } from '../data/money';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedRig?: GamingRig | null;
  preselectedPlan?: PricingPlan | null;
  preselectedCategory?: string;
}

const STATIONS = [
  { id: 'pc-ultra', label: 'PC', sub: 'RTX 4090 / 5090', icon: Monitor },
  { id: 'console', label: 'Console', sub: 'PS5 Pro, 4K OLED', icon: Gamepad2 },
  { id: 'racing-sim', label: 'Sim cockpit', sub: 'Motion, direct drive', icon: Car },
  { id: 'vr-suite', label: 'VR', sub: 'Room-scale', icon: Glasses },
];

const DATES: Record<string, string> = {
  today: 'Today',
  tomorrow: 'Tomorrow',
  'this-weekend': 'This weekend',
  'gta6-launch': 'GTA VI launch night',
};

const TIMES: Record<string, string> = {
  '12:00': '12:00 PM',
  '15:00': '3:00 PM',
  '18:00': '6:00 PM',
  '21:00': '9:00 PM',
  '22:00': '10:00 PM',
};

const Label: React.FC<{ n: number; children: React.ReactNode }> = ({ n, children }) => (
  <div className="flex items-baseline gap-3 mb-3">
    <span className="font-mono text-xs text-fg-3 tabular-nums">{String(n).padStart(2, '0')}</span>
    <span className="text-sm text-fg">{children}</span>
  </div>
);

const optionCls = (on: boolean) =>
  `rounded-lg border text-left transition-colors duration-150 ease-out ${
    on ? 'bg-ink-raised border-fg/30' : 'bg-ink-card border-line hover:border-fg/15'
  }`;

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedRig,
  preselectedPlan,
  preselectedCategory,
}) => {
  const [planId, setPlanId] = useState<string>(preselectedPlan?.id || 'pro-slayer');
  const [station, setStation] = useState<string>('pc-ultra');
  const [date, setDate] = useState<string>('today');
  const [time, setTime] = useState<string>('18:00');
  const [gamerTag, setGamerTag] = useState('');
  const [contact, setContact] = useState('');
  const [snacks, setSnacks] = useState<Record<string, number>>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [ref, setRef] = useState('');

  useEffect(() => {
    if (preselectedPlan) setPlanId(preselectedPlan.id);
  }, [preselectedPlan]);

  useEffect(() => {
    if (preselectedRig) setStation(preselectedRig.category);
  }, [preselectedRig]);

  useEffect(() => {
    if (preselectedCategory === 'gta6-vip') {
      setPlanId('gta6-vip');
      setDate('gta6-launch');
    }
  }, [preselectedCategory]);

  if (!isOpen) return null;

  const plan = PRICING_PLANS.find((p) => p.id === planId) || PRICING_PLANS[1];
  const snacksTotal = Object.entries(snacks).reduce((sum, [id, qty]) => {
    const item = FUEL_MENU.find((f) => f.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);
  const total = plan.price + snacksTotal;
  const stationLabel = STATIONS.find((s) => s.id === station)?.label ?? 'PC';
  const seat = preselectedRig?.id ?? 'RIG-03';

  const setQty = (id: string, delta: number) => {
    sound.playClick();
    setSnacks((prev) => {
      const next = Math.max(0, (prev[id] || 0) + delta);
      const copy = { ...prev };
      if (next === 0) delete copy[id];
      else copy[id] = next;
      return copy;
    });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playSuccess();
    setRef(`NX9-${Math.random().toString(36).substring(2, 7).toUpperCase()}`);
    setIsSuccess(true);
    try {
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 }, colors: ['#ff6b3d', '#eef0f5', '#a3a9b8'] });
    } catch {
      // ignore
    }
  };

  const close = () => {
    sound.playClick();
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80" onClick={close}>
      <div
        role="dialog"
        aria-label={isSuccess ? 'Booking confirmed' : 'Book a rig'}
        className="relative w-full max-w-2xl rounded-2xl bg-ink-bg border border-line my-8 animate-rise"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-14 px-6 flex items-center justify-between border-b border-line">
          <span className="text-[15px] text-fg">{isSuccess ? 'You are booked' : 'Book a rig'}</span>
          <button onClick={close} aria-label="Close" className="w-8 h-8 rounded-md flex items-center justify-center text-fg-3 hover:text-fg hover:bg-ink-raised">
            <X className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>

        <div className="p-6 sm:p-8 max-h-[78vh] overflow-y-auto">
          {isSuccess ? (
            <div>
              {/* The ticket */}
              <div className="relative rounded-2xl bg-fg text-ink-deep overflow-hidden">
                <div className="p-6 flex items-start justify-between gap-4">
                  <div>
                    <div className="font-mono text-xs text-ink-deep/60">Nexus 9 · {plan.name}</div>
                    <div className="mt-2 text-[32px] leading-none font-medium tracking-[-0.02em]">{seat}</div>
                    <div className="mt-2 text-sm text-ink-deep/70">{stationLabel}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xs text-ink-deep/60">Ref</div>
                    <div className="font-mono text-sm mt-1">{ref}</div>
                  </div>
                </div>

                {/* perforation */}
                <div className="relative h-0 border-t border-dashed border-ink-deep/25 mx-6">
                  <span className="absolute -left-9 -top-3 w-6 h-6 rounded-full bg-ink-bg" />
                  <span className="absolute -right-9 -top-3 w-6 h-6 rounded-full bg-ink-bg" />
                </div>

                <div className="p-6 grid grid-cols-[1fr_auto] gap-6 items-end">
                  <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
                    <div>
                      <dt className="text-xs text-ink-deep/60">Player</dt>
                      <dd className="mt-1 font-medium">{gamerTag || 'Player 1'}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-ink-deep/60">When</dt>
                      <dd className="mt-1 font-medium">{DATES[date]}, {TIMES[time]}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-ink-deep/60">Length</dt>
                      <dd className="mt-1 font-medium">{plan.duration}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-ink-deep/60">Paid</dt>
                      <dd className="mt-1 font-medium tabular-nums">{rs(total)}</dd>
                    </div>
                  </dl>
                  <QrCode className="w-16 h-16" strokeWidth={1.25} />
                </div>
              </div>

              <p className="mt-4 text-sm text-fg-3">Show the code at the door and your station unlocks.</p>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => {
                    sound.playClick();
                    window.print();
                  }}
                  className="btn btn-secondary flex-1"
                >
                  <Printer className="w-4 h-4" strokeWidth={1.5} />
                  Print ticket
                </button>
                <button onClick={close} className="btn btn-light flex-1">
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-8">
              <div>
                <Label n={1}>Pass</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {PRICING_PLANS.map((p) => (
                    <button
                      type="button"
                      key={p.id}
                      onClick={() => {
                        if (p.isGtaSpecial) sound.playGtaPowerup();
                        else sound.playClick();
                        setPlanId(p.id);
                      }}
                      className={`${optionCls(planId === p.id)} p-3`}
                    >
                      <div className="text-sm text-fg truncate">{p.name}</div>
                      <div className="text-xs text-fg-3 truncate mt-0.5">{p.duration}</div>
                      <div className="font-mono text-sm text-fg mt-2 tabular-nums">{rs(p.price)}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label n={2}>Station</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {STATIONS.map((st) => {
                    const Icon = st.icon;
                    const on = station === st.id;
                    return (
                      <button
                        type="button"
                        key={st.id}
                        onClick={() => {
                          sound.playClick();
                          setStation(st.id);
                        }}
                        className={`${optionCls(on)} p-3`}
                      >
                        <Icon className={`w-4 h-4 ${on ? 'text-fg' : 'text-fg-3'}`} strokeWidth={1.5} />
                        <div className="text-sm text-fg mt-3">{st.label}</div>
                        <div className="text-xs text-fg-3 mt-0.5">{st.sub}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label n={3}>Day</Label>
                  <select value={date} onChange={(e) => setDate(e.target.value)} className="field">
                    {Object.entries(DATES).map(([v, l]) => (
                      <option key={v} value={v}>{l}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label n={4}>Start time</Label>
                  <select value={time} onChange={(e) => setTime(e.target.value)} className="field">
                    {Object.entries(TIMES).map(([v, l]) => (
                      <option key={v} value={v}>{l}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <Label n={5}>Food to your desk <span className="text-fg-3">· optional</span></Label>
                <div className="rounded-lg border border-line divide-y divide-line">
                  {FUEL_MENU.slice(0, 3).map((item) => {
                    const qty = snacks[item.id] || 0;
                    return (
                      <div key={item.id} className="flex items-center justify-between px-3 h-14">
                        <div className="min-w-0">
                          <div className="text-sm text-fg truncate">{item.name}</div>
                          <div className="font-mono text-xs text-fg-3 tabular-nums">{rs(item.price)}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            aria-label={`Remove ${item.name}`}
                            onClick={() => setQty(item.id, -1)}
                            className="w-8 h-8 rounded-md bg-ink-raised border border-line text-fg-2 flex items-center justify-center hover:text-fg"
                          >
                            <Minus className="w-3.5 h-3.5" strokeWidth={1.5} />
                          </button>
                          <span className="w-5 text-center font-mono text-sm text-fg tabular-nums">{qty}</span>
                          <button
                            type="button"
                            aria-label={`Add ${item.name}`}
                            onClick={() => setQty(item.id, 1)}
                            className="w-8 h-8 rounded-md bg-ink-raised border border-line text-fg-2 flex items-center justify-center hover:text-fg"
                          >
                            <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label n={6}>Gamer tag</Label>
                  <input type="text" required placeholder="CyberViper99" value={gamerTag} onChange={(e) => setGamerTag(e.target.value)} className="field" />
                </div>
                <div>
                  <Label n={7}>Phone or Discord</Label>
                  <input type="text" required placeholder="+1 555 0192 or viper" value={contact} onChange={(e) => setContact(e.target.value)} className="field" />
                </div>
              </div>

              <div className="pt-6 border-t border-line flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-fg-3">Total</div>
                  <div className="text-2xl font-medium tabular-nums text-fg mt-1">{rs(total)}</div>
                </div>
                <button type="submit" onMouseEnter={() => sound.playHover()} className="btn btn-lg btn-primary">
                  Confirm booking
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
