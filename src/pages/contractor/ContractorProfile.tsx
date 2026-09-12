import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Building2, MapPin, Phone, Mail, Award, Briefcase, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

export default function ContractorProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    company_name: '',
    business_type: '',
    year_established: '',
    office_location: '',
    specialization: '',
    years_of_experience: '',
    phone: '',
    website: '',
    description: '',
  });

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  async function loadProfile() {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('contractor_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setProfile(data);
        setFormData({
          company_name: data.company_name || '',
          business_type: data.business_type || '',
          year_established: data.year_established?.toString() || '',
          office_location: data.office_location || '',
          specialization: data.specialization || '',
          years_of_experience: data.years_of_experience?.toString() || '',
          phone: data.phone || '',
          website: data.website || '',
          description: data.description || '',
        });
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!user) return;
    
    setSaving(true);
    try {
      const updateData = {
        user_id: user.id,
        company_name: formData.company_name,
        business_type: formData.business_type,
        year_established: formData.year_established ? parseInt(formData.year_established) : null,
        office_location: formData.office_location,
        specialization: formData.specialization,
        years_of_experience: formData.years_of_experience ? parseInt(formData.years_of_experience) : null,
        phone: formData.phone,
        website: formData.website,
        description: formData.description,
      };

      if (profile) {
        // Update existing profile
        const { error } = await supabase
          .from('contractor_profiles')
          .update(updateData)
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        // Create new profile
        const { error } = await supabase
          .from('contractor_profiles')
          .insert(updateData);

        if (error) throw error;
      }

      // Reload profile
      await loadProfile();
      alert('Profile saved successfully!');
    } catch (error) {
      console.error('Failed to save profile:', error);
      alert('Failed to save profile. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-text-muted">Loading profile...</div>
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
        <h1 className="text-3xl font-bold text-navy">Contractor Profile</h1>
        <p className="text-text-muted mt-1">Manage your company information and capabilities</p>
      </motion.div>

      {/* Verification Status */}
      {profile?.verification_status && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className={`rounded-xl p-4 border ${
            profile.verification_status === 'verified' 
              ? 'bg-green-50 border-green-200' 
              : 'bg-yellow-50 border-yellow-200'
          }`}>
            <div className="flex items-center gap-3">
              {profile.verification_status === 'verified' ? (
                <CheckCircle size={24} className="text-green-600" />
              ) : (
                <Award size={24} className="text-yellow-600" />
              )}
              <div>
                <p className={`font-semibold ${
                  profile.verification_status === 'verified' ? 'text-green-900' : 'text-yellow-900'
                }`}>
                  {profile.verification_status === 'verified' 
                    ? 'Verified Contractor' 
                    : 'Verification Pending'}
                </p>
                <p className={`text-sm ${
                  profile.verification_status === 'verified' ? 'text-green-700' : 'text-yellow-700'
                }`}>
                  {profile.verification_status === 'verified'
                    ? 'Your profile has been verified'
                    : 'Your profile is under review'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Profile Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl border border-border p-6 lg:p-8"
      >
        <div className="space-y-6">
          {/* Company Information */}
          <div>
            <h2 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
              <Building2 size={24} />
              Company Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text mb-2">Company Name *</label>
                <input
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                  placeholder="Your company name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">Business Type</label>
                <select
                  name="business_type"
                  value={formData.business_type}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                >
                  <option value="">Select type</option>
                  <option value="proprietorship">Proprietorship</option>
                  <option value="partnership">Partnership</option>
                  <option value="llp">LLP</option>
                  <option value="pvt_ltd">Private Limited</option>
                  <option value="ltd">Limited</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">Year Established</label>
                <input
                  type="number"
                  name="year_established"
                  value={formData.year_established}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                  placeholder="e.g., 2010"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">Office Location</label>
                <input
                  type="text"
                  name="office_location"
                  value={formData.office_location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                  placeholder="City, State"
                />
              </div>
            </div>
          </div>

          {/* Experience & Specialization */}
          <div>
            <h2 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
              <Briefcase size={24} />
              Experience & Specialization
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text mb-2">Specialization</label>
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                  placeholder="e.g., Residential, Commercial"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">Years of Experience</label>
                <input
                  type="number"
                  name="years_of_experience"
                  value={formData.years_of_experience}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                  placeholder="e.g., 10"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
              <Phone size={24} />
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                  placeholder="https://yourcompany.com"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-bold text-navy mb-4">About Your Company</h2>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange resize-none"
              placeholder="Describe your company, services, and expertise..."
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-4 pt-4 border-t border-border">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-3 bg-orange text-white rounded-xl font-medium hover:bg-orange-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
