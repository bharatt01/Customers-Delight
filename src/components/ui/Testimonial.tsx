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

const ClientTestimonials: React.FC = () => {
  return (
    <section className="bg-white py-2 px-6 relative overflow-hidden">
      {/* Subtle background dot pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
          
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05] text-black"
            >
              What Our{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Clients Say.</span>
                  </span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-black/50 text-lg max-w-xs border-l-2 border-[#D4A017] pl-6"
          >
            Real growth stories from Faridabad's leading business owners.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="group relative border border-black/10 p-10 md:p-12 transition-all duration-500 hover:border-[#D4A017] hover:bg-[#D4A017]"
            >
              {/* Quote Icon */}
              <div className="mb-8">
                <Quote className="w-10 h-10 text-black/10 transition-colors duration-500 group-hover:text-white/30" strokeWidth={1.5} />
              </div>

              <div className="relative z-10">
                <blockquote className="text-lg leading-relaxed text-black/80 mb-10 font-medium transition-colors duration-500 group-hover:text-white">
                  "{t.quote}"
                </blockquote>

                <div className="flex items-center gap-4">
                  {/* Avatar with initial */}
                  <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center text-[#D4A017] font-extrabold text-lg transition-all duration-500 group-hover:bg-white group-hover:text-[#D4A017]">
                    {t.author.charAt(0)}
                  </div>

                  <div>
                    <h4 className="text-black font-extrabold tracking-tight text-lg transition-colors duration-500 group-hover:text-white">
                      {t.author}
                    </h4>
                    <p className="text-[#D4A017] text-xs uppercase tracking-widest font-bold transition-colors duration-500 group-hover:text-white/70">
                      {t.position} <span className="text-black/20 mx-1 transition-colors duration-500 group-hover:text-white/30">|</span> {t.company}
                    </p>
                  </div>
                </div>
              </div>

              {/* Index number */}
              <span className="absolute top-6 right-6 text-5xl font-black text-black/5 transition-colors duration-500 group-hover:text-white/20 select-none">
                0{index + 1}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Bottom Context */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-24 pt-12 border-t border-black/10 flex flex-col items-center"
        >
          
        </motion.div>
      </div>
    </section>
  );
};

export default memo(ClientTestimonials);