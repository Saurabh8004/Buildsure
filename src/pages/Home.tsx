import { Link } from 'react-router-dom';
import { ArrowRight, Shield, CheckCircle, Building2, HardHat, Ruler, Eye, ChevronDown, MapPin, Clock, Banknote, FileText, Award, Users, Target, TrendingUp, Zap } from 'lucide-react';
import { useState } from 'react';

const demoProjects = [
  { name: 'Residential Construction', type: 'Residential', location: 'Gomti Nagar, Lucknow', size: '2,400 sq.ft.', budget: '₹35–45 Lakhs', status: 'Verified', bidding: true },
  { name: 'Commercial Office Complex', type: 'Commercial', location: 'Hazratganj, Lucknow', size: '8,500 sq.ft.', budget: '₹1.2–1.5 Cr', status: 'Verified', bidding: true },
  { name: 'Villa Renovation', type: 'Renovation', location: 'Indira Nagar, Lucknow', size: '3,200 sq.ft.', budget: '₹18–22 Lakhs', status: 'Verified', bidding: true },
];

const faqs = [
  { q: 'What is ConstructBid?', a: 'ConstructBid is a construction procurement platform connecting property owners with verified contractors, architects, engineers and quality inspectors.' },
  { q: 'How does ConstructBid work?', a: 'Clients post requirements. Eligible contractors submit competitive bids. Clients compare offers and choose their preferred contractor. Projects move into execution with quality monitoring.' },
  { q: 'Is posting a project free?', a: 'Yes, clients can post construction requirements for free on ConstructBid.' },
  { q: 'Can I choose my contractor?', a: 'Yes. Clients always make the final contractor selection. ConstructBid never selects a contractor for you.' },
  { q: 'Does ConstructBid monitor quality?', a: 'ConstructBid supports independent project monitoring and inspections at key construction stages.' },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>
      {/* Hero */}
      <section className="bg-bg py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy tracking-tight leading-[1.1]">
                BUILD BETTER.<br />
                CONNECT SMARTER.
              </h1>
              <p className="mt-5 text-lg text-text-muted leading-relaxed">
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
              <p className="mt-4 text-sm text-text-muted">
                For property owners, contractors, architects, engineers and construction professionals.
              </p>
            </div>

            {/* Hero Visual */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="bg-white rounded-3xl p-8 border border-border card-shadow">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-teal/10 rounded-xl flex items-center justify-center">
                      <Building2 size={20} className="text-teal" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-navy">Active Project</p>
                      <p className="text-xs text-text-muted">Residential Construction</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-bg rounded-lg">
                      <span className="text-xs font-medium text-text">Progress</span>
                      <span className="text-xs font-bold text-navy">62%</span>
                    </div>
                    <div className="w-full bg-bg-alt rounded-full h-2">
                      <div className="bg-teal h-2 rounded-full" style={{ width: '62%' }}></div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      <div className="text-center p-2 bg-green/5 rounded-lg">
                        <CheckCircle size={14} className="text-green mx-auto mb-1" />
                        <p className="text-[10px] font-medium text-text-muted">Foundation</p>
                      </div>
                      <div className="text-center p-2 bg-teal/5 rounded-lg">
                        <div className="w-3.5 h-3.5 bg-teal rounded-full mx-auto mb-1"></div>
                        <p className="text-[10px] font-medium text-text">Brickwork</p>
                      </div>
                      <div className="text-center p-2 bg-bg-alt rounded-lg">
                        <div className="w-3.5 h-3.5 bg-border rounded-full mx-auto mb-1"></div>
                        <p className="text-[10px] font-medium text-text-muted">MEP</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue/5 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-teal/5 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Flow */}
      <section className="py-12 bg-white border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            {[
              { label: 'Post a Project', icon: FileText },
              { label: 'Get Competitive Bids', icon: TrendingUp },
              { label: 'Compare', icon: Target },
              { label: 'Choose', icon: Users },
              { label: 'Build with Visibility', icon: Eye },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-4 sm:gap-8">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-navy/5 rounded-lg flex items-center justify-center">
                    <step.icon size={14} className="text-navy" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-navy">{step.label}</span>
                </div>
                {i < 4 && <ChevronDown size={14} className="text-border rotate-[-90deg] hidden sm:block" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 lg:py-24 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight">
                Construction Projects Looking for the Right Professionals
              </h2>
              <p className="mt-2 text-text-muted">Active opportunities from verified clients.</p>
            </div>
            <Link to="/projects" className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-blue hover:text-navy transition-colors">
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoProjects.map((project, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-border card-shadow hover:card-shadow-hover transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-blue/10 rounded-xl flex items-center justify-center">
                    <Building2 size={18} className="text-blue" />
                  </div>
                  <span className="flex items-center gap-1 text-xs font-semibold text-green bg-green/10 px-2 py-1 rounded">
                    <Shield size={10} /> {project.status}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-navy">{project.name}</h3>
                <p className="text-sm text-text-muted mt-1 flex items-center gap-1">
                  <MapPin size={12} /> {project.location}
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="bg-bg rounded-lg p-2.5">
                    <p className="text-[10px] text-text-muted uppercase tracking-wide">Size</p>
                    <p className="text-sm font-semibold text-text">{project.size}</p>
                  </div>
                  <div className="bg-bg rounded-lg p-2.5">
                    <p className="text-[10px] text-text-muted uppercase tracking-wide">Budget</p>
                    <p className="text-sm font-semibold text-text">{project.budget}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs font-medium text-teal flex items-center gap-1">
                    <Clock size={10} /> Bidding Open
                  </span>
                  <Link to="/projects" className="text-xs font-semibold text-orange hover:text-orange-dark transition-colors">
                    View Project →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center sm:hidden">
            <Link to="/projects" className="inline-flex items-center gap-1 text-sm font-semibold text-blue hover:text-navy transition-colors">
              View All Projects <ArrowRight size={14} />
            </Link>
          </div>
          <p className="mt-6 text-xs text-text-muted text-center">DEMO DATA — Sample projects shown for demonstration.</p>
        </div>
      </section>

      {/* Financing Section */}
      <section className="py-16 lg:py-24 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Need Funding for Your Project?
            </h2>
            <p className="mt-3 text-white/70 max-w-2xl mx-auto">
              Construction and working capital can put pressure on your finances. ConstructBid can help connect eligible users with financing partners and make the process lighter.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Client Finance */}
            <div className="bg-white rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-navy/5 rounded-xl flex items-center justify-center">
                  <Building2 size={18} className="text-navy" />
                </div>
                <h3 className="text-lg font-bold text-navy">For Clients</h3>
              </div>
              <div className="space-y-3">
                {['Construction Finance', 'Renovation Finance', 'Home Improvement Finance'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-bg rounded-lg">
                    <Banknote size={14} className="text-blue shrink-0" />
                    <span className="text-sm text-text">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contractor Finance */}
            <div className="bg-white rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-navy/5 rounded-xl flex items-center justify-center">
                  <HardHat size={18} className="text-navy" />
                </div>
                <h3 className="text-lg font-bold text-navy">For Contractors</h3>
              </div>
              <div className="space-y-3">
                {['Working Capital', 'Material Finance', 'Equipment Finance', 'Project Finance'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-bg rounded-lg">
                    <Banknote size={14} className="text-blue shrink-0" />
                    <span className="text-sm text-text">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link to="/financing" className="inline-flex items-center gap-2 px-7 py-4 text-base font-semibold text-white bg-orange hover:bg-orange-dark rounded-xl transition-all shadow-lg shadow-orange/30">
              Explore Financing <ArrowRight size={18} />
            </Link>
            <p className="mt-4 text-xs text-white/50">Financing is subject to eligibility, partner policies and underwriting. ConstructBid does not guarantee approval.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight">How ConstructBid Works</h2>
            <p className="mt-3 text-text-muted max-w-xl mx-auto">A structured process from project posting to quality-monitored completion.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Client Flow */}
            <div>
              <h3 className="text-lg font-bold text-navy mb-6 flex items-center gap-2">
                <div className="w-8 h-8 bg-orange/10 rounded-lg flex items-center justify-center">
                  <Building2 size={14} className="text-orange" />
                </div>
                For Clients
              </h3>
              <div className="space-y-4">
                {[
                  'Post your project',
                  'ConstructBid structures the requirement',
                  'Eligible contractors submit bids',
                  'Compare complete offers',
                  'Choose your contractor',
                  'Project execution with quality monitoring',
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-xs font-bold text-orange bg-orange/10 w-6 h-6 rounded flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    <span className="text-sm text-text">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contractor Flow */}
            <div>
              <h3 className="text-lg font-bold text-navy mb-6 flex items-center gap-2">
                <div className="w-8 h-8 bg-teal/10 rounded-lg flex items-center justify-center">
                  <HardHat size={14} className="text-teal" />
                </div>
                For Contractors
              </h3>
              <div className="space-y-4">
                {[
                  'Create your professional profile',
                  'Set service areas and specializations',
                  'Discover relevant opportunities',
                  'Submit structured bids',
                  'Get shortlisted / awarded',
                  'Execute the project',
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-xs font-bold text-teal bg-teal/10 w-6 h-6 rounded flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    <span className="text-sm text-text">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link to="/how-it-works" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-navy border-2 border-navy hover:bg-navy hover:text-white rounded-xl transition-all">
              Learn More <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why BuildSure */}
      <section className="py-16 lg:py-24 bg-bg border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight">Why ConstructBid</h2>
            <p className="mt-3 text-text-muted max-w-2xl mx-auto">
              ConstructBid gives clients more visibility before and during construction — while giving contractors better access to relevant project opportunities.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Transparency', desc: 'Clear information at every step.', icon: Eye },
              { title: 'Competition', desc: 'Multiple bids for better value.', icon: TrendingUp },
              { title: 'Verification', desc: 'Eligible professionals only.', icon: Shield },
              { title: 'Choice', desc: 'You choose your contractor.', icon: Users },
              { title: 'Quality', desc: 'Independent monitoring support.', icon: Award },
              { title: 'Visibility', desc: 'Track progress and quality.', icon: Zap },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-border card-shadow">
                <div className="w-10 h-10 bg-blue/10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon size={18} className="text-blue" />
                </div>
                <h3 className="text-base font-bold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight">
                Don't Just Track Progress.<br />Check Quality.
              </h2>
              <p className="mt-4 text-text-muted leading-relaxed">
                ConstructBid supports independent project monitoring and inspections at key construction stages. Problems are easier to fix when they are found early.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {['Site Inspections', 'Material Verification', 'Milestone Tracking', 'Progress Photos', 'Quality Issues', 'Final Handover'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-teal shrink-0" />
                    <span className="text-sm text-text">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link to="/quality-assurance" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-navy border-2 border-navy hover:bg-navy hover:text-white rounded-xl transition-all">
                  Explore Quality Assurance <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Quality Workflow */}
            <div className="bg-bg rounded-2xl p-6 border border-border">
              <h3 className="text-sm font-bold text-navy mb-4">Quality Issue Workflow</h3>
              <div className="space-y-3">
                {[
                  { label: 'Issue Found', color: 'bg-orange/10 border-orange/20', dot: 'bg-orange' },
                  { label: 'Assigned', color: 'bg-blue/5 border-blue/10', dot: 'bg-blue' },
                  { label: 'Corrective Action', color: 'bg-teal/5 border-teal/10', dot: 'bg-teal' },
                  { label: 'Reinspection', color: 'bg-navy/5 border-navy/10', dot: 'bg-navy' },
                  { label: 'Closed', color: 'bg-green/5 border-green/20', dot: 'bg-green' },
                ].map((step, i) => (
                  <div key={i} className={`flex items-center gap-3 p-3 rounded-lg border ${step.color}`}>
                    <div className={`w-2.5 h-2.5 rounded-full ${step.dot}`}></div>
                    <span className="text-xs font-medium text-text">{step.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architect Partnership */}
      <section className="py-16 lg:py-20 bg-bg border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight">Design. Plan. Tender. Build.</h2>
          <p className="mt-3 text-text-muted max-w-xl mx-auto">
            Join the ConstructBid professional network and contribute your expertise across the construction lifecycle.
          </p>
          <div className="mt-8">
            <Link to="/architect-partnership" className="inline-flex items-center gap-2 px-7 py-4 text-base font-semibold text-white bg-orange hover:bg-orange-dark rounded-xl transition-all shadow-lg shadow-orange/20">
              Join the Partnership <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight">Who ConstructBid Is For</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Client', desc: 'Plan, compare and monitor your construction project.', icon: Users, color: 'bg-orange/10', iconColor: 'text-orange' },
              { title: 'Contractor', desc: 'Find relevant projects and submit competitive bids.', icon: HardHat, color: 'bg-navy/5', iconColor: 'text-navy' },
              { title: 'Architect / Engineer', desc: 'Bring professional expertise into better-managed projects.', icon: Ruler, color: 'bg-blue/10', iconColor: 'text-blue' },
              { title: 'Quality Inspector', desc: 'Inspect, document and improve construction quality.', icon: Eye, color: 'bg-teal/10', iconColor: 'text-teal' },
            ].map((role, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-border card-shadow text-center">
                <div className={`w-12 h-12 ${role.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <role.icon size={20} className={role.iconColor} />
                </div>
                <h3 className="text-base font-bold text-navy">{role.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{role.desc}</p>
                <Link to="/get-started" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-orange hover:text-orange-dark transition-colors">
                  Join ConstructBid <ArrowRight size={12} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-20 bg-bg border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-bg transition-colors"
                  aria-expanded={openFaq === i}
                >
                  <span className="text-sm font-semibold text-navy pr-4">{faq.q}</span>
                  <ChevronDown size={18} className={`text-text-muted shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-text-muted leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/faq" className="text-sm font-semibold text-blue hover:text-navy transition-colors">
              View All FAQs →
            </Link>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-12 bg-white border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl font-bold text-navy">Starting in Lucknow</h2>
          <p className="mt-2 text-sm text-text-muted">Building with local construction requirements, contractors and professionals in mind.</p>
        </div>
      </section>
    </div>
  );
}
