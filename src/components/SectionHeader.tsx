import React from 'react';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  lede?: string;
  aside?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ eyebrow, title, lede, aside }) => (
  <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
    <div className="max-w-2xl">
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      {lede && <p className="mt-4 text-base sm:text-lg leading-[1.55] text-fg-2">{lede}</p>}
    </div>
    {aside}
  </div>
);
