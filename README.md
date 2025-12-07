# LinkedIn Puzzle Tracker

A web application to track LinkedIn puzzle game scores (Zip and Queens) with colleagues. Built with Next.js, TypeScript, PostgreSQL, and LinkedIn OAuth.

## Features

- 🎮 **Dual Game Tracking**: Separate scoring for Zip and Queens puzzles
- 👥 **Group Management**: Create multiple groups to compete with different colleagues
- 📊 **Leaderboards**: View group-specific and optional global leaderboards
- 📈 **Trend Analysis**: Visualize score progression and lead changes over time
- 🔒 **Privacy First**: Private groups with opt-in global leaderboard
- 🚫 **Duplicate Prevention**: Automatic detection of duplicate score entries
- 🔐 **Secure Authentication**: LinkedIn OAuth 2.0 integration

## Tech Stack

- **Frontend**: Next.js 14+ (App Router), React, TypeScript
- **Backend**: Next.js Server Actions
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with LinkedIn OAuth
- **UI**: Tailwind CSS, shadcn/ui components
- **Charts**: Recharts for trend visualization
- **Security**: Input validation with Zod, parameterized queries, session management

## Prerequisites

- Node.js 18+ 
- PostgreSQL database
- LinkedIn Developer Account for OAuth credentials

## Setup Instructions

### 1. Clone and Install Dependencies

\`\`\`bash
cd recke
npm install
\`\`\`

### 2. Database Setup

Create a PostgreSQL database:

\`\`\`bash
createdb linkedin_puzzle_tracker
\`\`\`

### 3. LinkedIn OAuth Setup

1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/apps)
2. Create a new app
3. Add redirect URL: \`http://localhost:3000/api/auth/callback/linkedin\` (for development)
4. For production, add: \`https://yourdomain.com/api/auth/callback/linkedin\`
5. Enable OpenID Connect in OAuth 2.0 settings
6. Copy Client ID and Client Secret

### 4. Environment Variables

Create a \`.env\` file in the root directory:

\`\`\`bash
# Database
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/linkedin_puzzle_tracker?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"  # Change to your domain in production
NEXTAUTH_SECRET="your-secret-key"  # Generate with: openssl rand -base64 32

# LinkedIn OAuth
LINKEDIN_CLIENT_ID="your-linkedin-client-id"
LINKEDIN_CLIENT_SECRET="your-linkedin-client-secret"
\`\`\`

**Generate NEXTAUTH_SECRET:**
\`\`\`bash
openssl rand -base64 32
\`\`\`

### 5. Database Migration

Run Prisma migrations to create database tables:

\`\`\`bash
npx prisma migrate dev --name init
\`\`\`

### 6. Generate Prisma Client

\`\`\`bash
npx prisma generate
\`\`\`

### 7. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Production Deployment (Hetzner)

### 1. Server Setup

\`\`\`bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PostgreSQL
sudo apt-get install postgresql postgresql-contrib

# Install PM2 for process management
sudo npm install -g pm2
\`\`\`

### 2. Database Setup

\`\`\`bash
sudo -u postgres createuser -P appuser
sudo -u postgres createdb -O appuser linkedin_puzzle_tracker
\`\`\`

### 3. Application Deployment

\`\`\`bash
# Clone and install
git clone <your-repo>
cd recke
npm install

# Set up environment variables
nano .env  # Add production values

# Run migrations
npx prisma migrate deploy

# Build application
npm run build

# Start with PM2
pm2 start npm --name "puzzle-tracker" -- start
pm2 save
pm2 startup
\`\`\`

### 4. Nginx Configuration

\`\`\`nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
\`\`\`

### 5. SSL with Certbot

\`\`\`bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
\`\`\`

## Database Schema

### Key Models

- **User**: LinkedIn authenticated users
- **Group**: Competition groups
- **GroupMember**: User membership in groups
- **Invitation**: Group invitations
- **Score**: Individual game scores with duplicate prevention
- **Account/Session**: NextAuth session management

### Security Features

- Unique constraints prevent duplicate scores (user + group + game + date)
- Row-level validation ensures users can only access their groups
- Parameterized queries prevent SQL injection
- Input validation with Zod schemas
- CSRF protection via NextAuth
- Secure session management

## Usage

### Creating a Group

1. Sign in with LinkedIn
2. Click "Create Group" on dashboard
3. Invite colleagues by email

### Adding Scores

1. Navigate to a group
2. Click "Add Scores"
3. Select game (Zip or Queens)
4. Enter scores for all players
5. Optionally add time and backtracks for tie-breaking

### Viewing Trends

- **Leaderboard Tab**: See current standings
- **Trends Tab**: Visualize score progression over 30 days
- **History Tab**: View detailed score entries

### Global Leaderboard

1. Click "Global Leaderboard" in header
2. Check "Include my scores" to opt-in
3. Compete with all users who opted in

## API Endpoints

All endpoints are implemented as Next.js Server Actions:

- `createGroup()` - Create a new group
- `inviteUserToGroup()` - Send group invitation
- `acceptInvitation()` / `declineInvitation()` - Handle invites
- `addScore()` - Add individual score
- `addBulkScores()` - Add scores for all players at once
- `getGroupScores()` - Fetch group score history
- `getGlobalLeaderboard()` - Fetch global rankings

## Development Commands

\`\`\`bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Prisma Studio (database GUI)
npx prisma studio

# Reset database (development only)
npx prisma migrate reset
\`\`\`

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.

