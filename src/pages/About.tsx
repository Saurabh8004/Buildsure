import { Link } from 'react-router-dom';
import { ArrowRight, Target, Eye, Heart } from 'lucide-react';

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-slate-warm py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy tracking-tight">
              Building a Better Way to Build.
            </h1>
            <p className="mt-4 text-lg text-navy-light/70 leading-relaxed">
              Construction is one of the largest investments people and businesses make. BuildSure is being built to bring more structure, transparency and quality visibility to that process.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-warm rounded-2xl p-8 border border-border-light">
              <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center mb-5">
                <Target size={22} className="text-teal" />
              </div>
              <h2 className="text-xl font-bold text-navy mb-3">Our Mission</h2>
              <p className="text-navy-light/70 leading-relaxed">
                Make construction procurement and project delivery more transparent, competitive and quality-focused.
              </p>
            </div>
            <div className="bg-slate-warm rounded-2xl p-8 border border-border-light">
              <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center mb-5">
                <Eye size={22} className="text-teal" />
              </div>
              <h2 className="text-xl font-bold text-navy mb-3">Our Vision</h2>
              <p className="text-navy-light/70 leading-relaxed">
                Build a trusted digital ecosystem connecting property owners, contractors and construction professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Believe */}
      <section className="py-16 lg:py-24 bg-slate-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-10">What We Believe</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Transparency', desc: 'Construction decisions should be made with clear information, not guesswork.' },
              { title: 'Competition', desc: 'Healthy competition among contractors leads to better value for clients.' },
              { title: 'Quality', desc: 'Quality should be checked, not assumed. Independent verification matters.' },
              { title: 'Choice', desc: 'Clients should always have the final say in choosing their contractor.' },
              { title: 'Structure', desc: 'A structured process reduces confusion, disputes and delays.' },
              { title: 'Trust', desc: 'Trust is built through visibility, verification and accountability.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-border-light">
                <div className="w-8 h-8 bg-teal/10 rounded-lg flex items-center justify-center mb-3">
                  <Heart size={14} className="text-teal" />
                </div>
                <h3 className="text-base font-bold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm text-navy-light/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-navy">Starting in Lucknow</h2>
          <p className="mt-3 text-navy-light/70 max-w-xl mx-auto">
            We're building BuildSure with local construction requirements, contractors and professionals in mind — starting with Lucknow, India.
          </p>
          <div className="mt-8">
            <Link to="/get-started" className="inline-flex items-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-teal hover:bg-teal-dark rounded-xl transition-all shadow-lg shadow-teal/20">
              Join BuildSure <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
