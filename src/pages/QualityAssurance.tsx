import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Camera, FileText, Clock, AlertTriangle, Wrench, Eye, Award } from 'lucide-react';

export default function QualityAssurance() {
  const stages = [
    'Foundation', 'RCC / Structure', 'Brickwork', 'Plumbing', 'Electrical',
    'Waterproofing', 'Plaster', 'Flooring', 'Doors & Windows', 'Painting',
    'Finishing', 'Final Inspection', 'Handover',
  ];

  const features = [
    { title: 'Site Inspections', icon: Eye },
    { title: 'Material Verification', icon: FileText },
    { title: 'Progress Photos', icon: Camera },
    { title: 'Milestone Tracking', icon: Clock },
    { title: 'Quality Issues', icon: AlertTriangle },
    { title: 'Corrective Actions', icon: Wrench },
    { title: 'Reinspection', icon: CheckCircle },
    { title: 'Final Handover', icon: Award },
  ];

  return (
    <div>
      <section className="bg-grey-light py-16 lg:py-24 border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy tracking-tight">
              Don't Just Track Progress.<br />Check Quality.
            </h1>
            <p className="mt-4 text-lg text-navy-light/70 leading-relaxed">
              BuildSure supports independent project monitoring and inspections at key construction stages. Problems are easier to fix when they are found early.
            </p>
            <div className="mt-8">
              <Link to="/get-started" className="inline-flex items-center justify-center gap-2 px-7 py-4 text-base font-semibold text-white bg-orange hover:bg-orange-dark rounded-xl transition-all shadow-lg shadow-orange/20">
                Explore Quality Assurance <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Inspection Stages */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-10">Inspection Stages</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {stages.map((stage, i) => (
              <div key={i} className="flex items-center gap-2 p-3 bg-grey-light rounded-lg border border-border-light">
                <span className="text-xs font-bold text-orange bg-orange/10 w-6 h-6 rounded flex items-center justify-center shrink-0">{i + 1}</span>
                <span className="text-xs font-medium text-navy">{stage}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-24 bg-grey-light border-y border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-10">Quality Monitoring Features</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-border-light">
                <div className="w-11 h-11 bg-green/10 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon size={20} className="text-green" />
                </div>
                <h3 className="text-base font-bold text-navy">{feature.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Issue Workflow */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-4 text-center">Quality Issue Workflow</h2>
            <p className="text-navy-light/70 text-center mb-10">
              BuildSure creates visibility around quality issues instead of letting them disappear into conversations.
            </p>
            <div className="space-y-4">
              {[
                { label: 'Issue Found', desc: 'Inspector or team member identifies a quality concern.', color: 'border-red-200 bg-red-50', dot: 'bg-red-500' },
                { label: 'Assigned', desc: 'Issue is assigned to responsible party for action.', color: 'border-orange/20 bg-orange/5', dot: 'bg-orange' },
                { label: 'Corrective Action', desc: 'Responsible party takes corrective measures.', color: 'border-blue-200 bg-blue-50', dot: 'bg-blue-500' },
                { label: 'Reinspection', desc: 'Inspector verifies corrective action was completed.', color: 'border-purple-200 bg-purple-50', dot: 'bg-purple-500' },
                { label: 'Closed', desc: 'Issue resolved and documented.', color: 'border-green/20 bg-green/5', dot: 'bg-green' },
              ].map((step, i) => (
                <div key={i} className={`flex items-start gap-4 p-4 rounded-xl border ${step.color}`}>
                  <div className={`w-3 h-3 rounded-full mt-1 shrink-0 ${step.dot}`}></div>
                  <div>
                    <h4 className="text-sm font-bold text-navy">{step.label}</h4>
                    <p className="text-xs text-navy-light/70 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Material Verification */}
      <section className="py-16 lg:py-20 bg-grey-light border-y border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy">Know What Reached Your Site</h2>
          <p className="mt-3 text-navy-light/70 max-w-xl mx-auto">
            Where enabled, project teams can record and verify materials used on site — including brand, grade, specification, quantity and verification status.
          </p>
          <div className="mt-8">
            <Link to="/get-started" className="inline-flex items-center gap-2 px-7 py-4 text-base font-semibold text-white bg-orange hover:bg-orange-dark rounded-xl transition-all shadow-lg shadow-orange/20">
              Get Started <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
