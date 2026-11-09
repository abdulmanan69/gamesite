import React, { useEffect, useRef, useState } from 'react';
import { Search, ArrowLeft, ArrowRight } from 'lucide-react';
import { GAMES_CATALOG } from '../data/gamingData';
import type { Game } from '../data/gamingData';
import { sound } from '../utils/audio';
import { SectionHeader } from './SectionHeader';

interface GameCatalogProps {
  onSelectGame: (game: Game) => void;
  onOpenGta: () => void;
}

const GENRES = ['All', 'Open World', 'Esports FPS', 'Racing', 'Fighting', 'RPG', 'VR', 'Sports'];
const genreLabel = (g: string) => (g === 'Open World' ? 'Open world' : g === 'Esports FPS' ? 'Esports' : g);

export const GameCatalog: React.FC<GameCatalogProps> = ({ onSelectGame, onOpenGta }) => {
  const [q, setQ] = useState('');
  const [genre, setGenre] = useState('All');
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, x: 0, left: 0, moved: false });

  const query = q.toLowerCase();
  const games = GAMES_CATALOG.filter((g) => {
    const hit =
      g.title.toLowerCase().includes(query) ||
      g.genre.toLowerCase().includes(query) ||
      g.description.toLowerCase().includes(query);
    return hit && (genre === 'All' || g.genre === genre);
  });

  // track scroll → progress bar + active index
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 1);
      const card = el.firstElementChild as HTMLElement | null;
      if (card) setActive(Math.round(el.scrollLeft / (card.offsetWidth + 16)));
    };
    onScroll();
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [games.length]);

  // reset to start whenever the filter changes
  useEffect(() => {
    track.current?.scrollTo({ left: 0 });
  }, [q, genre]);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    sound.playClick();
    el.scrollBy({ left: dir * (card.offsetWidth + 16), behavior: 'smooth' });
  };

  // mouse drag to scroll (touch already scrolls natively)
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !track.current) return;
    drag.current = { down: true, x: e.clientX, left: track.current.scrollLeft, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.down || !track.current) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 4) {
      d.moved = true;
      track.current.style.scrollSnapType = 'none';
    }
    track.current.scrollLeft = d.left - dx;
  };
  const endDrag = () => {
    if (!drag.current.down || !track.current) return;
    drag.current.down = false;
    track.current.style.scrollSnapType = '';
  };

  const pick = (game: Game) => {
    if (drag.current.moved) return; // a drag is not a click
    if (game.id === 'gta-6') {
      sound.playGtaPowerup();
      onOpenGta();
    } else {
      sound.playSuccess();
      onSelectGame(game);
    }
  };

  return (
    <section id="games-section" className="py-24 sm:py-32 border-t border-line bg-ink-deep/70 scroll-mt-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHeader
          eyebrow="Library · 500+ titles"
          title="Installed, patched, ready"
          lede="Every game is already downloaded with max presets and cloud saves. Sit down and press play."
          aside={
            <label className="relative w-full lg:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-fg-3" strokeWidth={1.5} />
              <input type="text" placeholder="Search games" value={q} onChange={(e) => setQ(e.target.value)} className="field pl-9" />
            </label>
          }
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex gap-1 p-1 rounded-lg bg-ink-card border border-line max-w-full overflow-x-auto no-scrollbar">
            {GENRES.map((g) => (
              <button
                key={g}
                onClick={() => {
                  sound.playClick();
                  setGenre(g);
                }}
                className={`tab ${genre === g ? 'tab-active' : ''}`}
              >
                {genreLabel(g)}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-4">
            <span className="font-display font-extrabold text-2xl tabular-nums text-fg">
              {String(Math.min(active + 1, games.length || 1)).padStart(2, '0')}
              <span className="text-fg-3"> / {String(games.length).padStart(2, '0')}</span>
            </span>
            <button onClick={() => step(-1)} aria-label="Previous games" className="btn btn-secondary w-12 px-0">
              <ArrowLeft className="w-4 h-4" strokeWidth={2} />
            </button>
            <button onClick={() => step(1)} aria-label="Next games" className="btn btn-primary w-12 px-0">
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      {/* The slider runs to the right edge of the screen so the next card peeks in */}
      <div
        ref={track}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none
          pl-4 sm:pl-8 xl:pl-[calc((100vw-80rem)/2+2rem)] pr-4 sm:pr-8"
      >
        {games.map((game, i) => {
          const isGta = game.id === 'gta-6';
          return (
            <article
              key={game.id}
              onClick={() => pick(game)}
              className={`group relative shrink-0 snap-start w-[78%] sm:w-[44%] lg:w-[30%] xl:w-[340px] aspect-[3/4] rounded-xl overflow-hidden border cursor-pointer
                transition-[border-color,transform] duration-300 ease-out hover:-translate-y-1 ${isGta ? 'border-accent/70' : 'border-line hover:border-accent/50'}`}
            >
              <img
                src={game.image}
                alt={game.title}
                loading="lazy"
                draggable={false}
                onError={(e) => {
                  e.currentTarget.style.visibility = 'hidden';
                }}
                className="absolute inset-0 w-full h-full object-cover bg-ink-raised transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              {/* index + rating */}
              <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                <span className="font-display font-black text-5xl leading-none text-white/25 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                <span className="h-7 px-2 rounded-md bg-black/60 backdrop-blur text-xs font-semibold text-white tabular-nums flex items-center">
                  {game.rating.toFixed(1)}
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${isGta ? 'text-accent' : 'text-ok'}`}>{game.badge}</span>
                <h3 className="mt-2 font-display font-black uppercase text-[32px] leading-[0.95] text-white">{game.title}</h3>
                <p className="mt-2 text-[13px] text-white/70 line-clamp-2">{game.description}</p>
                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-white/60">
                  <span>{game.fps}</span>
                  <span>{game.resolution}</span>
                  <span>{genreLabel(game.genre)}</span>
                </div>
                <div className="mt-4 h-0 overflow-hidden opacity-0 group-hover:h-10 group-hover:opacity-100 transition-[height,opacity] duration-300 ease-out max-sm:h-10 max-sm:opacity-100">
                  <span className={`btn ${isGta ? 'btn-primary' : 'btn-light'} w-full`}>{isGta ? 'See launch night' : 'Play on a rig'}</span>
                </div>
              </div>
            </article>
          );
        })}
        {/* spacer so the last card can snap fully into view */}
        <div className="shrink-0 w-px" aria-hidden />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-8">
        <div className="h-[3px] bg-ink-raised rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-[width] duration-150 ease-out"
            style={{ width: `${Math.max(8, progress * 100)}%`, boxShadow: '0 0 12px rgba(255,91,20,0.7)' }}
          />
        </div>
        <div className="sm:hidden mt-4 flex justify-end gap-2">
          <button onClick={() => step(-1)} aria-label="Previous games" className="btn btn-secondary w-12 px-0">
            <ArrowLeft className="w-4 h-4" strokeWidth={2} />
          </button>
          <button onClick={() => step(1)} aria-label="Next games" className="btn btn-primary w-12 px-0">
            <ArrowRight className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>
      </div>

      {games.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-fg-2">Nothing matches “{q}”</p>
          <button
            onClick={() => {
              setQ('');
              setGenre('All');
            }}
            className="mt-3 text-sm text-fg underline underline-offset-4 decoration-fg-3"
          >
            Clear search
          </button>
        </div>
      )}
    </section>
  );
};
