import { motion } from "framer-motion";
import { ArrowRight, Store, ShoppingBag, TrendingUp } from "lucide-react";

export default function BlogHero() {
  return (
    <section className="relative overflow-hidden bg-[#FDF6E9]">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 right-[-100px] w-[420px] h-[420px] rounded-full bg-orange-500/10 blur-[120px]" />
        <div className="absolute bottom-0 left-[-80px] w-[360px] h-[360px] rounded-full bg-yellow-400/10 blur-[110px]" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: "radial-gradient(#2B1B0E 0.6px, transparent 0.6px)",
            backgroundSize: "24px 24px",
            maskImage: "radial-gradient(ellipse 70% 55% at 50% 10%, black 30%, transparent 85%)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-14 pb-16 md:pt-16 md:pb-20">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-16 items-center">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border-2 border-dashed border-[#2B1B0E]/25 rounded-full">
              <TrendingUp size={14} className="text-[#ee9725]" />
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#2B1B0E]/70">
                Customers Delight — Market Watch
              </span>
            </div>

            <h1 className="mt-5 font-[900] uppercase leading-[0.95] text-[#2B1B0E] text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Grow Your Shop
              <br />
              <span className="bg-gradient-to-r from-orange-500 to-yellow-600 bg-clip-text text-transparent">
                Not Just Guess
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base md:text-lg leading-7 text-[#2B1B0E]/65">
              Real playbooks for shopkeepers running offline stores, online
              stores, or both — footfall, reviews, WhatsApp marketing,
              inventory, and the stuff that actually moves sales.
            </p>

            <div className="mt-7 flex flex-wrap gap-4">
              <button className="group flex items-center gap-2 rounded-sm bg-gradient-to-r from-orange-500 to-yellow-600 px-6 py-3 font-bold text-[#2B1B0E] text-sm uppercase tracking-wide shadow-[4px_4px_0px_0px_rgba(43,27,14,0.15)] hover:shadow-[2px_2px_0px_0px_rgba(43,27,14,0.15)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200">
                Explore Articles
                <ArrowRight className="w-4 h-4 transition group-hover:translate-x-1" />
              </button>

              <button className="rounded-sm border-2 border-[#2B1B0E] px-6 py-3 font-bold text-sm uppercase tracking-wide text-[#2B1B0E] hover:bg-[#2B1B0E] hover:text-[#FDF6E9] transition-colors duration-300">
                Browse Categories
              </button>
            </div>

            {/* Stats */}
            <div className="mt-9 flex flex-wrap gap-8 border-t-2 border-[#2B1B0E]/10 pt-6">
              <div>
                <div className="text-2xl font-[900] text-[#2B1B0E]">250+</div>
                <div className="mt-0.5 text-xs font-medium text-[#2B1B0E]/50">
                  Shopkeeper Guides
                </div>
              </div>
              <div>
                <div className="text-2xl font-[900] text-[#2B1B0E]">35+</div>
                <div className="mt-0.5 text-xs font-medium text-[#2B1B0E]/50">
                  Market Topics
                </div>
              </div>
              <div>
                <div className="text-2xl font-[900] text-[#2B1B0E]">Weekly</div>
                <div className="mt-0.5 text-xs font-medium text-[#2B1B0E]/50">
                  Fresh Updates
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — ledger-style notice stack */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            <div className="relative rounded-md border-2 border-[#2B1B0E] bg-white p-5 shadow-[6px_6px_0px_0px_rgba(43,27,14,0.1)] space-y-3">

              <div className="rounded-sm border-2 border-[#2B1B0E]/10 p-4 flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-[#FDF6E9] border border-[#2B1B0E]/10">
                  <TrendingUp className="h-5 w-5 text-[#ee9725]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#2B1B0E] text-[15px]">Market Intelligence</h3>
                  <p className="mt-0.5 text-sm text-[#2B1B0E]/55">
                    What's working for local shops this month.
                  </p>
                </div>
              </div>

              <div className="rounded-sm border-2 border-[#2B1B0E]/10 p-4 flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-[#FDF6E9] border border-[#2B1B0E]/10">
                  <Store className="h-5 w-5 text-[#ee9725]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#2B1B0E] text-[15px]">Offline Playbooks</h3>
                  <p className="mt-0.5 text-sm text-[#2B1B0E]/55">
                    Footfall, displays, in-store loyalty.
                  </p>
                </div>
              </div>

              <div className="rounded-sm bg-gradient-to-r from-orange-500 to-yellow-600 p-5 text-[#2B1B0E]">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Featured This Week
                </div>
                <h3 className="mt-2.5 text-lg font-[900] leading-tight">
                  Turning Walk-ins Into WhatsApp Regulars
                </h3>
                <p className="mt-1.5 text-sm text-[#2B1B0E]/75">
                  A simple system any shop owner can set up in a weekend.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}