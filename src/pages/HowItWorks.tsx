import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Search, Users, CheckCircle, Eye, Building2, HardHat } from 'lucide-react';

export default function HowItWorks() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-bg py-16 lg:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy tracking-tight">
              How BuildSure Works
            </h1>
            <p className="mt-4 text-lg text-text-muted leading-relaxed">
              A structured process from project posting to quality-monitored completion.
            </p>
          </div>
        </div>
      </section>

      {/* Client Flow */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-orange/10 rounded-xl flex items-center justify-center">
              <Building2 size={20} className="text-orange" />
            </div>
            <h2 className="text-2xl font-bold text-navy">For Clients</h2>
          </div>

          <div className="space-y-6">
            {[
              { num: '01', title: 'Post your project', desc: 'Create a structured construction requirement with all necessary details.', icon: FileText },
              { num: '02', title: 'BuildSure structures the requirement', desc: 'Your requirement is reviewed and structured before becoming an active opportunity.', icon: Search },
              { num: '03', title: 'Eligible contractors submit bids', desc: 'Verified contractors in your area submit competitive bids.', icon: Users },
              { num: '04', title: 'Compare complete offers', desc: 'Compare bids across price, scope, timeline, materials and more.', icon: CheckCircle },
              { num: '05', title: 'Choose your contractor', desc: 'You make the final decision based on your priorities.', icon: CheckCircle },
              { num: '06', title: 'Project execution with quality monitoring', desc: 'Move into construction with independent quality monitoring support.', icon: Eye },
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-4 p-6 bg-bg rounded-2xl border border-border">
                <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-orange">{step.num}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-navy">{step.title}</h3>
                  <p className="mt-1 text-sm text-text-muted">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contractor Flow */}
      <section className="py-16 lg:py-24 bg-bg border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-teal/10 rounded-xl flex items-center justify-center">
              <HardHat size={20} className="text-teal" />
            </div>
            <h2 className="text-2xl font-bold text-navy">For Contractors</h2>
          </div>

          <div className="space-y-6">
            {[
              { num: '01', title: 'Create your professional profile', desc: 'Set up your profile with company details, experience and specializations.' },
              { num: '02', title: 'Set service areas and specializations', desc: 'Define where you work and what types of projects you handle.' },
              { num: '03', title: 'Discover relevant opportunities', desc: 'Find projects that match your capabilities and location.' },
              { num: '04', title: 'Submit structured bids', desc: 'Provide detailed bids with pricing, timeline and scope.' },
              { num: '05', title: 'Get shortlisted / awarded', desc: 'Clients review bids and select their preferred contractor.' },
              { num: '06', title: 'Execute the project', desc: 'Begin construction with quality monitoring support.' },
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-border card-shadow">
                <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-teal">{step.num}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-navy">{step.title}</h3>
                  <p className="mt-1 text-sm text-text-muted">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy">Ready to Get Started?</h2>
          <p className="mt-3 text-text-muted">Join BuildSure today and experience a better way to build.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/get-started" className="inline-flex items-center justify-center gap-2 px-7 py-4 text-base font-semibold text-white bg-orange hover:bg-orange-dark rounded-xl transition-all shadow-lg shadow-orange/20">
              Post a Project <ArrowRight size={18} />
            </Link>
            <Link to="/get-started" className="inline-flex items-center justify-center gap-2 px-7 py-4 text-base font-semibold text-navy border-2 border-navy hover:bg-navy hover:text-white rounded-xl transition-all">
              Join as Contractor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
