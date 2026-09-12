-- ============================================================================
-- COMPREHENSIVE DATABASE SCHEMA SYNC
-- This migration creates ALL required tables for ConstructBid
-- Safe to run multiple times - uses IF NOT EXISTS throughout
-- ============================================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- FUNCTION: Auto-update updated_at timestamp
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- TABLE: public.users (Application user profiles)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  mobile TEXT,
  role TEXT NOT NULL CHECK (role IN ('client', 'contractor', 'architect', 'inspector', 'admin')),
  account_status TEXT NOT NULL DEFAULT 'active' CHECK (account_status IN ('active', 'suspended', 'pending_verification')),
  verification_status TEXT NOT NULL DEFAULT 'unverified' CHECK (verification_status IN ('unverified', 'pending', 'verified', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);
CREATE INDEX IF NOT EXISTS idx_users_verification_status ON public.users(verification_status);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
DROP POLICY IF EXISTS "Admins can update all users" ON public.users;

-- Create RLS policies
CREATE POLICY "Users can view own profile"
  ON public.users FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id AND
    role = (SELECT role FROM public.users WHERE id = auth.uid()) AND
    verification_status = (SELECT verification_status FROM public.users WHERE id = auth.uid())
  );

CREATE POLICY "Users can insert own profile"
  ON public.users FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can view all users"
  ON public.users FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can update all users"
  ON public.users FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

-- Trigger for updated_at
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- TABLE: public.client_profiles
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.client_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  city TEXT,
  project_preferences TEXT[],
  budget_range_min INTEGER,
  budget_range_max INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_client_profiles_user_id ON public.client_profiles(user_id);

ALTER TABLE public.client_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own client profile" ON public.client_profiles;
DROP POLICY IF EXISTS "Users can update own client profile" ON public.client_profiles;
DROP POLICY IF EXISTS "Users can insert own client profile" ON public.client_profiles;

CREATE POLICY "Users can view own client profile"
  ON public.client_profiles FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own client profile"
  ON public.client_profiles FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own client profile"
  ON public.client_profiles FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP TRIGGER IF EXISTS update_client_profiles_updated_at ON public.client_profiles;
CREATE TRIGGER update_client_profiles_updated_at
  BEFORE UPDATE ON public.client_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- TABLE: public.contractor_profiles
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.contractor_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  company_name TEXT,
  business_type TEXT,
  year_established INTEGER,
  office_location TEXT,
  service_areas TEXT[],
  specialization TEXT,
  project_types TEXT[],
  years_of_experience INTEGER,
  completed_projects INTEGER DEFAULT 0,
  verification_status TEXT NOT NULL DEFAULT 'pending' CHECK (verification_status IN ('pending', 'under_review', 'verified', 'action_required', 'rejected', 'suspended')),
  verification_submitted_at TIMESTAMPTZ,
  verification_reviewed_at TIMESTAMPTZ,
  verification_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contractor_profiles_user_id ON public.contractor_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_contractor_profiles_verification ON public.contractor_profiles(verification_status);

ALTER TABLE public.contractor_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own contractor profile" ON public.contractor_profiles;
DROP POLICY IF EXISTS "Users can update own contractor profile" ON public.contractor_profiles;
DROP POLICY IF EXISTS "Users can insert own contractor profile" ON public.contractor_profiles;
DROP POLICY IF EXISTS "Public can view verified contractors" ON public.contractor_profiles;

CREATE POLICY "Users can view own contractor profile"
  ON public.contractor_profiles FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own contractor profile"
  ON public.contractor_profiles FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own contractor profile"
  ON public.contractor_profiles FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Public can view verified contractors"
  ON public.contractor_profiles FOR SELECT TO authenticated
  USING (verification_status = 'verified');

DROP TRIGGER IF EXISTS update_contractor_profiles_updated_at ON public.contractor_profiles;
CREATE TRIGGER update_contractor_profiles_updated_at
  BEFORE UPDATE ON public.contractor_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- TABLE: public.projects
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  project_type TEXT NOT NULL,
  location TEXT NOT NULL,
  locality TEXT,
  area_sqft INTEGER,
  budget_min INTEGER,
  budget_max INTEGER,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'tender_created', 'bidding_open', 'bidding_closed', 'evaluation', 'awarded', 'in_progress', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projects_client_id ON public.projects(client_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can insert own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can update own projects" ON public.projects;

CREATE POLICY "Users can view own projects"
  ON public.projects FOR SELECT TO authenticated
  USING (auth.uid() = client_id);

CREATE POLICY "Users can insert own projects"
  ON public.projects FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Users can update own projects"
  ON public.projects FOR UPDATE TO authenticated
  USING (auth.uid() = client_id);

DROP TRIGGER IF EXISTS update_projects_updated_at ON public.projects;
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- TABLE: public.tenders
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.tenders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  deadline TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'under_review', 'published', 'closed', 'evaluation', 'awarded', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tenders_project_id ON public.tenders(project_id);
CREATE INDEX IF NOT EXISTS idx_tenders_status ON public.tenders(status);
CREATE INDEX IF NOT EXISTS idx_tenders_deadline ON public.tenders(deadline);

ALTER TABLE public.tenders ENABLE ROW LEVEL SECURITY;

DROP TRIGGER IF EXISTS update_tenders_updated_at ON public.tenders;
CREATE TRIGGER update_tenders_updated_at
  BEFORE UPDATE ON public.tenders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- TABLE: public.bids
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.bids (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tender_id UUID NOT NULL REFERENCES public.tenders(id) ON DELETE CASCADE,
  contractor_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  version INTEGER NOT NULL DEFAULT 1,
  total_amount NUMERIC(15,2) NOT NULL,
  timeline_months INTEGER NOT NULL,
  warranty_years INTEGER NOT NULL DEFAULT 1,
  inclusions TEXT,
  exclusions TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'locked', 'shortlisted', 'final_offer', 'selected', 'rejected')),
  submitted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(tender_id, contractor_id, version)
);

CREATE INDEX IF NOT EXISTS idx_bids_tender_id ON public.bids(tender_id);
CREATE INDEX IF NOT EXISTS idx_bids_contractor_id ON public.bids(contractor_id);
CREATE INDEX IF NOT EXISTS idx_bids_status ON public.bids(status);

ALTER TABLE public.bids ENABLE ROW LEVEL SECURITY;

DROP TRIGGER IF EXISTS update_bids_updated_at ON public.bids;
CREATE TRIGGER update_bids_updated_at
  BEFORE UPDATE ON public.bids
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- TABLE: public.documents
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('user', 'project', 'tender', 'bid')),
  entity_id UUID NOT NULL,
  document_type TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  mime_type TEXT NOT NULL,
  verification_status TEXT NOT NULL DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_documents_user_id ON public.documents(user_id);
CREATE INDEX IF NOT EXISTS idx_documents_entity ON public.documents(entity_type, entity_id);

ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- TABLE: public.notifications
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON public.notifications(user_id, read);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own notifications" ON public.notifications;
DROP POLICY IF EXISTS "Users can update own notifications" ON public.notifications;

CREATE POLICY "Users can view own notifications"
  ON public.notifications FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
  ON public.notifications FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

-- ============================================================================
-- TABLE: public.audit_logs
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  metadata JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON public.audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON public.audit_logs(action);

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- TABLE: public.financing_requests
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.financing_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  financing_purpose TEXT NOT NULL CHECK (financing_purpose IN ('construction', 'renovation', 'commercial', 'working_capital', 'equipment', 'other')),
  applicant_type TEXT NOT NULL CHECK (applicant_type IN ('owner', 'contractor', 'business')),
  project_location TEXT NOT NULL,
  estimated_cost NUMERIC(15,2),
  financing_amount NUMERIC(15,2) NOT NULL,
  expected_start_date DATE,
  project_description TEXT,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  preferred_contact TEXT NOT NULL CHECK (preferred_contact IN ('email', 'phone')),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'under_review', 'information_requested', 'partner_connected', 'completed', 'rejected', 'cancelled')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_financing_requests_user_id ON public.financing_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_financing_requests_status ON public.financing_requests(status);

ALTER TABLE public.financing_requests ENABLE ROW LEVEL SECURITY;

DROP TRIGGER IF EXISTS update_financing_requests_updated_at ON public.financing_requests;
CREATE TRIGGER update_financing_requests_updated_at
  BEFORE UPDATE ON public.financing_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- TABLE: public.inspection_requests
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.inspection_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  project_name TEXT NOT NULL,
  project_location TEXT NOT NULL,
  inspection_type TEXT NOT NULL CHECK (inspection_type IN ('foundation', 'structure', 'quality', 'material', 'final', 'pre_purchase')),
  preferred_date DATE,
  project_stage TEXT NOT NULL CHECK (project_stage IN ('foundation', 'structure', 'brickwork', 'plumbing', 'electrical', 'finishing', 'completed')),
  special_requirements TEXT,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'scheduled', 'in_progress', 'completed', 'cancelled')),
  assigned_inspector_id UUID REFERENCES public.users(id),
  inspection_report TEXT,
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_inspection_requests_user_id ON public.inspection_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_inspection_requests_status ON public.inspection_requests(status);

ALTER TABLE public.inspection_requests ENABLE ROW LEVEL SECURITY;

DROP TRIGGER IF EXISTS update_inspection_requests_updated_at ON public.inspection_requests;
CREATE TRIGGER update_inspection_requests_updated_at
  BEFORE UPDATE ON public.inspection_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- REFRESH POSTGREST SCHEMA CACHE
-- ============================================================================
NOTIFY pgrst, 'reload schema';

-- ============================================================================
-- VERIFICATION
-- ============================================================================
DO $$
DECLARE
  users_count INTEGER;
  client_profiles_count INTEGER;
  contractor_profiles_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO users_count FROM public.users;
  SELECT COUNT(*) INTO client_profiles_count FROM public.client_profiles;
  SELECT COUNT(*) INTO contractor_profiles_count FROM public.contractor_profiles;
  
  RAISE NOTICE '✓ Database schema sync complete';
  RAISE NOTICE '✓ public.users: % rows', users_count;
  RAISE NOTICE '✓ public.client_profiles: % rows', client_profiles_count;
  RAISE NOTICE '✓ public.contractor_profiles: % rows', contractor_profiles_count;
  RAISE NOTICE '✓ PostgREST schema cache refreshed';
END $$;
