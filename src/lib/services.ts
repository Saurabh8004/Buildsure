import { supabase, Project, Tender, Bid, Notification, User } from './supabase';

export const projectService = {
  async createProject(data: Omit<Project, 'id' | 'created_at' | 'updated_at'>) {
    const { data: project, error } = await supabase
      .from('projects')
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return project;
  },

  async getProject(id: string) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async getClientProjects(clientId: string) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getActiveProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .in('status', ['active', 'tender_created', 'bidding_open'])
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async updateProject(id: string, updates: Partial<Project>) {
    const { data, error } = await supabase
      .from('projects')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};

export const tenderService = {
  async createTender(data: Omit<Tender, 'id' | 'created_at' | 'updated_at'>) {
    const { data: tender, error } = await supabase
      .from('tenders')
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return tender;
  },

  async getTender(id: string) {
    const { data, error } = await supabase
      .from('tenders')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async getProjectTenders(projectId: string) {
    const { data, error } = await supabase
      .from('tenders')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getPublishedTenders() {
    const { data, error } = await supabase
      .from('tenders')
      .select(`
        *,
        projects:project_id (title, location, locality, area_sqft, budget_min, budget_max, project_type)
      `)
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async updateTender(id: string, updates: Partial<Tender>) {
    const { data, error } = await supabase
      .from('tenders')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};

export const bidService = {
  async createBid(data: Omit<Bid, 'id' | 'created_at' | 'updated_at' | 'version'>) {
    const { data: bid, error } = await supabase
      .from('bids')
      .insert({ ...data, version: 1 })
      .select()
      .single();

    if (error) throw error;
    return bid;
  },

  async submitBid(bidId: string) {
    const { data, error } = await supabase
      .from('bids')
      .update({
        status: 'submitted',
        submitted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', bidId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async lockBid(bidId: string) {
    const { data, error } = await supabase
      .from('bids')
      .update({
        status: 'locked',
        updated_at: new Date().toISOString(),
      })
      .eq('id', bidId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getContractorBids(contractorId: string) {
    const { data, error } = await supabase
      .from('bids')
      .select(`
        *,
        tenders:tender_id (title, deadline, status, projects:project_id (title, location))
      `)
      .eq('contractor_id', contractorId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getTenderBids(tenderId: string) {
    const { data, error } = await supabase
      .from('bids')
      .select(`
        *,
        users:contractor_id (full_name, email)
      `)
      .eq('tender_id', tenderId)
      .order('submitted_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getBid(id: string) {
    const { data, error } = await supabase
      .from('bids')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async shortlistBid(bidId: string) {
    const { data, error } = await supabase
      .from('bids')
      .update({
        status: 'shortlisted',
        updated_at: new Date().toISOString(),
      })
      .eq('id', bidId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async selectBid(bidId: string) {
    const { data, error } = await supabase
      .from('bids')
      .update({
        status: 'selected',
        updated_at: new Date().toISOString(),
      })
      .eq('id', bidId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};

export const notificationService = {
  async createNotification(data: Omit<Notification, 'id' | 'created_at' | 'read'>) {
    const { data: notification, error } = await supabase
      .from('notifications')
      .insert({ ...data, read: false })
      .select()
      .single();

    if (error) throw error;
    return notification;
  },

  async getUserNotifications(userId: string) {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) throw error;
    return data || [];
  },

  async markAsRead(notificationId: string) {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId);

    if (error) throw error;
  },

  async getUnreadCount(userId: string) {
    const { count, error } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('read', false);

    if (error) throw error;
    return count || 0;
  },
};

export const adminService = {
  async getAllUsers() {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getUserStats() {
    const [
      { count: totalUsers },
      { count: clients },
      { count: contractors },
      { count: professionals },
      { count: pendingVerification },
    ] = await Promise.all([
      supabase.from('users').select('*', { count: 'exact', head: true }),
      supabase.from('users').select('*', { count: 'exact', head: true }).eq('role', 'client'),
      supabase.from('users').select('*', { count: 'exact', head: true }).eq('role', 'contractor'),
      supabase.from('users').select('*', { count: 'exact', head: true }).in('role', ['architect', 'inspector']),
      supabase.from('users').select('*', { count: 'exact', head: true }).eq('verification_status', 'pending'),
    ]);

    return {
      totalUsers: totalUsers || 0,
      clients: clients || 0,
      contractors: contractors || 0,
      professionals: professionals || 0,
      pendingVerification: pendingVerification || 0,
    };
  },

  async getProjectStats() {
    const [
      { count: activeProjects },
      { count: activeTenders },
      { count: awardedProjects },
    ] = await Promise.all([
      supabase.from('projects').select('*', { count: 'exact', head: true }).in('status', ['active', 'tender_created', 'bidding_open']),
      supabase.from('tenders').select('*', { count: 'exact', head: true }).eq('status', 'published'),
      supabase.from('projects').select('*', { count: 'exact', head: true }).eq('status', 'awarded'),
    ]);

    return {
      activeProjects: activeProjects || 0,
      activeTenders: activeTenders || 0,
      awardedProjects: awardedProjects || 0,
    };
  },

  async getAuditLogs(limit = 100) {
    const { data, error } = await supabase
      .from('audit_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  async updateUserVerification(userId: string, status: User['verification_status'], notes?: string) {
    const { data, error } = await supabase
      .from('users')
      .update({
        verification_status: status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
