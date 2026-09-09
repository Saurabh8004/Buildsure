import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { ArrowLeft, MapPin, Briefcase, Award, CheckCircle, Shield } from 'lucide-react';

export default function ContractorProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      loadContractorProfile();
    }
  }, [id]);

  async function loadContractorProfile() {
    if (!id) return;
    
    try {
      const { data: contractorProfile, error: profileError } = await supabase
        .from('contractor_profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (profileError) throw profileError;
      setProfile(contractorProfile);

      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('full_name, email')
        .eq('id', contractorProfile.user_id)
        .single();

      if (userError) throw userError;
      setUser(userData);
    } catch (err: any) {
      setError(err.message || 'Failed to load contractor profile');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-text-muted">Loading profile...</div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Contractor not found'}</p>
          <button
            onClick={() => navigate('/contractors')}
            className="px-6 py-3 bg-orange text-white font-semibold rounded-xl hover:bg-orange-dark transition-colors"
          >
            Back to Contractors
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-text-muted hover:text-navy transition-colors mb-4"
          >
            <ArrowLeft size={16} /> Back
          </button>
        </div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-border p-6 sm:p-8 mb-6"
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-navy">
                {profile.company_name || user?.full_name || 'Contractor'}
              </h1>
              {profile.business_type && (
                <p className="text-text-muted mt-1">{profile.business_type}</p>
              )}
            </div>
            {profile.verification_status === 'verified' && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring' }}
                className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 text-sm font-semibold rounded-full"
              >
                <Shield size={14} /> Verified
              </motion.span>
            )}
          </div>

          {/* Info Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {profile.office_location && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-start gap-3 p-4 bg-bg rounded-xl"
              >
                <MapPin size={18} className="text-blue shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-text-muted mb-1">Location</p>
                  <p className="font-semibold text-navy">{profile.office_location}</p>
                </div>
              </motion.div>
            )}

            {profile.specialization && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-start gap-3 p-4 bg-bg rounded-xl"
              >
                <Briefcase size={18} className="text-orange shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-text-muted mb-1">Specialization</p>
                  <p className="font-semibold text-navy">{profile.specialization}</p>
                </div>
              </motion.div>
            )}

            {profile.years_of_experience && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-start gap-3 p-4 bg-bg rounded-xl"
              >
                <CheckCircle size={18} className="text-green shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-text-muted mb-1">Experience</p>
                  <p className="font-semibold text-navy">{profile.years_of_experience} years</p>
                </div>
              </motion.div>
            )}

            {profile.completed_projects && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-start gap-3 p-4 bg-bg rounded-xl"
              >
                <Award size={18} className="text-teal shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-text-muted mb-1">Completed Projects</p>
                  <p className="font-semibold text-navy">{profile.completed_projects}</p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Service Areas */}
        {profile.service_areas && profile.service_areas.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl border border-border p-6 mb-6"
          >
            <h2 className="text-xl font-bold text-navy mb-4">Service Areas</h2>
            <div className="flex flex-wrap gap-2">
              {profile.service_areas.map((area: string, i: number) => (
                <span key={i} className="px-3 py-1.5 bg-bg border border-border rounded-lg text-sm text-text">
                  {area}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Project Types */}
        {profile.project_types && profile.project_types.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl border border-border p-6 mb-6"
          >
            <h2 className="text-xl font-bold text-navy mb-4">Project Types</h2>
            <div className="flex flex-wrap gap-2">
              {profile.project_types.map((type: string, i: number) => (
                <span key={i} className="px-3 py-1.5 bg-bg border border-border rounded-lg text-sm text-text capitalize">
                  {type}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Verification Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-2xl border border-border p-6"
        >
          <h2 className="text-xl font-bold text-navy mb-4">Verification Status</h2>
          <div className="p-4 bg-bg rounded-xl">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${
                profile.verification_status === 'verified' ? 'bg-green' :
                profile.verification_status === 'pending' ? 'bg-orange' :
                profile.verification_status === 'rejected' ? 'bg-red-500' :
                'bg-gray-400'
              }`} />
              <p className="font-semibold text-navy capitalize">
                {profile.verification_status.replace('_', ' ')}
              </p>
            </div>
            {profile.verification_status !== 'verified' && (
              <p className="text-sm text-text-muted mt-2">
                This contractor is not yet verified. Verification status is managed by ConstructBid administrators.
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
