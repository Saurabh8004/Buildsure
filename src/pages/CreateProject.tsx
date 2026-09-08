import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { projectService } from '../lib/services';
import { ArrowLeft, ArrowRight, Save, CheckCircle } from 'lucide-react';

export default function CreateProject() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    project_type: '',
    location: '',
    locality: '',
    area_sqft: '',
    budget_min: '',
    budget_max: '',
    description: '',
    timeline: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveDraft = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await projectService.createProject({
        client_id: user.id,
        title: formData.title || 'Untitled Project',
        project_type: formData.project_type || 'residential',
        location: formData.location || 'Not specified',
        locality: formData.locality || null,
        area_sqft: formData.area_sqft ? parseInt(formData.area_sqft) : null,
        budget_min: formData.budget_min ? parseInt(formData.budget_min) : null,
        budget_max: formData.budget_max ? parseInt(formData.budget_max) : null,
        description: formData.description || null,
        status: 'draft',
      });
      navigate('/dashboard/client');
    } catch (error) {
      console.error('Failed to save draft:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await projectService.createProject({
        client_id: user.id,
        title: formData.title,
        project_type: formData.project_type,
        location: formData.location,
        locality: formData.locality || null,
        area_sqft: formData.area_sqft ? parseInt(formData.area_sqft) : null,
        budget_min: formData.budget_min ? parseInt(formData.budget_min) : null,
        budget_max: formData.budget_max ? parseInt(formData.budget_max) : null,
        description: formData.description || null,
        status: 'active',
      });
      navigate('/dashboard/client');
    } catch (error) {
      console.error('Failed to submit project:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard/client')}
            className="flex items-center gap-2 text-sm text-text-muted hover:text-navy transition-colors mb-4"
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-navy">Create New Project</h1>
          <p className="text-text-muted mt-1">Tell us about your construction project</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step >= s ? 'bg-orange text-white' : 'bg-bg-alt text-text-muted'
                  }`}
                >
                  {step > s ? <CheckCircle size={16} /> : s}
                </div>
                {s < 3 && (
                  <div className={`w-24 sm:w-32 h-1 mx-2 ${step > s ? 'bg-orange' : 'bg-bg-alt'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-text-muted">
            <span>Project Basics</span>
            <span>Scope & Budget</span>
            <span>Review</span>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl border border-border p-6 sm:p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-text mb-2">
                  Project Name *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                  placeholder="e.g., Residential House Construction"
                  required
                />
              </div>

              <div>
                <label htmlFor="project_type" className="block text-sm font-medium text-text mb-2">
                  Project Type *
                </label>
                <select
                  id="project_type"
                  name="project_type"
                  value={formData.project_type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                  required
                >
                  <option value="">Select project type</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="renovation">Renovation</option>
                  <option value="industrial">Industrial</option>
                </select>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-text mb-2">
                    City / Location *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                    placeholder="e.g., Lucknow"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="locality" className="block text-sm font-medium text-text mb-2">
                    Locality / Area
                  </label>
                  <input
                    type="text"
                    id="locality"
                    name="locality"
                    value={formData.locality}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                    placeholder="e.g., Gomti Nagar"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={nextStep}
                  disabled={!formData.title || !formData.project_type || !formData.location}
                  className="flex items-center gap-2 px-6 py-3 bg-orange text-white font-semibold rounded-xl hover:bg-orange-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label htmlFor="area_sqft" className="block text-sm font-medium text-text mb-2">
                  Site Area (sq.ft.)
                </label>
                <input
                  type="number"
                  id="area_sqft"
                  name="area_sqft"
                  value={formData.area_sqft}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                  placeholder="e.g., 2400"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="budget_min" className="block text-sm font-medium text-text mb-2">
                    Budget Range - Minimum (₹)
                  </label>
                  <input
                    type="number"
                    id="budget_min"
                    name="budget_min"
                    value={formData.budget_min}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                    placeholder="e.g., 3500000"
                  />
                </div>
                <div>
                  <label htmlFor="budget_max" className="block text-sm font-medium text-text mb-2">
                    Budget Range - Maximum (₹)
                  </label>
                  <input
                    type="number"
                    id="budget_max"
                    name="budget_max"
                    value={formData.budget_max}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                    placeholder="e.g., 4500000"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="timeline" className="block text-sm font-medium text-text mb-2">
                  Expected Timeline (months)
                </label>
                <input
                  type="number"
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                  placeholder="e.g., 12"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-text mb-2">
                  Project Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange resize-none"
                  placeholder="Describe your project requirements, specifications, and any special considerations..."
                />
              </div>

              <div className="flex justify-between">
                <button
                  onClick={prevStep}
                  className="flex items-center gap-2 px-6 py-3 border border-border text-text font-semibold rounded-xl hover:bg-bg transition-colors"
                >
                  <ArrowLeft size={16} /> Previous
                </button>
                <button
                  onClick={nextStep}
                  className="flex items-center gap-2 px-6 py-3 bg-orange text-white font-semibold rounded-xl hover:bg-orange-dark transition-colors"
                >
                  Next <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-navy">Review Your Project</h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-bg rounded-xl">
                  <p className="text-xs text-text-muted mb-1">Project Name</p>
                  <p className="font-semibold text-navy">{formData.title || 'Not specified'}</p>
                </div>

                <div className="p-4 bg-bg rounded-xl">
                  <p className="text-xs text-text-muted mb-1">Project Type</p>
                  <p className="font-semibold text-navy capitalize">{formData.project_type || 'Not specified'}</p>
                </div>

                <div className="p-4 bg-bg rounded-xl">
                  <p className="text-xs text-text-muted mb-1">Location</p>
                  <p className="font-semibold text-navy">
                    {formData.location}{formData.locality ? `, ${formData.locality}` : ''}
                  </p>
                </div>

                {formData.area_sqft && (
                  <div className="p-4 bg-bg rounded-xl">
                    <p className="text-xs text-text-muted mb-1">Site Area</p>
                    <p className="font-semibold text-navy">{formData.area_sqft} sq.ft.</p>
                  </div>
                )}

                {(formData.budget_min || formData.budget_max) && (
                  <div className="p-4 bg-bg rounded-xl">
                    <p className="text-xs text-text-muted mb-1">Budget Range</p>
                    <p className="font-semibold text-navy">
                      {formData.budget_min && `₹${parseInt(formData.budget_min).toLocaleString('en-IN')}`}
                      {formData.budget_min && formData.budget_max && ' - '}
                      {formData.budget_max && `₹${parseInt(formData.budget_max).toLocaleString('en-IN')}`}
                    </p>
                  </div>
                )}

                {formData.description && (
                  <div className="p-4 bg-bg rounded-xl">
                    <p className="text-xs text-text-muted mb-1">Description</p>
                    <p className="text-text">{formData.description}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={prevStep}
                  className="flex items-center gap-2 px-6 py-3 border border-border text-text font-semibold rounded-xl hover:bg-bg transition-colors"
                >
                  <ArrowLeft size={16} /> Previous
                </button>
                <div className="flex gap-3">
                  <button
                    onClick={handleSaveDraft}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 border border-border text-text font-semibold rounded-xl hover:bg-bg transition-colors disabled:opacity-50"
                  >
                    <Save size={16} /> Save Draft
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 bg-orange text-white font-semibold rounded-xl hover:bg-orange-dark transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Submitting...' : 'Submit Project'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
