import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

export default function ArchitectServices() {
  return (
    <div className="p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-navy">Architect / Engineer Services</h1>
        <p className="text-text-muted mt-1">Request professional architectural and engineering services</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl border border-border p-12 text-center"
      >
        <Users size={64} className="text-text-muted mx-auto mb-4" />
        <h3 className="text-xl font-bold text-navy mb-2">Architect Services</h3>
        <p className="text-text-muted mb-6">
          Connect with verified architects and engineers for your project needs
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          <div className="p-4 bg-bg-alt rounded-xl">
            <h4 className="font-semibold text-navy mb-2">Architectural Design</h4>
            <p className="text-sm text-text-muted">Professional architectural design services</p>
          </div>
          <div className="p-4 bg-bg-alt rounded-xl">
            <h4 className="font-semibold text-navy mb-2">Structural Design</h4>
            <p className="text-sm text-text-muted">Structural engineering and design</p>
          </div>
          <div className="p-4 bg-bg-alt rounded-xl">
            <h4 className="font-semibold text-navy mb-2">BOQ Preparation</h4>
            <p className="text-sm text-text-muted">Bill of quantities preparation</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
