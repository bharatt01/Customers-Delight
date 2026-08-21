import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, LogOut, LayoutDashboard } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { useAuthUser } from "@/hooks/useAuthUser";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Community", path: "/community" },
  { name: "Digital Presence", path: "/digital-presence" },
  { name: "Loyalty Systems", path: "/loyalty-systems" },
  { name: "Prime Members", path: "/prime-members" },
  { name: "Latest News", path: "/latest-news" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading } = useAuthUser();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  async function handleLogout() {
    await signOut(auth);
    setIsMobileMenuOpen(false);
    navigate("/");
  }

  const initial = user?.email?.[0]?.toUpperCase() ?? "?";

  return (
    <>
      {/* NAVBAR — Solid, no glassmorphism */}
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#1A1A1A] border-b border-amber-900/20 shadow-lg shadow-black/10"
            : "bg-[#1A1A1A]"
        }`}
      >
        <nav className="max-w-7xl mx-auto h-20 flex items-center justify-between px-6">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-[#ee9725] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-black text-sm">CD</span>
            </div>
            <span className="font-semibold text-white text-lg tracking-tight hidden sm:block">
              Customers<span className="text-[#ee9725]">Delight</span>
            </span>
          </Link>

          {/* DESKTOP NAV — Clean text links (untouched) */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[14px] font-semibold transition-colors duration-300 ${
                    isActive
                      ? "text-[#ee9725]"
                      : "text-white/60 hover:text-[#ee9725]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* AUTH AREA — replaces the old static "Get Started" CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {loading ? (
              <div className="w-24 h-9" /> // reserve space, avoid layout jump
            ) : user ? (
              <>
                <Link
                  to="/owner/dashboard"
                  className="flex items-center gap-2 text-[14px] font-semibold text-white/60 hover:text-[#ee9725] transition-colors duration-300"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <div className="w-px h-6 bg-white/10" />
                <div className="flex items-center gap-2 pl-1">
                  <div className="w-8 h-8 rounded-full bg-[#ee9725]/15 border border-[#ee9725]/30 flex items-center justify-center text-[#ee9725] text-xs font-black">
                    {initial}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 text-[14px] font-semibold text-white/60 hover:text-[#ee9725] transition-colors duration-300"
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                </div>
              </>
            ) : (
              <Link
                to="/owner/login"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#ee9725] text-black font-bold text-sm hover:bg-[#F5B74C] transition-all duration-300"
              >
                Shop Owner Login
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </motion.header>

      {/* MOBILE MENU — Solid dark, no blur */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-20 z-40 lg:hidden px-4"
          >
            <div className="rounded-xl bg-[#1A1A1A] border border-amber-900/20 shadow-2xl p-6">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;

                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "text-[#D4A017] bg-amber-500/10"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}

                <div className="mt-3 pt-3 border-t border-white/10">
                  {loading ? null : user ? (
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-3 px-4 py-2">
                        <div className="w-8 h-8 rounded-full bg-[#ee9725]/15 border border-[#ee9725]/30 flex items-center justify-center text-[#ee9725] text-xs font-black">
                          {initial}
                        </div>
                        <span className="text-white/60 text-xs truncate">{user.email}</span>
                      </div>
                      <Link
                        to="/owner/dashboard"
                        className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/5"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Log Out
                      </button>
                    </div>
                  ) : (
                    <Link
                      to="/owner/login"
                      className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#ee9725] text-black font-bold text-sm"
                    >
                      Shop Owner Login
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;