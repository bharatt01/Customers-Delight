import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Crown, Globe, Gift, TrendingUp, Zap, Target, BarChart3 } from 'lucide-react';
import FloatingShapes from '@/components/3d/FloatingShapes';
import SectionHeading from '@/components/ui/SectionHeading';
import FeatureCard from '@/components/ui/FeatureCard';
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { useLoader } from "@react-three/fiber"
import { useGLTF, Center, Environment } from '@react-three/drei'
import { TextureLoader } from "three"
import * as THREE from "three"
// The Building Shell
import { useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
// import OwnerBenefits from '@/components/ui/OwnerBenefits';
import HeroSection from '@/components/ui/OurWorkHero';
import AssociateWithUs from '@/components/ui/AssociateWithUs';
import NumberSpeaksLouder from '@/components/ui/ImpactCounters';
import Testimonial from '@/components/ui/Testimonial';
import WorkProcess from '@/components/ui/WorProcess';
import About from '@/components/ui/About';



const features = [
  {
    icon: Globe,
    title: 'Digital Presence',
    description: 'Establish trust and visibility where your customers are searching for you.',
    image: '/Images/digitalpresence.jpg',
  },
  {
    icon: Users,
    title: 'Build Customer Community',
    description: 'Transform walk-in customers into loyal community members who keep coming back.',
    image: '/Images/customercommunity.jpg',
  },
 
  
  {
    icon: Gift,
    title: 'Loyalty Systems',
    description: 'Smart rewards that increase visit frequency and drive repeat sales.',
    image: '/Images/loyalty.jpg',
  },
   {
    icon: Crown,
    title: 'Prime Membership',
    description: 'Create exclusive membership programs that convert enquiries into long-term relationships.',
    image: '/Images/membership.jpg',
  },
];

const stats = [
  { value: '3x', label: 'Customer Retention' },
  { value: '47%', label: 'Repeat Purchase Rate' },
  { value: '2.5x', label: 'Average Order Value' },
  { value: '89%', label: 'Customer Satisfaction' },
];

const processSteps = [
  {
    icon: Target,
    title: 'Understand',
    description: 'We analyze your business, customers, and growth opportunities.',
  },
  {
    icon: Zap,
    title: 'Strategize',
    description: 'Craft a tailored growth plan that fits your business model.',
  },
  {
    icon: BarChart3,
    title: 'Execute',
    description: 'Implement systems that drive measurable, sustainable growth.',
  },
];




const Index = () => {
  const images = [
    "/Images/hero.png",
    "/Images/hero2.png",
    "/Images/hero3.png",
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const controls = useAnimationControls();

  useEffect(() => {
    let mounted = true;

    const runFlip = async () => {
      while (mounted) {
        // 1️⃣ First half flip
        await controls.start({
          rotateY: 180,
          transition: { duration: 0.2, ease: "easeIn" },
        });

        // 🔥 CHANGE IMAGE EXACTLY AT FLIP
        setCurrentImage((prev) => (prev + 1) % images.length);

        // 2️⃣ Second half flip
        await controls.start({
          rotateY: 360,
          transition: { duration: 0.2, ease: "easeOut" },
        });

        // Reset rotation (so it doesn't accumulate)
        controls.set({ rotateY: 0 });

        // ⏸️ Wait 5 seconds before next flip
        await new Promise((res) => setTimeout(res, 5000));
      }
    };

    runFlip();
    return () => {
      mounted = false;
    };
  }, [controls, images.length]);

  
  return (
    <>
 <HeroSection />
 <About />
<section className="relative py-8 bg-white overflow-hidden">
  {/* Diagonal mustard stripe background */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-0 right-0 w-[60%] h-full bg-[#D4A017]/[0.03] -skew-x-12 origin-top-right" />
  </div>

  <div className="container mx-auto px-6 relative z-10">
    {/* Header — Asymmetric 7/5 split */}
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
      <div className="md:col-span-7">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] text-black"
        >
          Everything a
          <br />
          Shop Needs
          <br />
          <span className="text-[#D4A017]">to Scale.</span>
        </motion.h2>
      </div>
      
      <div className="md:col-span-5 flex items-end">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-black/50 text-lg leading-8 pb-2"
        >
          We combine strategy, design, technology, and marketing into one seamless ecosystem that helps ambitious businesses scale with confidence.
        </motion.p>
      </div>
    </div>

    {/* Features — Masonry-inspired asymmetric grid */}
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {features.map((feature, index) => {
        const spans = [
          { col: "md:col-span-7" },
          { col: "md:col-span-5" },
          { col: "md:col-span-5" },
          { col: "md:col-span-7" },
        ];
        const span = spans[index % spans.length];
        const isLarge = span.col === "md:col-span-7";

        return (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className={`group relative ${span.col}`}
          >
            <div className="relative h-full min-h-[420px] overflow-hidden border border-black/10 bg-black">
              <img
                src={feature.image}
                alt={feature.title}
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-[1200ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#D4A017]/0 group-hover:bg-[#D4A017]/30 transition-colors duration-700 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-6xl md:text-7xl font-black text-white/10 group-hover:text-[#D4A017]/40 transition-colors duration-500">
                    0{index + 1}
                  </span>
                  <div className="w-12 h-px bg-[#D4A017]" />
                </div>

                <h3 className={`font-bold text-white mb-3 tracking-tight leading-tight ${isLarge ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'}`}>
                  {feature.title}
                </h3>
                
                <p className="text-white/60 leading-relaxed text-base max-w-md mb-6 group-hover:text-white/80 transition-colors duration-500">
                  {feature.description}
                </p>
              </div>

              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4A017] -translate-y-1/2 translate-x-1/2 rotate-45 group-hover:scale-110 transition-transform duration-500" />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>
</section>

 <section className="relative min-h-[85vh] flex items-start pt-28 -mt-16 bg-[#fafaf9] overflow-hidden">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">

        {/* LEFT SIDE */}
        <div className="w-full lg:w-1/2 flex justify-center relative">
          <motion.div
            animate={controls}
            initial={{ rotateY: 0 }}
            style={{
              transformStyle: "preserve-3d",
              perspective: 1200,
            }}
            className="relative"
          >
            {/* Glow */}
            <div className="absolute inset-0 rounded-[2.5rem] bg-amber-300/30 blur-3xl -z-10" />

            {/* Image */}
            <motion.img
              key={currentImage}
              src={images[currentImage]}
              alt="Retail Shop System"
              className="
                w-[320px] md:w-[420px] lg:w-[480px]
                rounded-[2.5rem]
                border-[6px] border-amber-500
                shadow-xl
                object-cover
              "
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
              animate={{ y: [0, -15, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>


        {/* RIGHT SIDE – Text Content */}
        <div className="w-full lg:w-1/2">

          {/* Badge */}
        

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-[1.05] tracking-tight">
              Turn Every Walk-In
            </h1>

            <div className="relative inline-block mt-3">
              <span className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-700">
                into a Loyal Customer
              </span>
              <span className="absolute -bottom-2 left-0 w-1/3 h-[5px] rounded-full bg-amber-500" />
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-600 text-lg md:text-xl max-w-lg mb-10 leading-relaxed font-medium">
            We bridge the gap between your physical storefront and digital retention.
            Smart, modern systems built for boutique and retail brands.
          </p>

          {/* CTA */}
          <div className="flex flex-wrap gap-5">
            <button className="bg-amber-600 text-amber-50 px-10 py-4 rounded-full font-extrabold shadow-lg shadow-amber-900/20 hover:bg-amber-950 hover:-translate-y-1 transition-all duration-300">
              Get Started Now
            </button>

            <button className="group flex items-center gap-2 px-6 py-4 text-slate-900 font-bold hover:text-amber-900 transition-colors">
              <span>View Demo</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>

        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-px bg-gradient-to-r from-transparent via-amber-500/70 to-transparent blur-[0.5px]" />
    </section>

<AssociateWithUs />
<WorkProcess />
      {/* Process Section */}
      
      <NumberSpeaksLouder />
      <Testimonial />
{/* <OwnerBenefits /> */}
      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl bg-gradient-to-br from-secondary via-card to-secondary/50 p-10 md:p-12 lg:p-14 text-center overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-olive/5 rounded-full blur-3xl" />
            
            <div className="relative z-10">
        
              
              <h2 className="heading-lg mb-6 max-w-2xl mx-auto">
                Ready to Transform Your Business Growth?
              </h2>
              <p className="body-lg max-w-xl mx-auto mb-10">
                Join hundreds of local businesses that have built sustainable customer relationships and predictable revenue.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/community" className="btn-accent group">
                  Get Started Today
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link to="/digital-presence" className="btn-outline">
                  See How It Works
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Index;
