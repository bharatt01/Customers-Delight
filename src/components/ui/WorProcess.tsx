import React from "react";
import { motion, Variants } from "framer-motion";
import { Lightbulb, Users, Plane, CheckCircle, LucideIcon } from "lucide-react";

interface Step {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const processSteps: Step[] = [
  { icon: Lightbulb, title: "Discovery", desc: "A deep dive into your unique market requirements and growth goals." },
  { icon: Users, title: "Alignment", desc: "Strategic joint planning with your team for a seamless integration." },
  { icon: Plane, title: "Implementation", desc: "Agile execution delivering high-impact results with precision." },
  { icon: CheckCircle, title: "Optimization", desc: "Continuous performance monitoring and long-term support." },
];

/* Progressive darkening: Phase 1 lightest → Phase 4 darkest */
const stepStyle = [
  {
    blob: "rounded-[60%_40%_30%_70%/60%_30%_70%_40%]",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
    badgeBorder: "border-amber-300",
    badgeText: "text-amber-500",
    phaseText: "text-amber-500",
    titleText: "text-amber-700",
    descText: "text-amber-900/60",
    hoverGlow: "bg-amber-50/40",
    shadow: "shadow-[0_15px_35px_-15px_rgba(180,83,9,0.25)]",
  },
  {
    blob: "rounded-[30%_70%_70%_30%/30%_30%_70%_70%]",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    badgeBorder: "border-amber-400",
    badgeText: "text-amber-600",
    phaseText: "text-amber-600",
    titleText: "text-amber-600",
    descText: "text-amber-900/60",
    hoverGlow: "bg-amber-100/50",
    shadow: "shadow-[0_15px_35px_-15px_rgba(200,130,0,0.3)]",
  },
  {
    blob: "rounded-[70%_30%_50%_50%/40%_60%_40%_60%]",
    iconBg: "bg-amber-200",
    iconColor: "text-amber-700",
    badgeBorder: "border-amber-600",
    badgeText: "text-amber-700",
    phaseText: "text-amber-700",
    titleText: "text-amber-900",
    descText: "text-amber-900/60",
    hoverGlow: "bg-amber-200/50",
    shadow: "shadow-[0_15px_35px_-15px_rgba(210,140,0,0.35)]",
  },
  {
    blob: "rounded-[40%_60%_60%_40%/60%_40%_60%_40%]",
    iconBg: "bg-amber-500",
    iconColor: "text-white",
    badgeBorder: "border-white",
    badgeText: "text-white",
    badgeBg: "bg-amber-500",
    badgeShadow: "shadow-lg shadow-amber-500/30",
    phaseText: "text-amber-600",
    titleText: "text-amber-900",
    descText: "text-amber-900/70",
    hoverGlow: "bg-amber-300/50",
    shadow: "shadow-[0_15px_35px_-15px_rgba(180,100,0,0.4)]",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.94 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.15, duration: 0.8, ease: [0.215, 0.61, 0.355, 1] },
  }),
};

const WorkProcess: React.FC = () => {
  return (
    <section className="relative bg-white py-2 px-6 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-[10%] right-[-8%] w-[420px] h-[420px] bg-amber-100/40 blur-[110px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[5%] left-[-8%] w-[360px] h-[360px] bg-orange-100/30 blur-[100px] rounded-full pointer-events-none" />

      {/* Floating decorative dots */}
      <motion.div
        animate={{ y: [0, -16, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="hidden lg:block absolute top-[15%] left-[8%] w-4 h-4 rounded-full bg-amber-400/40"
      />
      <motion.div
        animate={{ y: [0, 18, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="hidden lg:block absolute bottom-[18%] right-[10%] w-5 h-5 rounded-full bg-orange-300/30"
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-28 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05] text-[#1A1A1A]">
            How We{" "}
            <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
              Work.
            </span>
          </h2>
        </div>

        {/* Winding process path */}
        <div className="relative">
          {/* Flowing hand-drawn connector, desktop only */}
          <svg
            className="hidden lg:block absolute top-0 left-0 w-full h-[420px] -z-0"
            viewBox="0 0 1200 420"
            fill="none"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M110,90 C260,10 340,10 480,110 C600,190 680,190 800,110 C920,30 1000,30 1100,120"
              stroke="#F59E0B"
              strokeOpacity="0.35"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="2 14"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
          </svg>

          <div className="grid gap-y-16 gap-x-10 md:grid-cols-2 lg:grid-cols-4 relative z-10">
            {processSteps.map(({ icon: Icon, title, desc }, i) => {
              const style = stepStyle[i];
              const isLast = i === processSteps.length - 1;
              const offset = i % 2 === 0 ? "lg:translate-y-0" : "lg:translate-y-16";

              return (
                <motion.div
                  key={i}
                  className={`relative group flex flex-col items-center text-center ${offset}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={i}
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                    className="relative"
                  >
                    {/* Icon Container — organic blob, progressively darker */}
                    <div
                      className={`relative z-10 w-24 h-24 flex items-center justify-center ${style.blob} ${style.iconBg} ${style.iconColor} border border-white ${style.shadow} transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6`}
                    >
                      <Icon className="w-9 h-9" strokeWidth={1.75} />
                    </div>

                    {/* Step Marker — sticker style, darker on last phase */}
                    <div
                      className={`absolute -top-3 -right-3 w-9 h-9 ${isLast ? `${style.badgeBg} ${style.badgeShadow}` : "bg-white"} border-2 ${style.badgeBorder} ${style.badgeText} text-xs font-black flex items-center justify-center rounded-full rotate-6 group-hover:rotate-12 transition-transform duration-500 ${!isLast ? "shadow-sm" : ""}`}
                    >
                      0{i + 1}
                    </div>
                  </motion.div>

                  {/* Text Content — progressively darker */}
                  <div className="px-4 mt-8">
                    <span className={`text-[10px] uppercase tracking-[0.2em] ${style.phaseText} font-bold block mb-2`}>
                      Phase {i + 1}
                    </span>
                    <h3 className={`text-xl font-extrabold tracking-tight ${style.titleText} mb-3`}>
                      {title}
                    </h3>
                    <p className={`${style.descText} text-sm leading-relaxed max-w-[240px] mx-auto`}>
                      {desc}
                    </p>
                  </div>

                  {/* Hover Glow Effect — progressively darker */}
                  <div className={`absolute -inset-4 ${style.hoverGlow} opacity-0 group-hover:opacity-100 -z-10 transition-opacity duration-500 rounded-[2rem]`} />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Callout */}
        <div className="mt-20 flex justify-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-amber-50 border border-amber-200/70">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <p className="text-amber-700 text-xl font-bold uppercase tracking-[0.2em]">
              Transparent · Systematic · Scalable
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;