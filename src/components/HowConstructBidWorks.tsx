import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function HowConstructBidWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Stage animations
  const stage1Opacity = useTransform(progress, [0, 0.15], [0, 1]);
  const stage2Opacity = useTransform(progress, [0.15, 0.3], [0, 1]);
  const stage3Opacity = useTransform(progress, [0.3, 0.45], [0, 1]);
  const stage4Opacity = useTransform(progress, [0.45, 0.6], [0, 1]);
  const stage6Opacity = useTransform(progress, [0.6, 0.75], [0, 1]);
  const stage7Opacity = useTransform(progress, [0.75, 0.9], [0, 1]);
  const stage8Opacity = useTransform(progress, [0.9, 1], [0, 1]);

  return (
    <section ref={containerRef} className="relative min-h-[400vh] bg-navy overflow-hidden">
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

        {/* Content */}
        <div className="relative w-full max-w-6xl mx-auto px-8">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">HOW CONSTRUCTBID WORKS</h2>
            <p className="text-white/60 text-lg">A complete construction procurement lifecycle</p>
          </motion.div>

          {/* Stages Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {/* Stage 1: Post */}
            <motion.div
              style={{ opacity: stage1Opacity }}
              className="relative"
            >
              <div className="backdrop-blur-xl bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-orange mx-auto mb-3 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="white" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                  </div>
                  <p className="text-white font-bold text-lg">POST</p>
                  <p className="text-white/60 text-xs mt-2">Post your project requirements</p>
                </div>
              </div>
            </motion.div>

            {/* Stage 2: Verify */}
            <motion.div
              style={{ opacity: stage2Opacity }}
              className="relative"
            >
              <div className="backdrop-blur-xl bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-green-500 mx-auto mb-3 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="white" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <p className="text-white font-bold text-lg">VERIFY</p>
                  <p className="text-white/60 text-xs mt-2">Verify project requirements</div>
              </div>
            </motion.div>

            {/* Stage 3: Bid */}
            <motion.div
              style={{ opacity: stage3Opacity }}
              className="relative"
            >
              <div className="backdrop-blur-xl bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-orange mx-auto mb-3 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="white" strokeWidth="2">
                      <path d="M12 2v20M2 12h20" />
                    </svg>
                  </div>
                  <p className="text-white font-bold text-lg">BID</p>
                  <p className="text-white/60 text-xs mt-2">Receive competitive bids</p>
                </div>
              </div>
            </motion.div>

            {/* Stage 4: Compare */}
            <motion.div
              style={{ opacity: stage4Opacity }}
              className="relative"
            >
              <div className="backdrop-blur-xl bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-orange mx-auto mb-3 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="white" strokeWidth="2">
                      <line x1="18" y1="20" x2="18" y2="10" />
                      <line x1="12" y1="20" x2="12" y2="4" />
                      <line x1="6" y1="20" x2="6" y2="14" />
                    </svg>
                  </div>
                  <p className="text-white font-bold text-lg">COMPARE</p>
                  <p className="text-white/60 text-xs mt-2">Compare all bids side by side</p>
                </div>
              </div>
            </motion.div>

            {/* Stage 5: Select */}
            <motion.div
              style={{ opacity: stage5Opacity }}
              className="relative"
            >
              <div className="backdrop-blur-xl bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-orange mx-auto mb-3 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="white" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="text-white font-bold text-lg">SELECT</p>
                  <p className="text-white/60 text-xs mt-2">Select your contractor</p>
                </div>
              </div>
            </motion.div>

            {/* Stage 6: Build */}
            <motion.div
              style={{ opacity: stage6Opacity }}
              className="relative"
            >
              <div className="backdrop-blur-xl bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-orange mx-auto mb-3 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="white" strokeWidth="2">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  </div>
                  <p className="text-white font-bold text-lg">BUILD</p>
                  <p className="text-white/60 text-xs mt-2">Construction begins</p>
                </div>
              </div>
            </motion.div>

            {/* Stage 7: Monitor */}
            <motion.div
              style={{ opacity: stage7Opacity }}
              className="relative"
            >
              <div className="backdrop-blur-xl bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-orange mx-auto mb-3 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="white" strokeWidth="2">
                      <path d="M1 12s4-8 11-8s11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                  <p className="text-white font-bold text-lg">MONITOR</p>
                  <p className="text-white/60 text-xs mt-2">Monitor construction quality</p>
                </div>
              </div>
            </motion.div>

            {/* Stage 8: Handover */}
            <motion.div
              style={{ opacity: stage8Opacity }}
              className="relative"
            >
              <div className="backdrop-blur-xl bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-green-500 mx-auto mb-3 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="white" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <p className="text-white font-bold text-lg">HANDOVER</p>
                  <p className="text-white/60 text-xs mt-2">Project complete</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
