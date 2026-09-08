import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18" />
                  <path d="M5 21V7l7-4 7 4v14" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight">Build<span className="text-teal-light">Sure</span></span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm mb-4">
              Build Better. Connect Smarter. Connecting property owners with construction professionals through structured procurement, competitive bidding and quality assurance.
            </p>
            <p className="text-white/50 text-xs">Starting in Lucknow, India.</p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white/80 mb-4">Platform</h4>
            <ul className="space-y-2.5">
              <li><Link to="/projects" className="text-white/70 hover:text-orange text-sm transition-colors">Projects</Link></li>
              <li><Link to="/contractors" className="text-white/70 hover:text-orange text-sm transition-colors">Contractors</Link></li>
              <li><Link to="/financing" className="text-white/70 hover:text-orange text-sm transition-colors">Financing</Link></li>
              <li><Link to="/how-it-works" className="text-white/70 hover:text-orange text-sm transition-colors">How It Works</Link></li>
              <li><Link to="/quality-assurance" className="text-white/70 hover:text-orange text-sm transition-colors">Quality Assurance</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white/80 mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li><Link to="/about" className="text-white/70 hover:text-orange text-sm transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-white/70 hover:text-orange text-sm transition-colors">Contact</Link></li>
              <li><Link to="/faq" className="text-white/70 hover:text-orange text-sm transition-colors">FAQ</Link></li>
              <li><Link to="/architect-partnership" className="text-white/70 hover:text-orange text-sm transition-colors">Architects / Engineers</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white/80 mb-4">Legal</h4>
            <ul className="space-y-2.5">
              <li><Link to="/privacy" className="text-white/70 hover:text-orange text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-white/70 hover:text-orange text-sm transition-colors">Terms of Service</Link></li>
              <li><Link to="/disclaimer" className="text-white/70 hover:text-orange text-sm transition-colors">Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">© {new Date().getFullYear()} BuildSure. All rights reserved.</p>
          <p className="text-white/70 text-sm font-medium">BUILD BETTER. CONNECT SMARTER.</p>
        </div>
      </div>
    </footer>
  );
}
