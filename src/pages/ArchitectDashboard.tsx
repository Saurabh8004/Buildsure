import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Ruler, FileText, CheckCircle, Clock } from 'lucide-react';

export default function ArchitectDashboard() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/signin');
      return;
    }

    if (user && user.role !== 'architect') {
      navigate('/');
      return;
    }

    setLoading(false);
  }, [user, authLoading]);

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
          <h1 className="text-3xl font-bold text-navy">Architect Dashboard</h1>
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
              <FileText size={22} className="text-secondary" />
            </div>
            <p className="text-text-muted text-sm">Assigned Projects</p>
            <p className="text-3xl font-bold text-navy mt-1">0</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-border p-6"
          >
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
              <Ruler size={22} className="text-accent" />
            </div>
            <p className="text-text-muted text-sm">Design Tasks</p>
            <p className="text-3xl font-bold text-navy mt-1">0</p>
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
            <p className="text-text-muted text-sm">Completed</p>
            <p className="text-3xl font-bold text-navy mt-1">0</p>
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
            <p className="text-text-muted text-sm">Pending Review</p>
            <p className="text-3xl font-bold text-navy mt-1">0</p>
          </motion.div>
        </div>

        {/* Assigned Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl border border-border p-6"
        >
          <h2 className="text-xl font-bold text-navy mb-4">Assigned Projects</h2>
          <div className="text-center py-12">
            <Ruler size={48} className="text-text-muted mx-auto mb-4" />
            <p className="text-text-muted">No assigned projects yet</p>
            <p className="text-sm text-text-muted mt-2">You'll be notified when projects are assigned to you</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
