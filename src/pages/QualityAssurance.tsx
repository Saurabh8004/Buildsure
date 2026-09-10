import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Camera, FileText, Clock, AlertTriangle, Wrench, Eye, Award } from 'lucide-react';

export default function QualityAssurance() {
  const stages = [
    'Foundation', 'RCC / Structure', 'Brickwork', 'Plumbing', 'Electrical',
    'Waterproofing', 'Plaster', 'Flooring', 'Doors & Windows', 'Painting',
    'Finishing', 'Final Inspection', 'Handover',
  ];

  const features = [
    { title: 'Site Inspections', icon: Eye },
    { title: 'Material Verification', icon: FileText },
    { title: 'Progress Photos', icon: Camera },
    { title: 'Milestone Tracking', icon: Clock },
    { title: 'Quality Issues', icon: AlertTriangle },
    { title: 'Corrective Actions', icon: Wrench },
    { title: 'Reinspection', icon: CheckCircle },
    { title: 'Final Handover', icon: Award },
  ];

  return (
    <div>
      <section className="bg-navy text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Don't Just Track Progress.<br />Check Quality.
            </h1>
            <p className="mt-4 text-lg text-white/80 leading-relaxed">
              ConstructBid supports independent project monitoring and inspections at key construction stages. Problems are easier to fix when they are found early.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link to="/quality-assurance/request" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-teal hover:bg-teal-dark rounded-xl transition-all shadow-lg shadow-teal/20">
                  Request Inspection <ArrowRight size={18} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link to="/get-started" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white border-2 border-white/30 hover:border-white hover:bg-white/10 rounded-xl transition-all">
                  Learn More <ArrowRight size={18} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Inspection Stages */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-navy mb-10">Inspection Stages</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {stages.map((stage, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="flex items-center gap-2 p-3 bg-bg rounded-lg border border-border card-shadow hover:card-shadow-hover transition-all"
                >
                  <span className="text-xs font-bold text-teal bg-teal/10 w-6 h-6 rounded flex items-center justify-center shrink-0">{i + 1}</span>
                  <span className="text-xs font-medium text-navy">{stage}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-24 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-navy mb-10">Quality Monitoring Features</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-2xl p-6 border border-border card-shadow hover:card-shadow-hover transition-all"
                >
                  <div className="w-11 h-11 bg-teal/10 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon size={20} className="text-teal" />
                  </div>
                  <h3 className="text-base font-bold text-navy">{feature.title}</h3>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quality Issue Workflow */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-navy mb-4 text-center">Quality Issue Workflow</h2>
            <p className="text-text-muted text-center mb-10">
              ConstructBid creates visibility around quality issues instead of letting them disappear into conversations.
            </p>
            <div className="space-y-4">
              {[
                { label: 'Issue Found', desc: 'Inspector or team member identifies a quality concern.', color: 'bg-orange/5 border-orange/20', dot: 'bg-orange' },
                { label: 'Assigned', desc: 'Issue is assigned to responsible party for action.', color: 'bg-blue/5 border-blue/10', dot: 'bg-blue' },
                { label: 'Corrective Action', desc: 'Responsible party takes corrective measures.', color: 'bg-teal/5 border-teal/10', dot: 'bg-teal' },
                { label: 'Reinspection', desc: 'Inspector verifies corrective action was completed.', color: 'bg-navy/5 border-navy/10', dot: 'bg-navy' },
                { label: 'Closed', desc: 'Issue resolved and documented.', color: 'bg-green/5 border-green/20', dot: 'bg-green' },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex items-start gap-4 p-4 rounded-xl border ${step.color}`}
                >
                  <div className={`w-3 h-3 rounded-full mt-1 shrink-0 ${step.dot}`}></div>
                  <div>
                    <h4 className="text-sm font-bold text-navy">{step.label}</h4>
                    <p className="text-xs text-text-muted mt-0.5">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Material Verification */}
      <section className="py-16 lg:py-20 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-navy">Know What Reached Your Site</h2>
            <p className="mt-3 text-text-muted max-w-xl mx-auto">
              Where enabled, project teams can record and verify materials used on site — including brand, grade, specification, quantity and verification status.
            </p>
            <div className="mt-8">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link to="/get-started" className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-orange hover:bg-orange-dark rounded-xl transition-all shadow-lg shadow-orange/20">
                  Get Started <ArrowRight size={18} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
