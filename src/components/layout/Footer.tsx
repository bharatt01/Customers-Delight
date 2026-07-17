import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';

const footerLinks = {
  solutions: [
    { name: 'Customer Community', path: '/community' },
    { name: 'Prime Members', path: '/prime-members' },
    { name: 'Digital Presence', path: '/digital-presence' },
    { name: 'Loyalty Systems', path: '/loyalty-systems' },
  ],
  company: [
    { name: 'About Us', path: '/#about' },
    { name: 'Our Approach', path: '/#approach' },
    { name: 'Success Stories', path: '/#stories' },
    { name: 'Contact', path: '/#contact' },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
<div className="container-wide section-padding pt-12 pb-10">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl  flex items-center justify-center">
               <img src="/favicon.png" alt="" />
              </div>
              <span className="font-bold text-xl">CustomerDelight</span>
            </Link>
            <p className="text-primary-foreground/70 mb-6 max-w-xs">
              Helping local businesses build lasting customer relationships and sustainable growth.
            </p>
            <div className="flex flex-col gap-3 text-sm text-primary-foreground/70">
              <a href="mailto:hello@growthos.com" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
                <Mail className="w-4 h-4" />
                info@customersdelight.com
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
                <Phone className="w-4 h-4" />
                +91 9871418686
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
      171, Sector-22, Faridabad
Haryana, India 121005
              </span>
            </div>
          </div>

          {/* Solutions Column */}
          <div>
            <h4 className="font-semibold mb-6 text-lg">Solutions</h4>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-semibold mb-6 text-lg">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="font-semibold mb-6 text-lg">Stay Updated</h4>
            <p className="text-primary-foreground/70 mb-4 text-sm">
              Get growth insights and strategies delivered to your inbox.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 
                         text-primary-foreground placeholder:text-primary-foreground/50
                         focus:outline-none focus:border-accent transition-colors"
              />
              <button 
                type="submit" 
                className="btn-accent w-full justify-center"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-primary-foreground/10 my-12" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/50">
          <p>© {new Date().getFullYear()} CustomerDelight. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-primary-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
