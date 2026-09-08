import { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function SignIn() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, register } = useAuth();
  
  const role = searchParams.get('role') || '';
  const [isSignUp, setIsSignUp] = useState(!role ? false : true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    role: role,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        await register({
          email: form.email,
          password: form.password,
          fullName: form.name,
          mobile: form.mobile || undefined,
          role: form.role as any,
        });
      } else {
        await login(form.email, form.password);
      }
      
      // Redirect based on role
      const userRole = form.role || 'client';
      navigate(`/dashboard/${userRole}`);
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-bg to-white flex flex-col">
      <div className="p-4 sm:p-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-secondary transition-colors">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 pb-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
              <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18" />
                  <path d="M5 21V7l7-4 7 4v14" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-navy tracking-tight">Build<span className="text-orange">Sure</span></span>
            </Link>
            <h1 className="text-2xl font-bold text-navy tracking-tight">
              {isSignUp ? 'Create Your Account' : 'Welcome Back'}
            </h1>
            <p className="mt-2 text-text-muted text-sm">
              {isSignUp ? 'Join BuildSure to get started.' : 'Sign in to your BuildSure account.'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
              <AlertCircle size={18} className="text-red-600 shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 border border-border shadow-sm space-y-5">
            {(isSignUp || role) && (
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-text mb-2">Role</label>
                <select
                  id="role"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors bg-white"
                >
                  <option value="">Select your role</option>
                  <option value="client">Client</option>
                  <option value="contractor">Contractor</option>
                  <option value="architect">Architect / Engineer</option>
                  <option value="inspector">Quality Inspector</option>
                </select>
              </div>
            )}

            {isSignUp && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text mb-2">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required={isSignUp}
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                  placeholder="Your full name"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                placeholder="your@email.com"
              />
            </div>

            {isSignUp && (
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-text mb-2">Mobile Number</label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  required={isSignUp}
                  value={form.mobile}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
            )}

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-11 border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 text-base font-semibold text-white bg-orange hover:bg-orange-dark rounded-xl transition-all shadow-lg shadow-orange/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Sign In')}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-text-muted hover:text-secondary transition-colors"
              >
                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </button>
            </div>
          </form>

          {!role && (
            <div className="text-center mt-6">
              <Link to="/get-started" className="text-sm text-text-muted hover:text-secondary transition-colors">
                ← Choose a different role
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
