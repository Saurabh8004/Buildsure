import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function QualityInspection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Animation progress
  const progress = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  // Scanner animation
  const scannerY = useTransform(progress, [0, 0.3], [-100, 400]);
  const scannerOpacity = useTransform(progress, [0, 0.1, 0.3, 0.4], [0, 1, 1, 0]);

  // Issue detection
  const issueOpacity = useTransform(progress, [0.3, 0.5], [0, 1]);

  // Correction
  const correctionOpacity = useTransform(progress, [0.5, 0.7], [0, 1]);

  // Reinspection
  const reinspectionOpacity = useTransform(progress, [0.7, 0.9], [0, 1]);

  // Build Health HUD
  const hudOpacity = useTransform(progress, [0.3, 0.4], [0, 1]);

  return (
    <section ref={containerRef} className="relative min-h-[300vh] bg-navy overflow-hidden">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="w-full max-w-4xl mx-auto px-8">
          
          {/* Building */}
          <div className="relative">
            <svg viewBox="0 0 400 300" className="w-full max-w-2xl mx-auto">
              {/* Building Structure */}
              <rect x="100" y="220" width="200" height="30" fill="#F28C28" />
              <rect x="110" y="120" width="20" height="100" fill="#F28C28" />
              <rect x="190" y="120" width="20" height="100" fill="#F28C28" />
              <rect x="270" y="120" width="20" height="100" fill="#F28C28" />
              <rect x="100" y="120" width="200" height="10" fill="#F28C28" />
              <rect x="100" y="170" width="200" height="10" fill="#F28C28" />
              <rect x="100" y="100" width="200" height="20" fill="#F28C28" opacity="0.8" />
              <rect x="100" y="150" width="200" height="20" fill="#F28C28" opacity="0.8" />
              <rect x="100" y="200" width="200" height="20" fill="#F28C28" opacity="0.8" />
              <rect x="130" y="105" width="15" height="10" fill="#1a1a2e" />
              <rect x="160" y="105" width="15" height="10" fill="#1a1a2e" />
              <rect x="210" y="105" width="15" height="10" fill="#1a1a2e" />
              <rect x="240" y="105" width="15" height="10" fill="#1a1a2e" />
              <rect x="130" y="155" width="15" height="10" fill="#1a1a2e" />
              <rect x="160" y="155" width="15" height="10" fill="#1a1a2e" />
              <rect x="210" y="155" width="15" height="10" fill="#1a1a2e" />
              <rect x="240" y="155" width="15" height="10" fill="#1a1a2e" />

              {/* Scanner Line */}
              <motion.line
                x1="80"
                x2="320"
                y1={scannerY}
                y2={scannerY}
                stroke="#F28C28"
                strokeWidth="2"
                strokeDasharray="4"
                style={{ opacity: scannerOpacity }}
              />

              {/* Issue Detection */}
              <motion.g style={{ opacity: issueOpacity }}>
                <circle cx="200" cy="150" r="20" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4" />
                <motion.path
                  d="M 195 145 L 205 155 M 205 145 L 195 155"
                  stroke="#ef4444"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.g>

              {/* Correction */}
              <motion.g style={{ opacity: correctionOpacity }}>
                <circle cx="200" cy="150" r="20" fill="none" stroke="#22c55e" strokeWidth="2" />
                <motion.path
                  d="M 195 150 L 200 155 L 210 145"
                  stroke="#22c55e"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.g>
            </svg>

            {/* Build Health HUD */}
            <motion.div
              style={{ opacity: hudOpacity }}
              className="absolute top-8 right-8 backdrop-blur-xl bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
            >
              <p className="text-white/60 text-xs uppercase tracking-wider mb-2">BUILD HEALTH™</p>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold text-white">94</span>
                <span className="text-xl text-white/60">/ 100</span>
              </div>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/60">QUALITY</span>
                    <span className="text-white font-bold">96</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '96%' }}
                      transition={{ duration: 1 }}
                      className="h-full bg-green-500"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/60">PROGRESS</span>
                    <span className="text-white font-bold">91</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '91%' }}
                      transition={{ duration: 1 }}
                      className="h-full bg-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/60">MATERIALS</span>
                    <span className="text-white font-bold">98</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '98%' }}
                      transition={{ duration: 1 }}
                      className="h-full bg-orange"
                    />
                  </div>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/10">
                  <span className="text-xs text-white/60">ISSUES</span>
                  <span className="text-2xl font-bold text-orange">2</span>
                </div>
              </div>
              <p className="text-white/40 text-xs mt-4 uppercase tracking-wider">EXAMPLE PROJECT</p>
            </motion.div>

            {/* Issue Label */}
            <motion.div
              style={{ opacity: issueOpacity }}
              className="absolute bottom-8 left-8 backdrop-blur-xl bg-red-500/20 backdrop-blur-md rounded-xl p-4 border border-red-500/30"
            >
              <p className="text-red-400 text-xs uppercase tracking-wider mb-1">ISSUE DETECTED</p>
              <p className="text-white text-sm">Column reinforcement requires correction</p>
            </motion.div>

            {/* Correction Label */}
            <motion.div
              style={{ opacity: correctionOpacity }}
              className="absolute bottom-8 left-8 backdrop-blur-xl bg-green-500/20 backdrop-blur-md rounded-xl p-4 border border-green-500/30"
            >
              <p className="text-green-400 text-xs uppercase tracking-wider mb-1">CORRECTIVE ACTION</p>
              <p className="text-white text-sm">Contractor resolves issue</p>
            </motion.div>

            {/* Reinspection Label */}
            <motion.div
              style={{ opacity: reinspectionOpacity }}
              className="absolute bottom-8 left-8 backdrop-blur-xl bg-green-500/20 backdrop-blur-md rounded-xl p-4 border border-green-500/30"
            >
              <p className="text-green-400 text-xs uppercase tracking-wider mb-1">REINSPECTION</p>
              <p className="text-white text-sm">PASSED ✓</p>
            </motion.div>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {[issueOpacity, correctionOpacity, reinspectionOpacity].map((opacity, i) => (
            <motion.div
              key={i}
              style={{ opacity }}
              className="w-2 h-2 bg-orange rounded-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
