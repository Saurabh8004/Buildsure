import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, Award, Briefcase, CheckCircle, 
  AlertTriangle, Clock, TrendingUp, Search,
  MapPin, Calendar, DollarSign
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { bidService, tenderService, projectService } from '../../lib/services';

export default function ContractorDashboard() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [bids, setBids] = useState<any[]>([]);
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [activeProjects, setActiveProjects] = useState<any[]>([]);
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
      loadData();
    }
  }, [user, authLoading]);

  async function loadData() {
    if (!user) return;
    
    try {
      // Load contractor's bids
      const userBids = await bidService.getContractorBids(user.id);
      setBids(userBids);

      // Load available opportunities
      const publishedTenders = await tenderService.getPublishedTenders();
      setOpportunities(publishedTenders);

      // Load active projects (awarded to this contractor)
      // This would need a new service method to get projects awarded to contractor
      // For now, we'll show empty state
      setActiveProjects([]);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  }

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-text-muted">Loading dashboard...</div>
      </div>
    );
  }

  // Calculate KPIs
  const activeBids = bids.filter(b => b.status === 'submitted' || b.status === 'under_review').length;
  const shortlistedBids = bids.filter(b => b.status === 'shortlisted').length;
  const awardedBids = bids.filter(b => b.status === 'awarded' || b.status === 'selected').length;
  const totalBidValue = bids.reduce((sum, b) => sum + (b.total_amount || 0), 0);

  return (
    <div className="p-6 lg:p-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-navy">
          Welcome back, {user?.full_name?.split(' ')[0] || 'Contractor'}
        </h1>
        <p className="text-text-muted mt-1">Here's what's happening with your projects</p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-border p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FileText size={22} className="text-blue-600" />
            </div>
            <TrendingUp size={20} className="text-text-muted" />
          </div>
          <p className="text-text-muted text-sm mb-1">Active Bids</p>
          <p className="text-3xl font-bold text-navy">{activeBids}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-border p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Award size={22} className="text-orange" />
            </div>
            <Award size={20} className="text-text-muted" />
          </div>
          <p className="text-text-muted text-sm mb-1">Shortlisted</p>
          <p className="text-3xl font-bold text-navy">{shortlistedBids}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border border-border p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle size={22} className="text-green-600" />
            </div>
            <Briefcase size={20} className="text-text-muted" />
          </div>
          <p className="text-text-muted text-sm mb-1">Won Projects</p>
          <p className="text-3xl font-bold text-navy">{awardedBids}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl border border-border p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <DollarSign size={22} className="text-purple-600" />
            </div>
            <TrendingUp size={20} className="text-text-muted" />
          </div>
          <p className="text-text-muted text-sm mb-1">Total Bid Value</p>
          <p className="text-3xl font-bold text-navy">
            ₹{(totalBidValue / 100000).toFixed(1)}L
          </p>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* New Project Opportunities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 bg-white rounded-2xl border border-border p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-navy">New Project Opportunities</h2>
            <Link
              to="/contractor/projects"
              className="text-sm font-medium text-orange hover:text-orange-dark transition-colors"
            >
              View All →
            </Link>
          </div>

          {opportunities.length === 0 ? (
            <div className="text-center py-12">
              <Search size={48} className="text-text-muted mx-auto mb-4" />
              <p className="text-text-muted">No new opportunities available</p>
              <p className="text-sm text-text-muted mt-2">Check back later for new projects</p>
            </div>
          ) : (
            <div className="space-y-4">
              {opportunities.slice(0, 3).map((opportunity) => (
                <Link
                  key={opportunity.id}
                  to={`/contractor/projects/${opportunity.project_id}`}
                  className="block p-4 border border-border rounded-xl hover:border-orange hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-navy">
                        {opportunity.projects?.title || 'Project'}
                      </h3>
                      <p className="text-sm text-text-muted flex items-center gap-1 mt-1">
                        <MapPin size={14} />
                        {opportunity.projects?.location}
                        {opportunity.projects?.locality && `, ${opportunity.projects.locality}`}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      Open
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-text-muted">
                      <DollarSign size={14} />
                      <span>
                        ₹{(opportunity.projects?.budget_min / 100000).toFixed(0)}L - ₹{(opportunity.projects?.budget_max / 100000).toFixed(0)}L
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-text-muted">
                      <Calendar size={14} />
                      <span>{new Date(opportunity.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </motion.div>

        {/* Recent Bids */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl border border-border p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-navy">Recent Bids</h2>
            <Link
              to="/contractor/bids"
              className="text-sm font-medium text-orange hover:text-orange-dark transition-colors"
            >
              View All →
            </Link>
          </div>

          {bids.length === 0 ? (
            <div className="text-center py-12">
              <FileText size={48} className="text-text-muted mx-auto mb-4" />
              <p className="text-text-muted">No bids yet</p>
              <p className="text-sm text-text-muted mt-2">Start by finding projects</p>
            </div>
          ) : (
            <div className="space-y-3">
              {bids.slice(0, 5).map((bid) => (
                <Link
                  key={bid.id}
                  to={`/contractor/bids/${bid.id}`}
                  className="block p-3 border border-border rounded-lg hover:border-orange transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-sm font-medium text-navy line-clamp-1">
                      {bid.tenders?.projects?.title || 'Project'}
                    </p>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      bid.status === 'submitted' ? 'bg-blue-100 text-blue-700' :
                      bid.status === 'shortlisted' ? 'bg-orange-100 text-orange' :
                      bid.status === 'awarded' || bid.status === 'selected' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {bid.status}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted">
                    ₹{(bid.total_amount / 100000).toFixed(1)}L
                  </p>
                </Link>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-8 bg-gradient-to-r from-navy to-navy-light rounded-2xl p-6 text-white"
      >
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            to="/contractor/projects"
            className="flex items-center gap-3 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
          >
            <Search size={24} />
            <div>
              <p className="font-semibold">Find Projects</p>
              <p className="text-sm text-white/70">Browse opportunities</p>
            </div>
          </Link>
          <Link
            to="/contractor/bids"
            className="flex items-center gap-3 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
          >
            <FileText size={24} />
            <div>
              <p className="font-semibold">My Bids</p>
              <p className="text-sm text-white/70">Track your bids</p>
            </div>
          </Link>
          <Link
            to="/contractor/profile"
            className="flex items-center gap-3 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
          >
            <Award size={24} />
            <div>
              <p className="font-semibold">Profile</p>
              <p className="text-sm text-white/70">Update your profile</p>
            </div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
