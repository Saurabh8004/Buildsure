import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Shield, Eye, Award, Users, FileText, Banknote, MapPin, Clock, TrendingUp, Search } from 'lucide-react';

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy tracking-tight leading-[1.1]">
                BUILD BETTER.<br />
                <span className="text-orange">CONNECT SMARTER.</span>
              </h1>
              <p className="mt-6 text-lg text-navy-light/70 leading-relaxed max-w-xl">
                Find trusted contractors, compare competitive construction bids and get help funding your construction project.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/get-started"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 text-base font-semibold text-white bg-orange hover:bg-orange-dark rounded-xl transition-all shadow-lg shadow-orange/20"
                >
                  Post a Project <ArrowRight size={18} />
                </Link>
                <Link
                  to="/contractors"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 text-base font-semibold text-navy border-2 border-navy hover:bg-navy hover:text-white rounded-xl transition-all"
                >
                  Find Contractors
                </Link>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                For property owners, contractors, architects, engineers and construction professionals.
              </p>
            </div>
            {/* Hero Visual */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="bg-grey-light rounded-3xl p-8 border border-border-light">
                  <div className="bg-white rounded-2xl p-5 shadow-sm border border-border-light">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold text-green bg-green/10 px-2 py-1 rounded">LIVE PROJECT</span>
                      <span className="text-xs text-gray-500">3 Bids Received</span>
                    </div>
                    <h4 className="text-base font-bold text-navy">Residential Construction</h4>
                    <p className="text-sm text-gray-500 mt-1">Gomti Nagar, Lucknow • 2,400 sq.ft.</p>
                    <div className="mt-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">Budget Range</span>
                        <span className="text-sm font-semibold text-navy">₹35–45 Lakhs</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">Timeline</span>
                        <span className="text-sm font-semibold text-navy">8–10 months</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">Status</span>
                        <span className="text-xs font-semibold text-green bg-green/10 px-2 py-0.5 rounded">Bidding Open</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-border-light">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-navy/10 rounded-full"></div>
                        <div className="w-6 h-6 bg-orange/20 rounded-full -ml-2"></div>
                        <div className="w-6 h-6 bg-green/20 rounded-full -ml-2"></div>
                        <span className="text-xs text-gray-500 ml-2">+3 eligible contractors</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 bg-white rounded-2xl p-5 shadow-sm border border-border-light">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange/10 rounded-lg flex items-center justify-center">
                        <TrendingUp size={18} className="text-orange" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-navy">Smart Bid Comparison</p>
                        <p className="text-xs text-gray-500">Compare price, scope, timeline & quality</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-3 -right-3 w-20 h-20 bg-orange/5 rounded-full blur-xl"></div>
                <div className="absolute -bottom-3 -left-3 w-24 h-24 bg-navy/5 rounded-full blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE FLOW */}
      <section className="bg-grey-light py-12 lg:py-16 border-y border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-10">
            {[
              { label: 'Post a Project', icon: FileText },
              { label: 'Get Competitive Bids', icon: Users },
              { label: 'Compare', icon: Search },
              { label: 'Choose', icon: CheckCircle },
              { label: 'Build with Visibility', icon: Eye },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-4 sm:gap-6 lg:gap-10">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-border-light shadow-sm mb-2">
                    <step.icon size={20} className="text-orange" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-navy">{step.label}</span>
                </div>
                {i < 4 && (
                  <svg width="20" height="12" viewBox="0 0 20 12" className="text-gray-300 hidden sm:block">
                    <path d="M0 6h16m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight">
                Construction Projects Looking for the Right Professionals
              </h2>
              <p className="mt-2 text-navy-light/70">Active opportunities from verified clients.</p>
            </div>
            <Link to="/projects" className="text-sm font-semibold text-orange hover:text-orange-dark transition-colors flex items-center gap-1">
              View All Projects <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Residential Construction', type: 'Residential', location: 'Gomti Nagar, Lucknow', size: '2,400 sq.ft.', budget: '₹35–45 Lakhs', status: 'Verified', bidding: 'Open' },
              { name: 'Commercial Office Build', type: 'Commercial', location: 'Hazratganj, Lucknow', size: '5,000 sq.ft.', budget: '₹80L–1Cr', status: 'Verified', bidding: 'Open' },
              { name: 'Villa Renovation', type: 'Renovation', location: 'Indira Nagar, Lucknow', size: '3,200 sq.ft.', budget: '₹15–20 Lakhs', status: 'Verified', bidding: 'Open' },
            ].map((project, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-border-light hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-green bg-green/10 px-2 py-1 rounded">🟢 {project.status}</span>
                  <span className="text-xs font-medium text-orange bg-orange/10 px-2 py-1 rounded">{project.bidding}</span>
                </div>
                <h3 className="text-lg font-bold text-navy">{project.name}</h3>
                <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                  <MapPin size={12} /> {project.location}
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="bg-grey-light rounded-lg p-2.5">
                    <p className="text-[10px] text-gray-500 uppercase tracking-wide">Type</p>
                    <p className="text-xs font-semibold text-navy">{project.type}</p>
                  </div>
                  <div className="bg-grey-light rounded-lg p-2.5">
                    <p className="text-[10px] text-gray-500 uppercase tracking-wide">Size</p>
                    <p className="text-xs font-semibold text-navy">{project.size}</p>
                  </div>
                </div>
                <div className="mt-3 bg-grey-light rounded-lg p-2.5">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wide">Budget Range</p>
                  <p className="text-sm font-bold text-navy">{project.budget}</p>
                </div>
                <Link to="/projects" className="mt-4 block text-center py-2.5 text-sm font-semibold text-orange border border-orange rounded-lg hover:bg-orange hover:text-white transition-colors">
                  View Project
                </Link>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-gray-400 text-center">Sample projects shown for demonstration. Real projects appear after client posting.</p>
        </div>
      </section>

      {/* FINANCING SECTION */}
      <section className="bg-navy py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Need Funding for Your Project?
            </h2>
            <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
              Construction and working capital can put pressure on your finances. BuildSure can help connect eligible users with financing partners and make the process lighter.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-lg font-bold text-white mb-4">For Clients</h3>
              <div className="space-y-3">
                {['Construction Finance', 'Renovation Finance', 'Home Improvement Finance'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <Banknote size={16} className="text-orange shrink-0" />
                    <span className="text-sm text-gray-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-lg font-bold text-white mb-4">For Contractors</h3>
              <div className="space-y-3">
                {['Working Capital', 'Material Finance', 'Equipment Finance', 'Project Finance'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <Banknote size={16} className="text-orange shrink-0" />
                    <span className="text-sm text-gray-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link to="/financing" className="inline-flex items-center gap-2 px-7 py-4 text-base font-semibold text-white bg-orange hover:bg-orange-dark rounded-xl transition-all shadow-lg shadow-orange/30">
              Explore Financing <ArrowRight size={18} />
            </Link>
            <p className="mt-4 text-xs text-gray-400">Financing is subject to eligibility, partner policies and underwriting. BuildSure does not guarantee approval.</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight">How BuildSure Works</h2>
            <p className="mt-3 text-navy-light/70 max-w-xl mx-auto">A structured process for clients and contractors.</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Client Flow */}
            <div className="bg-grey-light rounded-2xl p-8 border border-border-light">
              <h3 className="text-lg font-bold text-navy mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange/10 rounded-lg flex items-center justify-center text-orange text-sm font-bold">C</span>
                For Clients
              </h3>
              <div className="space-y-4">
                {[
                  { num: '01', text: 'Post your project' },
                  { num: '02', text: 'BuildSure structures & reviews the requirement' },
                  { num: '03', text: 'Eligible contractors submit bids' },
                  { num: '04', text: 'Compare complete offers' },
                  { num: '05', text: 'Choose your contractor' },
                  { num: '06', text: 'Execute with quality monitoring' },
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="text-xs font-bold text-orange bg-orange/10 px-2 py-1 rounded shrink-0">{step.num}</span>
                    <span className="text-sm text-navy-light">{step.text}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Contractor Flow */}
            <div className="bg-grey-light rounded-2xl p-8 border border-border-light">
              <h3 className="text-lg font-bold text-navy mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-navy/10 rounded-lg flex items-center justify-center text-navy text-sm font-bold">K</span>
                For Contractors
              </h3>
              <div className="space-y-4">
                {[
                  { num: '01', text: 'Create your professional profile' },
                  { num: '02', text: 'Set service areas and specializations' },
                  { num: '03', text: 'Discover relevant opportunities' },
                  { num: '04', text: 'Submit structured bids' },
                  { num: '05', text: 'Get shortlisted / awarded' },
                  { num: '06', text: 'Execute the project' },
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="text-xs font-bold text-navy bg-navy/10 px-2 py-1 rounded shrink-0">{step.num}</span>
                    <span className="text-sm text-navy-light">{step.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY BUILDSURE */}
      <section className="py-16 lg:py-24 bg-grey-light border-y border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight">Why BuildSure</h2>
            <p className="mt-3 text-navy-light/70 max-w-2xl mx-auto">
              BuildSure gives clients more visibility before and during construction — while giving contractors better access to relevant project opportunities.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Transparency', desc: 'Clear information, structured bids, visible processes.', icon: Eye },
              { title: 'Competition', desc: 'Multiple contractors compete for better value.', icon: TrendingUp },
              { title: 'Verification', desc: 'Professional profiles and eligibility checks.', icon: Shield },
              { title: 'Choice', desc: 'Clients always make the final contractor decision.', icon: CheckCircle },
              { title: 'Quality', desc: 'Independent inspections and quality monitoring.', icon: Award },
              { title: 'Visibility', desc: 'Track progress, materials and milestones.', icon: Search },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-border-light hover:shadow-md transition-shadow">
                <div className="w-11 h-11 bg-orange/10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon size={20} className="text-orange" />
                </div>
                <h3 className="text-base font-bold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm text-navy-light/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUALITY ASSURANCE */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight">
                Don't Just Track Progress.<br />Check Quality.
              </h2>
              <p className="mt-4 text-navy-light/70 leading-relaxed">
                BuildSure supports independent project monitoring and inspections at key construction stages. Problems are easier to fix when they are found early.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {['Site Inspections', 'Material Verification', 'Milestone Tracking', 'Progress Photos', 'Quality Issues', 'Corrective Actions', 'Reinspection', 'Final Handover'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 p-2.5 bg-grey-light rounded-lg">
                    <CheckCircle size={14} className="text-green shrink-0" />
                    <span className="text-xs font-medium text-navy">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/quality-assurance" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-orange hover:text-orange-dark transition-colors">
                Explore Quality Assurance <ArrowRight size={14} />
              </Link>
            </div>
            {/* Quality Issue Workflow */}
            <div className="bg-grey-light rounded-2xl p-8 border border-border-light">
              <h3 className="text-base font-bold text-navy mb-6">Quality Issue Workflow</h3>
              <div className="space-y-3">
                {[
                  { label: 'Issue Found', color: 'bg-red-100 text-red-700' },
                  { label: 'Assigned', color: 'bg-orange/10 text-orange' },
                  { label: 'Corrective Action', color: 'bg-blue-100 text-blue-700' },
                  { label: 'Reinspection', color: 'bg-purple-100 text-purple-700' },
                  { label: 'Closed', color: 'bg-green/10 text-green' },
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className={`text-xs font-semibold px-3 py-1.5 rounded-lg ${step.color}`}>{step.label}</span>
                    {i < 4 && <div className="flex-1 h-px bg-border-light"></div>}
                  </div>
                ))}
              </div>
              <p className="mt-6 text-xs text-gray-500">
                BuildSure creates visibility around quality issues instead of letting them disappear into conversations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ARCHITECT PARTNERSHIP */}
      <section className="py-16 lg:py-20 bg-grey-light border-y border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight">Design. Plan. Tender. Build.</h2>
          <p className="mt-3 text-navy-light/70 max-w-xl mx-auto">
            Join the BuildSure professional network and contribute your expertise across the construction lifecycle.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {['Architectural Design', 'Structural Design', 'BOQ Preparation', 'Tender Support', 'Quality Inspection', 'Project Monitoring', 'Final Handover'].map((item, i) => (
              <span key={i} className="px-4 py-2 bg-white text-navy text-sm font-medium rounded-lg border border-border-light">
                {item}
              </span>
            ))}
          </div>
          <div className="mt-8">
            <Link to="/architect-partnership" className="inline-flex items-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-navy hover:bg-navy-light rounded-xl transition-all">
              Join the Partnership <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-navy">Starting in Lucknow</h2>
          <p className="mt-3 text-navy-light/70 max-w-lg mx-auto">
            We're building BuildSure with local construction requirements, contractors and professionals in mind — starting with Lucknow.
          </p>
          <div className="mt-8">
            <Link to="/get-started" className="inline-flex items-center gap-2 px-7 py-4 text-base font-semibold text-white bg-orange hover:bg-orange-dark rounded-xl transition-all shadow-lg shadow-orange/20">
              Join the Lucknow Launch <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
