import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight, Shield, Building2, HardHat, Search, X, Briefcase, Award, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Contractor {
  id: string;
  name: string;
  location: string;
  specialization: string;
  experience: number;
  verified: boolean;
  categories: string[];
  completedProjects: number;
  serviceAreas: string[];
}

const demoContractors: Contractor[] = [
  { id: '1', name: 'Sharma Construction Co.', location: 'Lucknow', specialization: 'Residential', experience: 12, verified: true, categories: ['Residential', 'Renovation'], completedProjects: 45, serviceAreas: ['Lucknow', 'Kanpur'] },
  { id: '2', name: 'Singh Builders', location: 'Lucknow', specialization: 'Commercial', experience: 8, verified: true, categories: ['Commercial', 'Industrial'], completedProjects: 28, serviceAreas: ['Lucknow', 'Delhi'] },
  { id: '3', name: 'Gupta & Associates', location: 'Lucknow', specialization: 'Renovation', experience: 15, verified: true, categories: ['Renovation', 'Residential'], completedProjects: 62, serviceAreas: ['Lucknow'] },
  { id: '4', name: 'Patel Infrastructure', location: 'Lucknow', specialization: 'Infrastructure', experience: 10, verified: true, categories: ['Infrastructure', 'Commercial'], completedProjects: 35, serviceAreas: ['Lucknow', 'Noida'] },
  { id: '5', name: 'Verma Constructions', location: 'Lucknow', specialization: 'Residential', experience: 6, verified: true, categories: ['Residential'], completedProjects: 18, serviceAreas: ['Lucknow'] },
  { id: '6', name: 'Khan Builders', location: 'Lucknow', specialization: 'Commercial', experience: 20, verified: true, categories: ['Commercial', 'Residential', 'Renovation'], completedProjects: 89, serviceAreas: ['Lucknow', 'Kanpur', 'Delhi'] },
  { id: '7', name: 'Agarwal Civil Works', location: 'Kanpur', specialization: 'Civil Works', experience: 14, verified: true, categories: ['Civil Works', 'Infrastructure'], completedProjects: 52, serviceAreas: ['Kanpur', 'Lucknow'] },
  { id: '8', name: 'Reddy Electricals', location: 'Lucknow', specialization: 'Electrical', experience: 9, verified: true, categories: ['Electrical', 'Commercial'], completedProjects: 41, serviceAreas: ['Lucknow'] },
];

const categories = [
  { name: 'Residential', icon: Building2 },
  { name: 'Commercial', icon: Briefcase },
  { name: 'Renovation', icon: HardHat },
  { name: 'Civil Works', icon: Building2 },
  { name: 'Electrical', icon: CheckCircle },
  { name: 'Plumbing', icon: CheckCircle },
  { name: 'Interior', icon: Building2 },
  { name: 'Structural', icon: Building2 },
];

const popularLocations = ['Lucknow', 'Kanpur', 'Noida', 'Delhi', 'Jaipur'];

export default function Contractors() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique values
  const uniqueSpecializations = [...new Set(demoContractors.map(c => c.specialization))];
  const uniqueLocations = [...new Set(demoContractors.map(c => c.location))];

  // Filter contractors
  const filteredContractors = useMemo(() => {
    let filtered = [...demoContractors];

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(query) ||
        c.specialization.toLowerCase().includes(query) ||
        c.categories.some(cat => cat.toLowerCase().includes(query))
      );
    }

    // Location
    if (selectedLocation) {
      filtered = filtered.filter(c => c.location === selectedLocation);
    }

    // Specialization
    if (selectedSpecialization) {
      filtered = filtered.filter(c => c.specialization === selectedSpecialization);
    }

    // Experience
    if (selectedExperience) {
      const [min, max] = selectedExperience.split('-').map(Number);
      filtered = filtered.filter(c => {
        if (max) {
          return c.experience >= min && c.experience <= max;
        }
        return c.experience >= min;
      });
    }

    return filtered;
  }, [searchQuery, selectedLocation, selectedSpecialization, selectedExperience]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedLocation('');
    setSelectedSpecialization('');
    setSelectedExperience('');
  };

  const hasActiveFilters = searchQuery || selectedLocation || selectedSpecialization || selectedExperience;

  return (
    <div className="min-h-screen bg-bg">
      {/* Hero */}
      <section className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight">
              Find Trusted Construction Professionals
            </h1>
            <p className="mt-3 text-text-muted text-lg">
              Discover verified contractors and construction professionals based on location, specialization and project experience.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Link
                to="/projects/new"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-orange hover:bg-orange-dark rounded-xl transition-all shadow-lg shadow-orange/20"
              >
                Post a Project <ArrowRight size={18} />
              </Link>
              <Link
                to="/get-started?role=contractor"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-navy border-2 border-navy hover:bg-navy hover:text-white rounded-xl transition-all"
              >
                Join as Contractor
              </Link>
            </div>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 bg-bg rounded-2xl border border-border p-6"
          >
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search contractors by name, trade or specialization..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Location Filter */}
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-3 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange cursor-pointer"
              >
                <option value="">All Locations</option>
                {uniqueLocations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>

              {/* Specialization Filter */}
              <select
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
                className="px-4 py-3 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange cursor-pointer"
              >
                <option value="">All Specializations</option>
                {uniqueSpecializations.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  showFilters || hasActiveFilters
                    ? 'bg-orange text-white'
                    : 'bg-white border border-border text-text hover:border-navy'
                }`}
              >
                More Filters
              </button>
            </div>

            {/* Advanced Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 pt-4 border-t border-border"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Experience Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-2">Experience</label>
                      <select
                        value={selectedExperience}
                        onChange={(e) => setSelectedExperience(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange cursor-pointer"
                      >
                        <option value="">Any Experience</option>
                        <option value="0-5">0-5 years</option>
                        <option value="5-10">5-10 years</option>
                        <option value="10-15">10-15 years</option>
                        <option value="15-">15+ years</option>
                      </select>
                    </div>
                  </div>

                  {hasActiveFilters && (
                    <button
                      onClick={clearAllFilters}
                      className="mt-4 text-sm font-semibold text-text-muted hover:text-orange transition-colors"
                    >
                      Clear All Filters
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Category Shortcuts */}
      <section className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-lg font-bold text-navy mb-4">Find the right professional for your project</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {categories.map((category, i) => {
                const Icon = category.icon;
                return (
                  <motion.button
                    key={category.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    whileHover={{ y: -4 }}
                    onClick={() => setSelectedSpecialization(category.name)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                      selectedSpecialization === category.name
                        ? 'bg-orange text-white border-orange'
                        : 'bg-bg border-border hover:border-navy'
                    }`}
                  >
                    <Icon size={24} />
                    <span className="text-xs font-semibold">{category.name}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contractors Grid */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Result Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6"
          >
            <p className="text-sm text-text-muted">
              <span className="font-semibold text-navy">{filteredContractors.length}</span> contractor{filteredContractors.length !== 1 ? 's' : ''} found
            </p>
          </motion.div>

          {/* Empty State */}
          {filteredContractors.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <Building2 size={64} className="text-text-muted mx-auto mb-4" />
              <h3 className="text-xl font-bold text-navy mb-2">No contractors match your filters</h3>
              <p className="text-text-muted mb-6">Try adjusting your search or filter criteria.</p>
              <button
                onClick={clearAllFilters}
                className="px-6 py-3 bg-orange text-white font-semibold rounded-xl hover:bg-orange-dark transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          ) : (
            /* Contractors Grid */
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContractors.map((contractor, i) => (
                <motion.div
                  key={contractor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="group bg-white rounded-2xl p-6 border border-border card-shadow hover:card-shadow-hover transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-navy/5 rounded-xl flex items-center justify-center">
                      <Building2 size={20} className="text-navy" />
                    </div>
                    {contractor.verified && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.05 + 0.2, type: 'spring' }}
                        className="flex items-center gap-1 text-xs font-semibold text-green bg-green/10 px-2 py-1 rounded"
                      >
                        <Shield size={10} /> Verified
                      </motion.span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-navy">{contractor.name}</h3>
                  <p className="text-sm text-text-muted mt-1 flex items-center gap-1">
                    <MapPin size={12} /> {contractor.location}
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <HardHat size={14} className="text-blue" />
                    <span className="text-sm text-text">{contractor.specialization}</span>
                    <span className="text-border">•</span>
                    <span className="text-sm text-text-muted">{contractor.experience} years</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {contractor.categories.map((cat, j) => (
                      <span key={j} className="text-[11px] font-medium px-2.5 py-1 bg-bg text-text rounded-md border border-border">
                        {cat}
                      </span>
                    ))}
                  </div>
                  {contractor.completedProjects > 0 && (
                    <div className="mt-4 flex items-center gap-2 text-sm">
                      <Award size={14} className="text-orange" />
                      <span className="text-text-muted">{contractor.completedProjects} projects completed</span>
                    </div>
                  )}
                  <div className="mt-5 flex gap-2">
                    <Link
                      to={`/contractors/${contractor.id}`}
                      className="flex-1 text-center py-2.5 text-sm font-semibold text-navy border border-border rounded-lg hover:border-navy hover:text-navy hover:bg-navy/5 transition-colors"
                    >
                      View Profile
                    </Link>
                    <button className="px-4 py-2.5 text-sm font-semibold text-orange border border-orange rounded-lg hover:bg-orange hover:text-white transition-colors">
                      Invite
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Location Discovery */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 bg-bg rounded-2xl border border-border p-8"
          >
            <h2 className="text-xl font-bold text-navy mb-4">Find contractors near your project</h2>
            <div className="flex flex-wrap gap-3">
              {popularLocations.map((location, i) => (
                <motion.button
                  key={location}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedLocation(location)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    selectedLocation === location
                      ? 'bg-orange text-white'
                      : 'bg-white border border-border text-text hover:border-navy'
                  }`}
                >
                  {location}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-12 text-center"
          >
            <p className="text-xs text-text-muted mb-4">DEMO DATA — Sample contractor profiles shown for demonstration. Only verified/eligible contractors can bid on projects.</p>
            <Link to="/get-started?role=contractor" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-orange hover:bg-orange-dark rounded-xl transition-all shadow-sm">
              Join as Contractor <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
