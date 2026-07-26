import React, { memo } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  position: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "The 7-point formula isn't just theory. We saw a 40% increase in repeat footfall within the first three months of partnering with Shoppers Club.",
    author: "Arjun Mehta",
    position: "Managing Director",
    company: "Mehta Lifestyle Retail"
  },
  {
    quote: "Their understanding of the Faridabad consumer landscape is unmatched. They helped us build a digital presence that actually converts walk-ins.",
    author: "Sonia Verma",
    position: "Founder",
    company: "The Wellness Collective"
  },
  {
    quote: "Professional, data-driven, and results-oriented. Customers Delight transformed how we look at customer loyalty and rewards.",
    author: "Rajesh Khanna",
    position: "Operations Head",
    company: "Khanna Automobiles"
  }
];

const floatDurations = [5, 6, 4.5];
const floatDelays = [0, 0.8, 1.5];

const ClientTestimonials: React.FC = () => {
  return (
    <section className="bg-[#FAF8F5] py-28 px-6 overflow-hidden relative">
      {/* Ambient blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-100/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-100/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-20">
         

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-5xl font-semibold tracking-tight text-[#1A1A1A] leading-[1.1] mb-5"
          >
            What Our <span className="text-[#ee9725]">Clients Say.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-stone-500 text-lg max-w-xl mx-auto leading-relaxed"
          >
            Real growth stories from Faridabad's leading business owners.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className={index === 1 ? "lg:mt-10" : ""}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: floatDurations[index],
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: floatDelays[index],
                }}
                whileHover={{ y: -6 }}
                className="group relative bg-white rounded-3xl p-8 md:p-10 border border-amber-100/60 hover:border-[#ee9725] hover:shadow-[0_20px_60px_-15px_rgba(212,160,23,0.18)] transition-all duration-500 h-full"
              >
                {/* Quote Icon */}
                <div className="mb-6">
                  <Quote
                    className="w-8 h-8 text-[#ee9725] transition-colors duration-500 group-hover:text-[#ee9725]"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Quote Text */}
                <blockquote className="text-[#1A1A1A]/80 text-base leading-relaxed mb-8 font-medium">
                  "{t.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#ee9725] flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-[#D4A017]/20">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1A1A1A] text-sm">
                      {t.author}
                    </h4>
                    <p className="text-[#ee9725] text-[11px] font-semibold uppercase tracking-wider">
                      {t.position} <span className="text-stone-300 mx-1">|</span> {t.company}
                    </p>
                  </div>
                </div>

                {/* Index number */}
                <span className="absolute top-6 right-6 text-6xl font-black text-[#D4A017]/5 select-none">
                  0{index + 1}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom accent line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 flex justify-center"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-px bg-amber-200" />
            <div className="w-2 h-2 rounded-full bg-[#ee9725]" />
            <div className="w-16 h-px bg-amber-200" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(ClientTestimonials);