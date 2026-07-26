import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CreditCard,
  Users,
  Dumbbell,
  ShoppingBag,
  GraduationCap,
  Store,
  Check,
  Sparkles,
  Heart,
  Calendar,
  IndianRupee,
  RotateCw,
} from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

const familyRelations = [
  { id: 'mother', label: 'Mother' },
  { id: 'father', label: 'Father' },
  { id: 'child', label: 'Son / Daughter' },
  { id: 'sibling', label: 'Brother / Sister' },
];

const partnerCategories = [
  { icon: Dumbbell, title: 'Gyms & Fitness', description: 'Discounted memberships at partner gyms and studios.' },
  { icon: ShoppingBag, title: 'Local Shops', description: 'Save on everyday purchases at partner retailers.' },
  { icon: GraduationCap, title: 'Schools & Coaching', description: 'Reduced fees at partner schools and coaching centers.' },
  { icon: Store, title: 'Other Stores', description: 'A growing network of stores across categories.' },
];

// Illustrative discount assumptions for the calculator — clearly labeled to the user.
const DISCOUNT_ASSUMPTIONS = {
  gym: 0.2,
  shopping: 0.12,
  school: 0.08,
};

const PrimeMembers = () => {
  const [flipped, setFlipped] = useState(false);
  const [selectedRelations, setSelectedRelations] = useState<string[]>(['mother', 'father']);
  const [activeMonth, setActiveMonth] = useState(3);

  const [gymSpend, setGymSpend] = useState(1500);
  const [shoppingSpend, setShoppingSpend] = useState(4000);
  const [schoolSpend, setSchoolSpend] = useState(3000);

  const toggleRelation = (id: string) => {
    setSelectedRelations((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const monthlyCost = activeMonth <= 6 ? 0 : 99;

  const estimatedMonthlySavings = useMemo(() => {
    return Math.round(
      gymSpend * DISCOUNT_ASSUMPTIONS.gym +
        shoppingSpend * DISCOUNT_ASSUMPTIONS.shopping +
        schoolSpend * DISCOUNT_ASSUMPTIONS.school
    );
  }, [gymSpend, shoppingSpend, schoolSpend]);

  return (
    <>
      {/* Hero Section */}
      <section className="section-padding pt-18 pb-16 md:pt-24 md:pb-20">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium"
            >
              <Sparkles className="w-4 h-4" />
              One Card. One Family. Real Savings.
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="heading-xl mb-6"
            >
              The Prime Card That
              <br />
              <span className="text-gradient-accent">Pays for Itself</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="body-lg mb-10 max-w-2xl mx-auto"
            >
              A single exclusive card your whole family can use — at gyms,
              local shops, schools, and more. One card, thousands saved.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <a href="#get-card" className="btn-accent group">
                Get Your Prime Card
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <Link to="/community" className="btn-outline">
                See Community First
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* THE CARD — flippable, the centerpiece since there's only one product */}
      <section id="get-card" className="section-padding pt-12 pb-16 bg-secondary/30">
        <div className="container-wide">
          <SectionHeading
            title="Meet Your Prime Card"
            description="Tap the card to see exactly what's included — no fine print hiding anywhere."
          />

          <div className="flex flex-col items-center">
            <div
              className="relative w-full max-w-md aspect-[1.6/1] cursor-pointer select-none"
              style={{ perspective: 1400 }}
              onClick={() => setFlipped((f) => !f)}
            >
              <motion.div
                className="relative w-full h-full"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              >
                {/* FRONT */}
                <div
                  className="absolute inset-0 rounded-3xl bg-primary text-primary-foreground p-8 flex flex-col justify-between shadow-xl"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-primary-foreground/60 mb-1">
                        Customers Delight
                      </p>
                      <p className="text-xl font-bold">Prime Family Card</p>
                    </div>
                    <CreditCard className="w-8 h-8 text-accent" />
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs text-primary-foreground/60 mb-1">One-time price</p>
                      <p className="text-4xl font-bold text-accent">₹2,000</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-primary-foreground/60 mb-1">Valid for</p>
                      <p className="text-lg font-semibold">10 Months</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-primary-foreground/50 mt-2">
                    <RotateCw className="w-3.5 h-3.5" />
                    Tap to see what's included
                  </div>
                </div>

                {/* BACK */}
                <div
                  className="absolute inset-0 rounded-3xl bg-card border border-border p-8 flex flex-col justify-center shadow-xl"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      <span>One card covers one family — parents, children, and siblings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      <span>Not transferable to friends or extended contacts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      <span>First 6 months included in the ₹2,000 price</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      <span>₹99/month to stay active through month 10</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              Real card design shown at pickup — this is a preview of the terms.
            </p>
          </div>
        </div>
      </section>

      {/* FAMILY ELIGIBILITY — interactive selector */}
      <section className="section-padding pt-12 pb-10">
        <div className="container-wide">
          <SectionHeading
            title="Built for Your Family, Not Your Friend Circle"
            description="One card, one household. Tap who's part of yours."
          />

          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {familyRelations.map((relation) => {
                const isSelected = selectedRelations.includes(relation.id);
                return (
                  <button
                    key={relation.id}
                    onClick={() => toggleRelation(relation.id)}
                    className={`relative rounded-2xl p-5 border-2 text-center transition-all duration-300 ${
                      isSelected
                        ? 'border-accent bg-accent/5'
                        : 'border-border bg-card hover:border-accent/40'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-accent text-accent-foreground' : 'bg-accent/10 text-accent'
                      }`}
                    >
                      <Users className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-medium">{relation.label}</p>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent flex items-center justify-center"
                      >
                        <Check className="w-3.5 h-3.5 text-accent-foreground" />
                      </motion.div>
                    )}
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedRelations.length}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="bg-secondary/40 border border-border rounded-2xl p-6 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <Heart className="w-5 h-5 text-accent" />
                </div>
                <p className="text-sm text-muted-foreground">
                  {selectedRelations.length === 0
                    ? 'Select the family members who\'ll use the card.'
                    : `All ${selectedRelations.length} selected — every one of them can use the same card. Friends and non-family contacts aren't eligible, by design.`}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* VALIDITY TIMELINE — interactive month picker */}
      <section className="section-padding pt-12 pb-10 bg-secondary/30">
        <div className="container-wide">
          <SectionHeading
            title="What You Pay, Month by Month"
            description="Drag through the 10-month validity to see exactly what's due when."
          />

          <div className="max-w-3xl mx-auto bg-card border border-border rounded-3xl p-8">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-5 h-5 text-accent" />
              <span className="font-semibold">Month {activeMonth} of 10</span>
            </div>

            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={activeMonth}
              onChange={(e) => setActiveMonth(Number(e.target.value))}
              className="w-full accent-accent mb-6"
            />

            <div className="grid grid-cols-10 gap-1 mb-8">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((month) => (
                <button
                  key={month}
                  onClick={() => setActiveMonth(month)}
                  className={`h-2 rounded-full transition-colors ${
                    month <= activeMonth
                      ? month <= 6
                        ? 'bg-accent'
                        : 'bg-olive'
                      : 'bg-secondary'
                  }`}
                  aria-label={`Month ${month}`}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={monthlyCost}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex items-center justify-between bg-secondary/40 rounded-2xl p-6"
              >
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {activeMonth <= 6 ? 'Covered by your ₹2,000 card' : 'Renewal charge this month'}
                  </p>
                  <p className="text-3xl font-bold text-accent flex items-center gap-1">
                    <IndianRupee className="w-6 h-6" />
                    {monthlyCost}
                  </p>
                </div>
                <div
                  className={`text-xs font-medium px-3 py-1.5 rounded-full ${
                    activeMonth <= 6 ? 'bg-accent/10 text-accent' : 'bg-olive/10 text-olive'
                  }`}
                >
                  {activeMonth <= 6 ? 'Included' : 'Active renewal'}
                </div>
              </motion.div>
            </AnimatePresence>

            <p className="text-xs text-muted-foreground mt-4">
              Months 1–6 are included in the initial ₹2,000. From month 7 through
              month 10, a ₹99 charge applies per card, per month.
            </p>
          </div>
        </div>
      </section>

      {/* WHERE YOU CAN USE IT */}
      <section className="section-padding pt-12 pb-10">
        <div className="container-wide">
          <SectionHeading
            title="Where the Card Works"
            description="A growing network of local partners across everyday categories."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnerCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="card-feature text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-5">
                  <category.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{category.title}</h3>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SAVINGS CALCULATOR */}
      <section className="section-padding pt-12 pb-16 bg-primary text-primary-foreground">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="heading-lg mb-4"
            >
              See What Your Family Could Save
            </motion.h2>
            <p className="text-primary-foreground/70">
              Move the sliders to match your family's monthly spending.
            </p>
          </div>

          <div className="max-w-3xl mx-auto grid lg:grid-cols-2 gap-10 items-center bg-primary-foreground/5 border border-primary-foreground/10 rounded-3xl p-8 md:p-10">
            <div className="space-y-7">
              <div>
                <div className="flex justify-between mb-2 text-sm">
                  <span>Gym / Fitness</span>
                  <span className="font-semibold text-accent">₹{gymSpend}/mo</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={5000}
                  step={100}
                  value={gymSpend}
                  onChange={(e) => setGymSpend(Number(e.target.value))}
                  className="w-full accent-accent"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2 text-sm">
                  <span>Local Shopping</span>
                  <span className="font-semibold text-accent">₹{shoppingSpend}/mo</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={15000}
                  step={250}
                  value={shoppingSpend}
                  onChange={(e) => setShoppingSpend(Number(e.target.value))}
                  className="w-full accent-accent"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2 text-sm">
                  <span>School / Coaching Fees</span>
                  <span className="font-semibold text-accent">₹{schoolSpend}/mo</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={10000}
                  step={250}
                  value={schoolSpend}
                  onChange={(e) => setSchoolSpend(Number(e.target.value))}
                  className="w-full accent-accent"
                />
              </div>
            </div>

            <div className="text-center bg-primary rounded-2xl p-8 border border-primary-foreground/10">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/50 mb-3">
                Estimated Monthly Savings
              </p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={estimatedMonthlySavings}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-4xl md:text-5xl font-bold text-accent"
                >
                  ₹{estimatedMonthlySavings.toLocaleString('en-IN')}
                </motion.p>
              </AnimatePresence>
              <p className="text-xs text-primary-foreground/50 mt-4">
                Illustrative estimate based on typical partner discounts — actual
                savings depend on which partners your family uses.
              </p>
              <div className="mt-6 pt-6 border-t border-primary-foreground/10 text-sm text-primary-foreground/70">
                Card renewal after month 6: <span className="text-accent font-semibold">just ₹99/mo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding pt-12 pb-16">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <CreditCard className="w-16 h-16 text-accent mx-auto mb-6" />
            <h2 className="heading-lg mb-6">One Card. Your Whole Family. Ready?</h2>
            <p className="body-lg mb-10 max-w-2xl mx-auto">
              ₹2,000 gets your family six months of savings across gyms, shops,
              and schools — with an easy ₹99/month to keep it going after that.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#get-card" className="btn-accent group">
                Get Your Prime Card — ₹2,000
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <Link to="/" className="btn-outline">
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default PrimeMembers;