import React, { useEffect, useState } from "react";
import heroVideo from "../../assets/work.mp4";

const HeroSection: React.FC = () => {
  const [growth, setGrowth] = useState(0);

  useEffect(() => {
    const target = 47;
    const duration = 1400;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setGrowth(target);
        clearInterval(timer);
      } else {
        setGrowth(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const cards = [
    {
      label: "Avg. Revenue Growth",
      value: `+${growth}%`,
      sub: "in first 90 days",
      bg: "bg-[#FDF6E9]",
      valueClass: "bg-gradient-to-r from-orange-500 to-yellow-600 bg-clip-text text-transparent",
    },
    {
      label: "Happy Customers",
      value: "2.4K+",
      sub: "served every month",
      bg: "bg-white",
      valueClass: "text-orange-500",
    },
    {
      label: "Google Rating",
      value: "★ 4.9",
      sub: "trusted by local shops",
      bg: "bg-[#FFF8EF]",
      valueClass: "text-yellow-500",
    },
  ];

  return (
    <section className="relative w-full h-[100dvh] overflow-hidden bg-[#2B1B0E] flex flex-col">
      <style>{`
        @keyframes swing {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        .anim-swing-1 { animation: swing 3s ease-in-out infinite; animation-delay: 0s; transform-origin: top center; }
        .anim-swing-2 { animation: swing 3s ease-in-out infinite; animation-delay: 1.15s; transform-origin: top center; }
        .anim-swing-3 { animation: swing 3s ease-in-out infinite; animation-delay: 1.15s; transform-origin: top center; }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes pulseRing {
          0% { box-shadow: 0 0 0 0 rgba(249,115,22,0.55); }
          100% { box-shadow: 0 0 0 18px rgba(249,115,22,0); }
        }
        @keyframes drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(0, -16px) scale(1.05); }
        }
        @keyframes stampIn {
          0% { opacity: 0; transform: scale(1.5) rotate(-10deg); }
          100% { opacity: 1; transform: scale(1) rotate(-3deg); }
        }
        @keyframes riseIn {
          0% { opacity: 0; transform: translateY(24px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes growLine {
          0% { transform: scaleY(0); }
          100% { transform: scaleY(1); }
        }
        .anim-marquee { animation: marquee 16s linear infinite; }
        .anim-pulse-ring { animation: pulseRing 2s ease-out infinite; }
        .anim-drift { animation: drift 8s ease-in-out infinite; }
        .anim-stamp { animation: stampIn 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.2s both; }
        .anim-rise-1 { animation: riseIn 0.7s ease-out 0.35s both; }
        .anim-rise-2 { animation: riseIn 0.7s ease-out 0.5s both; }
        .anim-rise-3 { animation: riseIn 0.7s ease-out 0.65s both; }
        .anim-rise-4 { animation: riseIn 0.7s ease-out 0.8s both; }
        .anim-grow-line { animation: growLine 0.5s ease-out 0.9s both; transform-origin: top; }
      `}</style>

      {/* Background video, full bleed */}
      <video
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#2B1B0E]/90 via-[#2B1B0E]/60 to-[#2B1B0E]/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#2B1B0E]/85 via-transparent to-[#2B1B0E]/25" />

      <div className="anim-drift absolute left-[12%] top-1/2 -translate-y-1/2 w-72 h-72 bg-orange-500/20 blur-[110px] rounded-full" />
      <div className="anim-drift absolute right-[8%] top-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-400/20 blur-[110px] rounded-full" style={{ animationDelay: "2.5s" }} />

      {/* Top marquee ribbon */}
      <div className="relative z-10 w-full overflow-hidden bg-white py-1.5 shrink-0">
        <div className="anim-marquee flex whitespace-nowrap text-[#2B1B0E] font-bold text-xs md:text-sm uppercase tracking-widest">
          {Array(2).fill(0).map((_, i) => (
            <div key={i} className="flex shrink-0">
              {["More Footfall", "Repeat Customers", "Higher Sales", "Zero Tech Hassle"].map((t, j) => (
                <span key={j} className="flex items-center gap-3 mx-4">
                  {t} <span className="w-1.5 h-1.5 rounded-full bg-[#2B1B0E]" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 items-center px-6 md:px-14 py-8 overflow-hidden">

        {/* LEFT: message column */}
        <div className="max-w-2xl">
        

  <h1 className="anim-rise-1 font-[600] uppercase leading-none text-white text-4xl sm:text-5xl lg:text-6xl tracking-tight drop-shadow-lg">
  Guranteed Growth

  <span className="block mt-3 bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent">
    For Small Retailers
  </span>
</h1>

          <p className="anim-rise-2 mt-4 text-base md:text-lg text-orange-50/85 max-w-md leading-relaxed">
           Turn your local store/shop into a thriving business with smarter selling, wider reach and consistent consistent growth.
          </p>

          <div className="anim-rise-3 mt-6 flex flex-wrap items-center gap-4">
            <button className="anim-pulse-ring px-6 py-3 md:px-7 md:py-3.5 bg-gradient-to-r from-orange-500 to-yellow-600 text-[#2B1B0E] font-bold text-sm uppercase tracking-wide rounded-sm">
              See How We Help
            </button>
            <button className="px-6 py-3 md:px-7 md:py-3.5 border-2 border-white/70 text-white font-semibold text-sm uppercase tracking-wide rounded-sm hover:bg-white hover:text-[#2B1B0E] transition-colors duration-300">
              Watch Stories
            </button>
          </div>
        </div>

        {/* RIGHT: vertical stack, each card hung by two threads */}
        <div className="hidden lg:flex flex-col items-center justify-self-end h-full justify-center">
          <div className="anim-rise-4 px-4 py-1.5 bg-[#2B1B0E] border border-orange-400/40 text-white text-xs font-bold uppercase tracking-widest rounded-sm shadow-lg whitespace-nowrap mb-1">
            Open For Growth
          </div>

          <div className="anim-grow-line w-px h-6 bg-gradient-to-b from-orange-300/60 to-orange-300/40" />

          <div className="flex flex-col items-center">
            {cards.map((card, i) => (
              <div key={card.label} className="flex flex-col items-center">
                {/* Two parallel threads per card */}
                <div className="flex gap-7 h-6">
                  <span className="w-px bg-orange-300/60" />
                  <span className="w-px bg-orange-300/60" />
                </div>

                <div className={`anim-swing-${i + 1}`}>
                  <div
                    className={`${card.bg} w-48 border-2 border-[#2B1B0E] rounded-sm px-5 py-3 shadow-[5px_5px_0px_0px_rgba(0,0,0,0.35)] text-center`}
                  >
                    <p className="font-mono text-[9px] uppercase tracking-widest text-[#2B1B0E]/60 leading-tight">
                      {card.label}
                    </p>
                    <p className={`text-2xl font-[900] leading-tight mt-0.5 ${card.valueClass}`}>
                      {card.value}
                    </p>
                    <p className="text-[10px] text-[#2B1B0E]/60 mt-0.5 leading-tight">
                      {card.sub}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div className="relative z-10 shrink-0 px-6 md:px-14 pb-4 md:pb-5 flex items-center gap-3 border-t border-white/10 pt-3">
        <div className="flex -space-x-2">
          {["#F97316", "#EAB308", "#EE9725", "#FDF6E9"].map((c, i) => (
            <span
              key={i}
              className="w-7 h-7 rounded-full border-2 border-[#2B1B0E]"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
        <p className="text-xs md:text-sm font-medium text-orange-50/80">
          2,400+ shopkeepers already growing with us
        </p>
      </div>
    </section>
  );
};

export default HeroSection;