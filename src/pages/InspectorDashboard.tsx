import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye } from 'lucide-react';

export default function InspectorDashboard() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/signin');
      return;
    }

    if (user && user.role !== 'inspector') {
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
          <h1 className="text-3xl font-bold text-navy">Inspector Dashboard</h1>
          <p className="text-text-muted mt-1">Welcome back, {user?.full_name}</p>
        </div>

        <div className="bg-white rounded-2xl border border-border p-12 text-center">
          <Eye size={64} className="text-success mx-auto mb-4" />
          <h2 className="text-xl font-bold text-navy mb-2">Inspector Dashboard</h2>
          <p className="text-text-muted">Your inspector dashboard is being prepared.</p>
          <p className="text-sm text-text-muted mt-2">Check back soon for inspection assignments and quality monitoring tools.</p>
        </div>
      </div>
    </div>
  );
}
