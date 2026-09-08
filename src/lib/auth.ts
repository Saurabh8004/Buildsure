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

    const { error: userError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email,
        full_name: fullName,
        mobile: mobile || null,
        role,
        account_status: 'active',
        verification_status: role === 'client' ? 'unverified' : 'pending',
      });

    if (userError) throw userError;

    await this.createRoleProfile(authData.user.id, role);
    await this.logAudit(authData.user.id, 'USER_REGISTERED', 'user', authData.user.id, { role });

    return { user: authData.user };
  },

  async createRoleProfile(userId: string, role: UserRole) {
    switch (role) {
      case 'client':
        await supabase.from('client_profiles').insert({ user_id: userId });
        break;
      case 'contractor':
        await supabase.from('contractor_profiles').insert({
          user_id: userId,
          verification_status: 'pending',
        });
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

    await this.logAudit(authData.user.id, 'LOGIN_SUCCESS', 'user', authData.user.id);

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

    const { data: profile, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error || !profile) return null;

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
