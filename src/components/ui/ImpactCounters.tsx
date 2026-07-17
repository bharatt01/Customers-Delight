import React, { useEffect, useRef, useState } from "react";

interface CounterData {
  label: string;
  value: number;
  suffix: string;
}

interface NumberSpeaksLouderProps {
  imageSrc: string;
  imageAlt: string;
}

const counters: CounterData[] = [
  { label: "Strategic Cities", value: 50, suffix: "+" },
  { label: "Elite Clients", value: 250, suffix: "+" },
  { label: "Consumers Reached", value: 12000, suffix: "+" },
  { label: "Years of Mastery", value: 10, suffix: "+" },
];

const useCountUp = (target: number, duration: number = 2200): number => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = timestamp - startTimestamp;
      const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
      const easedProgress = easeOutExpo(Math.min(progress / duration, 1));

      setCount(Math.floor(easedProgress * target));

      if (progress < duration) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [target, duration]);

  return count;
};

const CounterItem: React.FC<CounterData> = ({ label, value, suffix }) => {
  const count = useCountUp(value);

  return (
    <div className="relative border-t border-amber-200 pt-6 pb-8 group transition-all duration-700">
      {/* Animated Amber line on hover */}
      <div className="absolute top-0 left-0 w-0 h-[2px] bg-amber-600 transition-all duration-700 group-hover:w-full" />

      <div className="flex items-baseline space-x-1">
        <span className="text-6xl font-extrabold tracking-tight text-[#1A1A1A] leading-none">
          {count.toLocaleString()}
        </span>
        <span className="text-xl font-extrabold text-amber-600">{suffix}</span>
      </div>
      <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-amber-700 font-bold">
        {label}
      </p>
    </div>
  );
};

const NumberSpeaksLouder: React.FC<NumberSpeaksLouderProps> = ({ imageSrc, imageAlt }) => {
  return (
    <section className="bg-[#FFFDFB] py-32 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Section: Heading */}
        <div className="grid lg:grid-cols-2 gap-12 mb-24 border-b border-amber-100 pb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05] text-[#1A1A1A]">
              Numbers that <br />
              <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
                Speak of Us
              </span>
            </h2>
          </div>
          <div className="flex flex-col justify-end">
            <p className="text-amber-900/70 text-xl leading-relaxed max-w-md border-l-2 border-amber-500 pl-8">
              Quantifiable excellence. We measure our success through the growth and trust of our partners across the nation.
            </p>
          </div>
        </div>

        {/* Bottom Section: Grid */}
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Counters Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-x-12">
            {counters.map((c, idx) => (
              <CounterItem key={idx} {...c} />
            ))}
          </div>

          {/* Large Image - Warm Visuals */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] overflow-hidden bg-amber-50">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-full object-cover sepia-[0.3] brightness-95 transition-transform duration-[2000ms] ease-out hover:scale-110"
                loading="lazy"
              />
              {/* Corner Frame Accents in Amber */}
              <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-amber-500/40" />
              <div className="absolute bottom-4 left-4 w-12 h-12 border-b border-l border-amber-500/40" />

              {/* Subtle Amber Glow Overlay */}
              <div className="absolute inset-0 bg-amber-900/5 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NumberSpeaksLouder;