import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

export default function BuildStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Smooth spring progress
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Track current stage
  const [currentStage, setCurrentStage] = useState(0);

  // Update current stage based on scroll progress
  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (latest) => {
      const progress = latest * 100;
      if (progress < 10) setCurrentStage(0); // Empty Site
      else if (progress < 20) setCurrentStage(1); // Blueprint
      else if (progress < 30) setCurrentStage(2); // Requirement
      else if (progress < 40) setCurrentStage(3); // Tender
      else if (progress < 50) setCurrentStage(4); // Competitive Bids
      else if (progress < 60) setCurrentStage(5); // Contractor Selected
      else if (progress < 70) setCurrentStage(6); // Construction
      else if (progress < 80) setCurrentStage(7); // Quality Inspection
      else if (progress < 90) setCurrentStage(8); // Issue Resolved
      else setCurrentStage(9); // Handover
    });

    return () => unsubscribe();
  }, [smoothProgress]);

  // Building evolution stages
  const blueprintOpacity = useTransform(smoothProgress, [0.1, 0.2], [0, 1]);
  const requirementOpacity = useTransform(smoothProgress, [0.2, 0.3], [0, 1]);
  const tenderOpacity = useTransform(smoothProgress, [0.3, 0.4], [0, 1]);
  const bidsOpacity = useTransform(smoothProgress, [0.4, 0.5], [0, 1]);
  const selectedOpacity = useTransform(smoothProgress, [0.5, 0.6], [0, 1]);
  const constructionOpacity = useTransform(smoothProgress, [0.6, 0.7], [0, 1]);
  const inspectionOpacity = useTransform(smoothProgress, [0.7, 0.8], [0, 1]);
  const issueOpacity = useTransform(smoothProgress, [0.8, 0.9], [0, 1]);
  const handoverOpacity = useTransform(smoothProgress, [0.9, 1.0], [0, 1]);

  // Building scale and position
  const buildingScale = useTransform(smoothProgress, [0.6, 0.7, 0.9], [0.8, 1, 1]);
  const buildingY = useTransform(smoothProgress, [0.6, 0.7], [50, 0]);

  return (
    <section ref={containerRef} className="relative min-h-[500vh] bg-navy overflow-hidden">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-[0.05]">
          <div
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

        {/* Building Visualization */}
        <div className="relative w-full max-w-4xl mx-auto px-8">
          {/* Stage 0: Empty Site */}
          <motion.div
            style={{ opacity: currentStage === 0 ? 1 : 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-white/40 text-sm uppercase tracking-widest"
              >
                EMPTY SITE
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ duration: 1 }}
                className="mt-8"
              >
                <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto">
                  <motion.path
                    d="M 50 150 L 350 150"
                    stroke="#F28C28"
                    strokeWidth="2"
                    strokeDasharray="4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2 }}
                  />
                </svg>
              </motion.div>
            </div>
          </motion.div>

          {/* Stage 1: Blueprint */}
          <motion.div
            style={{ opacity: blueprintOpacity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <svg viewBox="0 0 400 300" className="w-full max-w-2xl">
              {/* Blueprint Grid */}
              <pattern id="blueprintGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(242, 140, 40, 0.2)" strokeWidth="0.5" />
              </pattern>
              <rect width="400" height="300" fill="url(#blueprintGrid)" />

              {/* Blueprint Lines */}
              <motion.path
                d="M 100 250 L 100 100 L 200 50 L 300 100 L 300 250"
                stroke="#F28C28"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
              />
              <motion.path
                d="M 150 250 L 150 150 L 250 150 L 250 250"
                stroke="#F28C28"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 1 }}
              />

              {/* Dimensions */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
              >
                <text x="200" y="40" fill="#F28C28" fontSize="12" textAnchor="middle">12.5m</text>
                <text x="90" y="175" fill="#F28C28" fontSize="12" textAnchor="middle">8.0m</text>
              </motion.g>

              {/* Stage Label */}
              <motion.text
                x="200"
                y="280"
                fill="#F28C28"
                fontSize="14"
                textAnchor="middle"
                fontWeight="bold"
              >
                BLUEPRINT
              </motion.text>
            </svg>
          </motion.div>

          {/* Stage 2: Requirement */}
          <motion.div
            style={{ opacity: requirementOpacity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center">
              <div className="backdrop-blur-xl bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 max-w-md">
                <p className="text-white/60 text-xs uppercase tracking-wider mb-4">PROJECT REQUIREMENTS</p>
                <div className="space-y-2 text-left">
                  <div className="flex justify-between">
                    <span className="text-white/60">BUILD TYPE</span>
                    <span className="text-white">Residential</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">AREA</span>
                    <span className="text-white">2,400 sq.ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">LOCATION</span>
                    <span className="text-white">Lucknow</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">BOQ</span>
                    <span className="text-white">Ready</span>
                  </div>
                </div>
              </div>
              <motion.text
                x="200"
                y="280"
                fill="#F28C28"
                fontSize="14"
                textAnchor="middle"
                fontWeight="bold"
              >
                REQUIREMENT
              </motion.text>
            </div>
          </motion.div>

          {/* Stage 3: Tender */}
          <motion.div
            style={{ opacity: tenderOpacity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="backdrop-blur-xl bg-orange/20 backdrop-blur-md rounded-xl p-6 border border-orange/30 max-w-md"
              >
                <p className="text-orange text-2xl font-bold mb-2">TENDER LIVE</p>
                <p className="text-white/60 text-sm">3 Verified Contractors</p>
                <p className="text-white/60 text-sm">7 Competitive Bids</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Stage 4: Competitive Bids */}
          <motion.div
            style={{ opacity: bidsOpacity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="grid grid-cols-3 gap-4 max-w-3xl">
              {/* Bid Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="backdrop-blur-xl bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
              >
                <p className="text-white font-bold mb-2">CONTRACTOR A</p>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-white/60 text-xs">Bid</span>
                    <span className="text-white font-bold">₹18.4L</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60 text-xs">Timeline</span>
                    <span className="text-white text-xs">42 days</span>
                  </div>
                </div>
                <p className="text-orange text-xs mt-2">EXAMPLE</p>
              </motion.div>

              {/* Bid Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="backdrop-blur-xl bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
              >
                <p className="text-white font-bold mb-2">CONTRACTOR B</p>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-white/60 text-xs">Bid</span>
                    <span className="text-white font-bold">₹19.1L</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60 text-xs">Timeline</span>
                    <span className="text-white text-xs">38 days</span>
                  </div>
                </div>
                <p className="text-orange text-xs mt-2">EXAMPLE</p>
              </motion.div>

              {/* Bid Card 3 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="backdrop-blur-xl bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
              >
                <p className="text-white font-bold mb-2">CONTRACTOR C</p>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-white/60 text-xs">Bid</span>
                    <span className="text-white font-bold">₹17.8L</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60 text-xs">Timeline</span>
                    <span className="text-white text-xs">45 days</span>
                  </div>
                </div>
                <p className="text-orange text-xs mt-2">EXAMPLE</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Stage 5: Contractor Selected */}
          <motion.div
            style={{ opacity: selectedOpacity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5 }}
              >
                <p className="text-white text-4xl font-bold mb-4">YOU CHOOSE</p>
                <p className="text-orange text-4xl font-bold">THE CONTRACTOR</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Stage 6: Construction */}
          <motion.div
            style={{ opacity: constructionOpacity, scale: buildingScale, y: buildingY }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <svg viewBox="0 0 400 300" className="w-full max-w-2xl">
              {/* Foundation */}
              <motion.rect
                x="100"
                y="220"
                width="200"
                height="30"
                fill="#F28C28"
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 0.5 }}
              />

              {/* Columns */}
              <motion.g
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{ transformOrigin: 'bottom' }}
              >
                <rect x="110" y="120" width="20" height="100" fill="#F28C28" />
                <rect x="190" y="120" width="20" height="100" fill="#F28C28" />
                <rect x="270" y="120" width="20" height="100" fill="#F28C28" />
              </motion.g>

              {/* Beams */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <rect x="100" y="120" width="200" height="10" fill="#F28C28" />
                <rect x="100" y="170" width="200" height="10" fill="#F28C28" />
              </motion.g>

              {/* Floors */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <rect x="100" y="100" width="200" height="20" fill="#F28C28" opacity="0.8" />
                <rect x="100" y="150" width="200" height="20" fill="#F28C28" opacity="0.8" />
                <rect x="100" y="200" width="200" height="20" fill="#F28C28" opacity="0.8" />
              </motion.g>

              {/* Windows */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                <rect x="130" y="105" width="15" height="10" fill="#1a1a2e" />
                <rect x="160" y="105" width="15" height="10" fill="#1a1a2e" />
                <rect x="210" y="105" width="15" height="10" fill="#1a1a2e" />
                <rect x="240" y="105" width="15" height="10" fill="#1a1a2e" />
                <rect x="130" y="155" width="15" height="10" fill="#1a1a2e" />
                <rect x="160" y="155" width="15" height="10" fill="#1a1a2e" />
                <rect x="210" y="155" width="15" height="10" fill="#1a1a2e" />
                <rect x="240" y="155" width="15" height="10" fill="#1a1a2e" />
              </motion.g>
            </svg>
          </motion.div>

          {/* Stage 7: Quality Inspection */}
          <motion.div
            style={{ opacity: inspectionOpacity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="backdrop-blur-xl bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 max-w-md"
              >
                <p className="text-white text-2xl font-bold mb-4">QUALITY INSPECTION</p>
                <div className="space-y-2 text-left">
                  <div className="flex justify-between">
                    <span className="text-white/60">MATERIAL CHECK</span>
                    <span className="text-green">✓ PASS</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">STRUCTURAL CHECK</span>
                    <span className="text-green">✓ PASS</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">WORKMANSHIP</span>
                    <span className="text-green">✓ PASS</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Stage 8: Issue Resolved */}
          <motion.div
            style={{ opacity: issueOpacity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="backdrop-blur-xl bg-green/20 backdrop-blur-md rounded-xl p-6 border border-green/30 max-w-md"
              >
                <p className="text-green text-2xl font-bold mb-2">ISSUE RESOLVED</p>
                <p className="text-white/60 text-sm">All quality checks passed</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Stage 9: Handover */}
          <motion.div
            style={{ opacity: handoverOpacity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <p className="text-white text-4xl font-bold mb-4">PROJECT COMPLETE</p>
                <p className="text-orange text-3xl font-bold mb-4">READY FOR HANDOVER</p>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block"
                >
                  <svg viewBox="0 0 100 100" className="w-24 h-24 mx-auto">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#22c55e" strokeWidth="3" />
                    <motion.path
                      d="M 35 50 L 45 60 L 65 40"
                      stroke="#22c55e"
                      strokeWidth="4"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    />
                  </svg>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stage Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: currentStage === i ? 1.5 : 1,
                opacity: currentStage === i ? 1 : 0.3,
              }}
              className="w-2 h-2 bg-orange rounded-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
