import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Ruler } from 'lucide-react';

export default function ArchitectDashboard() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/signin');
      return;
    }

    if (user && user.role !== 'architect') {
      navigate('/');
      return;
    }
  }, [user, authLoading]);

  if (authLoading) {
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
          <h1 className="text-3xl font-bold text-navy">Architect Dashboard</h1>
          <p className="text-text-muted mt-1">Welcome back, {user?.full_name}</p>
        </div>

        <div className="bg-white rounded-2xl border border-border p-12 text-center">
          <Ruler size={64} className="text-secondary mx-auto mb-4" />
          <h2 className="text-xl font-bold text-navy mb-2">Architect Dashboard</h2>
          <p className="text-text-muted">Your architect dashboard is being prepared.</p>
          <p className="text-sm text-text-muted mt-2">Check back soon for project opportunities and collaboration tools.</p>
        </div>
      </div>
    </div>
  );
}
