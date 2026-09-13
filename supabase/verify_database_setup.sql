-- DATABASE SETUP VERIFICATION SCRIPT
-- Run this in Supabase SQL Editor to verify database setup

-- Step 1: Check if users table exists
DO $$
DECLARE
  users_exists BOOLEAN;
  users_count INTEGER;
BEGIN
  SELECT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'users'
  ) INTO users_exists;
  
  IF users_exists THEN
    SELECT COUNT(*) INTO users_count FROM public.users;
    RAISE NOTICE '✓ public.users table EXISTS with % rows', users_count;
  ELSE
    RAISE WARNING '✗ public.users table DOES NOT EXIST';
    RAISE NOTICE '→ Run migration: supabase/migrations/004_ensure_users_table_with_rls.sql';
  END IF;
END $$;

-- Step 2: Check table structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'users'
ORDER BY ordinal_position;

-- Step 3: Check indexes
SELECT 
  indexname,
  indexdef
FROM pg_indexes
WHERE schemaname = 'public' 
  AND tablename = 'users';

-- Step 4: Check RLS status
SELECT 
  tablename,
  rowsecurity
FROM pg_tables
WHERE schemaname = 'public' 
  AND tablename = 'users';

-- Step 5: Check RLS policies
SELECT 
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'public' 
  AND tablename = 'users';

-- Step 6: Check if required columns exist
DO $$
DECLARE
  missing_columns TEXT[];
BEGIN
  SELECT ARRAY(
    SELECT col FROM (VALUES ('id'), ('email'), ('full_name'), ('role')) AS t(col)
    WHERE NOT EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_schema = 'public' 
        AND table_name = 'users' 
        AND column_name = col
    )
  ) INTO missing_columns;
  
  IF array_length(missing_columns, 1) > 0 THEN
    RAISE WARNING '✗ Missing required columns: %', array_to_string(missing_columns, ', ');
  ELSE
    RAISE NOTICE '✓ All required columns exist';
  END IF;
END $$;

-- Step 7: Test a simple query (will fail if table doesn't exist or RLS blocks it)
DO $$
BEGIN
  PERFORM 1 FROM public.users LIMIT 1;
  RAISE NOTICE '✓ Can query public.users table';
EXCEPTION WHEN OTHERS THEN
  RAISE WARNING '✗ Cannot query public.users: %', SQLERRM;
END $$;

-- Step 8: Refresh schema cache
NOTIFY pgrst, 'reload schema';
RAISE NOTICE '✓ PostgREST schema cache refreshed';

-- Step 9: Summary
DO $$
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '========================================';
  RAISE NOTICE 'DATABASE SETUP VERIFICATION COMPLETE';
  RAISE NOTICE '========================================';
  RAISE NOTICE '';
  RAISE NOTICE 'If you see warnings above, run:';
  RAISE NOTICE 'supabase/migrations/004_ensure_users_table_with_rls.sql';
  RAISE NOTICE '';
END $$;
