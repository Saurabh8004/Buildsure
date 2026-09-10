# ConstructBid Email Verification - Quick Reference

## 🚨 Critical Fix Applied

**Issue:** Missing `emailRedirectTo` parameter in signUp()  
**Status:** ✅ FIXED  
**File:** `src/lib/auth.ts`

---

## ⚙️ Required Manual Configuration

### Step 1: Get Resend API Key (2 min)
1. Go to https://resend.com
2. Sign up / Sign in
3. Navigate to **API Keys**
4. Click "Create API Key"
5. Copy key (starts with `re_...`)

### Step 2: Configure Supabase SMTP (5 min)
1. Go to https://app.supabase.com
2. Select project → **Authentication** → **Providers** → **Email**
3. Enable:
   - ✅ Enable Email provider
   - ✅ Confirm Email
4. SMTP Settings:
   ```
   Host: smtp.resend.com
   Port: 465
   Username: resend
   Password: [YOUR_RESEND_API_KEY]
   Sender Name: ConstructBid
   ```

### Step 3: Configure URLs (2 min)
1. **Authentication** → **URL Configuration**
2. Set:
   ```
   Site URL: http://localhost:3000
   Redirect URLs:
   - http://localhost:3000/**
   - https://yourdomain.com/**
   ```

### Step 4: Test (5 min)
1. Sign up with test Gmail
2. Check inbox for verification email
3. Click verification link
4. Verify redirect to `/verify-email`
5. Sign in successfully

---

## 📋 Quick Checklist

- [ ] Resend account created
- [ ] API key obtained
- [ ] SMTP configured in Supabase
- [ ] Site URL set
- [ ] Redirect URLs added
- [ ] Test signup completed
- [ ] Email received
- [ ] Verification link works
- [ ] Sign-in successful

---

## 🔍 Troubleshooting

### Email Not Arriving?
1. Check Resend dashboard: https://resend.com/emails
2. Check spam folder
3. Verify SMTP settings
4. Check Supabase Auth Logs

### Verification Link Not Working?
1. Check Site URL configuration
2. Verify Redirect URLs include your domain
3. Check emailRedirectTo parameter (already fixed)

### Sign-in Fails?
1. Verify email is confirmed
2. Check credentials
3. Check Auth Logs for errors

---

## 📚 Documentation

- **Setup Guide:** `RESEND_SMTP_SETUP.md`
- **Diagnostic Guide:** `EMAIL_DELIVERY_DIAGNOSTIC.md`
- **Final Report:** `EMAIL_DELIVERY_FIX_FINAL_REPORT.md`

---

## 🎯 Success Criteria

✅ Email arrives in Gmail  
✅ Verification link works  
✅ Redirect to `/verify-email`  
✅ Sign-in successful  
✅ Dashboard opens correctly  

---

## ⏱️ Time Required

- **Setup:** ~15 minutes
- **Testing:** ~5 minutes
- **Total:** ~20 minutes

---

## 🔐 Security Notes

- ✅ API key only in Supabase dashboard
- ✅ No secrets in frontend code
- ✅ No secrets in Git
- ✅ Verification tokens managed by Supabase

---

**Status:** ✅ Frontend Fixed, ⏳ Backend Configuration Required
