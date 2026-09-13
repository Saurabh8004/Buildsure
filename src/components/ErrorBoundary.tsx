import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary] Application error:', error);
    console.error('[ErrorBoundary] Error details:', errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
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
              backgroundColor: '#FEE2E2',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px'
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            
            <h1 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#123B5D',
              marginBottom: '12px',
              textAlign: 'center'
            }}>
              Application Error
            </h1>
            
            <p style={{
              color: '#607D8B',
              marginBottom: '24px',
              textAlign: 'center',
              lineHeight: '1.6'
            }}>
              ConstructBid encountered an error while loading. This is usually caused by missing configuration.
            </p>

            {this.state.error && (
              <div style={{
                backgroundColor: '#FEF2F2',
                border: '1px solid #FECACA',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '24px'
              }}>
                <p style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#DC2626',
                  marginBottom: '8px'
                }}>
                  Error Message:
                </p>
                <p style={{
                  fontSize: '13px',
                  color: '#991B1B',
                  fontFamily: 'monospace',
                  wordBreak: 'break-word'
                }}>
                  {this.state.error.message}
                </p>
              </div>
            )}

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
                marginBottom: '8px'
              }}>
                Common Solutions:
              </p>
              <ul style={{
                fontSize: '13px',
                color: '#1E3A8A',
                lineHeight: '1.8',
                paddingLeft: '20px'
              }}>
                <li>Check that VITE_SUPABASE_URL is set in Vercel Environment Variables</li>
                <li>Check that VITE_SUPABASE_ANON_KEY is set in Vercel Environment Variables</li>
                <li>Verify the Supabase project URL is correct (should end with .supabase.co)</li>
                <li>Verify the anon key starts with "eyJ" or "sb_publishable_"</li>
                <li>Check browser console for detailed error messages</li>
              </ul>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button
                onClick={() => window.location.reload()}
                style={{
                  backgroundColor: '#F28C28',
                  color: 'white',
                  padding: '12px 32px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginRight: '12px'
                }}
              >
                Reload Page
              </button>
              <a
                href="/config-check"
                style={{
                  display: 'inline-block',
                  backgroundColor: 'white',
                  color: '#123B5D',
                  padding: '12px 32px',
                  borderRadius: '8px',
                  border: '2px solid #123B5D',
                  fontSize: '14px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  cursor: 'pointer'
                }}
              >
                Check Configuration
              </a>
            </div>

            {import.meta.env.MODE === 'development' && this.state.errorInfo && (
              <details style={{ marginTop: '24px' }}>
                <summary style={{
                  fontSize: '12px',
                  color: '#607D8B',
                  cursor: 'pointer',
                  marginBottom: '8px'
                }}>
                  Developer Details (Development Mode Only)
                </summary>
                <pre style={{
                  fontSize: '11px',
                  backgroundColor: '#F7F9FA',
                  padding: '12px',
                  borderRadius: '4px',
                  overflow: 'auto',
                  maxHeight: '300px',
                  color: '#263238'
                }}>
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
