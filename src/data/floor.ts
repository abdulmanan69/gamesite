// The lounge floor: 50 stations in four zones. Drives the hero floor map and the
// live count in the navbar, so both always agree.

export type ZoneId = 'pc' | 'console' | 'sim' | 'vr';

export interface Seat {
  n: number;
  zone: ZoneId;
  busy: boolean;
  held?: boolean; // held for GTA VI launch night
}

export const ZONES: { id: ZoneId; label: string; count: number }[] = [
  { id: 'pc', label: 'PC', count: 32 },
  { id: 'console', label: 'Console', count: 8 },
  { id: 'sim', label: 'Sim', count: 6 },
  { id: 'vr', label: 'VR', count: 4 },
];

// Free stations right now. Everything else is in a match.
const FREE = new Set([1, 3, 12, 19, 33, 41, 47, 50]);
const HELD = new Set([3]);

let n = 0;
export const SEATS: Seat[] = ZONES.flatMap((z) =>
  Array.from({ length: z.count }, () => {
    n += 1;
    return { n, zone: z.id, busy: !FREE.has(n), held: HELD.has(n) };
  }),
);

export const FLOOR_TOTAL = SEATS.length;
export const FLOOR_IN_USE = SEATS.filter((s) => s.busy).length;
