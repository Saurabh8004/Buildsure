-- ============================================================================
-- MIGRATION: Fix status lifecycle to match canonical lifecycle
-- Purpose: Update status values to match canonical lifecycle
-- ============================================================================

-- Update status values to match canonical lifecycle
-- Current: 'submitted', 'under_review', 'matched', 'proposals_received', 'client_selected', 'in_progress', 'completed', 'cancelled'
-- Required: 'submitted', 'under_review', 'matching', 'matched', 'proposal_sent', 'client_review', 'accepted', 'in_progress', 'completed', 'cancelled'

-- Step 1: Add new status values to CHECK constraint
ALTER TABLE public.architect_service_requests
DROP CONSTRAINT IF EXISTS architect_service_requests_status_check;

ALTER TABLE public.architect_service_requests
ADD CONSTRAINT architect_service_requests_status_check
CHECK (status IN (
  'submitted',
  'under_review',
  'matching',
  'matched',
  'proposal_sent',
  'client_review',
  'accepted',
  'in_progress',
  'completed',
  'cancelled'
));

-- Step 2: Migrate existing data
-- 'proposals_received' → 'proposal_sent'
UPDATE public.architect_service_requests
SET status = 'proposal_sent'
WHERE status = 'proposals_received';

-- 'client_selected' → 'client_review'
UPDATE public.architect_service_requests
SET status = 'client_review'
WHERE status = 'client_selected';

-- Step 3: Update RLS policies to allow new status transitions
-- Drop existing policies
DROP POLICY IF EXISTS "Clients can update own architect service requests" ON public.architect_service_requests;
DROP POLICY IF EXISTS "Architects can update assigned requests" ON public.architect_service_requests;

-- Recreate policies with new status values
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
    status IN ('client_review', 'accepted', 'cancelled')
  );

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
    status IN ('proposal_sent', 'in_progress', 'completed')
  );
