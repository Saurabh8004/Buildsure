import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/contractors', label: 'Contractors' },
  { to: '/financing', label: 'Financing' },
  { to: '/how-it-works', label: 'How It Works' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass shadow-lg border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? 'h-16' : 'h-20'
          }`}>
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
              <motion.div
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.3 }}
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                  scrolled ? 'bg-navy' : 'bg-white/10 backdrop-blur-sm border border-white/20'
                }`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18" />
                  <path d="M5 21V7l7-4 7 4v14" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </motion.div>
              <span className={`text-xl font-bold tracking-tight transition-colors ${
                scrolled ? 'text-navy' : 'text-white'
              }`}>
                Construct<span className="text-orange">Bid</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="relative px-4 py-2 text-sm font-medium group"
                >
                  <span className={`transition-colors ${
                    location.pathname === link.to
                      ? scrolled ? 'text-navy' : 'text-white'
                      : scrolled ? 'text-text hover:text-navy' : 'text-white/80 hover:text-white'
                  }`}>
                    {link.label}
                  </span>
                  {location.pathname === link.to && (
                    <motion.div
                      layoutId="activeNav"
                      className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                        scrolled ? 'bg-orange' : 'bg-white'
                      }`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <motion.div
                    className={`absolute bottom-0 left-0 right-0 h-0.5 origin-left ${
                      scrolled ? 'bg-orange' : 'bg-white'
                    }`}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: location.pathname === link.to ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              {user ? (
                // User Profile Dropdown
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      scrolled 
                        ? 'text-text hover:bg-bg-alt' 
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="w-8 h-8 bg-orange/20 rounded-full flex items-center justify-center">
                      <User size={16} className={scrolled ? 'text-navy' : 'text-white'} />
                    </div>
                    <span className="text-sm font-medium">
                      {user.full_name || user.email?.split('@')[0] || 'User'}
                    </span>
                    <ChevronDown size={14} className={scrolled ? 'text-text-muted' : 'text-white/70'} />
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-border overflow-hidden"
                      >
                        <div className="p-4 bg-bg border-b border-border">
                          <p className="text-sm font-semibold text-navy">{user.full_name || 'User'}</p>
                          <p className="text-xs text-text-muted mt-1">{user.email}</p>
                          <p className="text-xs text-orange font-medium mt-1 capitalize">{user.role}</p>
                        </div>
                        <div className="p-2">
                          <Link
                            to={`/${user.role}`}
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-text hover:bg-bg-alt rounded-lg transition-colors"
                          >
                            <User size={16} />
                            My Dashboard
                          </Link>
                          <button
                            onClick={async () => {
                              await logout();
                              setUserMenuOpen(false);
                            }}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full text-left"
                          >
                            <LogOut size={16} />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                // Not authenticated
                <>
                  <Link
                    to="/signin"
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      scrolled ? 'text-text hover:text-navy' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    Sign In
                  </Link>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/get-started"
                      className="px-5 py-2.5 text-sm font-semibold text-white bg-orange hover:bg-orange-dark rounded-lg transition-all shadow-lg shadow-orange/20"
                    >
                      Get Started
                    </Link>
                  </motion.div>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className={`lg:hidden p-2 transition-colors ${
                scrolled ? 'text-text hover:text-navy' : 'text-white hover:text-white/80'
              }`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-16 z-40 lg:hidden"
          >
            <div className="glass border-b border-border shadow-xl">
              <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1" aria-label="Mobile navigation">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        location.pathname === link.to
                          ? 'text-navy bg-bg-alt'
                          : 'text-text hover:text-navy hover:bg-bg-alt/50'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="pt-4 border-t border-border flex flex-col gap-2"
                >
                  {user ? (
                    <>
                      <div className="px-4 py-3 bg-bg rounded-lg mb-2">
                        <p className="text-sm font-semibold text-navy">{user.full_name || 'User'}</p>
                        <p className="text-xs text-text-muted mt-1">{user.email}</p>
                        <p className="text-xs text-orange font-medium mt-1 capitalize">{user.role}</p>
                      </div>
                      <Link
                        to={`/${user.role}`}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-text border border-border rounded-lg hover:bg-bg-alt transition-colors"
                      >
                        <User size={16} />
                        My Dashboard
                      </Link>
                      <button
                        onClick={async () => {
                          await logout();
                          setMobileOpen(false);
                        }}
                        className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={16} />
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/signin"
                        onClick={() => setMobileOpen(false)}
                        className="block text-center px-4 py-3 text-sm font-medium text-text border border-border rounded-lg hover:bg-bg-alt transition-colors"
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/get-started"
                        onClick={() => setMobileOpen(false)}
                        className="block text-center px-4 py-3 text-sm font-semibold text-white bg-orange rounded-lg hover:bg-orange-dark transition-colors"
                      >
                        Get Started
                      </Link>
                    </>
                  )}
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
