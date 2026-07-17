import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
  children?: ReactNode;
  variant?: 'default' | 'accent' | 'dark';
}

const variantStyles = {
  default: 'card-feature',
  accent: 'bg-accent/5 border border-accent/20 rounded-2xl p-8 hover:bg-accent/10 transition-all duration-500',
  dark: 'bg-primary text-primary-foreground rounded-2xl p-8 hover:shadow-lg transition-all duration-500',
};

const iconVariantStyles = {
  default: 'bg-secondary text-foreground',
  accent: 'bg-accent/20 text-accent',
  dark: 'bg-primary-foreground/10 text-primary-foreground',
};

export const FeatureCard = ({
  icon: Icon,
  title,
  description,
  index = 0,
  children,
  variant = 'default',
}: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={variantStyles[variant]}
    >
      <div className={`w-14 h-14 rounded-xl ${iconVariantStyles[variant]} flex items-center justify-center mb-6`}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className={`heading-sm mb-3 ${variant === 'dark' ? 'text-primary-foreground' : ''}`}>
        {title}
      </h3>
      <p className={`body-md ${variant === 'dark' ? 'text-primary-foreground/70' : ''}`}>
        {description}
      </p>
      {children}
    </motion.div>
  );
};

export default FeatureCard;
