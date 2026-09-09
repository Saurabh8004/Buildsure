import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, Eye, FileText, Camera } from 'lucide-react';

const stages = [
  { name: 'Foundation', status: 'complete' },
  { name: 'Structure', status: 'complete' },
  { name: 'Brickwork', status: 'current' },
  { name: 'MEP', status: 'pending' },
  { name: 'Finishing', status: 'pending' },
  { name: 'Handover', status: 'pending' },
];

export default function AnimatedQualityAssurance() {
  return (
    <section className="py-20 lg:py-32 bg-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight">
            Don't Just Track Progress.<br />Check Quality.
          </h2>
          <p className="mt-4 text-text-muted max-w-2xl mx-auto">
            BuildSure supports independent project monitoring and inspections at key construction stages.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Construction Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              {/* Vertical line */}
              <motion.div
                initial={{ height: '0%' }}
                whileInView={{ height: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.5 }}
                className="absolute left-6 top-0 w-0.5 bg-gradient-to-b from-green via-teal to-border"
              />

              {/* Stages */}
              <div className="space-y-6">
                {stages.map((stage, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="relative flex items-start gap-4"
                  >
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center ${
                        stage.status === 'complete'
                          ? 'bg-green text-orange'
                          : stage.status === 'current'
                          ? 'bg-teal text-orange'
                          : 'bg-bg-alt text-text-muted'
                      }`}
                    >
                      {stage.status === 'complete' ? (
                        <CheckCircle size={20} />
                      ) : stage.status === 'current' ? (
                        <Eye size={20} />
                      ) : (
                        <div className="w-3 h-3 bg-border rounded-full" />
                      )}
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1 bg-white rounded-xl p-4 border border-border shadow-md">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-navy">{stage.name}</h3>
                        {stage.status === 'complete' && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 + 0.3, type: 'spring' }}
                            className="text-xs font-semibold text-green bg-green/10 px-2 py-1 rounded-full"
                          >
                            ✓ Inspected
                          </motion.span>
                        )}
                        {stage.status === 'current' && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 + 0.3 }}
                            className="text-xs font-semibold text-teal bg-teal/10 px-2 py-1 rounded-full"
                          >
                            In Progress
                          </motion.span>
                        )}
                      </div>

                      {stage.status === 'complete' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          whileInView={{ opacity: 1, height: 'auto' }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.2 + 0.5 }}
                          className="flex items-center gap-3 text-xs text-text-muted"
                        >
                          <div className="flex items-center gap-1">
                            <Camera size={12} />
                            <span>12 Photos</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FileText size={12} />
                            <span>1 Report</span>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right - Quality Issue Resolution */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl p-8 border border-border shadow-lg"
          >
            <h3 className="text-xl font-bold text-navy mb-6">Quality Issue Resolution</h3>
            
            <div className="space-y-4">
              {[
                { label: 'Issue Detected', icon: AlertTriangle, color: 'bg-orange/10 text-orange', dot: 'bg-orange' },
                { label: 'Assigned', icon: FileText, color: 'bg-blue/10 text-blue', dot: 'bg-blue' },
                { label: 'Corrective Action', icon: Eye, color: 'bg-teal/10 text-teal', dot: 'bg-teal' },
                { label: 'Reinspection', icon: Eye, color: 'bg-navy/10 text-navy', dot: 'bg-navy' },
                { label: 'Verified & Closed', icon: CheckCircle, color: 'bg-green/10 text-green', dot: 'bg-green' },
              ].map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className="flex items-center gap-4"
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${step.color}`}>
                      <Icon size={18} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-navy">{step.label}</p>
                    </div>
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.3, type: 'spring' }}
                      className={`w-3 h-3 rounded-full ${step.dot}`}
                    />
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
              className="mt-8 p-4 bg-bg rounded-xl border border-border"
            >
              <p className="text-sm text-text-muted text-center">
                BuildSure creates visibility around quality issues instead of letting them disappear into conversations.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
