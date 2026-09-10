# ConstructBid Resend SMTP Configuration Guide

## Quick Start (10 Minutes)

This guide will configure Resend SMTP for ConstructBid email delivery.

---

## Step 1: Create Resend Account (2 minutes)

1. Go to https://resend.com
2. Click "Get Started" or "Sign In"
3. Create account with your email
4. Verify your email address

---

## Step 2: Get Resend API Key (2 minutes)

1. After signing in, go to: https://resend.com/api-keys
2. Click "Create API Key"
3. Fill in:
   - **Name:** ConstructBid Production
   - **Permission:** Full access
4. Click "Create API Key"
5. **IMPORTANT:** Copy the API key immediately
   - Format: `re_xxxxxxxxxxxx`
   - **You won't see it again!**
6. Save it in a secure location (password manager recommended)

---

## Step 3: Configure Supabase SMTP (3 minutes)

1. Go to https://app.supabase.com
2. Select your ConstructBid project
3. Navigate to: **Authentication** → **Providers**

4. Find "Email" provider and click to expand

5. Enable Email Provider:
   ```
   ✅ Enable Email provider: ON
   ```

6. Enable Email Confirmations:
   ```
   ✅ Confirm Email: ON
   ```

7. Configure SMTP Settings:
   ```
   Host: smtp.resend.com
   Port: 465
   User: resend
   Password: [PASTE YOUR RESEND API KEY HERE]
   ```

8. Configure Sender:
   ```
   Sender Name: ConstructBid
   Sender Email: noreply@constructbid.com (or your domain)
   ```

9. Click "Save"

---

## Step 4: Configure Site URL (1 minute)

1. In Supabase dashboard, go to: **Authentication** → **URL Configuration**

2. Set Site URL:
   ```
   Site URL: http://localhost:3000
   ```
   (For production, use: `https://yourdomain.com`)

3. Add Redirect URLs:
   ```
   Redirect URLs:
   - http://localhost:3000/**
   - https://yourdomain.com/**
   ```

4. Click "Save"

---

## Step 5: Verify Email Template (1 minute)

1. Go to: **Authentication** → **Email Templates**

2. Select "Magic Link" template (used for email confirmation)

3. Verify the template contains:
   ```html
   <a href="{{ .ConfirmationURL }}">Confirm Email</a>
   ```

4. If needed, update the template to:
   ```html
   <h2>Welcome to ConstructBid!</h2>
   <p>Please confirm your email address by clicking the link below:</p>
   <p><a href="{{ .ConfirmationURL }}">Confirm Email</a></p>
   <p>This link will expire in 24 hours.</p>
   <p>If you didn't create this account, you can safely ignore this email.</p>
   ```

5. Click "Save"

---

## Step 6: Test Email Delivery (2 minutes)

1. Start your ConstructBid development server:
   ```bash
   npm run dev
   ```

2. Go to http://localhost:3000/signup

3. Sign up with a test Gmail account:
   - Use a real Gmail address you can access
   - Example: `testuser123@gmail.com`

4. After signup, you should see:
   ```
   "Account created! Please check your email to verify your account."
   ```

5. Open Gmail and check your inbox:
   - Look for email from "ConstructBid"
   - Subject: "Confirm Your Email"
   - **Check spam folder if not in inbox**

6. Open the email and click "Confirm Email"

7. You should be redirected to:
   ```
   http://localhost:3000/verify-email
   ```

8. The page should show:
   ```
   "Email verified successfully!"
   ```

9. Click "Sign In" and log in with your credentials

10. You should be redirected to your dashboard

---

## Step 7: Verify in Resend Dashboard (Optional)

1. Go to https://resend.com/emails
2. You should see the verification email in the list
3. Check the status:
   - ✅ **Delivered** - Success!
   - ⚠️ **Pending** - Still processing
   - ❌ **Failed** - Check error message

---

## Troubleshooting

### Email Not Arriving in Gmail

**Check 1: Resend Dashboard**
1. Go to https://resend.com/emails
2. Find your email
3. Check status:
   - If "Failed", click to see error details
   - Common errors:
     - "Domain not verified" → Verify domain (see Step 8)
     - "Invalid API key" → Check SMTP password
     - "Rate limit" → Wait and try again

**Check 2: Gmail Spam Folder**
1. Open Gmail
2. Check Spam folder
3. If found, click "Not spam"
4. Add sender to contacts

**Check 3: Supabase Auth Logs**
1. Go to Supabase dashboard
2. Navigate to: **Logs** → **Auth Logs**
3. Filter by: `event_type = 'email_sent'`
4. Check for errors

### Verification Link Not Working

**Issue: Wrong Redirect**
- **Symptom:** Clicking link goes to wrong page
- **Fix:** Check Site URL in Supabase
  - Should be: `http://localhost:3000`
  - Redirect URLs should include: `http://localhost:3000/**`

**Issue: Link Expired**
- **Symptom:** "Token expired" error
- **Fix:** Resend verification email
  - Go to /verify-email
  - Click "Resend Verification Email"

**Issue: Already Verified**
- **Symptom:** "Email already confirmed"
- **Fix:** Sign in directly
  - Go to /signin
  - Enter credentials

### SMTP Configuration Errors

**Error: "SMTP authentication failed"**
- **Cause:** Invalid API key
- **Fix:** 
  1. Go to Resend API Keys
  2. Create new API key
  3. Update SMTP password in Supabase

**Error: "Sender domain not verified"**
- **Cause:** Domain not verified in Resend
- **Fix:** See Step 8 below

**Error: "Port 465 not responding"**
- **Cause:** Firewall blocking port
- **Fix:** Try port 587 with STARTTLS
  - Host: smtp.resend.com
  - Port: 587
  - User: resend
  - Password: [API key]

---

## Step 8: Verify Domain (Optional but Recommended)

For production, verify your domain to improve deliverability.

1. Go to https://resend.com/domains
2. Click "Add Domain"
3. Enter your domain (e.g., `constructbid.com`)
4. Click "Verify"

5. Add DNS records to your domain provider:

**SPF Record:**
```
Type: TXT
Name: @ (or your domain)
Value: v=spf1 include:_spf.resend.com ~all
```

**DKIM Record:**
```
Type: CNAME
Name: resend._domainkey
Value: [provided by Resend]
```

6. Wait for DNS propagation (up to 48 hours)
7. Click "Verify" in Resend dashboard

---

## Production Deployment Checklist

Before deploying to production:

- [ ] Update Site URL to production domain
- [ ] Add production domain to Redirect URLs
- [ ] Verify domain in Resend (Step 8)
- [ ] Test email delivery with production domain
- [ ] Monitor Resend dashboard for delivery issues
- [ ] Set up email templates with production branding

---

## Security Notes

### What's Secure

- ✅ Resend API key stored only in Supabase dashboard
- ✅ API key not in frontend code
- ✅ API key not in Git repository
- ✅ SMTP credentials managed by Supabase
- ✅ Verification tokens managed by Supabase

### What to Monitor

- ⚠️ Resend API key exposure
- ⚠️ Email delivery success rate
- ⚠️ Spam complaints
- ⚠️ Rate limiting

---

## Support

- **Resend Support:** https://resend.com/docs
- **Supabase Auth:** https://supabase.com/docs/guides/auth
- **ConstructBid Issues:** Check browser console for errors

---

## Quick Reference

### Resend SMTP Settings
```
Host: smtp.resend.com
Port: 465 (SSL) or 587 (STARTTLS)
User: resend
Password: re_xxxxxxxxxxxx (your API key)
```

### Supabase Configuration
```
Authentication → Providers → Email
✅ Enable Email provider
✅ Confirm Email
Host: smtp.resend.com
Port: 465
User: resend
Password: [API key]
```

### Site URL Configuration
```
Authentication → URL Configuration
Site URL: http://localhost:3000
Redirect URLs:
- http://localhost:3000/**
- https://yourdomain.com/**
```

---

**Configuration Time:** ~10 minutes  
**Testing Time:** ~5 minutes  
**Total Time:** ~15 minutes

**Status:** Ready to configure
