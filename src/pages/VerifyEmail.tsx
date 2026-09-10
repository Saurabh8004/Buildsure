import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { authService } from '../lib/auth';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get('email') || '';
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    // Redirect if no email provided
    if (!email) {
      navigate('/signin');
      return;
    }

    // Cooldown timer to prevent spam
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown, email, navigate]);

  const handleResend = async () => {
    if (cooldown > 0) return;

    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      await authService.resendVerification(email);
      setSuccess(true);
      setCooldown(60); // 60 second cooldown
    } catch (err: any) {
      console.error('[VerifyEmail] Resend error:', err);
      setError(err.message || 'Failed to resend verification email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-bg to-white flex flex-col">
      <div className="p-4 sm:p-6">
        <Link to="/signin" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-navy transition-colors">
          <ArrowLeft size={16} /> Back to Sign In
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 pb-12">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
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
            
            <div className="w-16 h-16 bg-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail size={32} className="text-orange" />
            </div>
            
            <h1 className="text-2xl font-bold text-navy tracking-tight">
              Verify Your Email
            </h1>
            <p className="mt-2 text-text-muted text-sm">
              We've sent a verification link to your email address.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 sm:p-8 border border-border shadow-sm"
          >
            <div className="text-center mb-6">
              <p className="text-sm text-text-muted mb-2">Verification email sent to:</p>
              <p className="text-base font-semibold text-navy">{email}</p>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-blue-600 shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-700">
                    <p className="font-medium mb-1">Check your inbox</p>
                    <p className="text-xs text-blue-600">
                      Click the verification link in the email to activate your account. The link will expire according to Supabase Auth settings.
                    </p>
                  </div>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
                >
                  <AlertCircle size={18} className="text-red-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3"
                >
                  <CheckCircle size={18} className="text-green-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-green-700">Verification email resent successfully!</p>
                </motion.div>
              )}

              <button
                onClick={handleResend}
                disabled={loading || cooldown > 0}
                className="w-full py-3 text-sm font-semibold text-navy border border-border rounded-xl hover:bg-bg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : cooldown > 0 ? (
                  <>
                    Resend Available in {cooldown}s
                  </>
                ) : (
                  <>
                    <Mail size={16} />
                    Resend Verification Email
                  </>
                )}
              </button>

              <div className="text-center pt-4 border-t border-border">
                <p className="text-xs text-text-muted mb-3">
                  Already verified your email?
                </p>
                <Link
                  to="/signin"
                  className="text-sm font-semibold text-orange hover:text-orange-dark transition-colors"
                >
                  Sign In to Your Account
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-center"
          >
            <p className="text-xs text-text-muted">
              Didn't receive the email? Check your spam folder or contact support.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
