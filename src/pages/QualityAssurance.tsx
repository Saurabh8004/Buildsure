import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, CheckSquare, Camera, AlertTriangle, RefreshCw, Award, Eye, ClipboardList, Package } from 'lucide-react';

export default function QualityAssurance() {
  const stages = [
    'Foundation', 'RCC / Structure', 'Brickwork', 'Plumbing',
    'Electrical', 'Waterproofing', 'Plaster', 'Flooring',
    'Doors & Windows', 'Painting', 'Finishing', 'Final Inspection', 'Handover'
  ];

  const features = [
    { title: 'Site Inspections', desc: 'Independent inspections at key construction stages.', icon: Eye },
    { title: 'Material Verification', desc: 'Record and verify materials used on site.', icon: Package },
    { title: 'Progress Photos', desc: 'Visual documentation of construction progress.', icon: Camera },
    { title: 'Milestone Tracking', desc: 'Track completion of project milestones.', icon: CheckSquare },
    { title: 'Quality Issues', desc: 'Document and track quality issues.', icon: AlertTriangle },
    { title: 'Corrective Actions', desc: 'Assign and track corrective measures.', icon: ClipboardList },
    { title: 'Reinspection', desc: 'Verify that issues have been resolved.', icon: RefreshCw },
    { title: 'Final Handover', desc: 'Final inspection before project handover.', icon: Award },
  ];

  const workflow = ['Issue Found', 'Assigned', 'Corrective Action', 'Reinspection', 'Closed'];

  return (
    <div>
      {/* Hero */}
      <section className="bg-slate-warm py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy tracking-tight">
              Don't Just Track Progress.<br />Check Quality.
            </h1>
            <p className="mt-4 text-lg text-navy-light/70 leading-relaxed">
              BuildSure supports independent project monitoring and inspections at every construction stage. Because problems are easier to fix when they are found early.
            </p>
            <div className="mt-8">
              <Link to="/get-started" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-teal hover:bg-teal-dark rounded-xl transition-all shadow-lg shadow-teal/20">
                Explore Quality Assurance <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Inspection Stages */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-4">Inspection Stages</h2>
          <p className="text-navy-light/70 mb-8">Quality checks at every critical stage of construction.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {stages.map((stage, i) => (
              <div key={i} className="flex items-center gap-2 bg-slate-warm rounded-xl px-4 py-3.5 border border-border-light">
                <div className="w-6 h-6 bg-teal/10 rounded flex items-center justify-center">
                  <CheckSquare size={12} className="text-teal" />
                </div>
                <span className="text-sm font-medium text-navy">{stage}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-24 bg-slate-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-10">Quality Assurance Features</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-border-light shadow-sm">
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

      {/* Quality Issue Workflow */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight">
              Quality Issue Resolution
            </h2>
            <p className="mt-4 text-navy-light/70">
              BuildSure creates visibility around quality issues instead of letting them disappear into conversations and WhatsApp messages.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
              {workflow.map((step, i) => (
                <div key={i} className="flex items-center gap-3 sm:gap-6">
                  <div className="bg-slate-warm rounded-xl px-5 py-4 border border-border-light text-center min-w-[120px]">
                    <div className="w-8 h-8 bg-teal/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <span className="text-xs font-bold text-teal">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <p className="text-sm font-semibold text-navy">{step}</p>
                  </div>
                  {i < workflow.length - 1 && (
                    <ArrowRight size={18} className="text-teal hidden sm:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Material Verification */}
      <section className="py-16 lg:py-24 bg-slate-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight">
                Know What Reached Your Site.
              </h2>
              <p className="mt-4 text-navy-light/70 leading-relaxed">
                Where enabled, project teams can record and verify materials used on site — including brand, grade, specification, quantity, supplier details and verification status.
              </p>
              <p className="mt-3 text-sm text-gray-500 italic">
                Material verification supports transparency. It does not guarantee material quality independently.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-border-light shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-teal bg-teal/10 px-2 py-1 rounded">DEMO DATA</span>
                <span className="text-xs text-gray-500">Material Record</span>
              </div>
              <div className="space-y-2">
                {[
                  ['Material', 'Cement'],
                  ['Brand', 'UltraTech'],
                  ['Grade', 'OPC 53'],
                  ['Quantity', '200 bags'],
                  ['Supplier', 'ABC Traders'],
                  ['Delivery Date', '10 Sep 2024'],
                  ['Invoice', 'INV-2024-0892'],
                  ['Status', '✓ Verified'],
                ].map(([label, value], i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg">
                    <span className="text-xs text-gray-500">{label}</span>
                    <span className="text-xs font-medium text-navy">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Monitoring Preview */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-slate-warm rounded-2xl p-6 border border-border-light">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-teal bg-teal/10 px-2 py-1 rounded">DEMO DATA</span>
                  <span className="text-xs text-gray-500">Project Dashboard</span>
                </div>
                <h4 className="text-sm font-bold text-navy mb-1">Residential Construction</h4>
                <p className="text-xs text-gray-500 mb-4">Gomti Nagar, Lucknow</p>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Overall Progress</span>
                    <span className="text-xs font-bold text-teal">62%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-[62%] bg-gradient-to-r from-teal to-teal-light rounded-full"></div>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  {[
                    { name: 'Foundation', status: 'complete' },
                    { name: 'Structure', status: 'complete' },
                    { name: 'Brickwork', status: 'current' },
                    { name: 'MEP', status: 'pending' },
                    { name: 'Finishing', status: 'pending' },
                  ].map((ms, i) => (
                    <div key={i} className="flex items-center gap-2">
                      {ms.status === 'complete' && <CheckCircle size={14} className="text-green-500" />}
                      {ms.status === 'current' && <div className="w-3.5 h-3.5 bg-blue-500 rounded-full"></div>}
                      {ms.status === 'pending' && <div className="w-3.5 h-3.5 bg-gray-300 rounded-full"></div>}
                      <span className="text-xs text-navy-light">{ms.name}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 p-2.5 bg-amber-50 rounded-lg">
                  <AlertTriangle size={12} className="text-amber-600" />
                  <span className="text-[11px] text-amber-700">2 open quality issues</span>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight">
                Clear View of Your Project
              </h2>
              <p className="mt-4 text-navy-light/70 leading-relaxed">
                Clients get a clearer view of what is happening on their project without needing to be on site every day. Track progress, milestones, quality issues and upcoming inspections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy">Build With Greater Confidence</h2>
          <p className="mt-3 text-navy-light/70">Start your project with quality assurance from day one.</p>
          <div className="mt-8">
            <Link to="/get-started" className="inline-flex items-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-teal hover:bg-teal-dark rounded-xl transition-all shadow-lg shadow-teal/20">
              Get Started <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
