import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Globe,
  Search,
  MapPin,
  Star,
  Shield,
  TrendingUp,
  Users,
  CheckCircle,
  ExternalLink,
  Building2,
  BadgeCheck,
} from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

const trustElements = [
  {
    icon: Building2,
    title: 'Google Business Profile',
    description: 'Your digital storefront that appears in local searches and Google Maps.',
    importance: 'Critical',
    weight: 4,
  },
  {
    icon: Globe,
    title: 'Professional Website',
    description: 'A fast, mobile-friendly website that converts visitors into customers.',
    importance: 'Essential',
    weight: 3,
  },
  {
    icon: MapPin,
    title: 'Local Listings',
    description: 'Consistent presence across directories, maps, and review platforms.',
    importance: 'Important',
    weight: 2,
  },
  {
    icon: Star,
    title: 'Reviews & Ratings',
    description: 'Social proof that builds trust and influences buying decisions.',
    importance: 'High Impact',
    weight: 3,
  },
];

const trustFlow = [
  { label: 'Trust', icon: Shield, description: 'Customers trust verified, visible businesses' },
  { label: 'Discovery', icon: Search, description: 'They find you when searching for solutions' },
  { label: 'Visit', icon: Users, description: 'Trust leads to visits and enquiries' },
  { label: 'Purchase', icon: TrendingUp, description: 'Confidence converts to sales' },
];

const checklist = [
  { id: 'gbp', item: 'Claimed Google Business Profile', category: 'Foundation' },
  { id: 'nap-info', item: 'Accurate business information everywhere', category: 'Foundation' },
  { id: 'photos', item: 'Professional photos of business/products', category: 'Visual Trust' },
  { id: 'nap', item: 'Consistent NAP (Name, Address, Phone)', category: 'SEO' },
  { id: 'mobile', item: 'Mobile-friendly website', category: 'Website' },
  { id: 'speed', item: 'Fast loading speed (<3 seconds)', category: 'Website' },
  { id: 'cta', item: 'Clear call-to-action buttons', category: 'Website' },
  { id: 'reviews', item: 'Active review management', category: 'Reputation' },
  { id: 'posts', item: 'Regular post/update schedule', category: 'Engagement' },
  { id: 'listings', item: 'Local directory listings', category: 'SEO' },
];

const STEP_DURATION = 3200;

// Inline count-up hook, self-contained so this file has no extra dependency
const useCountUp = (target: number, start: boolean, duration = 1600): number => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTs: number | null = null;
    let raf: number;
    const step = (ts: number) => {
      if (!startTs) startTs = ts;
      const progress = Math.min((ts - startTs) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return count;
};

const StatCounter = ({ stat, label }: { stat: number; label: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const count = useCountUp(stat, inView);

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-6xl font-bold text-accent mb-4">{count}%</div>
    </div>
  );
};

const DigitalPresence = () => {
  const [activeFlow, setActiveFlow] = useState(0);
  const [flowPaused, setFlowPaused] = useState(false);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (flowPaused) return;
    const t = setTimeout(() => setActiveFlow((i) => (i + 1) % trustFlow.length), STEP_DURATION);
    return () => clearTimeout(t);
  }, [activeFlow, flowPaused]);

  const toggleItem = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(checked).filter(Boolean).length;
  const score = Math.round((completedCount / checklist.length) * 100);

  return (
    <>
      {/* Hero Section */}
      <section className="section-padding pt-12 pb-10">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="heading-xl mb-6"
              >
                Build Trust &
                <br />
                <span className="text-gradient-accent">Get Discovered</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="body-lg mb-8"
              >
                In today's world, customers search before they visit. A strong digital
                presence builds trust, drives discovery, and converts searches into
                sales — no marketing fluff, just practical visibility.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/loyalty-systems" className="btn-accent group">
                  Audit Your Presence
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link to="/community" className="btn-outline">
                  Build Community First
                </Link>
              </motion.div>
            </div>

            {/* Trust Flow — now an interactive, auto-advancing stepper */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
              onMouseEnter={() => setFlowPaused(true)}
              onMouseLeave={() => setFlowPaused(false)}
            >
              <div className="bg-gradient-to-br from-card to-secondary rounded-3xl p-8 md:p-10">
                <div className="text-center mb-8">
                  <span className="tag mb-2">The Trust Flow</span>
                  <h3 className="heading-sm">How Digital Presence Drives Revenue</h3>
                </div>

                <div className="relative space-y-3">
                  {/* connecting line, fills as the stepper progresses */}
                  <div className="absolute left-6 top-6 bottom-6 w-px bg-border" />
                  <motion.div
                    className="absolute left-6 top-6 w-px bg-accent origin-top"
                    animate={{
                      height: `${(activeFlow / (trustFlow.length - 1)) * 100}%`,
                    }}
                    transition={{ duration: 0.4 }}
                  />

                  {trustFlow.map((step, index) => {
                    const isActive = index === activeFlow;
                    const isDone = index < activeFlow;
                    return (
                      <button
                        key={step.label}
                        onClick={() => setActiveFlow(index)}
                        className="relative flex items-center gap-4 bg-background rounded-xl p-4 w-full text-left transition-all duration-300"
                        style={{
                          transform: isActive ? 'scale(1.02)' : 'scale(1)',
                          boxShadow: isActive ? '0 8px 24px -8px rgba(0,0,0,0.15)' : 'none',
                        }}
                      >
                        <div
                          className={`relative z-10 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                            isActive || isDone ? 'bg-accent text-accent-foreground' : 'bg-accent/10 text-accent'
                          }`}
                        >
                          <step.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className={`font-semibold transition-colors ${isActive ? 'text-accent' : ''}`}>
                            {step.label}
                          </div>
                          <AnimatePresence mode="wait">
                            {isActive && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="text-sm text-muted-foreground overflow-hidden"
                              >
                                {step.description}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        {index < trustFlow.length - 1 && (
                          <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Elements Grid */}
      <section className="section-padding bg-secondary/30 pt-12 pb-10">
        <div className="container-wide">
          <SectionHeading
            title="The Pillars of Digital Trust"
            description="Each element works together to create a comprehensive digital presence that customers trust."
          />

          <div className="grid md:grid-cols-2 gap-6">
            {trustElements.map((element, index) => (
              <motion.div
                key={element.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="card-feature relative overflow-hidden group"
              >
                {/* weight bar — importance encoded as a real value, not decoration */}
                <div className="absolute top-0 left-0 h-1 bg-accent transition-all duration-500" style={{ width: `${element.weight * 25}%` }} />

                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                    <element.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{element.title}</h3>
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-accent/10 text-accent">
                        {element.importance}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{element.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Checklist Section — now interactive with a live score */}
      <section className="section-padding pt-12 pb-10">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <SectionHeading
                align="left"
                title="Is Your Digital Presence Complete?"
                description="Tap what you already have. We'll show you exactly where the gaps are."
              />

              {/* Live score readout */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-5 bg-card border border-border rounded-2xl p-6 mb-8"
              >
                <div
                  className="relative w-20 h-20 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: `conic-gradient(hsl(var(--accent)) ${score * 3.6}deg, hsl(var(--secondary)) 0deg)`,
                  }}
                >
                  <div className="w-[62px] h-[62px] rounded-full bg-card flex items-center justify-center">
                    <span className="text-lg font-bold">{score}%</span>
                  </div>
                </div>
                <div>
                  <p className="font-semibold">
                    {completedCount} of {checklist.length} in place
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {score === 100
                      ? "Strong presence — let's make it work even harder."
                      : score === 0
                      ? 'Tap each item you already have set up.'
                      : "You're on your way — here's what's left."}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Link to="/loyalty-systems" className="btn-accent group inline-flex">
                  Get Full Audit
                  <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card rounded-2xl border border-border p-6 md:p-8"
            >
              <div className="space-y-2">
                {checklist.map((entry, index) => {
                  const isChecked = !!checked[entry.id];
                  return (
                    <motion.button
                      key={entry.id}
                      type="button"
                      onClick={() => toggleItem(entry.id)}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.04 }}
                      whileTap={{ scale: 0.99 }}
                      className={`flex items-center gap-4 p-3 rounded-xl transition-colors group w-full text-left ${
                        isChecked ? 'bg-accent/5' : 'hover:bg-secondary/50'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${
                          isChecked
                            ? 'border-accent bg-accent'
                            : 'border-muted-foreground/30 group-hover:border-accent group-hover:bg-accent/10'
                        }`}
                      >
                        <CheckCircle
                          className={`w-4 h-4 transition-colors ${
                            isChecked ? 'text-accent-foreground' : 'text-transparent group-hover:text-accent'
                          }`}
                        />
                      </div>
                      <span className={`flex-1 transition-colors ${isChecked ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {entry.item}
                      </span>
                      <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded">
                        {entry.category}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section — numbers count up on scroll */}
      <section className="section-padding bg-primary text-primary-foreground pt-12 pb-10">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="heading-lg mb-6"
            >
              Why Digital Presence Matters
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { stat: 97, label: 'of consumers search online for local businesses' },
              { stat: 88, label: 'trust online reviews as much as personal recommendations' },
              { stat: 76, label: 'visit a business within a day of searching' },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <StatCounter stat={item.stat} label={item.label} />
                <p className="text-primary-foreground/70 text-center">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding pt-12 pb-10">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <BadgeCheck className="w-16 h-16 text-accent mx-auto mb-6" />
            <h2 className="heading-lg mb-6">Ready to Be Found?</h2>
            <p className="body-lg mb-10 max-w-2xl mx-auto">
              Start building a digital presence that earns trust and drives
              customers to your door.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/loyalty-systems" className="btn-accent group">
                Next: Loyalty Systems
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default DigitalPresence;