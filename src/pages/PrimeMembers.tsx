import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Crown, 
  Star, 
  Shield, 
  Gift,
  Users,
  TrendingUp,
  Sparkles,
  BadgeCheck,
  Gem,
  Zap
} from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

const membershipTiers = [
  {
    name: 'Essential',
    icon: Star,
    price: 'Free',
    description: 'Basic community access',
    features: [
      'Community group access',
      'Weekly updates & news',
      'Basic discounts (5-10%)',
      'Birthday rewards',
    ],
    highlighted: false,
  },
  {
    name: 'Prime',
    icon: Crown,
    price: 'Paid',
    description: 'Enhanced benefits & priority',
    features: [
      'Everything in Essential',
      'Priority service',
      'Exclusive discounts (15-25%)',
      'Early access to new products',
      'Member-only events',
      'Free delivery/services',
    ],
    highlighted: true,
  },
  {
    name: 'VIP',
    icon: Gem,
    price: 'Invite-only',
    description: 'Ultimate exclusivity',
    features: [
      'Everything in Prime',
      'Personal account manager',
      'Custom offerings',
      'Highest tier discounts',
      'Exclusive experiences',
      'First access to everything',
    ],
    highlighted: false,
  },
];

const conversionSteps = [
  {
    icon: Users,
    title: 'Enquiry',
    description: 'Customer shows interest in your product or service',
  },
  {
    icon: Sparkles,
    title: 'Experience',
    description: 'Deliver exceptional first experience that creates desire',
  },
  {
    icon: Gift,
    title: 'Offer',
    description: 'Present Prime membership with clear value proposition',
  },
  {
    icon: BadgeCheck,
    title: 'Convert',
    description: 'Customer becomes a Prime member with ongoing benefits',
  },
  {
    icon: TrendingUp,
    title: 'Retain',
    description: 'Continuous engagement keeps them coming back',
  },
];

const benefits = [
  {
    icon: Shield,
    title: 'Predictable Revenue',
    description: 'Monthly membership fees create stable, recurring income you can count on.',
  },
  {
    icon: TrendingUp,
    title: 'Higher Lifetime Value',
    description: 'Prime members spend 3-5x more over their lifetime than regular customers.',
  },
  {
    icon: Zap,
    title: 'Faster Decision Making',
    description: 'Members don\'t shop around — they come to you first, every time.',
  },
  {
    icon: Crown,
    title: 'Brand Advocates',
    description: 'Prime members actively refer friends and family to your business.',
  },
];

const PrimeMembers = () => {
  return (
    <>
      {/* Hero Section */}
<section className="section-padding pt-18 pb-16 md:pt-24 md:pb-20">

        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center">
          
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="heading-xl mb-6"
            >
              Convert Enquiries Into
              <br />
              <span className="text-gradient-accent">Prime Members</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="body-lg mb-10 max-w-2xl mx-auto"
            >
              Create an exclusive membership ecosystem that transforms one-time 
              enquiries into long-term, high-value customer relationships with 
              predictable recurring revenue.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link to="/digital-presence" className="btn-accent group">
                Create Your Tiers
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link to="/community" className="btn-outline">
                See Community First
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="section-padding  pt-12 pb-10 bg-secondary/30">
   <div className="container-wide">

          <SectionHeading
        f
            title="Design Your Membership Structure"
            description="Create tiered membership levels that match your customers' needs and drive increasing engagement."
          />
          
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {membershipTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`rounded-2xl p-8 ${
                  tier.highlighted 
                    ? 'bg-primary text-primary-foreground ring-2 ring-accent shadow-lg scale-[1.02]' 
                    : 'bg-card border border-border'
                }`}
              >
                <div className={`w-14 h-14 rounded-xl ${
                  tier.highlighted ? 'bg-accent' : 'bg-accent/10'
                } flex items-center justify-center mb-6`}>
                  <tier.icon className={`w-7 h-7 ${
                    tier.highlighted ? 'text-accent-foreground' : 'text-accent'
                  }`} />
                </div>
                
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-1">{tier.name}</h3>
                  <p className={`text-sm ${
                    tier.highlighted ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  }`}>
                    {tier.description}
                  </p>
                </div>
                
                <div className={`text-3xl font-bold mb-6 ${
                  tier.highlighted ? 'text-accent' : 'text-foreground'
                }`}>
                  {tier.price}
                </div>
                
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Star className={`w-4 h-4 mt-1 flex-shrink-0 ${
                        tier.highlighted ? 'text-accent' : 'text-accent'
                      }`} />
                      <span className={`text-sm ${
                        tier.highlighted ? 'text-primary-foreground/90' : 'text-foreground'
                      }`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Conversion Journey */}
      <section className="section-padding  pt-12 pb-10">
        <div className="container-wide">
          <SectionHeading
        
            title="From Enquiry to Prime Member"
            description="A clear path that guides potential customers towards becoming loyal Prime members."
          />
          
          <div className="relative">
            {/* Connection line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border hidden lg:block" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {conversionSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center mx-auto mb-4 relative z-10">
                    <step.icon className="w-7 h-7 text-accent" />
                  </div>
                  <span className="text-xs font-medium text-accent mb-2 block">
                    Step {index + 1}
                  </span>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="section-padding  pt-12 pb-10 bg-primary text-primary-foreground">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
          
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="heading-lg mb-6"
            >
              Why Prime Membership Works
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-primary-foreground/70"
            >
              Membership programs create win-win relationships that benefit both 
              your business and your customers.
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-primary-foreground/5 rounded-2xl p-8 border border-primary-foreground/10"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center mb-6">
                  <benefit.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-primary-foreground/70">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding  pt-12 pb-10">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-lg mb-6">
              Ready to Create Your Membership Program?
            </h2>
            <p className="body-lg mb-10 max-w-2xl mx-auto">
              Start building a membership ecosystem that creates lasting value 
              for your customers and predictable growth for your business.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/digital-presence" className="btn-accent group">
                Next: Digital Presence
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default PrimeMembers;
