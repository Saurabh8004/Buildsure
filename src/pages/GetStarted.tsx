import { Link } from 'react-router-dom';
import { Users, HardHat, Ruler, Eye, ArrowRight, ArrowLeft } from 'lucide-react';

const roles = [
  {
    id: 'client',
    title: 'Client',
    subtitle: 'Property Owner',
    description: 'I want to build or renovate a property and need to find the right contractor.',
    icon: Users,
    color: 'bg-teal/10',
    iconColor: 'text-teal',
    borderColor: 'hover:border-teal',
  },
  {
    id: 'contractor',
    title: 'Contractor',
    subtitle: 'Builder / Constructor',
    description: 'I want to find construction projects and submit competitive bids.',
    icon: HardHat,
    color: 'bg-lime/20',
    iconColor: 'text-green-700',
    borderColor: 'hover:border-lime',
  },
  {
    id: 'professional',
    title: 'Architect / Engineer',
    subtitle: 'Design Professional',
    description: 'I want to offer professional services on construction projects.',
    icon: Ruler,
    color: 'bg-blue-100',
    iconColor: 'text-blue-600',
    borderColor: 'hover:border-blue-400',
  },
  {
    id: 'inspector',
    title: 'Quality Inspector',
    subtitle: 'QA Professional',
    description: 'I want to inspect construction projects and ensure quality standards.',
    icon: Eye,
    color: 'bg-amber-100',
    iconColor: 'text-amber-600',
    borderColor: 'hover:border-amber-400',
  },
];

export default function GetStarted() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-warm to-white flex flex-col">
      {/* Header */}
      <div className="p-4 sm:p-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-navy-light hover:text-teal transition-colors">
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 pb-12">
        <div className="w-full max-w-3xl">
          {/* Logo */}
          <div className="text-center mb-10">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-teal rounded-xl flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18" />
                  <path d="M5 21V7l7-4 7 4v14" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-navy tracking-tight">Build<span className="text-teal">Sure</span></span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight">How will you use BuildSure?</h1>
            <p className="mt-2 text-navy-light/70">Select your role to get started.</p>
          </div>

          {/* Role Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {roles.map((role) => (
              <Link
                key={role.id}
                to={`/signin?role=${role.id}`}
                className={`group bg-white rounded-2xl p-6 border-2 border-border-light ${role.borderColor} transition-all hover:shadow-lg hover:-translate-y-0.5`}
              >
                <div className={`w-12 h-12 ${role.color} rounded-xl flex items-center justify-center mb-4`}>
                  <role.icon size={22} className={role.iconColor} />
                </div>
                <h3 className="text-lg font-bold text-navy">{role.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{role.subtitle}</p>
                <p className="text-sm text-navy-light/70 mt-2 leading-relaxed">{role.description}</p>
                <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-teal opacity-0 group-hover:opacity-100 transition-opacity">
                  Continue <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>

          {/* Already have account */}
          <div className="text-center mt-10">
            <p className="text-sm text-gray-500">
              Already have an account?{' '}
              <Link to="/signin" className="font-semibold text-teal hover:underline">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
