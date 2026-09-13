import { isSupabaseConfigured, getMaskedConfig } from '../lib/supabase';

export default function ConfigError() {
  const isConfigured = isSupabaseConfigured();
  const config = getMaskedConfig();

  if (isConfigured) {
    return null; // Configuration is OK, don't show error
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F7F9FA',
      padding: '20px',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      <div style={{
        maxWidth: '600px',
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '40px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        border: '1px solid #E2E8EC'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          backgroundColor: '#FEF3C7',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px'
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </div>
        
        <h1 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#123B5D',
          marginBottom: '12px',
          textAlign: 'center'
        }}>
          Configuration Required
        </h1>
        
        <p style={{
          color: '#607D8B',
          marginBottom: '24px',
          textAlign: 'center',
          lineHeight: '1.6'
        }}>
          ConstructBid requires Supabase configuration to run. Please set the following environment variables.
        </p>

        <div style={{
          backgroundColor: '#F7F9FA',
          border: '1px solid #E2E8EC',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '24px'
        }}>
          <p style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#123B5D',
            marginBottom: '12px'
          }}>
            Current Configuration Status:
          </p>
          
          <div style={{ marginBottom: '12px' }}>
            <p style={{
              fontSize: '13px',
              color: '#607D8B',
              marginBottom: '4px'
            }}>
              VITE_SUPABASE_URL:
            </p>
            <p style={{
              fontSize: '13px',
              fontFamily: 'monospace',
              color: config.url === 'NOT SET' ? '#DC2626' : '#059669',
              backgroundColor: config.url === 'NOT SET' ? '#FEE2E2' : '#D1FAE5',
              padding: '8px',
              borderRadius: '4px'
            }}>
              {config.url}
            </p>
          </div>

          <div>
            <p style={{
              fontSize: '13px',
              color: '#607D8B',
              marginBottom: '4px'
            }}>
              VITE_SUPABASE_ANON_KEY:
            </p>
            <p style={{
              fontSize: '13px',
              fontFamily: 'monospace',
              color: config.key === 'NOT SET' ? '#DC2626' : '#059669',
              backgroundColor: config.key === 'NOT SET' ? '#FEE2E2' : '#D1FAE5',
              padding: '8px',
              borderRadius: '4px'
            }}>
              {config.key}
            </p>
          </div>
        </div>

        <div style={{
          backgroundColor: '#EFF6FF',
          border: '1px solid #BFDBFE',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '24px'
        }}>
          <p style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#1E40AF',
            marginBottom: '12px'
          }}>
            How to Fix (Vercel):
          </p>
          <ol style={{
            fontSize: '13px',
            color: '#1E3A8A',
            lineHeight: '1.8',
            paddingLeft: '20px'
          }}>
            <li>Go to your Vercel project dashboard</li>
            <li>Navigate to Settings → Environment Variables</li>
            <li>Add VITE_SUPABASE_URL with your Supabase project URL</li>
            <li>Add VITE_SUPABASE_ANON_KEY with your Supabase anon/public key</li>
            <li>Redeploy the application</li>
          </ol>
        </div>

        <div style={{
          backgroundColor: '#F0FDF4',
          border: '1px solid #BBF7D0',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '24px'
        }}>
          <p style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#166534',
            marginBottom: '12px'
          }}>
            How to Fix (Local Development):
          </p>
          <ol style={{
            fontSize: '13px',
            color: '#14532D',
            lineHeight: '1.8',
            paddingLeft: '20px'
          }}>
            <li>Create a .env file in the project root</li>
            <li>Add: VITE_SUPABASE_URL=https://your-project.supabase.co</li>
            <li>Add: VITE_SUPABASE_ANON_KEY=your-anon-key</li>
            <li>Restart the development server</li>
          </ol>
        </div>

        <div style={{ textAlign: 'center' }}>
          <a
            href="https://supabase.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              backgroundColor: '#123B5D',
              color: 'white',
              padding: '12px 32px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              textDecoration: 'none',
              marginRight: '12px'
            }}
          >
            Open Supabase Dashboard
          </a>
          <a
            href="https://vercel.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              backgroundColor: 'white',
              color: '#123B5D',
              padding: '12px 32px',
              borderRadius: '8px',
              border: '2px solid #123B5D',
              fontSize: '14px',
              fontWeight: '600',
              textDecoration: 'none'
            }}
          >
            Open Vercel Dashboard
          </a>
        </div>

        <p style={{
          fontSize: '12px',
          color: '#90A4AE',
          marginTop: '24px',
          textAlign: 'center'
        }}>
          Get your Supabase credentials from: Settings → API in your Supabase project
        </p>
      </div>
    </div>
  );
}
