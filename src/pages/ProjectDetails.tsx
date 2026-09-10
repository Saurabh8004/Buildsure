import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { projectService, tenderService, bidService } from '../lib/services';
import { ArrowLeft, MapPin, Calendar, FileText, Users, CheckCircle, Clock } from 'lucide-react';

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [project, setProject] = useState<any>(null);
  const [tenders, setTenders] = useState<any[]>([]);
  const [bids, setBids] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      loadProjectData();
    }
  }, [id]);

  async function loadProjectData() {
    if (!id) return;
    
    try {
      const projectData = await projectService.getProject(id);
      setProject(projectData);

      const tenderData = await tenderService.getProjectTenders(id);
      setTenders(tenderData);

      const allBids = [];
      for (const tender of tenderData) {
        const tenderBids = await bidService.getTenderBids(tender.id);
        allBids.push(...tenderBids);
      }
      setBids(allBids);
    } catch (err: any) {
      setError(err.message || 'Failed to load project');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-text-muted">Loading project...</div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Project not found'}</p>
          <button
            onClick={() => navigate('/dashboard/client')}
            className="px-6 py-3 bg-orange text-white font-semibold rounded-xl hover:bg-orange-dark transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-700',
    active: 'bg-green-100 text-green-700',
    tender_created: 'bg-blue-100 text-blue-700',
    bidding_open: 'bg-orange-100 text-orange-700',
    bidding_closed: 'bg-purple-100 text-purple-700',
    evaluation: 'bg-indigo-100 text-indigo-700',
    awarded: 'bg-teal-100 text-teal-700',
    in_progress: 'bg-cyan-100 text-cyan-700',
    completed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  };

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-text-muted hover:text-navy transition-colors mb-4"
          >
            <ArrowLeft size={16} /> Back
          </button>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start justify-between"
          >
            <div>
              <h1 className="text-3xl font-bold text-navy">{project.title}</h1>
              <div className="flex items-center gap-4 mt-2 text-sm text-text-muted">
                <span className="flex items-center gap-1">
                  <MapPin size={14} /> {project.location}{project.locality ? `, ${project.locality}` : ''}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[project.status] || 'bg-gray-100 text-gray-700'}`}>
                  {project.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Project Overview */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 bg-white rounded-2xl border border-border p-6"
          >
            <h2 className="text-xl font-bold text-navy mb-4">Project Overview</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {project.area_sqft && (
                <div className="p-4 bg-bg rounded-xl">
                  <p className="text-xs text-text-muted mb-1">Site Area</p>
                  <p className="text-lg font-bold text-navy">{project.area_sqft} sq.ft.</p>
                </div>
              )}
              {(project.budget_min || project.budget_max) && (
                <div className="p-4 bg-bg rounded-xl">
                  <p className="text-xs text-text-muted mb-1">Budget Range</p>
                  <p className="text-lg font-bold text-navy">
                    {project.budget_min && `₹${(project.budget_min / 100000).toFixed(1)}L`}
                    {project.budget_min && project.budget_max && ' - '}
                    {project.budget_max && `₹${(project.budget_max / 100000).toFixed(1)}L`}
                  </p>
                </div>
              )}
              <div className="p-4 bg-bg rounded-xl">
                <p className="text-xs text-text-muted mb-1">Project Type</p>
                <p className="text-lg font-bold text-navy capitalize">{project.project_type}</p>
              </div>
              <div className="p-4 bg-bg rounded-xl">
                <p className="text-xs text-text-muted mb-1">Created</p>
                <p className="text-lg font-bold text-navy">
                  {new Date(project.created_at).toLocaleDateString('en-IN')}
                </p>
              </div>
            </div>
            {project.description && (
              <div className="mt-4">
                <p className="text-xs text-text-muted mb-2">Description</p>
                <p className="text-text">{project.description}</p>
              </div>
            )}
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="bg-white rounded-2xl border border-border p-6">
              <div className="flex items-center gap-3 mb-2">
                <FileText size={20} className="text-blue" />
                <p className="text-sm text-text-muted">Tenders</p>
              </div>
              <p className="text-3xl font-bold text-navy">{tenders.length}</p>
            </div>
            <div className="bg-white rounded-2xl border border-border p-6">
              <div className="flex items-center gap-3 mb-2">
                <Users size={20} className="text-orange" />
                <p className="text-sm text-text-muted">Bids Received</p>
              </div>
              <p className="text-3xl font-bold text-navy">{bids.length}</p>
            </div>
          </motion.div>
        </div>

        {/* Tenders */}
        {tenders.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl border border-border p-6 mb-8"
          >
            <h2 className="text-xl font-bold text-navy mb-4">Tenders</h2>
            <div className="space-y-3">
              {tenders.map((tender) => (
                <div key={tender.id} className="p-4 bg-bg rounded-xl border border-border">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-navy">{tender.title}</h3>
                      <p className="text-sm text-text-muted mt-1">
                        Deadline: {new Date(tender.deadline).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      tender.status === 'published' ? 'bg-green-100 text-green-700' :
                      tender.status === 'closed' ? 'bg-gray-100 text-gray-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {tender.status.toUpperCase()}
                    </span>
                  </div>
                  {tender.description && (
                    <p className="text-sm text-text mt-2">{tender.description}</p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Bids */}
        {bids.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl border border-border p-6"
          >
            <h2 className="text-xl font-bold text-navy mb-4">Bids ({bids.length})</h2>
            <div className="space-y-3">
              {bids.map((bid) => (
                <div key={bid.id} className="p-4 bg-bg rounded-xl border border-border">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-navy">
                        Contractor: {bid.users?.full_name || 'Unknown'}
                      </h3>
                      <p className="text-sm text-text-muted mt-1">
                        Amount: ₹{(bid.total_amount / 100000).toFixed(2)}L
                      </p>
                      <p className="text-sm text-text-muted">
                        Timeline: {bid.timeline_months} months
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      bid.status === 'submitted' ? 'bg-blue-100 text-blue-700' :
                      bid.status === 'shortlisted' ? 'bg-orange-100 text-orange-700' :
                      bid.status === 'selected' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {bid.status.toUpperCase()}
                    </span>
                  </div>
                  {bid.inclusions && (
                    <div className="mt-2">
                      <p className="text-xs text-text-muted mb-1">Inclusions:</p>
                      <p className="text-sm text-text">{bid.inclusions}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Empty States */}
        {tenders.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl border border-border p-12 text-center"
          >
            <FileText size={48} className="text-text-muted mx-auto mb-4" />
            <h3 className="text-lg font-bold text-navy mb-2">No Tenders Yet</h3>
            <p className="text-text-muted">Create a tender to start receiving bids from contractors.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
