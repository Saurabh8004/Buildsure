import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { CheckCircle } from 'lucide-react';

export default function BiddingExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Animation progress
  const progress = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  // Bid cards animation
  const bid1Opacity = useTransform(progress, [0, 0.2], [0, 1]);
  const bid1Y = useTransform(progress, [0, 0.2], [50, 0]);
  const bid2Opacity = useTransform(progress, [0.1, 0.3], [0, 1]);
  const bid2Y = useTransform(progress, [0.1, 0.3], [50, 0]);
  const bid3Opacity = useTransform(progress, [0.2, 0.4], [0, 1]);
  const bid3Y = useTransform(progress, [0.2, 0.4], [50, 0]);

  // Comparison phase
  const compareOpacity = useTransform(progress, [0.4, 0.6], [0, 1]);
  const selectOpacity = useTransform(progress, [0.6, 0.8], [0, 1]);

  // Final message
  const finalOpacity = useTransform(progress, [0.8, 1], [0, 1]);

  return (
    <section ref={containerRef} className="relative min-h-[300vh] bg-navy overflow-hidden">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="w-full max-w-6xl mx-auto px-8">
          
          {/* Phase 1: Bid Cards Entering */}
          <div className="relative">
            {/* Bid Card 1 */}
            <motion.div
              style={{ opacity: bid1Opacity, y: bid1Y }}
              className="absolute top-0 left-0 w-80"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-white font-bold">CONTRACTOR A</p>
                    <p className="text-white/60 text-sm">96% Profile</p>
                  </div>
                  <CheckCircle size={24} className="text-green" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/60">Bid</span>
                    <span className="text-white font-bold">₹18.4L</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Timeline</span>
                    <span className="text-white">42 days</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bid Card 2 */}
            <motion.div
              style={{ opacity: bid2Opacity, y: bid2Y }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-80"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-white font-bold">CONTRACTOR B</p>
                    <p className="text-white/60 text-sm">94% Profile</p>
                  </div>
                  <CheckCircle size={24} className="text-green" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/60">Bid</span>
                    <span className="text-white font-bold">₹19.1L</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Timeline</span>
                    <span className="text-white">38 days</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bid Card 3 */}
            <motion.div
              style={{ opacity: bid3Opacity, y: bid3Y }}
              className="absolute top-0 right-0 w-80"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-white font-bold">CONTRACTOR C</p>
                    <p className="text-white/60 text-sm">91% Profile</p>
                  </div>
                  <CheckCircle size={24} className="text-green" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/60">Bid</span>
                    <span className="text-white font-bold">₹17.8L</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Timeline</span>
                    <span className="text-white">45 days</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Phase 2: Compare */}
          <motion.div
            style={{ opacity: compareOpacity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-white text-4xl font-bold mb-4">COMPARE BIDS</p>
                <p className="text-white/60">Compare price, scope, timeline, and quality</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Phase 3: Select */}
          <motion.div
            style={{ opacity: selectOpacity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-orange text-4xl font-bold mb-4">CLIENT SELECTS CONTRACTOR</p>
                <p className="text-white/60">You choose the contractor.</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Phase 4: Final Message */}
          <motion.div
            style={{ opacity: finalOpacity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-white text-5xl font-bold mb-4">YOU CHOOSE.</p>
                <p className="text-orange text-5xl font-bold">WE MONITOR.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Progress Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {[bid1Opacity, bid2Opacity, bid3Opacity, compareOpacity, selectOpacity, finalOpacity].map((opacity, i) => (
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
