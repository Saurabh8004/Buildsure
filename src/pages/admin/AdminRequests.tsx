import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { FileText, Users, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function AdminRequests() {
  const [requests, setRequests] = useState<any[]>([]);
  const [architects, setArchitects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load all requests
      const { data: requestsData } = await supabase
        .from('architect_service_requests')
        .select(`
          *,
          projects:project_id (
            id,
            title,
            location,
            project_type
          )
        `)
        .order('created_at', { ascending: false });

      // Load all architects
      const { data: architectsData } = await supabase
        .from('users')
        .select('id, full_name, email')
        .eq('role', 'architect');

      setRequests(requestsData || []);
      setArchitects(architectsData || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async (requestId: string, architectId: string) => {
    setAssigning(requestId);
    try {
      const { error } = await supabase
        .from('architect_service_requests')
        .update({ 
          assigned_architect_id: architectId,
          status: 'matched',
          updated_at: new Date().toISOString()
        })
        .eq('id', requestId);

      if (error) {
        console.error('Error assigning architect:', error);
        alert('Failed to assign architect');
        return;
      }

      await loadData();
      alert('Architect assigned successfully');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to assign architect');
    } finally {
      setAssigning(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-muted">Loading requests...</p>
        </div>
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
          <h1 className="text-3xl font-bold text-navy">Admin - Service Requests</h1>
          <p className="text-text-muted mt-1">Manage and assign architect service requests</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border border-border p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <FileText size={20} className="text-blue" />
              <p className="text-sm text-text-muted">Total Requests</p>
            </div>
            <p className="text-3xl font-bold text-navy">{requests.length}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-border p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <AlertCircle size={20} className="text-orange" />
              <p className="text-sm text-text-muted">Pending Assignment</p>
            </div>
            <p className="text-3xl font-bold text-navy">
              {requests.filter(r => !r.assigned_architect_id).length}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl border border-border p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <Users size={20} className="text-purple" />
              <p className="text-sm text-text-muted">Assigned</p>
            </div>
            <p className="text-3xl font-bold text-navy">
              {requests.filter(r => r.assigned_architect_id).length}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl border border-border p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <Users size={20} className="text-green" />
              <p className="text-sm text-text-muted">Available Architects</p>
            </div>
            <p className="text-3xl font-bold text-navy">{architects.length}</p>
          </motion.div>
        </div>

        {/* Requests List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl border border-border p-6"
        >
          <h2 className="text-xl font-bold text-navy mb-4">Service Requests</h2>
          
          {requests.length === 0 ? (
            <div className="text-center py-12">
              <FileText size={48} className="text-text-muted mx-auto mb-4" />
              <h3 className="text-lg font-bold text-navy mb-2">No Service Requests</h3>
              <p className="text-text-muted">No architect service requests have been submitted yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {requests.map((request) => (
                <div key={request.id} className="p-4 bg-bg rounded-xl border border-border">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-navy">
                          {request.projects?.title || 'Project'}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          request.status === 'submitted' ? 'bg-blue-100 text-blue-700' :
                          request.status === 'matched' ? 'bg-purple-100 text-purple-700' :
                          request.status === 'in_progress' ? 'bg-cyan-100 text-cyan-700' :
                          request.status === 'completed' ? 'bg-green-100 text-green-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {request.status.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-text-muted">
                        <span>{request.projects?.location || request.project_location}</span>
                        <span>{request.projects?.project_type || request.project_type}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-text-muted mb-1">Service Type</p>
                      <p className="text-sm font-medium text-text capitalize">
                        {request.service_type.replace('_', ' ')}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-text-muted mb-1">Budget</p>
                      <p className="text-sm font-medium text-text">{request.budget || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-muted mb-1">Requested</p>
                      <p className="text-sm font-medium text-text">
                        {new Date(request.created_at).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>

                  {/* Assignment Section */}
                  {!request.assigned_architect_id ? (
                    <div className="pt-3 border-t border-border">
                      <p className="text-xs text-text-muted mb-2">Assign Architect</p>
                      <div className="flex gap-2">
                        <select
                          id={`architect-${request.id}`}
                          className="flex-1 px-3 py-2 border border-border rounded-lg text-sm"
                          defaultValue=""
                        >
                          <option value="" disabled>Select an architect</option>
                          {architects.map((arch) => (
                            <option key={arch.id} value={arch.id}>
                              {arch.full_name} ({arch.email})
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => {
                            const select = document.getElementById(`architect-${request.id}`) as HTMLSelectElement;
                            if (select.value) {
                              handleAssign(request.id, select.value);
                            }
                          }}
                          disabled={assigning === request.id}
                          className="px-4 py-2 bg-orange text-white rounded-lg text-sm font-semibold hover:bg-orange-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                          {assigning === request.id ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            <CheckCircle size={14} />
                          )}
                          Assign
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="pt-3 border-t border-border">
                      <p className="text-xs text-text-muted mb-1">Assigned Architect</p>
                      <p className="text-sm font-medium text-text">
                        {architects.find(a => a.id === request.assigned_architect_id)?.full_name || 'Unknown'}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
