import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FolderOpen, FileText, Award, CheckCircle, 
  AlertTriangle, Clock, TrendingUp, Plus,
  DollarSign, Users, Calendar, ArrowRight
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { projectService } from '../../lib/services';

export default function ClientDashboard() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/signin');
      return;
    }

    if (user && user.role !== 'client') {
      navigate('/');
      return;
    }

    if (user) {
      loadProjects();
    }
  }, [user, authLoading]);

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

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-text-muted">Loading dashboard...</div>
      </div>
    );
  }

  // Calculate KPIs
  const activeProjects = projects.filter(p => ['active', 'tender_created', 'bidding_open'].includes(p.status)).length;
  const totalProjects = projects.length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const totalProjectValue = projects.reduce((sum, p) => sum + ((p.budget_max || 0)), 0);

  // Get current hour for greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="p-6 lg:p-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-navy">
          {greeting}, {user?.full_name?.split(' ')[0] || 'Client'}
        </h1>
        <p className="text-text-muted mt-1">Here's an overview of your construction projects</p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-border p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FolderOpen size={22} className="text-blue-600" />
            </div>
            <TrendingUp size={20} className="text-text-muted" />
          </div>
          <p className="text-text-muted text-sm mb-1">Active Projects</p>
          <p className="text-3xl font-bold text-navy">{activeProjects}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-border p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <FileText size={22} className="text-orange" />
            </div>
            <FileText size={20} className="text-text-muted" />
          </div>
          <p className="text-text-muted text-sm mb-1">Projects Posted</p>
          <p className="text-3xl font-bold text-navy">{totalProjects}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border border-border p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle size={22} className="text-green-600" />
            </div>
            <CheckCircle size={20} className="text-text-muted" />
          </div>
          <p className="text-text-muted text-sm mb-1">Completed</p>
          <p className="text-3xl font-bold text-navy">{completedProjects}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl border border-border p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <DollarSign size={22} className="text-purple-600" />
            </div>
            <TrendingUp size={20} className="text-text-muted" />
          </div>
          <p className="text-text-muted text-sm mb-1">Total Project Value</p>
          <p className="text-3xl font-bold text-navy">
            ₹{(totalProjectValue / 100000).toFixed(1)}L
          </p>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-xl font-bold text-navy mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/client/projects/new"
            className="flex items-center gap-3 p-4 bg-white border border-border rounded-xl hover:border-orange hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 bg-orange/10 rounded-lg flex items-center justify-center">
              <Plus size={20} className="text-orange" />
            </div>
            <div>
              <p className="font-semibold text-navy">Post a New Project</p>
              <p className="text-sm text-text-muted">Create new requirement</p>
            </div>
          </Link>
          <Link
            to="/client/projects"
            className="flex items-center gap-3 p-4 bg-white border border-border rounded-xl hover:border-orange hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FolderOpen size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-navy">View My Projects</p>
              <p className="text-sm text-text-muted">Manage all projects</p>
            </div>
          </Link>
          <Link
            to="/client/architect-services"
            className="flex items-center gap-3 p-4 bg-white border border-border rounded-xl hover:border-orange hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="font-semibold text-navy">Find Architect</p>
              <p className="text-sm text-text-muted">Request services</p>
            </div>
          </Link>
          <Link
            to="/client/finance"
            className="flex items-center gap-3 p-4 bg-white border border-border rounded-xl hover:border-orange hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 bg-green/10 rounded-lg flex items-center justify-center">
              <DollarSign size={20} className="text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-navy">Construction Finance</p>
              <p className="text-sm text-text-muted">Get financing help</p>
            </div>
          </Link>
        </div>
      </motion.div>

      {/* My Projects */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl border border-border p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-navy">My Projects</h2>
          <Link
            to="/client/projects"
            className="text-sm font-medium text-orange hover:text-orange-dark transition-colors flex items-center gap-1"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <FolderOpen size={64} className="text-text-muted mx-auto mb-4" />
            <h3 className="text-xl font-bold text-navy mb-2">No projects yet</h3>
            <p className="text-text-muted mb-4">Start by posting your first construction project</p>
            <Link
              to="/client/projects/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange text-white rounded-xl font-medium hover:bg-orange-dark transition-colors"
            >
              <Plus size={20} />
              Post Your First Project
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {projects.slice(0, 5).map((project) => (
              <Link
                key={project.id}
                to={`/client/projects/${project.id}`}
                className="block p-4 border border-border rounded-xl hover:border-orange hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-navy mb-1">{project.title}</h3>
                    <p className="text-sm text-text-muted">{project.location}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      project.status === 'active' ? 'bg-green-100 text-green-700' :
                      project.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                  }`}>
                    {project.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-text-muted">
                  <span className="flex items-center gap-1">
                    <DollarSign size={14} />
                    ₹{(project.budget_max / 100000).toFixed(0)}L
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(project.created_at).toLocaleDateString()}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
