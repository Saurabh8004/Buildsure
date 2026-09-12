import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Building2, MapPin, Calendar, DollarSign, User, Mail, Phone, FileText, CheckCircle, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

export default function ArchitectServices() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('projectId');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [project, setProject] = useState<any>(null);
  const [projectLoading, setProjectLoading] = useState(!!projectId);
  const [userProjects, setUserProjects] = useState<any[]>([]);
  const [showProjectSelection, setShowProjectSelection] = useState(false);
  
  const [formData, setFormData] = useState({
    serviceType: '',
    projectType: '',
    projectLocation: '',
    projectSize: '',
    projectDescription: '',
    timeline: '',
    budget: '',
    fullName: user?.full_name || '',
    email: user?.email || '',
    phone: '',
    preferredContact: 'email' as 'email' | 'phone' | 'whatsapp',
    existingDrawings: 'no' as 'yes' | 'no' | 'partial',
    additionalRequirements: '',
    projectId: projectId || '',
  });

  // Load project if projectId is provided
  useEffect(() => {
    if (projectId && user) {
      loadProject();
    }
  }, [projectId, user]);

  // Load user's projects for selection
  useEffect(() => {
    if (user && !projectId) {
      loadUserProjects();
    }
  }, [user, projectId]);

  // Auto-populate form with project data
  useEffect(() => {
    if (project) {
      setFormData(prev => ({
        ...prev,
        projectType: project.project_type || prev.projectType,
        projectLocation: project.location || prev.projectLocation,
        projectSize: project.area_sqft?.toString() || prev.projectSize,
        projectDescription: project.description || prev.projectDescription,
        budget: project.budget_max ? `${(project.budget_min / 100000).toFixed(0)}-${(project.budget_max / 100000).toFixed(0)} Lakhs` : prev.budget,
        projectId: project.id,
      }));
    }
  }, [project]);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.full_name || '',
        email: user.email || '',
      }));
    }
  }, [user]);

  const loadProject = async () => {
    if (!projectId || !user) return;
    
    setProjectLoading(true);
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .eq('client_id', user.id) // Ensure project belongs to authenticated client
        .single();

      if (error) {
        console.error('Error loading project:', error);
        setError('Project not found or you do not have access to this project.');
        setProjectLoading(false);
        return;
      }

      setProject(data);
      setProjectLoading(false);
    } catch (err) {
      console.error('Error loading project:', err);
      setError('Failed to load project details.');
      setProjectLoading(false);
    }
  };

  const loadUserProjects = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('client_id', user.id)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setUserProjects(data);
      }
    } catch (err) {
      console.error('Error loading projects:', err);
    }
  };

  const handleProjectSelect = (selectedProject: any) => {
    setProject(selectedProject);
    setFormData(prev => ({
      ...prev,
      projectId: selectedProject.id,
    }));
    setShowProjectSelection(false);
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!user) {
      setError('You must be logged in to submit a request');
      setLoading(false);
      return;
    }

    // Validate project ownership if projectId is provided
    if (formData.projectId && project && project.client_id !== user.id) {
      setError('You do not have access to this project.');
      setLoading(false);
      return;
    }

    try {
      const insertData: any = {
        client_id: user.id,
        service_type: formData.serviceType,
        project_type: formData.projectType,
        project_location: formData.projectLocation,
        project_size: formData.projectSize ? parseInt(formData.projectSize) : null,
        project_description: formData.projectDescription,
        timeline: formData.timeline || null,
        budget: formData.budget || null,
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        preferred_contact: formData.preferredContact,
        existing_drawings: formData.existingDrawings,
        additional_requirements: formData.additionalRequirements || null,
        status: 'submitted',
        request_source: formData.projectId ? 'project' : 'standalone',
      };

      // Add project_id if coming from a project
      if (formData.projectId) {
        insertData.project_id = formData.projectId;
      }

      const { data, error: insertError } = await supabase
        .from('architect_service_requests')
        .insert(insertData)
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

  if (projectLoading) {
    return (
      <div className="p-6 lg:p-8 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 size={40} className="text-orange animate-spin mx-auto mb-4" />
          <p className="text-text-muted">Loading project details...</p>
        </div>
      </div>
    );
  }

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
          
          {/* Show project info if linked */}
          {project && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4 text-left">
              <p className="text-sm text-blue-900">
                <span className="font-semibold">Project:</span> {project.title}
              </p>
            </div>
          )}
          
          {requestId && (
            <p className="text-sm text-text-muted mb-4">
              Request ID: <span className="font-mono font-semibold">{requestId}</span>
            </p>
          )}
          
          <p className="text-sm font-semibold text-green mb-2">Status: Submitted</p>
          <p className="text-text-muted mb-6">
            {project 
              ? "Your request is linked to this project. We'll review your requirements and connect you with suitable professionals."
              : "Thank you for submitting your service request. Our team will review your requirements and connect you with suitable architects/engineers."
            }
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
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                setSubmitted(false);
                setRequestId(null);
                setFormData({
                  serviceType: '',
                  projectType: '',
                  projectLocation: '',
                  projectSize: '',
                  projectDescription: '',
                  timeline: '',
                  budget: '',
                  fullName: user?.full_name || '',
                  email: user?.email || '',
                  phone: '',
                  preferredContact: 'email',
                  existingDrawings: 'no',
                  additionalRequirements: '',
                  projectId: projectId || '',
                });
              }}
              className="px-6 py-3 bg-orange text-white rounded-xl font-semibold hover:bg-orange-dark transition-colors"
            >
              Submit Another Request
            </button>
            {project && (
              <Link
                to={`/client/projects/${project.id}`}
                className="px-6 py-3 bg-navy text-white rounded-xl font-semibold hover:bg-navy-light transition-colors"
              >
                Back to Project
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  // Show project selection if no project and user has projects
  if (!projectId && userProjects.length > 0 && !showProjectSelection) {
    return (
      <div className="p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold text-navy mb-4">Architect / Engineer Assistance</h2>
            <p className="text-text-muted mb-6">
              You have existing projects. Would you like to request architect services for an existing project or start a new one?
            </p>
            
            <div className="space-y-4 mb-6">
              <button
                onClick={() => setShowProjectSelection(true)}
                className="w-full p-4 bg-blue-50 border border-blue-200 rounded-xl text-left hover:bg-blue-100 transition-colors"
              >
                <h3 className="font-semibold text-navy mb-2">Select Existing Project</h3>
                <p className="text-sm text-text-muted">Link this request to one of your existing projects</p>
              </button>
              
              <Link
                to="/client/projects/new"
                className="block w-full p-4 bg-orange-50 border border-orange-200 rounded-xl hover:bg-orange-100 transition-colors"
              >
                <h3 className="font-semibold text-navy mb-2">Start New Project</h3>
                <p className="text-sm text-text-muted">Create a new project first, then request architect services</p>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Show project selection modal
  if (showProjectSelection) {
    return (
      <div className="p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl border border-border p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-navy">Select Project</h2>
              <button
                onClick={() => setShowProjectSelection(false)}
                className="text-text-muted hover:text-navy transition-colors"
              >
                ← Back
              </button>
            </div>
            
            <div className="space-y-3">
              {userProjects.map((proj) => (
                <button
                  key={proj.id}
                  onClick={() => handleProjectSelect(proj)}
                  className="w-full p-4 bg-bg-alt border border-border rounded-xl text-left hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  <h3 className="font-semibold text-navy mb-1">{proj.title}</h3>
                  <p className="text-sm text-text-muted">
                    {proj.location} • {proj.project_type} • {proj.area_sqft} sq.ft.
                  </p>
                </button>
              ))}
            </div>
          </div>
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
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="text-text-muted hover:text-navy transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-bold text-navy">Architect / Engineer Services</h1>
        </div>
        <p className="text-text-muted mt-1">Request professional architectural and engineering services</p>
      </motion.div>

      {/* Project Context Banner */}
      {project && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4"
        >
          <div className="flex items-start gap-3">
            <Building2 size={20} className="text-blue-600 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-blue-900">
                Architect / Engineer assistance for:
              </p>
              <p className="text-base font-bold text-blue-900 mt-1">
                {project.title}
              </p>
              <p className="text-sm text-blue-700 mt-1">
                {project.location} • {project.project_type}
              </p>
            </div>
          </div>
        </motion.div>
      )}

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
                      <Users size={20} />
                      Submit Service Request
                    </>
                  )}
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
