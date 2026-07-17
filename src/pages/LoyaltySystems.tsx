import { motion } from 'framer-motion';
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
  ArrowUpRight
} from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

const rewardTypes = [
  {
    icon: Percent,
    title: 'Percentage Discounts',
    description: 'Simple, effective discounts that customers understand instantly.',
    example: '15% off next purchase',
    color: 'bg-accent/10 text-accent',
  },
  {
    icon: Ticket,
    title: 'Exclusive Coupons',
    description: 'Limited-time offers that create urgency and exclusivity.',
    example: 'Flash sale access',
    color: 'bg-olive/10 text-olive',
  },
  {
    icon: Coins,
    title: 'Points System',
    description: 'Earn points on every purchase, redeem for rewards.',
    example: '1 point per $1 spent',
    color: 'bg-plum/10 text-plum',
  },
  {
    icon: Gift,
    title: 'Free Items/Services',
    description: 'Surprise and delight with complimentary offerings.',
    example: 'Free dessert on 5th visit',
    color: 'bg-accent/10 text-accent',
  },
];

const programExamples = [
  {
    name: 'Stamp Card',
    description: 'Buy 9, get 1 free',
    frequency: 'Every visit',
    retention: 'High',
    complexity: 'Simple',
  },
  {
    name: 'Points Rewards',
    description: 'Earn & redeem points',
    frequency: 'Ongoing',
    retention: 'Very High',
    complexity: 'Medium',
  },
  {
    name: 'Tier System',
    description: 'Bronze → Silver → Gold',
    frequency: 'Quarterly',
    retention: 'Highest',
    complexity: 'Advanced',
  },
];

const benefits = [
  {
    icon: Repeat,
    stat: '2.5x',
    title: 'More Frequent Visits',
    description: 'Loyalty members visit significantly more often than non-members.',
  },
  {
    icon: TrendingUp,
    stat: '67%',
    title: 'Higher Spending',
    description: 'Members spend more per visit when working toward rewards.',
  },
  {
    icon: Heart,
    stat: '80%',
    title: 'Emotional Connection',
    description: 'Rewards create positive feelings that strengthen brand loyalty.',
  },
  {
    icon: Users,
    stat: '3x',
    title: 'Word of Mouth',
    description: 'Happy members actively refer friends and family.',
  },
];

const LoyaltySystems = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="section-padding  pt-12 pb-10">
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

      {/* Reward Types */}
      <section className="section-padding bg-secondary/30  pt-12 pb-10">
        <div className="container-wide">
          <SectionHeading
       
       
            title="Rewards That Work"
            description="Choose from proven reward mechanics that motivate customers to return."
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rewardTypes.map((reward, index) => (
              <motion.div
                key={reward.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card-feature text-center"
              >
                <div className={`w-16 h-16 rounded-2xl ${reward.color} flex items-center justify-center mx-auto mb-6`}>
                  <reward.icon className="w-7 h-7" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{reward.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{reward.description}</p>
                <div className="text-sm font-medium text-accent bg-accent/5 rounded-lg px-3 py-2">
                  Example: {reward.example}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Comparison */}
      <section className="section-padding  pt-12 pb-10">
        <div className="container-wide">
          <SectionHeading
        
            title="Choose Your Loyalty Structure"
            description="Different programs work for different businesses. Find the one that fits your model."
          />
          
          <div className="overflow-x-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="min-w-[600px]"
            >
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                {/* Header */}
                <div className="grid grid-cols-5 gap-4 p-4 md:p-6 bg-secondary/50 font-semibold text-sm">
                  <div>Program</div>
                  <div>How It Works</div>
                  <div>Engagement</div>
                  <div>Retention</div>
                  <div>Complexity</div>
                </div>
                
                {/* Rows */}
                {programExamples.map((program, index) => (
                  <div 
                    key={program.name}
                    className={`grid grid-cols-5 gap-4 p-4 md:p-6 ${
                      index !== programExamples.length - 1 ? 'border-b border-border' : ''
                    }`}
                  >
                    <div className="font-semibold">{program.name}</div>
                    <div className="text-muted-foreground">{program.description}</div>
                    <div>{program.frequency}</div>
                    <div>
                      <span className={`text-sm font-medium px-2 py-1 rounded ${
                        program.retention === 'Highest' 
                          ? 'bg-accent/10 text-accent' 
                          : program.retention === 'Very High'
                          ? 'bg-olive/10 text-olive'
                          : 'bg-secondary text-foreground'
                      }`}>
                        {program.retention}
                      </span>
                    </div>
                    <div className="text-muted-foreground">{program.complexity}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
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
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-primary-foreground/5 rounded-2xl p-6 border border-primary-foreground/10 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-5 h-5 text-accent" />
                </div>
                <div className="text-4xl font-bold text-accent mb-2">{benefit.stat}</div>
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-primary-foreground/70">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Win-Win Section */}
      <section className="section-padding  pt-12 pb-10">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Customer Benefits */}
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
                  'Save money on purchases they\'d make anyway',
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

            {/* Business Benefits */}
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
      <section className="section-padding  pt-12 pb-10 bg-secondary/30">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Gift className="w-16 h-16 text-accent mx-auto mb-6" />
            <h2 className="heading-lg mb-6">
              Ready to Reward Your Customers?
            </h2>
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
