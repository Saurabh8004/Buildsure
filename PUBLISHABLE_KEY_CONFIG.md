# Supabase Publishable Key Configuration

## ✅ What Was Updated

The BuildSure frontend has been updated to support the **new Supabase publishable key format** (`sb_publishable_...`) in addition to the legacy JWT format (`eyJ...`).

### Files Modified

1. **`src/lib/supabase.ts`**
   - Updated `isSupabaseConfigured()` to accept both key formats:
     - Legacy: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
     - New: `sb_publishable_...`
   - Updated `getMaskedConfig()` to properly mask both formats
   - Updated validation warnings to mention both formats

2. **`.env`**
   - Updated placeholder to `your-supabase-publishable-key`
   - Added instructions for both key formats

3. **`.env.example`**
   - Updated placeholder to `your-supabase-publishable-key`
   - Added documentation for both key formats

## 🔧 What You Need To Do

### Step 1: Get Your Supabase Credentials

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Open your project
3. Navigate to **Settings** → **API**
4. Copy these two values:
   - **Project URL** (e.g., `https://abcdefghijk.supabase.co`)
   - **Publishable Key** (starts with `sb_publishable_...`)

### Step 2: Update Your `.env` File

Open the `.env` file in the project root and replace the placeholders:

```bash
# Replace these with your actual values:
VITE_SUPABASE_URL=https://your-actual-project.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_your_actual_key_here
```

**Important:** 
- Keep the `VITE_` prefix (required for Vite to expose the variables)
- Do NOT add quotes around the values
- Do NOT commit this file to Git (it's already in `.gitignore`)

### Step 3: Restart the Development Server

```bash
# Stop the current server (Ctrl+C)
# Then start it again:
npm run dev
```

### Step 4: Verify Configuration

1. Open your browser to `http://localhost:5173/config-check`
2. You should see:
   - ✅ Environment Variables: PASS
   - ✅ Supabase Connection: PASS
   - ✅ Database Tables: PASS (if you've run the migration)
   - ✅ Authentication: PASS

### Step 5: Test Registration

1. Go to `http://localhost:5173`
2. Click "Get Started"
3. Fill in the registration form
4. Submit the form
5. You should be redirected to your dashboard

## 🔒 Security Notes

- ✅ The `.env` file is in `.gitignore` and will NOT be committed to Git
- ✅ Only `.env.example` (with placeholder values) should be committed
- ✅ The publishable key is safe to use in frontend code
- ✅ Never use the `service_role` key in frontend code
- ✅ The `getMaskedConfig()` function ensures keys are never fully exposed in logs

## 🐛 Troubleshooting

### "Failed to fetch" error during registration

**Cause:** The `.env` file still has placeholder values or the dev server wasn't restarted.

**Solution:**
1. Verify your `.env` file has real credentials
2. Restart the dev server (`npm run dev`)
3. Check `/config-check` for detailed diagnostics

### Config check shows "INVALID FORMAT"

**Cause:** The key doesn't start with `sb_publishable_` or `eyJ`.

**Solution:**
1. Go to Supabase Dashboard → Settings → API
2. Copy the publishable key again
3. Make sure you copied the full key (it's long)
4. Paste it into `.env` without any extra spaces

### Config check shows "NOT CONFIGURED"

**Cause:** The values are still placeholders or the dev server is using cached values.

**Solution:**
1. Check that `.env` has real values (not `your-supabase-publishable-key`)
2. Stop the dev server completely (Ctrl+C)
3. Start it again (`npm run dev`)
4. Hard refresh the browser (Ctrl+Shift+R)

## 📊 Key Format Detection

The system now automatically detects which key format you're using:

- **JWT format** (`eyJ...`): Legacy format, still supported
- **Publishable format** (`sb_publishable_...`): New format, recommended

Both formats work identically. The `/config-check` page will show which format is detected.

## ✅ Build Status

- ✅ TypeScript compilation: PASS
- ✅ Vite build: PASS
- ✅ No errors or warnings
- ✅ Bundle size: 539.91 kB (gzipped: 140.99 kB)

---

**Last Updated:** 2026-01-29  
**Status:** Ready for configuration
