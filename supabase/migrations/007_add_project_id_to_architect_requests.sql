-- ============================================================================
-- MIGRATION: Add project_id to architect_service_requests
-- Purpose: Link architect service requests to specific projects
-- ============================================================================

-- Add project_id column
ALTER TABLE public.architect_service_requests
ADD COLUMN IF NOT EXISTS project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE;

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_architect_service_requests_project_id 
ON public.architect_service_requests(project_id);

-- Update RLS policies to include project relationship

-- Drop existing policies
DROP POLICY IF EXISTS "Clients can create own architect service requests" ON public.architect_service_requests;
DROP POLICY IF EXISTS "Clients can view own architect service requests" ON public.architect_service_requests;
DROP POLICY IF EXISTS "Clients can update own architect service requests" ON public.architect_service_requests;

-- Recreate policies with project validation
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
      project_id IS NULL 
      OR EXISTS (
        SELECT 1 FROM public.projects
        WHERE id = project_id AND client_id = auth.uid()
      )
    )
  );

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
    status = (SELECT status FROM public.architect_service_requests WHERE id = architect_service_requests.id)
    AND assigned_architect_id IS NOT DISTINCT FROM (SELECT assigned_architect_id FROM public.architect_service_requests WHERE id = architect_service_requests.id)
  );
