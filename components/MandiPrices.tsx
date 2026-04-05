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
  const filtered = activeState === 'सभी' ? allPrices : allPrices.filter(p => p.state === activeState);

  return (
    <section id="mandi" style={{ padding: '64px 28px 72px', background: '#f9fafb' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6, flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 4, height: 28, background: '#05420d', borderRadius: 2 }} />
            <h2 style={{ fontFamily: 'var(--font-mukta), sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: '#1a1a1a' }}>आज का मंडी भाव</h2>
          </div>
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '7px 14px', borderRadius: 5, fontFamily: 'var(--font-mukta), sans-serif', fontSize: '0.75rem', fontWeight: 700, color: '#05420d', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#05420d' }} /> दैनिक
          </div>
        </div>
        <p style={{ fontFamily: 'var(--font-mukta), sans-serif', fontSize: '0.88rem', color: '#999', marginBottom: 24, paddingLeft: 16 }}>देश भर की प्रमुख मंडियों से आज के आलू भाव — दैनिक अपडेट</p>
        <div style={{ display: 'flex', gap: 5, marginBottom: 20, flexWrap: 'wrap' }}>
          {states.map(s => (
            <button key={s} onClick={() => setActiveState(s)} style={{
              background: activeState === s ? '#05420d' : '#fff',
              color: activeState === s ? '#fff' : '#666',
              border: activeState === s ? '1.5px solid #05420d' : '1.5px solid #e5e5e5',
              cursor: 'pointer', padding: '7px 18px', borderRadius: 4,
              fontFamily: 'var(--font-mukta), sans-serif', fontSize: '0.82rem', fontWeight: 600,
            }}>{s}</button>
          ))}
        </div>
        <div className="mandi-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
          {filtered.map((p, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 8, padding: '20px 22px', border: '1px solid #eee', borderLeft: '4px solid #05420d', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mukta), sans-serif', fontSize: '1.05rem', fontWeight: 800, color: '#1a1a1a' }}>{p.mandi}</div>
                  <div style={{ fontFamily: 'var(--font-mukta), sans-serif', fontSize: '0.75rem', color: '#aaa', marginTop: 2 }}>{p.state}</div>
                </div>
                <div style={{ background: p.up ? '#f0fdf4' : '#f0fdf4', color: p.up ? '#16a34a' : '#05420d', padding: '4px 10px', borderRadius: 4, fontFamily: 'var(--font-mukta), sans-serif', fontSize: '0.78rem', fontWeight: 800 }}>{p.up ? '▲' : '▼'} {p.change}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mukta), sans-serif', fontSize: '0.6rem', fontWeight: 600, color: '#bbb', marginBottom: 2 }}>मॉडल भाव</div>
                  <div style={{ fontFamily: 'var(--font-mukta), sans-serif', fontSize: '1.6rem', fontWeight: 900, color: '#05420d' }}>{p.modal}</div>
                </div>
                <div style={{ display: 'flex', gap: 14, borderLeft: '1px solid #eee', paddingLeft: 14, marginBottom: 4 }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mukta), sans-serif', fontSize: '0.58rem', color: '#bbb', marginBottom: 1 }}>न्यूनतम</div>
                    <div style={{ fontFamily: 'var(--font-mukta), sans-serif', fontSize: '0.88rem', fontWeight: 700, color: '#555' }}>{p.min}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mukta), sans-serif', fontSize: '0.58rem', color: '#bbb', marginBottom: 1 }}>अधिकतम</div>
                    <div style={{ fontFamily: 'var(--font-mukta), sans-serif', fontSize: '0.88rem', fontWeight: 700, color: '#555' }}>{p.max}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Link href="/mandi" style={{ fontFamily: 'var(--font-mukta), sans-serif', fontSize: '0.88rem', fontWeight: 700, color: '#05420d', textDecoration: 'none', borderBottom: '2px solid #05420d', paddingBottom: 3 }}>सभी मंडी भाव देखें →</Link>
        </div>
      </div>
    </section>
  );
}
