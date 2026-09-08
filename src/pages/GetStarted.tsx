import { Link } from 'react-router-dom';
import { ArrowRight, Users, HardHat, Ruler, Eye } from 'lucide-react';

const roles = [
  {
    id: 'client',
    title: 'Client',
    desc: 'I want to post a construction project and find contractors.',
    icon: Users,
    color: 'bg-orange/5 border-orange/20',
    iconColor: 'text-orange',
    cta: 'Post a Project',
  },
  {
    id: 'contractor',
    title: 'Contractor',
    desc: 'I want to find projects and submit competitive bids.',
    icon: HardHat,
    color: 'bg-navy/5 border-navy/10',
    iconColor: 'text-navy',
    cta: 'Find Opportunities',
  },
  {
    id: 'professional',
    title: 'Architect / Engineer',
    desc: 'I want to offer professional construction services.',
    icon: Ruler,
    color: 'bg-blue/5 border-blue/10',
    iconColor: 'text-blue',
    cta: 'Join Partnership',
  },
  {
    id: 'inspector',
    title: 'Quality Inspector',
    desc: 'I want to inspect and monitor construction quality.',
    icon: Eye,
    color: 'bg-teal/5 border-teal/10',
    iconColor: 'text-teal',
    cta: 'Join as Inspector',
  },
];

export default function GetStarted() {
  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Header */}
      <div className="p-4 sm:p-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-navy transition-colors">
          ← Back to Home
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 pb-12">
        <div className="w-full max-w-3xl">
          {/* Logo */}
          <div className="text-center mb-10">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
              <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18" />
                  <path d="M5 21V7l7-4 7 4v14" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-navy tracking-tight">Build<span className="text-teal">Sure</span></span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight">How will you use BuildSure?</h1>
            <p className="mt-2 text-text-muted">Select your role to get started.</p>
          </div>

          {/* Role Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {roles.map((role) => (
              <Link
                key={role.id}
                to={`/signin?role=${role.id}`}
                className={`group p-6 rounded-2xl border ${role.color} bg-white hover:shadow-lg transition-all hover:-translate-y-0.5`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${role.iconColor} bg-bg`}>
                  <role.icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-navy">{role.title}</h3>
                <p className="mt-1 text-sm text-text-muted">{role.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-orange group-hover:gap-2 transition-all">
                  {role.cta} <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>

          {/* Sign in link */}
          <div className="text-center mt-8">
            <p className="text-sm text-text-muted">
              Already have an account?{' '}
              <Link to="/signin" className="font-semibold text-blue hover:text-navy transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
