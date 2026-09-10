import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Shield, TrendingUp, Users, Clock, CheckCircle, Building2, FileText, Award, Eye } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div className="overflow-hidden">
      {/* Cinematic Hero */}
      <motion.section
      style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center bg-navy overflow-hidden"
      >
        {/* Animated Blueprint Grid */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={{
              backgroundPosition: ['0 0', '40px 40px'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        {/* Floating Construction Geometry */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-20 right-20 w-64 h-64 opacity-20"
          >
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M40 160 L40 80 L100 50 L160 80 L160 160"
                stroke="#F28C28"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M70 160 L70 100 L130 100 L130 160"
                stroke="#168C87"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1]">
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

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mt-6 text-lg text-white/80 leading-relaxed"
              >
                Find trusted contractors, compare competitive bids and build with confidence.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="mt-8 flex flex-col sm:flex-row gap-4"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/projects/new"
                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-orange hover:bg-orange-dark rounded-xl shadow-lg shadow-orange/20 transition-all"
                  >
                    POST A PROJECT
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/contractors"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white border-2 border-white/30 hover:border-white hover:bg-white/10 rounded-xl transition-all"
                  >
                    FIND CONTRACTORS
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* Right - Floating Project Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="hidden lg:block"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative"
              >
                <div className="glass-dark rounded-2xl p-6 border border-white/10 shadow-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-teal/20 rounded-xl flex items-center justify-center">
                      <Building2 size={20} className="text-teal" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">Residential Construction</p>
                      <p className="text-xs text-white/60">Gomti Nagar, Lucknow</p>
                    </div>
                    <div className="ml-auto flex items-center gap-1 px-2 py-1 bg-green/20 rounded-full">
                      <CheckCircle size={12} className="text-green" />
                      <span className="text-xs font-semibold text-green">Verified</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/60">Budget</span>
                      <span className="text-sm font-bold text-white">₹35–45 Lakhs</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/60">Bids</span>
                      <span className="text-sm font-bold text-orange">3 Received</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/60">Status</span>
                      <span className="text-xs font-semibold text-teal bg-teal/20 px-2 py-1 rounded-full">Bidding Open</span>
                    </div>
                  </div>

                  {/* Floating Bid Cards */}
                  <div className="mt-4 space-y-2">
                    {['Contractor A', 'Contractor B', 'Contractor C'].map((contractor, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + i * 0.2 }}
                        className="flex items-center justify-between p-2 bg-white/5 rounded-lg"
                      >
                        <span className="text-xs text-white/80">{contractor}</span>
                        <span className="text-xs font-semibold text-white">₹{42 - i * 2}L</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Floating Badges */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute -top-4 -right-4 bg-orange text-white px-3 py-1.5 rounded-full shadow-lg"
                >
                  <div className="flex items-center gap-1.5">
                    <TrendingUp size={14} />
                    <span className="text-xs font-bold">Live Bidding</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Trust Strip */}
      <section className="py-12 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { icon: Shield, label: 'Verified Contractors' },
              { icon: TrendingUp, label: 'Competitive Bidding' },
              { icon: Eye, label: 'Quality Monitoring' },
              { icon: FileText, label: 'Project Transparency' },
              { icon: Award, label: 'Financing Support' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 bg-navy/5 rounded-xl flex items-center justify-center mb-3">
                  <item.icon size={24} className="text-navy" />
                </div>
                <p className="text-sm font-semibold text-navy">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Interactive Timeline */}
      <section className="py-20 lg:py-32 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight">
              How ConstructBid Works
            </h2>
            <p className="mt-4 text-text-muted max-w-2xl mx-auto">
              A complete construction procurement lifecycle from project posting to handover.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 relative">
              {[
                { num: '01', title: 'POST', icon: FileText },
                { num: '02', title: 'VERIFY', icon: CheckCircle },
                { num: '03', title: 'BID', icon: Users },
                { num: '04', title: 'COMPARE', icon: TrendingUp },
                { num: '05', title: 'SELECT', icon: Award },
                { num: '06', title: 'BUILD', icon: Building2 },
                { num: '07', title: 'MONITOR', icon: Eye },
                { num: '08', title: 'HANDOVER', icon: CheckCircle },
              ].map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="bg-white rounded-xl p-4 border border-border card-shadow hover:card-shadow-hover transition-all">
                      <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Icon size={24} className="text-orange" />
                      </div>
                      <p className="text-xs font-bold text-orange text-center mb-1">{step.num}</p>
                      <p className="text-xs font-semibold text-navy text-center">{step.title}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 lg:py-32 bg-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Ready to Build Better?
            </h2>
            <p className="mt-4 text-white/80 text-lg">
              Post your project, compare competitive bids and build with greater visibility.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link to="/projects/new" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-orange hover:bg-orange-dark rounded-xl shadow-lg shadow-orange/20 transition-all">
                  START YOUR PROJECT <ArrowRight size={18} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link to="/contractors" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white border-2 border-white/30 hover:border-white hover:bg-white/10 rounded-xl transition-all">
                  EXPLORE CONTRACTORS
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
