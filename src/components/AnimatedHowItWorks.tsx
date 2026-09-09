import { motion } from 'framer-motion';
import { FileText, CheckCircle, Users, Target, Award, Building2, Eye, Flag } from 'lucide-react';

const steps = [
  { icon: FileText, label: 'POST', title: 'Post Requirement', color: 'orange' },
  { icon: CheckCircle, label: 'VERIFY', title: 'Verify', color: 'teal' },
  { icon: Users, label: 'BID', title: 'Receive Bids', color: 'blue' },
  { icon: Target, label: 'COMPARE', title: 'Compare', color: 'orange' },
  { icon: Award, label: 'SELECT', title: 'Select', color: 'green' },
  { icon: Building2, label: 'BUILD', title: 'Build', color: 'navy' },
  { icon: Eye, label: 'MONITOR', title: 'Monitor', color: 'teal' },
  { icon: Flag, label: 'HANDOVER', title: 'Handover', color: 'green' },
];

export default function AnimatedHowItWorks() {
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
            How BuildSure Works
          </h2>
          <p className="mt-4 text-text-muted max-w-2xl mx-auto">
            A structured process from project posting to quality-monitored completion.
          </p>
        </motion.div>

        {/* Animated Journey */}
        <div className="relative">
          {/* Animated line */}
          <motion.div
            initial={{ width: '0%' }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute top-12 left-0 h-1 bg-gradient-to-r from-orange via-teal to-green rounded-full hidden lg:block"
          />

          {/* Steps */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const colorMap = {
                orange: 'bg-orange text-orange',
                teal: 'bg-teal text-orange',
                blue: 'bg-blue text-orange',
                green: 'bg-green text-orange',
                navy: 'bg-navy text-orange',
              };

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative"
                >
                  {/* Icon circle */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center ${colorMap[step.color as keyof typeof colorMap]} shadow-lg mb-4`}
                  >
                    <Icon size={32} />
                  </motion.div>

                  {/* Label */}
                  <div className="text-center">
                    <p className="text-xs font-bold text-orange tracking-wider mb-1">
                      {step.label}
                    </p>
                    <p className="text-sm font-medium text-navy">
                      {step.title}
                    </p>
                  </div>

                  {/* Connector dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.3, type: 'spring' }}
                    className="absolute top-12 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-2 border-orange rounded-full hidden lg:block"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="text-center mt-16"
        >
          <motion.a
            href="/get-started"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-orange hover:bg-orange-dark rounded-xl shadow-lg shadow-orange/20 transition-all"
          >
            Start Building With BuildSure
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
