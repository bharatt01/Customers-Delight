import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  MessageCircle, 
  Users, 
  Bell, 
  Heart, 
  TrendingUp,
  CheckCircle,
  Smartphone,
  Share2
} from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import FeatureCard from '@/components/ui/FeatureCard';

const benefits = [
  {
    icon: MessageCircle,
    title: 'Direct Communication',
    description: 'Reach your customers instantly through WhatsApp groups and broadcast lists.',
  },
  {
    icon: Bell,
    title: 'Stay Top of Mind',
    description: 'Regular updates keep your business at the forefront when customers are ready to buy.',
  },
  {
    icon: Heart,
    title: 'Build Emotional Connection',
    description: 'Create a sense of belonging that transforms transactions into relationships.',
  },
  {
    icon: TrendingUp,
    title: 'Increase Repeat Sales',
    description: 'Community members visit more often and spend more per visit.',
  },
];

const steps = [
  {
    step: '01',
    title: 'Capture Walk-in Customers',
    description: 'Simple sign-up process that takes seconds. QR codes, tablet sign-ups, or staff-assisted registration.',
    details: ['QR code at checkout', 'Staff-assisted sign-up', 'Incentivized registration'],
  },
  {
    step: '02',
    title: 'Welcome to the Community',
    description: 'Automated welcome messages that make customers feel valued from day one.',
    details: ['Personalized welcome message', 'Exclusive member benefits', 'Community guidelines'],
  },
  {
    step: '03',
    title: 'Engage Regularly',
    description: 'Share updates, deals, and valuable content that keeps your community active and engaged.',
    details: ['Weekly deals & offers', 'Behind-the-scenes content', 'Member-only announcements'],
  },
  {
    step: '04',
    title: 'Convert to Repeat Buyers',
    description: 'Turn engaged community members into loyal, repeat customers who advocate for your business.',
    details: ['Exclusive discounts', 'Early access to new products', 'Referral rewards'],
  },
];

const Community = () => {
  return (
    <>
      {/* Hero Section */}
<section className="section-padding pt-4 md:pt-8 pb-8 md:pb-12">


        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
         
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="heading-xl mb-6"
              >
                Build a Loyal
                <br />
                <span className="text-gradient-accent">Customer Community</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="body-lg mb-8"
              >
                Transform walk-in customers into a thriving community. Use WhatsApp groups 
                and direct messaging to stay connected, share deals, and keep your business 
                top of mind.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/prime-members" className="btn-accent group">
                  Start Building
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link to="/digital-presence" className="btn-outline">
                  See Examples
                </Link>
              </motion.div>
            </div>
            
            {/* Visual Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-card to-secondary rounded-3xl p-8 md:p-12">
                {/* Phone mockup */}
                <div className="relative mx-auto w-64 md:w-72">
                  <div className="bg-primary rounded-[2.5rem] p-3 shadow-lg">
                    <div className="bg-card rounded-[2rem] overflow-hidden">
                      {/* Status bar */}
                      <div className="bg-secondary px-4 py-2 flex justify-between items-center">
                        <span className="text-xs font-medium">9:41</span>
                        <div className="flex gap-1">
                          <div className="w-4 h-2 bg-foreground/30 rounded-sm" />
                          <div className="w-4 h-2 bg-foreground/30 rounded-sm" />
                        </div>
                      </div>
                      
                      {/* Chat header */}
                      <div className="bg-accent/10 px-4 py-3 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                          <Users className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm">VIP Customers</div>
                          <div className="text-xs text-muted-foreground">247 members</div>
                        </div>
                      </div>
                      
                      {/* Messages */}
                      <div className="p-4 space-y-3 min-h-[200px]">
                        <div className="bg-secondary rounded-2xl rounded-tl-sm p-3 max-w-[80%]">
                          <p className="text-sm">🎉 Flash Sale Today! 30% off all items until 6pm</p>
                          <span className="text-xs text-muted-foreground">10:30 AM</span>
                        </div>
                        <div className="bg-accent/10 rounded-2xl rounded-tr-sm p-3 max-w-[80%] ml-auto">
                          <p className="text-sm">Amazing! Coming in now 🏃‍♂️</p>
                          <span className="text-xs text-muted-foreground">10:32 AM</span>
                        </div>
                        <div className="bg-secondary rounded-2xl rounded-tl-sm p-3 max-w-[80%]">
                          <p className="text-sm">New arrivals just landed! Check them out 👀</p>
                          <span className="text-xs text-muted-foreground">2:15 PM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating badges */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-4 -right-4 bg-card shadow-md rounded-xl px-4 py-2 flex items-center gap-2"
                >
                  <TrendingUp className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium">+47% retention</span>
                </motion.div>
                
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-4 -left-4 bg-card shadow-md rounded-xl px-4 py-2 flex items-center gap-2"
                >
                  <Heart className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium">92% satisfaction</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
    <section className="section-padding bg-secondary/30 pt-6 md:pt-10 pb-10 md:pb-14">

        <div className="container-wide">
          <SectionHeading
            
            title="Why Build a Customer Community?"
            description="A community creates a direct line to your customers, bypassing social media algorithms and building genuine relationships."
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <FeatureCard
                key={benefit.title}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
  <section className="section-padding py-12 bg-secondary/30">

        <div className="container-wide">
          <SectionHeading
           
            title="From Walk-in to Community Member"
            description="A simple, proven process that turns every customer visit into a lasting relationship."
          />
          
          <div className="space-y-8 lg:space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1">
                  <span className="text-6xl md:text-7xl font-bold text-accent/20">
                    {step.step}
                  </span>
                  <h3 className="heading-md mt-2 mb-4">{step.title}</h3>
                  <p className="body-md mb-6">{step.description}</p>
                  <ul className="space-y-3">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                        <span className="text-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex-1 w-full max-w-md">
                  <div className="bg-gradient-to-br from-card to-secondary rounded-2xl p-8 aspect-square flex items-center justify-center">
                    {index === 0 && <Smartphone className="w-24 h-24 text-accent/30" />}
                    {index === 1 && <MessageCircle className="w-24 h-24 text-accent/30" />}
                    {index === 2 && <Share2 className="w-24 h-24 text-accent/30" />}
                    {index === 3 && <Heart className="w-24 h-24 text-accent/30" />}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
<section className="section-padding pt-12 pb-12 bg-primary text-primary-foreground">

        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-lg mb-6">
              Ready to Build Your Community?
            </h2>
            <p className="text-lg md:text-xl text-primary-foreground/70 mb-10 max-w-2xl mx-auto">
              Start connecting with your customers in a way that feels personal, 
              direct, and genuinely valuable to both sides.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/prime-members" className="btn-accent group">
                Next: Prime Members
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Community;
