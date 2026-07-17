import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Community", path: "/community" },
  { name: "Digital Presence", path: "/digital-presence" },
   { name: "Loyalty Systems", path: "/loyalty-systems" },
  { name: "Prime Members", path: "/prime-members" },
  
 
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* NAVBAR */}
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
       className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-lg border-b border-white/10"

      >
        <nav className="container-wide h-20 flex items-center justify-between relative">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-md">
              <img src="/favicon.png" alt="logo" />
            </div>
            <span className="font-bold text-white text-2xl tracking-wide">
              CustomersDelight
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative text-white text-sm font-medium transition-all duration-300 hover:text-white/80"
                >
                  {link.name}

                  {/* Animated Underline */}
                  <motion.span
                    layoutId="underline"
                    className="absolute left-0 -bottom-1 h-1 bg-white rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: isActive ? "100%" : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden lg:block">
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/community"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold shadow-md hover:shadow-lg transition-all duration-300"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </nav>
      </motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-20 z-40 lg:hidden"
          >
            <div className="mx-4 rounded-2xl bg-black/70 backdrop-blur-xl border border-white/10 shadow-2xl p-6">
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;

                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`px-4 py-3 rounded-lg font-medium text-white transition-all duration-200 hover:text-white/80 ${
                        isActive
                          ? "underline underline-offset-4 font-bold"
                          : ""
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}

                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/community"
                    className="mt-4 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Get Started
                    <ArrowRight />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
