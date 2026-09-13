import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FolderOpen, Search, Filter, Calendar, DollarSign,
  Plus, MapPin, Eye
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { projectService } from '../../lib/services';

export default function MyProjects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    projectType: '',
    budgetMin: '',
    budgetMax: '',
  });

  useEffect(() => {
    if (user) {
      loadProjects();
    }
  }, [user]);

  async function loadProjects() {
    if (!user) return;
    
    try {
      const userProjects = await projectService.getClientProjects(user.id);
      setProjects(userProjects);
    } catch (error) {
      console.error('Failed to load projects:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredProjects = projects.filter((project) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const title = project.title?.toLowerCase() || '';
      const location = project.location?.toLowerCase() || '';
      if (!title.includes(query) && !location.includes(query)) {
        return false;
      }
    }

    // Status filter
    if (filters.status && project.status !== filters.status) {
      return false;
    }

    // Project type filter
    if (filters.projectType && project.project_type !== filters.projectType) {
      return false;
    }

    // Budget filter
    if (filters.budgetMin && project.budget_max < parseInt(filters.budgetMin)) {
      return false;
    }
    if (filters.budgetMax && project.budget_min > parseInt(filters.budgetMax)) {
      return false;
    }

    return true;
  });

  const clearFilters = () => {
    setFilters({
      status: '',
      projectType: '',
      budgetMin: '',
      budgetMax: '',
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
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-navy">My Projects</h1>
            <p className="text-text-muted mt-1">Manage all your construction projects</p>
          </div>
          <Link
            to="/client/projects/new"
            className="flex items-center gap-2 px-6 py-3 bg-orange text-white rounded-xl font-medium hover:bg-orange-dark transition-colors"
          >
            <Plus size={20} />
            Post New Project
          </Link>
        </div>
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
            {(filters.status || filters.projectType || filters.budgetMin || filters.budgetMax) && (
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
                <label className="block text-sm font-medium text-text mb-2">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                >
                  <option value="">All statuses</option>
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="tender_created">Tender Created</option>
                  <option value="bidding_open">Bidding Open</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
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
          Showing <span className="font-semibold text-navy">{filteredProjects.length}</span> projects
        </p>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-border p-12 text-center"
        >
          <FolderOpen size={64} className="text-text-muted mx-auto mb-4" />
          <h3 className="text-xl font-bold text-navy mb-2">No projects found</h3>
          <p className="text-text-muted">
            {searchQuery || filters.status || filters.projectType
              ? 'Try adjusting your filters'
              : 'Start by posting your first construction project'}
          </p>
          {!searchQuery && !filters.status && !filters.projectType && (
            <Link
              to="/client/projects/new"
              className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-orange text-white rounded-xl font-medium hover:bg-orange-dark transition-colors"
            >
              <Plus size={20} />
              Post Your First Project
            </Link>
          )}
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={`/client/projects/${project.id}`}
                className="block bg-white rounded-2xl border border-border p-6 hover:border-orange hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-navy mb-2 line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-text-muted flex items-center gap-1">
                      <MapPin size={14} />
                      {project.location}
                    </p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      project.status === 'active' ? 'bg-green-100 text-green-700' :
                      project.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                      project.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                  }`}>
                    {project.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign size={16} className="text-text-muted" />
                    <span className="text-text">
                      ₹{(project.budget_min / 100000).toFixed(0)}L - ₹{(project.budget_max / 100000).toFixed(0)}L
                  </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FolderOpen size={16} className="text-text-muted" />
                    <span className="text-text capitalize">{project.project_type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={16} className="text-text-muted" />
                    <span className="text-text">
                      Created: {new Date(project.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <span className="text-sm font-medium text-orange flex items-center gap-1">
                    View Details <Eye size={14} />
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
