import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { adminService } from '../lib/services';
import { Users, Briefcase, FileText, CheckCircle, Clock } from 'lucide-react';

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<any>(null);
  const [projectStats, setProjectStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/signin');
      return;
    }

    if (user && user.role !== 'admin') {
      navigate('/');
      return;
    }

    if (user) {
      loadStats();
    }
  }, [user, authLoading]);

  async function loadStats() {
    try {
      const [userStats, projStats] = await Promise.all([
        adminService.getUserStats(),
        adminService.getProjectStats(),
      ]);
      setStats(userStats);
      setProjectStats(projStats);
    } catch (error) {
      console.error('Failed to load stats:', error);
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
          <h1 className="text-3xl font-bold text-navy">Admin Dashboard</h1>
          <p className="text-text-muted mt-1">Manage users, projects, and system operations</p>
        </motion.div>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border border-border p-6"
          >
            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
              <Users size={22} className="text-secondary" />
            </div>
            <p className="text-text-muted text-sm">Total Users</p>
            <p className="text-3xl font-bold text-navy mt-1">{stats?.totalUsers || 0}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-border p-6"
          >
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
              <Users size={22} className="text-accent" />
            </div>
            <p className="text-text-muted text-sm">Clients</p>
            <p className="text-3xl font-bold text-navy mt-1">{stats?.clients || 0}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl border border-border p-6"
          >
            <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center mb-4">
              <Briefcase size={22} className="text-success" />
            </div>
            <p className="text-text-muted text-sm">Contractors</p>
            <p className="text-3xl font-bold text-navy mt-1">{stats?.contractors || 0}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl border border-border p-6"
          >
            <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center mb-4">
              <FileText size={22} className="text-orange" />
            </div>
            <p className="text-text-muted text-sm">Professionals</p>
            <p className="text-3xl font-bold text-navy mt-1">{stats?.professionals || 0}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl border border-border p-6"
          >
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
              <Clock size={22} className="text-red-600" />
            </div>
            <p className="text-text-muted text-sm">Pending Verification</p>
            <p className="text-3xl font-bold text-navy mt-1">{stats?.pendingVerification || 0}</p>
          </motion.div>
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl border border-border p-6"
          >
            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
              <Briefcase size={22} className="text-secondary" />
            </div>
            <p className="text-text-muted text-sm">Active Projects</p>
            <p className="text-3xl font-bold text-navy mt-1">{projectStats?.activeProjects || 0}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-2xl border border-border p-6"
          >
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
              <FileText size={22} className="text-accent" />
            </div>
            <p className="text-text-muted text-sm">Active Tenders</p>
            <p className="text-3xl font-bold text-navy mt-1">{projectStats?.activeTenders || 0}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-2xl border border-border p-6"
          >
            <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center mb-4">
              <CheckCircle size={22} className="text-success" />
            </div>
            <p className="text-text-muted text-sm">Awarded Projects</p>
            <p className="text-3xl font-bold text-navy mt-1">{projectStats?.awardedProjects || 0}</p>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white rounded-2xl border border-border p-6"
        >
          <h2 className="text-xl font-bold text-navy mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-3 text-sm font-semibold text-navy border border-border rounded-xl hover:bg-bg transition-colors text-left"
            >
              Manage Users
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-3 text-sm font-semibold text-navy border border-border rounded-xl hover:bg-bg transition-colors text-left"
            >
              Verification Requests
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-3 text-sm font-semibold text-navy border border-border rounded-xl hover:bg-bg transition-colors text-left"
            >
              View Audit Logs
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-3 text-sm font-semibold text-navy border border-border rounded-xl hover:bg-bg transition-colors text-left"
            >
              System Settings
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
