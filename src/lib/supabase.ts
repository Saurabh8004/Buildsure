import { createClient } from '@supabase/supabase-js';

// Validate environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    '%c⚠️ BUILDSURE CONFIGURATION ERROR',
    'color: red; font-weight: bold; font-size: 16px;',
    '\n\nSupabase environment variables are not configured!',
    '\n\nPlease create a .env file in the project root with:',
    '\n\nVITE_SUPABASE_URL=https://your-project-id.supabase.co',
    '\nVITE_SUPABASE_ANON_KEY=your-anon-key-here',
    '\n\nGet these values from your Supabase project dashboard:',
    '\nhttps://app.supabase.com → Settings → API',
    '\n\nSee BACKEND_SETUP.md for detailed instructions.'
  );
}

// Validate URL format
if (supabaseUrl && !supabaseUrl.includes('.supabase.co')) {
  console.warn(
    '%c⚠️ Supabase URL may be invalid',
    'color: orange; font-weight: bold;',
    '\nURL should be in format: https://your-project-id.supabase.co',
    '\nCurrent URL:', supabaseUrl
  );
}

// Validate anon key format (should start with 'eyJ')
if (supabaseAnonKey && !supabaseAnonKey.startsWith('eyJ')) {
  console.warn(
    '%c⚠️ Supabase anon key may be invalid',
    'color: orange; font-weight: bold;',
    '\nAnon key should start with "eyJ" (JWT format)',
    '\nCurrent key starts with:', supabaseAnonKey.substring(0, 10)
  );
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || '',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  }
);

// Helper function to check if Supabase is configured with REAL credentials
export function isSupabaseConfigured(): boolean {
  if (!supabaseUrl || !supabaseAnonKey) return false;
  
  // Check for known placeholder values
  const placeholderUrls = [
    'https://your-project.supabase.co',
    'https://your-project-id.supabase.co',
  ];
  const placeholderKeys = [
    'your-anon-key',
    'your-anon-key-here',
    'your-anon-public-key-here',
  ];
  
  if (placeholderUrls.includes(supabaseUrl)) return false;
  if (placeholderKeys.includes(supabaseAnonKey)) return false;
  
  // Check for valid URL format
  if (!supabaseUrl.includes('.supabase.co')) return false;
  
  // Check for valid JWT format (anon keys start with eyJ)
  if (!supabaseAnonKey.startsWith('eyJ')) return false;
  
  return true;
}

// Get masked URL for display (never expose full URL in logs)
export function getMaskedConfig() {
  return {
    url: supabaseUrl ? `${supabaseUrl.substring(0, 25)}...` : 'NOT SET',
    key: supabaseAnonKey && supabaseAnonKey.startsWith('eyJ') 
      ? `${supabaseAnonKey.substring(0, 20)}...` 
      : supabaseAnonKey ? 'INVALID FORMAT' : 'NOT SET',
    isConfigured: isSupabaseConfigured(),
  };
}

// Type definitions
export interface User {
  id: string;
  email: string;
  full_name: string;
  mobile: string | null;
  role: 'client' | 'contractor' | 'architect' | 'inspector' | 'admin';
  account_status: 'active' | 'suspended' | 'pending_verification';
  verification_status: 'unverified' | 'pending' | 'verified' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface ClientProfile {
  id: string;
  user_id: string;
  city: string | null;
  project_preferences: string[] | null;
  budget_range_min: number | null;
  budget_range_max: number | null;
  created_at: string;
  updated_at: string;
}

export interface ContractorProfile {
  id: string;
  user_id: string;
  company_name: string | null;
  business_type: string | null;
  year_established: number | null;
  office_location: string | null;
  service_areas: string[] | null;
  specialization: string | null;
  project_types: string[] | null;
  years_of_experience: number | null;
  completed_projects: number | null;
  verification_status: 'pending' | 'under_review' | 'verified' | 'action_required' | 'rejected' | 'suspended';
  verification_submitted_at: string | null;
  verification_reviewed_at: string | null;
  verification_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  client_id: string;
  title: string;
  project_type: string;
  location: string;
  locality: string | null;
  area_sqft: number | null;
  budget_min: number | null;
  budget_max: number | null;
  description: string | null;
  status: 'draft' | 'active' | 'tender_created' | 'bidding_open' | 'bidding_closed' | 'evaluation' | 'awarded' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface Tender {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  deadline: string;
  status: 'draft' | 'under_review' | 'published' | 'closed' | 'evaluation' | 'awarded' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface Bid {
  id: string;
  tender_id: string;
  contractor_id: string;
  version: number;
  total_amount: number;
  timeline_months: number;
  warranty_years: number;
  inclusions: string | null;
  exclusions: string | null;
  notes: string | null;
  status: 'draft' | 'submitted' | 'locked' | 'shortlisted' | 'final_offer' | 'selected' | 'rejected';
  submitted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Document {
  id: string;
  user_id: string;
  entity_type: 'user' | 'project' | 'tender' | 'bid';
  entity_id: string;
  document_type: string;
  file_name: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  verification_status: 'pending' | 'verified' | 'rejected';
  uploaded_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  entity_type: string | null;
  entity_id: string | null;
  read: boolean;
  created_at: string;
}

export interface AuditLog {
  id: string;
  user_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  metadata: any;
  ip_address: string | null;
  created_at: string;
}
