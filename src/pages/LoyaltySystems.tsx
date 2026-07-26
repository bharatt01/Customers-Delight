import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Gift,
  Percent,
  Star,
  Ticket,
  Coins,
  TrendingUp,
  Users,
  Heart,
  Repeat,
  ArrowUpRight,
} from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

const rewardTypes = [
  {
    icon: Percent,
    title: 'Percentage Discounts',
    description: 'Simple, effective discounts that customers understand instantly.',
    example: '15% off next purchase',
    preview: { badge: '15% OFF', sub: 'Next Purchase', tone: 'Simple & instant' },
    color: 'bg-accent/10 text-accent',
  },
  {
    icon: Ticket,
    title: 'Exclusive Coupons',
    description: 'Limited-time offers that create urgency and exclusivity.',
    example: 'Flash sale access',
    preview: { badge: 'VIP ACCESS', sub: '24-Hour Flash Sale', tone: 'Creates urgency' },
    color: 'bg-olive/10 text-olive',
  },
  {
    icon: Coins,
    title: 'Points System',
    description: 'Earn points on every purchase, redeem for rewards.',
    example: '1 point per $1 spent',
    preview: { badge: '240 PTS', sub: '1 pt per ₹1 spent', tone: 'Builds over time' },
    color: 'bg-plum/10 text-plum',
  },
  {
    icon: Gift,
    title: 'Free Items/Services',
    description: 'Surprise and delight with complimentary offerings.',
    example: 'Free dessert on 5th visit',
    preview: { badge: 'FREE GIFT', sub: 'Unlocked on 5th visit', tone: 'Surprise & delight' },
    color: 'bg-accent/10 text-accent',
  },
];

const programExamples = [
  {
    name: 'Stamp Card',
    description: 'Buy 9, get 1 free',
    frequency: 'Every visit',
    retention: 'High',
    retentionScore: 65,
    complexity: 'Simple',
    complexityScore: 20,
    bestFor: 'Cafés, salons, and shops with frequent small purchases.',
  },
  {
    name: 'Points Rewards',
    description: 'Earn & redeem points',
    frequency: 'Ongoing',
    retention: 'Very High',
    retentionScore: 85,
    complexity: 'Medium',
    complexityScore: 55,
    bestFor: 'Retail stores with varied basket sizes and repeat buyers.',
  },
  {
    name: 'Tier System',
    description: 'Bronze → Silver → Gold',
    frequency: 'Quarterly',
    retention: 'Highest',
    retentionScore: 95,
    complexity: 'Advanced',
    complexityScore: 85,
    bestFor: 'Established shops ready to reward top spenders differently.',
  },
];

const benefits = [
  { icon: Repeat, stat: 2.5, suffix: 'x', title: 'More Frequent Visits', description: 'Loyalty members visit significantly more often than non-members.' },
  { icon: TrendingUp, stat: 67, suffix: '%', title: 'Higher Spending', description: 'Members spend more per visit when working toward rewards.' },
  { icon: Heart, stat: 80, suffix: '%', title: 'Emotional Connection', description: 'Rewards create positive feelings that strengthen brand loyalty.' },
  { icon: Users, stat: 3, suffix: 'x', title: 'Word of Mouth', description: 'Happy members actively refer friends and family.' },
];

// Self-contained count-up, triggers once in view
const useCountUp = (target: number, start: boolean, duration = 1400): number => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTs: number | null = null;
    let raf: number;
    const step = (ts: number) => {
      if (!startTs) startTs = ts;
      const progress = Math.min((ts - startTs) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target * 10) / 10);
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return count;
};

const StatBlock = ({ icon: Icon, stat, suffix, title, description }: (typeof benefits)[number]) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const count = useCountUp(stat, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-primary-foreground/5 rounded-2xl p-6 border border-primary-foreground/10 text-center"
    >
      <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mx-auto mb-4">
        <Icon className="w-5 h-5 text-accent" />
      </div>
      <div className="text-4xl font-bold text-accent mb-2">
        {count}
        {suffix}
      </div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-primary-foreground/70">{description}</p>
    </motion.div>
  );
};

const LoyaltySystems = () => {
  const [selectedReward, setSelectedReward] = useState(0);
  const [selectedProgram, setSelectedProgram] = useState(1);
  const [monthlyCustomers, setMonthlyCustomers] = useState(200);
  const [avgOrderValue, setAvgOrderValue] = useState(500);

  const activeReward = rewardTypes[selectedReward];
  const activeProgram = programExamples[selectedProgram];

  // Illustrative uplift estimate, blending the two headline stats on this page.
  // Clearly labeled as an estimate — not a guarantee — in the UI.
  const estimatedUplift = useMemo(() => {
    const baseline = monthlyCustomers * avgOrderValue;
    const upliftFactor = 0.32; // blended, conservative illustrative factor
    return Math.round((baseline * upliftFactor) / 100) * 100;
  }, [monthlyCustomers, avgOrderValue]);

  return (
    <>
      {/* Hero Section */}
      <section className="section-padding pt-12 pb-10">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="heading-xl mb-6"
            >
              Smart Rewards That
              <br />
              <span className="text-gradient-accent">Drive Repeat Sales</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="body-lg mb-10 max-w-2xl mx-auto"
            >
              Create a win-win relationship where customers feel valued and your
              business grows through increased visit frequency and higher spending.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link to="/community" className="btn-accent group">
                Design Your Program
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link to="/prime-members" className="btn-outline">
                See Prime Members
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reward Types — now selectable, with a live preview */}
      <section className="section-padding bg-secondary/30 pt-12 pb-10">
        <div className="container-wide">
          <SectionHeading
            title="Rewards That Work"
            description="Tap a reward type to see how it could look for your customers."
          />

          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-8 items-start">
            {/* Selectable tiles */}
            <div className="grid sm:grid-cols-2 gap-5">
              {rewardTypes.map((reward, index) => {
                const isActive = index === selectedReward;
                return (
                  <motion.button
                    key={reward.title}
                    type="button"
                    onClick={() => setSelectedReward(index)}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className={`card-feature text-left transition-all duration-300 ${
                      isActive ? 'ring-2 ring-accent' : 'hover:ring-1 hover:ring-accent/40'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-2xl ${reward.color} flex items-center justify-center mb-5`}>
                      <reward.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{reward.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{reward.description}</p>
                    <div className="text-sm font-medium text-accent bg-accent/5 rounded-lg px-3 py-2">
                      Example: {reward.example}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Live preview panel */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-24"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                Preview
              </p>
              <div className="bg-card border border-border rounded-2xl p-8 text-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedReward}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className={`w-16 h-16 rounded-2xl ${activeReward.color} flex items-center justify-center mx-auto mb-5`}>
                      <activeReward.icon className="w-7 h-7" />
                    </div>
                    <div className="text-3xl font-bold text-accent mb-1">{activeReward.preview.badge}</div>
                    <p className="text-muted-foreground mb-4">{activeReward.preview.sub}</p>
                    <span className="inline-block text-xs font-medium px-3 py-1.5 rounded-full bg-accent/10 text-accent">
                      {activeReward.preview.tone}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Program Comparison — cards with real comparison meters instead of a flat table */}
      <section className="section-padding pt-12 pb-10">
        <div className="container-wide">
          <SectionHeading
            title="Choose Your Loyalty Structure"
            description="Different programs work for different businesses. Tap one to compare."
          />

          <div className="grid md:grid-cols-3 gap-5 mb-8">
            {programExamples.map((program, index) => {
              const isActive = index === selectedProgram;
              return (
                <button
                  key={program.name}
                  onClick={() => setSelectedProgram(index)}
                  className={`text-left rounded-2xl border p-6 transition-all duration-300 ${
                    isActive
                      ? 'border-accent bg-accent/5'
                      : 'border-border bg-card hover:border-accent/40'
                  }`}
                >
                  <h3 className="font-semibold text-lg mb-1">{program.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{program.description}</p>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Retention</span>
                        <span>{program.retention}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                        <motion.div
                          className="h-full bg-accent rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${program.retentionScore}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Complexity</span>
                        <span>{program.complexity}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                        <motion.div
                          className="h-full bg-olive rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${program.complexityScore}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6 }}
                        />
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProgram}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="bg-secondary/40 border border-border rounded-2xl p-6 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <Star className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-semibold mb-1">Best for: {activeProgram.name}</p>
                <p className="text-muted-foreground text-sm">{activeProgram.bestFor}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Benefits Section — count-up stats */}
      <section className="section-padding pt-12 pb-10 bg-primary text-primary-foreground">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="heading-lg mb-6"
            >
              Why Loyalty Programs Work
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-primary-foreground/70"
            >
              The numbers speak for themselves — loyalty programs create measurable impact.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <StatBlock key={benefit.title} {...benefit} />
            ))}
          </div>
        </div>
      </section>

      {/* NEW: ROI Calculator — ties the stats above to the visitor's own numbers */}
      <section className="section-padding pt-12 pb-10 bg-secondary/30">
        <div className="container-wide">
          <SectionHeading
            title="See the Potential Impact"
            description="Drag the sliders to match your shop, and see what a loyalty program could add."
          />

          <div className="grid lg:grid-cols-2 gap-10 items-center bg-card border border-border rounded-3xl p-8 md:p-10">
            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-medium text-sm">Monthly Customers</label>
                  <span className="font-semibold text-accent">{monthlyCustomers}</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={1000}
                  step={10}
                  value={monthlyCustomers}
                  onChange={(e) => setMonthlyCustomers(Number(e.target.value))}
                  className="w-full accent-accent"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-medium text-sm">Average Order Value</label>
                  <span className="font-semibold text-accent">₹{avgOrderValue}</span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={3000}
                  step={50}
                  value={avgOrderValue}
                  onChange={(e) => setAvgOrderValue(Number(e.target.value))}
                  className="w-full accent-accent"
                />
              </div>
            </div>

            <div className="text-center bg-gradient-to-br from-card to-secondary rounded-2xl p-8 border border-border">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                Estimated Monthly Uplift
              </p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={estimatedUplift}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-4xl md:text-5xl font-bold text-accent"
                >
                  ₹{estimatedUplift.toLocaleString('en-IN')}
                </motion.p>
              </AnimatePresence>
              <p className="text-xs text-muted-foreground mt-4">
                Illustrative estimate based on typical repeat-visit and spending
                patterns — not a guarantee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Win-Win Section */}
      <section className="section-padding pt-12 pb-10">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-card to-secondary rounded-3xl p-8 md:p-10"
            >
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-accent" />
              </div>
              <h3 className="heading-md mb-4">For Customers</h3>
              <ul className="space-y-4">
                {[
                  'Feel valued and appreciated',
                  "Save money on purchases they'd make anyway",
                  'Get exclusive access and early deals',
                  'Enjoy personalized experiences',
                  'Part of a community they care about',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-primary text-primary-foreground rounded-3xl p-8 md:p-10"
            >
              <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-accent-foreground" />
              </div>
              <h3 className="heading-md mb-4">For Your Business</h3>
              <ul className="space-y-4">
                {[
                  'Increased customer lifetime value',
                  'Predictable, recurring revenue',
                  'Lower customer acquisition costs',
                  'Rich customer data and insights',
                  'Competitive advantage in your market',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-primary-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding pt-12 pb-10 bg-secondary/30">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Gift className="w-16 h-16 text-accent mx-auto mb-6" />
            <h2 className="heading-lg mb-6">Ready to Reward Your Customers?</h2>
            <p className="body-lg mb-10 max-w-2xl mx-auto">
              Start building a loyalty program that creates genuine value for your
              customers while driving sustainable growth for your business.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/community" className="btn-accent group">
                Start From the Beginning
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link to="/" className="btn-outline group">
                Back to Home
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default LoyaltySystems; 