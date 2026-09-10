import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative bg-navy text-white overflow-hidden">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18" />
                  <path d="M5 21V7l7-4 7 4v14" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight">
                Construct<span className="text-orange">Bid</span>
              </span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm mb-4">
              Build Better. Connect Smarter. Connecting property owners with construction professionals through structured procurement, competitive bidding and quality assurance.
            </p>
            <p className="text-white/50 text-xs">Starting in Lucknow, India.</p>
          </motion.div>

          {/* Platform */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white/80 mb-4">Marketplace</h4>
            <ul className="space-y-2.5">
              <li><Link to="/projects" className="text-white/70 hover:text-orange text-sm transition-colors">Projects</Link></li>
              <li><Link to="/contractors" className="text-white/70 hover:text-orange text-sm transition-colors">Contractors</Link></li>
              <li><Link to="/how-it-works" className="text-white/70 hover:text-orange text-sm transition-colors">How It Works</Link></li>
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white/80 mb-4">Services</h4>
            <ul className="space-y-2.5">
              <li><Link to="/financing" className="text-white/70 hover:text-orange text-sm transition-colors">Financing</Link></li>
              <li><Link to="/quality-assurance" className="text-white/70 hover:text-orange text-sm transition-colors">Quality Assurance</Link></li>
              <li><Link to="/architect-partnership" className="text-white/70 hover:text-orange text-sm transition-colors">Architect / Engineer Partnership</Link></li>
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white/80 mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li><Link to="/about" className="text-white/70 hover:text-orange text-sm transition-colors">About</Link></li>
              <li><Link to="/faq" className="text-white/70 hover:text-orange text-sm transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="text-white/70 hover:text-orange text-sm transition-colors">Contact</Link></li>
            </ul>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white/80 mb-4 mt-8">Legal</h4>
            <ul className="space-y-2.5">
              <li><Link to="/privacy" className="text-white/70 hover:text-orange text-sm transition-colors">Privacy</Link></li>
              <li><Link to="/terms" className="text-white/70 hover:text-orange text-sm transition-colors">Terms</Link></li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-white/50 text-sm">© {new Date().getFullYear()} ConstructBid. All rights reserved.</p>
          <p className="text-white/70 text-sm font-medium">BUILD BETTER. CONNECT SMARTER.</p>
        </motion.div>
      </div>
    </footer>
  );
}
