import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle, Shield, Eye, Users, Award,
  ClipboardList, Search, FileText, BarChart3, Hammer,
  Building2, Wrench, Ruler, HardHat, Banknote,
  AlertTriangle, Clock, FileCheck, TrendingUp,
  Target, Layers, CheckSquare, ArrowDown
} from 'lucide-react';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-slate-warm to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-teal/10 text-teal-dark text-xs font-semibold rounded-full mb-6">
                <span className="w-2 h-2 bg-teal rounded-full animate-pulse"></span>
                Starting in Lucknow
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy leading-tight tracking-tight">
                BUILD BETTER.<br />
                <span className="text-teal">BID SMARTER.</span>
              </h1>
              <p className="mt-6 text-lg text-navy-light/80 leading-relaxed max-w-xl">
                BuildSure brings construction requirements, verified professionals, competitive bidding and independent quality monitoring into one connected platform.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/get-started"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-teal hover:bg-teal-dark rounded-xl transition-all shadow-lg shadow-teal/20"
                >
                  Start Your Project
                  <ArrowRight size={18} />
                </Link>
                <Link
                  to="/for-contractors"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-navy border-2 border-border-light hover:border-teal hover:text-teal rounded-xl transition-all"
                >
                  Find Construction Opportunities
                </Link>
              </div>
              <p className="mt-6 text-sm text-gray-500">
                For property owners, contractors, architects, engineers and construction professionals.
              </p>
            </div>
            {/* Hero Visual */}
            <div className="relative hidden lg:block">
              <div className="bg-white rounded-2xl shadow-2xl shadow-navy/5 border border-border-light p-6 space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-border-light">
                  <div className="w-10 h-10 bg-teal/10 rounded-lg flex items-center justify-center">
                    <Building2 size={20} className="text-teal" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy">Residential Construction</p>
                    <p className="text-xs text-gray-500">Gomti Nagar, Lucknow</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Progress</span>
                    <span className="text-xs font-semibold text-teal">62%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full w-[62%] bg-gradient-to-r from-teal to-teal-light rounded-full"></div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <CheckCircle size={16} className="text-green-600 mx-auto mb-1" />
                    <p className="text-[10px] font-medium text-green-700">Foundation</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <CheckCircle size={16} className="text-green-600 mx-auto mb-1" />
                    <p className="text-[10px] font-medium text-green-700">Structure</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <div className="w-4 h-4 bg-blue-500 rounded-full mx-auto mb-1"></div>
                    <p className="text-[10px] font-medium text-blue-700">Brickwork</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-lg">
                  <AlertTriangle size={14} className="text-amber-600" />
                  <p className="text-xs text-amber-700">2 open quality issues</p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border-light">
                  <div className="flex -space-x-2">
                    <div className="w-7 h-7 rounded-full bg-teal/20 border-2 border-white flex items-center justify-center text-[10px] font-bold text-teal">C1</div>
                    <div className="w-7 h-7 rounded-full bg-lime/20 border-2 border-white flex items-center justify-center text-[10px] font-bold text-green-700">C2</div>
                    <div className="w-7 h-7 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-blue-700">C3</div>
                  </div>
                  <span className="text-xs text-gray-500">3 competitive bids</span>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-lime/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-teal/10 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-navy py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {['Post your requirement', 'Receive competitive bids', 'Choose your contractor', 'Monitor the build', 'Complete with confidence'].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-white text-sm font-medium">{step}</span>
                {i < 4 && <ArrowDown size={14} className="text-teal-light hidden sm:block" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight">
              Construction Shouldn't Feel Like a Gamble.
            </h2>
            <p className="mt-4 text-lg text-navy-light/70">
              Whether you're building your dream home or managing multiple projects, the current process is broken.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* For Clients */}
            <div className="bg-slate-warm rounded-2xl p-8 border border-border-light">
              <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center mb-5">
                <Users size={22} className="text-teal" />
              </div>
              <h3 className="text-lg font-bold text-navy mb-4">For Clients</h3>
              <ul className="space-y-3">
                {[
                  'Finding a reliable contractor',
                  'Comparing quotations',
                  'Understanding scope and exclusions',
                  'Unclear timelines',
                  'Material quality concerns',
                  'Poor visibility during construction',
                  'Quality issues discovered too late',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-navy-light/80">
                    <AlertTriangle size={14} className="text-amber-500 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* For Contractors */}
            <div className="bg-slate-warm rounded-2xl p-8 border border-border-light">
              <div className="w-12 h-12 bg-lime/20 rounded-xl flex items-center justify-center mb-5">
                <HardHat size={22} className="text-green-700" />
              </div>
              <h3 className="text-lg font-bold text-navy mb-4">For Contractors</h3>
              <ul className="space-y-3">
                {[
                  'Finding genuine projects',
                  'Competing efficiently',
                  'Reaching local clients',
                  'Working capital pressure',
                  'Managing project opportunities',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-navy-light/80">
                    <AlertTriangle size={14} className="text-amber-500 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* For Professionals */}
            <div className="bg-slate-warm rounded-2xl p-8 border border-border-light">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-5">
                <Ruler size={22} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-navy mb-4">For Professionals</h3>
              <ul className="space-y-3">
                {[
                  'Finding relevant projects',
                  'Building a trusted professional profile',
                  'Getting structured project opportunities',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-navy-light/80">
                    <AlertTriangle size={14} className="text-amber-500 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-28 bg-slate-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight">
              How BuildSure Works
            </h2>
            <p className="mt-4 text-lg text-navy-light/70">
              A structured process from requirement to handover.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { num: '01', title: 'POST', desc: "Tell us what you're building.", detail: 'Client creates a structured construction requirement.' },
              { num: '02', title: 'VERIFY', desc: 'We help structure and verify the requirement.', detail: 'Requirement is reviewed before becoming an active opportunity.' },
              { num: '03', title: 'BID', desc: 'Verified contractors compete for the project.', detail: 'Eligible contractors submit structured bids.' },
              { num: '04', title: 'CHOOSE', desc: 'You choose the contractor.', detail: 'Compare price, scope, experience, timeline and quality indicators.' },
              { num: '05', title: 'MONITOR', desc: 'Build with greater visibility.', detail: 'Inspections, milestones, material verification and quality monitoring.' },
            ].map((step, i) => (
              <div key={i} className="relative bg-white rounded-2xl p-6 border border-border-light shadow-sm">
                <span className="text-4xl font-black text-teal/10">{step.num}</span>
                <h3 className="text-sm font-bold text-teal mt-2 tracking-wider">{step.title}</h3>
                <p className="text-sm font-semibold text-navy mt-2">{step.desc}</p>
                <p className="text-xs text-navy-light/70 mt-2 leading-relaxed">{step.detail}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/how-it-works"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-teal hover:bg-teal-dark rounded-xl transition-all shadow-lg shadow-teal/20"
            >
              Start Building With BuildSure
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* USP Section */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-navy to-navy-light rounded-3xl p-10 lg:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-lime rounded-full blur-3xl"></div>
            </div>
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                YOU CHOOSE THE CONTRACTOR.<br />
                <span className="text-teal-light">WE HELP MONITOR THE BUILD.</span>
              </h2>
              <p className="mt-6 text-gray-300 text-lg max-w-2xl mx-auto">
                BuildSure is the platform that connects clients, contractors, architects, engineers, quality inspectors and financing partners — all in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem / Connection Flow */}
      <section className="py-20 lg:py-28 bg-slate-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight">
              How Clients and Contractors Connect
            </h2>
            <p className="mt-4 text-lg text-navy-light/70">
              A transparent journey from requirement to handover.
            </p>
          </div>

          <div className="max-w-md mx-auto space-y-2">
            {[
              { label: 'CLIENT', icon: Users },
              { label: 'PROJECT REQUIREMENT', icon: ClipboardList },
              { label: 'BUILDSURE VERIFICATION', icon: FileCheck },
              { label: 'TENDER', icon: FileText },
              { label: 'VERIFIED CONTRACTORS', icon: Shield },
              { label: 'COMPETITIVE BIDS', icon: BarChart3 },
              { label: 'CLIENT COMPARES', icon: Search },
              { label: 'CLIENT CHOOSES', icon: Target },
              { label: 'PROJECT', icon: Building2 },
              { label: 'QUALITY MONITORING', icon: Eye },
              { label: 'HANDOVER', icon: Award },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex items-center gap-4 bg-white rounded-xl px-5 py-3.5 border border-border-light shadow-sm">
                  <div className="w-9 h-9 bg-teal/10 rounded-lg flex items-center justify-center shrink-0">
                    <item.icon size={18} className="text-teal" />
                  </div>
                  <span className="text-sm font-semibold text-navy tracking-wide">{item.label}</span>
                </div>
                {i < 10 && (
                  <div className="flex justify-center py-1">
                    <ArrowDown size={14} className="text-teal/50" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Clients Preview */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight">
                Your Project. Your Choice. More Visibility.
              </h2>
              <p className="mt-4 text-lg text-navy-light/70">
                Create construction requirements and receive competitive bids from verified contractors. Compare, choose and monitor — all in one place.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  'Post Requirement', 'Competitive Bids', 'Smart Bid Comparison',
                  'Contractor Selection', 'Project Monitoring', 'Quality Assurance',
                  'Material Verification', 'Milestone Tracking', 'Reports & Documents',
                  'Finance Assistance'
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-teal shrink-0" />
                    <span className="text-sm text-navy-light">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link
                  to="/for-clients"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-teal hover:bg-teal-dark rounded-xl transition-all"
                >
                  Post Your Requirement
                  <ArrowRight size={16} />
                </Link>
                <p className="mt-3 text-xs text-gray-500">Post your requirement free</p>
              </div>
            </div>
            <div className="bg-slate-warm rounded-2xl p-6 border border-border-light">
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-border-light">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-teal bg-teal/10 px-2 py-1 rounded">DEMO</span>
                    <span className="text-xs text-gray-500">Bid Comparison</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { name: 'Contractor A', amount: '₹28.5L', tag: 'Lowest Price', color: 'bg-blue-100 text-blue-700' },
                      { name: 'Contractor B', amount: '₹31.2L', tag: 'Best Value', color: 'bg-green-100 text-green-700' },
                      { name: 'Contractor C', amount: '₹33.8L', tag: 'Best Rated', color: 'bg-amber-100 text-amber-700' },
                    ].map((bid, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-navy/5 rounded-lg flex items-center justify-center text-xs font-bold text-navy">
                            {bid.name.slice(-1)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-navy">{bid.name}</p>
                            <p className="text-xs text-gray-500">{bid.amount}</p>
                          </div>
                        </div>
                        <span className={`text-[10px] font-semibold px-2 py-1 rounded ${bid.color}`}>{bid.tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-center text-gray-500 italic">Lowest price isn't always the best choice.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Contractors Preview */}
      <section className="py-20 lg:py-28 bg-slate-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-2xl p-6 border border-border-light shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-teal bg-teal/10 px-2 py-1 rounded">DEMO OPPORTUNITY</span>
                  <span className="text-xs text-gray-500">New</span>
                </div>
                <h4 className="text-lg font-bold text-navy">Residential Construction</h4>
                <p className="text-sm text-gray-500 mt-1">Gomti Nagar, Lucknow</p>
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
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight">
                Find Better Construction Opportunities.
              </h2>
              <p className="mt-4 text-lg text-navy-light/70">
                Spend less time searching and more time building. Access localized work opportunities, submit competitive bids and grow your portfolio.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  'Localized Opportunities', 'Structured Requirements', 'Competitive Bidding',
                  'Project Visibility', 'Bid Management', 'Verified Profile',
                  'Project History', 'Financing Assistance'
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-lime shrink-0" />
                    <span className="text-sm text-navy-light">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/get-started"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-teal hover:bg-teal-dark rounded-xl transition-all"
                >
                  Join as a Contractor
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/for-contractors"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-navy border-2 border-border-light hover:border-teal hover:text-teal rounded-xl transition-all"
                >
                  Explore Opportunities
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Assurance Preview */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight">
              Don't Just Track Progress. Check Quality.
            </h2>
            <p className="mt-4 text-lg text-navy-light/70">
              BuildSure supports independent project monitoring, inspections and quality verification at every stage.
            </p>
          </div>

          {/* Quality Issue Workflow */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
              {['Issue Found', 'Assigned', 'Corrective Action', 'Reinspection', 'Closed'].map((step, i) => (
                <div key={i} className="flex items-center gap-2 sm:gap-4">
                  <div className="bg-slate-warm rounded-xl px-4 py-3 border border-border-light text-center">
                    <p className="text-xs sm:text-sm font-semibold text-navy">{step}</p>
                  </div>
                  {i < 4 && <ArrowRight size={16} className="text-teal hidden sm:block" />}
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-gray-500 mt-6 max-w-xl mx-auto">
              BuildSure creates visibility around quality issues instead of letting them disappear into conversations and WhatsApp messages.
            </p>
          </div>

          {/* Inspection Stages */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              'Foundation', 'RCC / Structure', 'Brickwork', 'Plumbing',
              'Electrical', 'Waterproofing', 'Plaster', 'Flooring',
              'Doors & Windows', 'Painting', 'Finishing', 'Final Inspection'
            ].map((stage, i) => (
              <div key={i} className="flex items-center gap-2 bg-slate-warm rounded-lg px-4 py-3 border border-border-light">
                <div className="w-6 h-6 bg-teal/10 rounded flex items-center justify-center">
                  <CheckSquare size={12} className="text-teal" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-navy">{stage}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-sm text-gray-500 mb-4 italic">Problems are easier to fix when they are found early.</p>
            <Link
              to="/quality-assurance"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-teal hover:bg-teal-dark rounded-xl transition-all"
            >
              Explore Quality Assurance
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Who BuildSure Is For */}
      <section className="py-20 lg:py-28 bg-slate-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight">
              Who BuildSure Is For
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'CLIENT', desc: 'Plan, compare and monitor your construction project.', icon: Users, color: 'bg-teal/10', iconColor: 'text-teal' },
              { title: 'CONTRACTOR', desc: 'Find relevant projects and submit competitive bids.', icon: HardHat, color: 'bg-lime/20', iconColor: 'text-green-700' },
              { title: 'ARCHITECT / ENGINEER', desc: 'Bring professional expertise into better-managed projects.', icon: Ruler, color: 'bg-blue-100', iconColor: 'text-blue-600' },
              { title: 'QUALITY INSPECTOR', desc: 'Inspect, document and improve construction quality.', icon: Eye, color: 'bg-amber-100', iconColor: 'text-amber-600' },
            ].map((card, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-border-light shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center mb-4`}>
                  <card.icon size={22} className={card.iconColor} />
                </div>
                <h3 className="text-sm font-bold text-navy tracking-wider mb-2">{card.title}</h3>
                <p className="text-sm text-navy-light/70 leading-relaxed">{card.desc}</p>
                <div className="mt-4 flex gap-3">
                  <Link to="/get-started" className="text-xs font-semibold text-teal hover:underline">Join BuildSure</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why BuildSure */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight">
              One Construction Journey. One Connected Platform.
            </h2>
            <p className="mt-4 text-lg text-navy-light/70">
              BuildSure is designed to make construction more structured, transparent and easier to manage.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Transparency', desc: 'Clear requirements, clear bids, clear progress.', icon: Eye },
              { title: 'Competition', desc: 'Multiple contractors compete for your project.', icon: BarChart3 },
              { title: 'Verification', desc: 'Structured verification of requirements and professionals.', icon: FileCheck },
              { title: 'Quality', desc: 'Independent inspections and quality monitoring.', icon: Award },
              { title: 'Visibility', desc: 'See what is happening on your project.', icon: Search },
              { title: 'Choice', desc: 'You make the final decision — always.', icon: Target },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-6 bg-slate-warm rounded-2xl border border-border-light">
                <div className="w-10 h-10 bg-teal/10 rounded-lg flex items-center justify-center shrink-0">
                  <item.icon size={20} className="text-teal" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-navy">{item.title}</h3>
                  <p className="text-sm text-navy-light/70 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 lg:py-24 bg-slate-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-10 lg:p-16 border border-border-light text-center shadow-sm">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal/10 text-teal-dark text-sm font-semibold rounded-full mb-6">
              <span className="w-2 h-2 bg-teal rounded-full"></span>
              Initial Launch
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight">
              Starting in Lucknow.
            </h2>
            <p className="mt-4 text-lg text-navy-light/70 max-w-2xl mx-auto">
              We're building BuildSure with local construction requirements, contractors and professionals in mind — starting with Lucknow.
            </p>
            <div className="mt-8">
              <Link
                to="/get-started"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-teal hover:bg-teal-dark rounded-xl transition-all shadow-lg shadow-teal/20"
              >
                Join the Lucknow Launch
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight">
              Built With Trust in Mind
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { title: 'Secure Authentication', icon: Shield },
              { title: 'Role-Based Access', icon: Users },
              { title: 'Protected Documents', icon: FileText },
              { title: 'Audit Trail', icon: ClipboardList },
              { title: 'Verified Professional Profiles', icon: Award },
              { title: 'Controlled Project Access', icon: Lock },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-slate-warm rounded-xl border border-border-light">
                <item.icon size={18} className="text-teal shrink-0" />
                <span className="text-sm font-medium text-navy">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-navy to-navy-light relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-teal rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-lime rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Ready to Build Better?
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Whether you're planning a project, looking for work, or offering professional expertise — BuildSure is built for you.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/get-started"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-teal hover:bg-teal-dark rounded-xl transition-all shadow-lg"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/how-it-works"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white border-2 border-white/30 hover:border-white rounded-xl transition-all"
            >
              Learn How It Works
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Lock({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
