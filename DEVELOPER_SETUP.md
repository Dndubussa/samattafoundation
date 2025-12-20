# Developer Setup Guide

## Getting Started

### Prerequisites
- Node.js 18+ ([Download](https://nodejs.org/))
- npm or bun package manager
- A Supabase account ([Create free](https://supabase.com))
- Git

### Initial Setup

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd samattafoundation-master
```

#### 2. Install Dependencies
```bash
# Using npm
npm install

# Or using bun (faster)
bun install
```

#### 3. Setup Environment Variables
```bash
# Copy the example environment file
cp .env.example .env.local

# Edit the file with your actual values
# Required variables:
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_GA_TRACKING_ID=your-google-analytics-id (optional)
```

#### 4. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

---

## Development Workflow

### Available Scripts

```bash
# Start dev server with hot reload
npm run dev

# Build for production
npm run build

# Build with development source maps
npm run build:dev

# Preview production build locally
npm run preview

# Run linting
npm run lint
```

### Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/             # shadcn/ui primitive components
│   ├── ContactForm.tsx  # Contact form with validation
│   ├── DonationForm.tsx # Donation form with validation
│   └── ErrorBoundary.tsx # Error boundary component
├── pages/              # Route page components
├── lib/                # Utilities and APIs
│   ├── supabase.ts     # Supabase client setup
│   ├── api.ts          # API functions with retry logic
│   ├── validations.ts  # Zod validation schemas
│   └── utils.ts        # Helper utilities
├── hooks/              # Custom React hooks
├── assets/             # Images and static files
├── App.tsx             # Main app component
└── main.tsx            # Entry point
```

---

## Working with Forms

### Adding Form Validation

1. **Define validation schema** in `src/lib/validations.ts`:
```typescript
export const myFormSchema = z.object({
  email: z.string().email('Invalid email'),
  name: z.string().min(2, 'Name too short'),
});

export type MyFormData = z.infer<typeof myFormSchema>;
```

2. **Use in component**:
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { myFormSchema, type MyFormData } from '@/lib/validations';

const MyForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<MyFormData>({
    resolver: zodResolver(myFormSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
    </form>
  );
};
```

---

## Working with APIs

### Making API Calls

All API calls are in `src/lib/api.ts` with:
- **Automatic retry logic** (exponential backoff)
- **Readable error messages**
- **Type safety with TypeScript**

Example:
```typescript
try {
  const result = await contactApi.submit({
    name: 'John',
    email: 'john@example.com',
    message: 'Hello',
  });
} catch (error) {
  console.error(error.message); // User-friendly message
}
```

### Adding New API Endpoint

```typescript
// In src/lib/api.ts
export const myApi = {
  async doSomething(data: MyData) {
    return withRetry(async () => {
      const { data: result, error } = await supabase
        .from('table_name')
        .select('*')
        .eq('id', data.id);
      
      if (error) {
        throw new Error(getErrorMessage(error));
      }
      return result;
    });
  },
};
```

---

## Accessibility Checklist

When creating forms or interactive components:

- [ ] Add `aria-label` on inputs/buttons
- [ ] Add `aria-invalid` on fields with errors
- [ ] Link error messages with `aria-describedby`
- [ ] Use `aria-busy` on submit buttons during loading
- [ ] Ensure proper semantic HTML
- [ ] Test with keyboard navigation (Tab key)
- [ ] Test with screen reader (NVDA, JAWS, or built-in)

Example:
```tsx
<input
  aria-label="Email address"
  aria-invalid={!!errors.email}
  aria-describedby={errors.email ? 'email-error' : undefined}
/>
{errors.email && <div id="email-error">{errors.email.message}</div>}
```

---

## Common Tasks

### Update a Form Component

1. Update validation schema in `src/lib/validations.ts`
2. Update component to use react-hook-form
3. Add aria-labels and error displays
4. Test with invalid/valid data

### Add a New Page

1. Create `src/pages/MyPage.tsx`
2. Add route to `src/App.tsx`:
```tsx
<Route path="/mypage" element={<MyPage />} />
```
3. Update navbar links if needed

### Style with Tailwind

The project uses Tailwind CSS with custom colors defined in `tailwind.config.ts`. Common utilities:

```tsx
// Spacing, flex, grid, colors, etc.
<div className="flex gap-4 p-6 bg-primary text-primary-foreground">
  <button className="bg-hero hover:opacity-90">Click me</button>
</div>
```

### Add Analytics Tracking

```typescript
import { trackEvent } from '@/components/Analytics';

// Track custom event
trackEvent('button_clicked', 'engagement', 'my_button');

// Common tracking functions available:
trackDonation(amount, currency);
trackVolunteerSignup();
trackProgramApplication(programName);
trackNewsletterSubscription();
trackContactFormSubmission();
```

---

## Debugging

### TypeScript Errors

```bash
# Check all TypeScript errors
npx tsc --noEmit

# Enable strict mode to catch more errors
# Already enabled in tsconfig.json
```

### Runtime Errors

1. **Error Boundary**: Component errors are caught and displayed
2. **Console**: Check browser DevTools console
3. **Network**: Check Network tab for API failures
4. **Supabase**: Check Supabase dashboard for database issues

### Development Logging

Errors and warnings are logged in development mode. Check the browser console.

---

## Environment Variables

### Required
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

### Optional
- `VITE_GA_TRACKING_ID` - Google Analytics tracking ID
- `VITE_APP_ENV` - App environment (development/production)

### For Payment Integration
- `VITE_STRIPE_PUBLIC_KEY` - Stripe public key (when implementing)
- `VITE_PAYPAL_CLIENT_ID` - PayPal client ID (when implementing)

See `.env.example` for full list.

---

## Code Quality

### Linting

```bash
npm run lint
```

ESLint is configured to enforce code style. Fix issues with:

```bash
npm run lint -- --fix
```

### Type Checking

The project uses strict TypeScript. Enable stricter checks:

```typescript
// In tsconfig.json - already enabled
"strict": true
```

---

## Testing Forms Locally

### Contact Form
1. Go to `/contact`
2. Fill form with test data
3. Verify validation errors appear for invalid input
4. Submit and check Supabase dashboard

### Donation Form
1. Go to `/donate`
2. Test with amount = 0 (should error)
3. Test with invalid email (should error)
4. Test with anonymous donation
5. Submit and verify it appears in Supabase

### Newsletter
1. Subscribe with valid email
2. Try subscribing same email again (should show duplicate error)
3. Check Supabase for subscription record

---

## Deployment

### To Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel settings
4. Deploy!

See `vercel.json` for configuration.

### To Other Platforms

1. Build: `npm run build`
2. Output directory: `dist/`
3. Command: `npm run build`
4. Set environment variables on platform
5. Deploy!

---

## Troubleshooting

### "Missing environment variables"

```
Error: Missing required Supabase environment variables
```

**Solution**: Create `.env.local` with required variables from `.env.example`

### "Cannot find module '@/...'"

**Solution**: Path alias `@/` maps to `src/`. Check imports are correct.

### Form validation not working

**Solution**: 
- Ensure `zodResolver` is imported
- Check validation schema in `validations.ts`
- Verify form uses `handleSubmit(onSubmit)` from `useForm`

### API calls failing

**Solution**:
- Check Supabase credentials in `.env.local`
- Verify Supabase database tables exist
- Check browser console for error messages
- Verify row-level security (RLS) policies

### TypeScript errors after changes

**Solution**:
```bash
# Check all errors
npx tsc --noEmit

# May need to restart dev server
npm run dev
```

---

## Learning Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)
- [shadcn/ui Components](https://ui.shadcn.com/)

---

## Getting Help

1. Check the error message in the UI or console
2. Read the error boundary details
3. Check `IMPROVEMENTS_SUMMARY.md` for recent changes
4. Review code comments in component files
5. Check Supabase dashboard for database issues
6. Enable development logging for more details

---

**Last Updated**: December 20, 2025
