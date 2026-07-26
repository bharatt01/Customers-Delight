import React, { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserX,
  SearchX,
  Clock,
  TrendingDown,
  MessageSquareDashed,
  Wallet,
  Check,
} from "lucide-react";

interface Problem {
  id: string;
  title: string;
  desc: string;
  icon: React.ElementType;
  monthlyLoss: number;
}

const problems: Problem[] = [
  {
    id: "vanish",
    title: "Customers visit once, then vanish",
    desc: "No reminder, no follow-up — so they forget you exist by the time they need you again.",
    icon: UserX,
    monthlyLoss: 6000,
  },
  {
    id: "invisible",
    title: "You're invisible on local search",
    desc: "Someone searches \"shop near me\" and finds three competitors before they find you.",
    icon: SearchX,
    monthlyLoss: 9000,
  },
  {
    id: "notime",
    title: "No time left for marketing",
    desc: "Between billing, stock, and staff, \"posting on Instagram\" is always tomorrow's job.",
    icon: Clock,
    monthlyLoss: 4000,
  },
  {
    id: "toolate",
    title: "You find out too late who stopped coming",
    desc: "By the time you notice a regular hasn't visited in months, they've already switched to someone else.",
    icon: TrendingDown,
    monthlyLoss: 7000,
  },
  {
    id: "noreach",
    title: "Offers reach nobody",
    desc: "A sale poster on the counter reaches the five people already inside — not the 500 who used to shop with you.",
    icon: MessageSquareDashed,
    monthlyLoss: 5000,
  },
  {
    id: "retainer",
    title: "Agencies want retainers you can't justify",
    desc: "Marketing agencies are built for brands with big budgets, not for one shop trying to fill more tables or racks.",
    icon: Wallet,
    monthlyLoss: 10000,
  },
];

const ClientProblems: React.FC = () => {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const totalLoss = problems
    .filter((p) => checked.has(p.id))
    .reduce((sum, p) => sum + p.monthlyLoss, 0);

  const count = checked.size;

  return (
    <section className="bg-white min-h-screen flex items-center px-6 py-6 overflow-hidden">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-5">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1A1A1A] leading-[1.1] max-w-3xl mx-auto"
          >
            Does This Sound Like{" "}
            <span className="text-[#ee9725]">Your Shop?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-2 text-[#cc8110] text-md"
          >
            Tap each one that's true for you. Most shop owners check off at
            least four.
          </motion.p>
        </div>

        {/* Two-column layout: problems left, loss meter right */}
        <div className="grid lg:grid-cols-[1fr_300px] gap-8 items-center">

          {/* LEFT: Problem checklist grid — 3×2 layout, single frame */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {problems.map((problem, index) => {
              const Icon = problem.icon;
              const isChecked = checked.has(problem.id);
              return (
                <motion.button
                  key={problem.id}
                  type="button"
                  aria-pressed={isChecked}
                  onClick={() => toggle(problem.id)}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileTap={{ scale: 0.97 }}
                  animate={isChecked ? { scale: [1, 1.02, 1] } : {}}
                  className={`relative text-left rounded-lg p-3 border-2 transition-colors duration-300 ${
                    isChecked
                      ? "bg-[#FFF8E7] border-[#ee9725]"
                      : "bg-white border-[#df8e1e] hover:border-[#ee9725]/50"
                  }`}
                >
                  {/* Checkbox */}
                  <div
                    className={`absolute top-3 right-3 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors duration-300 ${
                      isChecked
                        ? "bg-[#ee9725] border-[#ee9725]"
                        : "border-[#df8e1e]"
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`w-7 h-7 rounded-md border flex items-center justify-center transition-colors duration-300 ${
                        isChecked
                          ? "bg-[#ee9725] border-[#ee9725]"
                          : "bg-[#FAF8F5] border-[#E8E4DF]"
                      }`}
                    >
                      <Icon
                        className={`w-3.5 h-3.5 transition-colors duration-300 ${
                          isChecked ? "text-white" : "text-[#ee9725]"
                        }`}
                        strokeWidth={1.5}
                      />
                    </div>
                    <div className="h-px flex-1 bg-[#E8E4DF]" />
                  </div>

                  <h4 className="text-[18px] font-bold text-[#1A1A1A] tracking-tight mb-1 leading-snug pr-6">
                    {problem.title}
                  </h4>
                  <p className="text-[#6B6B6B] text-[13px] leading-relaxed mb-2">
                    {problem.desc}
                  </p>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-[#ee9725]/80">
                    ~ ₹{problem.monthlyLoss.toLocaleString("en-IN")}/mo
                  </p>
                </motion.button>
              );
            })}
          </div>

          {/* RIGHT: Live loss meter — centered, larger */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="self-center bg-[#1A1A1A] flex flex-col justify-center rounded-2xl px-8 py-10 shadow-[0_12px_40px_rgba(0,0,0,0.18)] border-2 border-dashed border-[#ee9725]/50"
          >
            <p className="font-mono text-[15px] uppercase tracking-[0.2em] text-white/50">
              Problems that match your shop
            </p>
            <p className="text-white font-bold text-xl mt-1">
              {count} <span className="text-white/50 font-normal">of 6</span>
            </p>

            <div className="h-px w-full bg-white/15 my-5" />

            <p className="font-mono text-[15px] uppercase tracking-[0.2em] text-white/50">
              Estimated monthly loss
            </p>
            <AnimatePresence mode="wait">
              <motion.p
                key={totalLoss}
                initial={{ opacity: 0, y: -8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-4xl font-[900] text-[#ee9725] mt-1"
              >
                ₹{totalLoss.toLocaleString("en-IN")}
              </motion.p>
            </AnimatePresence>

            {count === 0 && (
              <p className="text-white/40 text-md mt-4">
                Tap the problems on the left that hit close to home ←
              </p>
            )}
          </motion.div>
        </div>

        <p className="text-center text-[#1d1c1c] text-[15px] mt-4">
          *Estimates based on patterns across small retailers — your numbers will vary.
        </p>

        {/* Bridge line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-8"
        >
          <p className="text-[#1A1A1A] text-base md:text-lg font-semibold max-w-xl mx-auto leading-relaxed">
            {count > 0
              ? `That's ₹${totalLoss.toLocaleString("en-IN")} a month walking out the door — and every rupee of it is fixable.`
              : "Every one of these has a fix."}
          </p>
          <p className="mt-2 text-[#6B6B6B] text-sm">
            That's exactly the gap{" "}
            <span className="text-[#ee9725] font-bold">Customers Delight</span>{" "}
            fills.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(ClientProblems);