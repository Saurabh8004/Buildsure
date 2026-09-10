import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export default function FinancingRequest() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    financingPurpose: '',
    applicantType: '',
    projectLocation: '',
    estimatedCost: '',
    financingAmount: '',
    expectedStartDate: '',
    projectDescription: '',
    fullName: user?.full_name || '',
    email: user?.email || '',
    phone: '',
    preferredContact: 'email',
    consent: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const nextStep = () => {
    if (step < 5) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!user) {
        throw new Error('You must be logged in to submit a financing request');
      }

      const { data, error } = await supabase
        .from('financing_requests')
        .insert({
          user_id: user.id,
          financing_purpose: formData.financingPurpose,
          applicant_type: formData.applicantType,
          project_location: formData.projectLocation,
          estimated_cost: formData.estimatedCost ? parseFloat(formData.estimatedCost) : null,
          financing_amount: parseFloat(formData.financingAmount),
          expected_start_date: formData.expectedStartDate || null,
          project_description: formData.projectDescription || null,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          preferred_contact: formData.preferredContact,
          status: 'new',
        })
        .select()
        .single();

      if (error) {
        console.error('Database error:', error);
        throw new Error(error.message || 'Failed to submit financing request');
      }

      if (!data) {
        throw new Error('No data returned from database');
      }

      console.log('Financing request created:', data.id);
      setSubmitted(true);
    } catch (error: any) {
      console.error('Failed to submit financing request:', error);
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
            Your financing request has been received. Our team will review the information and contact you with the next steps.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              to="/"
              className="px-6 py-3 bg-orange text-white font-semibold rounded-xl hover:bg-orange-dark transition-colors"
            >
              Return to Home
            </Link>
            <Link
              to="/dashboard/client"
              className="px-6 py-3 bg-bg text-navy font-semibold rounded-xl hover:bg-border transition-colors"
            >
              Go to Dashboard
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
            <h1 className="text-3xl font-bold text-navy">Get Started with Financing</h1>
            <p className="mt-2 text-text-muted">
              Tell us about your financing requirement and we'll help connect you with the appropriate financing options.
            </p>
          </motion.div>

          {/* Progress Indicator */}
          <div className="mt-8 flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className="flex-1 flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                    step >= s ? 'bg-orange text-white' : 'bg-bg text-text-muted'
                  }`}
                >
                  {step > s ? <CheckCircle size={16} /> : s}
                </div>
                {s < 5 && (
                  <div className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                    step > s ? 'bg-orange' : 'bg-bg'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-xs text-text-muted">
            <span>Purpose</span>
            <span>Applicant</span>
            <span>Project</span>
            <span>Contact</span>
            <span>Review</span>
          </div>
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
            {/* Step 1: Financing Purpose */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-bold text-navy mb-2">What do you need financing for?</h2>
                  <p className="text-sm text-text-muted">Select the option that best matches your requirement.</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { value: 'construction', label: 'New Construction' },
                    { value: 'renovation', label: 'Home Renovation' },
                    { value: 'commercial', label: 'Commercial Project' },
                    { value: 'working_capital', label: 'Contractor Working Capital' },
                    { value: 'equipment', label: 'Equipment / Machinery' },
                    { value: 'other', label: 'Other' },
                  ].map(option => (
                    <label
                      key={option.value}
                      className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                        formData.financingPurpose === option.value
                          ? 'border-orange bg-orange/5'
                          : 'border-border hover:border-navy'
                      }`}
                    >
                      <input
                        type="radio"
                        name="financingPurpose"
                        value={option.value}
                        checked={formData.financingPurpose === option.value}
                        onChange={handleChange}
                        className="w-4 h-4 accent-orange"
                      />
                      <span className="text-sm font-semibold text-text">{option.label}</span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Applicant Type */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-bold text-navy mb-2">Applicant Type</h2>
                  <p className="text-sm text-text-muted">Who is applying for financing?</p>
                </div>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { value: 'owner', label: 'Property Owner' },
                    { value: 'contractor', label: 'Contractor' },
                    { value: 'business', label: 'Business' },
                  ].map(option => (
                    <label
                      key={option.value}
                      className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                        formData.applicantType === option.value
                          ? 'border-orange bg-orange/5'
                          : 'border-border hover:border-navy'
                      }`}
                    >
                      <input
                        type="radio"
                        name="applicantType"
                        value={option.value}
                        checked={formData.applicantType === option.value}
                        onChange={handleChange}
                        className="w-4 h-4 accent-orange"
                      />
                      <span className="text-sm font-semibold text-text">{option.label}</span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Project Details */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-bold text-navy mb-2">Project Details</h2>
                  <p className="text-sm text-text-muted">Tell us about your project and financing needs.</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">Project Location</label>
                    <input
                      type="text"
                      name="projectLocation"
                      value={formData.projectLocation}
                      onChange={handleChange}
                      placeholder="City, State"
                      className="w-full px-4 py-3 bg-bg border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">Estimated Project Cost (₹)</label>
                    <input
                      type="number"
                      name="estimatedCost"
                      value={formData.estimatedCost}
                      onChange={handleChange}
                      placeholder="e.g., 5000000"
                      className="w-full px-4 py-3 bg-bg border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">Required Financing Amount (₹)</label>
                    <input
                      type="number"
                      name="financingAmount"
                      value={formData.financingAmount}
                      onChange={handleChange}
                      placeholder="e.g., 3000000"
                      className="w-full px-4 py-3 bg-bg border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">Expected Start Date</label>
                    <input
                      type="date"
                      name="expectedStartDate"
                      value={formData.expectedStartDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-bg border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">Project Description</label>
                  <textarea
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Briefly describe your project..."
                    className="w-full px-4 py-3 bg-bg border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange resize-none"
                  />
                </div>
              </motion.div>
            )}

            {/* Step 4: Contact Information */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-bold text-navy mb-2">Contact Information</h2>
                  <p className="text-sm text-text-muted">How can we reach you?</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-bg border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
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
                      className="w-full px-4 py-3 bg-bg border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
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
                      className="w-full px-4 py-3 bg-bg border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">Preferred Contact Method</label>
                    <select
                      name="preferredContact"
                      value={formData.preferredContact}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-bg border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                    >
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 5: Review and Submit */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-bold text-navy mb-2">Review and Submit</h2>
                  <p className="text-sm text-text-muted">Please review your information before submitting.</p>
                </div>
                <div className="space-y-4 bg-bg rounded-xl p-6">
                  <div>
                    <p className="text-xs text-text-muted mb-1">Financing Purpose</p>
                    <p className="font-semibold text-navy capitalize">{formData.financingPurpose.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted mb-1">Applicant Type</p>
                    <p className="font-semibold text-navy capitalize">{formData.applicantType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted mb-1">Project Location</p>
                    <p className="font-semibold text-navy">{formData.projectLocation}</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-text-muted mb-1">Estimated Cost</p>
                      <p className="font-semibold text-navy">₹{formData.estimatedCost}</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-muted mb-1">Financing Amount</p>
                      <p className="font-semibold text-navy">₹{formData.financingAmount}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted mb-1">Contact</p>
                    <p className="font-semibold text-navy">{formData.fullName}</p>
                    <p className="text-sm text-text-muted">{formData.email} • {formData.phone}</p>
                  </div>
                </div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="w-4 h-4 mt-1 accent-orange"
                    required
                  />
                  <span className="text-sm text-text">
                    I agree that ConstructBid may share my request with relevant financing partners for eligibility assessment.
                  </span>
                </label>
              </motion.div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center gap-2 px-6 py-3 border border-border text-navy font-semibold rounded-xl hover:bg-bg transition-colors"
              >
                <ArrowLeft size={16} /> Previous
              </button>
            ) : (
              <div />
            )}
            {step < 5 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-3 bg-orange text-white font-semibold rounded-xl hover:bg-orange-dark transition-colors"
              >
                Next <ArrowRight size={16} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-8 py-3 bg-orange text-white font-semibold rounded-xl hover:bg-orange-dark transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Financing Request'
                )}
              </button>
            )}
          </div>
        </motion.form>

        {/* Disclaimer */}
        <p className="mt-6 text-xs text-text-muted text-center">
          Financing is subject to eligibility and partner approval. ConstructBid does not guarantee approval or provide loans directly.
        </p>
      </div>
    </div>
  );
}
