import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Briefcase, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { adminService } from '../lib/services';

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-navy">Admin Dashboard</h1>
          <p className="text-text-muted mt-1">Manage users, projects, and system operations</p>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <StatCard
            icon={Users}
            label="Total Users"
            value={stats?.totalUsers || 0}
            color="bg-secondary/10 text-secondary"
          />
          <StatCard
            icon={Users}
            label="Clients"
            value={stats?.clients || 0}
            color="bg-accent/10 text-accent"
          />
          <StatCard
            icon={Briefcase}
            label="Contractors"
            value={stats?.contractors || 0}
            color="bg-success/10 text-success"
          />
          <StatCard
            icon={FileText}
            label="Professionals"
            value={stats?.professionals || 0}
            color="bg-orange/10 text-orange"
          />
          <StatCard
            icon={AlertCircle}
            label="Pending Verification"
            value={stats?.pendingVerification || 0}
            color="bg-red-100 text-red-600"
          />
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={Briefcase}
            label="Active Projects"
            value={projectStats?.activeProjects || 0}
            color="bg-secondary/10 text-secondary"
          />
          <StatCard
            icon={FileText}
            label="Active Tenders"
            value={projectStats?.activeTenders || 0}
            color="bg-accent/10 text-accent"
          />
          <StatCard
            icon={CheckCircle}
            label="Awarded Projects"
            value={projectStats?.awardedProjects || 0}
            color="bg-success/10 text-success"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-border p-6">
          <h2 className="text-xl font-bold text-navy mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ActionButton label="Manage Users" onClick={() => navigate('/admin/users')} />
            <ActionButton label="Verification Requests" onClick={() => navigate('/admin/verification')} />
            <ActionButton label="View Audit Logs" onClick={() => navigate('/admin/audit')} />
            <ActionButton label="System Settings" onClick={() => navigate('/admin/settings')} />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: any) {
  return (
    <div className="bg-white rounded-2xl border border-border p-6">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}>
        <Icon size={22} />
      </div>
      <p className="text-text-muted text-sm">{label}</p>
      <p className="text-3xl font-bold text-navy mt-1">{value}</p>
    </div>
  );
}

function ActionButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-3 text-sm font-semibold text-navy border border-border rounded-xl hover:bg-bg hover:border-secondary transition-colors text-left"
    >
      {label}
    </button>
  );
}
