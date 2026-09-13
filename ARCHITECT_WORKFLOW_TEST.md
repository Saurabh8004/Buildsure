# Architect Workflow - End-to-End Test Guide

## Prerequisites

Before testing, ensure:
1. Database migration `008_update_architect_requests_workflow.sql` has been executed
2. At least one client user exists
3. At least one architect user exists
5. Application is running (`npm run dev`)

---

## Test Scenario 1: Client Creates Project-Linked Request

### Step 1: Login as Client
1. Navigate to http://localhost:5173/signin
4. Login with client credentials
5. Verify redirect to /client dashboard

### Step 2: Create a Project (if needed)
1. Navigate to /client/projects/new
6. Fill in project details:
   - Title: "Test Project"
   - Location: "Lucknow"
   - Project Type: "Residential"
   - Area: 2400 sqft
   - Description: "Test project for architect services"
8. Click "Create Project"
5. Verify project is created and visible in project list

### Step 3: Navigate to Project Details
7. Click on the project from the project list
9. Verify project details page loads
10. Look for "Architect / Engineer Assistance" section
11. Click "Get Architect / Engineer Help" button

### Step 4: Submit Architect Request
1. Verify project context banner appears showing project title
3. Fill in the form:
   - Service Type: "Architectural Design"
   - Project Type: "Residential" (should be auto-filled)
   - Location: "Lucknow" (should be auto-filled)
   - Size: 2400 (should be auto-filled)
   - Description: "Need complete architectural design"
   - Timeline: "3 months"
   - Budget: "5-8 Lakhs"
   - Existing Drawings: "No"
   - Full Name: (auto-filled from user profile)
   - Email: (auto-filled from user profile)
   - Phone: "+91 9876543210"
   - Preferred Contact: "Email"
   - Additional Requirements: "Modern design with 2 bedrooms"
4. Click "Submit Service Request"
5. Verify success screen appears
6. Verify project info is shown in success screen
7. Verify Request ID is displayed
8. Verify "Back to Project" button is available

### Step 5: Verify Request in Project Detail
- Click "Back to Project" button
- Verify you're back on project details page
- Look for "Architect / Engineer Assistance" section
- Verify request appears with status "Submitted"

### Step 6: Verify Database
Run this SQL in Supabase SQL Editor:
```sql
SELECT 
  asr.id,
  asr.project_id,
  p.title as project_title,
  asr.client_id,
  u.full_name as client_name,
  asr.service_type,
  asr.status,
  asr.request_source,
  asr.created_at
FROM architect_service_requests asr
LEFT JOIN projects p ON asr.project_id = p.id
LEFT JOIN users u ON asr.client_id = u.id
ORDER BY asr.created_at DESC
LIMIT 5;
```

**Expected Results:**
- ✅ project_id is NOT NULL
- ✅ project_id matches the project you created
- ✅ client_id matches the logged-in client
- ✅ request_source = 'project'
- ✅ status = 'submitted'

---

## Test Scenario 2: Admin Assigns Architect

### Step 1: Login as Admin
1. Navigate to http://localhost:5173/signin
4. Login with admin credentials
5. Verify redirect to /admin dashboard

### Step 2: Navigate to Admin Requests
3. Navigate to /admin/requests
4. Verify the request from Test Scenario 1 appears
5. Verify project title is shown
6. Verify status is "Submitted"

### Step 3: Assign Architect
1. Look for "Assign Architect" section
2. Select an architect from the dropdown
3. Click "Assign" button
4. Verify loading spinner appears
5. Verify success message appears
7. Verify request status changes to "Matched"
8. Verify assigned architect is shown

### Step 4: Verify Database
Run this SQL:
```sql
SELECT 
  asr.id,
  asr.status,
  asr.assigned_architect_id,
  u.full_name as architect_name
FROM architect_service_requests asr
LEFT JOIN users u ON asr.assigned_architect_id = u.id
WHERE asr.id = 'your-request-id';
```

**Expected Results:**
- ✅ status = 'matched'
- ✅ assigned_architect_id is NOT NULL
- ✅ architect_name matches the selected architect

---

## Test Scenario 3: Architect Views and Accepts Request

### Step 1: Login as Architect
1. Navigate to http://localhost:5173/signin
4. Login with the architect credentials that was assigned
7. Verify redirect to /architect dashboard

### Step 2: View Service Requests
1. Verify the assigned request appears in the list
2. Verify project title is shown
3. Verify status is "Matched"
4. Verify project details are visible
5. Click "View Details" button

### Step 3: View Request Details
1. Verify all request details are visible:
   - Project information
   - Service details
   - Client information
   - Status and timeline
2. Look for action buttons
4. Click "Submit Proposal" button

### Step 4: Update Status
1. Verify status changes to "Proposals Received"
3. Click "Accept & Start Work" button
6. Verify status changes to "Accepted"
7. Click "Mark In Progress" button
9. Verify status changes to "In Progress"
10. Click "Mark Completed" button
11. Verify status changes to "Completed"

### Step 6: Verify Database
Run this SQL:
```sql
SELECT 
  id,
  status,
  assigned_architect_id,
  updated_at
FROM architect_service_requests
WHERE id = 'your-request-id';
```

**Expected Results:**
- ✅ status = 'completed'
- ✅ updated_at is recent

---

## Test Scenario 4: Client Views Request Status

### Step 1: Login as Client
1. Navigate to http://localhost:5173/signin
4. Login with the client credentials
7. Verify redirect to /client dashboard

### Step 2: Navigate to Project
3. Navigate to the project
4. Look for "Architect / Engineer Assistance" section
5. Verify request appears
6. Verify status shows "Completed"

---

## Test Scenario 5: Security Test

### Test 5.1: Client Cannot Access Other Client's Project
1. Login as Client A
3. Try to access /client/architect-services?projectId={client-b-project-id}
4. Verify error message appears: "You do not have access to this project."

### Test 5.2: Architect Cannot Access Unassigned Request
1. Login as Architect A
3. Try to access /architect/requests/{request-assigned-to-architect-b}
4. Verify request does not appear in list

### Test 5.3: RLS Verification
Run this SQL to verify RLS is working:
```sql
-- This should fail if RLS is working
SET ROLE TO 'authenticated';
SELECT * FROM architect_service_requests WHERE client_id != auth.uid();
```

**Expected Result:**
- ✅ Query should return 0 rows or error

---

## Test Scenario 6: Standalone Request (No Project)

### Step 1: Login as Client
1. Login as client
4. Navigate to /client/architect-services (without projectId)
6. If client has projects, verify project selection screen appears
7. If client has no projects, verify "Start New Project" option appears

### Step 2: Submit Standalone Request
1. Choose "Start New Project" or select existing project
3. Fill in the form
4. Submit request
5. Verify request is created
7. Verify request_source is 'standalone' or 'project'

---

## Test Checklist

### Database Tests
- [ ] Migration 008 executed successfully
- [ ] project_id column exists
- [ ] Indexes created
- [ ] RLS policies working

### Client Tests
- [ ] Client can create project
5. [ ] Client can access architect services from project
6. [ ] Project context banner appears
7. [ ] Form auto-populates with project data
8. [ ] Request submitted with project_id
9. [ ] Success screen shows project info
10. [ ] Request appears in project detail

### Admin Tests
- [ ] Admin can view all requests
- [ ] Admin can assign architect
- [ ] Status updates correctly
- [ ] Assigned architect is recorded

### Architect Tests
- [ ] Architect can view assigned requests
- [ ] Architect can update status
- [ ] Status workflow works correctly

### Security Tests
- [ ] Client cannot access other client's projects
- [ ] Architect cannot access unassigned requests
- [ ] RLS policies enforced

---

## Troubleshooting

### Issue: Project context banner not showing
**Solution:**
- Verify projectId is in URL
- Verify project exists
- Verify project belongs to logged-in client

### Issue: Request not appearing in admin
**Solution:**
- Verify request was created in database
- Verify admin is logged in
- Check browser console for errors

### Issue: Architect cannot see request
**Solution:**
- Verify request is assigned to this architect
- Verify architect is logged in
- Check RLS policies

### Issue: Status not updating
**Solution:**
- Check browser console for errors
- Verify user has permission to update
- Check database for errors

---

## Success Criteria

All tests pass:
- ✅ Database migration successful
- ✅ Client can create project-linked requests
- ✅ Admin can assign architects
- ✅ Architect can view and update requests
- ✅ Security is enforced
- ✅ Status workflow works correctly
- ✅ All data persists correctly

---

## Notes

- All tests should be performed in order
- Each test builds on the previous one
- Verify database state after each major test
- Check browser console for any errors
- Verify all data is correctly persisted

---

**Test Completion:** All tests should pass before marking the feature as complete.
