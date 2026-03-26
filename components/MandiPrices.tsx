'use client';

import { useState } from 'react';
import Link from 'next/link';

const states = ['सभी', 'उत्तर प्रदेश', 'पंजाब', 'गुजरात', 'बिहार', 'पश्चिम बंगाल', 'मध्य प्रदेश'];

const allPrices = [
  { mandi: 'आगरा', state: 'उत्तर प्रदेश', min: '₹1,180', max: '₹1,420', modal: '₹1,340', change: '+3.2%', up: true },
  { mandi: 'लखनऊ', state: 'उत्तर प्रदेश', min: '₹1,200', max: '₹1,480', modal: '₹1,380', change: '+2.1%', up: true },
  { mandi: 'कोलकाता', state: 'पश्चिम बंगाल', min: '₹1,350', max: '₹1,550', modal: '₹1,460', change: '+5.1%', up: true },
  { mandi: 'डीसा', state: 'गुजरात', min: '₹980', max: '₹1,180', modal: '₹1,080', change: '-1.5%', up: false },
  { mandi: 'जालंधर', state: 'पंजाब', min: '₹1,150', max: '₹1,350', modal: '₹1,260', change: '-2.4%', up: false },
  { mandi: 'पटना', state: 'बिहार', min: '₹1,280', max: '₹1,490', modal: '₹1,400', change: '+4.3%', up: true },
  { mandi: 'इंदौर', state: 'मध्य प्रदेश', min: '₹1,080', max: '₹1,280', modal: '₹1,200', change: '-0.8%', up: false },
  { mandi: 'कानपुर', state: 'उत्तर प्रदेश', min: '₹1,220', max: '₹1,460', modal: '₹1,360', change: '+1.7%', up: true },
];

export default function MandiPrices() {
  const [activeState, setActiveState] = useState('सभी');
  const filtered = activeState === 'सभी' ? allPrices : allPrices.filter((p) => p.state === activeState);

  return (
    <section id="mandi" className="py-20 px-6 bg-orange-50">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-3 flex-wrap gap-4">
          <div>
            <div className="font-mono text-[0.72rem] font-bold text-orange-600 tracking-[0.15em] uppercase mb-2">
              LIVE PRICES
            </div>
            <h2 className="font-display text-[clamp(1.8rem,4vw,2.5rem)] font-bold text-stone-900 mb-1.5">
              आज का मंडी भाव
            </h2>
            <p className="font-body text-[0.92rem] text-stone-500">
              प्रमुख मंडियों से आलू के ताज़ा थोक भाव — प्रतिदिन अपडेट
            </p>
          </div>
          <div className="bg-red-50 border border-red-200 px-4 py-2.5 rounded-[10px] font-body text-[0.82rem] font-semibold text-red-600 flex items-center gap-1.5">
            <span className="text-sm">📅</span> आज का अपडेट
          </div>
        </div>

        {/* State Filters */}
        <div className="flex gap-1.5 mt-6 mb-7 flex-wrap">
          {states.map((s) => (
            <button
              key={s}
              onClick={() => setActiveState(s)}
              className={`px-[18px] py-2 rounded-full font-body text-[0.82rem] font-semibold transition-all cursor-pointer border ${
                activeState === s
                  ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white border-transparent shadow-[0_2px_8px_rgba(220,38,38,0.25)]'
                  : 'bg-white text-stone-600 border-stone-300 hover:border-red-300'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Price Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
          {filtered.map((p, i) => (
            <div
              key={i}
              className="bg-white rounded-[14px] p-[22px_24px] border border-orange-200 cursor-pointer hover:shadow-[0_4px_20px_rgba(220,38,38,0.08)] hover:border-red-300 transition-all relative overflow-hidden"
            >
              {/* Change badge */}
              <div
                className={`absolute top-0 right-0 px-3.5 py-1.5 rounded-[0_14px_0_10px] font-mono text-[0.82rem] font-extrabold ${
                  p.up ? 'bg-green-100 text-green-800' : 'bg-red-50 text-red-800'
                }`}
              >
                {p.up ? '▲' : '▼'} {p.change}
              </div>

              <div className="font-display text-[1.2rem] font-bold text-stone-900 mb-1">
                {p.mandi}
              </div>
              <div className="font-body text-[0.78rem] text-stone-400 mb-[18px]">{p.state}</div>

              <div className="flex gap-5 items-end">
                <div>
                  <div className="font-body text-[0.65rem] font-semibold text-stone-400 uppercase tracking-wider mb-0.5">
                    मॉडल भाव
                  </div>
                  <div className="font-mono text-[1.5rem] font-extrabold text-red-600">
                    {p.modal}
                  </div>
                </div>
                <div className="flex gap-4 border-l border-orange-200 pl-4 ml-1">
                  <div>
                    <div className="font-body text-[0.62rem] font-semibold text-stone-400 mb-0.5">
                      न्यूनतम
                    </div>
                    <div className="font-mono text-[0.92rem] font-bold text-stone-600">{p.min}</div>
                  </div>
                  <div>
                    <div className="font-body text-[0.62rem] font-semibold text-stone-400 mb-0.5">
                      अधिकतम
                    </div>
                    <div className="font-mono text-[0.92rem] font-bold text-stone-600">{p.max}</div>
                  </div>
                </div>
              </div>

              <div className="mt-3.5 pt-3 border-t border-orange-50 font-body text-[0.72rem] text-stone-400">
                भाव प्रति क्विंटल
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-7">
          <Link
            href="/mandi"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-500 text-white px-7 py-3 rounded-[10px] font-body text-[0.92rem] font-bold shadow-[0_3px_12px_rgba(220,38,38,0.25)] hover:shadow-[0_4px_20px_rgba(220,38,38,0.3)] transition-all no-underline"
          >
            सभी मंडी भाव देखें →
          </Link>
        </div>
      </div>
    </section>
  );
}
