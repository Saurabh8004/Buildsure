import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Loader2, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export default function InspectionRequest() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    projectName: '',
    projectLocation: '',
    inspectionType: '',
    preferredDate: '',
    projectStage: '',
    specialRequirements: '',
    fullName: user?.full_name || '',
    email: user?.email || '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Verify user is authenticated
      if (!user) {
        throw new Error('You must be logged in to submit an inspection request');
      }

      // Create inspection request in database
      const { data, error } = await supabase
        .from('inspection_requests')
        .insert({
          user_id: user.id,
          project_name: formData.projectName,
          project_location: formData.projectLocation,
          inspection_type: formData.inspectionType,
          preferred_date: formData.preferredDate || null,
          project_stage: formData.projectStage,
          special_requirements: formData.specialRequirements || null,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          status: 'new',
        })
        .select()
        .single();

      if (error) {
        console.error('Database error:', error);
        throw new Error(error.message || 'Failed to submit inspection request');
      }

      if (!data) {
        throw new Error('No data returned from database');
      }

      console.log('Inspection request created:', data.id);
      setSubmitted(true);
    } catch (error: any) {
      console.error('Failed to submit inspection request:', error);
      alert(error.message || 'Failed to submit request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-2xl border border-border p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-16 h-16 bg-green/10 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle size={32} className="text-green" />
          </motion.div>
          <h1 className="text-2xl font-bold text-navy mb-3">Request Submitted</h1>
          <p className="text-text-muted mb-6">
            Your inspection request has been received. Our quality assurance team will contact you to schedule the inspection.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              to="/"
              className="px-6 py-3 bg-orange text-white font-semibold rounded-xl hover:bg-orange-dark transition-colors"
            >
              Return to Home
            </Link>
            <Link
              to="/quality-assurance"
              className="px-6 py-3 bg-bg text-navy font-semibold rounded-xl hover:bg-border transition-colors"
            >
              Learn More About Quality Assurance
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-text-muted hover:text-navy transition-colors mb-4"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center">
                <Shield size={24} className="text-teal" />
              </div>
              <h1 className="text-3xl font-bold text-navy">Request Inspection</h1>
            </div>
            <p className="text-text-muted">
              Schedule a professional inspection for your construction project. Our quality assurance team will verify work quality at key construction stages.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl border border-border p-6 sm:p-8"
        >
          <div className="space-y-6">
            {/* Project Information */}
            <div>
              <h2 className="text-xl font-bold text-navy mb-4">Project Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">Project Name</label>
                  <input
                    type="text"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleChange}
                    placeholder="e.g., Residential Construction"
                    className="w-full px-4 py-3 bg-bg border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">Project Location</label>
                  <input
                    type="text"
                    name="projectLocation"
                    value={formData.projectLocation}
                    onChange={handleChange}
                    placeholder="City, Area"
                    className="w-full px-4 py-3 bg-bg border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">Inspection Type</label>
                  <select
                    name="inspectionType"
                    value={formData.inspectionType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-bg border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
                    required
                  >
                    <option value="">Select inspection type</option>
                    <option value="foundation">Foundation Inspection</option>
                    <option value="structure">Structural Inspection</option>
                    <option value="quality">Quality Check</option>
                    <option value="material">Material Verification</option>
                    <option value="final">Final Inspection</option>
                    <option value="pre_purchase">Pre-Purchase Inspection</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">Current Project Stage</label>
                  <select
                    name="projectStage"
                    value={formData.projectStage}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-bg border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
                    required
                  >
                    <option value="">Select stage</option>
                    <option value="foundation">Foundation</option>
                    <option value="structure">Structure/RCC</option>
                    <option value="brickwork">Brickwork</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="electrical">Electrical</option>
                    <option value="finishing">Finishing</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">Preferred Inspection Date</label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-bg border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-semibold text-navy mb-2">Special Requirements</label>
                <textarea
                  name="specialRequirements"
                  value={formData.specialRequirements}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Any specific areas of concern or special requirements..."
                  className="w-full px-4 py-3 bg-bg border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal resize-none"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-xl font-bold text-navy mb-4">Contact Information</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-bg border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-bg border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-4 py-3 bg-bg border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-8 py-3 bg-teal text-white font-semibold rounded-xl hover:bg-teal-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Inspection Request'
              )}
            </button>
          </div>
        </motion.form>

        {/* Info Box */}
        <div className="mt-6 bg-teal/5 border border-teal/20 rounded-xl p-6">
          <h3 className="font-bold text-navy mb-2">What happens next?</h3>
          <ol className="space-y-2 text-sm text-text-muted">
            <li>1. Our quality assurance team will review your request</li>
            <li>2. We'll contact you to confirm inspection details and schedule</li>
            <li>3. A qualified inspector will visit your project site</li>
            <li>4. You'll receive a detailed inspection report with findings</li>
            <li>5. Any issues will be tracked through our quality management system</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
