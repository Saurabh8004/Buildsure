import { supabase, isSupabaseConfigured } from './supabase';

type UserRole = 'client' | 'contractor' | 'architect' | 'inspector';

interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  mobile?: string;
  role: UserRole;
}

interface LoginData {
  email: string;
  password: string;
}

// Custom error class for better error handling
export class AuthError extends Error {
  code: string;
  details?: string;

  constructor(message: string, code: string, details?: string) {
    super(message);
    this.name = 'AuthError';
    this.code = code;
    this.details = details;
  }
}

  // Map Supabase errors to user-friendly messages
  function mapAuthError(error: any): AuthError {
    console.error('[Auth] Error details:', {
      message: error.message,
      status: error.status,
      name: error.name,
      code: error.code,
    });

    // Network/fetch errors
    if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
      return new AuthError(
        'Unable to connect to BuildSure servers. Please check your internet connection.',
        'NETWORK_ERROR',
        'Failed to fetch - Check if Supabase is configured and URL is correct'
      );
    }

    // Rate limit errors (429)
    if (error.status === 429) {
      return new AuthError(
        'Too many requests. Please wait a moment before trying again.',
        'RATE_LIMITED',
        'Rate limit exceeded - Wait before retrying'
      );
    }

    // Supabase-specific errors
    if (error.status === 400) {
      if (error.message?.includes('Invalid login credentials')) {
        return new AuthError('Invalid email or password.', 'INVALID_CREDENTIALS');
      }
      if (error.message?.includes('already registered')) {
        return new AuthError(
          'An account with this email already exists. Please sign in instead.',
          'EMAIL_EXISTS'
        );
      }
      if (error.message?.includes('Password')) {
        return new AuthError(
          'Password must be at least 6 characters long.',
          'WEAK_PASSWORD'
        );
      }
      if (error.message?.includes('Email not confirmed')) {
        return new AuthError(
          'Please verify your email address before signing in. Check your inbox for the verification link.',
          'EMAIL_NOT_CONFIRMED'
        );
      }
    }

    if (error.status === 401) {
      return new AuthError('Your session has expired. Please sign in again.', 'SESSION_EXPIRED');
    }

    if (error.status === 403) {
      return new AuthError('You do not have permission to perform this action.', 'PERMISSION_DENIED');
    }

    if (error.status === 404) {
      return new AuthError(
        'BuildSure services are temporarily unavailable. Please try again later.',
        'SERVICE_UNAVAILABLE',
        '404 - Check if Supabase project exists and is active'
      );
    }

    if (error.status >= 500) {
      return new AuthError(
        'BuildSure services are temporarily unavailable. Please try again later.',
        'SERVER_ERROR',
        'Server error: ' + error.status
      );
    }

    // Database/RLS errors
    if (error.code === '23505') {
      return new AuthError('This record already exists.', 'DUPLICATE_RECORD');
    }

    if (error.code === '23503') {
      return new AuthError('Related record not found. Please try again.', 'FOREIGN_KEY_VIOLATION');
    }
  if (error.code === 'PGRST301' || error.message?.includes('policy')) {
    return new AuthError(
      'Permission denied. Please contact support if this persists.',
      'RLS_POLICY_DENIED',
      error.message
    );
  }

  // Default error
  return new AuthError(
    error.message || 'An unexpected error occurred. Please try again.',
    'UNKNOWN_ERROR',
    error.stack
  );
}

export const authService = {
  /**
   * Check if Supabase is properly configured
   */
  checkConfiguration(): void {
    if (!isSupabaseConfigured()) {
      throw new AuthError(
        'BuildSure is not configured. Please set up Supabase environment variables.',
        'NOT_CONFIGURED',
        'VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set in .env file'
      );
    }
  },

  /**
   * Test Supabase connection
   */
  async testConnection(): Promise<boolean> {
    try {
      this.checkConfiguration();
      
      // Try to get current session (lightweight check)
      const { error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('[Auth] Connection test failed:', error);
        return false;
      }
      
      console.log('[Auth] ✓ Supabase connection successful');
      return true;
    } catch (error) {
      console.error('[Auth] Connection test error:', error);
      return false;
    }
  },

  /**
   * Register a new user
   */
  async register(data: RegisterData) {
    console.log('[Auth] Starting registration for:', data.email, 'role:', data.role);
    
    try {
      // Check configuration first
      this.checkConfiguration();

      const { email, password, fullName, mobile, role } = data;

      // Step 1: Create auth user
      console.log('[Auth] Step 1: Creating auth user...');
      
      // Use production URL for email redirect
      const redirectTo = window.location.origin.includes('vercel.app') 
        ? 'https://buildsure.vercel.app/verify-email'
        : `${window.location.origin}/verify-email`;
      
      console.log('[Auth] Email redirect URL:', redirectTo);
      
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // CRITICAL: Set redirect URL for email verification
          emailRedirectTo: redirectTo,
          data: {
            full_name: fullName,
            role: role,
          },
        },
      });

      if (authError) {
        console.error('[Auth] Auth signup error:', authError);
        
        // Handle existing unverified user
        if (authError.message?.includes('already registered') || authError.status === 400) {
          console.log('[Auth] User already exists, checking if unverified...');
          
          // Try to resend verification email for existing unverified user
          try {
            const { error: resendError } = await supabase.auth.resend({
              type: 'signup',
              email: email,
              options: {
                emailRedirectTo: redirectTo,
              },
            });
            
            if (resendError) {
              console.error('[Auth] Resend verification error:', resendError);
              throw new AuthError(
                'An account with this email already exists. If you haven\'t verified your email, please check your inbox or try signing in.',
                'EMAIL_EXISTS_UNVERIFIED'
              );
            }
            
            console.log('[Auth] ✓ Verification email resent for existing user');
            throw new AuthError(
              'An account with this email already exists. We\'ve resent the verification email. Please check your inbox.',
              'EMAIL_EXISTS_VERIFICATION_RESENT'
            );
          } catch (resendErr: any) {
            if (resendErr instanceof AuthError) {
              throw resendErr;
            }
            throw new AuthError(
              'An account with this email already exists. Please sign in instead.',
              'EMAIL_EXISTS'
            );
          }
        }
        
        throw mapAuthError(authError);
      }

      if (!authData.user) {
        throw new AuthError('Registration failed. Please try again.', 'REGISTRATION_FAILED');
      }

      console.log('[Auth] ✓ Auth user created:', authData.user.id);

      // CRITICAL: Check if session exists (email confirmation may be required)
      const emailConfirmationRequired = !authData.session;
      
      if (emailConfirmationRequired) {
        console.log('[Auth] ⚠ Email confirmation required - no session yet');
      } else {
        console.log('[Auth] ✓ Session created - user is authenticated');
      }

      // Step 2: Create user profile in users table
      console.log('[Auth] Step 2: Creating user profile...');
      const { error: userError } = await supabase
        .from('users')
        .upsert({
          id: authData.user.id,
          email,
          full_name: fullName,
          mobile: mobile || null,
          role,
          account_status: 'active',
          verification_status: role === 'client' ? 'unverified' : 'pending',
        });

      if (userError) {
        console.error('[Auth] User profile creation error:', userError);
        // Don't throw - the trigger might have already created it
      } else {
        console.log('[Auth] ✓ User profile created');
      }

      // Step 3: Create role-specific profile
      console.log('[Auth] Step 3: Creating role-specific profile...');
      try {
        await this.createRoleProfile(authData.user.id, role);
        console.log('[Auth] ✓ Role profile created');
      } catch (profileError: any) {
        console.error('[Auth] Role profile creation error:', profileError);
        // Don't throw - user can complete profile later
      }

      // Step 4: Log audit event
      console.log('[Auth] Step 4: Logging audit event...');
      try {
        await this.logAudit(authData.user.id, 'USER_REGISTERED', 'user', authData.user.id, { role });
        console.log('[Auth] ✓ Audit logged');
      } catch (auditError) {
        console.error('[Auth] Audit logging error:', auditError);
      }

      console.log('[Auth] ✓ Registration complete');
      
      return { 
        user: authData.user, 
        session: authData.session,
        emailConfirmationRequired 
      };
    } catch (error: any) {
      if (error instanceof AuthError) {
        throw error;
      }
      throw mapAuthError(error);
    }
  },

  /**
   * Create role-specific profile
   */
  async createRoleProfile(userId: string, role: UserRole) {
    switch (role) {
      case 'client':
        const { error: clientError } = await supabase
          .from('client_profiles')
          .upsert({ user_id: userId });
        if (clientError) throw clientError;
        break;

      case 'contractor':
        const { error: contractorError } = await supabase
          .from('contractor_profiles')
          .upsert({
            user_id: userId,
            verification_status: 'pending',
          });
        if (contractorError) throw contractorError;
        break;

      case 'architect':
      case 'inspector':
        // These would have their own profile tables in production
        break;
    }
  },

  /**
   * Login user
   */
  async login(data: LoginData) {
    console.log('[AUTH] Login started for:', data.email);
    
    try {
      // Check configuration first
      this.checkConfiguration();

      const { email, password } = data;

      console.log('[AUTH] Attempting signInWithPassword...');
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('[AUTH] Login error:', error);
        throw mapAuthError(error);
      }

      if (!authData.user) {
        console.error('[AUTH] Login failed - no user returned');
        throw new AuthError('Login failed. Please try again.', 'LOGIN_FAILED');
      }

      console.log('[AUTH] ✓ Login successful - user:', authData.user.id, 'session:', !!authData.session);

      // Log audit event
      try {
        await this.logAudit(authData.user.id, 'LOGIN_SUCCESS', 'user', authData.user.id);
      } catch (auditError) {
        console.error('[AUTH] Audit logging error:', auditError);
      }

      return { user: authData.user, session: authData.session };
    } catch (error: any) {
      console.error('[AUTH] Login exception:', error);
      if (error instanceof AuthError) {
        throw error;
      }
      throw mapAuthError(error);
    }
  },

  /**
   * Resend verification email
   */
  async resendVerification(email: string) {
    console.log('[Auth] Resending verification email for:', email);
    
    try {
      this.checkConfiguration();

      // Use production URL for email redirect
      const redirectTo = window.location.origin.includes('vercel.app') 
        ? 'https://buildsure.vercel.app/verify-email'
        : `${window.location.origin}/verify-email`;
      
      console.log('[Auth] Resend redirect URL:', redirectTo);

      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
        options: {
          emailRedirectTo: redirectTo,
        },
      });

      if (error) {
        console.error('[Auth] Resend verification error:', error);
        
        // Handle rate limiting
        if (error.status === 429) {
          throw new AuthError(
            'Too many verification requests. Please wait a moment before trying again.',
            'RESEND_RATE_LIMITED'
          );
        }
        
        throw mapAuthError(error);
      }

      console.log('[Auth] ✓ Verification email resent');
      return { success: true };
    } catch (error: any) {
      if (error instanceof AuthError) {
        throw error;
      }
      throw mapAuthError(error);
    }
  },

  /**
   * Logout user
   */
  async logout() {
    console.log('[Auth] Logging out...');
    const { error } = await supabase.auth.signOut();
    if (error) throw mapAuthError(error);
    console.log('[Auth] ✓ Logged out');
  },

  /**
   * Get current session
   */
  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw mapAuthError(error);
    return session;
  },

  /**
   * Get current user with profile
   */
  async getCurrentUser() {
    console.log('[AUTH] getCurrentUser() called');
    
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      console.log('[AUTH] getUser() result - user:', user?.email, 'error:', userError);
      
      if (userError) {
        console.error('[Auth] Get user error:', userError);
        throw mapAuthError(userError);
      }
      
      if (!user) {
        console.log('[AUTH] No authenticated user found');
        return null;
      }

      // Fetch user profile
      console.log('[AUTH] Fetching profile for user:', user.id);
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      console.log('[AUTH] Profile fetch result - profile:', !!profile, 'error:', profileError);

      // If profile doesn't exist, create it
      if (profileError || !profile) {
        console.log('[Auth] Profile not found, creating...');
        
        const role = (user.user_metadata?.role as UserRole) || 'client';
        const fullName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
        
        console.log('[AUTH] Creating profile with role:', role);
        const { data: newProfile, error: createError } = await supabase
          .from('users')
          .upsert({
            id: user.id,
            email: user.email || '',
            full_name: fullName,
            mobile: null,
            role,
            account_status: 'active',
            verification_status: role === 'client' ? 'unverified' : 'pending',
          })
          .select()
          .single();

        if (createError) {
          console.error('[Auth] Profile creation error:', createError);
          throw mapAuthError(createError);
        }

        console.log('[AUTH] Profile created successfully:', newProfile?.id);

        // Create role-specific profile
        try {
          await this.createRoleProfile(user.id, role);
        } catch (profileError) {
          console.error('[Auth] Role profile creation error:', profileError);
        }

        return {
          auth: user,
          profile: newProfile,
        };
      }

      console.log('[AUTH] Profile loaded successfully:', profile.role);
      return {
        auth: user,
        profile,
      };
    } catch (error: any) {
      console.error('[AUTH] getCurrentUser() error:', error);
      if (error instanceof AuthError) {
        throw error;
      }
      throw mapAuthError(error);
    }
  },

  /**
   * Request password reset
   */
  async resetPassword(email: string) {
    try {
      this.checkConfiguration();
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password',
      });
      
      if (error) throw mapAuthError(error);
    } catch (error: any) {
      if (error instanceof AuthError) {
        throw error;
      }
      throw mapAuthError(error);
    }
  },

  /**
   * Update password
   */
  async updatePassword(newPassword: string) {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      
      if (error) throw mapAuthError(error);
    } catch (error: any) {
      if (error instanceof AuthError) {
        throw error;
      }
      throw mapAuthError(error);
    }
  },

  /**
   * Log audit event
   */
  async logAudit(
    userId: string | null,
    action: string,
    entityType: string,
    entityId: string | null,
    metadata?: Record<string, any>
  ) {
    const { error } = await supabase.from('audit_logs').insert({
      user_id: userId,
      action,
      entity_type: entityType,
      entity_id: entityId,
      metadata: metadata || null,
    });

    if (error) {
      console.error('[Auth] Audit log error:', error);
      // Don't throw - audit logging shouldn't break the main flow
    }
  },
};
