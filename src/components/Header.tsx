import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contractors', to: '/contractors' },
  { label: 'Financing', to: '/financing' },
  { label: 'How It Works', to: '/how-it-works' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] flex items-center pointer-events-auto transition-all duration-300 ${
        scrolled
          ? 'h-16 bg-white/95 backdrop-blur-md shadow-sm'
          : 'h-20 bg-white shadow-sm'
      }`}
    >
      <div className="w-full max-w-7xl h-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-full">

          {/* Logo */}
          <Link
            to="/"
            className={`flex-shrink-0 flex items-center ${
              scrolled ? 'h-10' : 'h-12'
            }`}
          >
            <div
              className={`${
                scrolled
                  ? 'bg-blue-900 w-10 h-10'
                  : 'bg-blue-900 w-12 h-12'
              } rounded-lg flex items-center justify-center`}
            >
              <span className="text-white font-bold text-lg">CB</span>
            </div>

            <span className="ml-3 text-xl font-bold text-blue-900">
              Construct<span className="text-orange-500">Bid</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="font-medium text-blue-900 transition-colors duration-200 hover:text-orange-500"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/signin"
              className="px-4 py-2 rounded-lg font-medium text-blue-900 hover:text-orange-600 transition-colors"
            >
              Sign In
            </Link>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-[101] pointer-events-auto"
            >
              <Link
                to="/get-started"
                className="relative z-[101] pointer-events-auto inline-flex items-center justify-center bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors"
              >
                Get Started
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-blue-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-0 right-0 z-[90] md:hidden bg-white border-t shadow-md"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="block px-3 py-2 text-blue-900 hover:text-orange-500 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-4 pb-2 space-y-2">
                <Link
                  to="/signin"
                  className="block w-full text-left px-3 py-2 text-blue-900 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>

                <Link
                  to="/get-started"
                  className="block w-full text-left px-3 py-2 bg-orange-500 text-white rounded-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
