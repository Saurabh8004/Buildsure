import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, Check, Building2, FileText,
  DollarSign, Calendar, Palette, DollarSign as FinanceIcon, Eye, Save
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { projectService } from '../../lib/services';

export default function PostProject() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    title: '',
    project_type: '',
    property_type: '',
    location: '',
    locality: '',
    area_sqft: '',
    built_up_area: '',
    floors: '',
    
    // Step 2: Requirements
    description: '',
    scope_of_work: '',
    requirements: '',
    special_requirements: '',
    preferred_materials: '',
    quality_expectations: '',
    
    // Step 3: Budget
    budget_min: '',
    budget_max: '',
    budget_flexible: false,
    
    // Step 4: Timeline
    start_date: '',
    completion_date: '',
    duration_months: '',
    deadline_sensitivity: '',
    
    // Step 5: Design/BOQ
    has_architectural_drawings: '',
    has_structural_drawings: '',
    has_boq: '',
    has_site_survey: '',
    has_material_specs: '',
    
    // Step 6: Finance
    needs_finance: '',
    
    // Step 7: Review
    status: 'draft',
  });

  const totalSteps = 7;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSaveDraft = async () => {
    if (!user) return;
    
    setSaving(true);
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
      
      alert('Project saved as draft!');
      navigate('/client/projects');
    } catch (error) {
      console.error('Failed to save draft:', error);
      alert('Failed to save draft. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async () => {
    if (!user) return;
    
    setSaving(true);
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
      
      alert('Project submitted successfully! Your requirement will be reviewed and structured before being released for competitive bidding.');
      navigate('/client/projects');
    } catch (error) {
      console.error('Failed to submit project:', error);
      alert('Failed to submit project. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const stepTitles = [
    'Basic Information',
    'Requirements',
    'Budget',
    'Timeline',
    'Design / BOQ',
    'Finance',
    'Review & Submit'
  ];

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-navy">Post a New Project</h1>
        <p className="text-text-muted mt-1">Create your construction project requirement</p>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-2">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                s < step ? 'bg-green text-white' :
                s === step ? 'bg-orange text-white' :
                'bg-bg-alt text-text-muted'
              }`}>
                {s < step ? <Check size={20} /> : s}
              </div>
              {s < totalSteps && (
                <div className={`flex-1 h-1 mx-2 transition-colors ${
                  s < step ? 'bg-green' : 'bg-bg-alt'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-muted">Step {step} of {totalSteps}</span>
          <span className="font-medium text-navy">{stepTitles[step - 1]}</span>
        </div>
      </motion.div>

      {/* Form Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl border border-border p-6 lg:p-8"
      >
        <AnimatePresence mode="wait">
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Building2 size={24} className="text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-navy">Basic Information</h2>
                  <p className="text-sm text-text-muted">Tell us about your project basics</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-text mb-2">Project Name *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                    placeholder="e.g., Residential House Construction"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">Project Type *</label>
                  <select
                    name="project_type"
                    value={formData.project_type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                  >
                    <option value="">Select type</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="industrial">Industrial</option>
                    <option value="infrastructure">Infrastructure</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">Property Type</label>
                  <select
                    name="property_type"
                    value={formData.property_type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                  >
                    <option value="">Select property type</option>
                    <option value="new_construction">New Construction</option>
                    <option value="renovation">Renovation</option>
                    <option value="villa">Villa</option>
                    <option value="apartment">Apartment</option>
                    <option value="office">Office</option>
                    <option value="interior">Interior</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">Location (City) *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                    placeholder="e.g., Lucknow"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">Locality / Area</label>
                  <input
                    type="text"
                    name="locality"
                    value={formData.locality}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                    placeholder="e.g., Gomti Nagar"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">Plot Area (sq.ft.)</label>
                  <input
                    type="number"
                    name="area_sqft"
                    value={formData.area_sqft}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                    placeholder="e.g., 2400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">Built-up Area (sq.ft.)</label>
                  <input
                    type="number"
                    name="built_up_area"
                    value={formData.built_up_area}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                    placeholder="e.g., 1800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">Number of Floors</label>
                  <input
                    type="number"
                    name="floors"
                    value={formData.floors}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                    placeholder="e.g., 2"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Requirements */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <FileText size={24} className="text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-navy">Requirements</h2>
                  <p className="text-sm text-text-muted">What do you want to build?</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">Construction Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange resize-none"
                  placeholder="Describe your construction project in detail..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">Scope of Work</label>
                <textarea
                  name="scope_of_work"
                  value={formData.scope_of_work}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange resize-none"
                  placeholder="Define the scope of work..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">Specific Requirements</label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange resize-none"
                  placeholder="List any specific requirements..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">Special Requirements</label>
                <textarea
                  name="special_requirements"
                  value={formData.special_requirements}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange resize-none"
                  placeholder="Any special requirements or constraints..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">Preferred Materials</label>
                <input
                  type="text"
                  name="preferred_materials"
                  value={formData.preferred_materials}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                  placeholder="e.g., Premium bricks, AAC blocks, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">Quality Expectations</label>
                <textarea
                  name="quality_expectations"
                  value={formData.quality_expectations}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange resize-none"
                  placeholder="Describe your quality expectations..."
                />
              </div>
            </motion.div>
          )}

          {/* Step 3: Budget */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green/10 rounded-xl flex items-center justify-center">
                  <DollarSign size={24} className="text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-navy">Budget</h2>
                  <p className="text-sm text-text-muted">Define your project budget</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Minimum Budget (₹)</label>
                  <input
                    type="number"
                    name="budget_min"
                    value={formData.budget_min}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                    placeholder="e.g., 3500000"
                  />
                  <p className="text-xs text-text-muted mt-1">Enter amount in rupees</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">Maximum Budget (₹)</label>
                  <input
                    type="number"
                    name="budget_max"
                    value={formData.budget_max}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                    placeholder="e.g., 4500000"
                  />
                  <p className="text-xs text-text-muted mt-1">Enter amount in rupees</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-bg-alt rounded-xl">
                <input
                  type="checkbox"
                  name="budget_flexible"
                  checked={formData.budget_flexible}
                  onChange={handleChange}
                  className="w-5 h-5 text-orange border-border rounded focus:ring-orange"
                />
                <label className="text-sm font-medium text-text">
                  Budget is flexible and can be negotiated
                </label>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-sm text-blue-900">
                  💡 <strong>Tip:</strong> Providing a realistic budget range helps contractors provide accurate quotations. 
                  If you're unsure, you can select "Budget not finalized" and discuss with contractors later.
                </p>
              </div>
            </motion.div>
          )}

          {/* Step 4: Timeline */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Calendar size={24} className="text-orange" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-navy">Timeline</h2>
                  <p className="text-sm text-text-muted">Project timeline and deadlines</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Preferred Start Date</label>
                  <input
                    type="date"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">Expected Completion</label>
                  <input
                    type="date"
                    name="completion_date"
                    value={formData.completion_date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">Project Duration (months)</label>
                  <input
                    type="number"
                    name="duration_months"
                    value={formData.duration_months}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                    placeholder="e.g., 12"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">Deadline Sensitivity</label>
                  <select
                    name="deadline_sensitivity"
                    value={formData.deadline_sensitivity}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                  >
                    <option value="">Select sensitivity</option>
                    <option value="flexible">Flexible - Can be adjusted</option>
                    <option value="moderate">Moderate - Preferred timeline</option>
                    <option value="strict">Strict - Hard deadline</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 5: Design/BOQ */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Palette size={24} className="text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-navy">Design / BOQ</h2>
                  <p className="text-sm text-text-muted">Do you have design documents?</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { name: 'has_architectural_drawings', label: 'Architectural Drawings' },
                  { name: 'has_structural_drawings', label: 'Structural Drawings' },
                  { name: 'has_boq', label: 'Bill of Quantities (BOQ)' },
                  { name: 'has_site_survey', label: 'Site Survey' },
                  { name: 'has_material_specs', label: 'Material Specifications' },
                ].map((item) => (
                  <div key={item.name} className="p-4 bg-bg-alt rounded-xl">
                    <p className="text-sm font-medium text-text mb-3">Do you have {item.label}?</p>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={item.name}
                          value="yes"
                          checked={formData[item.name as keyof typeof formData] === 'yes'}
                          onChange={handleChange}
                          className="w-4 h-4 text-orange border-border focus:ring-orange"
                        />
                        <span className="text-sm text-text">Yes</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={item.name}
                          value="no"
                          checked={formData[item.name as keyof typeof formData] === 'no'}
                          onChange={handleChange}
                          className="w-4 h-4 text-orange border-border focus:ring-orange"
                        />
                        <span className="text-sm text-text">No</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={item.name}
                          value="need_assistance"
                          checked={formData[item.name as keyof typeof formData] === 'need_assistance'}
                          onChange={handleChange}
                          className="w-4 h-4 text-orange border-border focus:ring-orange"
                        />
                        <span className="text-sm text-text">Need Assistance</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-sm text-blue-900">
                  💡 <strong>Note:</strong> If you need assistance with architectural design, BOQ preparation, or other professional services, 
                  you can request these services from our Architect/Engineer network after posting your project.
                </p>
              </div>
            </motion.div>
          )}

          {/* Step 6: Finance */}
          {step === 6 && (
            <motion.div
              key="step6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green/10 rounded-xl flex items-center justify-center">
                  <DollarSign size={24} className="text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-navy">Finance Assistance</h2>
                  <p className="text-sm text-text-muted">Do you need construction finance?</p>
                </div>
              </div>

              <div className="p-4 bg-bg-alt rounded-xl">
                <p className="text-sm font-medium text-text mb-4">Do you need construction finance assistance?</p>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="needs_finance"
                      value="yes"
                      checked={formData.needs_finance === 'yes'}
                      onChange={handleChange}
                      className="w-4 h-4 text-orange border-border focus:ring-orange"
                    />
                    <span className="text-sm text-text">Yes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="needs_finance"
                      value="no"
                      checked={formData.needs_finance === 'no'}
                      onChange={handleChange}
                      className="w-4 h-4 text-orange border-border focus:ring-orange"
                    />
                    <span className="text-sm text-text">No</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="needs_finance"
                      value="not_sure"
                      checked={formData.needs_finance === 'not_sure'}
                      onChange={handleChange}
                      className="w-4 h-4 text-orange border-border focus:ring-orange"
                    />
                    <span className="text-sm text-text">Not Sure</span>
                  </label>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-sm text-blue-900">
                  💡 <strong>Note:</strong> If you need finance assistance, we can connect you with financing partners after your project is posted. 
                  This is a request/lead service - actual loan approval depends on the financing partner's criteria.
                </p>
              </div>
            </motion.div>
          )}

          {/* Step 7: Review */}
          {step === 7 && (
            <motion.div
              key="step7"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Eye size={24} className="text-orange" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-navy">Review & Submit</h2>
                  <p className="text-sm text-text-muted">Review your project details before submission</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-bg-alt rounded-xl">
                  <h3 className="font-semibold text-navy mb-3">Project Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-muted">Project Name:</span>
                      <span className="font-medium text-navy">{formData.title || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Project Type:</span>
                      <span className="font-medium text-navy capitalize">{formData.project_type || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Location:</span>
                      <span className="font-medium text-navy">{formData.location || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Area:</span>
                      <span className="font-medium text-navy">{formData.area_sqft ? `${formData.area_sqft} sq.ft.` : 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Budget:</span>
                      <span className="font-medium text-navy">
                        {formData.budget_min && formData.budget_max
                          ? `₹${(parseInt(formData.budget_min) / 100000).toFixed(1)}L - ₹${(parseInt(formData.budget_max) / 100000).toFixed(1)}L`
                          : 'Not specified'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl">
                  <p className="text-sm text-orange-900">
                    ⚠️ <strong>Important:</strong> Your requirement will be reviewed and structured before being released for competitive bidding. 
                    This ensures contractors receive clear and complete information.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-border">
          {step > 1 ? (
            <button
              onClick={prevStep}
              className="flex items-center gap-2 px-6 py-3 text-text border border-border rounded-xl hover:bg-bg-alt transition-colors"
            >
              <ArrowLeft size={20} />
              Previous
            </button>
          ) : (
            <div />
          )}

          <div className="flex gap-3">
            <button
              onClick={handleSaveDraft}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 text-text border border-border rounded-xl hover:bg-bg-alt transition-colors disabled:opacity-50"
            >
              <Save size={20} />
              Save Draft
            </button>

            {step < totalSteps ? (
              <button
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-3 bg-orange text-white rounded-xl hover:bg-orange-dark transition-colors"
              >
                Next
                <ArrowRight size={20} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-orange text-white rounded-xl hover:bg-orange-dark transition-colors disabled:opacity-50"
              >
                {saving ? 'Submitting...' : 'Submit Project'}
                <Check size={20} />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
