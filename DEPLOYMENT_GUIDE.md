# Deployment Guide - Samatta Foundation

## Pre-Deployment Checklist

### Environment Configuration
- [ ] Create `.env.local` file in project root with all required variables (see [Environment Setup](#environment-setup))
- [ ] Verify all environment variables are set correctly
- [ ] ClickPesa merchant account verified and API key acquired
- [ ] SendGrid API key and email templates configured
- [ ] Supabase project credentials verified

### Code Quality
- [ ] Run `bun run lint` - all eslint errors fixed
- [ ] Run `bun run type-check` - no TypeScript errors
- [ ] Run `bun run test` - all tests passing
- [ ] Code reviewed and merged to main branch

### Build Verification
- [ ] Run `bun run build` successfully completes
- [ ] Build output in `dist/` folder verified
- [ ] No build warnings in console

### Testing
- [ ] All form validations tested manually
- [ ] Payment flow tested with ClickPesa sandbox
- [ ] Email notifications verified (contact, donation, volunteer)
- [ ] Social media links all working
- [ ] Mobile responsive design verified
- [ ] All images loading correctly

### Security
- [ ] No hardcoded credentials in code
- [ ] All sensitive data in environment variables
- [ ] CORS headers configured properly
- [ ] RLS policies enabled on all Supabase tables
- [ ] Database backups configured

---

## Environment Setup

### 1. Create `.env.local` file

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here

# Google Analytics
VITE_GA_TRACKING_ID=G-XXXXXXXXXX

# ClickPesa Payment Gateway
VITE_CLICKPESA_API_KEY=your_clickpesa_api_key
VITE_CLICKPESA_MERCHANT_ID=your_merchant_id

# SendGrid Email Service
VITE_SENDGRID_API_KEY=your_sendgrid_api_key
VITE_SENDGRID_FROM_EMAIL=noreply@samattafoundation.org
```

### 2. Obtain Required Credentials

#### Supabase
1. Go to [supabase.com](https://supabase.com)
2. Create a project or use existing one
3. Navigate to Settings → API
4. Copy Project URL and Anon Key

#### ClickPesa
1. Visit [clickpesa.com](https://clickpesa.com)
2. Sign up as a merchant
3. Complete merchant verification
4. Go to Integration settings
5. Get your API Key and Merchant ID

#### SendGrid
1. Go to [sendgrid.com](https://sendgrid.com)
2. Create account and verify domain
3. Navigate to Settings → API Keys
4. Create new API Key (keep it secure)
5. Create/verify email templates

#### Google Analytics
1. Go to [analytics.google.com](https://analytics.google.com)
2. Create property for your domain
3. Copy Tracking ID (format: G-XXXXXXXXXX)

---

## Deployment Methods

### Option 1: Vercel (Recommended)

#### Initial Setup
```bash
# Install Vercel CLI
bun install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

#### Configure Environment Variables in Vercel
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to Settings → Environment Variables
4. Add all variables from `.env.local`
5. Make sure they're available in Production, Preview, and Development

#### Configure Deployment Settings
1. Go to Settings → Build & Development Settings
2. Framework: Vite
3. Build Command: `bun run build`
4. Output Directory: `dist`
5. Install Command: `bun install --frozen-lockfile`

#### Setup Automatic Deployments
1. Go to Settings → Git
2. Connect your GitHub repository
3. Set Production Branch: `main`
4. Set Preview Deployments: Auto
5. Enable Ignored Build Step (optional)

### Option 2: Docker

```dockerfile
# Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
RUN npm install -g bun

COPY . .
RUN bun install --frozen-lockfile
RUN bun run build

FROM node:20-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

Deploy:
```bash
docker build -t samatta-foundation .
docker run -p 3000:3000 -e PORT=3000 samatta-foundation
```

### Option 3: Netlify

```bash
# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

Create `netlify.toml`:
```toml
[build]
  command = "bun run build"
  functions = "netlify/functions"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## GitHub Actions CI/CD

The repository includes automated CI/CD pipeline (`.github/workflows/ci.yml`):

1. **Code Quality Check**: Runs ESLint and TypeScript checks
2. **Build Verification**: Ensures production build completes
3. **Security Scan**: Checks for vulnerable dependencies
4. **Deploy to Staging**: Auto-deploys develop branch to staging
5. **Deploy to Production**: Auto-deploys main branch to production
6. **Lighthouse Audit**: Runs performance audit on PRs

### Setup GitHub Secrets

Add these to your repository settings (Settings → Secrets → Actions):

```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
VITE_GA_TRACKING_ID
VITE_CLICKPESA_API_KEY
VITE_CLICKPESA_MERCHANT_ID
VITE_SENDGRID_API_KEY
VERCEL_TOKEN (if using Vercel)
VERCEL_ORG_ID
VERCEL_PROJECT_ID
```

---

## Post-Deployment

### 1. Verify Deployment
- [ ] Visit your live URL
- [ ] Check hero section loads correctly
- [ ] Test all navigation links
- [ ] Verify Google Analytics tracking
- [ ] Test one donation flow (use ClickPesa test cards)
- [ ] Submit test contact form
- [ ] Check email notifications received

### 2. Monitor Performance
- [ ] Check Lighthouse score (target: 90+)
- [ ] Monitor Core Web Vitals
- [ ] Set up error tracking (Sentry recommended)
- [ ] Monitor database performance in Supabase dashboard

### 3. Setup Monitoring & Alerts
```bash
# Install Sentry for error tracking
bun add @sentry/react @sentry/tracing

# Setup in main.tsx:
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: import.meta.env.MODE,
  tracesSampleRate: 1.0,
});
```

### 4. Database Backups
In Supabase Dashboard:
1. Go to Settings → Backups
2. Enable automatic backups
3. Set retention period (30 days minimum)

### 5. Setup Custom Domain
For Vercel:
1. Go to Project Settings → Domains
2. Add custom domain
3. Follow DNS configuration steps
4. Enable HTTPS (automatic)

For Netlify:
1. Go to Domain Settings
2. Add custom domain
3. Update DNS records
4. Verify

---

## Rollback Procedure

### If Deployment Fails

#### Vercel
1. Go to Deployments
2. Select previous stable deployment
3. Click "Promote to Production"

#### GitHub
1. Revert commit: `git revert <commit-hash>`
2. Push to main: `git push origin main`
3. GitHub Actions will automatically redeploy

#### Manual
1. Restore from backup: Check Supabase backups
2. Downgrade: Redeploy previous build
3. Check logs for errors

---

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules dist
bun install --frozen-lockfile
bun run build
```

### Payment Not Working
1. Check ClickPesa API key in environment
2. Verify merchant status on ClickPesa dashboard
3. Check browser console for errors
4. Ensure Supabase tables have correct schema

### Emails Not Sending
1. Verify SendGrid API key
2. Check email templates are created in SendGrid
3. Verify sender email is whitelisted
4. Check SendGrid activity log for bounces

### Database Connection Issues
1. Check Supabase status page
2. Verify connection string in `.env.local`
3. Check firewall rules allow your IP
4. Verify RLS policies aren't blocking access

### Performance Issues
1. Check database query performance in Supabase
2. Verify images are optimized
3. Check if caching is working
4. Run Lighthouse audit

---

## Monitoring Checklist

### Daily
- [ ] Check error logs (Sentry/browser console)
- [ ] Monitor website uptime
- [ ] Check database usage

### Weekly
- [ ] Review analytics
- [ ] Check performance metrics
- [ ] Review new issues/PRs

### Monthly
- [ ] Security audit
- [ ] Backup verification
- [ ] Dependency updates
- [ ] Cost analysis

---

## Support & Contact

For deployment issues:
1. Check error logs in Vercel/Netlify dashboard
2. Review GitHub Actions workflow runs
3. Check Supabase dashboard for database issues
4. Contact: info@samattafoundation.org
