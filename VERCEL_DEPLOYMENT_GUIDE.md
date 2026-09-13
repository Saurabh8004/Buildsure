# ConstructBid Vercel Deployment Guide

## 🚨 Blank Page Issue - FIXED

The blank page issue on Vercel production has been resolved by implementing:

1. ✅ **vercel.json** - SPA routing configuration
2. ✅ **ErrorBoundary** - Catches React errors and displays helpful error screen
3. ✅ **ConfigError** - Shows configuration error when env vars are missing
4. ✅ **Configuration validation** - Checks Supabase config before rendering

---

## 📋 Pre-Deployment Checklist

### 1. Environment Variables in Vercel

**Required Variables:**
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**How to Add:**
1. Go to https://vercel.com/dashboard
2. Select your ConstructBid project
3. Navigate to **Settings** → **Environment Variables**
4. Add both variables for **Production**, **Preview**, and **Development**
5. Click **Save**

**Where to Get Values:**
1. Go to https://app.supabase.com
2. Select your project
3. Navigate to **Settings** → **API**
4. Copy **Project URL** → `VITE_SUPABASE_URL`
5. Copy **anon public key** → `VITE_SUPABASE_ANON_KEY`

**Important:**
- ✅ Use `anon public` key (NOT `service_role` key)
- ✅ Key should start with `eyJ` or `sb_publishable_`
- ✅ URL should end with `.supabase.co`
- ❌ NEVER use service_role key in frontend

---

### 2. Supabase Configuration

**Site URL:**
```
https://buildsure.vercel.app
```

**Redirect URLs:**
```
https://buildsure.vercel.app/**
```

**How to Configure:**
1. Go to Supabase Dashboard → Your Project
2. Navigate to **Authentication** → **URL Configuration**
3. Set **Site URL** to: `https://buildsure.vercel.app`
4. Add **Redirect URL**: `https://buildsure.vercel.app/**`
5. Click **Save**

---

### 3. Email Configuration (Optional)

If using Resend for email delivery:

1. Go to **Authentication** → **Providers** → **Email**
2. Enable **Email Provider**
3. Configure SMTP:
   ```
   Host: smtp.resend.com
   Port: 465
   Username: resend
   Password: [YOUR_RESEND_API_KEY]
   ```

---

## 🚀 Deployment Steps

### Step 1: Push Changes to GitHub

```bash
git add .
git commit -m "Fix blank page issue - add error boundary and config validation"
git push origin main
```

### Step 2: Trigger Vercel Deployment

Vercel will automatically deploy when you push to main. Or manually trigger:

1. Go to Vercel Dashboard
2. Select your project
3. Click **Deployments** tab
4. Click **Redeploy** on the latest deployment

### Step 3: Verify Deployment

1. Wait for deployment to complete (2-3 minutes)
2. Open: https://buildsure.vercel.app
3. Check browser console for errors
4. Verify homepage loads correctly

---

## 🔍 Troubleshooting

### Issue: Blank White Page

**Symptoms:**
- Page loads but shows nothing
- Browser console shows errors

**Solutions:**

1. **Check Environment Variables**
   ```bash
   # In Vercel Dashboard → Settings → Environment Variables
   # Verify these exist:
   VITE_SUPABASE_URL
   VITE_SUPABASE_ANON_KEY
   ```

2. **Check Build Logs**
   ```bash
   # In Vercel Dashboard → Deployments → Latest Deployment → Build Logs
   # Look for errors during build
   ```

3. **Check Browser Console**
   ```
   # Open DevTools (F12) → Console tab
   # Look for errors like:
   - "Supabase configuration is missing"
   - "Failed to fetch"
   - "Network error"
   ```

4. **Verify Configuration Screen**
   - If env vars are missing, you should see a yellow "Configuration Required" screen
   - This screen tells you exactly what's missing

---

### Issue: 404 on Page Refresh

**Symptoms:**
- Homepage works
- Refreshing on /signin or /projects shows 404

**Solution:**
✅ Already fixed with `vercel.json` SPA routing configuration

---

### Issue: Authentication Errors

**Symptoms:**
- Can't sign in
- Verification emails don't work
- "Invalid credentials" error

**Solutions:**

1. **Check Supabase URL**
   - Should be: `https://your-project.supabase.co`
   - NOT: `http://localhost:3000`

2. **Check Redirect URLs**
   - Should include: `https://buildsure.vercel.app/**`

3. **Check Anon Key**
   - Should start with `eyJ` or `sb_publishable_`
   - NOT the service_role key

---

### Issue: Email Verification Not Working

**Symptoms:**
- Verification email not received
- Clicking verification link shows error

**Solutions:**

1. **Check Email Provider**
   - Go to Supabase → Authentication → Providers → Email
   - Verify email provider is enabled
   - Check SMTP configuration

2. **Check Redirect URLs**
   - Must include: `https://buildsure.vercel.app/**`

3. **Check Site URL**
   - Must be: `https://buildsure.vercel.app`

---

## 📊 Build Configuration

### Vercel Settings

**Framework Preset:** Vite

**Build Command:**
```bash
npm run build
```

**Output Directory:**
```bash
dist
```

**Install Command:**
```bash
npm install
```

### vercel.json

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This enables SPA routing so all routes work correctly.

---

## 🧪 Post-Deployment Testing

### Test Checklist

- [ ] Homepage loads (https://buildsure.vercel.app)
- [ ] CSS and assets load correctly
- [ ] Navigation works (click links)
- [ ] /signin page loads
- [ ] /get-started page loads
- [ ] /projects page loads
- [ ] Browser refresh on /signin works (no 404)
- [ ] Browser refresh on /projects works (no 404)
- [ ] Sign up creates account
- [ ] Verification email arrives
- [ ] Verification link works
- [ ] Sign in works after verification
- [ ] Dashboard loads correctly
- [ ] Session persists after refresh

---

## 🔐 Security Notes

### Environment Variables

✅ **Safe to expose in frontend:**
- `VITE_SUPABASE_URL` - Public project URL
- `VITE_SUPABASE_ANON_KEY` - Public anon key

❌ **NEVER expose in frontend:**
- `service_role` key - Has full database access
- Database passwords
- API secrets

### Supabase Security

✅ **Enable Row Level Security (RLS)**
- All tables should have RLS enabled
- Users can only access their own data

✅ **Use anon key for frontend**
- Anon key has limited permissions
- Respects RLS policies

❌ **Don't use service_role key**
- Bypasses all security
- Full database access
- Only use in server-side code

---

## 📈 Monitoring

### Vercel Analytics

Enable Vercel Analytics to monitor:
- Page load times
- Error rates
- User interactions

**How to Enable:**
1. Go to Vercel Dashboard → Your Project
2. Navigate to **Analytics** tab
3. Click **Enable**

### Supabase Logs

Monitor authentication and database operations:
1. Go to Supabase Dashboard → Your Project
2. Navigate to **Logs**
3. Check:
   - Auth logs (signups, logins)
   - API logs (database queries)
   - Edge Function logs (if using)

---

## 🆘 Support Resources

### Documentation
- **Vercel Docs:** https://vercel.com/docs
- **Supabase Docs:** https://supabase.com/docs
- **Vite Docs:** https://vitejs.dev

### ConstructBid Docs
- **Setup Guide:** See `RESEND_SMTP_SETUP.md`
- **Email Verification:** See `EMAIL_VERIFICATION_REDIRECT_FIX.md`
- **Backend Setup:** See `BACKEND_SETUP.md`

### Community
- **Vercel Discord:** https://vercel.com/discord
- **Supabase Discord:** https://discord.supabase.com

---

## ✅ Success Criteria

After deployment, verify:

✅ Homepage loads without errors  
✅ All routes work (no 404s)  
✅ Authentication works (signup/login)  
✅ Email verification works  
✅ Dashboard loads correctly  
✅ Session persists after refresh  
✅ No console errors  
✅ Build completes successfully  

---

## 🎯 Quick Fix Summary

**Problem:** Blank white page on Vercel production  
**Root Cause:** Missing error handling and configuration validation  
**Solution:** 
1. Added `vercel.json` for SPA routing
2. Added `ErrorBoundary` to catch React errors
3. Added `ConfigError` to show config issues
4. Added config validation before rendering

**Result:** 
- ✅ No more blank pages
- ✅ Clear error messages when config is missing
- ✅ Helpful error screen with fix instructions
- ✅ Proper SPA routing on all routes

---

**Status:** ✅ READY FOR DEPLOYMENT

**Next Steps:**
1. Add environment variables in Vercel
2. Push changes to GitHub
3. Wait for Vercel deployment
4. Test production URL
5. Verify all functionality works
