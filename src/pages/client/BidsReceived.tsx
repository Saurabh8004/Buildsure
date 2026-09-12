import { motion } from 'framer-motion';
import { FolderOpen } from 'lucide-react';

export default function BidsReceived() {
  return (
    <div className="p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-navy">Bids Received</h1>
        <p className="text-text-muted mt-1">View all contractor bids for your projects</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl border border-border p-12 text-center"
      >
        <FolderOpen size={64} className="text-text-muted mx-auto mb-4" />
        <h3 className="text-xl font-bold text-navy mb-2">No bids received yet</h3>
        <p className="text-text-muted">
          Contractor bids will appear here once your project tender is published
        </p>
      </motion.div>
    </div>
  );
}
