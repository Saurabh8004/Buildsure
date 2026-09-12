import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, DollarSign, Clock, Award, CheckCircle,
  ArrowLeft, Eye, Users, TrendingUp
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { bidService } from '../../lib/services';

export default function BidComparison() {
  const { tenderId } = useParams<{ tenderId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [bids, setBids] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBids, setSelectedBids] = useState<string[]>([]);

  useEffect(() => {
    if (tenderId) {
      loadBids();
    }
  }, [tenderId]);

  async function loadBids() {
    if (!tenderId) return;
    
    try {
      const tenderBids = await bidService.getTenderBids(tenderId);
      setBids(tenderBids);
    } catch (error) {
      console.error('Failed to load bids:', error);
    } finally {
      setLoading(false);
    }
  }

  const toggleBidSelection = (bidId: string) => {
    setSelectedBids(prev => 
      prev.includes(bidId) 
        ? prev.filter(id => id !== bidId)
        : [...prev, bidId]
    );
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-text-muted">Loading bids...</div>
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
            <h1 className="text-3xl font-bold text-navy">Compare Bids</h1>
            <p className="text-text-muted mt-1">Compare contractor bids side-by-side</p>
          </div>
          {selectedBids.length > 0 && (
            <button className="flex items-center gap-2 px-6 py-3 bg-orange text-white rounded-xl font-medium hover:bg-orange-dark transition-colors">
              <CheckCircle size={20} />
              Shortlist {selectedBids.length} Bid{selectedBids.length !== 1 ? 's' : ''}
            </button>
          )}
        </div>
      </motion.div>

      {/* Bids Comparison */}
      {bids.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-border p-12 text-center"
        >
          <FileText size={64} className="text-text-muted mx-auto mb-4" />
          <h3 className="text-xl font-bold text-navy mb-2">No bids received yet</h3>
          <p className="text-text-muted">
            Contractor bids will appear here once submitted
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-border overflow-hidden"
        >
          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-bg-alt border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Parameter
                  </th>
                  {bids.map((bid) => (
                    <th key={bid.id} className="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedBids.includes(bid.id)}
                          onChange={() => toggleBidSelection(bid.id)}
                          className="w-4 h-4 text-orange border-border rounded focus:ring-orange"
                        />
                        <span>{bid.users?.full_name || 'Contractor'}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {/* Bid Amount */}
                <tr className="hover:bg-bg-alt/50">
                  <td className="px-6 py-4 text-sm font-medium text-navy flex items-center gap-2">
                    <DollarSign size={16} className="text-text-muted" />
                    Bid Amount
                  </td>
                  {bids.map((bid) => (
                    <td key={bid.id} className="px-6 py-4 text-sm font-semibold text-navy">
                      ₹{(bid.total_amount / 100000).toFixed(2)}L
                    </td>
                  ))}
                </tr>

                {/* Timeline */}
                <tr className="hover:bg-bg-alt/50">
                  <td className="px-6 py-4 text-sm font-medium text-navy flex items-center gap-2">
                    <Clock size={16} className="text-text-muted" />
                    Timeline
                  </td>
                  {bids.map((bid) => (
                    <td key={bid.id} className="px-6 py-4 text-sm text-text">
                      {bid.timeline_months} months
                    </td>
                  ))}
                </tr>

                {/* Warranty */}
                <tr className="hover:bg-bg-alt/50">
                  <td className="px-6 py-4 text-sm font-medium text-navy flex items-center gap-2">
                    <Award size={16} className="text-text-muted" />
                    Warranty
                  </td>
                  {bids.map((bid) => (
                    <td key={bid.id} className="px-6 py-4 text-sm text-text">
                      {bid.warranty_years} year{bid.warranty_years !== 1 ? 's' : ''}
                    </td>
                  ))}
                </tr>

                {/* Status */}
                <tr className="hover:bg-bg-alt/50">
                  <td className="px-6 py-4 text-sm font-medium text-navy flex items-center gap-2">
                    <CheckCircle size={16} className="text-text-muted" />
                    Status
                  </td>
                  {bids.map((bid) => (
                    <td key={bid.id} className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        bid.status === 'submitted' ? 'bg-blue-100 text-blue-700' :
                        bid.status === 'shortlisted' ? 'bg-orange-100 text-orange' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {bid.status}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Submitted Date */}
                <tr className="hover:bg-bg-alt/50">
                  <td className="px-6 py-4 text-sm font-medium text-navy flex items-center gap-2">
                    <Clock size={16} className="text-text-muted" />
                    Submitted
                  </td>
                  {bids.map((bid) => (
                    <td key={bid.id} className="px-6 py-4 text-sm text-text">
                      {bid.submitted_at 
                        ? new Date(bid.submitted_at).toLocaleDateString()
                        : 'Not submitted'}
                    </td>
                  ))}
                </tr>

                {/* Actions */}
                <tr className="hover:bg-bg-alt/50">
                  <td className="px-6 py-4 text-sm font-medium text-navy">Actions</td>
                  {bids.map((bid) => (
                    <td key={bid.id} className="px-6 py-4">
                      <button 
                        onClick={() => navigate(`/client/bids/${bid.id}`)}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-navy border border-border rounded-lg hover:bg-bg-alt transition-colors"
                      >
                        <Eye size={16} />
                        View Details
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Summary Stats */}
      {bids.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6"
        >
          <div className="bg-white rounded-2xl border border-border p-6">
            <div className="flex items-center gap-3 mb-2">
              <Users size={24} className="text-blue-600" />
              <p className="text-text-muted text-sm">Total Bids</p>
            </div>
            <p className="text-3xl font-bold text-navy">{bids.length}</p>
          </div>
          <div className="bg-white rounded-2xl border border-border p-6">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign size={24} className="text-green-600" />
              <p className="text-text-muted text-sm">Average Bid</p>
            </div>
            <p className="text-3xl font-bold text-navy">
              ₹{(bids.reduce((sum, b) => sum + b.total_amount, 0) / bids.length / 100000).toFixed(2)}L
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-border p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp size={24} className="text-orange" />
              <p className="text-text-muted text-sm">Selected</p>
            </div>
            <p className="text-3xl font-bold text-navy">{selectedBids.length}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
