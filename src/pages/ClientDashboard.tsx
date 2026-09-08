import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, FileText, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { projectService } from '../lib/services';

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
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-text-muted">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-navy">Client Dashboard</h1>
            <p className="text-text-muted mt-1">Welcome back, {user?.full_name}</p>
          </div>
          <button
            onClick={() => navigate('/projects/new')}
            className="px-6 py-3 text-sm font-semibold text-white bg-orange hover:bg-orange-dark rounded-xl transition-all shadow-lg shadow-orange/20"
          >
            Post New Project
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl border border-border p-6">
            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
              <Briefcase size={22} className="text-secondary" />
            </div>
            <p className="text-text-muted text-sm">Total Projects</p>
            <p className="text-3xl font-bold text-navy mt-1">{projects.length}</p>
          </div>
          <div className="bg-white rounded-2xl border border-border p-6">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
              <FileText size={22} className="text-accent" />
            </div>
            <p className="text-text-muted text-sm">Active</p>
            <p className="text-3xl font-bold text-navy mt-1">
              {projects.filter(p => ['active', 'tender_created', 'bidding_open'].includes(p.status)).length}
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-border p-6">
            <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center mb-4">
              <CheckCircle size={22} className="text-success" />
            </div>
            <p className="text-text-muted text-sm">Awarded</p>
            <p className="text-3xl font-bold text-navy mt-1">
              {projects.filter(p => p.status === 'awarded').length}
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-border p-6">
            <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center mb-4">
              <Clock size={22} className="text-orange" />
            </div>
            <p className="text-text-muted text-sm">Completed</p>
            <p className="text-3xl font-bold text-navy mt-1">
              {projects.filter(p => p.status === 'completed').length}
            </p>
          </div>
        </div>

        {/* Recent Projects */}
        <div className="bg-white rounded-2xl border border-border p-6">
          <h2 className="text-xl font-bold text-navy mb-4">Your Projects</h2>
          {projects.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase size={48} className="text-text-muted mx-auto mb-4" />
              <p className="text-text-muted">No projects yet</p>
              <p className="text-sm text-text-muted mt-2">Post your first construction project to get started</p>
              <button
                onClick={() => navigate('/projects/new')}
                className="mt-4 px-6 py-2.5 text-sm font-semibold text-white bg-orange hover:bg-orange-dark rounded-xl transition-all"
              >
                Post Your First Project
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {projects.slice(0, 5).map((project) => (
                <div key={project.id} className="p-4 bg-bg rounded-xl border border-border">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-navy">{project.title}</h3>
                      <p className="text-sm text-text-muted mt-1">{project.location}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      project.status === 'active' ? 'bg-accent/10 text-accent' :
                      project.status === 'bidding_open' ? 'bg-success/10 text-success' :
                      project.status === 'awarded' ? 'bg-orange/10 text-orange' :
                      project.status === 'completed' ? 'bg-success/10 text-success' :
                      'bg-bg text-text-muted border border-border'
                    }`}>
                      {project.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-4 text-sm">
                    <span className="text-navy font-semibold">
                      {project.area_sqft ? `${project.area_sqft} sq.ft` : 'N/A'}
                    </span>
                    {project.budget_min && project.budget_max && (
                      <span className="text-text-muted">
                        ₹{(project.budget_min / 100000).toFixed(0)}L - ₹{(project.budget_max / 100000).toFixed(0)}L
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
