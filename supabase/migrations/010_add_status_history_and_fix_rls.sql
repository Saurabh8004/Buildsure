-- ============================================================================
-- MIGRATION: Add status history table and fix RLS policies
-- Purpose: Track status changes and enforce role-based status transitions
-- ============================================================================

-- Create status history table
CREATE TABLE IF NOT EXISTS public.architect_service_request_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_id UUID NOT NULL REFERENCES public.architect_service_requests(id) ON DELETE CASCADE,
  from_status TEXT,
  to_status TEXT NOT NULL,
  changed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  changed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  note TEXT
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_request_history_request_id ON public.architect_service_request_history(request_id);
CREATE INDEX IF NOT EXISTS idx_request_history_changed_at ON public.architect_service_request_history(changed_at DESC);

-- Enable RLS
ALTER TABLE public.architect_service_request_history ENABLE ROW LEVEL SECURITY;

-- RLS policies for history
CREATE POLICY "Users can view history of their own requests"
  ON public.architect_service_request_history
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.architect_service_requests
      WHERE id = request_id AND client_id = auth.uid()
    )
  );

CREATE POLICY "Assigned architects can view history"
  ON public.architect_service_request_history
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.architect_service_requests
      WHERE id = request_id AND assigned_architect_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all history"
  ON public.architect_service_request_history
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create function to record status changes
CREATE OR REPLACE FUNCTION public.record_status_change()
RETURNS TRIGGER AS $$
BEGIN
  -- Only record if status actually changed
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO public.architect_service_request_history (
      request_id,
      from_status,
      to_status,
      changed_by,
      changed_at
    ) VALUES (
      NEW.id,
      OLD.status,
      NEW.status,
      auth.uid(),
      NOW()
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically record status changes
DROP TRIGGER IF EXISTS record_status_change_trigger ON public.architect_service_requests;
CREATE TRIGGER record_status_change_trigger
  AFTER UPDATE ON public.architect_service_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.record_status_change();

-- ============================================================================
-- FIX RLS POLICIES FOR STATUS TRANSITIONS
-- ============================================================================

-- Drop existing policies
DROP POLICY IF EXISTS "Architects can update assigned requests" ON public.architect_service_requests;
DROP POLICY IF EXISTS "Clients can update own architect service requests" ON public.architect_service_requests;
DROP POLICY IF EXISTS "Admins can update all architect service requests" ON public.architect_service_requests;

-- Architect can only transition: matched → proposal_sent, accepted → in_progress, in_progress → completed
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
    -- Architect can only transition to these statuses
    (
      -- matched → proposal_sent (after submitting proposal)
      (status = 'proposal_sent' AND (SELECT status FROM public.architect_service_requests WHERE id = architect_service_requests.id) = 'matched')
      OR
      -- accepted → in_progress (after client accepts)
      (status = 'in_progress' AND (SELECT status FROM public.architect_service_requests WHERE id = architect_service_requests.id) = 'accepted')
      OR
      -- in_progress → completed (when work is done)
      (status = 'completed' AND (SELECT status FROM public.architect_service_requests WHERE id = architect_service_requests.id) = 'in_progress')
    )
  );

-- Client can only transition: client_review → accepted, client_review → cancelled
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
    -- Client can only transition to these statuses
    (
      -- client_review → accepted (accept proposal)
      (status = 'accepted' AND (SELECT status FROM public.architect_service_requests WHERE id = architect_service_requests.id) = 'client_review')
      OR
      -- client_review → cancelled (decline proposal)
      (status = 'cancelled' AND (SELECT status FROM public.architect_service_requests WHERE id = architect_service_requests.id) = 'client_review')
    )
  );

-- Admin can manage: submitted → under_review, under_review → matching, matching → matched
CREATE POLICY "Admins can update all architect service requests"
  ON public.architect_service_requests
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    -- Admin can only transition to these statuses
    (
      -- submitted → under_review
      (status = 'under_review' AND (SELECT status FROM public.architect_service_requests WHERE id = architect_service_requests.id) = 'submitted')
      OR
      -- under_review → matching
      (status = 'matching' AND (SELECT status FROM public.architect_service_requests WHERE id = architect_service_requests.id) = 'under_review')
      OR
      -- matching → matched (assign architect)
      (status = 'matched' AND (SELECT status FROM public.architect_service_requests WHERE id = architect_service_requests.id) = 'matching')
    )
  );
