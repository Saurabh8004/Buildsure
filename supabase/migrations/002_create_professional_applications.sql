-- Create professional applications tables
-- These tables store applications from architects/engineers and quality inspectors
-- who want to join the ConstructBid network as professional partners

-- Table for architect/engineer partner applications
CREATE TABLE IF NOT EXISTS architect_partner_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Personal Details
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT NOT NULL,
  years_of_experience INTEGER NOT NULL,
  professional_role TEXT NOT NULL,
  
  -- Professional Details
  company_name TEXT,
  registration_number TEXT,
  areas_of_expertise TEXT,
  project_types TEXT,
  projects_completed INTEGER,
  professional_bio TEXT,
  
  -- Services (comma-separated for simplicity, can be normalized later)
  services TEXT,
  
  -- Documents (stored as JSON array of file references)
  documents JSONB DEFAULT '[]'::jsonb,
  
  -- Status tracking
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected', 'contacted')),
  admin_notes TEXT,
  reviewed_by UUID,
  reviewed_at TIMESTAMPTZ,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table for quality inspector applications
CREATE TABLE IF NOT EXISTS quality_inspector_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Personal Details
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT NOT NULL,
  years_of_experience INTEGER NOT NULL,
  professional_qualification TEXT NOT NULL,
  
  -- Professional Details
  company_name TEXT,
  registration_number TEXT,
  areas_of_expertise TEXT,
  construction_experience TEXT,
  projects_inspected INTEGER,
  professional_bio TEXT,
  
  -- Inspection Expertise (comma-separated)
  inspection_expertise TEXT,
  
  -- Service Area
  service_city TEXT,
  areas_covered TEXT,
  willing_to_travel BOOLEAN DEFAULT false,
  
  -- Documents (stored as JSON array of file references)
  documents JSONB DEFAULT '[]'::jsonb,
  
  -- Status tracking
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected', 'contacted')),
  admin_notes TEXT,
  reviewed_by UUID,
  reviewed_at TIMESTAMPTZ,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_architect_applications_status ON architect_partner_applications(status);
CREATE INDEX IF NOT EXISTS idx_architect_applications_email ON architect_partner_applications(email);
CREATE INDEX IF NOT EXISTS idx_architect_applications_created_at ON architect_partner_applications(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_inspector_applications_status ON quality_inspector_applications(status);
CREATE INDEX IF NOT EXISTS idx_inspector_applications_email ON quality_inspector_applications(email);
CREATE INDEX IF NOT EXISTS idx_inspector_applications_created_at ON quality_inspector_applications(created_at DESC);

-- Enable Row Level Security
ALTER TABLE architect_partner_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE quality_inspector_applications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for architect_partner_applications
-- Public can only INSERT (submit applications)
CREATE POLICY "Public can submit architect applications"
  ON architect_partner_applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated admins can view applications
CREATE POLICY "Admins can view architect applications"
  ON architect_partner_applications
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- Only authenticated admins can update applications
CREATE POLICY "Admins can update architect applications"
  ON architect_partner_applications
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- RLS Policies for quality_inspector_applications
-- Public can only INSERT (submit applications)
CREATE POLICY "Public can submit inspector applications"
  ON quality_inspector_applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated admins can view applications
CREATE POLICY "Admins can view inspector applications"
  ON quality_inspector_applications
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- Only authenticated admins can update applications
CREATE POLICY "Admins can update inspector applications"
  ON quality_inspector_applications
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_professional_applications_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for both tables
CREATE TRIGGER update_architect_applications_updated_at
  BEFORE UPDATE ON architect_partner_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_professional_applications_updated_at();

CREATE TRIGGER update_inspector_applications_updated_at
  BEFORE UPDATE ON quality_inspector_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_professional_applications_updated_at();

-- Add columns to projects table for future professional assignments
-- These will be used when approved professionals are assigned to projects
ALTER TABLE projects 
  ADD COLUMN IF NOT EXISTS assigned_architect_id UUID REFERENCES architect_partner_applications(id),
  ADD COLUMN IF NOT EXISTS assigned_inspector_id UUID REFERENCES quality_inspector_applications(id);
