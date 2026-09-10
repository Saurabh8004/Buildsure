import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Search, Users, Target, CheckCircle, Eye, Building2, HardHat, Award } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    { num: '01', title: 'POST', subtitle: "Tell us what you're building.", icon: FileText, color: 'orange' },
    { num: '02', title: 'VERIFY', subtitle: 'We help structure and verify the requirement.', icon: CheckCircle, color: 'teal' },
    { num: '03', title: 'BID', subtitle: 'Eligible contractors submit competitive bids.', icon: Users, color: 'blue' },
    { num: '04', title: 'COMPARE', subtitle: 'Compare price, scope, experience and quality indicators.', icon: Target, color: 'orange' },
    { num: '06', title: 'BUILD', subtitle: 'Execute the project with monitoring.', icon: Building2, color: 'navy' },
    { num: '07', title: 'MONITOR', subtitle: 'Track milestones, quality and documentation.', icon: Eye, color: 'teal' },
    { num: '08', title: 'HANDOVER', subtitle: 'Complete with confidence.', icon: Award, color: 'green' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-navy text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              How ConstructBid Works
            </h1>
            <p className="mt-4 text-lg text-white/80 leading-relaxed">
              A complete construction procurement lifecycle from project posting to handover.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Client Flow */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 bg-orange/10 rounded-xl flex items-center justify-center">
                <Building2 size={20} className="text-orange" />
              </div>
              <h2 className="text-3xl font-bold text-navy">For Clients</h2>
            </div>

            <div className="space-y-6">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4 p-6 bg-bg rounded-2xl border border-border"
                  >
                    <div className={`w-12 h-12 bg-${step.color}/10 rounded-xl flex items-center justify-center shrink-0`}>
                      <Icon size={20} className={`text-${step.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-xs font-bold text-${step.color} bg-${step.color}/10 px-2 py-1 rounded`}>{step.num}</span>
                        <h3 className="text-lg font-bold text-navy">{step.subtitle}</h3>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contractor Flow */}
      <section className="py-16 lg:py-24 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 bg-teal/10 rounded-xl flex items-center justify-center">
                <HardHat size={20} className="text-teal" />
              </div>
              <h2 className="text-3xl font-bold text-navy">For Contractors</h2>
            </div>

            <div className="space-y-6">
              {[
                { num: '01', title: 'Create your professional profile', desc: 'Set up your profile with company details, experience and specializations.' },
                { num: '02', title: 'Set service areas and specializations', desc: 'Define where you work and what types of projects you handle.' },
                { num: '03', title: 'Discover relevant opportunities', desc: 'Find projects that match your capabilities and location.' },
                { num: '04', title: 'Submit structured bids', desc: 'Provide detailed bids with pricing, timeline and scope.' },
                { num: '05', title: 'Get shortlisted / awarded', desc: 'Clients review bids and select their preferred contractor.' },
                { num: '06', title: 'Execute the project', desc: 'Begin construction with quality monitoring support.' },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-border"
                >
                  <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-teal">{step.num}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-navy mb-2">{step.title}</h3>
                    <p className="text-text-muted">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-navy">Ready to Get Started?</h2>
            <p className="mt-3 text-text-muted">Join ConstructBid today and experience a better way to build.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link to="/get-started" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-orange hover:bg-orange-dark rounded-xl transition-all shadow-lg shadow-orange/20">
                  Post a Project <ArrowRight size={18} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link to="/get-started?role=contractor" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-navy border-2 border-navy hover:bg-navy hover:text-white rounded-xl transition-all">
                  Join as Contractor
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
