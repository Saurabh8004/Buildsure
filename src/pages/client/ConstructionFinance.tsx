import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Building2, Calendar, User, Mail, Phone, FileText, CheckCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

export default function ConstructionFinance() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [requestId, setRequestId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    financingType: '',
    amountNeeded: '',
    projectType: '',
    projectLocation: '',
    projectDescription: '',
    timeline: '',
    fullName: user?.full_name || '',
    email: user?.email || '',
    phone: '',
    employmentStatus: '',
    annualIncome: '',
    existingLoans: '',
    additionalNotes: '',
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.full_name || '',
        email: user.email || '',
      }));
    }
  }, [user]);

  const financingTypes = [
    { value: 'home_construction', label: 'Home Construction Loan' },
    { value: 'renovation', label: 'Renovation Loan' },
    { value: 'commercial', label: 'Commercial Construction' },
    { value: 'plot_purchase', label: 'Plot Purchase Loan' },
    { value: 'extension', label: 'Home Extension' },
    { value: 'other', label: 'Other' },
  ];

  const projectTypes = [
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'industrial', label: 'Industrial' },
    { value: 'renovation', label: 'Renovation' },
  ];

  const employmentStatuses = [
    { value: 'salaried', label: 'Salaried' },
    { value: 'self_employed', label: 'Self Employed' },
    { value: 'business_owner', label: 'Business Owner' },
    { value: 'retired', label: 'Retired' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!user) {
      setError('You must be logged in to submit a request');
      setLoading(false);
      return;
    }

    try {
      const { data, error: insertError } = await supabase
        .from('financing_requests')
        .insert({
          user_id: user.id,
          financing_purpose: formData.financingType,
          applicant_type: 'owner',
          project_location: formData.projectLocation,
          estimated_cost: formData.annualIncome ? parseFloat(formData.annualIncome) : null,
          financing_amount: parseFloat(formData.amountNeeded),
          project_description: formData.projectDescription || null,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          preferred_contact: 'email',
          status: 'new',
        })
        .select()
        .single();

      if (insertError) {
        console.error('Supabase insert error:', insertError);
        setError('Failed to submit request. Please try again.');
        setLoading(false);
        return;
      }

      if (data) {
        setRequestId(data.id);
        setSubmitted(true);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto bg-white rounded-2xl border border-border p-12 text-center"
        >
          <div className="w-20 h-20 bg-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green" />
          </div>
          <h2 className="text-2xl font-bold text-navy mb-4">Request Submitted Successfully!</h2>
          {requestId && (
            <p className="text-sm text-text-muted mb-4">
              Request ID: <span className="font-mono font-semibold">{requestId}</span>
            </p>
          )}
          <p className="text-text-muted mb-6">
            Thank you for submitting your financing request. Our team will review your application and connect you with suitable financing partners.
          </p>
          <div className="bg-bg-alt rounded-xl p-6 text-left mb-6">
            <h3 className="font-semibold text-navy mb-3">What happens next?</h3>
            <ul className="space-y-2 text-sm text-text-muted">
              <li className="flex items-start gap-2">
                <span className="text-orange font-bold">1.</span>
                <span>Our team will review your financing requirements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange font-bold">2.</span>
                <span>We'll match you with suitable financing partners</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange font-bold">3.</span>
                <span>You'll receive contact from potential lenders within 2-3 business days</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange font-bold">4.</span>
                <span>Complete the application process with your chosen partner</span>
              </li>
            </ul>
          </div>
          <button
            onClick={() => {
              setSubmitted(false);
              setRequestId(null);
              setFormData({
                financingType: '',
                amountNeeded: '',
                projectType: '',
                projectLocation: '',
                projectDescription: '',
                timeline: '',
                fullName: user?.full_name || '',
                email: user?.email || '',
                phone: '',
                employmentStatus: '',
                annualIncome: '',
                existingLoans: '',
                additionalNotes: '',
              });
            }}
            className="px-6 py-3 bg-orange text-white rounded-xl font-semibold hover:bg-orange-dark transition-colors"
          >
            Submit Another Request
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-navy">Construction Finance</h1>
        <p className="text-text-muted mt-1">Get financing assistance for your construction project</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Financing Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="bg-white rounded-2xl border border-border p-6 sticky top-6">
            <h3 className="text-xl font-bold text-navy mb-4">Financing Options</h3>
            <div className="space-y-3">
              <div className="p-4 bg-bg-alt rounded-xl">
                <h4 className="font-semibold text-navy mb-2 flex items-center gap-2">
                  <Building2 size={18} className="text-orange" />
                  Home Construction
                </h4>
                <p className="text-sm text-text-muted">Up to 80% of project cost</p>
              </div>
              <div className="p-4 bg-bg-alt rounded-xl">
                <h4 className="font-semibold text-navy mb-2 flex items-center gap-2">
                  <Building2 size={18} className="text-orange" />
                  Renovation Loan
                </h4>
                <p className="text-sm text-text-muted">Up to 70% of renovation cost</p>
              </div>
              <div className="p-4 bg-bg-alt rounded-xl">
                <h4 className="font-semibold text-navy mb-2 flex items-center gap-2">
                  <Building2 size={18} className="text-orange" />
                  Commercial Construction
                </h4>
                <p className="text-sm text-text-muted">Customized financing solutions</p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-sm text-blue-900">
                💡 <strong>Note:</strong> Actual loan approval depends on the financing partner's criteria and your eligibility.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Financing Request Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="bg-white rounded-2xl border border-border p-6">
            <h3 className="text-xl font-bold text-navy mb-6">Financing Request Form</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Financing Details */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-navy border-b border-border pb-2">
                  Financing Details
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Type of Financing *
                    </label>
                    <select
                      name="financingType"
                      value={formData.financingType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                    >
                      <option value="">Select financing type</option>
                      {financingTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Amount Needed (₹) *
                    </label>
                    <input
                      type="number"
                      name="amountNeeded"
                      value={formData.amountNeeded}
                      onChange={handleChange}
                      required
                      placeholder="e.g., 2500000"
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Project Type *
                    </label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                    >
                      <option value="">Select project type</option>
                      {projectTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Project Location *
                    </label>
                    <input
                      type="text"
                      name="projectLocation"
                      value={formData.projectLocation}
                      onChange={handleChange}
                      required
                      placeholder="e.g., Lucknow, Uttar Pradesh"
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Project Description *
                  </label>
                  <textarea
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Describe your construction project in detail..."
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Expected Timeline
                  </label>
                  <input
                    type="text"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    placeholder="e.g., 12 months"
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                  />
                </div>
              </div>

              {/* Personal Information */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-navy border-b border-border pb-2">
                  Personal Information
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      <User size={16} className="inline mr-1" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      <Mail size={16} className="inline mr-1" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      <Phone size={16} className="inline mr-1" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Employment Status *
                    </label>
                    <select
                      name="employmentStatus"
                      value={formData.employmentStatus}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                    >
                      <option value="">Select status</option>
                      {employmentStatuses.map(status => (
                        <option key={status.value} value={status.value}>{status.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Annual Income (₹)
                    </label>
                    <input
                      type="number"
                      name="annualIncome"
                      value={formData.annualIncome}
                      onChange={handleChange}
                      placeholder="e.g., 1200000"
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Existing Loans (₹)
                    </label>
                    <input
                      type="number"
                      name="existingLoans"
                      value={formData.existingLoans}
                      onChange={handleChange}
                      placeholder="e.g., 500000"
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    <FileText size={16} className="inline mr-1" />
                    Additional Notes
                  </label>
                  <textarea
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Any additional information you'd like to share..."
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange resize-none"
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-sm text-red-900">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4 border-t border-border">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-4 bg-orange text-white rounded-xl font-semibold hover:bg-orange-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Submitting Request...
                    </>
                  ) : (
                    <>
                      <DollarSign size={20} />
                      Submit Financing Request
                    </>
                  )}
                </button>
                <p className="text-xs text-text-muted mt-3 text-center">
                  By submitting this form, you agree to be contacted by financing partners regarding your request.
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
