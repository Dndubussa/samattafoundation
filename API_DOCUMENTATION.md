# API Documentation - Samatta Foundation

## Overview

The Samatta Foundation uses a REST API built with Supabase PostgreSQL and edge functions for backend services. All API interactions are handled through the centralized API layer in `src/lib/api.ts`.

---

## Authentication

All API requests use Supabase's client authentication with JWT tokens. The tokens are automatically managed by the Supabase client.

```typescript
import { supabase } from '@/lib/supabase'

// Authentication is handled automatically
const { data, error } = await supabase
  .from('table_name')
  .select('*')
```

---

## API Endpoints

### Contact Submissions

#### Create Contact
```typescript
POST /rest/v1/contacts

Request:
{
  "name": "string",
  "email": "string",
  "phone": "string (optional)",
  "subject": "string (optional)",
  "message": "string",
  "created_at": "timestamp (auto)"
}

Response:
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "message": "string",
  "created_at": "timestamp"
}
```

**Usage:**
```typescript
import { contactsApi } from '@/lib/api'

await contactsApi.create({
  name: 'John Doe',
  email: 'john@example.com',
  message: 'Your message here'
})
```

---

### Donations

#### Create Donation
```typescript
POST /rest/v1/donations

Request:
{
  "donor_name": "string",
  "donor_email": "string",
  "donor_phone": "string (optional)",
  "amount": "number (min: 1, max: 10000000)",
  "currency": "string (default: TZS)",
  "campaign": "string (optional)",
  "is_anonymous": "boolean",
  "message": "string (optional)",
  "payment_status": "string (pending|completed|failed)",
  "payment_method": "string (clickpesa)",
  "payment_reference": "string (transaction ID)",
  "created_at": "timestamp (auto)"
}

Response:
{
  "id": "uuid",
  "donor_email": "string",
  "amount": "number",
  "currency": "string",
  "payment_status": "string",
  "created_at": "timestamp"
}
```

**Usage:**
```typescript
import { donationsApi } from '@/lib/api'

const donation = await donationsApi.create({
  donor_name: 'Jane Donor',
  donor_email: 'jane@example.com',
  amount: 50000,
  currency: 'TZS',
  campaign: 'Education Program',
  payment_status: 'pending'
})
```

#### Update Donation Status
```typescript
PATCH /rest/v1/donations/:id

Request:
{
  "payment_status": "completed|failed",
  "payment_reference": "string (optional)"
}

Response:
{
  "id": "uuid",
  "payment_status": "string",
  "updated_at": "timestamp"
}
```

**Usage:**
```typescript
await donationsApi.updateStatus(donationId, 'completed')
```

#### Get Donation
```typescript
GET /rest/v1/donations/:id

Response:
{
  "id": "uuid",
  "donor_email": "string",
  "amount": "number",
  "currency": "string",
  "payment_status": "string",
  "created_at": "timestamp"
}
```

**Usage:**
```typescript
const donation = await donationsApi.get(donationId)
```

---

### Volunteers

#### Register Volunteer
```typescript
POST /rest/v1/volunteers

Request:
{
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "phone": "string",
  "date_of_birth": "date (optional)",
  "gender": "string (optional)",
  "location": "string (optional)",
  "skills": "string (optional)",
  "interests": "string (optional)",
  "availability": "string (optional)",
  "experience": "string (optional)",
  "why_volunteer": "string",
  "created_at": "timestamp (auto)"
}

Response:
{
  "id": "uuid",
  "email": "string",
  "first_name": "string",
  "status": "pending",
  "created_at": "timestamp"
}
```

**Usage:**
```typescript
import { volunteerApi } from '@/lib/api'

await volunteerApi.register({
  first_name: 'John',
  last_name: 'Volunteer',
  email: 'john@example.com',
  phone: '0712345678',
  why_volunteer: 'I want to make a difference'
})
```

---

### Newsletter

#### Subscribe
```typescript
POST /rest/v1/newsletter_subscribers

Request:
{
  "email": "string",
  "created_at": "timestamp (auto)"
}

Response:
{
  "id": "uuid",
  "email": "string",
  "created_at": "timestamp"
}
```

**Usage:**
```typescript
import { newsletterApi } from '@/lib/api'

await newsletterApi.subscribe(email)
```

---

### Blog Posts

#### Get Posts
```typescript
GET /rest/v1/blog_posts?limit=20&offset=0

Query Parameters:
- limit: number (default: 20)
- offset: number (default: 0)
- published: boolean (default: true)

Response:
{
  "posts": [
    {
      "id": "uuid",
      "title": "string",
      "slug": "string",
      "excerpt": "string",
      "content": "string",
      "featured_image_url": "string (optional)",
      "author": "string",
      "published_at": "timestamp",
      "created_at": "timestamp"
    }
  ],
  "total": "number"
}
```

**Usage:**
```typescript
import { blogApi } from '@/lib/api'

const posts = await blogApi.getPosts(20)
```

#### Get Post by Slug
```typescript
GET /rest/v1/blog_posts?slug=eq.post-slug

Response:
{
  "id": "uuid",
  "title": "string",
  "slug": "string",
  "content": "string",
  "featured_image_url": "string (optional)",
  "author": "string",
  "published_at": "timestamp"
}
```

**Usage:**
```typescript
const post = await blogApi.getBySlug('post-slug')
```

---

### Programs

#### Get Programs
```typescript
GET /rest/v1/programs?published=true

Response:
{
  "programs": [
    {
      "id": "uuid",
      "title": "string",
      "description": "string",
      "image_url": "string",
      "slug": "string",
      "published": "boolean"
    }
  ]
}
```

---

## Payment Integration (ClickPesa)

### Payment Flow

1. **Create Donation Record** (status: pending)
   ```typescript
   const donation = await donationsApi.create({
     donor_name: 'John Doe',
     donor_email: 'john@example.com',
     amount: 50000,
     currency: 'TZS',
     payment_status: 'pending'
   })
   ```

2. **Initialize ClickPesa Payment**
   ```typescript
   import { initializeClickPesa } from '@/lib/payment'
   
   const paymentUrl = initializeClickPesa({
     amount: 50000 * 100, // Convert to base units
     reference: donation.id,
     phone: '0712345678',
     email: 'john@example.com',
     name: 'John Doe',
     description: 'Donation to Samatta Foundation'
   })
   
   // Redirect user
   window.location.href = paymentUrl
   ```

3. **Handle Payment Callback**
   - ClickPesa redirects to callback URL with payment status
   - Webhook handler updates donation status in database
   - Email receipt sent to donor

4. **Verify Transaction**
   ```typescript
   import { verifyTransaction } from '@/lib/payment'
   
   const result = await verifyTransaction(paymentReference)
   if (result.status === 'completed') {
     // Payment successful
   }
   ```

### ClickPesa Test Cards

For testing in sandbox environment:
- **Visa**: 4532015112830366
- **MasterCard**: 5425233010103442
- **Expiry**: Any future date
- **CVV**: Any 3 digits

---

## Email Service (SendGrid)

### Email Types

#### Contact Confirmation
```typescript
import { sendContactConfirmation } from '@/lib/email'

await sendContactConfirmation({
  email: 'john@example.com',
  name: 'John Doe',
  subject: 'Thank you for your message'
})
```

#### Donation Receipt
```typescript
import { sendDonationReceipt } from '@/lib/email'

await sendDonationReceipt({
  email: 'john@example.com',
  name: 'John Doe',
  amount: 50000,
  currency: 'TZS',
  campaign: 'Education Program',
  date: new Date().toISOString()
})
```

#### Volunteer Welcome
```typescript
import { sendVolunteerWelcome } from '@/lib/email'

await sendVolunteerWelcome({
  email: 'john@example.com',
  name: 'John Doe',
  interests: 'Sports development'
})
```

#### Newsletter Welcome
```typescript
import { sendNewsletterWelcome } from '@/lib/email'

await sendNewsletterWelcome({
  email: 'john@example.com',
  name: 'John Doe'
})
```

---

## Error Handling

### Standard Error Response

```typescript
{
  "error": "Error message",
  "code": "error_code",
  "details": "Additional error details (optional)"
}
```

### Common Error Codes

| Code | Status | Meaning |
|------|--------|---------|
| `auth_error` | 401 | Authentication failed |
| `validation_error` | 400 | Validation failed |
| `not_found` | 404 | Resource not found |
| `duplicate_entry` | 409 | Duplicate email/entry |
| `server_error` | 500 | Server error |
| `network_error` | 503 | Network unavailable |

### Error Handling Example

```typescript
try {
  const result = await contactsApi.create(data)
} catch (error) {
  if (error.code === 'validation_error') {
    // Handle validation error
  } else if (error.code === 'duplicate_entry') {
    // Handle duplicate entry
  } else {
    // Handle other errors
  }
}
```

---

## Rate Limiting

API requests are limited per IP address:
- **Default**: 1000 requests per hour
- **Burst**: 100 requests per minute

Exceeding limits returns `429 Too Many Requests`

---

## Database Schema

### contacts table
```sql
id: uuid (primary key)
name: text
email: text
phone: text
subject: text
message: text
created_at: timestamp
```

### donations table
```sql
id: uuid (primary key)
donor_name: text
donor_email: text
donor_phone: text
amount: numeric
currency: text
campaign: text
is_anonymous: boolean
message: text
payment_status: text (pending|completed|failed)
payment_method: text
payment_reference: text
created_at: timestamp
updated_at: timestamp
```

### volunteers table
```sql
id: uuid (primary key)
first_name: text
last_name: text
email: text
phone: text
date_of_birth: date
gender: text
location: text
skills: text
interests: text
availability: text
experience: text
why_volunteer: text
status: text (pending|approved|rejected)
created_at: timestamp
```

### newsletter_subscribers table
```sql
id: uuid (primary key)
email: text (unique)
created_at: timestamp
unsubscribed_at: timestamp
```

### blog_posts table
```sql
id: uuid (primary key)
title: text
slug: text (unique)
excerpt: text
content: text
featured_image_url: text
author: text
published: boolean
published_at: timestamp
created_at: timestamp
updated_at: timestamp
```

---

## Supabase RLS Policies

All tables have Row-Level Security (RLS) enabled:

### contacts table
- **SELECT**: Public (anyone can create and view own)
- **INSERT**: Public
- **UPDATE**: Admin only
- **DELETE**: Admin only

### donations table
- **SELECT**: Public (own donations only)
- **INSERT**: Public
- **UPDATE**: Admin only
- **DELETE**: Admin only

### volunteers table
- **SELECT**: Public (own records only)
- **INSERT**: Public
- **UPDATE**: Admin only
- **DELETE**: Admin only

### newsletter_subscribers table
- **SELECT**: Admin only
- **INSERT**: Public
- **UPDATE**: Admin only
- **DELETE**: Public (own records)

---

## Example Usage

### Full Contact Form Flow

```typescript
import { contactsApi } from '@/lib/api'
import { sendContactConfirmation } from '@/lib/email'
import { contactFormSchema } from '@/lib/validations'

async function handleContactSubmit(formData) {
  try {
    // Validate form
    const validData = contactFormSchema.parse(formData)
    
    // Save to database
    const contact = await contactsApi.create(validData)
    
    // Send confirmation email
    await sendContactConfirmation({
      email: validData.email,
      name: validData.name,
      subject: 'Thank you for contacting us'
    })
    
    // Track event
    trackEvent('contact_form_submitted', {
      subject: validData.subject,
      timestamp: new Date().toISOString()
    })
    
    toast({
      title: 'Success',
      description: 'We received your message and will respond shortly.'
    })
  } catch (error) {
    toast({
      title: 'Error',
      description: 'Failed to submit. Please try again.',
      variant: 'destructive'
    })
  }
}
```

---

## Testing API Endpoints

### Using cURL

```bash
# Create contact
curl -X POST https://your-project.supabase.co/rest/v1/contacts \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Test message"
  }'

# Get donations
curl https://your-project.supabase.co/rest/v1/donations \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Accept: application/json"
```

### Using Postman

1. Import Supabase API collection
2. Set `apikey` header with your anon key
3. Set `Authorization` header for admin operations
4. Test endpoints

---

## Support

For API issues or questions:
- Check Supabase documentation: https://supabase.com/docs
- Review code examples in `src/lib/api.ts`
- Check browser console for error details
- Contact: info@samattafoundation.org
