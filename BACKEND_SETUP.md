# BuildSure Backend Setup Guide

This guide explains how to set up the complete backend for BuildSure using Supabase.

## Overview

BuildSure uses **Supabase** as its backend, which provides:
- ✅ PostgreSQL database
- ✅ Authentication (secure password hashing, sessions)
- ✅ Row Level Security (RLS) for authorization
- ✅ File storage for documents
- ✅ Real-time subscriptions
- ✅ Edge functions (optional)

## Prerequisites

1. Node.js 18+ installed
2. A Supabase account (free tier available)

## Step 1: Create Supabase Project

1. Go to https://app.supabase.com
2. Click "New Project"
3. Fill in project details:
   - Name: `buildsure`
   - Database Password: (save this securely)
   - Region: Choose closest to your users
4. Wait for project to initialize (~2 minutes)

## Step 2: Get API Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (e.g., `https://abcdefg.supabase.co`)
   - **anon public key** (starts with `eyJ...`)

## Step 3: Configure Environment Variables

1. Create a `.env` file in the project root:

```bash
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

2. Replace the values with your actual Supabase credentials

## Step 4: Run Database Migration

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of `supabase/migrations/001_initial_schema.sql`
4. Paste it into the SQL editor
5. Click "Run" (or press Ctrl+Enter)

This will create:
- All database tables (users, profiles, projects, tenders, bids, etc.)
- Row Level Security policies
- Indexes for performance
- Triggers for auto-updating timestamps
- Auto-user creation on signup

## Step 5: Create Admin User

To create your first admin user:

1. Register a new user through the website
2. In Supabase dashboard, go to **Table Editor** → **users**
3. Find your user and change the `role` column to `admin`
4. Change `verification_status` to `verified`

## Step 6: Test the Setup

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Go to http://localhost:5173
3. Click "Get Started"
4. Register as a Client
5. You should be redirected to the dashboard

## Database Schema

### Tables Created

1. **users** - Core user accounts
   - Links to Supabase Auth
   - Stores role, verification status

2. **client_profiles** - Client-specific data
   - City, preferences, budget range

3. **contractor_profiles** - Contractor-specific data
   - Company info, experience, verification

4. **projects** - Construction projects
   - Owned by clients
   - Status tracking

5. **tenders** - Bidding opportunities
   - Linked to projects
   - Deadline management

6. **bids** - Contractor bids
   - Version control
   - Sealed bidding (RLS enforced)

7. **documents** - File metadata
   - Secure storage references
   - Verification tracking

8. **notifications** - User notifications
   - Read/unread status

9. **audit_logs** - System audit trail
   - All important actions logged

## Security Features

### Row Level Security (RLS)

All tables have RLS enabled with policies:

- **Users**: Can only view/edit their own profile
- **Projects**: Clients see only their projects; public sees active projects
- **Bids**: Contractors see only their bids; clients see bids after tender closes
- **Documents**: Users see only their documents
- **Audit Logs**: Users see own logs; admins see all

### Sealed Bidding

The bidding system enforces sealed bidding through RLS:
- During active bidding, contractors CANNOT see other contractors' bids
- Only after tender closes can the client view all bids
- This is enforced at the database level, not just frontend

### Authentication

- Passwords are hashed using Supabase Auth (bcrypt)
- Sessions are managed securely with JWT tokens
- Tokens are stored in httpOnly cookies
- Automatic token refresh

## API Usage

All database operations go through the Supabase client:

```typescript
import { supabase } from './lib/supabase';

// Example: Get current user's projects
const { data, error } = await supabase
  .from('projects')
  .select('*')
  .eq('client_id', userId);
```

The service layer (`src/lib/services.ts`) provides higher-level functions:

```typescript
import { projectService } from './lib/services';

// Create a project
const project = await projectService.createProject({
  client_id: userId,
  title: 'Residential Construction',
  project_type: 'residential',
  location: 'Lucknow',
  // ...
});
```

## File Storage (Optional)

To enable document uploads:

1. In Supabase dashboard, go to **Storage**
2. Create a new bucket: `documents`
3. Set it to **Private**
4. Add storage policies to allow authenticated users to upload

Then use the storage API:

```typescript
const { data, error } = await supabase.storage
  .from('documents')
  .upload(`users/${userId}/${fileName}`, file);
```

## Production Deployment

### Frontend

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy `dist/` folder to:
   - Vercel
   - Netlify
   - Any static hosting

3. Set environment variables in your hosting platform:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### Backend

Supabase is already production-ready. No additional backend deployment needed.

## Monitoring

### Database

- Supabase dashboard shows query performance
- Enable query logging in Settings → Database

### Authentication

- View active sessions in Authentication → Users
- Monitor failed login attempts

### Errors

- Check browser console for frontend errors
- Check Supabase logs in dashboard → Logs

## Troubleshooting

### "Failed to fetch" errors
- Check that `VITE_SUPABASE_URL` is correct
- Verify the project is active in Supabase

### "Permission denied" errors
- Check RLS policies are applied correctly
- Verify user is authenticated
- Check user role matches required permissions

### "User not found" errors
- Verify the user exists in `auth.users` AND `public.users`
- The trigger should auto-create the profile, but check if it's working

## Next Steps

1. ✅ Backend is set up
2. ✅ Authentication works
3. ✅ Database schema created
4. ✅ RLS policies enforced
5. ✅ Admin dashboard connected

Now you can:
- Create projects
- Submit bids
- Manage verification
- View audit logs
- Upload documents

## Support

- Supabase Docs: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com
- BuildSure Issues: Create an issue in your repository

---

**IMPORTANT**: Never commit `.env` file with real credentials to version control. Add it to `.gitignore`.
