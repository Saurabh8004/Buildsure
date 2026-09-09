import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Users, HardHat, Ruler, Eye } from 'lucide-react';

const roles = [
  {
    id: 'client',
    title: 'Client / Property Owner',
    desc: 'Post projects, receive bids and manage your build.',
    icon: Users,
    color: 'bg-orange/5 border-orange/20',
    iconColor: 'text-orange',
    cta: 'Post a Project',
  },
  {
    id: 'contractor',
    title: 'Contractor',
    desc: 'Find relevant projects and submit competitive bids.',
    icon: HardHat,
    color: 'bg-navy/5 border-navy/10',
    iconColor: 'text-navy',
    cta: 'Find Opportunities',
  },
  {
    id: 'architect',
    title: 'Architect / Engineer',
    desc: 'Offer design, planning and technical expertise.',
    icon: Ruler,
    color: 'bg-blue/5 border-blue/10',
    iconColor: 'text-blue',
    cta: 'Join Partnership',
  },
  {
    id: 'inspector',
    title: 'Quality Inspector',
    desc: 'Inspect projects and monitor construction quality.',
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
              <motion.div
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.3 }}
                className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18" />
                  <path d="M5 21V7l7-4 7 4v14" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </motion.div>
              <span className="text-2xl font-bold text-navy tracking-tight">Construct<span className="text-orange">Bid</span></span>
            </Link>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-3xl font-bold text-navy tracking-tight"
            >
              How will you use ConstructBid?
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-2 text-text-muted"
            >
              Select your role to get started.
            </motion.p>
          </div>

          {/* Role Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {roles.map((role, i) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={`/signin?role=${role.id}`}
                  className={`group p-6 rounded-2xl border ${role.color} bg-white hover:shadow-lg transition-all hover:-translate-y-0.5 block`}
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
              </motion.div>
            ))}
          </div>

          {/* Sign in link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8"
          >
            <p className="text-sm text-text-muted">
              Already have an account?{' '}
              <Link to="/signin" className="font-semibold text-blue hover:text-navy transition-colors">
                Sign In
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
