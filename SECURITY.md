# Security Best Practices

This document outlines the security measures implemented in the LinkedIn Puzzle Tracker application.

## Authentication & Authorization

### LinkedIn OAuth 2.0
- Secure authentication via LinkedIn's OAuth 2.0 implementation
- OpenID Connect for verified identity
- Session-based authentication using NextAuth.js
- Secure session storage in PostgreSQL database
- 30-day session expiration with automatic refresh

### Session Management
- HTTP-only cookies prevent XSS attacks
- Secure flag enabled in production (HTTPS only)
- CSRF protection built into NextAuth
- Session tokens rotated on authentication

## Database Security

### SQL Injection Prevention
- **Prisma ORM** with parameterized queries
- All database queries use prepared statements
- No raw SQL queries with user input
- Input validation before database operations

### Data Access Control
- Row-level security via application logic
- Users can only access groups they're members of
- Admin role enforcement for group management
- Duplicate score prevention via unique constraints

### Unique Constraints
```prisma
// Prevents duplicate scores
@@unique([groupId, userId, game, date])

// Prevents duplicate memberships
@@unique([groupId, userId])
```

## Input Validation

### Zod Schema Validation
All user inputs are validated using Zod schemas:

```typescript
const createGroupSchema = z.object({
  name: z.string().min(1).max(100),
})

const addScoreSchema = z.object({
  groupId: z.string(),
  userId: z.string(),
  game: z.enum(["ZIP", "QUEENS"]),
  points: z.number().min(0).max(1),
  // ... more fields
})
```

### Server-Side Validation
- All form submissions validated on server
- Client-side validation as UX enhancement only
- Type safety enforced via TypeScript
- Sanitization of text inputs

## API Security

### Server Actions
- Next.js Server Actions prevent direct API exposure
- No client-side API keys or secrets
- Authentication checked on every action
- Rate limiting via middleware (to be implemented)

### Authorization Checks
Every server action verifies:
1. User is authenticated
2. User has permission to perform action
3. Data belongs to user's accessible groups
4. Input data is valid and sanitized

Example:
```typescript
export async function addScore(formData: FormData) {
  // 1. Check authentication
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  // 2. Validate input
  const data = addScoreSchema.parse(...)

  // 3. Check permissions
  const membership = await prisma.groupMember.findUnique({
    where: {
      groupId_userId: {
        groupId: data.groupId,
        userId: session.user.id,
      },
    },
  })
  
  if (!membership) {
    return { error: "You are not a member of this group" }
  }

  // 4. Perform action
  // ...
}
```

## Environment Variables

### Secrets Management
- All secrets stored in `.env` (never committed)
- `.env.example` for reference only
- Production secrets managed via hosting platform
- NEXTAUTH_SECRET generated with strong randomness

### Required Environment Variables
```bash
DATABASE_URL       # PostgreSQL connection string
NEXTAUTH_URL       # Application URL
NEXTAUTH_SECRET    # 32-byte random string
LINKEDIN_CLIENT_ID      # LinkedIn OAuth client ID
LINKEDIN_CLIENT_SECRET  # LinkedIn OAuth client secret
```

## Production Deployment

### HTTPS Required
- Force HTTPS in production
- Secure cookies only over HTTPS
- HSTS headers recommended

### Nginx Security Headers
```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
```

### Database Security
- Strong PostgreSQL passwords
- Dedicated database user with minimal permissions
- Database accessible only from application server
- Regular backups encrypted at rest

## Privacy

### Data Collection
- Minimal data collection (name, email, LinkedIn ID)
- No tracking or analytics by default
- Users control global leaderboard visibility
- Group data private by default

### Data Retention
- User data deleted on account deletion
- Scores retained in groups until group deletion
- Session data auto-expires after 30 days

## Known Limitations

### Rate Limiting
- Currently no rate limiting on server actions
- **Recommendation**: Implement rate limiting middleware
- Use Redis or in-memory store for rate limit tracking

### Password Reset
- No email/password authentication (LinkedIn only)
- Account recovery via LinkedIn only

### 2FA
- Not implemented (relies on LinkedIn's security)
- LinkedIn accounts should enable 2FA

## Reporting Security Issues

If you discover a security vulnerability, please email:
- **security@yourdomain.com**

Do not open public issues for security vulnerabilities.

## Security Checklist for Deployment

- [ ] Generate strong NEXTAUTH_SECRET
- [ ] Use strong PostgreSQL password
- [ ] Enable HTTPS with valid SSL certificate
- [ ] Set secure cookie flags in production
- [ ] Configure firewall to restrict database access
- [ ] Enable PostgreSQL SSL connections
- [ ] Set up regular database backups
- [ ] Configure nginx security headers
- [ ] Review and restrict CORS settings
- [ ] Enable application logging
- [ ] Set up monitoring and alerts
- [ ] Keep dependencies updated
- [ ] Review Prisma migrations before applying

## Dependencies

### Security Updates
```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Update dependencies
npm update
```

### Critical Dependencies
- `next-auth`: Authentication
- `@prisma/client`: Database ORM
- `zod`: Input validation
- `next`: Framework

Keep these updated regularly for security patches.

## Compliance

### GDPR Considerations
- Users can request data deletion
- Clear privacy policy recommended
- Cookie consent for EU users
- Data processing agreement with hosting provider

### Best Practices
- Regular security audits
- Dependency vulnerability scanning
- Code review for security issues
- Penetration testing before major releases

