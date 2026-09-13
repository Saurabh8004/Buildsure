import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Calendar, DollarSign, MapPin, Filter } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { bidService } from '../../lib/services';

export default function MyBids() {
  const { user } = useAuth();
  const [bids, setBids] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    if (user) {
      loadBids();
    }
  }, [user]);

  async function loadBids() {
    if (!user) return;
    
    try {
      const userBids = await bidService.getContractorBids(user.id);
      setBids(userBids);
    } catch (error) {
      console.error('Failed to load bids:', error);
    } finally {
      setLoading(false);
    }
  }

  const tabs = [
    { id: 'all', label: 'All', count: bids.length },
    { id: 'draft', label: 'Draft', count: bids.filter(b => b.status === 'draft').length },
    { id: 'submitted', label: 'Submitted', count: bids.filter(b => b.status === 'submitted').length },
    { id: 'under_review', label: 'Under Review', count: bids.filter(b => b.status === 'under_review').length },
    { id: 'shortlisted', label: 'Shortlisted', count: bids.filter(b => b.status === 'shortlisted').length },
    { id: 'awarded', label: 'Awarded', count: bids.filter(b => b.status === 'awarded' || b.status === 'selected').length },
    { id: 'rejected', label: 'Rejected', count: bids.filter(b => b.status === 'rejected').length },
  ];

  const filteredBids = activeTab === 'all' 
    ? bids 
    : bids.filter(b => {
        if (activeTab === 'awarded') {
          return b.status === 'awarded' || b.status === 'selected';
        }
        return b.status === activeTab;
      });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-700';
      case 'submitted': return 'bg-blue-100 text-blue-700';
      case 'under_review': return 'bg-yellow-100 text-yellow-700';
      case 'shortlisted': return 'bg-orange-100 text-orange';
      case 'awarded':
      case 'selected': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
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
        <h1 className="text-3xl font-bold text-navy">My Bids</h1>
        <p className="text-text-muted mt-1">Track and manage all your bid submissions</p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 overflow-x-auto"
      >
        <div className="flex gap-2 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'bg-orange text-white'
                  : 'bg-white border border-border text-text hover:border-orange'
              }`}
            >
              {tab.label}
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                activeTab === tab.id ? 'bg-white/20' : 'bg-bg-alt'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Bids List */}
      {filteredBids.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-border p-12 text-center"
        >
          <FileText size={64} className="text-text-muted mx-auto mb-4" />
          <h3 className="text-xl font-bold text-navy mb-2">No bids found</h3>
          <p className="text-text-muted">
            {activeTab === 'all' 
              ? "You haven't submitted any bids yet"
              : `No ${tabs.find(t => t.id === activeTab)?.label.toLowerCase()} bids`}
          </p>
          {activeTab === 'all' && (
            <Link
              to="/contractor/projects"
              className="inline-block mt-4 px-6 py-3 bg-orange text-white rounded-xl font-medium hover:bg-orange-dark transition-colors"
            >
              Find Projects
            </Link>
          )}
        </motion.div>
      ) : (
        <div className="space-y-4">
          {filteredBids.map((bid, index) => (
            <motion.div
              key={bid.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={`/contractor/bids/${bid.id}`}
                className="block bg-white rounded-2xl border border-border p-6 hover:border-orange hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-navy mb-2">
                      {bid.tenders?.projects?.title || 'Project'}
                    </h3>
                    <p className="text-sm text-text-muted flex items-center gap-1">
                      <MapPin size={14} />
                      {bid.tenders?.projects?.location || 'Location'}
                    </p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(bid.status)}`}>
                    {bid.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign size={16} className="text-text-muted" />
                    <div>
                      <p className="text-xs text-text-muted">Bid Amount</p>
                      <p className="font-semibold text-navy">
                        ₹{(bid.total_amount / 100000).toFixed(1)}L
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={16} className="text-text-muted" />
                    <div>
                      <p className="text-xs text-text-muted">Submitted</p>
                      <p className="font-semibold text-navy">
                        {bid.submitted_at 
                          ? new Date(bid.submitted_at).toLocaleDateString()
                          : 'Not submitted'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={16} className="text-text-muted" />
                    <div>
                      <p className="text-xs text-text-muted">Deadline</p>
                      <p className="font-semibold text-navy">
                        {new Date(bid.tenders?.deadline).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-text-muted">
                    <span>Timeline: {bid.timeline_months} months</span>
                    <span>Warranty: {bid.warranty_years} year{bid.warranty_years !== 1 ? 's' : ''}</span>
                  </div>
                  <span className="text-sm font-medium text-orange">
                    View Details →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
