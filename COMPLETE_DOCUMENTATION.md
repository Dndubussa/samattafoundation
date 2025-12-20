# Samatta Foundation - Complete Project Documentation

## Quick Links

- **Live Site**: https://samattafoundation.org (when deployed)
- **GitHub Repo**: https://github.com/samattafoundation/website
- **Admin Dashboard**: https://admin.samattafoundation.org (coming soon)
- **API Documentation**: See [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
- **Database Schema**: See [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md)
- **Deployment Guide**: See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

---

## Project Overview

The Samatta Foundation website is a modern, responsive web application built with React, TypeScript, and Tailwind CSS. It serves as the primary digital presence for the Samatta Foundation, a Tanzanian organization focused on youth empowerment through sports, education, and community development.

### Core Features

✅ **Donation System**: Integrated with ClickPesa for secure payment processing in Tanzania
✅ **Volunteer Management**: Complete volunteer registration and tracking system
✅ **Newsletter**: Email subscription with automated SendGrid integration
✅ **Contact Forms**: Multi-channel communication with automatic email confirmations
✅ **Blog Platform**: Dynamic blog with SEO optimization
✅ **Program Showcase**: Detailed program information and impact metrics
✅ **Gallery**: Image gallery showcasing foundation activities
✅ **Analytics**: Google Analytics integration for tracking user behavior
✅ **Mobile Responsive**: Fully responsive design for all devices
✅ **Accessibility**: WCAG 2.1 AA compliance with 30+ ARIA labels
✅ **Error Handling**: Comprehensive error boundaries and recovery
✅ **Type Safety**: 100% TypeScript with strict mode enabled

---

## Technology Stack

### Frontend
- **React 18.3.1**: Modern UI library with hooks
- **TypeScript 5.8.3**: Type-safe JavaScript development
- **Vite 5.4.19**: Lightning-fast build tool with HMR
- **Tailwind CSS 3.4.17**: Utility-first CSS framework
- **shadcn/ui**: Accessible component library built on Radix UI
- **React Router v6**: Client-side routing

### State Management & Data Fetching
- **TanStack React Query v5**: Server state management with caching
- **React Hook Form**: Efficient form handling
- **Zod**: Runtime type validation for forms

### Backend & Database
- **Supabase**: PostgreSQL database with real-time capabilities
- **ClickPesa API**: Payment processing for Tanzania
- **SendGrid**: Transactional email service

### Development & Quality
- **ESLint**: Code quality analysis
- **TypeScript Strict Mode**: Enhanced type checking
- **Vitest**: Unit testing framework
- **GitHub Actions**: CI/CD pipeline

### Deployment
- **Vercel**: Primary deployment platform
- **Docker**: Container support for alternative deployments
- **Netlify**: Alternative deployment option

---

## Project Structure

```
samattafoundation/
├── .github/
│   └── workflows/
│       ├── ci.yml                 # GitHub Actions CI/CD pipeline
│       └── lighthouse.json        # Performance audit config
├── public/
│   ├── blog-images/              # Blog post images
│   ├── manifest.json             # PWA manifest
│   ├── robots.txt               # SEO robots file
│   └── sitemap.xml              # SEO sitemap
├── src/
│   ├── components/               # React components
│   │   ├── ui/                  # shadcn/ui components (30+ variants)
│   │   ├── Analytics.tsx        # Google Analytics setup
│   │   ├── ContactForm.tsx      # Contact form with validation & email
│   │   ├── DonationForm.tsx     # Donation form with ClickPesa
│   │   ├── ErrorBoundary.tsx    # Error boundary wrapper
│   │   ├── Footer.tsx           # Footer with social links
│   │   ├── Hero.tsx             # Landing page hero
│   │   ├── Navbar.tsx           # Navigation bar
│   │   ├── NewsletterSignup.tsx # Newsletter subscription
│   │   ├── Partners.tsx         # Partner logos
│   │   ├── Skeletons.tsx        # Loading skeleton components
│   │   ├── Testimonials.tsx     # Testimonials section
│   │   └── [other components...]
│   ├── hooks/
│   │   ├── use-mobile.tsx       # Mobile detection hook
│   │   └── use-toast.ts         # Toast notifications hook
│   ├── lib/
│   │   ├── api.ts               # API client with retry logic
│   │   ├── payment.ts           # ClickPesa payment integration
│   │   ├── email.ts             # SendGrid email service
│   │   ├── social-media.ts      # Social media configuration
│   │   ├── supabase.ts          # Supabase client setup
│   │   ├── utils.ts             # Utility functions
│   │   └── validations.ts       # Zod validation schemas
│   ├── pages/
│   │   ├── About.tsx            # About page
│   │   ├── Apply.tsx            # Program application
│   │   ├── Blog.tsx             # Blog listing
│   │   ├── BlogPost.tsx         # Individual blog post
│   │   ├── Contact.tsx          # Contact page
│   │   ├── Donate.tsx           # Donation page
│   │   ├── Index.tsx            # Home page
│   │   ├── NotFound.tsx         # 404 page
│   │   ├── Privacy.tsx          # Privacy policy
│   │   ├── Programs.tsx         # Programs page
│   │   ├── Terms.tsx            # Terms of service
│   │   └── Volunteer.tsx        # Volunteer registration
│   ├── test/
│   │   ├── setup.ts             # Vitest setup and mocks
│   │   ├── validations.test.ts  # Form validation tests
│   │   └── social-media.test.ts # Social media config tests
│   ├── assets/                  # Images and static files
│   ├── App.tsx                  # Root app component
│   ├── App.css                  # Global styles
│   ├── index.css                # Base CSS with Tailwind
│   ├── main.tsx                 # React entry point
│   └── vite-env.d.ts           # Vite environment types
├── .env.example                 # Environment variable template
├── .eslintrc.js                # ESLint configuration
├── API_DOCUMENTATION.md         # Complete API reference
├── DATABASE_SCHEMA.md           # Database structure docs
├── DEPLOYMENT_GUIDE.md          # Deployment instructions
├── README.md                    # This file
├── package.json                 # Dependencies and scripts
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite build configuration
├── vitest.config.ts            # Vitest testing configuration
└── vercel.json                 # Vercel deployment config
```

---

## Getting Started

### Prerequisites

- Node.js 20+ or Bun 1.1.0+
- Git for version control
- A Supabase project (free tier available)
- SendGrid account (free tier available)
- ClickPesa merchant account (for payment processing)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/samattafoundation/website.git
   cd website
   ```

2. **Install dependencies**
   ```bash
   # Using Bun (recommended)
   bun install
   
   # Or using npm
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure environment variables** (see [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md#environment-setup))

5. **Start development server**
   ```bash
   bun run dev
   ```

6. **Open in browser**
   ```
   http://localhost:5173
   ```

---

## Available Scripts

```bash
# Development
bun run dev              # Start dev server (hot reload)
bun run preview         # Preview production build locally

# Building
bun run build           # Build for production
bun run build:dev       # Build with dev config

# Quality Assurance
bun run lint            # Run ESLint
bun run type-check      # Check TypeScript types
bun run test            # Run Vitest suite
bun run test:ui         # Vitest with UI interface
```

---

## Development Workflow

### 1. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes
- Edit components, pages, or utilities
- Changes hot-reload automatically
- TypeScript catches errors instantly

### 3. Run Quality Checks
```bash
bun run lint            # Fix code style
bun run type-check      # Verify types
bun run test            # Run tests
```

### 4. Commit Changes
```bash
git add .
git commit -m "feat: add your feature description"
git push origin feature/your-feature-name
```

### 5. Create Pull Request
- Request review from team members
- GitHub Actions runs automated checks
- Merge after approval and all checks pass

---

## Form Validation

All forms use **Zod** for runtime validation with automatic error display.

### Validation Examples

```typescript
import { contactFormSchema } from '@/lib/validations'

// Validate data
const result = contactFormSchema.safeParse(formData)

if (!result.success) {
  // Handle validation errors
  result.error.errors.forEach(err => {
    console.log(err.message)
  })
}
```

### Available Schemas
- `contactFormSchema`: Contact form
- `donationFormSchema`: Donation form
- `newsletterFormSchema`: Newsletter signup
- `volunteerFormSchema`: Volunteer registration
- `applicationFormSchema`: Program application

---

## Payment Integration

### ClickPesa Flow

1. **User submits donation form**
   - Form validated with Zod
   - Donation record created in database (status: pending)

2. **Payment initialization**
   - ClickPesa SDK loaded
   - Payment reference generated
   - User redirected to ClickPesa checkout

3. **Payment processing**
   - User completes payment on ClickPesa
   - ClickPesa processes transaction

4. **Webhook callback**
   - Payment gateway sends status update
   - Donation status updated (completed/failed)
   - Receipt email sent to donor

### Testing Payments

Use ClickPesa test cards:
- **Visa**: 4532015112830366
- **MasterCard**: 5425233010103442
- **Amount**: Any amount
- **Expiry**: Any future date

---

## Email Service

### SendGrid Integration

All transactional emails handled automatically:

1. **Contact Confirmation**: User submits contact form
2. **Donation Receipt**: Payment completed
3. **Volunteer Welcome**: Volunteer registration confirmed
4. **Newsletter Welcome**: New subscriber onboarded
5. **Password Reset**: Admin dashboard (future)

### Email Configuration

SendGrid template IDs configured in `src/lib/email.ts`:
- Contact: `d-contact-confirmation`
- Donation: `d-donation-receipt`
- Volunteer: `d-volunteer-welcome`
- Newsletter: `d-newsletter-welcome`

---

## Analytics & Tracking

### Google Analytics Events

Automatically tracked:
- Page views
- Form submissions
- Donations
- Volunteer signups
- Newsletter subscriptions
- Link clicks

### Tracking Implementation

```typescript
import { trackEvent, trackDonation } from '@/components/Analytics'

// Track custom event
trackEvent('special_action', {
  value: 100,
  category: 'engagement'
})

// Track donation
trackDonation({
  amount: 50000,
  currency: 'TZS',
  campaign: 'Education Program'
})
```

---

## Database Tables

### Core Tables

- **contacts**: Contact form submissions
- **donations**: Donation records with payment status
- **volunteers**: Volunteer applications
- **newsletter_subscribers**: Email subscribers
- **blog_posts**: Published articles
- **programs**: Program information
- **gallery_images**: Impact gallery
- **impact_metrics**: KPI tracking

See [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md) for complete schema documentation.

---

## Security

### Key Security Features

✅ **Environment Variables**: All credentials in `.env.local` (never committed)
✅ **Row-Level Security**: Database RLS policies on all tables
✅ **JWT Authentication**: Secure token-based authentication
✅ **HTTPS Only**: Enforced on all deployments
✅ **Type Safety**: TypeScript catches errors at compile time
✅ **Error Boundaries**: Graceful error handling without crashes
✅ **Validation**: Zod schemas validate all user input
✅ **CORS**: Proper cross-origin resource sharing

### Credentials Management

Never commit `.env.local`:
```bash
# Add to .gitignore (already done)
.env.local
.env.*.local
```

Always use [Environment Variables](#environment-setup) for secrets.

---

## Deployment

### Quick Deployment to Vercel

1. **Connect GitHub Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select GitHub repo
   - Click "Import"

2. **Set Environment Variables**
   - Go to Settings → Environment Variables
   - Add all variables from `.env.local`
   - Apply to Production, Preview, Development

3. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Visit live URL

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions and alternative deployment methods.

---

## Testing

### Running Tests

```bash
# Run all tests
bun run test

# Run specific test file
bun run test src/test/validations.test.ts

# Watch mode (re-run on changes)
bun run test:watch

# UI dashboard
bun run test:ui
```

### Current Test Coverage

- ✅ Form validation schemas
- ✅ Social media configuration
- 🔄 Coming: Component unit tests
- 🔄 Coming: Integration tests
- 🔄 Coming: E2E tests

---

## Performance Optimization

### Image Optimization

```typescript
// Use responsive images
<img 
  src={image} 
  alt="description"
  loading="lazy"
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### Code Splitting

React Router automatically code-splits pages:
```typescript
const lazy = () => import('./pages/Blog')
```

### Caching

TanStack React Query handles intelligent caching:
```typescript
// Automatically caches for 5 minutes
const { data } = useQuery({
  queryKey: ['posts'],
  queryFn: () => blogApi.getPosts(),
  staleTime: 5 * 60 * 1000
})
```

---

## Troubleshooting

### Development Issues

**Hot reload not working**
```bash
# Restart dev server
bun run dev
```

**Type errors in TypeScript**
```bash
# Regenerate types from Supabase
bun run type-check
```

**Dependencies not installing**
```bash
# Clear cache and reinstall
rm -rf node_modules
bun install
```

### Build Issues

**Build fails with TypeScript errors**
```bash
bun run type-check  # See detailed errors
```

**Environment variables not found**
- Verify `.env.local` exists
- Check variable names match `VITE_*` prefix
- Restart dev server after adding variables

**Payment not working in development**
- Verify ClickPesa credentials in `.env.local`
- Check browser console for errors
- Use ClickPesa test mode

---

## Contributing

### Code Style

- Use ESLint configuration: `bun run lint`
- Follow TypeScript best practices
- Use meaningful variable names
- Add comments for complex logic

### Commit Messages

```bash
# Feature
git commit -m "feat: add new feature"

# Bug fix
git commit -m "fix: resolve issue description"

# Documentation
git commit -m "docs: update readme"

# Style
git commit -m "style: format code"
```

### Pull Request Process

1. Create feature branch from `develop`
2. Make changes with meaningful commits
3. Run quality checks: `lint`, `type-check`, `test`
4. Create PR with detailed description
5. Request review from team members
6. Merge after approval and CI passes

---

## Maintenance

### Regular Tasks

**Daily**
- Monitor error logs
- Check website status
- Review new submissions (contacts, donations)

**Weekly**
- Review analytics
- Check performance metrics
- Update security patches

**Monthly**
- Database maintenance
- Backup verification
- Dependency updates
- Performance optimization

**Quarterly**
- Security audit
- Cost analysis
- Feature planning
- Disaster recovery test

---

## Support & Contact

### Resources

- **Documentation**: See linked markdown files
- **Supabase Docs**: https://supabase.com/docs
- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com/docs
- **GitHub Discussions**: Open discussions for questions

### Getting Help

1. Check existing documentation
2. Search GitHub issues
3. Check browser console for errors
4. Contact team: info@samattafoundation.org

### Reporting Issues

1. Describe the problem clearly
2. Include reproduction steps
3. Share error messages/logs
4. Provide browser/environment info

---

## Roadmap

### Phase 2 (Next Quarter)
- [ ] Admin dashboard for managing content
- [ ] Advanced analytics dashboard
- [ ] Multi-language support (English/Swahili)
- [ ] Mobile app (React Native)
- [ ] Event management system
- [ ] Advanced reporting

### Phase 3 (Future)
- [ ] Community forum
- [ ] Volunteer matching system
- [ ] Donation matching/campaigns
- [ ] Mobile app v2 features
- [ ] AI-powered chatbot support
- [ ] Integration with 3rd party platforms

---

## License

This project is licensed under the MIT License. See LICENSE file for details.

---

## Acknowledgments

- **Samatta Foundation**: Project vision and requirements
- **shadcn/ui**: Beautiful accessible components
- **Supabase**: Excellent backend infrastructure
- **Vercel**: Outstanding deployment platform
- **Open Source Community**: Countless libraries and tools

---

## Team

- **Development**: Full-stack development team
- **Design**: UI/UX design team
- **Project Management**: Samatta Foundation team
- **Stakeholders**: Various team members and community partners

---

**Last Updated**: 2024 | **Version**: 1.0.0
