import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, FileText, CheckCircle, Clock, MapPin } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { bidService, tenderService } from '../lib/services';

export default function ContractorDashboard() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [bids, setBids] = useState<any[]>([]);
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/signin');
      return;
    }

    if (user && user.role !== 'contractor') {
      navigate('/');
      return;
    }

    if (user) {
      loadBids();
    }
  }, [user, authLoading]);

  async function loadBids() {
    if (!user) return;
    
    try {
      const userBids = await bidService.getContractorBids(user.id);
      setBids(userBids);

      // Load available opportunities (published tenders)
      const publishedTenders = await tenderService.getPublishedTenders();
      setOpportunities(publishedTenders);
    } catch (error) {
      console.error('Failed to load ', error);
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-navy">Contractor Dashboard</h1>
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
            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
              <Briefcase size={22} className="text-secondary" />
            </div>
            <p className="text-text-muted text-sm">Total Bids</p>
            <p className="text-3xl font-bold text-navy mt-1">{bids.length}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-border p-6"
          >
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
              <FileText size={22} className="text-accent" />
            </div>
            <p className="text-text-muted text-sm">Submitted</p>
            <p className="text-3xl font-bold text-navy mt-1">
              {bids.filter(b => b.status === 'submitted').length}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl border border-border p-6"
          >
            <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center mb-4">
              <CheckCircle size={22} className="text-success" />
            </div>
            <p className="text-text-muted text-sm">Shortlisted</p>
            <p className="text-3xl font-bold text-navy mt-1">
              {bids.filter(b => b.status === 'shortlisted').length}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl border border-border p-6"
          >
            <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center mb-4">
              <Clock size={22} className="text-orange" />
            </div>
            <p className="text-text-muted text-sm">Pending</p>
            <p className="text-3xl font-bold text-navy mt-1">
              {bids.filter(b => b.status === 'draft').length}
            </p>
          </motion.div>
        </div>

        {/* Recent Bids */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl border border-border p-6 mb-8"
        >
          <h2 className="text-xl font-bold text-navy mb-4">Recent Bids</h2>
          {bids.length === 0 ? (
            <div className="text-center py-12">
              <FileText size={48} className="text-text-muted mx-auto mb-4" />
              <p className="text-text-muted">No bids yet</p>
              <p className="text-sm text-text-muted mt-2">Start by browsing available projects</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/projects')}
                className="mt-4 px-6 py-2.5 text-sm font-semibold text-white bg-orange hover:bg-orange-dark rounded-xl transition-all"
              >
                Browse Projects
              </motion.button>
            </div>
          ) : (
            <div className="space-y-3">
              {bids.slice(0, 5).map((bid) => (
                <motion.div
                  key={bid.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ x: 8 }}
                  className="p-4 bg-bg rounded-xl border border-border cursor-pointer transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-navy">
                        {bid.tenders?.projects?.title || 'Project'}
                      </h3>
                      <p className="text-sm text-text-muted mt-1">
                        {bid.tenders?.projects?.location}
                      </p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      bid.status === 'submitted' ? 'bg-accent/10 text-accent' :
                      bid.status === 'shortlisted' ? 'bg-success/10 text-success' :
                      bid.status === 'selected' ? 'bg-orange/10 text-orange' :
                      'bg-bg text-text-muted border border-border'
                    }`}>
                      {bid.status}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-4 text-sm">
                    <span className="text-navy font-semibold">₹{(bid.total_amount / 100000).toFixed(2)}L</span>
                    <span className="text-text-muted">{bid.timeline_months} months</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Available Opportunities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl border border-border p-6"
        >
          <h2 className="text-xl font-bold text-navy mb-4">Available Opportunities</h2>
          {opportunities.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase size={48} className="text-text-muted mx-auto mb-4" />
              <p className="text-text-muted">No opportunities available at the moment</p>
              <p className="text-sm text-text-muted mt-2">Check back later for new projects</p>
            </div>
          ) : (
            <div className="space-y-3">
              {opportunities.slice(0, 5).map((opportunity) => (
                <motion.div
                  key={opportunity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ x: 8 }}
                  className="p-4 bg-bg rounded-xl border border-border cursor-pointer transition-all"
                  onClick={() => navigate(`/projects/${opportunity.project_id}`)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-navy">{opportunity.title}</h3>
                      <p className="text-sm text-text-muted mt-1 flex items-center gap-1">
                        <MapPin size={12} /> {opportunity.projects?.location}
                      </p>
                    </div>
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-success/10 text-success">
                      Open
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-4 text-sm">
                    {opportunity.projects?.area_sqft && (
                      <span className="text-navy font-semibold">
                        {opportunity.projects.area_sqft} sq.ft
                      </span>
                    )}
                    {opportunity.projects?.budget_min && opportunity.projects?.budget_max && (
                      <span className="text-text-muted">
                        ₹{(opportunity.projects.budget_min / 100000).toFixed(0)}L - ₹{(opportunity.projects.budget_max / 100000).toFixed(0)}L
                      </span>
                    )}
                    <span className="text-text-muted flex items-center gap-1">
                      <Clock size={12} /> Deadline: {new Date(opportunity.deadline).toLocaleDateString('en-IN')}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
