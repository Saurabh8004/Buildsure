import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-navy"
    >
      <div className="relative">
        {/* Animated construction lines */}
        <motion.div
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <motion.path
              d="M20 100 L20 40 L60 20 L100 40 L100 100"
              stroke="#F28C28"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
            />
            <motion.path
              d="M40 100 L40 60 L80 60 L80 100"
              stroke="#168C87"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeInOut' }}
            />
          </svg>
        </motion.div>

        {/* Logo text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-32 text-center"
        >
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Build<span className="text-orange">Sure</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.3 }}
            className="text-sm text-white/60 mt-2"
          >
            Build Better. Bid Smarter.
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}
