# Quick Start Guide

Get your LinkedIn Puzzle Tracker up and running in minutes!

## Prerequisites

- Node.js 18+ installed
- PostgreSQL installed and running
- LinkedIn Developer account

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up LinkedIn OAuth

1. Go to https://www.linkedin.com/developers/apps
2. Click "Create app"
3. Fill in app details:
   - **App name**: LinkedIn Puzzle Tracker
   - **LinkedIn Page**: Your company page or personal page
   - **App logo**: Upload any logo
4. In the "Auth" tab:
   - Add redirect URL: `http://localhost:3000/api/auth/callback/linkedin`
   - Select scopes: `openid`, `profile`, `email`
5. Copy your **Client ID** and **Client Secret**

## Step 3: Create Database

```bash
# Create PostgreSQL database
createdb linkedin_puzzle_tracker

# Or using psql
psql -U postgres
CREATE DATABASE linkedin_puzzle_tracker;
\q
```

## Step 4: Configure Environment

Create a `.env` file:

```bash
# Generate secret
export NEXTAUTH_SECRET=$(openssl rand -base64 32)

# Create .env file
cat > .env << EOF
DATABASE_URL="postgresql://postgres:password@localhost:5432/linkedin_puzzle_tracker?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="$NEXTAUTH_SECRET"
LINKEDIN_CLIENT_ID="your-client-id-from-step-2"
LINKEDIN_CLIENT_SECRET="your-client-secret-from-step-2"
EOF
```

**Update the values:**
- Replace `postgres:password` with your PostgreSQL credentials
- Add your LinkedIn Client ID and Secret

## Step 5: Set Up Database Schema

```bash
npx prisma migrate dev --name init
```

## Step 6: Run the Application

```bash
npm run dev
```

Open http://localhost:3000 in your browser!

## First Steps in the App

1. **Sign In**: Click "Sign in with LinkedIn"
2. **Create a Group**: Click "Create Group" and name it
3. **Invite Colleagues**: 
   - Ask colleagues to sign in first
   - Click "Invite" in your group
   - Enter their email (must match LinkedIn email)
4. **Add Scores**:
   - Click "Add Scores" 
   - Select game (Zip or Queens)
   - Enter points for each player
   - Add time/backtracks for tie-breaking

## Troubleshooting

### "Database connection failed"
- Make sure PostgreSQL is running: `pg_isready`
- Check DATABASE_URL in `.env`
- Verify database exists: `psql -l`

### "LinkedIn authentication failed"
- Verify redirect URL matches exactly: `http://localhost:3000/api/auth/callback/linkedin`
- Check Client ID and Secret in `.env`
- Ensure OAuth scopes are enabled in LinkedIn app

### "User not found" when inviting
- User must sign in to the app first before receiving invitations
- Email must match their LinkedIn email exactly

### Port 3000 already in use
```bash
# Use different port
PORT=3001 npm run dev
# Update NEXTAUTH_URL and LinkedIn redirect URL accordingly
```

## Development Tools

### Prisma Studio (Database GUI)
```bash
npx prisma studio
```
Opens at http://localhost:5555

### View Logs
All server actions log errors to console. Check terminal for:
```
Error creating group: ...
Error inviting user: ...
```

### Reset Database (Development Only)
```bash
npx prisma migrate reset
```
⚠️ This deletes all data!

## Production Deployment

See [README.md](README.md#production-deployment-hetzner) for detailed Hetzner deployment instructions.

### Quick Production Checklist

- [ ] Update `NEXTAUTH_URL` to production domain
- [ ] Add production redirect URL in LinkedIn app
- [ ] Use strong PostgreSQL password
- [ ] Enable HTTPS/SSL
- [ ] Set up Nginx reverse proxy
- [ ] Configure firewall
- [ ] Set up PM2 for process management
- [ ] Enable automatic backups

## Common Use Cases

### Two-Player Competition
Perfect for 1v1 competition:
- Leaderboard shows head-to-head
- Trends tab shows lead changes
- See who's closing the gap

### Team Tournament
Multiple players in one group:
- Group leaderboard ranks all players
- Separate Zip and Queens leaderboards
- Track team statistics

### Multiple Groups
One user in different groups:
- Work team group
- Friends group
- Family group
Each group has separate scores and rankings

## Tips

- **Daily Entry**: Enter scores right after playing for best tracking
- **Tie-breaking**: Always enter time/backtracks when players tie
- **Global Leaderboard**: Opt-in to compete with all users
- **History**: View last 50 games in History tab
- **Trends**: Shows last 30 days of cumulative scores

## Need Help?

- Check [README.md](README.md) for detailed documentation
- Review [SECURITY.md](SECURITY.md) for security best practices
- Open an issue on GitHub

Happy tracking! 🎮📊

