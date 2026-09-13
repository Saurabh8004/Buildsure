import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, DollarSign, Clock, Award, CheckCircle,
  ArrowLeft, User, Calendar, FileCheck
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { bidService } from '../../lib/services';

export default function BidDetails() {
  const { bidId } = useParams<{ bidId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [bid, setBid] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (bidId) {
      loadBid();
    }
  }, [bidId]);

  async function loadBid() {
    if (!bidId) return;
    
    try {
      const bidData = await bidService.getBid(bidId);
      setBid(bidData);
    } catch (error) {
      console.error('Failed to load bid:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-text-muted">Loading bid details...</div>
        </div>
      </div>
    );
  }

  if (!bid) {
    return (
      <div className="p-6 lg:p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-text-muted">Bid not found</div>
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
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-text-muted hover:text-navy mb-4"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-navy">Bid Details</h1>
            <p className="text-text-muted mt-1">View detailed bid information</p>
          </div>
          <span className={`px-4 py-2 text-sm font-medium rounded-full ${
            bid.status === 'submitted' ? 'bg-blue-100 text-blue-700' :
            bid.status === 'shortlisted' ? 'bg-orange-100 text-orange' :
            bid.status === 'selected' ? 'bg-green-100 text-green-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            {bid.status.replace('_', ' ')}
          </span>
        </div>
      </motion.div>

      {/* Bid Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-white rounded-2xl border border-border p-6"
        >
          <h2 className="text-xl font-bold text-navy mb-6">Bid Information</h2>
          
          <div className="space-y-6">
            {/* Contractor Info */}
            <div className="flex items-start gap-4 p-4 bg-bg-alt rounded-xl">
              <div className="w-12 h-12 bg-orange/20 rounded-full flex items-center justify-center">
                <User size={24} className="text-orange" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-navy">{bid.users?.full_name || 'Contractor'}</h3>
                <p className="text-sm text-text-muted">{bid.users?.email}</p>
              </div>
            </div>

            {/* Financial Details */}
            <div>
              <h3 className="font-semibold text-navy mb-4 flex items-center gap-2">
                <DollarSign size={20} className="text-green-600" />
                Financial Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-bg-alt rounded-xl">
                  <p className="text-xs text-text-muted mb-1">Total Bid Amount</p>
                  <p className="text-2xl font-bold text-navy">
                    ₹{(bid.total_amount / 100000).toFixed(2)}L
                  </p>
                </div>
                <div className="p-4 bg-bg-alt rounded-xl">
                  <p className="text-xs text-text-muted mb-1">Version</p>
                  <p className="text-2xl font-bold text-navy">v{bid.version}</p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h3 className="font-semibold text-navy mb-4 flex items-center gap-2">
                <Clock size={20} className="text-blue-600" />
                Timeline
              </h3>
              <div className="p-4 bg-bg-alt rounded-xl">
                <p className="text-sm text-text-muted mb-1">Estimated Duration</p>
                <p className="text-xl font-bold text-navy">{bid.timeline_months} months</p>
              </div>
            </div>

            {/* Warranty */}
            <div>
              <h3 className="font-semibold text-navy mb-4 flex items-center gap-2">
                <Award size={20} className="text-orange" />
                Warranty
              </h3>
              <div className="p-4 bg-bg-alt rounded-xl">
                <p className="text-sm text-text-muted mb-1">Warranty Period</p>
                <p className="text-xl font-bold text-navy">
                  {bid.warranty_years} year{bid.warranty_years !== 1 ? 's' : ''}
                </p>
              </div>
            </div>

            {/* Scope Details */}
            {bid.inclusions && (
              <div>
                <h3 className="font-semibold text-navy mb-4 flex items-center gap-2">
                  <CheckCircle size={20} className="text-green-600" />
                  Inclusions
                </h3>
                <div className="p-4 bg-bg-alt rounded-xl">
                  <p className="text-sm text-text whitespace-pre-wrap">{bid.inclusions}</p>
                </div>
              </div>
            )}

            {bid.exclusions && (
              <div>
                <h3 className="font-semibold text-navy mb-4">Exclusions</h3>
                <div className="p-4 bg-bg-alt rounded-xl">
                  <p className="text-sm text-text whitespace-pre-wrap">{bid.exclusions}</p>
                </div>
              </div>
            )}

            {/* Notes */}
            {bid.notes && (
              <div>
                <h3 className="font-semibold text-navy mb-4">Additional Notes</h3>
                <div className="p-4 bg-bg-alt rounded-xl">
                  <p className="text-sm text-text whitespace-pre-wrap">{bid.notes}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Status Card */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <h3 className="font-semibold text-navy mb-4">Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-muted">Current Status</span>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  bid.status === 'submitted' ? 'bg-blue-100 text-blue-700' :
                  bid.status === 'shortlisted' ? 'bg-orange-100 text-orange' :
                  bid.status === 'selected' ? 'bg-green-100 text-green-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {bid.status.replace('_', ' ')}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-muted">Submitted</span>
                <span className="text-sm font-medium text-navy">
                  {bid.submitted_at 
                    ? new Date(bid.submitted_at).toLocaleDateString()
                    : 'Not submitted'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-muted">Last Updated</span>
                <span className="text-sm font-medium text-navy">
                  {new Date(bid.updated_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <h3 className="font-semibold text-navy mb-4">Actions</h3>
            <div className="space-y-3">
              {bid.status === 'submitted' && (
                <>
                  <button className="w-full px-4 py-3 bg-orange text-white rounded-xl font-medium hover:bg-orange-dark transition-colors">
                    Shortlist Bid
                  </button>
                  <button className="w-full px-4 py-3 border border-border text-navy rounded-xl font-medium hover:bg-bg-alt transition-colors">
                    Request Revision
                  </button>
                </>
              )}
              {bid.status === 'shortlisted' && (
                <button className="w-full px-4 py-3 bg-green text-white rounded-xl font-medium hover:bg-green-700 transition-colors">
                  Select Contractor
                </button>
              )}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <h3 className="font-semibold text-navy mb-4 flex items-center gap-2">
              <Calendar size={20} className="text-blue-600" />
              Timeline
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <div className="w-0.5 h-12 bg-border"></div>
                </div>
                <div className="flex-1 pb-4">
                  <p className="text-sm font-medium text-navy">Bid Created</p>
                  <p className="text-xs text-text-muted">
                    {new Date(bid.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {bid.submitted_at && (
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                    <div className="w-0.5 h-12 bg-border"></div>
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-sm font-medium text-navy">Bid Submitted</p>
                    <p className="text-xs text-text-muted">
                      {new Date(bid.submitted_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full ${
                    bid.status === 'submitted' ? 'bg-blue-500' :
                    bid.status === 'shortlisted' ? 'bg-orange' :
                    'bg-gray-300'
                  }`}></div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-navy">Current Status</p>
                  <p className="text-xs text-text-muted capitalize">
                    {bid.status.replace('_', ' ')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
