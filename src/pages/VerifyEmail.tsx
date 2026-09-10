import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { authService } from '../lib/auth';
import { supabase } from '../lib/supabase';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get('email') || '';
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    console.log('[VerifyEmail] Component mounted');
    
    // Check if this is a Supabase auth callback (has hash parameters)
    const hash = window.location.hash;
    console.log('[VerifyEmail] Hash parameters:', hash);
    
    if (hash && hash.includes('access_token')) {
      console.log('[VerifyEmail] Detected Supabase auth callback');
      handleAuthCallback();
      return;
    }

    // If no email parameter and no auth callback, redirect to signin
    if (!email && !hash) {
      console.log('[VerifyEmail] No email or auth callback, redirecting to signin');
      navigate('/signin');
      return;
    }

    // Cooldown timer to prevent spam
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown, email, navigate]);

  // Handle Supabase auth callback from email verification
  const handleAuthCallback = async () => {
    setVerifying(true);
    console.log('[VerifyEmail] Processing auth callback...');
    
    try {
      // Supabase automatically processes the hash and establishes session
      // We just need to wait for the session to be ready
      const { data: { session }, error } = await supabase.auth.getSession();
      
      console.log('[VerifyEmail] Session check result:', { 
        hasSession: !!session, 
        error: error?.message 
      });
      
      if (error) {
        console.error('[VerifyEmail] Session error:', error);
        throw new Error(error.message || 'Failed to verify email');
      }
      
      if (session) {
        console.log('[VerifyEmail] ✓ Email verified successfully!');
        console.log('[VerifyEmail] User ID:', session.user.id);
        console.log('[VerifyEmail] Email confirmed at:', session.user.email_confirmed_at);
        
        setVerified(true);
        setSuccess(true);
        
        // Clear the hash from URL
        window.history.replaceState({}, document.title, window.location.pathname);
        
        // Redirect to signin after 2 seconds
        setTimeout(() => {
          console.log('[VerifyEmail] Redirecting to signin...');
          navigate('/signin', { 
            state: { message: 'Email verified successfully! Please sign in.' }
          });
        }, 2000);
      } else {
        throw new Error('No session established after verification');
      }
    } catch (err: any) {
      console.error('[VerifyEmail] Auth callback error:', err);
      setError(err.message || 'Failed to verify email. Please try again.');
      setVerifying(false);
    }
  };

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
            {/* Verification in progress */}
            {verifying && (
              <div className="text-center py-8">
                <Loader2 size={48} className="text-orange animate-spin mx-auto mb-4" />
                <h2 className="text-xl font-bold text-navy mb-2">Verifying Your Email...</h2>
                <p className="text-text-muted">Please wait while we confirm your email address.</p>
              </div>
            )}

            {/* Verification successful */}
            {verified && (
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="w-16 h-16 bg-green/10 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle size={32} className="text-green" />
                </motion.div>
                <h2 className="text-xl font-bold text-navy mb-2">Email Verified Successfully!</h2>
                <p className="text-text-muted mb-4">
                  Your email has been confirmed. Redirecting you to sign in...
                </p>
                <Loader2 size={20} className="text-orange animate-spin mx-auto" />
              </div>
            )}

            {/* Normal verification page (no auth callback) */}
            {!verifying && !verified && (
              <>
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

                  {success && !verified && (
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
              </>
            )}
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
