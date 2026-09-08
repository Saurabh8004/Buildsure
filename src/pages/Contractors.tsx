import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Shield, Building2, HardHat } from 'lucide-react';

const demoContractors = [
  { name: 'Sharma Construction Co.', location: 'Lucknow', specialization: 'Residential', experience: '12 years', verified: true, categories: ['Residential', 'Renovation'] },
  { name: 'Singh Builders', location: 'Lucknow', specialization: 'Commercial', experience: '8 years', verified: true, categories: ['Commercial', 'Industrial'] },
  { name: 'Gupta & Associates', location: 'Lucknow', specialization: 'Renovation', experience: '15 years', verified: true, categories: ['Renovation', 'Residential'] },
  { name: 'Patel Infrastructure', location: 'Lucknow', specialization: 'Infrastructure', experience: '10 years', verified: true, categories: ['Infrastructure', 'Commercial'] },
  { name: 'Verma Constructions', location: 'Lucknow', specialization: 'Residential', experience: '6 years', verified: true, categories: ['Residential'] },
  { name: 'Khan Builders', location: 'Lucknow', specialization: 'Commercial', experience: '20 years', verified: true, categories: ['Commercial', 'Residential', 'Renovation'] },
];

export default function Contractors() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-grey-light py-12 lg:py-16 border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight">
              Find Trusted Construction Professionals
            </h1>
            <p className="mt-3 text-navy-light/70 text-lg">
              Connect with verified contractors on BuildSure. Compare profiles, specializations and submit your project for competitive bidding.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Link
                to="/get-started"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-orange hover:bg-orange-dark rounded-xl transition-all shadow-lg shadow-orange/20"
              >
                Post a Project <ArrowRight size={18} />
              </Link>
              <Link
                to="/get-started"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-navy border-2 border-navy hover:bg-navy hover:text-white rounded-xl transition-all"
              >
                Join as Contractor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contractors Grid */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoContractors.map((contractor, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-border-light hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-navy/5 rounded-xl flex items-center justify-center">
                    <Building2 size={20} className="text-navy" />
                  </div>
                  {contractor.verified && (
                    <span className="flex items-center gap-1 text-xs font-semibold text-green bg-green/10 px-2 py-1 rounded">
                      <Shield size={10} /> Verified
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-navy">{contractor.name}</h3>
                <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                  <MapPin size={12} /> {contractor.location}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <HardHat size={14} className="text-orange" />
                  <span className="text-sm text-navy-light">{contractor.specialization}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm text-gray-500">{contractor.experience}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {contractor.categories.map((cat, j) => (
                    <span key={j} className="text-[11px] font-medium px-2.5 py-1 bg-grey-light text-navy-light rounded-md border border-border-light">
                      {cat}
                    </span>
                  ))}
                </div>
                <Link
                  to="/get-started"
                  className="mt-5 block text-center py-2.5 text-sm font-semibold text-navy border border-border-light rounded-lg hover:border-navy hover:text-navy transition-colors"
                >
                  View Profile
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400 mb-4">DEMO DATA — Sample contractor profiles shown for demonstration. Only verified/eligible contractors can bid on projects.</p>
            <Link to="/get-started" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-orange hover:bg-orange-dark rounded-xl transition-all">
              Join as Contractor <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
