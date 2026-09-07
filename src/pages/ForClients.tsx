import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, ClipboardList, BarChart3, Search, Users, Eye, Award, FileText, Clock, Banknote, Shield } from 'lucide-react';

export default function ForClients() {
  const features = [
    { title: 'Post Requirement', desc: 'Create structured construction requirements with all necessary details.', icon: ClipboardList },
    { title: 'Competitive Bids', desc: 'Receive multiple bids from verified contractors.', icon: BarChart3 },
    { title: 'Smart Bid Comparison', desc: 'Compare bids across price, scope, timeline, materials and more.', icon: Search },
    { title: 'Contractor Selection', desc: 'Choose the contractor that best fits your project needs.', icon: Users },
    { title: 'Project Monitoring', desc: 'Track construction progress with clear visibility.', icon: Eye },
    { title: 'Quality Assurance', desc: 'Independent inspections at key construction stages.', icon: Award },
    { title: 'Material Verification', desc: 'Record and verify materials used on site.', icon: Shield },
    { title: 'Milestone Tracking', desc: 'Track project milestones and completion status.', icon: Clock },
    { title: 'Reports & Documents', desc: 'Access project reports, documents and records.', icon: FileText },
    { title: 'Finance Assistance', desc: 'Connect with financing partners for construction funding.', icon: Banknote },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-slate-warm py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy tracking-tight">
              Your Project. Your Choice.<br />More Visibility.
            </h1>
            <p className="mt-4 text-lg text-navy-light/70 leading-relaxed">
              Create construction requirements and receive competitive bids from verified contractors. Compare, choose and monitor — all in one place.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/get-started" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-teal hover:bg-teal-dark rounded-xl transition-all shadow-lg shadow-teal/20">
                Post Your Requirement <ArrowRight size={18} />
              </Link>
            </div>
            <p className="mt-3 text-sm text-gray-500">Post your requirement free</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-10">Everything You Need</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="p-6 bg-slate-warm rounded-2xl border border-border-light hover:shadow-md transition-shadow">
                <div className="w-11 h-11 bg-teal/10 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon size={20} className="text-teal" />
                </div>
                <h3 className="text-base font-bold text-navy">{feature.title}</h3>
                <p className="mt-2 text-sm text-navy-light/70 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bid Comparison */}
      <section className="py-16 lg:py-24 bg-slate-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight">
                Smart Bid Comparison
              </h2>
              <p className="mt-4 text-navy-light/70 leading-relaxed">
                Compare contractor bids across multiple parameters. Lowest price isn't always the best choice — BuildSure helps you understand the complete offer before making the final decision.
              </p>
              <div className="mt-6 space-y-3">
                {['Bid Amount', 'Timeline', 'Experience', 'Similar Projects', 'Scope Details', 'Materials', 'Warranty', 'Quality History'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-teal shrink-0" />
                    <span className="text-sm text-navy-light">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-border-light shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-teal bg-teal/10 px-2 py-1 rounded">DEMO DATA</span>
                <span className="text-xs text-gray-500">3 Bids Received</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border-light">
                      <th className="text-left py-2 text-xs font-semibold text-gray-500">Parameter</th>
                      <th className="text-center py-2 text-xs font-semibold text-gray-500">Contractor A</th>
                      <th className="text-center py-2 text-xs font-semibold text-gray-500">Contractor B</th>
                      <th className="text-center py-2 text-xs font-semibold text-gray-500">Contractor C</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light">
                    {[
                      ['Bid Amount', '₹28.5L', '₹31.2L', '₹33.8L'],
                      ['Timeline', '10 months', '8 months', '9 months'],
                      ['Experience', '8 years', '12 years', '15 years'],
                      ['Similar Projects', '5', '12', '18'],
                      ['Warranty', '1 year', '2 years', '3 years'],
                    ].map((row, i) => (
                      <tr key={i}>
                        <td className="py-2.5 text-xs font-medium text-navy">{row[0]}</td>
                        <td className="py-2.5 text-xs text-center text-navy-light">{row[1]}</td>
                        <td className="py-2.5 text-xs text-center text-navy-light">{row[2]}</td>
                        <td className="py-2.5 text-xs text-center text-navy-light">{row[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-[10px] font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded">A: Lowest Price</span>
                <span className="text-[10px] font-semibold px-2 py-1 bg-green-100 text-green-700 rounded">B: Best Value</span>
                <span className="text-[10px] font-semibold px-2 py-1 bg-amber-100 text-amber-700 rounded">C: Best Rated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy">Start Your Construction Project</h2>
          <p className="mt-3 text-navy-light/70">Post your requirement and receive competitive bids from verified contractors.</p>
          <div className="mt-8">
            <Link to="/get-started" className="inline-flex items-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-teal hover:bg-teal-dark rounded-xl transition-all shadow-lg shadow-teal/20">
              Get Started as Client <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
