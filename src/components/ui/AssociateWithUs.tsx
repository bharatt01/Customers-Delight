import React, { memo, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconType } from "react-icons";
import {
  FaUsers,
  FaBullhorn,
  FaGift,
  FaChartLine,
  FaUsersCog,
  FaSyncAlt,
  FaHashtag,
  FaArrowRight,
} from "react-icons/fa";

interface Point {
  title: string;
  description: string;
  impact: string;
  icon: IconType;
}

const points: Point[] = [
  {
    title: "Bring More Customers",
    description: "Scale your daily footfall through Shoppers Club Faridabad's network of engaged local buyers.",
    impact: "More people through the door, every week",
    icon: FaUsers,
  },
  {
    title: "Reach Out to All",
    description: "Put your shop in front of the whole Faridabad market, not just the five people already inside.",
    impact: "Your offers finally reach who they're meant for",
    icon: FaBullhorn,
  },
  {
    title: "Create Loyalty Rewards",
    description: "A reward system built for repeat visits, so customers have a reason to choose you again.",
    impact: "Turns one-time buyers into regulars",
    icon: FaGift,
  },
  {
    title: "Strong Digital Presence",
    description: "A cohesive online footprint, so \"shop near me\" search leads to you first, not a competitor.",
    impact: "Found first, chosen first",
    icon: FaChartLine,
  },
  {
    title: "Build Loyal Community",
    description: "Cultivate a base of brand advocates who bring their friends and family along with them.",
    impact: "Customers who sell your shop for you",
    icon: FaUsersCog,
  },
  {
    title: "Convert Walk-ins",
    description: "Turn a single visit into a lifecycle customer, with follow-ups that happen automatically.",
    impact: "No more customers who vanish after one visit",
    icon: FaSyncAlt,
  },
  {
    title: "Leverage Social Media",
    description: "Instagram, Facebook, and YouTube, used to build real local brand equity — not just likes.",
    impact: "Local reputation that compounds over time",
    icon: FaHashtag,
  },
];

const STEP_DURATION = 2000;

const SevenPointCards: React.FC = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(() => {
      setActive((a) => (a + 1) % points.length);
    }, STEP_DURATION);
    return () => clearTimeout(timer);
  }, [active, paused]);

  const current = points[active];
  const Icon = current.icon;

  return (
    <section className="relative bg-[#FDF6E9] py-28 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Header — Bold, high-contrast, impossible to skip */}
        <div className="max-w-3xl mb-16 text-center mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.05] text-[#2B1B0E] mb-6">
            Our Seven-Point Formula for{" "}
            <span className="relative inline-block">
              <span className="relative z-10 px-2">2x Your Sales</span>
              <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-600 -skew-x-6 z-0" />
            </span>{" "}
            in Twelve Months
          </h2>
          <div className="h-1.5 w-20 bg-[#ee9725] mx-auto mb-6" />
          <p className="text-[#2B1B0E]/60 text-lg md:text-xl leading-relaxed font-medium">
            One roadmap, seven steps, tracked and applied — not seven
            separate things you have to figure out on your own.
          </p>
        </div>

        {/* Ledger stepper */}
        <div
          className="grid md:grid-cols-[280px_1fr] gap-0 border-[3px] border-[#2B1B0E] rounded-xl overflow-hidden shadow-[12px_12px_0px_0px_rgba(43,27,14,0.12)]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* LEFT: numbered ledger list */}
          <div className="bg-[#2B1B0E] flex md:flex-col overflow-x-auto md:overflow-visible">
            {points.map((point, index) => {
              const isActive = index === active;
              return (
                <button
                  key={point.title}
                  onClick={() => setActive(index)}
                  className={`relative shrink-0 md:shrink w-[168px] md:w-auto text-left px-5 py-4 border-b border-white/10 transition-all duration-300 ${
                    isActive ? "bg-white/10" : "hover:bg-white/[0.05]"
                  }`}
                >
                  {/* Orange active indicator bar */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-orange-500 to-yellow-600" />
                  )}

                  <div className="flex items-center gap-3">
                    <span
                      className={`font-mono text-sm font-bold tracking-widest transition-colors duration-300 ${
                        isActive ? "text-[#ee9725]" : "text-white/40"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-sm font-bold leading-snug transition-colors duration-300 ${
                        isActive ? "text-white" : "text-white/50"
                      }`}
                    >
                      {point.title}
                    </span>
                  </div>

                  {/* Progress fill */}
                  <div className="mt-3 h-[3px] w-full bg-white/10 rounded-full overflow-hidden">
                    {isActive && (
                      <motion.div
                        key={active}
                        initial={{ width: "0%" }}
                        animate={{ width: paused ? undefined : "100%" }}
                        transition={{ duration: STEP_DURATION / 1000, ease: "linear" }}
                        className="h-full bg-gradient-to-r from-orange-500 to-yellow-600"
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT: active point detail */}
          <div className="relative bg-[#FDF6E9] p-8 md:p-12 min-h-[380px] flex flex-col justify-center overflow-hidden">
            {/* Giant faded step number in background */}
            <span className="absolute top-4 right-6 text-[8rem] md:text-[10rem] font-black text-[#2B1B0E]/[0.04] leading-none select-none pointer-events-none">
              {String(active + 1).padStart(2, "0")}
            </span>

            <span className="relative z-10 inline-block self-start font-mono text-xs font-bold tracking-[0.2em] text-[#2B1B0E]/40 uppercase mb-6 border-b-2 border-[#ee9725] pb-1">
              Step {String(active + 1).padStart(2, "0")} / {String(points.length).padStart(2, "0")}
            </span>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative z-10"
              >
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-orange-500 to-yellow-600 flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(43,27,14,0.15)]">
                  <Icon className="text-2xl text-[#2B1B0E]" />
                </div>

                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#2B1B0E] mb-4 leading-tight">
                  {current.title}
                </h3>
                
                <div className="w-16 h-1.5 bg-gradient-to-r from-orange-500 to-yellow-600 mb-5" />

                <p className="text-[#2B1B0E]/70 text-lg md:text-xl leading-relaxed max-w-lg mb-8 font-medium">
                  {current.description}
                </p>

                <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-yellow-600 text-[#2B1B0E] font-bold text-sm uppercase tracking-wider rounded-full shadow-[4px_4px_0px_0px_rgba(43,27,14,0.15)]">
                  <span className="w-2 h-2 rounded-full bg-[#2B1B0E]" />
                  {current.impact}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <p className="text-center text-[#2B1B0E]/35 text-sm mt-5 font-medium">
          Tap any step to jump ahead — or let it run through all seven.
        </p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mt-16 mx-auto max-w-5xl bg-[#2B1B0E] rounded-xl border-[3px] border-dashed border-[#ee9725]/50 px-10 py-10 text-center"
        >
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-orange-200/80 mb-3">
            All 7 points, one roadmap
          </p>

          <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6 leading-tight">
            Ready to double your sales?
          </h3>

          <button className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-yellow-600 text-[#2B1B0E] font-bold text-base uppercase tracking-wide py-4 px-8 rounded-lg shadow-[6px_6px_0px_0px_rgba(255,255,255,0.15)] hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.15)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 group">
            Let's Talk
            <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(SevenPointCards);