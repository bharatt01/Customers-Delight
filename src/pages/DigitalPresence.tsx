import { motion } from 'framer-motion';
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
  BadgeCheck
} from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

const trustElements = [
  {
    icon: Building2,
    title: 'Google Business Profile',
    description: 'Your digital storefront that appears in local searches and Google Maps.',
    importance: 'Critical',
  },
  {
    icon: Globe,
    title: 'Professional Website',
    description: 'A fast, mobile-friendly website that converts visitors into customers.',
    importance: 'Essential',
  },
  {
    icon: MapPin,
    title: 'Local Listings',
    description: 'Consistent presence across directories, maps, and review platforms.',
    importance: 'Important',
  },
  {
    icon: Star,
    title: 'Reviews & Ratings',
    description: 'Social proof that builds trust and influences buying decisions.',
    importance: 'High Impact',
  },
];

const trustFlow = [
  { label: 'Trust', icon: Shield, description: 'Customers trust verified, visible businesses' },
  { label: 'Discovery', icon: Search, description: 'They find you when searching for solutions' },
  { label: 'Visit', icon: Users, description: 'Trust leads to visits and enquiries' },
  { label: 'Purchase', icon: TrendingUp, description: 'Confidence converts to sales' },
];

const checklist = [
  { item: 'Claimed Google Business Profile', category: 'Foundation' },
  { item: 'Accurate business information everywhere', category: 'Foundation' },
  { item: 'Professional photos of business/products', category: 'Visual Trust' },
  { item: 'Consistent NAP (Name, Address, Phone)', category: 'SEO' },
  { item: 'Mobile-friendly website', category: 'Website' },
  { item: 'Fast loading speed (<3 seconds)', category: 'Website' },
  { item: 'Clear call-to-action buttons', category: 'Website' },
  { item: 'Active review management', category: 'Reputation' },
  { item: 'Regular post/update schedule', category: 'Engagement' },
  { item: 'Local directory listings', category: 'SEO' },
];

const DigitalPresence = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="section-padding  pt-12 pb-10">
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
            
            {/* Trust Flow Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-card to-secondary rounded-3xl p-8 md:p-10">
                <div className="text-center mb-8">
                  <span className="tag mb-2">The Trust Flow</span>
                  <h3 className="heading-sm">How Digital Presence Drives Revenue</h3>
                </div>
                
                <div className="space-y-4">
                  {trustFlow.map((step, index) => (
                    <motion.div
                      key={step.label}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center gap-4 bg-background rounded-xl p-4"
                    >
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <step.icon className="w-5 h-5 text-accent" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">{step.label}</div>
                        <div className="text-sm text-muted-foreground">{step.description}</div>
                      </div>
                      {index < trustFlow.length - 1 && (
                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Elements Grid */}
      <section className="section-padding bg-secondary/30  pt-12 pb-10">
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
                className="card-feature"
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
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

      {/* Checklist Section */}
      <section className="section-padding  pt-12 pb-10">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <SectionHeading
                align="left"
            
                title="Is Your Digital Presence Complete?"
                description="Use this checklist to identify gaps in your online presence and prioritize improvements."
              />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link 
                  to="/loyalty-systems" 
                  className="btn-accent group inline-flex"
                >
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
              <div className="space-y-3">
                {checklist.map((item, index) => (
                  <motion.div
                    key={item.item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 transition-colors group"
                  >
                    <div className="w-6 h-6 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-colors">
                      <CheckCircle className="w-4 h-4 text-transparent group-hover:text-accent transition-colors" />
                    </div>
                    <span className="flex-1">{item.item}</span>
                    <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded">
                      {item.category}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-primary text-primary-foreground  pt-12 pb-10">
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
              { stat: '97%', label: 'of consumers search online for local businesses' },
              { stat: '88%', label: 'trust online reviews as much as personal recommendations' },
              { stat: '76%', label: 'visit a business within a day of searching' },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl md:text-6xl font-bold text-accent mb-4">
                  {item.stat}
                </div>
                <p className="text-primary-foreground/70">{item.label}</p>
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
            <BadgeCheck className="w-16 h-16 text-accent mx-auto mb-6" />
            <h2 className="heading-lg mb-6">
              Ready to Be Found?
            </h2>
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
