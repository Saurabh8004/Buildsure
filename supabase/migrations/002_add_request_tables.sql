-- Phase 1: Add Financing and Inspection Request Tables
-- Migration: 002_add_request_tables.sql

-- ============================================
-- FINANCING REQUESTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS financing_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
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

-- Indexes for performance
CREATE INDEX idx_financing_requests_user_id ON financing_requests(user_id);
CREATE INDEX idx_financing_requests_status ON financing_requests(status);
CREATE INDEX idx_financing_requests_created_at ON financing_requests(created_at DESC);
CREATE INDEX idx_financing_requests_email ON financing_requests(email);

-- ============================================
-- INSPECTION REQUESTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS inspection_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
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
  assigned_inspector_id UUID REFERENCES users(id),
  inspection_report TEXT,
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_inspection_requests_user_id ON inspection_requests(user_id);
CREATE INDEX idx_inspection_requests_status ON inspection_requests(status);
CREATE INDEX idx_inspection_requests_created_at ON inspection_requests(created_at DESC);
CREATE INDEX idx_inspection_requests_email ON inspection_requests(email);
CREATE INDEX idx_inspection_requests_assigned_inspector ON inspection_requests(assigned_inspector_id);

-- ============================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================
ALTER TABLE financing_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE inspection_requests ENABLE ROW LEVEL SECURITY;

-- ============================================
-- FINANCING REQUESTS RLS POLICIES
-- ============================================

-- Users can view their own financing requests
CREATE POLICY "Users can view own financing requests"
  ON financing_requests
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can insert their own financing requests
CREATE POLICY "Users can insert own financing requests"
  ON financing_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own financing requests (only certain fields)
CREATE POLICY "Users can update own financing requests"
  ON financing_requests
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (
    auth.uid() = user_id AND
    -- Users can only update these fields, not status
    status = (SELECT status FROM financing_requests WHERE id = financing_requests.id)
  );

-- Admins can view all financing requests
CREATE POLICY "Admins can view all financing requests"
  ON financing_requests
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can update financing requests (including status)
CREATE POLICY "Admins can update financing requests"
  ON financing_requests
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================
-- INSPECTION REQUESTS RLS POLICIES
-- ============================================

-- Users can view their own inspection requests
CREATE POLICY "Users can view own inspection requests"
  ON inspection_requests
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can insert their own inspection requests
CREATE POLICY "Users can insert own inspection requests"
  ON inspection_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own inspection requests (only certain fields)
CREATE POLICY "Users can update own inspection requests"
  ON inspection_requests
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (
    auth.uid() = user_id AND
    -- Users can only update these fields, not status or assigned_inspector_id
    status = (SELECT status FROM inspection_requests WHERE id = inspection_requests.id) AND
    assigned_inspector_id IS NOT DISTINCT FROM (SELECT assigned_inspector_id FROM inspection_requests WHERE id = inspection_requests.id)
  );

-- Admins can view all inspection requests
CREATE POLICY "Admins can view all inspection requests"
  ON inspection_requests
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can update inspection requests (including status and inspector assignment)
CREATE POLICY "Admins can update inspection requests"
  ON inspection_requests
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Inspectors can view assigned inspection requests
CREATE POLICY "Inspectors can view assigned inspections"
  ON inspection_requests
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'inspector'
    ) AND assigned_inspector_id = auth.uid()
  );

-- Inspectors can update assigned inspection requests (but not status)
CREATE POLICY "Inspectors can update assigned inspections"
  ON inspection_requests
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'inspector'
    ) AND assigned_inspector_id = auth.uid()
  )
  WITH CHECK (
    -- Inspectors can update inspection_report but not status
    status = (SELECT status FROM inspection_requests WHERE id = inspection_requests.id)
  );

-- ============================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================
CREATE TRIGGER update_financing_requests_updated_at
  BEFORE UPDATE ON financing_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inspection_requests_updated_at
  BEFORE UPDATE ON inspection_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- AUDIT LOG ENTRIES
-- ============================================
-- Log table creation
INSERT INTO audit_logs (action, entity_type, metadata)
VALUES 
  ('TABLE_CREATED', 'financing_requests', '{"table": "financing_requests"}'::jsonb),
  ('TABLE_CREATED', 'inspection_requests', '{"table": "inspection_requests"}'::jsonb);
