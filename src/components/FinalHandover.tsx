import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { CheckCircle } from 'lucide-react';

export default function FinalHandover() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Animation progress
  const progress = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  // Building completion
  const buildingOpacity = useTransform(progress, [0, 0.3], [0, 1]);

  // Final message
  const messageOpacity = useTransform(progress, [0.3, 0.6], [0, 1]);

  // CTA
  const ctaOpacity = useTransform(progress, [0.6, 0.9], [0, 1]);

  return (
    <section ref={containerRef} className="relative min-h-[200vh] bg-navy overflow-hidden">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="w-full max-w-4xl mx-auto px-8">
          
          {/* Completed Building */}
          <motion.div
            style={{ opacity: buildingOpacity }}
            className="relative mb-12"
          >
            <svg viewBox="0 0 400 300" className="w-full max-w-2xl mx-auto">
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

              {/* Completion Badge */}
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <circle cx="200" cy="80" r="25" fill="#22c55e" />
                <motion.path
                  d="M 190 80 L 198 88 L 215 72"
                  stroke="white"
                  strokeWidth="3"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                />
              </motion.g>
            </svg>
          </motion.div>

          {/* Final Message */}
          <motion.div
            style={{ opacity: messageOpacity }}
            className="text-center mb-8"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-white text-5xl font-bold mb-4">YOU CHOOSE.</p>
              <p className="text-orange text-5xl font-bold">WE MONITOR.</p>
            </motion.div>
          </motion.div>

          {/* CTA */}
          <motion.div
            style={{ opacity: ctaOpacity }}
            className="text-center"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <a
                href="/projects/new"
                className="inline-flex items-center gap-2 px-8 py-4 bg-orange text-white font-bold rounded-xl hover:bg-orange-dark transition-colors"
              >
                START YOUR PROJECT
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Progress Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {[buildingOpacity, messageOpacity, ctaOpacity].map((opacity, i) => (
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
