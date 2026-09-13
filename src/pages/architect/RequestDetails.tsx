import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, MapPin, Calendar, DollarSign, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function RequestDetails() {
  const { requestId } = useParams<{ requestId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [request, setRequest] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (requestId) {
      loadRequest();
    }
  }, [requestId]);

  const loadRequest = async () => {
    if (!requestId) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('architect_service_requests')
        .select(`
          *,
          projects:project_id (
            id,
            title,
            location,
            project_type,
            area_sqft,
            description
          )
        `)
        .eq('id', requestId)
        .single();

      if (error) {
        console.error('Error loading request:', error);
        setError('Failed to load request details');
        return;
      }

      setRequest(data);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to load request details');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus: string) => {
    if (!requestId || !user) return;
    
    setUpdating(true);
    try {
      const { error } = await supabase
        .from('architect_service_requests')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', requestId)
        .eq('assigned_architect_id', user.id);

      if (error) {
        console.error('Error updating status:', error);
        setError('Failed to update status');
        return;
      }

      await loadRequest();
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to update status');
    } finally {
      setUpdating(false);
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
          <p className="text-text-muted">Loading request details...</p>
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-navy mb-2">Request Not Found</h2>
          <p className="text-text-muted mb-4">The requested service request could not be found.</p>
          <button
            onClick={() => navigate('/architect')}
            className="px-6 py-3 bg-orange text-white rounded-xl font-semibold hover:bg-orange-dark transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/architect')}
            className="flex items-center gap-2 text-text-muted hover:text-navy transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-navy">Service Request Details</h1>
              <p className="text-text-muted mt-1">Request ID: {request.id}</p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(request.status)}`}>
              {getStatusLabel(request.status)}
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl border border-border p-6"
            >
              <h2 className="text-xl font-bold text-navy mb-4">Project Information</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-text-muted mb-1">Project Title</p>
                  <p className="text-lg font-semibold text-navy">
                    {request.projects?.title || 'Project'}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-text-muted mb-1">Location</p>
                    <p className="text-sm font-medium text-text flex items-center gap-1">
                      <MapPin size={14} />
                      {request.projects?.location || request.project_location}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted mb-1">Project Type</p>
                    <p className="text-sm font-medium text-text capitalize">
                      {request.projects?.project_type || request.project_type}
                    </p>
                  </div>
                  {request.projects?.area_sqft && (
                    <div>
                      <p className="text-xs text-text-muted mb-1">Area</p>
                      <p className="text-sm font-medium text-text">{request.projects.area_sqft} sq.ft.</p>
                    </div>
                  )}
                </div>
                {request.projects?.description && (
                  <div>
                    <p className="text-xs text-text-muted mb-1">Description</p>
                    <p className="text-sm text-text">{request.projects.description}</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Service Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl border border-border p-6"
            >
              <h2 className="text-xl font-bold text-navy mb-4">Service Details</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-text-muted mb-1">Service Type</p>
                  <p className="text-sm font-medium text-text capitalize">
                    {request.service_type.replace('_', ' ')}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-text-muted mb-1">Budget</p>
                    <p className="text-sm font-medium text-text flex items-center gap-1">
                      <DollarSign size={14} />
                      {request.budget || 'Not specified'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted mb-1">Timeline</p>
                    <p className="text-sm font-medium text-text flex items-center gap-1">
                      <Calendar size={14} />
                      {request.timeline || 'Not specified'}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-text-muted mb-1">Project Description</p>
                  <p className="text-sm text-text">{request.project_description}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted mb-1">Existing Drawings</p>
                  <p className="text-sm font-medium text-text capitalize">{request.existing_drawings}</p>
                </div>
                {request.additional_requirements && (
                  <div>
                    <p className="text-xs text-text-muted mb-1">Additional Requirements</p>
                    <p className="text-sm text-text">{request.additional_requirements}</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Client Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl border border-border p-6"
            >
              <h2 className="text-xl font-bold text-navy mb-4">Client Information</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-text-muted mb-1">Name</p>
                  <p className="text-sm font-medium text-text">{request.full_name}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted mb-1">Email</p>
                  <p className="text-sm font-medium text-text">{request.email}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted mb-1">Phone</p>
                  <p className="text-sm font-medium text-text">{request.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted mb-1">Preferred Contact</p>
                  <p className="text-sm font-medium text-text capitalize">{request.preferred_contact}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status & Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl border border-border p-6"
            >
              <h2 className="text-xl font-bold text-navy mb-4">Status & Actions</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-text-muted mb-1">Current Status</p>
                  <span className={`inline-block px-3 py-1.5 rounded-full text-sm font-semibold ${getStatusColor(request.status)}`}>
                    {getStatusLabel(request.status)}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-text-muted mb-1">Requested On</p>
                  <p className="text-sm font-medium text-text">
                    {new Date(request.created_at).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-text-muted mb-1">Last Updated</p>
                  <p className="text-sm font-medium text-text">
                    {new Date(request.updated_at).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-border space-y-2">
                  {request.status === 'submitted' && (
                    <button
                      onClick={() => handleStatusUpdate('under_review')}
                      disabled={updating}
                      className="w-full px-4 py-2.5 bg-orange text-white rounded-lg font-semibold hover:bg-orange-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {updating ? <Loader2 size={16} className="animate-spin" /> : null}
                      Start Review
                    </button>
                  )}
                  {request.status === 'under_review' && (
                    <button
                      onClick={() => handleStatusUpdate('matching')}
                      disabled={updating}
                      className="w-full px-4 py-2.5 bg-orange text-white rounded-lg font-semibold hover:bg-orange-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {updating ? <Loader2 size={16} className="animate-spin" /> : null}
                      Find Matching Architects
                    </button>
                  )}
                  {request.status === 'matching' && (
                    <button
                      onClick={() => handleStatusUpdate('matched')}
                      disabled={updating}
                      className="w-full px-4 py-2.5 bg-orange text-white rounded-lg font-semibold hover:bg-orange-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {updating ? <Loader2 size={16} className="animate-spin" /> : null}
                      Architect Matched
                    </button>
                  )}
                  {request.status === 'matched' && (
                    <button
                      onClick={() => handleStatusUpdate('proposal_sent')}
                      disabled={updating}
                      className="w-full px-4 py-2.5 bg-orange text-white rounded-lg font-semibold hover:bg-orange-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {updating ? <Loader2 size={16} className="animate-spin" /> : null}
                      Submit Proposal
                    </button>
                  )}
                  {request.status === 'proposal_sent' && (
                    <button
                      onClick={() => handleStatusUpdate('client_review')}
                      disabled={updating}
                      className="w-full px-4 py-2.5 bg-orange text-white rounded-lg font-semibold hover:bg-orange-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {updating ? <Loader2 size={16} className="animate-spin" /> : null}
                      Mark for Client Review
                    </button>
                  )}
                  {request.status === 'client_review' && (
                    <button
                      onClick={() => handleStatusUpdate('accepted')}
                      disabled={updating}
                      className="w-full px-4 py-2.5 bg-green text-white rounded-lg font-semibold hover:bg-green-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {updating ? <Loader2 size={16} className="animate-spin" /> : null}
                      Client Accepted - Start Work
                    </button>
                  )}
                  {request.status === 'accepted' && (
                    <button
                      onClick={() => handleStatusUpdate('in_progress')}
                      disabled={updating}
                      className="w-full px-4 py-2.5 bg-blue text-white rounded-lg font-semibold hover:bg-blue-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {updating ? <Loader2 size={16} className="animate-spin" /> : null}
                      Mark In Progress
                    </button>
                  )}
                  {request.status === 'in_progress' && (
                    <button
                      onClick={() => handleStatusUpdate('completed')}
                      disabled={updating}
                      className="w-full px-4 py-2.5 bg-green text-white rounded-lg font-semibold hover:bg-green-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {updating ? <Loader2 size={16} className="animate-spin" /> : null}
                      Mark Completed
                    </button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Request Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl border border-border p-6"
            >
              <h2 className="text-xl font-bold text-navy mb-4">Request Timeline</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-text">Request Submitted</p>
                    <p className="text-xs text-text-muted">
                      {new Date(request.created_at).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                </div>
                {request.status !== 'submitted' && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text">Under Review</p>
                      <p className="text-xs text-text-muted">
                        {new Date(request.updated_at).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>
                )}
                {['proposals_received', 'accepted', 'in_progress', 'completed'].includes(request.status) && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text">Proposal Submitted</p>
                    </div>
                  </div>
                )}
                {['accepted', 'in_progress', 'completed'].includes(request.status) && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text">Accepted by Client</p>
                    </div>
                  </div>
                )}
                {['in_progress', 'completed'].includes(request.status) && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text">Work In Progress</p>
                    </div>
                  </div>
                )}
                {request.status === 'completed' && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text">Completed</p>
                      <p className="text-xs text-text-muted">
                        {new Date(request.updated_at).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
