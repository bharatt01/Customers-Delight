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
    image: '/Images/walking-customer.jpg',
  },
  {
    step: '02',
    title: 'Welcome to the Community',
    description: 'Automated welcome messages that make customers feel valued from day one.',
    details: ['Personalized welcome message', 'Exclusive member benefits', 'Community guidelines'],
    image: '/Images/community.jpg',
  },
  {
    step: '03',
    title: 'Engage Regularly',
    description: 'Share updates, deals, and valuable content that keeps your community active and engaged.',
    details: ['Weekly deals & offers', 'Behind-the-scenes content', 'Member-only announcements'],
    image: '/Images/engage.jpg',
  },
  {
    step: '04',
    title: 'Convert to Repeat Buyers',
    description: 'Turn engaged community members into loyal, repeat customers who advocate for your business.',
    details: ['Exclusive discounts', 'Early access to new products', 'Referral rewards'],
    image: '/Images/convert.jpg',
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
                <div className="relative mx-auto w-60 md:w-64">
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
   {/* Benefits Section */}
<section className="section-padding bg-secondary/30 pt-6 md:pt-10 pb-10 md:pb-14 relative overflow-hidden">

  {/* faint dot texture so the section isn't a flat block of color */}
  <div
    className="absolute inset-0 opacity-40 pointer-events-none"
    style={{
      backgroundImage: 'radial-gradient(currentColor 0.6px, transparent 0.6px)',
      backgroundSize: '20px 20px',
      color: 'hsl(var(--foreground) / 0.06)',
      maskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, black 30%, transparent 85%)',
    }}
  />

  <div className="container-wide relative">
    <SectionHeading
      title="Why Build a Customer Community?"
      description="A community creates a direct line to your customers, bypassing social media algorithms and building genuine relationships."
    />

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {benefits.map((benefit, index) => {
        const Icon = benefit.icon;
        // Warm, distinct hue per card — same family as the chat bubbles above
        const palettes = [
          { bg: '#FDEEE1', ring: '#E8792C', text: '#B85A1A' }, // orange
          { bg: '#FBE9E3', ring: '#B5472B', text: '#8F3620' }, // terracotta
          { bg: '#F3EBFB', ring: '#8B5CB0', text: '#6B3F8C' }, // plum
          { bg: '#EEF1E2', ring: '#6B7A3A', text: '#525E2C' }, // moss
        ];
        const p = palettes[index % palettes.length];

        return (
          <motion.div
            key={benefit.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            whileHover={{ y: -4 }}
            className="relative bg-card rounded-2xl border border-border/60 p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            {/* icon bubble, styled like a chat message from the hero mockup */}
            <div
              className="relative w-12 h-12 rounded-2xl rounded-tl-sm flex items-center justify-center mb-5"
              style={{ backgroundColor: p.bg }}
            >
              <Icon className="w-5 h-5" style={{ color: p.ring }} strokeWidth={2} />
            </div>

            <h3 className="font-semibold text-base tracking-tight mb-2 text-foreground">
              {benefit.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {benefit.description}
            </p>

            <span
              className="absolute top-6 right-6 font-mono text-[11px] font-bold opacity-30"
              style={{ color: p.ring }}
            >
              0{index + 1}
            </span>

            {/* bottom accent line, appears on hover */}
            <div
              className="absolute bottom-0 left-6 right-6 h-[2px] scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-left"
              style={{ backgroundColor: p.ring }}
            />
          </motion.div>
        );
      })}
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
                <div className="overflow-hidden rounded-2xl shadow-lg aspect-square">
  <img
    src={step.image}
    alt={step.title}
    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
  />
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
