import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

export default function Progress() {
  return (
    <div className="p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-navy">Progress</h1>
        <p className="text-text-muted mt-1">Submit and track project progress updates</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl border border-border p-12 text-center"
      >
        <TrendingUp size={64} className="text-text-muted mx-auto mb-4" />
        <h3 className="text-xl font-bold text-navy mb-2">No progress updates yet</h3>
        <p className="text-text-muted">
          Submit progress updates for your active projects
        </p>
      </motion.div>
    </div>
  );
}
