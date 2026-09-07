import { Link } from 'react-router-dom';
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
      <section className="bg-slate-warm py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy tracking-tight">
              Find Better Construction Opportunities.
            </h1>
            <p className="mt-4 text-lg text-navy-light/70 leading-relaxed">
              Spend less time searching and more time building. Access verified project opportunities, submit competitive bids and grow your construction business.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/get-started" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-teal hover:bg-teal-dark rounded-xl transition-all shadow-lg shadow-teal/20">
                Join as a Contractor <ArrowRight size={18} />
              </Link>
              <Link to="/finance" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-navy border-2 border-border-light hover:border-teal hover:text-teal rounded-xl transition-all">
                Explore Financing
              </Link>
            </div>
            <p className="mt-3 text-sm text-gray-500">Only verified/eligible contractors can bid on the platform.</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-10">What You Get</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="p-6 bg-slate-warm rounded-2xl border border-border-light hover:shadow-md transition-shadow">
                <div className="w-11 h-11 bg-lime/20 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon size={20} className="text-green-700" />
                </div>
                <h3 className="text-base font-bold text-navy">{feature.title}</h3>
                <p className="mt-2 text-sm text-navy-light/70 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Opportunity */}
      <section className="py-16 lg:py-24 bg-slate-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight">
                See What Opportunities Look Like
              </h2>
              <p className="mt-4 text-navy-light/70 leading-relaxed">
                Projects on BuildSure come with structured requirements — clear scope, budget range, timeline and location. You can quickly assess if a project matches your capabilities and service area.
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
                    <CheckCircle size={16} className="text-lime shrink-0" />
                    <span className="text-sm text-navy-light">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-border-light shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-teal bg-teal/10 px-2 py-1 rounded">DEMO OPPORTUNITY</span>
                <span className="text-xs text-gray-500">New</span>
              </div>
              <h4 className="text-lg font-bold text-navy">Residential Construction</h4>
              <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                <MapPin size={12} /> Gomti Nagar, Lucknow
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Area</p>
                  <p className="text-sm font-semibold text-navy">2,400 sq.ft.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Budget</p>
                  <p className="text-sm font-semibold text-navy">₹30–40 Lakh</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Timeline</p>
                  <p className="text-sm font-semibold text-navy">8 months</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Bid Deadline</p>
                  <p className="text-sm font-semibold text-navy">15 Sep</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                <CheckCircle size={14} className="text-green-600" />
                <span className="text-xs text-green-700 font-medium">Matches your service area</span>
              </div>
              <button className="mt-4 w-full py-2.5 text-sm font-semibold text-teal border border-teal rounded-lg hover:bg-teal hover:text-white transition-colors">
                View Opportunity
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Financing */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-navy to-navy-light rounded-3xl p-10 lg:p-14 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-lime rounded-full blur-3xl"></div>
            </div>
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Need Funds to Execute More Projects?
              </h2>
              <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
                Material purchases, manpower and equipment can put pressure on working capital. BuildSure can help connect eligible contractors with financing partners.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {['Working Capital', 'Material Finance', 'Equipment Finance', 'Project Finance'].map((item, i) => (
                  <span key={i} className="px-4 py-2 bg-white/10 text-white text-sm font-medium rounded-lg border border-white/20">
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-8">
                <Link to="/finance" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-teal hover:bg-teal-dark rounded-xl transition-all">
                  Explore Financing <ArrowRight size={16} />
                </Link>
              </div>
              <p className="mt-4 text-xs text-gray-400">Financing is subject to eligibility, partner policies and underwriting. BuildSure does not guarantee approval.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy">Ready to Find Better Projects?</h2>
          <p className="mt-3 text-navy-light/70">Join BuildSure as a contractor and start receiving project opportunities.</p>
          <div className="mt-8">
            <Link to="/get-started" className="inline-flex items-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-teal hover:bg-teal-dark rounded-xl transition-all shadow-lg shadow-teal/20">
              Join as a Contractor <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
