import Link from 'next/link';

const stats = [
  { value: '60.18M', label: 'टन उत्पादन', sub: '2024-25 सीज़न' },
  { value: '₹527Cr', label: 'फ्लेक्स निर्यात', sub: 'FY2025' },
  { value: '28+', label: 'राज्य कवर', sub: 'संपूर्ण भारत' },
  { value: '15K+', label: 'पाठक', sub: 'साप्ताहिक अपडेट' },
];

export default function Hero() {
  return (
    <section
      className="relative min-h-[92vh] flex items-center overflow-hidden"
      style={{
        background:
          'linear-gradient(165deg, #7f1d1d 0%, #b91c1c 25%, #dc2626 50%, #ea580c 80%, #f97316 100%)',
      }}
    >
      {/* Decorative circles */}
      <div className="absolute -top-[200px] -right-[200px] w-[600px] h-[600px] rounded-full border border-white/[0.08]">
        <div className="absolute inset-[60px] rounded-full border border-white/[0.06]" />
        <div className="absolute inset-[120px] rounded-full border border-white/[0.04]" />
        <div
          className="absolute inset-[180px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(251,191,36,0.1) 0%, transparent 70%)',
          }}
        />
      </div>
      <div
        className="absolute -bottom-[120px] -left-[120px] w-[450px] h-[450px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)',
        }}
      />
      {/* Geometric pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L40 20L20 40L0 20z' fill='none' stroke='%23ffffff' stroke-width='0.5'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-[1280px] mx-auto px-6 pt-[120px] pb-20 relative z-10 w-full">
        <div className="max-w-[750px]">
          {/* Live badge */}
          <div className="inline-flex items-center gap-2 bg-white/[0.12] backdrop-blur-lg rounded-full py-1.5 px-[18px] pl-2 mb-7 border border-white/[0.18]">
            <span className="bg-white text-red-600 text-[0.6rem] font-mono font-extrabold px-2.5 py-0.5 rounded-full tracking-wider">
              LIVE
            </span>
            <span className="text-white/95 text-[0.85rem] font-body">
              आज का आलू मंडी भाव अपडेट
            </span>
          </div>

          <h1 className="font-display text-[clamp(2.4rem,6vw,4rem)] font-bold text-white leading-[1.2] mb-6">
            भारत का <span className="text-orange-200">प्रमुख आलू</span>
            <br />
            उद्योग मंच
          </h1>

          <p className="font-body text-[1.15rem] leading-[1.85] text-white/80 max-w-[580px] mb-9">
            रोज़ाना मंडी भाव, सरकारी योजनाएँ, खेती तकनीक, किस्मों की जानकारी और उद्योग
            डायरेक्टरी — किसानों, व्यापारियों और प्रसंस्करण उद्योग के लिए।
          </p>

          <div className="flex gap-3.5 flex-wrap">
            <Link
              href="/mandi"
              className="inline-flex items-center gap-2 bg-white text-red-600 px-8 py-3.5 rounded-[10px] font-body text-base font-bold shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_28px_rgba(0,0,0,0.2)] transition-all no-underline"
            >
              📊 आज का मंडी भाव देखें
            </Link>
            <Link
              href="/sampark"
              className="inline-flex items-center gap-2 bg-white/[0.14] text-white border-[1.5px] border-white/30 px-8 py-3.5 rounded-[10px] font-body text-base font-bold backdrop-blur-lg hover:bg-white/20 transition-all no-underline"
            >
              💬 WhatsApp पर जुड़ें
            </Link>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px mt-[72px] bg-white/10 rounded-2xl overflow-hidden border border-white/[0.12] backdrop-blur-xl">
          {stats.map((s, i) => (
            <div
              key={i}
              className="py-[26px] px-[22px] bg-white/[0.05]"
              style={{
                borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
              }}
            >
              <div className="font-mono text-[1.7rem] font-extrabold text-orange-200 mb-1">
                {s.value}
              </div>
              <div className="font-body text-[0.88rem] font-semibold text-white/90 mb-0.5">
                {s.label}
              </div>
              <div className="font-body text-[0.72rem] text-white/50">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
