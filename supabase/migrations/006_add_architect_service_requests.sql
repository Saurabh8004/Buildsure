-- ============================================================================
-- MIGRATION: Add architect_service_requests table
-- Purpose: Store client requests for architect/engineer services
-- ============================================================================

-- ============================================================================
-- TABLE: architect_service_requests
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.architect_service_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  service_type TEXT NOT NULL CHECK (service_type IN (
    'architectural_design',
    'structural_design',
    'boq_preparation',
    'tender_preparation',
    'site_supervision',
    'consultation',
    'complete_package'
  )),
  project_type TEXT NOT NULL CHECK (project_type IN (
    'residential',
    'apartment',
    'commercial',
    'industrial',
    'renovation',
    'interior'
  )),
  project_location TEXT NOT NULL,
  project_size INTEGER,
  project_description TEXT NOT NULL,
  timeline TEXT,
  budget TEXT,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  preferred_contact TEXT NOT NULL CHECK (preferred_contact IN ('email', 'phone', 'whatsapp')),
  existing_drawings TEXT NOT NULL CHECK (existing_drawings IN ('yes', 'no', 'partial')),
  additional_requirements TEXT,
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN (
    'submitted',
    'under_review',
    'matched',
    'proposals_received',
    'client_selected',
    'in_progress',
    'completed',
    'cancelled'
  )),
  assigned_architect_id UUID REFERENCES users(id),
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_architect_service_requests_client_id ON public.architect_service_requests(client_id);
CREATE INDEX IF NOT EXISTS idx_architect_service_requests_status ON public.architect_service_requests(status);
CREATE INDEX IF NOT EXISTS idx_architect_service_requests_assigned_architect ON public.architect_service_requests(assigned_architect_id);
CREATE INDEX IF NOT EXISTS idx_architect_service_requests_created_at ON public.architect_service_requests(created_at DESC);

-- Enable RLS
ALTER TABLE public.architect_service_requests ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- RLS POLICIES
-- ============================================================================

-- Clients can create their own requests
DROP POLICY IF EXISTS "Clients can create own architect service requests" ON public.architect_service_requests;
CREATE POLICY "Clients can create own architect service requests"
  ON public.architect_service_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'client'
    )
    AND client_id = auth.uid()
  );

-- Clients can view their own requests
DROP POLICY IF EXISTS "Clients can view own architect service requests" ON public.architect_service_requests;
CREATE POLICY "Clients can view own architect service requests"
  ON public.architect_service_requests
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'client'
    )
    AND client_id = auth.uid()
  );

-- Clients can update their own requests (only certain fields)
DROP POLICY IF EXISTS "Clients can update own architect service requests" ON public.architect_service_requests;
CREATE POLICY "Clients can update own architect service requests"
  ON public.architect_service_requests
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'client'
    )
    AND client_id = auth.uid()
  )
  WITH CHECK (
    -- Clients cannot change status or assigned_architect_id
    status = (SELECT status FROM public.architect_service_requests WHERE id = architect_service_requests.id)
    AND assigned_architect_id IS NOT DISTINCT FROM (SELECT assigned_architect_id FROM public.architect_service_requests WHERE id = architect_service_requests.id)
  );

-- Architects can view requests they are assigned to
DROP POLICY IF EXISTS "Architects can view assigned requests" ON public.architect_service_requests;
CREATE POLICY "Architects can view assigned requests"
  ON public.architect_service_requests
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'architect'
    )
    AND assigned_architect_id = auth.uid()
  );

-- Architects can update requests they are assigned to (status updates)
DROP POLICY IF EXISTS "Architects can update assigned requests" ON public.architect_service_requests;
CREATE POLICY "Architects can update assigned requests"
  ON public.architect_service_requests
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'architect'
    )
    AND assigned_architect_id = auth.uid()
  );

-- Admins can view all requests
DROP POLICY IF EXISTS "Admins can view all architect service requests" ON public.architect_service_requests;
CREATE POLICY "Admins can view all architect service requests"
  ON public.architect_service_requests
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can update all requests
DROP POLICY IF EXISTS "Admins can update all architect service requests" ON public.architect_service_requests;
CREATE POLICY "Admins can update all architect service requests"
  ON public.architect_service_requests
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================================================
-- TRIGGER: auto-update updated_at
-- ============================================================================
DROP TRIGGER IF EXISTS update_architect_service_requests_updated_at ON public.architect_service_requests;
CREATE TRIGGER update_architect_service_requests_updated_at
  BEFORE UPDATE ON public.architect_service_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
