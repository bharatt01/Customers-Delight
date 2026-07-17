import React, { memo } from "react";
import { motion } from "framer-motion";
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
  icon: IconType;
}

const points: Point[] = [
  { title: "Bring More Customers", description: "Scale your daily customer influx through Shoppers Club Faridabad's network.", icon: FaUsers },
  { title: "Reach Out to All", description: "Implement effective outreach strategies to capture the entire Faridabad market.", icon: FaBullhorn },
  { title: "Create Loyalty Rewards", description: "Develop high-retention reward systems for sustainable long-term growth.", icon: FaGift },
  { title: "Strong Digital Presence", description: "Establish brand authority and trust through a cohesive digital footprint.", icon: FaChartLine },
  { title: "Build Loyal Community", description: "Cultivate a dedicated community of brand advocates and repeat buyers.", icon: FaUsersCog },
  { title: "Convert Walk-ins", description: "Transform one-time visitors into lifecycle customers for sustained sales.", icon: FaSyncAlt },
  { title: "Leverage Social Media", description: "Harness Instagram, Facebook, and YouTube to build local brand equity.", icon: FaHashtag },
];

/* Same rotations and blobs as original */
const rotations = ["-rotate-1", "rotate-1", "-rotate-1", "rotate-2", "-rotate-1", "rotate-1", "-rotate-2"];
const blobs = [
  "rounded-[60%_40%_30%_70%/60%_30%_70%_40%]",
  "rounded-[30%_70%_70%_30%/30%_30%_70%_70%]",
  "rounded-[70%_30%_50%_50%/40%_60%_40%_60%]",
  "rounded-[40%_60%_60%_40%/60%_40%_60%_40%]",
  "rounded-[60%_40%_30%_70%/60%_30%_70%_40%]",
  "rounded-[30%_70%_70%_30%/30%_30%_70%_70%]",
  "rounded-[70%_30%_50%_50%/40%_60%_40%_60%]",
];

/* Color themes per card — same design, just colored */
const themes = [
  { badge: "bg-[#FF8C64]", badgeShadow: "shadow-[#FF8C64]/30", iconBg: "bg-[#FFF0EB]", iconColor: "text-[#E85D3A]", title: "text-[#C44A2C]", desc: "text-[#B07868]", hoverShadow: "hover:shadow-[0_25px_50px_-15px_rgba(255,100,80,0.3)]" },
  { badge: "bg-[#5B8DEF]", badgeShadow: "shadow-[#5B8DEF]/30", iconBg: "bg-[#EBF0FF]", iconColor: "text-[#3B6FD0]", title: "text-[#2C5AB8]", desc: "text-[#6885B0]", hoverShadow: "hover:shadow-[0_25px_50px_-15px_rgba(91,141,239,0.3)]" },
  { badge: "bg-[#3CB371]", badgeShadow: "shadow-[#3CB371]/30", iconBg: "bg-[#E8F5EE]", iconColor: "text-[#2A8A5A]", title: "text-[#1E7A4A]", desc: "text-[#5A9A78]", hoverShadow: "hover:shadow-[0_25px_50px_-15px_rgba(60,179,113,0.3)]" },
  { badge: "bg-[#8B5CF6]", badgeShadow: "shadow-[#8B5CF6]/30", iconBg: "bg-[#F0EBFF]", iconColor: "text-[#6D3FD4]", title: "text-[#5B2CC4]", desc: "text-[#7A68A0]", hoverShadow: "hover:shadow-[0_25px_50px_-15px_rgba(139,92,246,0.3)]" },
  { badge: "bg-[#E85D8A]", badgeShadow: "shadow-[#E85D8A]/30", iconBg: "bg-[#FFF0F5]", iconColor: "text-[#C43D6A]", title: "text-[#A82C54]", desc: "text-[#B06880]", hoverShadow: "hover:shadow-[0_25px_50px_-15px_rgba(232,93,138,0.3)]" },
  { badge: "bg-[#20B2AA]", badgeShadow: "shadow-[#20B2AA]/30", iconBg: "bg-[#E8FAF8]", iconColor: "text-[#168B84]", title: "text-[#0E6B64]", desc: "text-[#4A9A94]", hoverShadow: "hover:shadow-[0_25px_50px_-15px_rgba(32,178,170,0.3)]" },
  { badge: "bg-[#D4A017]", badgeShadow: "shadow-[#D4A017]/30", iconBg: "bg-[#FFF8E8]", iconColor: "text-[#B8860B]", title: "text-[#8B6914]", desc: "text-[#A08040]", hoverShadow: "hover:shadow-[0_25px_50px_-15px_rgba(212,160,23,0.35)]" },
];

const floatDuration = [4, 5, 4.5, 5.5, 4, 6, 4.5];
const floatDelay = [0, 0.5, 1, 1.5, 2, 0.8, 1.2];

const SevenPointCards: React.FC = () => {
  return (
    <section className="relative bg-[#FCFAF8] py-32 px-6 overflow-hidden">
      {/* Organic background blobs — same as original */}
      <div className="absolute top-[5%] right-[-8%] w-[420px] h-[420px] bg-amber-100/50 blur-[110px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-8%] w-[380px] h-[380px] bg-orange-100/40 blur-[100px] rounded-full pointer-events-none" />

      {/* Floating decorative dots — same as original */}
      <motion.div
        animate={{ y: [0, -18, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="hidden lg:block absolute top-[18%] left-[6%] w-4 h-4 rounded-full bg-amber-400/40"
      />
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="hidden lg:block absolute top-[55%] right-[10%] w-6 h-6 rounded-full bg-orange-300/30"
      />
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="hidden lg:block absolute bottom-[12%] left-[14%] w-3 h-3 rounded-full bg-amber-500/40"
      />

      <div className="max-w-5xl mx-auto relative">
        {/* Header — same as original */}
        <div className="max-w-3xl mb-24 mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05] text-[#1A1A1A] mb-8">
            Our 7 Point Formula to{" "}
            <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
              Double Your Sale
            </span>{" "}
            in 12 Months
          </h2>
          <div className="h-1 w-24 bg-amber-500 mb-8 mx-auto" />
          <p className="text-stone-600 text-lg leading-relaxed">
            We are <span className="text-amber-900 font-semibold">Customers Delight</span>. Based in Faridabad, we provide a strategic roadmap to scale your business through data-driven steps.
          </p>
        </div>

        {/* Winding path — same as original */}
        <div className="relative">
          <svg
            className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 h-full w-[420px] -z-10"
            viewBox="0 0 420 1750"
            fill="none"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M340,60 C160,140 160,180 80,250 C260,330 260,380 340,470 C160,550 160,600 80,690 C260,770 260,820 340,910 C160,990 160,1040 80,1130 C260,1210 260,1260 340,1350 C160,1430 160,1480 80,1570"
              stroke="#F59E0B"
              strokeOpacity="0.35"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="2 14"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
            />
          </svg>

          <div className="flex flex-col gap-16 md:gap-6">
            {points.map(({ title, description, icon: Icon }, index) => {
              const isRight = index % 2 === 0;
              const theme = themes[index];
              const rotation = rotations[index];
              const blob = blobs[index];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40, scale: 0.94 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className={`flex ${isRight ? "md:justify-start" : "md:justify-end"}`}
                >
                  <motion.article
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: floatDuration[index],
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: floatDelay[index],
                    }}
                    whileHover={{ rotate: 0, scale: 1.03 }}
                    className={`group relative w-full md:w-[420px] bg-white ${rotation} rounded-tl-[2.5rem] rounded-br-[2.5rem] rounded-tr-2xl rounded-bl-2xl border border-stone-200/80 p-8 shadow-[0_15px_35px_-15px_rgba(180,83,9,0.15)] transition-shadow duration-500 ${theme.hoverShadow}`}
                  >
                    {/* Sticker number — now colored */}
                    <div
                      className={`absolute -top-5 ${isRight ? "-left-5" : "-right-5"} w-14 h-14 flex items-center justify-center ${theme.badge} border-2 border-white text-white font-black text-lg rounded-full rotate-6 group-hover:rotate-12 transition-transform duration-500 shadow-lg ${theme.badgeShadow}`}
                    >
                      0{index + 1}
                    </div>

                    <div className="flex items-start gap-5">
                      {/* Icon blob — now colored */}
                      <div
                        className={`shrink-0 w-16 h-16 flex items-center justify-center ${blob} ${theme.iconBg} ${theme.iconColor} transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6`}
                      >
                        <Icon className="text-2xl" />
                      </div>

                      <div>
                        {/* Title — now colored */}
                        <h3 className={`font-extrabold tracking-tight ${theme.title} text-xl mb-2 leading-snug`}>
                          {title}
                        </h3>
                        {/* Description — now colored */}
                        <p className={`${theme.desc} text-sm leading-relaxed`}>
                          {description}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA — same organic sticker panel as original */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mt-24 mx-auto max-w-2xl"
        >
          <div className="relative bg-gradient-to-br from-amber-500 to-orange-600 rounded-[3rem] rounded-tr-xl px-10 py-14 text-center overflow-hidden rotate-1">
            <motion.div
              animate={{ rotate: [0, 12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 w-36 h-36 bg-white/10 rounded-[40%_60%_60%_40%/60%_40%_60%_40%]"
            />
            <motion.div
              animate={{ rotate: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-8 w-28 h-28 bg-white/10 rounded-[60%_40%_30%_70%/60%_30%_70%_40%]"
            />

            <h3 className="relative z-10 text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-8 leading-tight">
              Ready to double your sales?
            </h3>
            <button className="relative z-10 inline-flex items-center gap-2 bg-white text-amber-700 hover:bg-amber-50 transition-all font-extrabold uppercase tracking-widest text-xs py-4 px-8 rounded-full group">
              Let's Talk
              <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(SevenPointCards);