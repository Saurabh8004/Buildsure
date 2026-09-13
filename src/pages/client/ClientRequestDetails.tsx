import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, MapPin, Calendar, DollarSign, FileText, CheckCircle, XCircle, Loader2, AlertCircle } from 'lucide-react';

export default function ClientRequestDetails() {
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
          ),
          users:assigned_architect_id (
            id,
            full_name,
            email
          )
        `)
        .eq('id', requestId)
        .eq('client_id', user?.id)
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

  const handleAcceptProposal = async () => {
    if (!requestId || !user) return;
    
    setUpdating(true);
    try {
      const { error } = await supabase
        .from('architect_service_requests')
        .update({ 
          status: 'accepted',
          updated_at: new Date().toISOString()
        })
        .eq('id', requestId)
        .eq('client_id', user.id)
        .eq('status', 'client_review'); // Only allow if status is 'client_review'

      if (error) {
        console.error('Error accepting proposal:', error);
        setError('Failed to accept proposal');
        return;
      }

      await loadRequest();
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to accept proposal');
    } finally {
      setUpdating(false);
    }
  };

  const handleDeclineProposal = async () => {
    if (!requestId || !user) return;
    
    setUpdating(true);
    try {
      const { error } = await supabase
        .from('architect_service_requests')
        .update({ 
          status: 'cancelled',
          updated_at: new Date().toISOString()
        })
        .eq('id', requestId)
        .eq('client_id', user.id)
        .eq('status', 'client_review'); // Only allow if status is 'client_review'

      if (error) {
        console.error('Error declining proposal:', error);
        setError('Failed to decline proposal');
        return;
      }

      await loadRequest();
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to decline proposal');
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
    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
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
            onClick={() => navigate('/client')}
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
            onClick={() => navigate('/client')}
            className="flex items-center gap-2 text-text-muted hover:text-navy transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-navy">Architect Service Request</h1>
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

            {/* Architect Information */}
            {request.assigned_architect_id && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl border border-border p-6"
              >
                <h2 className="text-xl font-bold text-navy mb-4">Assigned Architect</h2>
                <div className="space-y-3">
                  <div>
                  <p className="text-xs text-text-muted mb-1">Name</p>
                  <p className="text-sm font-medium text-text">{request.users?.full_name || 'Not assigned'}</p>
                  </div>
                  <div>
                  <p className="text-xs text-text-muted mb-1">Email</p>
                  <p className="text-sm font-medium text-text">{request.users?.email || 'Not available'}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Proposal Details */}
            {['proposal_sent', 'client_review', 'accepted', 'in_progress', 'completed'].includes(request.status) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl border border-border p-6"
              >
                <h2 className="text-xl font-bold text-navy mb-4">Proposal Details</h2>
                <div className="space-y-4">
                  <div>
                  <p className="text-xs text-text-muted mb-1">Scope of Work</p>
                  <p className="text-sm text-text whitespace-pre-wrap">{request.proposal_details || 'Not provided'}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                  <p className="text-xs text-text-muted mb-1">Proposal Amount</p>
                  <p className="text-sm font-medium text-text">
                        {request.proposal_amount ? `₹${parseInt(request.proposal_amount).toLocaleString('en-IN')}` : 'Not provided'}
                  </p>
                    </div>
                    <div>
                  <p className="text-xs text-text-muted mb-1">Estimated Timeline</p>
                  <p className="text-sm font-medium text-text">{request.proposal_timeline || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status & Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
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

                {/* Client Actions */}
                <div className="pt-4 border-t border-border space-y-2">
                  {request.status === 'client_review' && (
                    <>
                      <button
                        onClick={handleAcceptProposal}
                        disabled={updating}
                        className="w-full px-4 py-2.5 bg-green text-white rounded-lg font-semibold hover:bg-green-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {updating ? <Loader2 size={16} className="animate-spin" /> : null}
                        Accept Proposal
                      </button>
                      <button
                        onClick={handleDeclineProposal}
                        disabled={updating}
                        className="w-full px-4 py-2.5 border border border-red-600 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {updating ? <Loader2 size={16} className="animate-spin" /> : null}
                        Decline Proposal
                      </button>
                    </>
                  )}

                  {/* Show info message for other statuses */}
                  {['submitted', 'under_review', 'matching', 'matched', 'proposal_sent'].includes(request.status) && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-xs text-blue-900">
                        {request.status === 'submitted' && 'Request is pending admin review.'}
                        {request.status === 'under_review' && 'Request is being reviewed by admin.'}
                        {request.status === 'matching' && 'Admin is finding matching architects.'}
                        {request.status === 'matched' && 'Architect has been assigned.'}
                        {request.status === 'proposal_sent' && 'Waiting for architect to submit proposal.'}
                      </p>
                    </div>
                  )}

                  {['accepted', 'in_progress', 'completed', 'cancelled'].includes(request.status) && (
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <p className="text-xs text-gray-900">
                        {request.status === 'accepted' && 'Proposal accepted. Work will begin soon.'}
                        {request.status === 'in_progress' && 'Work is in progress.'}
                        {request.status === 'completed' && 'Work has been completed.'}
                        {request.status === 'cancelled' && 'Request has been cancelled.'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Request Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
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
                {['under_review', 'matching', 'matched', 'proposal_sent', 'client_review', 'accepted', 'in_progress', 'completed'].includes(request.status) && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text">Under Review</p>
                    </div>
                  </div>
                )}
                {['matching', 'matched', 'proposal_sent', 'client_review', 'accepted', 'in_progress', 'completed'].includes(request.status) && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text">Matching Architects</p>
                    </div>
                  </div>
                )}
                {['matched', 'proposal_sent', 'client_review', 'accepted', 'in_progress', 'completed'].includes(request.status) && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text">Architect Assigned</p>
                    </div>
                  </div>
                )}
                {['proposal_sent', 'client_review', 'accepted', 'in_progress', 'completed'].includes(request.status) && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text">Proposal Sent</p>
                    </div>
                  </div>
                )}
                {['client_review', 'accepted', 'in_progress', 'completed'].includes(request.status) && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text">Client Review</p>
                    </div>
                  </div>
                )}
                {['accepted', 'in_progress', 'completed'].includes(request.status) && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text">Accepted</p>
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
