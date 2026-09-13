-- ============================================================================
-- VERIFICATION SCRIPT - Run this AFTER applying migration 005
-- ============================================================================

-- Check if all required tables exist
DO $$
DECLARE
  table_exists BOOLEAN;
  row_count INTEGER;
BEGIN
  -- Check public.users
  SELECT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_name = 'users'
  ) INTO table_exists;
  
  IF table_exists THEN
    SELECT COUNT(*) INTO row_count FROM public.users;
    RAISE NOTICE '✓ public.users EXISTS (% rows)', row_count;
  ELSE
    RAISE EXCEPTION '✗ public.users MISSING - Run migration 005_complete_schema_sync.sql';
  END IF;
  
  -- Check public.client_profiles
  SELECT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_name = 'client_profiles'
  ) INTO table_exists;
  
  IF table_exists THEN
    SELECT COUNT(*) INTO row_count FROM public.client_profiles;
    RAISE NOTICE '✓ public.client_profiles EXISTS (% rows)', row_count;
  ELSE
    RAISE WARNING '✗ public.client_profiles MISSING';
  END IF;
  
  -- Check public.contractor_profiles
  SELECT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_name = 'contractor_profiles'
  ) INTO table_exists;
  
  IF table_exists THEN
    SELECT COUNT(*) INTO row_count FROM public.contractor_profiles;
    RAISE NOTICE '✓ public.contractor_profiles EXISTS (% rows)', row_count;
  ELSE
    RAISE WARNING '✗ public.contractor_profiles MISSING';
  END IF;
  
  -- Check public.projects
  SELECT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_name = 'projects'
  ) INTO table_exists;
  
  IF table_exists THEN
    RAISE NOTICE '✓ public.projects EXISTS';
  ELSE
    RAISE WARNING '✗ public.projects MISSING';
  END IF;
  
  -- Check public.tenders
  SELECT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_name = 'tenders'
  ) INTO table_exists;
  
  IF table_exists THEN
    RAISE NOTICE '✓ public.tenders EXISTS';
  ELSE
    RAISE WARNING '✗ public.tenders MISSING';
  END IF;
  
  -- Check public.bids
  SELECT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_name = 'bids'
  ) INTO table_exists;
  
  IF table_exists THEN
    RAISE NOTICE '✓ public.bids EXISTS';
  ELSE
    RAISE WARNING '✗ public.bids MISSING';
  END IF;
  
  -- Check RLS is enabled on users table
  SELECT rowsecurity INTO table_exists
  FROM pg_tables
  WHERE schemaname = 'public' AND tablename = 'users';
  
  IF table_exists THEN
    RAISE NOTICE '✓ RLS enabled on public.users';
  ELSE
    RAISE WARNING '✗ RLS NOT enabled on public.users';
  END IF;
  
  -- Check policies exist
  SELECT COUNT(*) INTO row_count
  FROM pg_policies
  WHERE schemaname = 'public' AND tablename = 'users';
  
  RAISE NOTICE '✓ % RLS policies on public.users', row_count;
  
  RAISE NOTICE '';
  RAISE NOTICE '========================================';
  RAISE NOTICE 'VERIFICATION COMPLETE';
  RAISE NOTICE '========================================';
END $$;

-- Test a simple query to verify API access
SELECT id, email, full_name, role 
FROM public.users 
LIMIT 1;

-- Refresh schema cache one more time
NOTIFY pgrst, 'reload schema';
