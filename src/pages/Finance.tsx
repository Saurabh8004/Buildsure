import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Banknote, Building2, Wrench, Home, ArrowDown } from 'lucide-react';

export default function Finance() {
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
              Fund the Build.<br />Keep the Project Moving.
            </h1>
            <p className="mt-4 text-lg text-white/80 leading-relaxed">
              Construction and working capital can put pressure on your finances. ConstructBid helps connect eligible users with financing partners to make the process lighter.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Client Finance */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-navy mb-10">For Clients</h2>
            <div className="grid sm:grid-cols-3 gap-6 mb-12">
              {[
                { title: 'Construction Finance', desc: 'Funding for new construction projects.', icon: Building2 },
                { title: 'Renovation Finance', desc: 'Funding for renovation and remodeling.', icon: Wrench },
                { title: 'Home Improvement', desc: 'Funding for home upgrades and improvements.', icon: Home },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-bg rounded-2xl p-6 border border-border card-shadow hover:card-shadow-hover transition-all"
                >
                  <div className="w-12 h-12 bg-blue/10 rounded-xl flex items-center justify-center mb-4">
                    <item.icon size={22} className="text-blue" />
                  </div>
                  <h3 className="text-lg font-bold text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm text-text-muted">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Process */}
            <div className="bg-bg rounded-2xl p-8 border border-border">
              <h3 className="text-lg font-bold text-navy mb-6">How It Works</h3>
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
                {[
                  'Tell us what you need',
                  'Review requirements',
                  'Connect with financing partners',
                  'Partner completes approval',
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-4 sm:gap-8">
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2, type: 'spring' }}
                        className="w-10 h-10 bg-orange/10 rounded-full flex items-center justify-center mx-auto mb-2"
                      >
                        <span className="text-sm font-bold text-orange">{i + 1}</span>
                      </motion.div>
                      <p className="text-xs sm:text-sm font-medium text-text max-w-[120px]">{step}</p>
                    </div>
                    {i < 3 && <ArrowDown size={16} className="text-border hidden sm:block" />}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contractor Finance */}
      <section className="py-16 lg:py-24 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">For Contractors</h2>
            <p className="text-white/70 mb-10 max-w-2xl">
              Material purchases, manpower and equipment can put pressure on working capital. ConstructBid can help connect eligible contractors with financing partners and make the process lighter.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Working Capital', desc: 'Funds for day-to-day project operations.' },
                { title: 'Material Finance', desc: 'Funding for material procurement.' },
                { title: 'Equipment Finance', desc: 'Funding for equipment purchase or rental.' },
                { title: 'Project Finance', desc: 'Larger project-specific funding.' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-2xl p-6 border border-white/10"
                >
                  <div className="w-10 h-10 bg-orange/10 rounded-lg flex items-center justify-center mb-4">
                    <Banknote size={18} className="text-orange" />
                  </div>
                  <h3 className="text-base font-bold text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm text-text-muted">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Disclaimer + CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-navy">Explore Financing Options</h2>
            <p className="mt-3 text-text-muted">Tell us about your project and we'll help connect you with the right financing partner.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link to="/financing/request" className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-orange hover:bg-orange-dark rounded-xl transition-all shadow-lg shadow-orange/20">
                  Get Started <ArrowRight size={18} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link to="/financing" className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-navy border-2 border-navy hover:bg-navy hover:text-white rounded-xl transition-all">
                  Learn More
                </Link>
              </motion.div>
            </div>
            <p className="mt-6 text-xs text-text-muted max-w-lg mx-auto">
              Financing is subject to eligibility and partner approval. ConstructBid does not guarantee approval. ConstructBid does not provide loans directly.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
