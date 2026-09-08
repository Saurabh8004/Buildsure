import { Link } from 'react-router-dom';
import { MapPin, Clock, ArrowRight, Filter, Building2, Shield } from 'lucide-react';

const demoProjects = [
  { name: 'Residential Construction', type: 'Residential', location: 'Gomti Nagar, Lucknow', size: '2,400 sq.ft.', budget: '₹35–45 Lakhs', deadline: '18 Sep 2026', status: 'Verified', bidding: 'Open' },
  { name: 'Commercial Office Build', type: 'Commercial', location: 'Hazratganj, Lucknow', size: '5,000 sq.ft.', budget: '₹80L–1Cr', deadline: '22 Sep 2026', status: 'Verified', bidding: 'Open' },
  { name: 'Villa Renovation', type: 'Renovation', location: 'Indira Nagar, Lucknow', size: '3,200 sq.ft.', budget: '₹15–20 Lakhs', deadline: '20 Sep 2026', status: 'Verified', bidding: 'Open' },
  { name: 'Apartment Complex', type: 'Residential', location: 'Vikas Nagar, Lucknow', size: '12,000 sq.ft.', budget: '₹2–2.5 Cr', deadline: '25 Sep 2026', status: 'Verified', bidding: 'Open' },
  { name: 'Retail Showroom', type: 'Commercial', location: 'Mahatma Marg, Lucknow', size: '1,800 sq.ft.', budget: '₹18–25 Lakhs', deadline: '19 Sep 2026', status: 'Verified', bidding: 'Open' },
  { name: 'Independent House', type: 'Residential', location: 'Aliganj, Lucknow', size: '1,600 sq.ft.', budget: '₹22–28 Lakhs', deadline: '21 Sep 2026', status: 'Verified', bidding: 'Open' },
];

export default function Projects() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-bg py-12 lg:py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight">
                Active Construction Projects
              </h1>
              <p className="mt-2 text-text-muted">
                Verified project opportunities from clients looking for the right professionals.
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-border">
              <Filter size={16} className="text-text-muted" />
              <span className="text-sm text-text-muted">Filter by type, location, budget</span>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoProjects.map((project, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-border card-shadow hover:card-shadow-hover transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-blue/10 rounded-xl flex items-center justify-center">
                    <Building2 size={18} className="text-blue" />
                  </div>
                  <span className="flex items-center gap-1 text-xs font-semibold text-green bg-green/10 px-2 py-1 rounded">
                    <Shield size={10} /> {project.status}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-navy group-hover:text-blue transition-colors">{project.name}</h3>
                <p className="text-sm text-text-muted mt-1 flex items-center gap-1">
                  <MapPin size={12} /> {project.location}
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="bg-bg rounded-lg p-2.5">
                    <p className="text-[10px] text-text-muted uppercase tracking-wide">Type</p>
                    <p className="text-xs font-semibold text-text">{project.type}</p>
                  </div>
                  <div className="bg-bg rounded-lg p-2.5">
                    <p className="text-[10px] text-text-muted uppercase tracking-wide">Size</p>
                    <p className="text-xs font-semibold text-text">{project.size}</p>
                  </div>
                </div>
                <div className="mt-3 bg-bg rounded-lg p-2.5">
                  <p className="text-[10px] text-text-muted uppercase tracking-wide">Budget Range</p>
                  <p className="text-sm font-bold text-navy">{project.budget}</p>
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-text-muted">
                  <Clock size={12} />
                  <span>Bid deadline: {project.deadline}</span>
                </div>
                <Link
                  to="/get-started"
                  className="mt-4 block text-center py-2.5 text-sm font-semibold text-orange border border-orange rounded-lg hover:bg-orange hover:text-white transition-colors"
                >
                  View Project
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-text-muted mb-4">DEMO DATA — Sample projects shown for demonstration purposes.</p>
            <Link to="/get-started" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-orange hover:bg-orange-dark rounded-xl transition-all shadow-sm">
              Post Your Project <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
