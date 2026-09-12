import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

export default function QAInspections() {
  return (
    <div className="p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-navy">QA & Inspections</h1>
        <p className="text-text-muted mt-1">View quality assurance inspections and reports</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl border border-border p-12 text-center"
      >
        <AlertTriangle size={64} className="text-text-muted mx-auto mb-4" />
        <h3 className="text-xl font-bold text-navy mb-2">No inspections yet</h3>
        <p className="text-text-muted">
          Inspections will appear here once scheduled
        </p>
      </motion.div>
    </div>
  );
}
