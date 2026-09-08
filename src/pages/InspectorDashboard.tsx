import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, FileText, CheckCircle, Clock } from 'lucide-react';

export default function InspectorDashboard() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/signin');
      return;
    }

    if (user && user.role !== 'inspector') {
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-navy">Inspector Dashboard</h1>
          <p className="text-text-muted mt-1">Welcome back, {user?.full_name}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl border border-border p-6">
            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
              <FileText size={22} className="text-secondary" />
            </div>
            <p className="text-text-muted text-sm">Assigned Inspections</p>
            <p className="text-3xl font-bold text-navy mt-1">0</p>
          </div>
          <div className="bg-white rounded-2xl border border-border p-6">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
              <Eye size={22} className="text-accent" />
            </div>
            <p className="text-text-muted text-sm">Upcoming</p>
            <p className="text-3xl font-bold text-navy mt-1">0</p>
          </div>
          <div className="bg-white rounded-2xl border border-border p-6">
            <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center mb-4">
              <CheckCircle size={22} className="text-success" />
            </div>
            <p className="text-text-muted text-sm">Completed</p>
            <p className="text-3xl font-bold text-navy mt-1">0</p>
          </div>
          <div className="bg-white rounded-2xl border border-border p-6">
            <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center mb-4">
              <Clock size={22} className="text-orange" />
            </div>
            <p className="text-text-muted text-sm">Open Issues</p>
            <p className="text-3xl font-bold text-navy mt-1">0</p>
          </div>
        </div>

        {/* Assigned Inspections */}
        <div className="bg-white rounded-2xl border border-border p-6">
          <h2 className="text-xl font-bold text-navy mb-4">Assigned Inspections</h2>
          <div className="text-center py-12">
            <Eye size={48} className="text-text-muted mx-auto mb-4" />
            <p className="text-text-muted">No inspections assigned yet</p>
            <p className="text-sm text-text-muted mt-2">You'll be notified when inspections are assigned to you</p>
          </div>
        </div>
      </div>
    </div>
  );
}
