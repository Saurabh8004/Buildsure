import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CheckCircle, ArrowLeft, User, DollarSign, Clock,
  Award, FileText, AlertCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { bidService } from '../../lib/services';

export default function ContractorSelection() {
  const { bidId } = useParams<{ bidId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [bid, setBid] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);

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

  const handleSelectContractor = async () => {
    if (!bidId) return;
    
    setConfirming(true);
    try {
      await bidService.selectBid(bidId);
      alert('Contractor selected successfully!');
      navigate('/client/projects');
    } catch (error) {
      console.error('Failed to select contractor:', error);
      alert('Failed to select contractor. Please try again.');
    } finally {
      setConfirming(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-text-muted">Loading...</div>
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
        <h1 className="text-3xl font-bold text-navy">Select Contractor</h1>
        <p className="text-text-muted mt-1">Review and confirm contractor selection</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contractor Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-white rounded-2xl border border-border p-6"
        >
          <h2 className="text-xl font-bold text-navy mb-6">Contractor Details</h2>
          
          {/* Contractor Info */}
          <div className="flex items-start gap-4 p-4 bg-bg-alt rounded-xl mb-6">
            <div className="w-16 h-16 bg-orange/20 rounded-full flex items-center justify-center">
              <User size={32} className="text-orange" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-navy">{bid.users?.full_name || 'Contractor'}</h3>
              <p className="text-sm text-text-muted">{bid.users?.email}</p>
            </div>
          </div>

          {/* Bid Summary */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-bg-alt rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign size={20} className="text-green-600" />
                  <p className="text-sm text-text-muted">Bid Amount</p>
                </div>
                <p className="text-2xl font-bold text-navy">
                  ₹{(bid.total_amount / 100000).toFixed(2)}L
                </p>
              </div>
              <div className="p-4 bg-bg-alt rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={20} className="text-blue-600" />
                  <p className="text-sm text-text-muted">Timeline</p>
                </div>
                <p className="text-2xl font-bold text-navy">{bid.timeline_months} months</p>
              </div>
              <div className="p-4 bg-bg-alt rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Award size={20} className="text-orange" />
                  <p className="text-sm text-text-muted">Warranty</p>
                </div>
                <p className="text-2xl font-bold text-navy">
                  {bid.warranty_years} year{bid.warranty_years !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="p-4 bg-bg-alt rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <FileText size={20} className="text-purple-600" />
                  <p className="text-sm text-text-muted">Version</p>
                </div>
                <p className="text-2xl font-bold text-navy">v{bid.version}</p>
              </div>
            </div>

            {/* Scope Details */}
            {bid.inclusions && (
              <div>
                <h3 className="font-semibold text-navy mb-3">Inclusions</h3>
                <div className="p-4 bg-bg-alt rounded-xl">
                  <p className="text-sm text-text whitespace-pre-wrap">{bid.inclusions}</p>
                </div>
              </div>
            )}

            {bid.exclusions && (
              <div>
                <h3 className="font-semibold text-navy mb-3">Exclusions</h3>
                <div className="p-4 bg-bg-alt rounded-xl">
                  <p className="text-sm text-text whitespace-pre-wrap">{bid.exclusions}</p>
                </div>
              </div>
            )}

            {bid.notes && (
              <div>
                <h3 className="font-semibold text-navy mb-3">Additional Notes</h3>
                <div className="p-4 bg-bg-alt rounded-xl">
                  <p className="text-sm text-text whitespace-pre-wrap">{bid.notes}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Confirmation Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Confirmation Card */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <h3 className="font-semibold text-navy mb-4">Confirm Selection</h3>
            
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl mb-4">
              <div className="flex items-start gap-3">
                <AlertCircle size={20} className="text-orange mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-orange-900 mb-1">Important</p>
                  <p className="text-xs text-orange-800">
                    By selecting this contractor, you will initiate the contract award process. 
                    The contractor will be notified and can accept or decline the award.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-sm text-text-muted">Contractor</span>
                <span className="text-sm font-medium text-navy">
                  {bid.users?.full_name || 'Contractor'}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-sm text-text-muted">Bid Amount</span>
                <span className="text-sm font-medium text-navy">
                  ₹{(bid.total_amount / 100000).toFixed(2)}L
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-sm text-text-muted">Timeline</span>
                <span className="text-sm font-medium text-navy">{bid.timeline_months} months</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-text-muted">Warranty</span>
                <span className="text-sm font-medium text-navy">
                  {bid.warranty_years} year{bid.warranty_years !== 1 ? 's' : ''}
                </span>
              </div>
            </div>

            <button
              onClick={handleSelectContractor}
              disabled={confirming}
              className="w-full px-4 py-3 bg-orange text-white rounded-xl font-medium hover:bg-orange-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {confirming ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Selecting...
                </>
              ) : (
                <>
                  <CheckCircle size={20} />
                  Select Contractor
                </>
              )}
            </button>
          </div>

          {/* Status */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <h3 className="font-semibold text-navy mb-4">Current Status</h3>
            <div className="flex items-center gap-3 p-4 bg-bg-alt rounded-xl">
              <div className={`w-3 h-3 rounded-full ${
                bid.status === 'shortlisted' ? 'bg-orange' :
                bid.status === 'selected' ? 'bg-green-600' :
                'bg-gray-400'
              }`}></div>
              <span className="text-sm font-medium text-navy capitalize">
                {bid.status.replace('_', ' ')}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
