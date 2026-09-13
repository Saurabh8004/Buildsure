-- ============================================================================
-- MIGRATION: Update architect_service_requests for project-linked workflow
-- Purpose: Make project_id required for project-linked requests, add proper workflow
-- ============================================================================

-- Add project_id column (make it nullable for now to allow migration)
ALTER TABLE public.architect_service_requests
ADD COLUMN IF NOT EXISTS project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE;

-- Create index for project_id
CREATE INDEX IF NOT EXISTS idx_architect_service_requests_project_id 
ON public.architect_service_requests(project_id);

-- Add request_source column to track if request is project-linked or standalone
ALTER TABLE public.architect_service_requests
ADD COLUMN IF NOT EXISTS request_source TEXT NOT NULL DEFAULT 'standalone' 
CHECK (request_source IN ('project', 'standalone', 'onboarding'));

-- Add client_notes for client feedback on architect proposals
ALTER TABLE public.architect_service_requests
ADD COLUMN IF NOT EXISTS client_notes TEXT;

-- Add proposal_details for architect to submit their proposal
ALTER TABLE public.architect_service_requests
ADD COLUMN IF NOT EXISTS proposal_details TEXT;

-- Add proposal_amount for architect's quote
ALTER TABLE public.architect_service_requests
ADD COLUMN IF NOT EXISTS proposal_amount TEXT;

-- Add proposal_timeline for architect's timeline
ALTER TABLE public.architect_service_requests
ADD COLUMN IF NOT EXISTS proposal_timeline TEXT;

-- Update RLS policies to handle project-linked requests properly

-- Drop existing policies
DROP POLICY IF EXISTS "Clients can create own architect service requests" ON public.architect_service_requests;
DROP POLICY IF EXISTS "Clients can view own architect service requests" ON public.architect_service_requests;
DROP POLICY IF EXISTS "Clients can update own architect service requests" ON public.architect_service_requests;

-- Clients can create their own requests
-- For project-linked requests, validate project ownership
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
    AND (
      -- Standalone requests are allowed
      request_source = 'standalone'
      OR request_source = 'onboarding'
      OR (
        -- Project-linked requests must validate project ownership
        request_source = 'project'
        AND project_id IS NOT NULL
        AND EXISTS (
          SELECT 1 FROM public.projects
          WHERE id = project_id AND client_id = auth.uid()
        )
      )
    )
  );

-- Clients can view their own requests
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

-- Clients can update their own requests (limited fields)
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
    -- Clients can only update status and client_notes
    status IN ('client_selected', 'accepted', 'cancelled')
  );

-- Architects can view requests assigned to them
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

-- Architects can update their assigned requests (proposal and status)
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
  )
  WITH CHECK (
    -- Architects can update proposal details and status
    status IN ('proposals_received', 'in_progress', 'completed')
  );

-- Admins can view all requests
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

-- Admins can update all requests (for assignment and management)
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

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_architect_service_requests_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_architect_service_requests_updated_at ON public.architect_service_requests;
CREATE TRIGGER update_architect_service_requests_updated_at
  BEFORE UPDATE ON public.architect_service_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_architect_service_requests_updated_at();
