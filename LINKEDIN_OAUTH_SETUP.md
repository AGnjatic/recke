# LinkedIn OAuth Setup Guide

## Step-by-Step LinkedIn Developer App Configuration

### 1. Create LinkedIn App

1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/apps)
2. Click **"Create app"**
3. Fill in required details:
   - **App name**: LinkedIn Puzzle Tracker
   - **LinkedIn Page**: Select or create a LinkedIn page (required)
   - **Privacy policy URL**: Your website or use a placeholder
   - **App logo**: Upload any logo (256x256px minimum)
   - **Legal agreement**: Check the box
4. Click **"Create app"**

### 2. Configure OAuth Settings

#### Products Tab
1. In your app dashboard, go to the **"Products"** tab
2. Request access to **"Sign In with LinkedIn using OpenID Connect"**
3. Click **"Request access"** 
4. Wait for approval (usually instant for OpenID Connect)

#### Auth Tab
1. Go to the **"Auth"** tab
2. Under **"OAuth 2.0 settings"**:

   **Redirect URLs** - Add these:
   - Development: `http://localhost:3000/api/auth/callback/linkedin`
   - Production: `https://yourdomain.com/api/auth/callback/linkedin`

3. Under **"OAuth 2.0 scopes"**, verify these are enabled:
   - ✅ `openid` (required)
   - ✅ `profile` (required)
   - ✅ `email` (required)

#### Application credentials
1. Copy your **"Client ID"**
2. Copy your **"Client Secret"** (click to reveal)
3. Add these to your `.env` file:

```env
LINKEDIN_CLIENT_ID="your-client-id-here"
LINKEDIN_CLIENT_SECRET="your-client-secret-here"
```

### 3. Common Issues & Solutions

#### Error: "invalid_scope_error"

**Cause**: The OAuth scopes are not enabled in your LinkedIn app.

**Solution**:
1. Go to **Products** tab in LinkedIn Developer dashboard
2. Make sure **"Sign In with LinkedIn using OpenID Connect"** is approved
3. If not approved, click "Request access" and wait
4. Verify the **Auth** tab shows `openid`, `profile`, `email` scopes

#### Error: "redirect_uri_mismatch"

**Cause**: The redirect URL in your app doesn't match LinkedIn settings.

**Solution**:
1. Check your redirect URL in LinkedIn app matches exactly:
   - `http://localhost:3000/api/auth/callback/linkedin` (development)
   - `https://yourdomain.com/api/auth/callback/linkedin` (production)
2. No trailing slashes
3. Protocol must match (http vs https)

#### Error: "unauthorized_client"

**Cause**: Client ID or Client Secret is incorrect.

**Solution**:
1. Double-check credentials in `.env` file
2. No extra spaces or quotes
3. Regenerate Client Secret if needed (in LinkedIn app Auth tab)

#### Error: "access_denied"

**Cause**: User denied permission or app is not approved.

**Solution**:
1. User needs to click "Allow" when prompted
2. Ensure OpenID Connect product is approved in Products tab

### 4. Testing the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000`

3. Click "Sign in with LinkedIn"

4. You should be redirected to LinkedIn

5. Grant permissions when prompted

6. You should be redirected back and logged in

### 5. Verify Configuration Checklist

Before testing, verify:

- [ ] LinkedIn app created
- [ ] "Sign In with LinkedIn using OpenID Connect" product approved
- [ ] Redirect URL added: `http://localhost:3000/api/auth/callback/linkedin`
- [ ] Scopes enabled: `openid`, `profile`, `email`
- [ ] Client ID copied to `.env`
- [ ] Client Secret copied to `.env`
- [ ] `.env` file in project root
- [ ] Database created and migrated
- [ ] Development server running

### 6. Environment Variables Format

Your `.env` file should look like this:

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/linkedin_puzzle_tracker"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-generated-secret-from-openssl"

# LinkedIn OAuth (from LinkedIn Developer App)
LINKEDIN_CLIENT_ID="78xxxxxxxxxxxxx"
LINKEDIN_CLIENT_SECRET="WPxxxxxxxxxxxxxxxxxxxxxxxx"
```

### 7. Production Deployment

When deploying to production:

1. **Update LinkedIn App**:
   - Add production redirect URL: `https://yourdomain.com/api/auth/callback/linkedin`

2. **Update Environment Variables**:
   ```env
   NEXTAUTH_URL="https://yourdomain.com"
   ```

3. **Ensure HTTPS**:
   - LinkedIn requires HTTPS for production
   - Set up SSL certificate (Let's Encrypt/Certbot)

### 8. Debugging Tips

#### Enable Debug Mode

Add to `.env`:
```env
NEXTAUTH_DEBUG=true
```

Check terminal for detailed auth logs.

#### Check Network Tab

In browser DevTools:
1. Open Network tab
2. Try signing in
3. Look for failed requests
4. Check request/response headers

#### Common Environment Variable Issues

```bash
# Bad (spaces around equals)
LINKEDIN_CLIENT_ID = "123456"

# Bad (missing quotes with special chars)
LINKEDIN_CLIENT_SECRET=abc123!@#

# Good
LINKEDIN_CLIENT_ID="123456"
LINKEDIN_CLIENT_SECRET="abc123!@#"
```

### 9. Getting Help

If you're still having issues:

1. Check NextAuth.js docs: https://next-auth.js.org/providers/linkedin
2. Check LinkedIn API docs: https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/sign-in-with-linkedin
3. Verify all credentials are correct
4. Try regenerating Client Secret
5. Make sure app isn't in "Draft" mode

### 10. LinkedIn App Approval Timeline

- **OpenID Connect**: Usually instant (auto-approved)
- **Other products**: May require manual review (1-7 days)

For this app, you only need OpenID Connect, which should be instant.

---

## Quick Troubleshooting Commands

```bash
# Check if .env is loaded
echo $LINKEDIN_CLIENT_ID

# Restart dev server (after .env changes)
# Stop server (Ctrl+C) then:
npm run dev

# Check database connection
npx prisma studio

# Check for syntax errors
npm run lint
```

---

## Success Indicators

You'll know it's working when:
1. ✅ No errors in terminal after clicking "Sign in with LinkedIn"
2. ✅ Redirected to LinkedIn login page
3. ✅ Permission screen shows correct app name
4. ✅ Redirected back to your app
5. ✅ Logged in and see dashboard

Good luck! 🚀

