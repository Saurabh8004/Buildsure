import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ArrowLeft, ArrowRight, Upload, X } from 'lucide-react';

export default function ArchitectApplicationForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Details
    full_name: '',
    email: '',
    phone: '',
    city: '',
    years_of_experience: '',
    professional_role: '',
    
    // Professional Details
    company_name: '',
    registration_number: '',
    areas_of_expertise: '',
    project_types: '',
    projects_completed: '',
    professional_bio: '',
    
    // Services
    services: [] as string[],
    
    // Documents
    documents: [] as File[],
  });

  const serviceOptions = [
    'Architectural Design',
    'Structural Design',
    'MEP Design',
    'BOQ Preparation',
    'Quantity Estimation',
    'Tender Preparation',
    'Site Supervision',
    'Project Coordination',
    'Quality Inspection',
    'Other',
  ];

  const roleOptions = [
    'Architect',
    'Civil Engineer',
    'Structural Engineer',
    'MEP Engineer',
    'Interior Designer',
    'Other',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        documents: [...prev.documents, ...files].slice(0, 5), // Max 5 files
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index),
    }));
  };

  const validateStep = () => {
    if (step === 1) {
      return formData.full_name && formData.email && formData.phone && 
             formData.city && formData.years_of_experience && formData.professional_role;
    }
    if (step === 3) {
      return formData.services.length > 0;
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(prev => Math.min(prev + 1, 5));
    } else {
      alert('Please fill in all required fields');
    }
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep()) {
      alert('Please complete all required fields');
      return;
    }

    setLoading(true);
    try {
      // Upload documents to Supabase Storage
      const uploadedDocs = [];
      for (const file of formData.documents) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `architect-applications/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('documents')
          .upload(filePath, file);

        if (!uploadError) {
          uploadedDocs.push({
            name: file.name,
            path: filePath,
            type: file.type,
            size: file.size,
          });
        }
      }

      // Submit application to database
      const { error } = await supabase
        .from('architect_partner_applications')
        .insert({
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          years_of_experience: parseInt(formData.years_of_experience),
          professional_role: formData.professional_role,
          company_name: formData.company_name,
          registration_number: formData.registration_number,
          areas_of_expertise: formData.areas_of_expertise,
          project_types: formData.project_types,
          projects_completed: formData.projects_completed ? parseInt(formData.projects_completed) : null,
          professional_bio: formData.professional_bio,
          services: formData.services.join(','),
          documents: uploadedDocs,
          status: 'pending',
        });

      if (error) throw error;

      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Error submitting application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy via-navy to-navy-light flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl p-8 sm:p-12 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-navy mb-4">APPLICATION RECEIVED</h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your interest in the ConstructBid Partner Network. 
            Our team will review your details and contact you if there is a suitable opportunity.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-navy text-white rounded-lg hover:bg-navy-light transition-colors"
          >
            BACK TO HOME
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy to-navy-light py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            JOIN THE CONSTRUCTBID PARTNER NETWORK
          </h1>
          <p className="text-lg text-gray-300">
            Tell us about your experience and expertise. Our team will review your profile and contact you for suitable projects.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white text-sm">Step {step} of 5</span>
            <span className="text-white text-sm">{Math.round((step / 5) * 100)}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-orange h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Steps */}
        <div className="bg-white rounded-2xl p-6 sm:p-8">
          {/* Step 1: Personal Details */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-navy mb-6">Personal Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience *
                  </label>
                  <input
                    type="number"
                    name="years_of_experience"
                    value={formData.years_of_experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Professional Role *
                  </label>
                  <select
                    name="professional_role"
                    value={formData.professional_role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent"
                    required
                  >
                    <option value="">Select your role</option>
                    {roleOptions.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Professional Details */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-navy mb-6">Professional Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company / Firm Name
                  </label>
                  <input
                    type="text"
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Registration / License Number
                  </label>
                  <input
                    type="text"
                    name="registration_number"
                    value={formData.registration_number}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Areas of Expertise
                  </label>
                  <input
                    type="text"
                    name="areas_of_expertise"
                    value={formData.areas_of_expertise}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent"
                    placeholder="e.g., Residential, Commercial, Industrial"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Types Worked On
                  </label>
                  <input
                    type="text"
                    name="project_types"
                    value={formData.project_types}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent"
                    placeholder="e.g., Residential, Commercial, Industrial"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Approximate Projects Completed
                  </label>
                  <input
                    type="number"
                    name="projects_completed"
                    value={formData.projects_completed}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Professional Bio / About You
                </label>
                <textarea
                  name="professional_bio"
                  value={formData.professional_bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent"
                  placeholder="Tell us about your experience and expertise..."
                />
              </div>
            </div>
          )}

          {/* Step 3: Services */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-navy mb-6">Services Offered</h2>
              <p className="text-sm text-gray-600 mb-4">Select all services you offer (at least one required)</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {serviceOptions.map(service => (
                  <label
                    key={service}
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.services.includes(service)
                        ? 'border-orange bg-orange/5'
                        : 'border-gray-300 hover:border-orange/50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.services.includes(service)}
                      onChange={() => handleServiceToggle(service)}
                      className="w-4 h-4 text-orange border-gray-300 rounded focus:ring-orange"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-700">{service}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Documents */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-navy mb-6">Documents</h2>
              <p className="text-sm text-gray-600 mb-4">
                Upload relevant documents (optional, max 5 files)
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Documents
                  </label>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-orange transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PDF, DOC, JPG, PNG (max 5 files)</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      multiple
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>

                {formData.documents.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Uploaded Files:</p>
                    {formData.documents.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-700 truncate">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 5: Review */}
          {step === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-navy mb-6">Review & Submit</h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-navy mb-3">Personal Details</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Name:</span> {formData.full_name}</p>
                    <p><span className="font-medium">Email:</span> {formData.email}</p>
                    <p><span className="font-medium">Phone:</span> {formData.phone}</p>
                    <p><span className="font-medium">City:</span> {formData.city}</p>
                    <p><span className="font-medium">Experience:</span> {formData.years_of_experience} years</p>
                    <p><span className="font-medium">Role:</span> {formData.professional_role}</p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-navy mb-3">Professional Details</h3>
                  <div className="space-y-2 text-sm">
                    {formData.company_name && <p><span className="font-medium">Company:</span> {formData.company_name}</p>}
                    {formData.registration_number && <p><span className="font-medium">License:</span> {formData.registration_number}</p>}
                    {formData.areas_of_expertise && <p><span className="font-medium">Expertise:</span> {formData.areas_of_expertise}</p>}
                    {formData.projects_completed && <p><span className="font-medium">Projects:</span> {formData.projects_completed}</p>}
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-navy mb-3">Services</h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.services.map((service, index) => (
                      <span key={index} className="px-3 py-1 bg-orange/10 text-orange rounded-full text-sm">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {formData.documents.length > 0 && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-navy mb-3">Documents ({formData.documents.length})</h3>
                    <div className="space-y-1">
                      {formData.documents.map((file, index) => (
                        <p key={index} className="text-sm text-gray-700">{file.name}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                onClick={prevStep}
                className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft size={16} />
                BACK
              </button>
            )}
            
            {step < 5 ? (
              <button
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-3 bg-orange text-white rounded-lg hover:bg-orange-dark transition-colors ml-auto"
              >
                CONTINUE
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 bg-orange text-white rounded-lg hover:bg-orange-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
              >
                {loading ? 'SUBMITTING...' : 'SUBMIT APPLICATION'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
