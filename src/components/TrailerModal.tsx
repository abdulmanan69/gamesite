import React from 'react';
import { X } from 'lucide-react';
import { sound } from '../utils/audio';

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookLaunch: () => void;
}

export const TrailerModal: React.FC<TrailerModalProps> = ({ isOpen, onClose, onBookLaunch }) => {
  if (!isOpen) return null;

  const close = () => {
    sound.playClick();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80" onClick={close}>
      <div
        role="dialog"
        aria-label="GTA VI trailer"
        className="w-full max-w-4xl rounded-2xl bg-ink-card border border-line overflow-hidden animate-rise"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-14 px-5 flex items-center justify-between border-b border-line">
          <span className="text-sm text-fg">Grand Theft Auto VI · trailer</span>
          <button onClick={close} aria-label="Close" className="w-8 h-8 rounded-md flex items-center justify-center text-fg-3 hover:text-fg hover:bg-ink-raised">
            <X className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>

        <div className="aspect-video bg-black">
          <iframe
            src="https://www.youtube.com/embed/QdBZY2fkU-0?autoplay=1&rel=0&modestbranding=1"
            title="Grand Theft Auto VI trailer"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-line">
          <div>
            <div className="text-[15px] text-fg">Play it at midnight on launch day</div>
            <div className="text-sm text-fg-3 mt-1">100 stations held for the launch, Rs 4,000 for four hours</div>
          </div>
          <button
            onClick={() => {
              sound.playGtaPowerup();
              onClose();
              onBookLaunch();
            }}
            className="btn btn-primary"
          >
            Get a pass
          </button>
        </div>
      </div>
    </div>
  );
};
