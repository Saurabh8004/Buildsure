import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, TrendingUp, Users, CheckCircle } from 'lucide-react';

export default function AnimatedHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-bg via-white to-bg">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23123B5D' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Animated construction elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute top-20 right-20 w-64 h-64"
        >
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path
              d="M40 160 L40 80 L100 50 L160 80 L160 160"
              stroke="#F28C28"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
            />
            <motion.path
              d="M70 160 L70 100 L130 100 L130 160"
              stroke="#168C87"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 1 }}
            />
          </svg>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-2xl">
            {/* Animated headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-navy tracking-tight leading-[1.1]">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  BUILD BETTER.
                </motion.span>
                <br />
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-orange"
                >
                  CONNECT SMARTER.
                </motion.span>
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-6 text-lg text-text-muted leading-relaxed"
            >
              Plan your construction project, receive competitive bids from eligible contractors, 
              and build with greater visibility — all in one connected platform.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/get-started"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-orange hover:bg-orange-dark rounded-xl shadow-lg shadow-orange/20 transition-all"
                >
                  Start Your Project
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/contractors"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-navy border-2 border-navy hover:bg-navy hover:text-white rounded-xl transition-all"
                >
                  Find Contractors
                </Link>
              </motion.div>
            </motion.div>

            {/* Supporting text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="mt-6 text-sm text-text-muted"
            >
              For property owners, contractors, architects, engineers and construction professionals.
            </motion.p>
          </div>

          {/* Right - Animated Project Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hidden lg:block"
          >
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              {/* Floating project card */}
              <div className="bg-white rounded-3xl p-8 border border-border shadow-2xl shadow-navy/10">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                    className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center"
                  >
                    <Shield size={24} className="text-teal" />
                  </motion.div>
                  <div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                      className="text-sm font-bold text-navy"
                    >
                      Active Project
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.3 }}
                      className="text-xs text-text-muted"
                    >
                      Residential Construction
                    </motion.p>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, type: 'spring' }}
                    className="ml-auto flex items-center gap-1 px-3 py-1 bg-green/10 rounded-full"
                  >
                    <CheckCircle size={14} className="text-green" />
                    <span className="text-xs font-semibold text-green">Verified</span>
                  </motion.div>
                </div>

                {/* Progress */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-text">Progress</span>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.4 }}
                      className="text-xs font-bold text-navy"
                    >
                      62%
                    </motion.span>
                  </div>
                  <div className="w-full bg-bg-alt rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ width: '62%' }}
                      transition={{ duration: 1.5, delay: 1.5, ease: 'easeOut' }}
                      className="bg-teal h-2 rounded-full"
                    />
                  </div>

                  {/* Milestones */}
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    {[
                      { label: 'Foundation', done: true },
                      { label: 'Structure', done: true },
                      { label: 'Brickwork', done: false },
                    ].map((milestone, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.6 + i * 0.1 }}
                        className={`text-center p-3 rounded-lg ${
                          milestone.done ? 'bg-green/5' : 'bg-bg-alt'
                        }`}
                      >
                        {milestone.done ? (
                          <CheckCircle size={16} className="text-green mx-auto mb-1" />
                        ) : (
                          <div className="w-3 h-3 bg-border rounded-full mx-auto mb-1" />
                        )}
                        <p className="text-[10px] font-medium text-text-muted">{milestone.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-6 pt-6 border-t border-border grid grid-cols-3 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.9 }}
                    className="text-center"
                  >
                    <p className="text-2xl font-bold text-navy">3</p>
                    <p className="text-xs text-text-muted">Bids</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2 }}
                    className="text-center"
                  >
                    <p className="text-2xl font-bold text-navy">₹42L</p>
                    <p className="text-xs text-text-muted">Best Bid</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.1 }}
                    className="text-center"
                  >
                    <p className="text-2xl font-bold text-navy">12</p>
                    <p className="text-xs text-text-muted">Days Left</p>
                  </motion.div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 bg-orange text-white px-4 py-2 rounded-full shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} />
                  <span className="text-xs font-bold">Live Bidding</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-4 -left-4 bg-white border border-border px-4 py-2 rounded-full shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-teal" />
                  <span className="text-xs font-semibold text-navy">8 Contractors</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
