import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { FileText, MapPin, Calendar, DollarSign, Clock, CheckCircle, AlertCircle, Eye, ArrowRight } from 'lucide-react';

export default function ArchitectDashboard() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadRequests();
    }
  }, [user]);

  const loadRequests = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Load requests assigned to this architect
      const { data, error } = await supabase
        .from('architect_service_requests')
        .select(`
          *,
          projects:project_id (
            id,
            title,
            location,
            project_type,
            area_sqft
          )
        `)
        .eq('assigned_architect_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading requests:', error);
        setError('Failed to load service requests');
        return;
      }

      setRequests(data || []);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to load service requests');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-blue-100 text-blue-700';
      case 'under_review':
        return 'bg-orange-100 text-orange-700';
      case 'matching':
        return 'bg-purple-100 text-purple-700';
      case 'matched':
        return 'bg-indigo-100 text-indigo-700';
      case 'proposal_sent':
        return 'bg-indigo-100 text-indigo-700';
      case 'client_review':
        return 'bg-teal-100 text-teal-700';
      case 'accepted':
        return 'bg-green-100 text-green-700';
      case 'in_progress':
        return 'bg-cyan-100 text-cyan-700';
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-muted">Loading service requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-navy">Architect Dashboard</h1>
          <p className="text-text-muted mt-1">Welcome back, {user?.full_name}</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border border-border p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <FileText size={20} className="text-blue" />
              <p className="text-sm text-text-muted">Total Requests</p>
            </div>
            <p className="text-3xl font-bold text-navy">{requests.length}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-border p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <Clock size={20} className="text-orange" />
              <p className="text-sm text-text-muted">Pending</p>
            </div>
            <p className="text-3xl font-bold text-navy">
              {requests.filter(r => r.status === 'submitted' || r.status === 'under_review').length}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl border border-border p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle size={20} className="text-green" />
              <p className="text-sm text-text-muted">In Progress</p>
            </div>
            <p className="text-3xl font-bold text-navy">
              {requests.filter(r => r.status === 'in_progress' || r.status === 'accepted').length}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl border border-border p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle size={20} className="text-green" />
              <p className="text-sm text-text-muted">Completed</p>
            </div>
            <p className="text-3xl font-bold text-navy">
              {requests.filter(r => r.status === 'completed').length}
            </p>
          </motion.div>
        </div>

        {/* Service Requests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl border border-border p-6"
        >
          <h2 className="text-xl font-bold text-navy mb-4">Service Requests</h2>
          
          {requests.length === 0 ? (
            <div className="text-center py-12">
              <FileText size={48} className="text-text-muted mx-auto mb-4" />
              <h3 className="text-lg font-bold text-navy mb-2">No Service Requests</h3>
              <p className="text-text-muted">You don't have any service requests assigned to you yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {requests.map((request) => (
                <div key={request.id} className="p-4 bg-bg rounded-xl border border-border hover:border-blue-500 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-navy">
                          {request.projects?.title || 'Project'}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}>
                          {getStatusLabel(request.status)}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-text-muted">
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {request.projects?.location || request.project_location}
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText size={14} />
                          {request.projects?.project_type || request.project_type}
                        </span>
                        {request.projects?.area_sqft && (
                          <span>{request.projects.area_sqft} sq.ft.</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-text-muted mb-1">Service Type</p>
                      <p className="text-sm font-medium text-text capitalize">
                        {request.service_type.replace('_', ' ')}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-text-muted mb-1">Budget</p>
                      <p className="text-sm font-medium text-text">{request.budget || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-muted mb-1">Timeline</p>
                      <p className="text-sm font-medium text-text">{request.timeline || 'Not specified'}</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-xs text-text-muted mb-1">Requirements</p>
                    <p className="text-sm text-text line-clamp-2">{request.project_description}</p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex items-center gap-2 text-xs text-text-muted">
                      <Calendar size={14} />
                      <span>Requested: {new Date(request.created_at).toLocaleDateString('en-IN')}</span>
                    </div>
                    <Link
                      to={`/architect/requests/${request.id}`}
                      className="flex items-center gap-1 text-sm font-semibold text-blue hover:text-blue-dark transition-colors"
                    >
                      View Details
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
