import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Building2, MapPin, Calendar, DollarSign, User, Mail, Phone, FileText, CheckCircle } from 'lucide-react';

export default function ArchitectServices() {
  const [formData, setFormData] = useState({
    serviceType: '',
    projectType: '',
    projectLocation: '',
    projectSize: '',
    projectDescription: '',
    timeline: '',
    budget: '',
    fullName: '',
    email: '',
    phone: '',
    preferredContact: 'email',
    existingDrawings: 'no',
    additionalRequirements: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const serviceTypes = [
    { value: 'architectural_design', label: 'Architectural Design' },
    { value: 'structural_design', label: 'Structural Design' },
    { value: 'boq_preparation', label: 'BOQ Preparation' },
    { value: 'tender_preparation', label: 'Tender Preparation' },
    { value: 'site_supervision', label: 'Site Supervision' },
    { value: 'consultation', label: 'Consultation Only' },
    { value: 'complete_package', label: 'Complete Package (Design + Supervision)' },
  ];

  const projectTypes = [
    { value: 'residential', label: 'Residential (House/Villa)' },
    { value: 'apartment', label: 'Apartment/Flat' },
    { value: 'commercial', label: 'Commercial (Office/Shop)' },
    { value: 'industrial', label: 'Industrial' },
    { value: 'renovation', label: 'Renovation/Remodeling' },
    { value: 'interior', label: 'Interior Design' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Architect service request submitted:', formData);
    setSubmitted(true);
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
          <p className="text-text-muted mb-6">
            Thank you for submitting your service request. Our team will review your requirements and connect you with suitable architects/engineers.
          </p>
          <div className="bg-bg-alt rounded-xl p-6 text-left mb-6">
            <h3 className="font-semibold text-navy mb-3">What happens next?</h3>
            <ul className="space-y-2 text-sm text-text-muted">
              <li className="flex items-start gap-2">
                <span className="text-orange font-bold">1.</span>
                <span>Our team will review your service requirements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange font-bold">2.</span>
                <span>We'll match you with qualified architects/engineers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange font-bold">3.</span>
                <span>You'll receive proposals from professionals within 2-3 business days</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange font-bold">4.</span>
                <span>Review proposals and select the best professional for your project</span>
              </li>
            </ul>
          </div>
          <button
            onClick={() => setSubmitted(false)}
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
        <h1 className="text-3xl font-bold text-navy">Architect / Engineer Services</h1>
        <p className="text-text-muted mt-1">Request professional architectural and engineering services</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Services Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="bg-white rounded-2xl border border-border p-6 sticky top-6">
            <h3 className="text-xl font-bold text-navy mb-4">Available Services</h3>
            <div className="space-y-3">
              <div className="p-4 bg-bg-alt rounded-xl">
                <h4 className="font-semibold text-navy mb-2 flex items-center gap-2">
                  <Building2 size={18} className="text-orange" />
                  Architectural Design
                </h4>
                <p className="text-sm text-text-muted">Complete architectural design and drawings</p>
              </div>
              <div className="p-4 bg-bg-alt rounded-xl">
                <h4 className="font-semibold text-navy mb-2 flex items-center gap-2">
                  <Building2 size={18} className="text-orange" />
                  Structural Design
                </h4>
                <p className="text-sm text-text-muted">Structural engineering and calculations</p>
              </div>
              <div className="p-4 bg-bg-alt rounded-xl">
                <h4 className="font-semibold text-navy mb-2 flex items-center gap-2">
                  <FileText size={18} className="text-orange" />
                  BOQ Preparation
                </h4>
                <p className="text-sm text-text-muted">Bill of quantities and cost estimation</p>
              </div>
              <div className="p-4 bg-bg-alt rounded-xl">
                <h4 className="font-semibold text-navy mb-2 flex items-center gap-2">
                  <Users size={18} className="text-orange" />
                  Site Supervision
                </h4>
                <p className="text-sm text-text-muted">On-site supervision and quality control</p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-sm text-blue-900">
                💡 <strong>Note:</strong> You can request multiple services in a single request.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Service Request Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="bg-white rounded-2xl border border-border p-6">
            <h3 className="text-xl font-bold text-navy mb-6">Service Request Form</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Service Details */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-navy border-b border-border pb-2">
                  Service Details
                </h4>
                
                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Service Type *
                  </label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                  >
                    <option value="">Select service type</option>
                    {serviceTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
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
                      <MapPin size={16} className="inline mr-1" />
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
                    Project Size (sq.ft.)
                  </label>
                  <input
                    type="number"
                    name="projectSize"
                    value={formData.projectSize}
                    onChange={handleChange}
                    placeholder="e.g., 2400"
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                  />
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
                    placeholder="Describe your project requirements in detail..."
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      <Calendar size={16} className="inline mr-1" />
                      Expected Timeline
                    </label>
                    <input
                      type="text"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      placeholder="e.g., 3 months"
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      <DollarSign size={16} className="inline mr-1" />
                      Budget Range (₹)
                    </label>
                    <input
                      type="text"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      placeholder="e.g., 2-5 Lakhs"
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Do you have existing drawings/plans?
                  </label>
                  <select
                    name="existingDrawings"
                    value={formData.existingDrawings}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                    <option value="partial">Partial (some drawings available)</option>
                  </select>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-navy border-b border-border pb-2">
                  Contact Information
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
                      Preferred Contact Method
                    </label>
                    <select
                      name="preferredContact"
                      value={formData.preferredContact}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                    >
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                      <option value="whatsapp">WhatsApp</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Additional Requirements
                  </label>
                  <textarea
                    name="additionalRequirements"
                    value={formData.additionalRequirements}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Any specific requirements or preferences..."
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-border">
                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-orange text-white rounded-xl font-semibold hover:bg-orange-dark transition-colors flex items-center justify-center gap-2"
                >
                  <Users size={20} />
                  Submit Service Request
                </button>
                <p className="text-xs text-text-muted mt-3 text-center">
                  By submitting this form, you agree to be contacted by architects/engineers regarding your request.
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
