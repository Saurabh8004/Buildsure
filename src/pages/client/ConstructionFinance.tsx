import { motion } from 'framer-motion';
import { DollarSign } from 'lucide-react';

export default function ConstructionFinance() {
  return (
    <div className="p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-navy">Construction Finance</h1>
        <p className="text-text-muted mt-1">Get financing assistance for your construction project</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl border border-border p-12 text-center"
      >
        <DollarSign size={64} className="text-text-muted mx-auto mb-4" />
        <h3 className="text-xl font-bold text-navy mb-2">Construction Finance</h3>
        <p className="text-text-muted mb-6">
          Connect with financing partners for your construction project needs
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          <div className="p-4 bg-bg-alt rounded-xl">
            <h4 className="font-semibold text-navy mb-2">Home Construction Loan</h4>
            <p className="text-sm text-text-muted">Financing for new home construction</p>
          </div>
          <div className="p-4 bg-bg-alt rounded-xl">
            <h4 className="font-semibold text-navy mb-2">Renovation Loan</h4>
            <p className="text-sm text-text-muted">Financing for renovation projects</p>
          </div>
        </div>
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl text-left">
          <p className="text-sm text-blue-900">
            💡 <strong>Note:</strong> This is a financing request service. Actual loan approval depends on the financing partner's criteria and your eligibility.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
