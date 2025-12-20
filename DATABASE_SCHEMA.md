# Database Schema Documentation - Samatta Foundation

## Overview

The Samatta Foundation uses a PostgreSQL database hosted on Supabase. All tables have Row-Level Security (RLS) enabled for security. This document describes all tables, their relationships, and usage.

---

## Database Tables

### 1. contacts

Stores contact form submissions from website visitors.

```sql
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  archived BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Columns:**
- `id`: Unique identifier
- `name`: Visitor's name (2-100 chars)
- `email`: Visitor's email address (validated)
- `phone`: Contact phone (optional)
- `subject`: Message subject (optional, max 200 chars)
- `message`: Main message content (required, 10-2000 chars)
- `read`: Admin read status flag
- `archived`: Admin archive flag
- `created_at`: Submission timestamp
- `updated_at`: Last update timestamp

**Indexes:**
```sql
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX idx_contacts_read ON contacts(read);
```

**RLS Policies:**
- `SELECT`: Public (anyone can view their own submissions via app)
- `INSERT`: Public (anyone can submit)
- `UPDATE`: Admin only
- `DELETE`: Admin only

---

### 2. donations

Tracks all donation transactions with payment status and details.

```sql
CREATE TABLE donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_name TEXT,
  donor_email TEXT NOT NULL,
  donor_phone TEXT,
  amount NUMERIC NOT NULL CHECK (amount > 0 AND amount <= 10000000),
  currency TEXT DEFAULT 'TZS',
  campaign TEXT,
  is_anonymous BOOLEAN DEFAULT FALSE,
  message TEXT,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'processing', 'completed', 'failed')),
  payment_method TEXT DEFAULT 'clickpesa',
  payment_reference TEXT UNIQUE,
  receipt_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Columns:**
- `id`: Unique donation ID
- `donor_name`: Donor's name (optional if anonymous, 2-100 chars)
- `donor_email`: Donor's email (required, for receipt)
- `donor_phone`: Donor's phone (optional)
- `amount`: Donation amount in smallest units (TZS cents)
- `currency`: Currency code (default: TZS)
- `campaign`: Which campaign/program donation is for (optional)
- `is_anonymous`: Hide donor's name from public records
- `message`: Optional message from donor
- `payment_status`: Current payment status
- `payment_method`: Payment gateway used (clickpesa, card, bank)
- `payment_reference`: Transaction ID from payment gateway
- `receipt_sent`: Whether receipt email was sent
- `created_at`: When donation was initiated
- `updated_at`: Last status update

**Indexes:**
```sql
CREATE INDEX idx_donations_email ON donations(donor_email);
CREATE INDEX idx_donations_status ON donations(payment_status);
CREATE INDEX idx_donations_reference ON donations(payment_reference);
CREATE INDEX idx_donations_created_at ON donations(created_at DESC);
CREATE INDEX idx_donations_campaign ON donations(campaign);
```

**RLS Policies:**
- `SELECT`: Public (own donations only via email)
- `INSERT`: Public
- `UPDATE`: Admin only
- `DELETE`: Admin only

**Payment Status Flow:**
```
pending
  ↓ (user proceeds to payment)
processing
  ↓ (payment gateway processes)
completed (or) failed
```

---

### 3. volunteers

Volunteer registration and management.

```sql
CREATE TABLE volunteers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  date_of_birth DATE,
  gender TEXT,
  location TEXT,
  skills TEXT,
  interests TEXT,
  availability TEXT,
  experience TEXT,
  why_volunteer TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Columns:**
- `id`: Unique volunteer ID
- `first_name`: First name (2-50 chars)
- `last_name`: Last name (2-50 chars)
- `email`: Email (unique, for contact)
- `phone`: Phone number (required)
- `date_of_birth`: Age verification (optional)
- `gender`: Self-identified gender (optional)
- `location`: City/region (optional)
- `skills`: List of skills and expertise
- `interests`: Areas of interest for volunteering
- `availability`: When they can volunteer
- `experience`: Previous volunteer experience
- `why_volunteer`: Motivation statement (required)
- `status`: Application status (pending/approved/rejected)
- `notes`: Admin notes on application
- `created_at`: Application submission date
- `updated_at`: Last status change

**Indexes:**
```sql
CREATE INDEX idx_volunteers_email ON volunteers(email UNIQUE);
CREATE INDEX idx_volunteers_status ON volunteers(status);
CREATE INDEX idx_volunteers_created_at ON volunteers(created_at DESC);
```

**RLS Policies:**
- `SELECT`: Public (own records only)
- `INSERT`: Public
- `UPDATE`: Admin only
- `DELETE`: Admin only

**Status Flow:**
```
pending → approved (or) rejected
          ↓
        contact volunteer
```

---

### 4. newsletter_subscribers

Email subscribers for newsletter campaigns.

```sql
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  unsubscribed_at TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,
  source TEXT, -- 'website', 'event', 'referral', etc.
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Columns:**
- `id`: Unique subscriber ID
- `email`: Email address (unique)
- `name`: Subscriber's name (optional)
- `subscribed_at`: Subscription date
- `unsubscribed_at`: Unsubscribe date (if applicable)
- `is_active`: Current subscription status
- `source`: How they subscribed
- `created_at`: Record creation date
- `updated_at`: Last update date

**Indexes:**
```sql
CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email UNIQUE);
CREATE INDEX idx_newsletter_active ON newsletter_subscribers(is_active);
CREATE INDEX idx_newsletter_created_at ON newsletter_subscribers(created_at DESC);
```

**RLS Policies:**
- `SELECT`: Admin only
- `INSERT`: Public
- `UPDATE`: Admin only
- `DELETE`: Public (own records only)

**Bounce Handling:**
- If SendGrid reports bounce, mark email as inactive
- Keep record for unsubscribe management

---

### 5. blog_posts

Published blog articles and news stories.

```sql
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image_url TEXT,
  author TEXT NOT NULL DEFAULT 'Samatta Foundation',
  category TEXT, -- 'news', 'impact', 'event', 'announcement'
  tags TEXT[], -- array of tags
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Columns:**
- `id`: Unique post ID
- `title`: Blog post title
- `slug`: URL-friendly slug (unique)
- `excerpt`: Short summary
- `content`: Full article content (markdown)
- `featured_image_url`: Hero image URL
- `author`: Author name/email
- `category`: Content category
- `tags`: Array of searchable tags
- `published`: Publication status
- `published_at`: Publishing timestamp
- `view_count`: Analytics tracking
- `created_at`: Creation date
- `updated_at`: Last edit date

**Indexes:**
```sql
CREATE INDEX idx_blog_slug ON blog_posts(slug UNIQUE);
CREATE INDEX idx_blog_published ON blog_posts(published, published_at DESC);
CREATE INDEX idx_blog_category ON blog_posts(category);
```

**RLS Policies:**
- `SELECT`: Public (published posts only)
- `INSERT`: Admin only
- `UPDATE`: Admin only
- `DELETE`: Admin only

---

### 6. programs

Information about foundation programs.

```sql
CREATE TABLE programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  image_url TEXT,
  icon TEXT, -- lucide-react icon name
  category TEXT, -- 'sports', 'education', 'community'
  beneficiaries TEXT,
  budget NUMERIC,
  status TEXT DEFAULT 'active', -- 'active', 'coming_soon', 'archived'
  published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Columns:**
- `id`: Program ID
- `title`: Program name
- `slug`: URL slug
- `description`: Short description
- `long_description`: Full program details
- `image_url`: Program image
- `icon`: Icon name for UI display
- `category`: Program category
- `beneficiaries`: Target beneficiaries
- `budget`: Annual budget
- `status`: Current status
- `published`: Visibility flag
- `created_at`: Creation date
- `updated_at`: Last update date

**Indexes:**
```sql
CREATE INDEX idx_programs_slug ON programs(slug UNIQUE);
CREATE INDEX idx_programs_published ON programs(published);
CREATE INDEX idx_programs_category ON programs(category);
```

---

### 7. gallery_images

Image gallery for portfolio/impact documentation.

```sql
CREATE TABLE gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  alt_text TEXT NOT NULL,
  category TEXT, -- 'events', 'programs', 'team', 'community'
  program_id UUID REFERENCES programs(id),
  uploaded_by TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  order_number INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Columns:**
- `id`: Image ID
- `title`: Image title
- `description`: Image description
- `image_url`: URL to image
- `alt_text`: Accessibility alt text
- `category`: Image category
- `program_id`: Associated program (if any)
- `uploaded_by`: Admin who uploaded
- `is_featured`: Feature in gallery
- `order_number`: Display order
- `created_at`: Upload date
- `updated_at`: Last update date

---

### 8. impact_metrics

Track foundation impact and progress.

```sql
CREATE TABLE impact_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name TEXT NOT NULL, -- 'youth_served', 'schools_reached', 'donations_received'
  metric_value NUMERIC NOT NULL,
  metric_unit TEXT, -- 'count', 'tsh', 'usd', 'kg', etc.
  time_period TEXT, -- 'monthly', 'yearly', 'cumulative'
  period_date DATE NOT NULL,
  program_id UUID REFERENCES programs(id),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Purpose:** Track KPIs and impact statistics for reporting.

---

## Database Relationships

```
programs (1) ──→ (many) donations
programs (1) ──→ (many) volunteers
programs (1) ──→ (many) gallery_images
programs (1) ──→ (many) impact_metrics

blog_posts (independent)
contacts (independent)
newsletter_subscribers (independent)
```

---

## Security Configuration

### Row-Level Security (RLS)

All tables have RLS enabled. Policies follow principle of least privilege:

```sql
-- Example RLS policy for donations
CREATE POLICY "Users can view own donations"
  ON donations FOR SELECT
  USING (auth.email() = donor_email);

CREATE POLICY "Anyone can insert donations"
  ON donations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can update any donation"
  ON donations FOR UPDATE
  USING (is_admin(auth.uid()));
```

### Database Backups

- **Automatic**: Daily backups maintained for 30 days
- **Manual**: Admin can trigger manual backup anytime
- **Retention**: Production backups kept for 90 days
- **Location**: Supabase secure infrastructure

### Encryption

- All connections use SSL/TLS encryption
- Sensitive data encrypted at rest
- API keys never logged or exposed

---

## Data Retention Policies

| Table | Retention | Notes |
|-------|-----------|-------|
| contacts | 2 years | Archived after 1 year |
| donations | Indefinite | Required for tax records |
| volunteers | 3 years | Active volunteers only |
| newsletter_subscribers | Until unsubscribe | Compliant with GDPR/CCPA |
| blog_posts | Indefinite | Archive old posts |
| programs | Indefinite | Core business data |
| gallery_images | Indefinite | Unless explicitly deleted |
| impact_metrics | Indefinite | Historical data important |

---

## Common Queries

### Get recent donations
```sql
SELECT * FROM donations
WHERE payment_status = 'completed'
ORDER BY created_at DESC
LIMIT 10;
```

### Count subscribers by source
```sql
SELECT source, COUNT(*) as count
FROM newsletter_subscribers
WHERE is_active = TRUE
GROUP BY source;
```

### Get volunteer applications by status
```sql
SELECT status, COUNT(*) as count
FROM volunteers
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY status;
```

### Blog post performance
```sql
SELECT title, view_count, published_at
FROM blog_posts
WHERE published = TRUE
ORDER BY view_count DESC;
```

### Program beneficiary reach
```sql
SELECT p.title, COUNT(v.id) as volunteers
FROM programs p
LEFT JOIN volunteers v ON p.id = v.program_id
GROUP BY p.id, p.title;
```

---

## Maintenance Tasks

### Weekly
- [ ] Check for email bounces
- [ ] Archive old contacts
- [ ] Verify backup completion

### Monthly
- [ ] Analyze database performance
- [ ] Review RLS policies
- [ ] Clean up unused images

### Quarterly
- [ ] Full database audit
- [ ] Update retention policies
- [ ] Performance optimization

---

## Troubleshooting

### Slow Queries
1. Check indexes using `EXPLAIN ANALYZE`
2. Add missing indexes
3. Optimize WHERE clauses
4. Use `LIMIT` for large result sets

### RLS Blocking Access
1. Verify user authentication
2. Check RLS policy conditions
3. Test policy manually in SQL editor
4. Enable RLS debugging

### Disk Space Issues
1. Check largest tables
2. Archive old records
3. Compress image storage
4. Contact Supabase support

---

## Development Workflow

### Setting Up Locally

```bash
# Install Supabase CLI
brew install supabase/tap/supabase

# Link to project
supabase link --project-ref=your_project_id

# Pull current schema
supabase db pull

# Create migration
supabase migration new add_new_table

# Apply migration
supabase migration up
```

### Deploying Schema Changes

```bash
# Create migration file
supabase migration new migration_name

# Test locally
supabase migration up

# Deploy to production
supabase migration up --linked
```

---

## Support

For database issues:
1. Check Supabase dashboard logs
2. Review RLS policies
3. Test queries in SQL editor
4. Contact: info@samattafoundation.org
