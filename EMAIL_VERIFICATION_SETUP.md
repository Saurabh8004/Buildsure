# ConstructBid Email Verification Setup Guide

## Overview

This guide explains how to configure Resend SMTP for ConstructBid email verification to ensure reliable email delivery.

## Current Issue

The default Supabase email delivery may be unreliable. We're configuring Resend as a custom SMTP provider for better deliverability.

## Prerequisites

- Resend account (https://resend.com)
- Resend API key
- Domain with DNS access (optional but recommended for production)

## Step 1: Configure Resend

### 1.1 Create Resend Account

1. Go to https://resend.com
2. Sign up for an account
3. Verify your email address

### 1.2 Get API Key

1. Go to https://resend.com/api-keys
2. Click "Create API Key"
3. Name it "ConstructBid Production" (or similar)
4. Copy the API key (starts with `re_...`)
5. **Save it securely** - you won't be able to see it again

### 1.3 Add Domain (Recommended for Production)

For production, add your domain to Resend:

1. Go to https://resend.com/domains
2. Click "Add Domain"
3. Enter your domain (e.g., `constructbid.com`)
4. Add the required DNS records:

**DNS Records to Add:**

```
Type: TXT
Name: @ (or your domain)
Value: v=spf1 include:_spf.resend.com ~all

Type: CNAME
Name: resend._domainkey
Value: your-domain.resend.com (provided by Resend)
```

5. Verify the domain in Resend dashboard

## Step 2: Configure Supabase SMTP

### 2.1 Access Supabase Dashboard

1. Go to https://app.supabase.com
2. Select your ConstructBid project
3. Go to **Authentication** → **Providers** → **Email**

### 2.2 Configure Email Settings

In the Email provider settings:

**Enable Email Provider:**
- ✅ Enable Email provider

**Confirm Email:**
- ✅ Enable email confirmations

**SMTP Configuration:**

```
Host: smtp.resend.com
Port: 465
Username: resend
Password: [YOUR_RESEND_API_KEY]
```

**Important:** 
- Use your Resend API key as the password
- Do NOT include the `re_` prefix in the username
- Username should be exactly: `resend`

### 2.3 Configure Site URL

In **Authentication** → **URL Configuration**:

```
Site URL: https://your-domain.com (or http://localhost:3000 for development)
Redirect URLs: 
  - https://your-domain.com/**
  - http://localhost:3000/**
```

**Important:**
- Add both your production URL and localhost for development
- Include the `/**` wildcard to allow all redirect paths

### 2.4 Configure Email Templates (Optional)

You can customize email templates in **Authentication** → **Email Templates**

**Confirmation Email Template:**

```html
<h2>Welcome to ConstructBid</h2>
<p>Please verify your email address to activate your account.</p>
<p><a href="{{ .ConfirmationURL }}">Verify Email</a></p>
<p>This link expires according to Supabase Auth settings.</p>
<p>If you did not create this account, you can safely ignore this email.</p>
```

## Step 3: Environment Variables

### 3.1 Frontend Environment Variables

No changes needed for frontend. The existing variables are sufficient:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3.2 Backend/Supabase Configuration

The SMTP configuration is done in the Supabase dashboard, not in environment variables.

**Security Note:**
- Never put the Resend API key in frontend code
- Never commit the API key to Git
- Only configure it in the Supabase dashboard

## Step 4: Test Email Verification

### 4.1 Test Signup Flow

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Go to http://localhost:3000/signup

3. Create a new test account with a real email address

4. Check your email inbox for the verification email

5. Click the verification link

6. Verify you're redirected to the dashboard

### 4.2 Test Resend Verification

1. Sign up with another test account
2. Don't click the verification link immediately
3. Go to the "Verify Email" page
4. Click "Resend Verification Email"
5. Check that a new email arrives
6. Click the new verification link

### 4.3 Test Sign In After Verification

1. After verifying your email
2. Sign out
3. Sign in with the same credentials
4. Verify you can access the dashboard

## Step 5: Troubleshooting

### Emails Not Arriving

**Check:**
1. ✅ Resend API key is correct in Supabase
2. ✅ SMTP host is `smtp.resend.com`
3. ✅ SMTP port is `465`
4. ✅ Username is exactly `resend`
5. ✅ Email provider is enabled in Supabase

**Check Resend Dashboard:**
1. Go to https://resend.com/emails
2. Check if emails are being sent
3. Check for any error messages

### Verification Link Not Working

**Check:**
1. ✅ Site URL is configured correctly in Supabase
2. ✅ Redirect URLs include your domain
3. ✅ The verification link hasn't expired
4. ✅ You're clicking the link in the same browser where you signed up

**Common Issues:**
- Link expired: Request a new verification email
- Wrong domain: Update Site URL in Supabase
- Browser mismatch: Use the same browser for signup and verification

### "Email Already Verified" Error

This means the user has already verified their email. They should:
1. Go to the sign in page
2. Sign in with their credentials
3. They should be redirected to their dashboard

## Step 6: Production Deployment

### 6.1 Update Site URL

In Supabase dashboard, update the Site URL to your production domain:

```
Site URL: https://constructbid.com (or your actual domain)
```

### 6.2 Update Redirect URLs

Add your production domain to redirect URLs:

```
Redirect URLs:
  - https://constructbid.com/**
  - https://www.constructbid.com/**
```

### 6.3 Verify DNS Records

If using a custom domain with Resend:
1. Verify all DNS records are propagated
2. Check domain verification status in Resend
3. Test email delivery from production

## Step 7: Monitoring

### Monitor Email Delivery

1. **Resend Dashboard:** https://resend.com/emails
   - Check sent emails
   - Monitor delivery status
   - Check for bounces

2. **Supabase Logs:** 
   - Go to your project → Logs
   - Filter for authentication events
   - Check for email sending errors

### Monitor Verification Success

Track these metrics:
- Signup completion rate
- Email verification rate
- Time to verification
- Resend verification requests

## Security Checklist

- ✅ Resend API key stored only in Supabase dashboard
- ✅ API key not in frontend code
- ✅ API key not in Git repository
- ✅ API key not in environment variables
- ✅ Site URL configured correctly
- ✅ Redirect URLs configured correctly
- ✅ Email confirmations enabled
- ✅ DNS records configured (if using custom domain)

## Support

If you encounter issues:

1. **Resend Support:** https://resend.com/docs
2. **Supabase Support:** https://supabase.com/docs
3. **ConstructBid Issues:** Check the application logs

## Summary

After completing this setup:

1. ✅ Resend SMTP configured in Supabase
2. ✅ Email verification working reliably
3. ✅ Resend verification functionality implemented
4. ✅ Proper error handling for email issues
5. ✅ Cooldown to prevent spam
6. ✅ Clear user feedback throughout the process

Your ConstructBid application now has a robust email verification system with reliable delivery through Resend.
