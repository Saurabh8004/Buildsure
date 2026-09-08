import { Link } from 'react-router-dom';
import { ArrowRight, Banknote, Building2, Wrench, Home } from 'lucide-react';

export default function Finance() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-navy py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Need Funding for<br />Your Project?
            </h1>
            <p className="mt-4 text-lg text-gray-300 leading-relaxed">
              Construction and working capital can put pressure on your finances. BuildSure can help connect eligible users with financing partners and make the process lighter.
            </p>
            <div className="mt-8">
              <Link to="/get-started" className="inline-flex items-center justify-center gap-2 px-7 py-4 text-base font-semibold text-white bg-orange hover:bg-orange-dark rounded-xl transition-all shadow-lg shadow-orange/30">
                Explore Financing <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Client Finance */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-3">For Clients</h2>
          <p className="text-navy-light/70 mb-10 max-w-2xl">Whether you're building new, renovating or improving — we can help connect you with the right financing partner.</p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { title: 'Construction Finance', desc: 'Funding for new construction projects.', icon: Building2 },
              { title: 'Renovation Finance', desc: 'Funding for renovation and remodeling.', icon: Wrench },
              { title: 'Home Improvement', desc: 'Funding for home upgrades and improvements.', icon: Home },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-grey-light rounded-2xl border border-border-light">
                <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon size={22} className="text-orange" />
                </div>
                <h3 className="text-lg font-bold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm text-navy-light/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contractor Finance */}
      <section className="py-16 lg:py-24 bg-grey-light border-y border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-3">For Contractors</h2>
          <p className="text-navy-light/70 mb-10 max-w-2xl">Material purchases, manpower and equipment can put pressure on working capital. BuildSure can help connect eligible contractors with financing partners.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Working Capital', desc: 'Funds for day-to-day project operations.' },
              { title: 'Material Finance', desc: 'Funding for material procurement.' },
              { title: 'Equipment Finance', desc: 'Funding for equipment purchase or rental.' },
              { title: 'Project Finance', desc: 'Larger project-specific funding.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-border-light shadow-sm">
                <div className="w-10 h-10 bg-navy/5 rounded-lg flex items-center justify-center mb-4">
                  <Banknote size={18} className="text-navy" />
                </div>
                <h3 className="text-base font-bold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm text-navy-light/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-10 text-center">How It Works</h2>
          <div className="max-w-3xl mx-auto">
            <div className="grid sm:grid-cols-4 gap-6">
              {[
                { num: '01', text: 'Tell us what you need' },
                { num: '02', text: 'We review your requirements' },
                { num: '03', text: 'Connect with financing partners' },
                { num: '04', text: 'Partner completes approval' },
              ].map((step, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 bg-orange/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-sm font-bold text-orange">{step.num}</span>
                  </div>
                  <p className="text-sm font-medium text-navy">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA + Disclaimer */}
      <section className="py-16 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Ready to Explore Financing?</h2>
          <p className="mt-3 text-gray-300">Tell us about your project and we'll help connect you with the right partner.</p>
          <div className="mt-8">
            <Link to="/get-started" className="inline-flex items-center gap-2 px-7 py-4 text-base font-semibold text-white bg-orange hover:bg-orange-dark rounded-xl transition-all shadow-lg shadow-orange/30">
              Get Started <ArrowRight size={18} />
            </Link>
          </div>
          <p className="mt-6 text-xs text-gray-400 max-w-lg mx-auto">
            Financing is subject to eligibility and partner approval. BuildSure does not guarantee approval. BuildSure does not provide loans directly.
          </p>
        </div>
      </section>
    </div>
  );
}
