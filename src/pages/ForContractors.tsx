import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, MapPin, Building2, BarChart3, Eye, FileText, Award, Briefcase, Banknote } from 'lucide-react';

export default function ForContractors() {
  const features = [
    { title: 'Localized Opportunities', desc: 'Find construction projects in your service area.', icon: MapPin },
    { title: 'Structured Requirements', desc: 'Clear project scopes and specifications.', icon: FileText },
    { title: 'Competitive Bidding', desc: 'Submit structured bids and compete fairly.', icon: BarChart3 },
    { title: 'Project Visibility', desc: 'Showcase your work and capabilities.', icon: Eye },
    { title: 'Bid Management', desc: 'Track and manage all your bids in one place.', icon: Briefcase },
    { title: 'Verified Profile', desc: 'Build a trusted professional profile.', icon: Award },
    { title: 'Project History', desc: 'Document your completed projects.', icon: Building2 },
    { title: 'Financing Assistance', desc: 'Access working capital and project finance.', icon: Banknote },
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
              Find Better Construction Opportunities.
            </h1>
            <p className="mt-4 text-lg text-white/80 leading-relaxed">
              Spend less time searching and more time building. Access verified project opportunities, submit competitive bids and grow your construction business.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link to="/get-started" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-orange hover:bg-orange-dark rounded-xl transition-all shadow-lg shadow-orange/20">
                  Join as a Contractor <ArrowRight size={18} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link to="/financing" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white border-2 border-white/30 hover:border-white hover:bg-white/10 rounded-xl transition-all">
                  Explore Financing
                </Link>
              </motion.div>
            </div>
            <p className="mt-3 text-sm text-white/60">Only verified/eligible contractors can bid on the platform.</p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-navy mb-10">What You Get</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="p-6 bg-bg rounded-2xl border border-border card-shadow hover:card-shadow-hover transition-all"
                >
                  <div className="w-11 h-11 bg-teal/10 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon size={20} className="text-teal" />
                  </div>
                  <h3 className="text-base font-bold text-navy">{feature.title}</h3>
                  <p className="mt-2 text-sm text-text-muted leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Demo Opportunity */}
      <section className="py-16 lg:py-24 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-navy tracking-tight">See What Opportunities Look Like</h2>
              <p className="mt-4 text-text-muted leading-relaxed">
                Projects on ConstructBid come with structured requirements — clear scope, budget range, timeline and location. You can quickly assess if a project matches your capabilities and service area.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  'Clear project scope and specifications',
                  'Budget range and timeline provided',
                  'Location and service area matching',
                  'Bid deadline clearly stated',
                  'Structured bid submission process',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-teal shrink-0" />
                    <span className="text-sm text-text">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 border border-border card-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-teal bg-teal/10 px-2 py-1 rounded">DEMO OPPORTUNITY</span>
                <span className="text-xs text-text-muted">New</span>
              </div>
              <h4 className="text-lg font-bold text-navy">Residential Construction</h4>
              <p className="text-sm text-text-muted mt-1 flex items-center gap-1">
                <MapPin size={12} /> Gomti Nagar, Lucknow
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="bg-bg rounded-lg p-3">
                  <p className="text-xs text-text-muted">Area</p>
                  <p className="text-sm font-semibold text-navy">2,400 sq.ft.</p>
                </div>
                <div className="bg-bg rounded-lg p-3">
                  <p className="text-xs text-text-muted">Budget</p>
                  <p className="text-sm font-semibold text-navy">₹30–40 Lakh</p>
                </div>
                <div className="bg-bg rounded-lg p-3">
                  <p className="text-xs text-text-muted">Timeline</p>
                  <p className="text-sm font-semibold text-navy">8 months</p>
                </div>
                <div className="bg-bg rounded-lg p-3">
                  <p className="text-xs text-text-muted">Bid Deadline</p>
                  <p className="text-sm font-semibold text-navy">15 Sep</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 p-3 bg-green/5 rounded-lg border border-green/20">
                <CheckCircle size={14} className="text-green" />
                <span className="text-xs text-green font-medium">Eligible to Bid</span>
              </div>
              <button className="mt-4 w-full py-2.5 text-sm font-semibold text-orange border border-orange rounded-lg hover:bg-orange hover:text-white transition-colors">
                View Opportunity
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Financing */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-navy rounded-3xl p-10 lg:p-14 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange rounded-full blur-3xl"></div>
            </div>
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Need Funds to Execute More Projects?
              </h2>
              <p className="mt-4 text-white/70 max-w-2xl mx-auto">
                Material purchases, manpower and equipment can put pressure on working capital. ConstructBid can help connect eligible contractors with financing partners.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {['Working Capital', 'Material Finance', 'Equipment Finance', 'Project Finance'].map((item, i) => (
                  <span key={i} className="px-4 py-2 bg-white/10 text-white text-sm font-medium rounded-lg border border-white/20">
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-8">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link to="/financing" className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-white bg-orange hover:bg-orange-dark rounded-xl transition-all shadow-lg shadow-orange/30">
                    Explore Financing <ArrowRight size={16} />
                  </Link>
                </motion.div>
              </div>
              <p className="mt-4 text-xs text-white/50">Financing is subject to eligibility, partner policies and underwriting. ConstructBid does not guarantee approval.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-navy">Ready to Find Better Projects?</h2>
            <p className="mt-3 text-text-muted">Join ConstructBid as a contractor and start receiving project opportunities.</p>
            <div className="mt-8">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link to="/get-started" className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-orange hover:bg-orange-dark rounded-xl transition-all shadow-lg shadow-orange/20">
                  Join as a Contractor <ArrowRight size={18} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
