import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, ArrowRight, Filter, Building2, Shield, Search, X, ChevronDown } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  type: string;
  location: string;
  locality: string;
  size: string;
  sizeNum: number;
  budget: string;
  budgetMin: number;
  budgetMax: number;
  deadline: string;
  daysRemaining: number;
  status: string;
  bidding: string;
  postedDate: string;
}

const demoProjects: Project[] = [
  { id: '1', name: 'Residential Construction', type: 'Residential', location: 'Lucknow', locality: 'Gomti Nagar', size: '2,400 sq.ft.', sizeNum: 2400, budget: '₹35–45 Lakhs', budgetMin: 3500000, budgetMax: 4500000, deadline: '18 Sep 2026', daysRemaining: 12, status: 'Verified', bidding: 'Open', postedDate: '2026-09-01' },
  { id: '2', name: 'Commercial Office Build', type: 'Commercial', location: 'Lucknow', locality: 'Hazratganj', size: '5,000 sq.ft.', sizeNum: 5000, budget: '₹80L–1Cr', budgetMin: 8000000, budgetMax: 10000000, deadline: '22 Sep 2026', daysRemaining: 16, status: 'Verified', bidding: 'Open', postedDate: '2026-09-02' },
  { id: '3', name: 'Villa Renovation', type: 'Renovation', location: 'Lucknow', locality: 'Indira Nagar', size: '3,200 sq.ft.', sizeNum: 3200, budget: '₹15–20 Lakhs', budgetMin: 1500000, budgetMax: 2000000, deadline: '20 Sep 2026', daysRemaining: 14, status: 'Verified', bidding: 'Open', postedDate: '2026-09-03' },
  { id: '4', name: 'Apartment Complex', type: 'Residential', location: 'Lucknow', locality: 'Vikas Nagar', size: '12,000 sq.ft.', sizeNum: 12000, budget: '₹2–2.5 Cr', budgetMin: 20000000, budgetMax: 25000000, deadline: '25 Sep 2026', daysRemaining: 19, status: 'Verified', bidding: 'Open', postedDate: '2026-09-04' },
  { id: '5', name: 'Retail Showroom', type: 'Commercial', location: 'Lucknow', locality: 'Mahatma Marg', size: '1,800 sq.ft.', sizeNum: 1800, budget: '₹18–25 Lakhs', budgetMin: 1800000, budgetMax: 2500000, deadline: '19 Sep 2026', daysRemaining: 13, status: 'Verified', bidding: 'Open', postedDate: '2026-09-05' },
  { id: '6', name: 'Independent House', type: 'Residential', location: 'Lucknow', locality: 'Aliganj', size: '1,600 sq.ft.', sizeNum: 1600, budget: '₹22–28 Lakhs', budgetMin: 2200000, budgetMax: 2800000, deadline: '21 Sep 2026', daysRemaining: 15, status: 'Verified', bidding: 'Open', postedDate: '2026-09-06' },
  { id: '7', name: 'Warehouse Construction', type: 'Industrial', location: 'Lucknow', locality: 'Transport Nagar', size: '8,000 sq.ft.', sizeNum: 8000, budget: '₹60–80 Lakhs', budgetMin: 6000000, budgetMax: 8000000, deadline: '28 Sep 2026', daysRemaining: 22, status: 'Verified', bidding: 'Open', postedDate: '2026-09-07' },
  { id: '8', name: 'School Building', type: 'Infrastructure', location: 'Lucknow', locality: 'Faizabad Road', size: '15,000 sq.ft.', sizeNum: 15000, budget: '₹3–4 Cr', budgetMin: 30000000, budgetMax: 40000000, deadline: '30 Sep 2026', daysRemaining: 24, status: 'Verified', bidding: 'Open', postedDate: '2026-09-08' },
];

type SortOption = 'newest' | 'closing' | 'budget-low' | 'budget-high';

export default function Projects() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedBudgetRange, setSelectedBudgetRange] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedSizeRange, setSelectedSizeRange] = useState<string>('');

  const uniqueTypes = [...new Set(demoProjects.map(p => p.type))];
  const uniqueLocations = [...new Set(demoProjects.map(p => p.location))];

  const filteredProjects = useMemo(() => {
    let filtered = [...demoProjects];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query) ||
        p.locality.toLowerCase().includes(query) ||
        p.type.toLowerCase().includes(query)
      );
    }

    if (selectedTypes.length > 0) {
      filtered = filtered.filter(p => selectedTypes.includes(p.type));
    }

    if (selectedLocations.length > 0) {
      filtered = filtered.filter(p => selectedLocations.includes(p.location));
    }

    if (selectedBudgetRange) {
      const [min, max] = selectedBudgetRange.split('-').map(Number);
      filtered = filtered.filter(p => {
        if (max) {
          return p.budgetMin >= min && p.budgetMax <= max;
        }
        return p.budgetMin >= min;
      });
    }

    if (selectedStatus) {
      if (selectedStatus === 'closing') {
        filtered = filtered.filter(p => p.daysRemaining <= 7);
      } else if (selectedStatus === 'recent') {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        filtered = filtered.filter(p => new Date(p.postedDate) >= sevenDaysAgo);
      }
    }

    if (selectedSizeRange) {
      const [min, max] = selectedSizeRange.split('-').map(Number);
      filtered = filtered.filter(p => {
        if (max) {
          return p.sizeNum >= min && p.sizeNum <= max;
        }
        return p.sizeNum >= min;
      });
    }

    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
        break;
      case 'closing':
        filtered.sort((a, b) => a.daysRemaining - b.daysRemaining);
        break;
      case 'budget-low':
        filtered.sort((a, b) => a.budgetMin - b.budgetMin);
        break;
      case 'budget-high':
        filtered.sort((a, b) => b.budgetMax - a.budgetMax);
        break;
    }

    return filtered;
  }, [searchQuery, selectedTypes, selectedLocations, selectedBudgetRange, selectedStatus, selectedSizeRange, sortBy]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedTypes([]);
    setSelectedLocations([]);
    setSelectedBudgetRange('');
    setSelectedStatus('');
    setSelectedSizeRange('');
    setSortBy('newest');
  };

  const hasActiveFilters = selectedTypes.length > 0 || selectedLocations.length > 0 || 
                           selectedBudgetRange || selectedStatus || selectedSizeRange || searchQuery;

  return (
    <div className="min-h-screen bg-bg">
      {/* Hero */}
      <section className="bg-navy text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Active Construction Projects
            </h1>
            <p className="mt-4 text-lg text-white/80">
              Verified project opportunities from clients looking for the right professionals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Bar */}
      <section className="bg-white border-b border-border sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            {/* Search */}
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                placeholder="Search projects by name, location, or type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-bg border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-all"
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

            {/* Filter Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                showFilters || hasActiveFilters
                  ? 'bg-orange text-white'
                  : 'bg-bg border border-border text-text hover:border-navy'
              }`}
            >
              <Filter size={18} />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                  {selectedTypes.length + selectedLocations.length + (selectedBudgetRange ? 1 : 0) + (selectedStatus ? 1 : 0) + (selectedSizeRange ? 1 : 0)}
                </span>
              )}
            </motion.button>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none w-full sm:w-48 px-4 py-3 pr-10 bg-bg border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="closing">Closing Soon</option>
                <option value="budget-low">Budget: Low to High</option>
                <option value="budget-high">Budget: High to Low</option>
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
            </div>
          </motion.div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 bg-bg rounded-2xl border border-border overflow-hidden"
              >
                <div className="p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Project Type */}
                  <div>
                    <h3 className="text-sm font-semibold text-navy mb-3">Project Type</h3>
                    <div className="space-y-2">
                      {['Residential', 'Commercial', 'Renovation', 'Industrial', 'Infrastructure'].map(type => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedTypes.includes(type)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedTypes([...selectedTypes, type]);
                              } else {
                                setSelectedTypes(selectedTypes.filter(t => t !== type));
                              }
                            }}
                            className="w-4 h-4 rounded border-border accent-orange"
                          />
                          <span className="text-sm text-text">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <h3 className="text-sm font-semibold text-navy mb-3">Location</h3>
                    <div className="space-y-2">
                      {uniqueLocations.map(location => (
                        <label key={location} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedLocations.includes(location)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedLocations([...selectedLocations, location]);
                              } else {
                                setSelectedLocations(selectedLocations.filter(l => l !== location));
                              }
                            }}
                            className="w-4 h-4 rounded border-border accent-orange"
                          />
                          <span className="text-sm text-text">{location}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Budget Range */}
                  <div>
                    <h3 className="text-sm font-semibold text-navy mb-3">Budget Range</h3>
                    <div className="space-y-2">
                      {[
                        { label: 'Under ₹10 Lakhs', value: '0-1000000' },
                        { label: '₹10–25 Lakhs', value: '1000000-2500000' },
                        { label: '₹25–50 Lakhs', value: '2500000-5000000' },
                        { label: '₹50 Lakhs–₹1 Crore', value: '5000000-10000000' },
                        { label: '₹1 Crore+', value: '10000000-' },
                      ].map(range => (
                        <label key={range.value} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="budget"
                            checked={selectedBudgetRange === range.value}
                            onChange={() => setSelectedBudgetRange(range.value)}
                            className="w-4 h-4 accent-orange"
                          />
                          <span className="text-sm text-text">{range.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Project Status */}
                  <div>
                    <h3 className="text-sm font-semibold text-navy mb-3">Status</h3>
                    <div className="space-y-2">
                      {[
                        { label: 'Bidding Open', value: 'open' },
                        { label: 'Closing Soon (≤7 days)', value: 'closing' },
                        { label: 'Recently Posted', value: 'recent' },
                      ].map(status => (
                        <label key={status.value} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="status"
                            checked={selectedStatus === status.value}
                            onChange={() => setSelectedStatus(status.value)}
                            className="w-4 h-4 accent-orange"
                          />
                          <span className="text-sm text-text">{status.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Project Size */}
                  <div>
                    <h3 className="text-sm font-semibold text-navy mb-3">Project Size</h3>
                    <div className="space-y-2">
                      {[
                        { label: 'Under 1,000 sq.ft.', value: '0-1000' },
                        { label: '1,000–2,500 sq.ft.', value: '1000-2500' },
                        { label: '2,500–5,000 sq.ft.', value: '2500-5000' },
                        { label: '5,000+ sq.ft.', value: '5000-' },
                      ].map(range => (
                        <label key={range.value} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="size"
                            checked={selectedSizeRange === range.value}
                            onChange={() => setSelectedSizeRange(range.value)}
                            className="w-4 h-4 accent-orange"
                          />
                          <span className="text-sm text-text">{range.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Filter Actions */}
                <div className="px-6 py-4 bg-white border-t border-border flex items-center justify-between">
                  <button
                    onClick={clearAllFilters}
                    className="text-sm font-semibold text-text-muted hover:text-orange transition-colors"
                  >
                    Clear All Filters
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="px-6 py-2 bg-orange text-white font-semibold rounded-lg hover:bg-orange-dark transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active Filters */}
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex flex-wrap items-center gap-2"
            >
              <span className="text-sm font-semibold text-navy">Active Filters:</span>
              {selectedTypes.map(type => (
                <span key={type} className="flex items-center gap-1 px-3 py-1 bg-orange/10 text-orange text-xs font-semibold rounded-full">
                  {type}
                  <button onClick={() => setSelectedTypes(selectedTypes.filter(t => t !== type))}>
                    <X size={12} />
                  </button>
                </span>
              ))}
              {selectedLocations.map(loc => (
                <span key={loc} className="flex items-center gap-1 px-3 py-1 bg-teal/10 text-teal text-xs font-semibold rounded-full">
                  {loc}
                  <button onClick={() => setSelectedLocations(selectedLocations.filter(l => l !== loc))}>
                    <X size={12} />
                  </button>
                </span>
              ))}
              <button
                onClick={clearAllFilters}
                className="text-xs font-semibold text-text-muted hover:text-orange transition-colors ml-2"
              >
                Clear All
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Result Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6"
          >
            <p className="text-sm text-text-muted">
              <span className="font-semibold text-navy">{filteredProjects.length}</span> project{filteredProjects.length !== 1 ? 's' : ''} found
            </p>
          </motion.div>

          {/* Empty State */}
          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <Building2 size={64} className="text-text-muted mx-auto mb-4" />
              <h3 className="text-xl font-bold text-navy mb-2">No projects match your filters</h3>
              <p className="text-text-muted mb-6">Try changing your location, budget, or project type.</p>
              <button
                onClick={clearAllFilters}
                className="px-6 py-3 bg-orange text-white font-semibold rounded-xl hover:bg-orange-dark transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          ) : (
            /* Projects Grid */
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="group bg-white rounded-2xl p-6 border border-border card-shadow hover:card-shadow-hover transition-all cursor-pointer"
                  onClick={() => navigate(`/projects/${project.id}`)}
                >
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
                    <MapPin size={12} /> {project.locality}, {project.location}
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
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-text-muted flex items-center gap-1">
                      <Clock size={12} />
                      <span>{project.daysRemaining} days left</span>
                    </span>
                    <span className="font-semibold text-orange">View Project →</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-xs text-text-muted mb-4">DEMO DATA — Sample projects shown for demonstration purposes.</p>
            <Link to="/projects/new" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-orange hover:bg-orange-dark rounded-xl transition-all shadow-sm">
              Post Your Project <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
