import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Target, Eye, Heart } from 'lucide-react';

export default function About() {
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
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Building a Better Way to Build.</h1>
            <p className="mt-4 text-lg text-white/80 leading-relaxed">
              Construction is one of the largest investments people and businesses make. ConstructBid is being built to bring more structure, transparency and quality visibility to that process.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-bg rounded-2xl p-8 border border-border"
            >
              <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center mb-5">
                <Target size={22} className="text-orange" />
              </div>
              <h2 className="text-xl font-bold text-navy mb-3">Our Mission</h2>
              <p className="text-text-muted leading-relaxed">Make construction procurement and project delivery more transparent, competitive and quality-focused.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-bg rounded-2xl p-8 border border-border"
            >
              <div className="w-12 h-12 bg-blue/10 rounded-xl flex items-center justify-center mb-5">
                <Eye size={22} className="text-blue" />
              </div>
              <h2 className="text-xl font-bold text-navy mb-3">Our Vision</h2>
              <p className="text-text-muted leading-relaxed">Build a trusted digital ecosystem connecting property owners, contractors and construction professionals.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-navy mb-10">What We Believe</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Transparency', desc: 'Construction decisions should be made with clear information, not guesswork.' },
                { title: 'Competition', desc: 'Healthy competition among contractors leads to better value for clients.' },
                { title: 'Quality', desc: 'Quality should be checked, not assumed. Independent verification matters.' },
                { title: 'Choice', desc: 'Clients should always have the final say in choosing their contractor.' },
                { title: 'Structure', desc: 'A structured process reduces confusion, disputes and delays.' },
                { title: 'Trust', desc: 'Trust is built through visibility, verification and accountability.' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-2xl p-6 border border-border card-shadow hover:card-shadow-hover transition-all"
                >
                  <div className="w-8 h-8 bg-teal/10 rounded-lg flex items-center justify-center mb-3">
                    <Heart size={14} className="text-teal" />
                  </div>
                  <h3 className="text-base font-bold text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm text-text-muted leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-navy">Starting in Lucknow</h2>
            <p className="mt-3 text-text-muted max-w-xl mx-auto">We're building ConstructBid with local construction requirements, contractors and professionals in mind — starting with Lucknow, India.</p>
            <div className="mt-8">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link to="/get-started" className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-orange hover:bg-orange-dark rounded-xl transition-all shadow-lg shadow-orange/20">
                  Join ConstructBid <ArrowRight size={18} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
