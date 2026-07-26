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
 <About /><section className="relative py-8 bg-white overflow-hidden">
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
          className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05] text-black"
        >
          Everything a
          <br />
          Shop Needs
          <br />
          <span className="text-[#ee9725]">to Scale.</span>
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
            {/* ONLY CHANGE: added rounded-2xl below */}
            <div className="relative h-full min-h-[420px] overflow-hidden rounded-2xl border border-black/10 bg-black">
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
                  <div className="w-12 h-px bg-[#ee9725]" />
                </div>

                <h3 className={`font-bold text-white mb-3 tracking-tight leading-tight ${isLarge ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'}`}>
                  {feature.title}
                </h3>
                
                <p className="text-white/60 leading-relaxed text-base max-w-md mb-6 group-hover:text-white/80 transition-colors duration-500">
                  {feature.description}
                </p>
              </div>

              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ee9725] -translate-y-1/2 translate-x-1/2 rotate-45 group-hover:scale-110 transition-transform duration-500" />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>
</section>

<AssociateWithUs />
 <section className="relative min-h-[80vh] flex items-center pt-32 pb-16 bg-[#FDF6E9] overflow-hidden">
  {/* single soft glow, not a repeating pattern */}
  <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-orange-400/8 blur-[140px] rounded-full pointer-events-none" />

  <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 relative">

    {/* LEFT SIDE — one clean frame, no stacked ornaments */}
    <div className="w-full lg:w-1/2 flex justify-center">
      <motion.div
        animate={controls}
        initial={{ rotateY: 0 }}
        style={{ transformStyle: "preserve-3d", perspective: 1200 }}
        className="relative"
      >
        <div className="rounded-md border-2 border-[#2B1B0E] shadow-[8px_8px_0px_0px_rgba(43,27,14,0.1)] overflow-hidden">
          <motion.img
            key={currentImage}
            src={images[currentImage]}
            alt="Retail Shop System"
            className="w-[300px] md:w-[400px] lg:w-[440px] object-cover"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* one accent only — a single corner tag, not floating over multiple layers */}
        <div className="absolute -bottom-4 left-6 bg-gradient-to-r from-orange-500 to-yellow-600 text-[#2B1B0E] text-xs font-bold uppercase tracking-wide px-4 py-2 rounded-sm shadow-md">
          Live in Under a Week
        </div>
      </motion.div>
    </div>

    {/* RIGHT SIDE — calm, uncluttered */}
    <div className="w-full lg:w-1/2">
      <span className="inline-block font-mono text-[11px] tracking-[0.18em] uppercase text-[#2B1B0E]/50 mb-4">
        Customers Delight — Retail Systems
      </span>

      <h1 className="font-[900] uppercase leading-[1.05] text-[#2B1B0E] text-4xl md:text-5xl tracking-tight mb-2">
        Turn Every Walk-In
      </h1>
      <h1 className="font-[900] uppercase leading-[1.05] text-4xl md:text-5xl tracking-tight bg-gradient-to-r from-orange-500 to-yellow-600 bg-clip-text text-transparent mb-6">
        Into a Loyal Customer
      </h1>

      <p className="text-[#2B1B0E]/60 text-lg max-w-lg mb-9 leading-relaxed">
        We bridge the gap between your physical storefront and digital
        retention — smart, modern systems built for boutique and retail
        brands.
      </p>

      <div className="flex flex-wrap items-center gap-6">
        <button className="bg-[#2B1B0E] text-[#FDF6E9] px-8 py-3.5 rounded-sm font-bold text-sm uppercase tracking-wide hover:bg-[#ee9725] hover:text-[#2B1B0E] transition-colors duration-300">
          Get Started Now
        </button>
        <button className="text-[#2B1B0E] font-semibold text-sm underline underline-offset-4 decoration-[#2B1B0E]/30 hover:decoration-[#ee9725] transition-colors">
          See how it works
        </button>
      </div>
    </div>
  </div>
</section>

<WorkProcess />
      {/* Process Section */}
      
      <NumberSpeaksLouder 
      imageSrc='/Images/numbers.jpg' />
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
