import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, Calendar, DollarSign, Users, Clock,
  CheckCircle, Plus, Eye, ArrowLeft
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { tenderService, bidService } from '../../lib/services';

export default function TenderManagement() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tenders, setTenders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (projectId) {
      loadTenders();
    }
  }, [projectId]);

  async function loadTenders() {
    if (!projectId) return;
    
    try {
      const projectTenders = await tenderService.getProjectTenders(projectId);
      setTenders(projectTenders);
    } catch (error) {
      console.error('Failed to load tenders:', error);
    } finally {
      setLoading(false);
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-700';
      case 'published': return 'bg-blue-100 text-blue-700';
      case 'closed': return 'bg-green-100 text-green-700';
      case 'awarded': return 'bg-orange-100 text-orange';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-text-muted">Loading tenders...</div>
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
            <h1 className="text-3xl font-bold text-navy">Tender Management</h1>
            <p className="text-text-muted mt-1">Manage tenders for this project</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-orange text-white rounded-xl font-medium hover:bg-orange-dark transition-colors">
            <Plus size={20} />
            Create Tender
          </button>
        </div>
      </motion.div>

      {/* Tenders List */}
      {tenders.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-border p-12 text-center"
        >
          <FileText size={64} className="text-text-muted mx-auto mb-4" />
          <h3 className="text-xl font-bold text-navy mb-2">No tenders yet</h3>
          <p className="text-text-muted mb-4">
            Create your first tender to start receiving bids
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-orange text-white rounded-xl font-medium hover:bg-orange-dark transition-colors">
            <Plus size={20} />
            Create First Tender
          </button>
        </motion.div>
      ) : (
        <div className="space-y-4">
            {tenders.map((tender, index) => (
            <motion.div
              key={tender.id}
                initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
                <div className="bg-white rounded-2xl border border-border p-6 hover:border-orange hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-navy mb-2">{tender.title}</h3>
                    {tender.description && (
                      <p className="text-sm text-text-muted mb-3 line-clamp-2">
                        {tender.description}
                      </p>
                    )}
                  </div>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(tender.status)}`}>
                    {tender.status}
                </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={16} className="text-text-muted" />
                    <div>
                      <p className="text-xs text-text-muted">Deadline</p>
                      <p className="font-semibold text-navy">
                        {new Date(tender.deadline).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock size={16} className="text-text-muted" />
                    <div>
                      <p className="text-xs text-text-muted">Created</p>
                      <p className="font-semibold text-navy">
                        {new Date(tender.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users size={16} className="text-text-muted" />
                    <div>
                      <p className="text-xs text-text-muted">Status</p>
                      <p className="font-semibold text-navy capitalize">
                        {tender.status.replace('_', ' ')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-navy border border-border rounded-lg hover:bg-bg-alt transition-colors">
                      <Eye size={16} />
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
