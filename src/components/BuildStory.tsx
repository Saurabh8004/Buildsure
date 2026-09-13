import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';

export default function BuildStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Scroll progress for building evolution
  const buildProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const springProgress = useSpring(buildProgress, { stiffness: 100, damping: 30 });

  // Building evolution stages
  const blueprintOpacity = useTransform(springProgress, [0, 15], [0, 1]);
  const foundationOpacity = useTransform(springProgress, [15, 30], [0, 1]);
  const structureOpacity = useTransform(springProgress, [30, 50], [0, 1]);
  const floorsOpacity = useTransform(springProgress, [50, 70], [0, 1]);
  const constructionOpacity = useTransform(springProgress, [70, 85], [0, 1]);
  const finalOpacity = useTransform(springProgress, [85, 100], [0, 1]);

  // Stage labels
  const stage1Active = useTransform(springProgress, [0, 15], [1, 0]);
  const stage2Active = useTransform(springProgress, [15, 30], [0, 1, 0]);
  const stage3Active = useTransform(springProgress, [30, 50], [0, 1, 0]);
  const stage4Active = useTransform(springProgress, [50, 70], [0, 1, 0]);
  const stage5Active = useTransform(springProgress, [70, 85], [0, 1, 0]);
  const stage6Active = useTransform(springProgress, [85, 100], [0, 1]);

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

        {/* Building Visualization */}
        <div className="relative w-full max-w-4xl mx-auto px-8">
          {/* Stage 1: Empty Site */}
          <motion.div
            style={{ opacity: useTransform(springProgress, [0, 10], [1, 0]) }}
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
            </div>
          </motion.div>

          {/* Stage 2: Blueprint */}
          <motion.div
            style={{ opacity: blueprintOpacity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <svg viewBox="0 0 400 300" className="w-full max-w-2xl">
              {/* Blueprint Grid */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ duration: 1 }}
              >
                <pattern id="blueprintGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(242, 140, 40, 0.2)" strokeWidth="0.5" />
                </pattern>
                <rect width="400" height="300" fill="url(#blueprintGrid)" />
              </motion.g>

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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2 }}
              >
                BLUEPRINT
              </motion.text>
            </svg>
          </motion.div>

          {/* Stage 3: Foundation */}
          <motion.div
            style={{ opacity: foundationOpacity }}
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
                transition={{ duration: 1 }}
              />
              <motion.rect
                x="100"
                y="220"
                width="200"
                height="30"
                fill="none"
                stroke="#F28C28"
                strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              />

              {/* Foundation Details */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <line x1="120" y1="220" x2="120" y2="250" stroke="#F28C28" strokeWidth="1" />
                <line x1="160" y1="220" x2="160" y2="250" stroke="#F28C28" strokeWidth="1" />
                <line x1="200" y1="220" x2="200" y2="250" stroke="#F28C28" strokeWidth="1" />
                <line x1="240" y1="220" x2="240" y2="250" stroke="#F28C28" strokeWidth="1" />
                <line x1="280" y1="220" x2="280" y2="250" stroke="#F28C28" strokeWidth="1" />
              </motion.g>

              {/* Stage Label */}
              <motion.text
                x="200"
                y="280"
                fill="#F28C28"
                fontSize="14"
                textAnchor="middle"
                fontWeight="bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
              >
                FOUNDATION
              </motion.text>
            </svg>
          </motion.div>

          {/* Stage 4: Structure */}
          <motion.div
            style={{ opacity: structureOpacity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <svg viewBox="0 0 400 300" className="w-full max-w-2xl">
              {/* Foundation */}
              <rect x="100" y="220" width="200" height="30" fill="#F28C28" />

              {/* Columns */}
              <motion.g
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1.5 }}
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
                transition={{ duration: 1, delay: 1 }}
              >
                <rect x="100" y="120" width="200" height="10" fill="#F28C28" />
                <rect x="100" y="170" width="200" height="10" fill="#F28C28" />
              </motion.g>

              {/* Stage Label */}
              <motion.text
                x="200"
                y="280"
                fill="#F28C28"
                fontSize="14"
                textAnchor="middle"
                fontWeight="bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
              >
                STRUCTURE
              </motion.text>
            </svg>
          </motion.div>

          {/* Stage 5: Floors */}
          <motion.div
            style={{ opacity: floorsOpacity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <svg viewBox="0 0 400 300" className="w-full max-w-2xl">
              {/* Foundation */}
              <rect x="100" y="220" width="200" height="30" fill="#F28C28" />

              {/* Structure */}
              <rect x="110" y="120" width="20" height="100" fill="#F28C28" />
              <rect x="190" y="120" width="20" height="100" fill="#F28C28" />
              <rect x="270" y="120" width="20" height="100" fill="#F28C28" />
              <rect x="100" y="120" width="200" height="10" fill="#F28C28" />
              <rect x="100" y="170" width="200" height="10" fill="#F28C28" />

              {/* Floors */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <rect x="100" y="100" width="200" height="20" fill="#F28C28" opacity="0.8" />
                <rect x="100" y="150" width="200" height="20" fill="#F28C28" opacity="0.8" />
                <rect x="100" y="200" width="200" height="20" fill="#F28C28" opacity="0.8" />
              </motion.g>

              {/* Windows */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
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

              {/* Stage Label */}
              <motion.text
                x="200"
                y="280"
                fill="#F28C28"
                fontSize="14"
                textAnchor="middle"
                fontWeight="bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
              >
                FLOORS
              </motion.text>
            </svg>
          </motion.div>

          {/* Stage 6: Construction */}
          <motion.div
            style={{ opacity: constructionOpacity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <svg viewBox="0 0 400 300" className="w-full max-w-2xl">
              {/* Complete Building */}
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

              {/* Scaffolding */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ duration: 1 }}
              >
                <line x1="90" y1="100" x2="90" y2="250" stroke="#F28C28" strokeWidth="1" strokeDasharray="2" />
                <line x1="310" y1="100" x2="310" y2="250" stroke="#F28C28" strokeWidth="1" strokeDasharray="2" />
                <line x1="90" y1="150" x2="310" y2="150" stroke="#F28C28" strokeWidth="1" strokeDasharray="2" />
              </motion.g>

              {/* Stage Label */}
              <motion.text
                x="200"
                y="280"
                fill="#F28C28"
                fontSize="14"
                textAnchor="middle"
                fontWeight="bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                CONSTRUCTION
              </motion.text>
            </svg>
          </motion.div>

          {/* Stage 7: Final Building */}
          <motion.div
            style={{ opacity: finalOpacity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <svg viewBox="0 0 400 300" className="w-full max-w-2xl">
              {/* Complete Building */}
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

              {/* Stage Label */}
              <motion.text
                x="200"
                y="280"
                fill="#F28C28"
                fontSize="14"
                textAnchor="middle"
                fontWeight="bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                HANDOVER
              </motion.text>
            </svg>
          </motion.div>
        </div>

        {/* Stage Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {[stage1Active, stage2Active, stage3Active, stage4Active, stage5Active, stage6Active].map((opacity, i) => (
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
