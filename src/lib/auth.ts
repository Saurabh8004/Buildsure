import { supabase, User } from './supabase';

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

export const authService = {
  async register(data: RegisterData) {
    const { email, password, fullName, mobile, role } = data;

    // Step 1: Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role,
        },
      },
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('Registration failed');

    // Step 2: Create user profile in users table
    // Note: This might also be handled by the database trigger, but we ensure it exists
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
      console.error('Error creating user profile:', userError);
      // Don't throw here - the trigger might have already created it
    }

    // Step 3: Create role-specific profile
    try {
      await this.createRoleProfile(authData.user.id, role);
    } catch (profileError) {
      console.error('Error creating role profile:', profileError);
      // Don't throw - user can complete profile later
    }

    // Step 4: Log audit event
    try {
      await this.logAudit(authData.user.id, 'USER_REGISTERED', 'user', authData.user.id, { role });
    } catch (auditError) {
      console.error('Error logging audit:', auditError);
    }

    return { user: authData.user };
  },

  async createRoleProfile(userId: string, role: UserRole) {
    switch (role) {
      case 'client':
        await supabase.from('client_profiles').upsert({ user_id: userId });
        break;
      case 'contractor':
        await supabase.from('contractor_profiles').upsert({
          user_id: userId,
          verification_status: 'pending',
        });
        break;
      case 'architect':
      case 'inspector':
        // These would have their own profile tables in production
        break;
    }
  },

  async login(data: LoginData) {
    const { email, password } = data;

    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    if (!authData.user) throw new Error('Login failed');

    // Log audit event
    try {
      await this.logAudit(authData.user.id, 'LOGIN_SUCCESS', 'user', authData.user.id);
    } catch (auditError) {
      console.error('Error logging audit:', auditError);
    }

    return { user: authData.user, session: authData.session };
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getSession() {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  },

  async getCurrentUser(): Promise<{ auth: any; profile: User } | null> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;

    // Fetch user profile
    const { data: profile, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    // If profile doesn't exist, create it (for users created before trigger was added)
    if (error || !profile) {
      console.log('Profile not found, creating...');
      
      const role = (user.user_metadata?.role as UserRole) || 'client';
      const fullName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
      
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
        console.error('Error creating profile:', createError);
        return null;
      }

      // Create role-specific profile
      try {
        await this.createRoleProfile(user.id, role);
      } catch (profileError) {
        console.error('Error creating role profile:', profileError);
      }

      return {
        auth: user,
        profile: newProfile as User,
      };
    }

    return {
      auth: user,
      profile: profile as User,
    };
  },

  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
  },

  async updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) throw error;
  },

  async logAudit(
    userId: string | null,
    action: string,
    entityType: string,
    entityId: string | null,
    metadata?: Record<string, any>
  ) {
    await supabase.from('audit_logs').insert({
      user_id: userId,
      action,
      entity_type: entityType,
      entity_id: entityId,
      metadata: metadata || null,
    });
  },
};
