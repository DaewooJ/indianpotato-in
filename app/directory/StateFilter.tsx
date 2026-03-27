'use client';

import { useState } from 'react';

export default function StateFilter({ states, counts }: { states: string[]; counts: Record<string, number> }) {
  const [selected, setSelected] = useState('all');

  const handleClick = (state: string) => {
    setSelected(state);
    // Show/hide listing cards based on data-state attribute
    const cards = document.querySelectorAll('[data-state]');
    cards.forEach((card) => {
      const el = card as HTMLElement;
      if (state === 'all' || el.dataset.state === state) {
        el.style.display = '';
      } else {
        el.style.display = 'none';
      }
    });
  };

  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div className="bg-white border-b border-stone-200 py-3 px-4 md:px-6 sticky top-[76px] z-30">
      <div className="max-w-[1280px] mx-auto flex gap-2 items-center overflow-x-auto scrollbar-hide">
        <span className="font-body text-[0.72rem] text-stone-400 font-semibold shrink-0 mr-1">राज्य:</span>
        <button
          onClick={() => handleClick('all')}
          className={'shrink-0 px-3 py-1.5 text-[0.72rem] font-body font-semibold rounded-full cursor-pointer transition-colors border ' +
            (selected === 'all' ? 'bg-red-600 text-white border-red-600' : 'bg-stone-100 text-stone-600 border-stone-200 hover:bg-red-50 hover:text-red-700 hover:border-red-200')}
        >
          सभी ({total})
        </button>
        {states.map((state) => (
          <button
            key={state}
            onClick={() => handleClick(state)}
            className={'shrink-0 px-3 py-1.5 text-[0.72rem] font-body font-medium rounded-full cursor-pointer transition-colors border whitespace-nowrap ' +
              (selected === state ? 'bg-red-600 text-white border-red-600' : 'bg-stone-100 text-stone-600 border-stone-200 hover:bg-red-50 hover:text-red-700 hover:border-red-200')}
          >
            {state} ({counts[state] || 0})
          </button>
        ))}
      </div>
    </div>
  );
}
