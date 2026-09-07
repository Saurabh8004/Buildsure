import { Link } from 'react-router-dom';
import { ArrowRight, ClipboardList, FileCheck, Users, Target, Eye } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'POST',
      subtitle: "Tell us what you're building.",
      icon: ClipboardList,
      description: 'Client creates a structured construction requirement with details about the project scope, location, timeline and budget expectations.',
      details: ['Define project type and scope', 'Specify location and site details', 'Set timeline expectations', 'Upload plans or documents (optional)'],
    },
    {
      num: '02',
      title: 'VERIFY',
      subtitle: 'We help structure and verify the requirement.',
      icon: FileCheck,
      description: 'The requirement is reviewed and structured before becoming an active opportunity. This ensures clarity for all parties.',
      details: ['Requirement review and structuring', 'Scope clarification', 'Eligibility criteria set', 'Opportunity goes live'],
    },
    {
      num: '03',
      title: 'BID',
      subtitle: 'Verified contractors compete for the project.',
      icon: Users,
      description: 'Eligible and verified contractors submit structured bids with pricing, scope, timeline and material details.',
      details: ['Eligible contractors notified', 'Structured bid submission', 'Price, scope and timeline details', 'Supporting documents uploaded'],
    },
    {
      num: '04',
      title: 'CHOOSE',
      subtitle: 'You choose the contractor.',
      icon: Target,
      description: 'Compare bids on multiple parameters — price, scope, experience, timeline, materials and quality indicators. The final decision is always yours.',
      details: ['Smart bid comparison', 'Multiple evaluation parameters', 'Contractor profiles and history', 'Your decision, always'],
    },
    {
      num: '05',
      title: 'MONITOR',
      subtitle: 'Build with greater visibility.',
      icon: Eye,
      description: 'BuildSure supports independent inspections, milestone tracking, material verification and quality monitoring throughout construction.',
      details: ['Stage-wise inspections', 'Milestone tracking', 'Material verification', 'Quality issue management'],
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-slate-warm py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy tracking-tight">
              How BuildSure Works
            </h1>
            <p className="mt-4 text-lg text-navy-light/70 leading-relaxed">
              A structured, transparent process from project requirement to successful handover. Every step is designed to bring clarity and confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {steps.map((step, i) => (
              <div key={i} className="grid lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-3">
                  <div className="flex items-center gap-4">
                    <span className="text-5xl font-black text-teal/15">{step.num}</span>
                    <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center">
                      <step.icon size={22} className="text-teal" />
                    </div>
                  </div>
                  <h2 className="text-sm font-bold text-teal tracking-wider mt-3">{step.title}</h2>
                </div>
                <div className="lg:col-span-9">
                  <h3 className="text-xl font-bold text-navy">{step.subtitle}</h3>
                  <p className="mt-3 text-navy-light/70 leading-relaxed">{step.description}</p>
                  <div className="mt-4 grid sm:grid-cols-2 gap-2">
                    {step.details.map((detail, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm text-navy-light">
                        <div className="w-1.5 h-1.5 bg-teal rounded-full"></div>
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy">Ready to Start?</h2>
          <p className="mt-3 text-navy-light/70">Choose your role and get started with BuildSure.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/get-started" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-teal hover:bg-teal-dark rounded-xl transition-all shadow-lg shadow-teal/20">
              Get Started <ArrowRight size={18} />
            </Link>
            <Link to="/for-clients" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-navy border-2 border-border-light hover:border-teal hover:text-teal rounded-xl transition-all">
              For Clients
            </Link>
            <Link to="/for-contractors" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-navy border-2 border-border-light hover:border-teal hover:text-teal rounded-xl transition-all">
              For Contractors
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
