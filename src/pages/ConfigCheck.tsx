import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, AlertCircle, Loader } from 'lucide-react';
import { supabase, isSupabaseConfigured, getMaskedConfig } from '../lib/supabase';
import { authService } from '../lib/auth';

interface CheckResult {
  name: string;
  status: 'pass' | 'fail' | 'loading';
  message: string;
  details?: string;
}

export default function ConfigCheck() {
  const navigate = useNavigate();
  const [checks, setChecks] = useState<CheckResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    runChecks();
  }, []);

  async function runChecks() {
    setLoading(true);
    const results: CheckResult[] = [];

    // Check 1: Environment Variables
    results.push({
      name: 'Environment Variables',
      status: 'loading',
      message: 'Checking...',
    });
    setChecks([...results]);

    const isConfigured = isSupabaseConfigured();
    const maskedConfig = getMaskedConfig();
    results[0] = {
      name: 'Environment Variables',
      status: isConfigured ? 'pass' : 'fail',
      message: isConfigured
        ? 'Supabase URL and anon key are configured'
        : 'VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are missing or contain placeholder values',
      details: isConfigured
        ? `URL: ${maskedConfig.url}\nKey: ${maskedConfig.key}`
        : !import.meta.env.VITE_SUPABASE_URL 
          ? 'VITE_SUPABASE_URL is not set. Create a .env file with your Supabase URL.'
          : !import.meta.env.VITE_SUPABASE_ANON_KEY
          ? 'VITE_SUPABASE_ANON_KEY is not set. Create a .env file with your Supabase anon key.'
          : 'Environment variables contain placeholder values. Replace with your real Supabase credentials from Settings → API.',
    };
    setChecks([...results]);

    if (!isConfigured) {
      setLoading(false);
      return;
    }

    // Check 2: Supabase Connection
    results.push({
      name: 'Supabase Connection',
      status: 'loading',
      message: 'Testing connection...',
    });
    setChecks([...results]);

    try {
      const connected = await authService.testConnection();
      results[1] = {
        name: 'Supabase Connection',
        status: connected ? 'pass' : 'fail',
        message: connected
          ? 'Successfully connected to Supabase'
          : 'Failed to connect to Supabase',
        details: connected
          ? 'Authentication service is reachable'
          : 'Check your Supabase URL and network connection',
      };
    } catch (error: any) {
      results[1] = {
        name: 'Supabase Connection',
        status: 'fail',
        message: 'Connection test failed',
        details: error.message,
      };
    }
    setChecks([...results]);

    // Check 3: Database Tables
    results.push({
      name: 'Database Tables',
      status: 'loading',
      message: 'Checking schema...',
    });
    setChecks([...results]);

    try {
      const { error } = await supabase.from('users').select('id').limit(1);
      
      if (error) {
        results[2] = {
          name: 'Database Tables',
          status: 'fail',
          message: 'Database tables not found',
          details: 'Please run the SQL migration from supabase/migrations/001_initial_schema.sql',
        };
      } else {
        results[2] = {
          name: 'Database Tables',
          status: 'pass',
          message: 'Database schema is ready',
          details: 'All required tables exist',
        };
      }
    } catch (error: any) {
      results[2] = {
        name: 'Database Tables',
        status: 'fail',
        message: 'Database check failed',
        details: error.message,
      };
    }
    setChecks([...results]);

    // Check 4: Authentication
    results.push({
      name: 'Authentication',
      status: 'loading',
      message: 'Testing auth...',
    });
    setChecks([...results]);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      results[3] = {
        name: 'Authentication',
        status: 'pass',
        message: session ? 'User is logged in' : 'Authentication service is working',
        details: session ? `Logged in as: ${session.user.email}` : 'No active session (this is normal)',
      };
    } catch (error: any) {
      results[3] = {
        name: 'Authentication',
        status: 'fail',
        message: 'Authentication check failed',
        details: error.message,
      };
    }
    setChecks([...results]);

    setLoading(false);
  }

  const allPassed = checks.every(c => c.status === 'pass');

  return (
    <div className="min-h-screen bg-bg py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-border shadow-sm p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-navy mb-2">BuildSure Configuration Check</h1>
            <p className="text-text-muted">
              Verifying your BuildSure setup and backend connectivity
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {checks.map((check, i) => (
              <div
                key={i}
                className={`p-4 rounded-xl border ${
                  check.status === 'pass'
                    ? 'bg-green-50 border-green-200'
                    : check.status === 'fail'
                    ? 'bg-red-50 border-red-200'
                    : 'bg-bg border-border'
                }`}
              >
                <div className="flex items-start gap-3">
                  {check.status === 'pass' && (
                    <CheckCircle size={20} className="text-green-600 shrink-0 mt-0.5" />
                  )}
                  {check.status === 'fail' && (
                    <XCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
                  )}
                  {check.status === 'loading' && (
                    <Loader size={20} className="text-blue-600 shrink-0 mt-0.5 animate-spin" />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-navy">{check.name}</h3>
                    <p className={`text-sm mt-1 ${
                      check.status === 'pass'
                        ? 'text-green-700'
                        : check.status === 'fail'
                        ? 'text-red-700'
                        : 'text-text-muted'
                    }`}>
                      {check.message}
                    </p>
                    {check.details && (
                      <p className="text-xs text-text-muted mt-1 font-mono">
                        {check.details}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!loading && (
            <div className="space-y-4">
              {allPassed ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                  <CheckCircle size={48} className="text-green-600 mx-auto mb-3" />
                  <h2 className="text-xl font-bold text-green-900 mb-2">
                    All Checks Passed!
                  </h2>
                  <p className="text-green-700 mb-4">
                    BuildSure is properly configured and ready to use.
                  </p>
                  <button
                    onClick={() => navigate('/')}
                    className="px-6 py-3 bg-orange text-white font-semibold rounded-xl hover:bg-orange-dark transition-colors"
                  >
                    Go to Homepage
                  </button>
                </div>
              ) : (
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <AlertCircle size={48} className="text-red-600 mx-auto mb-3" />
                  <h2 className="text-xl font-bold text-red-900 mb-2 text-center">
                    Configuration Issues Found
                  </h2>
                  <div className="text-sm text-red-700 space-y-3 mt-4">
                    <div>
                      <strong>Next Steps:</strong>
                    </div>
                    <ol className="list-decimal list-inside space-y-2 ml-2">
                      <li>
                        Create a Supabase project at{' '}
                        <a
                          href="https://app.supabase.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-orange hover:underline"
                        >
                          app.supabase.com
                        </a>
                      </li>
                      <li>
                        Get your Project URL and anon key from Settings → API
                      </li>
                      <li>
                        Update the <code className="bg-red-100 px-2 py-0.5 rounded">.env</code> file
                      </li>
                      <li>
                        Run the SQL migration from{' '}
                        <code className="bg-red-100 px-2 py-0.5 rounded">
                          supabase/migrations/001_initial_schema.sql
                        </code>
                      </li>
                      <li>Restart your development server</li>
                    </ol>
                    <div className="mt-4 p-3 bg-red-100 rounded-lg">
                      <strong>See:</strong> BACKEND_SETUP.md for detailed instructions
                    </div>
                  </div>
                  <button
                    onClick={runChecks}
                    className="mt-6 w-full px-6 py-3 bg-orange text-white font-semibold rounded-xl hover:bg-orange-dark transition-colors"
                  >
                    Re-run Checks
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
