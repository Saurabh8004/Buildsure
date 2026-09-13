# Database Schema Error - Root Cause Analysis & Fix

## 🔴 CRITICAL ISSUE IDENTIFIED

**Error Message:**
```
Could not find the table 'public.users' in the schema cache
```

## 📊 ROOT CAUSE ANALYSIS

### What's Happening

The application is trying to query the `public.users` table, but **the table does not exist in your Supabase database**.

### Why This Happens

1. **Migrations exist but haven't been run**
   - `supabase/migrations/001_initial_schema.sql` - Creates users table
   - `supabase/migrations/003_create_users_table.sql` - Creates users table with RLS
   - `supabase/migrations/004_ensure_users_table_with_rls.sql` - Consolidated migration (NEW)

2. **The code expects the table to exist**
   - `src/lib/auth.ts` queries `public.users` during registration and login
   - `src/lib/services.ts` queries `public.users` for admin operations
   - Without the table, all authentication fails

### Where the Error Occurs

**File:** `src/lib/auth.ts`

**Line 265 (Registration):**
```typescript
const { error: userError } = await supabase
  .from('users')  // ← ERROR: Table doesn't exist
  .upsert({
    id: authData.user.id,
    email,
    full_name: fullName,
    mobile: mobile || null,
    role,
    account_status: 'active',
    verification_status: role === 'client' ? 'unverified' : 'pending',
  });
```

**Line 483 (Login - getCurrentUser):**
```typescript
const { data: profile, error: profileError } = await supabase
  .from('users')  // ← ERROR: Table doesn't exist
  .select('*')
  .eq('id', user.id)
  .single();
```

## ✅ SOLUTION

### Step 1: Run the Database Migration

**Go to Supabase Dashboard:**
1. https://app.supabase.com
2. Select your project: `aiyvyunrarefrdgyzjfr`
3. Go to **SQL Editor**
4. Click **New Query**

**Option A: Run the consolidated migration (RECOMMENDED)**
```sql
-- Copy and paste the entire contents of:
-- supabase/migrations/004_ensure_users_table_with_rls.sql
```

**Option B: Run the verification script first**
```sql
-- Copy and paste the entire contents of:
-- supabase/verify_database_setup.sql
```
This will tell you exactly what's missing.

### Step 2: Verify the Table Exists

After running the migration, verify:

```sql
-- Check if table exists
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'users';

-- Check table structure
SELECT column_name, data_type 
FROM information_schema.columns
WHERE table_schema = 'public' 
AND table_name = 'users';

-- Check RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public' 
AND tablename = 'users';
```

### Step 3: Test Authentication

1. Go to your app: https://buildsure.vercel.app
2. Try to sign up with a new account
3. **Expected:** Account created successfully, verification email sent
4. Check email for verification link
5. Click verification link
6. **Expected:** Email verified, redirected to sign in
7. Sign in with credentials
8. **Expected:** Redirected to role-specific dashboard

## 📋 MIGRATION DETAILS

### What Migration 004 Does

1. **Creates the users table** (if it doesn't exist)
   ```sql
   CREATE TABLE IF NOT EXISTS public.users (
     id UUID PRIMARY KEY REFERENCES auth.users(id),
     email TEXT UNIQUE NOT NULL,
     full_name TEXT NOT NULL,
     mobile TEXT,
     role TEXT NOT NULL,
     account_status TEXT NOT NULL DEFAULT 'active',
     verification_status TEXT NOT NULL DEFAULT 'unverified',
     created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
     updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
   );
   ```

2. **Creates indexes** for performance
   - `idx_users_email`
   - `idx_users_role`
   - `idx_users_verification_status`

3. **Enables Row Level Security (RLS)**
   ```sql
   ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
   ```

4. **Creates RLS policies**
   - Users can view their own profile
   - Users can update their own profile (except role/verification_status)
   - Users can insert their own profile
   - Admins can view all users
   - Admins can update all users

5. **Creates trigger** for auto-updating `updated_at`

6. **Refreshes PostgREST schema cache**
   ```sql
   NOTIFY pgrst, 'reload schema';
   ```

7. **Verifies the table exists** and shows row count

## 🔧 CODE CHANGES

### Updated Error Handling

**File:** `src/lib/auth.ts`

**Added specific error handling for missing table:**
```typescript
// CRITICAL: Database table not found error
if (error.code === '42P01' || 
    error.message?.includes('Could not find the table') ||
    error.message?.includes('relation') && error.message?.includes('does not exist')) {
  console.error('[Auth] DATABASE SCHEMA ERROR: Required table is missing!');
  return new AuthError(
    'Database setup incomplete. Please contact support or run the database migration.',
    'DATABASE_SCHEMA_ERROR',
    'The required database table does not exist. Run migration: supabase/migrations/004_ensure_users_table_with_rls.sql'
  );
}
```

**Benefits:**
- Clear error message instead of generic "table not found"
- Tells user exactly what to do
- Logs detailed error for debugging

## 📊 FILES CREATED/MODIFIED

### Created
1. `supabase/migrations/004_ensure_users_table_with_rls.sql` - Consolidated migration
2. `supabase/verify_database_setup.sql` - Verification script
3. `DATABASE_SCHEMA_ERROR_FIX.md` - This document

### Modified
1. `src/lib/auth.ts` - Added specific error handling for missing table

## 🧪 TESTING CHECKLIST

### Before Migration
- [ ] Run `supabase/verify_database_setup.sql`
- [ ] Confirm `public.users` table does NOT exist
- [ ] Try to sign up - should fail with "Database setup incomplete"

### After Migration
- [ ] Run `supabase/verify_database_setup.sql` again
- [ ] Confirm `public.users` table EXISTS
- [ ] Confirm RLS is enabled
- [ ] Confirm all policies exist
- [ ] Try to sign up - should succeed
- [ ] Check email for verification link
- [ ] Click verification link - should verify email
- [ ] Sign in - should redirect to dashboard
- [ ] Check user name appears in top-right corner
- [ ] Refresh browser - session should persist
- [ ] Logout - should redirect to homepage

## 🔍 TROUBLESHOOTING

### Issue: "Table still not found" after running migration

**Solution:**
1. Refresh PostgREST schema cache:
   ```sql
   NOTIFY pgrst, 'reload schema';
   ```
2. Wait 10 seconds
3. Try again

### Issue: "Permission denied" when querying table

**Solution:**
1. Check RLS is enabled:
   ```sql
   SELECT rowsecurity FROM pg_tables 
   WHERE tablename = 'users';
   ```
2. Check policies exist:
   ```sql
   SELECT * FROM pg_policies 
   WHERE tablename = 'users';
   ```
3. Re-run migration to recreate policies

### Issue: "Column does not exist"

**Solution:**
1. Check table structure:
   ```sql
   SELECT column_name FROM information_schema.columns
   WHERE table_name = 'users';
   ```
2. Re-run migration to add missing columns

## 📚 RELATED DOCUMENTATION

- `AUTHENTICATION_FINAL_REPORT.md` - Authentication system overview
- `QUICK_REFERENCE.md` - Quick reference guide
- `supabase/migrations/001_initial_schema.sql` - Original migration
- `supabase/migrations/004_ensure_users_table_with_rls.sql` - Consolidated migration

## ✅ SUCCESS CRITERIA

After running the migration:

✅ `public.users` table exists  
✅ Table has all required columns  
✅ RLS is enabled  
✅ All RLS policies exist  
✅ User can sign up successfully  
✅ Verification email is sent  
✅ User can verify email  
✅ User can sign in  
✅ User is redirected to correct dashboard  
✅ User name appears in header  
✅ Session persists after refresh  

## 🚀 NEXT STEPS

1. **Run the migration** in Supabase SQL Editor
2. **Verify the table exists** using the verification script
3. **Test the authentication flow** end-to-end
4. **Deploy to production** (if not already deployed)
5. **Monitor for any issues**

---

**Status:** ⏳ AWAITING DATABASE MIGRATION

**Next Action:** Run `supabase/migrations/004_ensure_users_table_with_rls.sql` in Supabase SQL Editor
