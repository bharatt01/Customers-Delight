import React, { memo } from "react";
import { motion } from "framer-motion";
import { Store, Shirt, UtensilsCrossed, Dumbbell, Scissors, Sparkles, Zap } from "lucide-react";

const industries = [
  { name: "Shops & Stores", icon: Store },
  { name: "Fashion Stores", icon: Shirt },
  { name: "Restaurants", icon: UtensilsCrossed },
  { name: "Gyms", icon: Dumbbell },
  { name: "Beauty Salons", icon: Scissors },
  { name: "SMEs", icon: Sparkles },
];

const ClientAbout: React.FC = () => {
  return (
    <section className="bg-[#FAF8F5] py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
        

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1A1A1A] leading-[1.1]"
          >
            About <span className="text-[#D4A017]">Us</span>
          </motion.h2>
        </div>

        {/* Main Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <p className="text-2xl md:text-3xl font-bold text-[#1A1A1A] leading-snug tracking-tight">
            At <span className="text-[#D4A017]">Customers Delight</span>, we help local businesses in Faridabad — shops, fashion stores, restaurants, gyms, salons, and SMEs — grow consistently, expand their customer base, and boost sales.
          </p>
        </motion.div>

        {/* How We Do It */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="bg-white rounded-3xl p-10 md:p-14 shadow-[0_4px_30px_rgba(212,160,23,0.08)] border border-amber-100/50 mb-20 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-amber-400 to-amber-600 rounded-l-3xl" />
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-amber-50 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start gap-6 md:gap-10">
            <div className="shrink-0">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center">
                <Zap className="w-6 h-6 text-amber-600" strokeWidth={1.5} />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-amber-700 uppercase tracking-wider mb-3">
                How We Do It
              </h3>
              <p className="text-stone-600 text-lg leading-relaxed">
                We do this through <span className="text-[#D4A017] font-bold">strategic planning</span>, <span className="text-[#D4A017] font-bold">smart tech execution</span>, and <span className="text-[#D4A017] font-bold">powerful social media</span> strategies that turn casual visitors into loyal, repeat customers.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Industries We Serve */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-8 justify-center">
            <div className="w-8 h-px bg-amber-400" />
            <span className="text-amber-600 font-semibold tracking-[0.2em] uppercase text-[11px]">
              Industries We Serve
            </span>
            <div className="w-8 h-px bg-amber-400" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <motion.div
                  key={industry.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  className="group bg-white rounded-2xl p-6 text-center border border-amber-100/60 hover:border-amber-300 hover:shadow-[0_8px_30px_rgba(212,160,23,0.12)] transition-all duration-500 cursor-default"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-amber-50 flex items-center justify-center group-hover:bg-amber-100 transition-colors duration-500">
                    <Icon
                      className="w-5 h-5 text-amber-500 group-hover:text-amber-700 transition-colors duration-500"
                      strokeWidth={1.5}
                    />
                  </div>
                  <span className="text-sm font-bold text-[#1A1A1A] tracking-tight">
                    {industry.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(ClientAbout);