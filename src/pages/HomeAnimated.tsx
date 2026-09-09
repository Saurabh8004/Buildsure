import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedHero from '../components/AnimatedHero';
import AnimatedHowItWorks from '../components/AnimatedHowItWorks';
import AnimatedBidComparison from '../components/AnimatedBidComparison';
import AnimatedProjectCard from '../components/AnimatedProjectCard';
import AnimatedQualityAssurance from '../components/AnimatedQualityAssurance';
import AnimatedSection from '../components/AnimatedSection';
import ScrollProgress from '../components/ScrollProgress';

const demoProjects = [
  { name: 'Residential Construction', type: 'Residential', location: 'Gomti Nagar, Lucknow', size: '2,400 sq.ft.', budget: '₹35–45 Lakhs', deadline: '18 Sep 2026', status: 'Verified' },
  { name: 'Commercial Office Complex', type: 'Commercial', location: 'Hazratganj, Lucknow', size: '8,500 sq.ft.', budget: '₹1.2–1.5 Cr', deadline: '22 Sep 2026', status: 'Verified' },
  { name: 'Villa Renovation', type: 'Renovation', location: 'Indira Nagar, Lucknow', size: '3,200 sq.ft.', budget: '₹18–22 Lakhs', deadline: '20 Sep 2026', status: 'Verified' },
];

export default function Home() {
  return (
    <div>
      <ScrollProgress />
      
      {/* Animated Hero */}
      <AnimatedHero />

      {/* Projects Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight">
                  Active Construction Projects
                </h2>
                <p className="mt-2 text-text-muted">Verified opportunities from clients.</p>
              </div>
              <Link to="/projects" className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-blue hover:text-navy transition-colors">
                View All <ArrowRight size={14} />
              </Link>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoProjects.map((project, i) => (
              <AnimatedProjectCard key={i} {...project} index={i} />
            ))}
          </div>

          <AnimatedSection delay={0.3}>
            <div className="mt-8 text-center">
              <p className="text-xs text-text-muted mb-4">DEMO DATA — Sample projects shown for demonstration.</p>
              <Link to="/projects" className="inline-flex items-center gap-1 text-sm font-semibold text-blue hover:text-navy transition-colors sm:hidden">
                View All Projects <ArrowRight size={14} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* How It Works */}
      <AnimatedHowItWorks />

      {/* Bid Comparison */}
      <AnimatedBidComparison />

      {/* Quality Assurance */}
      <AnimatedQualityAssurance />

      {/* Financing Section */}
      <AnimatedSection>
        <section className="py-16 lg:py-24 bg-navy">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
              >
                Need Funding for Your Project?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-3 text-white/70 max-w-2xl mx-auto"
              >
                BuildSure can help connect eligible users with financing partners.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link to="/financing" className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-orange hover:bg-orange-dark rounded-xl shadow-lg shadow-orange/30 transition-all">
                  Explore Financing <ArrowRight size={18} />
                </Link>
              </motion.div>
              <p className="mt-4 text-xs text-white/50">Financing is subject to eligibility and partner approval.</p>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* Why BuildSure */}
      <AnimatedSection>
        <section className="py-16 lg:py-24 bg-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight">Why BuildSure</h2>
              <p className="mt-3 text-text-muted max-w-2xl mx-auto">
                BuildSure gives clients more visibility before and during construction.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Transparency', desc: 'Clear information at every step.' },
                { title: 'Competition', desc: 'Multiple bids for better value.' },
                { title: 'Verification', desc: 'Eligible professionals only.' },
                { title: 'Choice', desc: 'You choose your contractor.' },
                { title: 'Quality', desc: 'Independent monitoring support.' },
                { title: 'Visibility', desc: 'Track progress and quality.' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-6 border border-border shadow-md hover:shadow-xl transition-all"
                >
                  <h3 className="text-base font-bold text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm text-text-muted">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Final CTA */}
      <AnimatedSection>
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-navy tracking-tight"
            >
              Ready to Build Better?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-text-muted text-lg"
            >
              Post your project, compare competitive bids and build with greater visibility.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link to="/get-started" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-orange hover:bg-orange-dark rounded-xl shadow-lg shadow-orange/20 transition-all">
                  Start Your Project <ArrowRight size={18} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link to="/contractors" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-navy border-2 border-navy hover:bg-navy hover:text-white rounded-xl transition-all">
                  Explore Contractors
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
