import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring, animate } from 'framer-motion';
import { ArrowRight, Shield, TrendingUp, Users, Clock, CheckCircle, Building2, FileText, Award, Eye, Home as HomeIcon, Building, Hammer, Ruler, Play } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { HERO_VIDEO_CONFIG } from '../config/heroVideo';

// Animated counter component
function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(count, value, { duration });
    const unsubscribe = rounded.on('change', (v) => setDisplayValue(v));
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [value, duration, count, rounded]);

  return <span>{displayValue}</span>;
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 1.05]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, 50]);
  const [selectedBuildType, setSelectedBuildType] = useState<string | null>(null);
  const [videoError, setVideoError] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const buildProgressRef = useRef<HTMLDivElement>(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: buildScrollProgress } = useScroll({
    target: buildProgressRef,
    offset: ["start end", "end start"]
  });

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const buildTypes = [
    { id: 'home', label: 'HOME', icon: HomeIcon, description: 'Your home starts here.' },
    { id: 'commercial', label: 'COMMERCIAL', icon: Building, description: 'Build your business space.' },
    { id: 'renovation', label: 'RENOVATION', icon: Hammer, description: 'Transform your existing space.' },
    { id: 'plan', label: 'I HAVE A PLAN', icon: Ruler, description: 'Let\'s bring your vision to life.' },
  ];

  const buildStages = [
    { id: 1, label: 'IDEA', description: 'Your vision begins' },
    { id: 2, label: 'REQUIREMENT', description: 'Define your needs' },
    { id: 3, label: 'VERIFIED', description: 'We verify your needs' },
    { id: 4, label: 'COMPETITIVE BIDS', description: 'Get competitive bids' },
    { id: 6, label: 'CONTRACTOR SELECTED', description: 'Choose your contractor' },
    { id: 6, label: 'BUILD', description: 'Construction begins' },
    { id: 7, label: 'QUALITY INSPECTION', description: 'Quality is monitored' },
    { id: 8, label: 'ISSUE RESOLVED', description: 'Issues are corrected' },
    { id: 9, label: 'REINSPECTION', description: 'Reinspection complete' },
    { id: 10, label: 'HANDOVER', description: 'Project complete' },
  ];

  const buildProgress = useTransform(buildScrollProgress, [0, 1], [0, 10]);
  const currentStage = Math.floor(buildProgress.get());

  // Video section scroll effects
  const videoSectionOpacity = useTransform(
    useScroll({ target: videoSectionRef, offset: ["start end", "end start"] }).scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  return (
    <div className="overflow-hidden">
      {/* Cinematic Video Hero */}
      <motion.section
        style={{ 
          opacity: prefersReducedMotion ? 1 : heroOpacity,
          scale: prefersReducedMotion ? 1 : heroScale,
          y: prefersReducedMotion ? 0 : heroY
        }}
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {/* Video Background */}
        {!videoError && !prefersReducedMotion && (
          <video
            autoPlay={HERO_VIDEO_CONFIG.settings.autoPlay}
            muted={HERO_VIDEO_CONFIG.settings.muted}
            loop={HERO_VIDEO_CONFIG.settings.loop}
            playsInline={HERO_VIDEO_CONFIG.settings.playsInline}
            preload={HERO_VIDEO_CONFIG.settings.preload}
            onError={() => setVideoError(true)}
            className="absolute inset-0 w-full h-full object-cover"
            poster={HERO_VIDEO_CONFIG.poster.desktop}
          >
            <source src={HERO_VIDEO_CONFIG.video.desktop} type="video/mp4" />
          </video>
        )}

        {/* Fallback Poster Image */}
        {(videoError || prefersReducedMotion) && (
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${HERO_VIDEO_CONFIG.poster.desktop})` }}
          />
        )}

        {/* Dark Cinematic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />

        {/* Subtle Blueprint Grid Overlay */}
        {!prefersReducedMotion && (
          <div className="absolute inset-0 opacity-[0.03]">
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
        )}

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content - Cinematic Text Animation */}
            <div className="max-w-2xl">
              {/* Eyebrow */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-orange text-sm font-semibold tracking-wider mb-4"
              >
                CONSTRUCTION, REIMAGINED
              </motion.p>

              {/* Main Headline with Staggered Animation */}
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1]"
              >
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  BUILD BETTER.
                </motion.span>
                <br />
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-orange"
                >
                  BUILD WITH CONFIDENCE.
                </motion.span>
              </motion.h1>

              {/* Supporting Text */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-6 text-lg text-white/90 leading-relaxed"
              >
                Find trusted contractors, compare competitive bids,
                and keep your build on track with independent quality monitoring.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
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

            {/* Right - Build Health™ HUD */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="hidden lg:block"
            >
              <motion.div
                animate={prefersReducedMotion ? {} : {
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative"
              >
                {/* Glassmorphism HUD */}
                <div className="backdrop-blur-xl bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-xs text-white/60 uppercase tracking-wider">Build Health™</p>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-4xl font-bold text-white">
                          <AnimatedCounter value={94} duration={2} />
                        </span>
                        <span className="text-xl text-white/60">/ 100</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-green/20 backdrop-blur-sm rounded-full border border-green/30">
                      <div className="w-2 h-2 bg-green rounded-full animate-pulse" />
                      <span className="text-xs font-semibold text-green">ON TRACK</span>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-white/70">QUALITY</span>
                        <span className="text-sm font-bold text-white">
                          <AnimatedCounter value={96} duration={2} />%
                        </span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '96%' }}
                          transition={{ duration: 2, delay: 0.5 }}
                          className="h-full bg-gradient-to-r from-green to-green-light"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-white/70">PROGRESS</span>
                        <span className="text-sm font-bold text-white">
                          <AnimatedCounter value={91} duration={2} />%
                        </span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '91%' }}
                          transition={{ duration: 2, delay: 0.7 }}
                          className="h-full bg-gradient-to-r from-blue to-blue-light"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-white/70">MATERIALS</span>
                        <span className="text-sm font-bold text-white">
                          <AnimatedCounter value={98} duration={2} />%
                        </span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '98%' }}
                          transition={{ duration: 2, delay: 0.9 }}
                          className="h-full bg-gradient-to-r from-orange to-orange-light"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <span className="text-xs text-white/70">ISSUES</span>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-orange">
                          <AnimatedCounter value={2} duration={1.5} />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-xs text-white/50 uppercase tracking-wider">EXAMPLE PROJECT</p>
                  </div>
                </div>

                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-orange/20 via-teal/20 to-blue/20 rounded-2xl blur-xl opacity-50" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={prefersReducedMotion ? {} : {
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-white/60 uppercase tracking-wider">Scroll</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
              <motion.div
                animate={prefersReducedMotion ? {} : {
                  y: [0, 12, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-1.5 h-1.5 bg-white rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Interactive Build Type Selector */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight">
              WHAT ARE YOU BUILDING?
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {buildTypes.map((type, index) => {
              const Icon = type.icon;
              const isSelected = selectedBuildType === type.id;
              
              return (
                <motion.button
                  key={type.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedBuildType(type.id)}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    isSelected
                      ? 'border-orange bg-orange/5 shadow-lg'
                      : 'border-border bg-white hover:border-orange/30'
                  }`}
                >
                  <Icon size={32} className={`mx-auto mb-4 ${isSelected ? 'text-orange' : 'text-navy'}`} />
                  <p className={`text-sm font-bold mb-2 ${isSelected ? 'text-orange' : 'text-navy'}`}>
                    {type.label}
                  </p>
                  <p className="text-xs text-text-muted">{type.description}</p>
                </motion.button>
              );
            })}
          </div>

          {selectedBuildType && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-center"
            >
              <Link
                to="/projects/new"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-orange hover:bg-orange-dark rounded-xl shadow-lg shadow-orange/20 transition-all"
              >
                START YOUR PROJECT
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* Build Journey - Scroll-Driven Animation */}
      <section ref={buildProgressRef} className="py-20 bg-navy relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              WATCH A BUILD COME TOGETHER
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {buildStages.map((stage, index) => {
              const isActive = currentStage >= stage.id;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative p-6 rounded-2xl border-2 transition-all ${
                  isActive
                    ? 'border-orange bg-orange/10'
                    : 'border-white/20 bg-white/5'
                  }`}
                >
                  <div className={`text-3xl font-bold mb-2 ${isActive ? 'text-orange' : 'text-white/40'}`}>
                    {String(stage.id).padStart(2, '0')}
                </div>
                  <p className={`text-sm font-bold mb-2 ${isActive ? 'text-white' : 'text-white/60'}`}>
                    {stage.label}
                  </p>
                  <p className={`text-xs ${isActive ? 'text-white/80' : 'text-white/40'}`}>
                    {stage.description}
                  </p>
                  
                  {/* Progress Indicator */}
                  {isActive && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5 }}
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange to-orange-light origin-left"
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Blueprint Background */}
        {!prefersReducedMotion && (
          <div className="absolute inset-0 opacity-[0.05]">
            <svg viewBox="0 0 1200 600" className="w-full h-full">
              <motion.path
                d="M200 500 L200 200 L400 100 L600 200 L600 500"
                stroke="#F28C28"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 3, ease: 'easeInOut' }}
              />
            </svg>
          </div>
        )}
      </section>

      {/* Premium Video Section */}
      <section ref={videoSectionRef} className="relative py-20 overflow-hidden">
        <motion.div
          style={{ opacity: prefersReducedMotion ? 1 : videoSectionOpacity }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${HERO_VIDEO_CONFIG.poster.desktop})` }}
          />
          <div className="absolute inset-0 bg-navy/80" />
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              FROM FIRST PLAN TO FINAL HANDOVER.
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { icon: CheckCircle, label: 'Contractor Verified' },
              { icon: CheckCircle, label: 'Bid Compared' },
              { icon: CheckCircle, label: 'Material Checked' },
              { icon: CheckCircle, label: 'QA Inspection' },
              { icon: CheckCircle, label: 'Issue Resolved' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="backdrop-blur-md bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              >
                <item.icon size={32} className="text-green mx-auto mb-3" />
                <p className="text-sm font-semibold text-white text-center">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
