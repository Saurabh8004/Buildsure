# 🔴 CRITICAL: Database Schema Error - Complete Diagnosis & Fix

## EXECUTIVE SUMMARY

**Error:** `Could not find the table 'public.users' in the schema cache`

**Root Cause:** The `public.users` table does not exist in your Supabase database. The migrations exist in the codebase but have not been executed.

**Status:** ⏳ **AWAITING DATABASE MIGRATION**

---

## 📊 DETAILED DIAGNOSIS

### 1. DATABASE INSPECTION RESULTS

**Tables Checked:**
- ❌ `public.users` - **DOES NOT EXIST**
- ❌ `public.user_profiles` - Does not exist
- ❌ `public.profiles` - Does not exist
- ✅ `public.client_profiles` - Exists (but references non-existent users table)
- ✅ `public.contractor_profiles` - Exists (but references non-existent users table)

**Conclusion:** The `public.users` table is missing, which is the root cause of all authentication failures.

### 2. CODE TRACE - WHERE THE ERROR OCCURS

**File:** `src/lib/auth.ts`

**Error Location 1 - Registration (Line 265):**
```typescript
const { error: userError } = await supabase
  .from('users')  // ← TABLE DOES NOT EXIST
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

**Error Location 2 - Login (Line 483):**
```typescript
const { data: profile, error: profileError } = await supabase
  .from('users')  // ← TABLE DOES NOT EXIST
  .select('*')
  .eq('id', user.id)
  .single();
```

**Error Location 3 - Profile Creation (Line 499):**
```typescript
const { data: newProfile, error: createError } = await supabase
  .from('users')  // ← TABLE DOES NOT EXIST
  .upsert({
    id: user.id,
    email: user.email || '',
    full_name: fullName,
    mobile: null,
    role,
    account_status: 'active',
    verification_status: role === 'client' ? 'unverified' : 'pending',
  })
  .select()
  .single();
```

### 3. MIGRATION FILES ANALYSIS

**Existing Migrations:**
1. `supabase/migrations/001_initial_schema.sql` - Creates users table (without RLS)
2. `supabase/migrations/002_add_request_tables.sql` - Adds request tables
3. `supabase/migrations/003_create_users_table.sql` - Creates users table with RLS
4. `supabase/migrations/004_ensure_users_table_with_rls.sql` - **NEW: Consolidated migration**

**Problem:** None of these migrations have been executed in the production database.

---

## ✅ COMPLETE SOLUTION

### STEP 1: Run the Database Migration

**Go to Supabase Dashboard:**
1. https://app.supabase.com
2. Select project: `aiyvyunrarefrdgyzjfr`
3. Navigate to **SQL Editor**
4. Click **New Query**

**Copy and paste the ENTIRE contents of:**
```
supabase/migrations/004_ensure_users_table_with_rls.sql
```

**Click "Run"**

### STEP 2: Verify the Migration Succeeded

**Copy and paste the ENTIRE contents of:**
```
supabase/verify_database_setup.sql
```

**Click "Run"**

**Expected Output:**
```
✓ public.users table EXISTS with 0 rows
✓ All required columns exist
✓ PostgREST schema cache refreshed
```

### STEP 3: Test Authentication

1. Go to https://buildsure.vercel.app
2. Click "Get Started"
3. Select a role (e.g., Client)
4. Fill in registration form:
   - Name: Test User
   - Email: test@example.com
   - Password: test123456
   - Role: Client
5. Click "Create Account"
6. **Expected:** Redirected to `/verify-email?email=test@example.com`
7. Check email inbox for verification email
8. Click verification link
9. **Expected:** Redirected to `/verify-email` with success message
10. **Expected:** Redirected to `/signin`
11. Sign in with credentials
12. **Expected:** Redirected to `/client` dashboard
13. **Expected:** User name "Test User" appears in top-right corner

---

## 📋 WHAT THE MIGRATION DOES

### Migration 004: `004_ensure_users_table_with_rls.sql`

**1. Creates users table:**
```sql
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  mobile TEXT,
  role TEXT NOT NULL CHECK (role IN ('client', 'contractor', 'architect', 'inspector', 'admin')),
  account_status TEXT NOT NULL DEFAULT 'active',
  verification_status TEXT NOT NULL DEFAULT 'unverified',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**2. Creates performance indexes:**
```sql
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);
CREATE INDEX IF NOT EXISTS idx_users_verification_status ON public.users(verification_status);
```

**3. Enables Row Level Security:**
```sql
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
```

**4. Creates RLS policies:**
- Users can view their own profile
- Users can update their own profile (except role/verification_status)
- Users can insert their own profile
- Admins can view all users
- Admins can update all users

**5. Creates auto-update trigger:**
```sql
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

**6. Refreshes PostgREST schema cache:**
```sql
NOTIFY pgrst, 'reload schema';
```

**7. Verifies table exists and shows row count**

---

## 🔧 CODE CHANGES MADE

### File: `src/lib/auth.ts`

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
- Clear, actionable error message
- Tells user exactly what to do
- Logs detailed error for debugging
- Prevents silent failures

---

## 📊 FILES CREATED/MODIFIED

### Created Files
1. ✅ `supabase/migrations/004_ensure_users_table_with_rls.sql` - Consolidated migration
2. ✅ `supabase/verify_database_setup.sql` - Verification script
3. ✅ `DATABASE_SCHEMA_ERROR_FIX.md` - Detailed fix documentation
4. ✅ `CRITICAL_DATABASE_FIX.md` - This file

### Modified Files
1. ✅ `src/lib/auth.ts` - Added specific error handling for missing table

---

## 🧪 TESTING CHECKLIST

### Before Migration
- [ ] Run `supabase/verify_database_setup.sql`
- [ ] Confirm `public.users` table does NOT exist
- [ ] Try to sign up - should fail with "Database setup incomplete"
- [ ] Check browser console - should show detailed error

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
- [ ] Try cross-role access - should redirect to own dashboard

---

## 🔍 TROUBLESHOOTING

### Issue: "Table still not found" after running migration

**Solution:**
```sql
-- Refresh PostgREST schema cache
NOTIFY pgrst, 'reload schema';
```
Wait 10 seconds, then try again.

### Issue: "Permission denied" when querying table

**Solution:**
```sql
-- Check RLS is enabled
SELECT rowsecurity FROM pg_tables WHERE tablename = 'users';

-- Check policies exist
SELECT * FROM pg_policies WHERE tablename = 'users';
```
Re-run migration if policies are missing.

### Issue: Migration fails with "already exists" error

**Solution:**
The migration uses `IF NOT EXISTS` and `DROP POLICY IF EXISTS` to handle this. If it still fails:
```sql
-- Drop and recreate
DROP TABLE IF EXISTS public.users CASCADE;
-- Then re-run migration
```

---

## 📚 DOCUMENTATION

- `DATABASE_SCHEMA_ERROR_FIX.md` - Detailed fix documentation
- `CRITICAL_DATABASE_FIX.md` - This file (executive summary)
- `AUTHENTICATION_FINAL_REPORT.md` - Authentication system overview
- `QUICK_REFERENCE.md` - Quick reference guide

---

## ✅ SUCCESS CRITERIA

After running the migration, ALL of the following must be true:

✅ `public.users` table exists  
✅ Table has all required columns (id, email, full_name, role, etc.)  
✅ RLS is enabled on the table  
✅ All 5 RLS policies exist  
✅ User can sign up successfully  
✅ Verification email is sent  
✅ User can verify email by clicking link  
✅ User can sign in after verification  
✅ User is redirected to correct role dashboard  
✅ User name appears in top-right header  
✅ Session persists after browser refresh  
✅ Cross-role access is blocked  
✅ Logout works correctly  

---

## 🚀 IMMEDIATE ACTION REQUIRED

### You MUST do this NOW:

1. **Open Supabase Dashboard:** https://app.supabase.com
2. **Select project:** `aiyvyunrarefrdgyzjfr`
3. **Go to SQL Editor**
4. **Copy entire contents of:** `supabase/migrations/004_ensure_users_table_with_rls.sql`
5. **Paste into SQL Editor**
6. **Click "Run"**
7. **Wait for completion message**
8. **Test authentication flow**

---

## 📞 SUPPORT

If you encounter issues after running the migration:

1. Check browser console for errors
2. Check Supabase logs: Dashboard → Logs
3. Run verification script: `supabase/verify_database_setup.sql`
4. Check this documentation: `DATABASE_SCHEMA_ERROR_FIX.md`

---

## 📊 FINAL STATUS

| Component | Status | Notes |
|-----------|--------|-------|
| Code | ✅ FIXED | Error handling added |
| Migration | ✅ READY | `004_ensure_users_table_with_rls.sql` |
| Verification | ✅ READY | `verify_database_setup.sql` |
| Build | ✅ PASS | TypeScript and Vite build successful |
| Database | ⏳ PENDING | Migration needs to be run |
| Testing | ⏳ PENDING | After migration |

---

**Status:** ⏳ **AWAITING DATABASE MIGRATION**

**Next Action:** Run `supabase/migrations/004_ensure_users_table_with_rls.sql` in Supabase SQL Editor

**ETA to Fix:** 2 minutes (run migration) + 5 minutes (test)

---

**IMPORTANT:** Do NOT report this as "fixed" until you have:
1. Run the migration
2. Verified the table exists
3. Tested the complete authentication flow
4. Confirmed all success criteria are met
