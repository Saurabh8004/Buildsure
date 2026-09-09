import { motion } from 'framer-motion';
import { CheckCircle, TrendingUp, Clock, Award } from 'lucide-react';

const bids = [
  {
    contractor: 'Contractor A',
    amount: 42.5,
    timeline: 8,
    experience: 12,
    rating: 4.8,
    verified: true,
    badge: 'Best Value',
    badgeColor: 'bg-teal text-orange',
  },
  {
    contractor: 'Contractor B',
    amount: 39.8,
    timeline: 10,
    experience: 8,
    rating: 4.5,
    verified: true,
    badge: 'Lowest Price',
    badgeColor: 'bg-blue text-orange',
  },
  {
    contractor: 'Contractor C',
    amount: 45.0,
    timeline: 7,
    experience: 15,
    rating: 4.9,
    verified: true,
    badge: 'Most Experienced',
    badgeColor: 'bg-orange text-orange',
  },
];

export default function AnimatedBidComparison() {
  return (
    <section className="py-20 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight">
            Compare Bids. Choose Wisely.
          </h2>
          <p className="mt-4 text-text-muted max-w-2xl mx-auto">
            Don't just pick the lowest price. Compare complete offers across multiple dimensions.
          </p>
        </motion.div>

        {/* Bid Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {bids.map((bid, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative bg-bg rounded-2xl p-6 border border-border shadow-lg hover:shadow-2xl transition-all"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 + 0.5, type: 'spring' }}
                className={`absolute -top-3 right-6 ${bid.badgeColor} px-3 py-1 rounded-full text-xs font-bold shadow-md`}
              >
                {bid.badge}
              </motion.div>

              {/* Contractor Name */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-navy/5 rounded-xl flex items-center justify-center">
                  <span className="text-lg font-bold text-navy">{bid.contractor.slice(-1)}</span>
                </div>
                <div>
                  <h3 className="font-bold text-navy">{bid.contractor}</h3>
                  {bid.verified && (
                    <div className="flex items-center gap-1 text-xs text-green">
                      <CheckCircle size={12} />
                      <span>Verified</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Amount */}
              <div className="mb-6">
                <p className="text-xs text-text-muted mb-1">Bid Amount</p>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.3 }}
                  className="text-3xl font-bold text-navy"
                >
                  ₹{bid.amount}L
                </motion.p>
              </div>

              {/* Stats */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <Clock size={14} />
                    <span>Timeline</span>
                  </div>
                  <span className="text-sm font-semibold text-navy">{bid.timeline} months</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <Award size={14} />
                    <span>Experience</span>
                  </div>
                  <span className="text-sm font-semibold text-navy">{bid.experience} years</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <TrendingUp size={14} />
                    <span>Rating</span>
                  </div>
                  <span className="text-sm font-semibold text-navy">{bid.rating} ★</span>
                </div>
              </div>

              {/* Progress bars */}
              <div className="mt-6 space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-text-muted">Price Competitiveness</span>
                    <span className="font-semibold text-navy">{Math.round((1 - bid.amount / 50) * 100)}%</span>
                  </div>
                  <div className="w-full bg-bg-alt rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      initial={{ width: '0%' }}
                      whileInView={{ width: `${(1 - bid.amount / 50) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.15 + 0.5 }}
                      className="bg-orange h-1.5 rounded-full"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-text-muted">Experience Score</span>
                    <span className="font-semibold text-navy">{Math.round((bid.experience / 20) * 100)}%</span>
                  </div>
                  <div className="w-full bg-bg-alt rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      initial={{ width: '0%' }}
                      whileInView={{ width: `${(bid.experience / 20) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.15 + 0.7 }}
                      className="bg-teal h-1.5 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Key Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center"
        >
          <p className="text-lg font-semibold text-navy mb-2">
            Lowest price isn't always the best choice.
          </p>
          <p className="text-text-muted">
            BuildSure helps you understand the complete offer before making your decision.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
