import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Ruler, Building2, FileText, Users, Eye, Award, HardHat, ClipboardList, AlertTriangle } from 'lucide-react';

export default function ArchitectPartnership() {
  const services = [
    { title: 'Architectural Design', icon: Ruler },
    { title: 'Structural Design', icon: Building2 },
    { title: 'BOQ Preparation', icon: FileText },
    { title: 'Tender Preparation', icon: ClipboardList },
    { title: 'Contractor Evaluation', icon: Users },
    { title: 'Site Coordination', icon: HardHat },
    { title: 'Quality Inspection', icon: Eye },
    { title: 'Project Monitoring', icon: Award },
    { title: 'Final Inspection', icon: CheckCircle },
    { title: 'Handover', icon: Building2 },
  ];

  const inspectionItems = [
    'Water seepage',
    'Moisture',
    'Structural cracks',
    'Termite concerns',
    'Foundation red flags',
    'Electrical/plumbing concerns',
    'Construction quality issues',
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-bg py-16 lg:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy tracking-tight">
              DESIGN. PLAN. TENDER. BUILD.
            </h1>
            <p className="mt-4 text-lg text-text-muted leading-relaxed">
              Join the BuildSure professional network and contribute your expertise across the construction lifecycle.
            </p>
            <div className="mt-8">
              <Link to="/get-started" className="inline-flex items-center justify-center gap-2 px-7 py-4 text-base font-semibold text-white bg-orange hover:bg-orange-dark rounded-xl transition-all shadow-lg shadow-orange/20">
                Join the Architect Partnership <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-10">Professional Services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {services.map((service, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-bg rounded-xl border border-border">
                <div className="w-9 h-9 bg-blue/10 rounded-lg flex items-center justify-center shrink-0">
                  <service.icon size={16} className="text-blue" />
                </div>
                <span className="text-sm font-medium text-navy">{service.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-Purchase Inspection */}
      <section className="py-16 lg:py-24 bg-bg border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange/10 text-orange text-xs font-semibold rounded-full mb-4">
                <AlertTriangle size={12} />
                New Service
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight">
                Pre-Purchase Property Inspection
              </h2>
              <p className="mt-4 text-text-muted leading-relaxed">
                Professionals on BuildSure can help identify potential issues before you commit to a property purchase. Early detection saves significant cost and stress.
              </p>
              <p className="mt-3 text-sm text-text-muted italic">
                Note: Inspection findings are advisory. They do not constitute legal or structural guarantees.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-border card-shadow">
              <h3 className="text-base font-bold text-navy mb-4">Inspection Covers</h3>
              <div className="space-y-3">
                {inspectionItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-bg rounded-lg">
                    <AlertTriangle size={14} className="text-orange shrink-0" />
                    <span className="text-sm text-text">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy">Bring Your Expertise to BuildSure</h2>
          <p className="mt-3 text-text-muted">Join the professional network and work on better-managed construction projects.</p>
          <div className="mt-8">
            <Link to="/get-started" className="inline-flex items-center gap-2 px-7 py-4 text-base font-semibold text-white bg-orange hover:bg-orange-dark rounded-xl transition-all shadow-lg shadow-orange/20">
              Join as Architect / Engineer <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
