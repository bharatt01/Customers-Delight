import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Users, Globe, Clock } from "lucide-react";

interface CounterData {
  label: string;
  value: number;
  suffix: string;
  icon: React.ElementType;
}

interface NumberSpeaksLouderProps {
  imageSrc: string;
  imageAlt: string;
}

const counters: CounterData[] = [
  { label: "Strategic Cities", value: 50, suffix: "+", icon: MapPin },
  { label: "Elite Clients", value: 250, suffix: "+", icon: Users },
  { label: "Consumers Reached", value: 12000, suffix: "+", icon: Globe },
  { label: "Years of Mastery", value: 10, suffix: "+", icon: Clock },
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

const CounterCell: React.FC<CounterData & { isLast: boolean }> = ({
  label,
  value,
  suffix,
  icon: Icon,
  isLast,
}) => {
  const count = useCountUp(value);
  const formatted = value >= 1000 ? `${Math.floor(count / 1000)}K` : count.toLocaleString();

  return (
    <div
      className={`flex items-center gap-3 px-6 py-6 border-[#1A1A1A]/10 ${
        isLast ? "" : "border-r"
      }`}
    >
      <Icon className="w-5 h-5 text-[#ee9725] shrink-0" strokeWidth={1.75} />
      <div>
        <div className="flex items-baseline gap-0.5">
          <span className="text-2xl md:text-[26px] font-bold tracking-tight text-[#1A1A1A]">
            {formatted}
          </span>
          <span className="text-lg font-bold text-[#ee9725]">{suffix}</span>
        </div>
        <p className="text-[10px] uppercase tracking-[0.15em] text-[#1A1A1A]/45 font-semibold mt-0.5">
          {label}
        </p>
      </div>
    </div>
  );
};

const NumberSpeaksLouder: React.FC<NumberSpeaksLouderProps> = ({ imageSrc, imageAlt }) => {
  return (
    <section className="bg-[#FAF8F5] py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header — tightened */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1A1A1A] leading-[1.1] mb-3"
          >
            Numbers That <span className="text-[#ee9725]">Speak of Us</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[#1A1A1A]/50 text-base max-w-lg mx-auto leading-relaxed"
          >
            We measure our success through the growth and trust of the shopkeepers we work with.
          </motion.p>
        </div>

        {/* Fused card: image + stat strip as one object, no dead gap */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-md border-2 border-[#1A1A1A] overflow-hidden shadow-[8px_8px_0px_0px_rgba(26,26,26,0.08)]"
        >
          {/* Image */}
          <div className="relative aspect-[21/9]">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover sepia-[0.15] brightness-95"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/55 via-transparent to-transparent" />

            <div className="absolute bottom-5 left-6 right-6">
              <p className="text-white/90 text-base font-medium max-w-md">
                Building lasting partnerships across Faridabad and beyond.
              </p>
            </div>

            <div className="absolute top-5 right-5 w-10 h-10 border-t-2 border-r-2 border-[#ee9725]/60" />
            <div className="absolute bottom-5 left-5 w-10 h-10 border-b-2 border-l-2 border-[#ee9725]/60" />
          </div>

          {/* Stat strip — fused directly under the image, equal cells */}
          <div className="grid grid-cols-2 lg:grid-cols-4 bg-white border-t-2 border-[#1A1A1A]">
            {counters.map((c, idx) => (
              <CounterCell key={idx} {...c} isLast={idx === counters.length - 1} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NumberSpeaksLouder;