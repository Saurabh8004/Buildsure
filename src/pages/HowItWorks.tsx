import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Search, Users, CheckCircle, Eye, HardHat } from 'lucide-react';

export default function HowItWorks() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-grey-light py-16 lg:py-20 border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy tracking-tight">
              How BuildSure Works
            </h1>
            <p className="mt-4 text-lg text-navy-light/70 leading-relaxed">
              A structured process connecting property owners with construction professionals through transparent bidding and quality monitoring.
            </p>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-10">Construction Shouldn't Feel Like a Gamble.</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-base font-bold text-navy mb-4">For Clients</h3>
              <ul className="space-y-2.5">
                {['Finding a reliable contractor', 'Comparing quotations', 'Understanding scope and exclusions', 'Unclear timelines', 'Material quality concerns', 'Poor visibility during construction', 'Quality issues discovered too late'].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-navy-light/70">
                    <span className="w-1.5 h-1.5 bg-orange rounded-full mt-1.5 shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-base font-bold text-navy mb-4">For Contractors</h3>
              <ul className="space-y-2.5">
                {['Finding genuine projects', 'Competing efficiently', 'Reaching local clients', 'Working capital pressure', 'Managing project opportunities'].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-navy-light/70">
                    <span className="w-1.5 h-1.5 bg-orange rounded-full mt-1.5 shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-base font-bold text-navy mb-4">For Professionals</h3>
              <ul className="space-y-2.5">
                {['Finding relevant projects', 'Building a trusted professional profile', 'Getting structured project opportunities'].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-navy-light/70">
                    <span className="w-1.5 h-1.5 bg-orange rounded-full mt-1.5 shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 lg:py-24 bg-grey-light border-y border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-12 text-center">The BuildSure Process</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { num: '01', title: 'POST', desc: "Tell us what you're building.", detail: 'Client creates a structured construction requirement.', icon: FileText },
              { num: '02', title: 'VERIFY', desc: 'We help structure and verify.', detail: 'Requirement is reviewed before becoming active.', icon: CheckCircle },
              { num: '03', title: 'BID', desc: 'Verified contractors compete.', detail: 'Eligible contractors submit structured bids.', icon: Users },
              { num: '04', title: 'CHOOSE', desc: 'You choose the contractor.', detail: 'Compare price, scope, experience and quality.', icon: Search },
              { num: '05', title: 'MONITOR', desc: 'Build with greater visibility.', detail: 'Inspections, milestones and quality monitoring.', icon: Eye },
            ].map((step, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-border-light text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <step.icon size={20} className="text-orange" />
                </div>
                <span className="text-xs font-bold text-orange">{step.num}</span>
                <h3 className="text-sm font-bold text-navy mt-1">{step.title}</h3>
                <p className="text-sm font-medium text-navy mt-2">{step.desc}</p>
                <p className="text-xs text-navy-light/60 mt-1">{step.detail}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/get-started" className="inline-flex items-center gap-2 px-7 py-4 text-base font-semibold text-white bg-orange hover:bg-orange-dark rounded-xl transition-all shadow-lg shadow-orange/20">
              Start Building With BuildSure <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Ecosystem */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-12 text-center">One Construction Journey. One Connected Platform.</h2>
          <div className="max-w-md mx-auto">
            <div className="space-y-3">
              {[
                { label: 'CLIENT', color: 'bg-orange/10 text-orange' },
                { label: 'PROJECT REQUIREMENT', color: 'bg-navy/5 text-navy' },
                { label: 'BUILDSURE VERIFICATION', color: 'bg-navy/5 text-navy' },
                { label: 'TENDER', color: 'bg-navy/5 text-navy' },
                { label: 'VERIFIED CONTRACTORS', color: 'bg-green/10 text-green' },
                { label: 'COMPETITIVE BIDS', color: 'bg-navy/5 text-navy' },
                { label: 'CLIENT COMPARES', color: 'bg-orange/10 text-orange' },
                { label: 'CLIENT CHOOSES', color: 'bg-orange/10 text-orange' },
                { label: 'PROJECT EXECUTION', color: 'bg-navy/5 text-navy' },
                { label: 'QUALITY MONITORING', color: 'bg-green/10 text-green' },
                { label: 'HANDOVER', color: 'bg-green/10 text-green' },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className={`flex-1 text-center text-xs font-bold px-4 py-3 rounded-lg ${step.color}`}>{step.label}</span>
                  {i < 10 && (
                    <svg width="12" height="16" viewBox="0 0 12 16" className="text-gray-300 shrink-0">
                      <path d="M6 0v12m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-16 lg:py-24 bg-grey-light border-y border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-10 text-center">Who BuildSure Is For</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { role: 'CLIENT', desc: 'Plan, compare and monitor your construction project.', icon: FileText },
              { role: 'CONTRACTOR', desc: 'Find relevant projects and submit competitive bids.', icon: HardHat },
              { role: 'ARCHITECT / ENGINEER', desc: 'Bring professional expertise into better-managed projects.', icon: Eye },
              { role: 'QUALITY INSPECTOR', desc: 'Inspect, document and improve construction quality.', icon: CheckCircle },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-border-light text-center">
                <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon size={20} className="text-orange" />
                </div>
                <h3 className="text-xs font-bold text-orange tracking-wider">{item.role}</h3>
                <p className="mt-2 text-sm text-navy-light/70">{item.desc}</p>
                <div className="mt-4 flex flex-col gap-2">
                  <Link to={`/for-${item.role.toLowerCase().includes('client') ? 'clients' : item.role.toLowerCase().includes('contractor') ? 'contractors' : item.role.toLowerCase().includes('architect') ? 'architect-partnership' : 'quality-assurance'}`} className="text-xs font-semibold text-navy hover:text-orange transition-colors">
                    Learn More
                  </Link>
                  <Link to="/get-started" className="text-xs font-semibold text-orange hover:text-orange-dark transition-colors">
                    Join BuildSure
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
