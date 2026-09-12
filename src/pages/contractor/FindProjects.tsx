import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, MapPin, Calendar, DollarSign, 
  Filter, X, Building2, CheckCircle
} from 'lucide-react';
import { tenderService } from '../../lib/services';

export default function FindProjects() {
  const [tenders, setTenders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    projectType: '',
    budgetMin: '',
    budgetMax: '',
    deadline: '',
  });

  useEffect(() => {
    loadTenders();
  }, []);

  async function loadTenders() {
    try {
      const publishedTenders = await tenderService.getPublishedTenders();
      setTenders(publishedTenders);
    } catch (error) {
      console.error('Failed to load tenders:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredTenders = tenders.filter((tender) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const title = tender.projects?.title?.toLowerCase() || '';
      const location = tender.projects?.location?.toLowerCase() || '';
      if (!title.includes(query) && !location.includes(query)) {
        return false;
      }
    }

    // Location filter
    if (filters.location) {
      const location = tender.projects?.location?.toLowerCase() || '';
      if (!location.includes(filters.location.toLowerCase())) {
        return false;
      }
    }

    // Project type filter
    if (filters.projectType) {
      const type = tender.projects?.project_type?.toLowerCase() || '';
      if (type !== filters.projectType.toLowerCase()) {
        return false;
      }
    }

    // Budget filter
    if (filters.budgetMin) {
      const min = tender.projects?.budget_min || 0;
      if (min < parseInt(filters.budgetMin)) {
        return false;
      }
    }
    if (filters.budgetMax) {
      const max = tender.projects?.budget_max || 0;
      if (max > parseInt(filters.budgetMax)) {
        return false;
      }
    }

    return true;
  });

  const clearFilters = () => {
    setFilters({
      location: '',
      projectType: '',
      budgetMin: '',
      budgetMax: '',
      deadline: '',
    });
    setSearchQuery('');
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-text-muted">Loading projects...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-navy">Find Projects</h1>
        <p className="text-text-muted mt-1">Discover new construction opportunities</p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search projects by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-all"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-border rounded-xl hover:border-orange transition-colors"
          >
            <Filter size={20} />
            <span>Filters</span>
            {(filters.location || filters.projectType || filters.budgetMin || filters.budgetMax) && (
              <span className="w-2 h-2 bg-orange rounded-full"></span>
            )}
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white border border-border rounded-xl p-6 mb-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-text mb-2">Location</label>
                <input
                  type="text"
                  placeholder="Any location"
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">Project Type</label>
                <select
                  value={filters.projectType}
                  onChange={(e) => setFilters({ ...filters, projectType: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                >
                  <option value="">All types</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                  <option value="infrastructure">Infrastructure</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">Min Budget (₹)</label>
                <input
                  type="number"
                  placeholder="0"
                  value={filters.budgetMin}
                  onChange={(e) => setFilters({ ...filters, budgetMin: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">Max Budget (₹)</label>
                <input
                  type="number"
                  placeholder="Any"
                  value={filters.budgetMax}
                  onChange={(e) => setFilters({ ...filters, budgetMax: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm font-medium text-text border border-border rounded-lg hover:bg-bg-alt transition-colors"
              >
                Clear All
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-sm text-text-muted">
          Showing <span className="font-semibold text-navy">{filteredTenders.length}</span> projects
        </p>
      </div>

      {/* Projects Grid */}
      {filteredTenders.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-border p-12 text-center"
        >
          <Building2 size={64} className="text-text-muted mx-auto mb-4" />
          <h3 className="text-xl font-bold text-navy mb-2">No projects found</h3>
          <p className="text-text-muted">
            {searchQuery || filters.location || filters.projectType
              ? 'Try adjusting your filters'
              : 'Check back later for new opportunities'}
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTenders.map((tender, index) => (
            <motion.div
              key={tender.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={`/contractor/projects/${tender.project_id}`}
                className="block bg-white rounded-2xl border border-border p-6 hover:border-orange hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-navy mb-2 line-clamp-2">
                      {tender.projects?.title || 'Project'}
                    </h3>
                    <p className="text-sm text-text-muted flex items-center gap-1">
                      <MapPin size={14} />
                      {tender.projects?.location}
                      {tender.projects?.locality && `, ${tender.projects.locality}`}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full flex items-center gap-1">
                    <CheckCircle size={12} />
                    Verified
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign size={16} className="text-text-muted" />
                    <span className="text-text">
                      ₹{(tender.projects?.budget_min / 100000).toFixed(0)}L - ₹{(tender.projects?.budget_max / 100000).toFixed(0)}L
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 size={16} className="text-text-muted" />
                    <span className="text-text capitalize">{tender.projects?.project_type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={16} className="text-text-muted" />
                    <span className="text-text">
                      Deadline: {new Date(tender.deadline).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <span className="text-sm font-medium text-orange">
                    View Tender Details →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
