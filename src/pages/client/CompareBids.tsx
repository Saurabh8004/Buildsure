import { motion } from 'framer-motion';
import { GitCompare } from 'lucide-react';

export default function CompareBids() {
  return (
    <div className="p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-navy">Compare Bids</h1>
        <p className="text-text-muted mt-1">Compare bids side-by-side to make informed decisions</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl border border-border p-12 text-center"
      >
        <GitCompare size={64} className="text-text-muted mx-auto mb-4" />
        <h3 className="text-xl font-bold text-navy mb-2">No bids to compare</h3>
        <p className="text-text-muted">
          Once you receive bids, you can compare them here
        </p>
      </motion.div>
    </div>
  );
}
