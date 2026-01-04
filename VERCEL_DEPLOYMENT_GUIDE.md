# Vercel Deployment Checklist for RECKE

## ✅ Pre-Deployment Checklist

### 1. Database Setup
- [ ] Create a PostgreSQL database (recommended: Supabase, Neon, or Vercel Postgres)
- [ ] Get the DATABASE_URL connection string
- [ ] Test connection locally by updating your `.env` file

### 2. LinkedIn OAuth Setup
- [ ] Go to https://www.linkedin.com/developers/apps
- [ ] Update your app's redirect URLs to include:
  - `https://your-app-name.vercel.app/api/auth/callback/linkedin`
  - Keep your localhost URL for development
- [ ] Get your `LINKEDIN_CLIENT_ID` and `LINKEDIN_CLIENT_SECRET`

### 3. NextAuth Configuration
- [ ] Generate a random secret for NEXTAUTH_SECRET:
  ```bash
  openssl rand -base64 32
  ```
- [ ] Set NEXTAUTH_URL to your Vercel domain

---

## 🔐 Environment Variables for Vercel

You need to add these in your Vercel project settings:

### Required Environment Variables:

```bash
# Database
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"

# NextAuth
NEXTAUTH_URL="https://your-app-name.vercel.app"
NEXTAUTH_SECRET="your-generated-secret-here"

# LinkedIn OAuth
LINKEDIN_CLIENT_ID="your-linkedin-client-id"
LINKEDIN_CLIENT_SECRET="your-linkedin-client-secret"
```

---

## 📝 Step-by-Step Deployment Guide

### Step 1: Prepare Your Database

**Option A: Supabase (Recommended - Free tier)**
1. Go to https://supabase.com
2. Create a new project
3. Go to Project Settings > Database
4. Copy the Connection String (URI mode)
5. Make sure to use the "Connection pooling" URL for better performance

**Option B: Neon (Serverless Postgres)**
1. Go to https://neon.tech
2. Create a new project
3. Copy the connection string

**Option C: Vercel Postgres**
1. In your Vercel project dashboard
2. Go to Storage tab
3. Create a new Postgres database
4. Connection string will be added automatically

### Step 2: Push Your Code to GitHub

```bash
# If not already initialized
git init
git add .
git commit -m "Initial commit - Ready for deployment"

# Create a GitHub repository and push
git remote add origin https://github.com/yourusername/recke.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy on Vercel

1. **Go to https://vercel.com/new**
2. **Import your GitHub repository**
3. **Configure Project:**
   - Framework Preset: Next.js
   - Root Directory: `./` (default)
   - Build Command: `next build` (default)
   - Output Directory: `.next` (default)

4. **Add Environment Variables:**
   - Click "Environment Variables"
   - Add all the variables listed above
   - Make sure to add them for all environments (Production, Preview, Development)

5. **Deploy:**
   - Click "Deploy"
   - Wait for the build to complete

### Step 4: Run Database Migrations

After the first deployment, you need to run migrations:

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link

# Run migrations on production database
vercel env pull .env.production
DATABASE_URL="your-production-database-url" npx prisma migrate deploy
```

**Or** use Vercel's interface:
1. Go to your project settings
2. Under "Functions" or "Deployments"
3. Add a build command that includes migration:
   ```
   npx prisma migrate deploy && next build
   ```

### Step 5: Update LinkedIn OAuth Redirect URL

1. Go to https://www.linkedin.com/developers/apps
2. Select your app
3. Go to "Auth" tab
4. Under "Redirect URLs", add:
   ```
   https://your-app-name.vercel.app/api/auth/callback/linkedin
   ```
5. Save changes

### Step 6: Test Your Deployment

1. Visit `https://your-app-name.vercel.app`
2. Try signing in with LinkedIn
3. Create a group
4. Invite a user
5. Add scores
6. Verify everything works

---

## ⚠️ Common Issues & Solutions

### Issue 1: Prisma Client Not Generated
**Error:** "Cannot find module '@prisma/client'"

**Solution:** The `postinstall` script in package.json should handle this, but if not:
- Check that `"postinstall": "prisma generate"` exists in package.json ✅ (You have this!)

### Issue 2: Database Connection Errors
**Error:** "Can't reach database server"

**Solution:**
- Make sure DATABASE_URL includes `?sslmode=require` for SSL connections
- Check that your database allows connections from Vercel's IP ranges
- For Supabase: Use the "Connection pooling" URL

### Issue 3: LinkedIn OAuth Not Working
**Error:** "Redirect URI mismatch"

**Solution:**
- Double-check the redirect URL in LinkedIn Developer Console
- Make sure NEXTAUTH_URL matches your Vercel domain exactly
- No trailing slash in NEXTAUTH_URL

### Issue 4: Build Fails
**Error:** Various build errors

**Solution:**
- Check Vercel build logs
- Make sure all dependencies are in `dependencies` not `devDependencies`
- Try building locally: `npm run build`

---

## 🚀 Post-Deployment

### Custom Domain (Optional)
1. Go to your Vercel project
2. Settings > Domains
3. Add your custom domain
4. Update NEXTAUTH_URL to your custom domain
5. Update LinkedIn OAuth redirect URL

### Environment Variables Management
- Never commit `.env` files to Git
- Use Vercel's environment variables interface
- For local development, create `.env.local`

### Monitoring
- Check Vercel Analytics for usage
- Monitor Vercel Logs for errors
- Set up error tracking (optional: Sentry)

---

## 📋 Environment Variables Checklist

Copy this template and fill in your values:

```bash
# =====================
# Database
# =====================
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"

# =====================
# NextAuth
# =====================
NEXTAUTH_URL="https://your-app-name.vercel.app"
NEXTAUTH_SECRET="your-generated-secret-from-openssl-rand-base64-32"

# =====================
# LinkedIn OAuth
# =====================
LINKEDIN_CLIENT_ID="your-linkedin-client-id"
LINKEDIN_CLIENT_SECRET="your-linkedin-client-secret"
```

---

## ✅ Ready to Deploy?

Your app is ready when:
- [x] Code is working locally ✅
- [x] All pages created ✅
- [x] Footer added to all pages ✅
- [x] Invitation system working ✅
- [x] Database migrations applied locally ✅
- [ ] PostgreSQL database created
- [ ] Environment variables prepared
- [ ] LinkedIn OAuth redirect URL updated
- [ ] Code pushed to GitHub

Once you check all these boxes, you're good to deploy! 🚀

