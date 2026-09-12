import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CheckCircle, ArrowLeft, FileText, Calendar,
  DollarSign, User, AlertCircle, Send
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { bidService } from '../../lib/services';

export default function ContractAward() {
  const { bidId } = useParams<{ bidId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [bid, setBid] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [contractTerms, setContractTerms] = useState({
    startDate: '',
    paymentTerms: '',
    additionalTerms: '',
  });

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

  const handleSendAward = async () => {
    if (!bidId) return;
    
    setSending(true);
    try {
      // Here we would call a service to create the contract award
      // For now, we'll just simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Contract award sent successfully! The contractor will be notified.');
      navigate('/client/projects');
    } catch (error) {
      console.error('Failed to send award:', error);
      alert('Failed to send award. Please try again.');
    } finally {
      setSending(false);
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
        <h1 className="text-3xl font-bold text-navy">Contract Award</h1>
        <p className="text-text-muted mt-1">Send contract award to selected contractor</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contract Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-white rounded-2xl border border-border p-6"
        >
          <h2 className="text-xl font-bold text-navy mb-6">Contract Details</h2>
          
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
          <div className="space-y-4 mb-6">
            <h3 className="font-semibold text-navy">Bid Summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-bg-alt rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign size={20} className="text-green-600" />
                  <p className="text-sm text-text-muted">Contract Value</p>
                </div>
                <p className="text-2xl font-bold text-navy">
                  ₹{(bid.total_amount / 100000).toFixed(2)}L
                </p>
              </div>
              <div className="p-4 bg-bg-alt rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={20} className="text-blue-600" />
                  <p className="text-sm text-text-muted">Timeline</p>
                </div>
                <p className="text-2xl font-bold text-navy">{bid.timeline_months} months</p>
              </div>
            </div>
          </div>

          {/* Contract Terms */}
          <div className="space-y-4">
            <h3 className="font-semibold text-navy">Contract Terms</h3>
            
            <div>
              <label className="block text-sm font-medium text-text mb-2">
                Project Start Date *
              </label>
              <input
                type="date"
                value={contractTerms.startDate}
                onChange={(e) => setContractTerms({ ...contractTerms, startDate: e.target.value })}
                className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-2">
                Payment Terms
              </label>
              <textarea
                value={contractTerms.paymentTerms}
                onChange={(e) => setContractTerms({ ...contractTerms, paymentTerms: e.target.value })}
                rows={3}
                placeholder="e.g., 30% advance, 40% on completion of structure, 30% on handover"
                className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-2">
                Additional Terms & Conditions
              </label>
              <textarea
                value={contractTerms.additionalTerms}
                onChange={(e) => setContractTerms({ ...contractTerms, additionalTerms: e.target.value })}
                rows={4}
                placeholder="Any additional terms, warranties, penalties, or special conditions..."
                className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange resize-none"
              />
            </div>
          </div>
        </motion.div>

        {/* Action Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Summary Card */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <h3 className="font-semibold text-navy mb-4">Award Summary</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-sm text-text-muted">Contractor</span>
                <span className="text-sm font-medium text-navy">
                  {bid.users?.full_name || 'Contractor'}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-sm text-text-muted">Contract Value</span>
                <span className="text-sm font-medium text-navy">
                  ₹{(bid.total_amount / 100000).toFixed(2)}L
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-sm text-text-muted">Timeline</span>
                <span className="text-sm font-medium text-navy">{bid.timeline_months} months</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-sm text-text-muted">Warranty</span>
                <span className="text-sm font-medium text-navy">
                  {bid.warranty_years} year{bid.warranty_years !== 1 ? 's' : ''}
                </span>
              </div>
              {contractTerms.startDate && (
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-text-muted">Start Date</span>
                  <span className="text-sm font-medium text-navy">
                    {new Date(contractTerms.startDate).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>

            <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl mb-4">
              <div className="flex items-start gap-3">
                <AlertCircle size={20} className="text-orange mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-orange-900 mb-1">Important</p>
                  <p className="text-xs text-orange-800">
                    Sending this award will notify the contractor. They can accept or decline the award. 
                    Once accepted, the project will move to active status.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleSendAward}
              disabled={sending || !contractTerms.startDate}
              className="w-full px-4 py-3 bg-orange text-white rounded-xl font-medium hover:bg-orange-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {sending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending Award...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Send Contract Award
                </>
              )}
            </button>
          </div>

          {/* Status */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <h3 className="font-semibold text-navy mb-4">Current Status</h3>
            <div className="flex items-center gap-3 p-4 bg-bg-alt rounded-xl">
              <div className={`w-3 h-3 rounded-full ${
                bid.status === 'selected' ? 'bg-orange' :
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
