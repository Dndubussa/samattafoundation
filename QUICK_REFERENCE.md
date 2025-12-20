# Quick Reference & Troubleshooting

## Common Issues & Solutions

### 🔴 Critical Issues

#### "Missing required Supabase environment variables"

**Error Message:**
```
Error: Missing required Supabase environment variables: 
VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
```

**Solution:**
1. Create `.env.local` file in project root
2. Add from `.env.example`:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
3. Restart dev server: `npm run dev`
4. Get values from [Supabase Dashboard](https://app.supabase.com) > Settings > API

---

### 🟡 Form Issues

#### Form validation not showing errors

**Check:**
- [ ] Is `zodResolver` imported?
- [ ] Does validation schema exist in `src/lib/validations.ts`?
- [ ] Is component using `useForm` hook?
- [ ] Are error elements rendered with `{errors.fieldName && ...}`?

**Example fix:**
```tsx
// ✗ Wrong
<input {...register('email')} />

// ✓ Correct
<input {...register('email')} />
{errors.email && <span>{errors.email.message}</span>}
```

---

#### Form submitting with invalid data

**Ensure:**
- [ ] `handleSubmit(onSubmit)` is used on form
- [ ] Validation schema has `refine()` or `superRefine()` for complex rules
- [ ] Input types match schema (string vs number)

**Example:**
```tsx
// Schema
const schema = z.object({
  amount: z.string().refine(v => parseFloat(v) > 0, 'Must be > 0'),
});

// Component
<input type="number" {...register('amount')} />
```

---

### 🟡 API Issues

#### "Cannot submit form" or API calls failing

**Check:**
1. Supabase credentials in `.env.local` are correct
2. Supabase database tables exist
3. Row-Level Security (RLS) policies allow public inserts
4. Network tab shows 200 status (not 4xx or 5xx)
5. Check Supabase logs: Dashboard > Logs > API

**To debug:**
```bash
# Check if API is working
curl -X POST https://your-project.supabase.co/rest/v1/table_name \
  -H "Authorization: Bearer your-anon-key" \
  -H "Content-Type: application/json" \
  -d '{"column": "value"}'
```

---

#### "Email already subscribed" error

**This is expected!** Newsletter API prevents duplicates.

**If testing:**
- Use different email each time
- Or unsubscribe first
- Or clear Supabase table

---

### 🟡 TypeScript Issues

#### "Cannot find module '@/...'"

**Solution:**
Path alias `@/` = `src/`

**Check:**
- [ ] File exists at path
- [ ] Path in `tsconfig.json`: `"@/*": ["./src/*"]`
- [ ] Restart editor/IDE

**Example:**
```tsx
// ✗ Wrong (if file is in src/lib/api.ts)
import { api } from '../lib/api';

// ✓ Correct
import { api } from '@/lib/api';
```

---

#### TypeScript strict mode errors

**Solution:**
Errors are now caught because strict mode is enabled. This is good!

To fix:
```tsx
// ✗ Wrong
const data: any = response.data;

// ✓ Correct - use proper types
interface ApiResponse {
  data: string;
}
const data: ApiResponse = response.data;
```

---

### 🟡 UI/UX Issues

#### Form shows no error messages

**Checklist:**
- [ ] Error element has `id` matching input's `aria-describedby`
- [ ] Error is only shown when `errors.fieldName` exists
- [ ] Tailwind CSS loads properly

**Example:**
```tsx
<input
  {...register('email')}
  aria-invalid={!!errors.email}
  aria-describedby={errors.email ? 'email-error' : undefined}
/>
{errors.email && (
  <div id="email-error" className="text-destructive">
    {errors.email.message}
  </div>
)}
```

---

#### Toast notifications don't appear

**Check:**
- [ ] `<Toaster />` is in App.tsx
- [ ] Using `const { toast } = useToast()`
- [ ] Calling `toast({ title: '...', description: '...' })`

**Example:**
```tsx
const { toast } = useToast();

toast({
  title: 'Success',
  description: 'Operation completed',
  // Optional:
  variant: 'default', // or 'destructive'
});
```

---

### 🟡 Performance Issues

#### App is slow or unresponsive

**Check:**
- [ ] DevTools Performance tab
- [ ] Network requests in Network tab
- [ ] Large images optimized
- [ ] React Query cache settings (in App.tsx)

**Optimize:**
```tsx
// In App.tsx - already done
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
```

---

### 🟡 Styling Issues

#### Styles not applying

**Check:**
- [ ] Tailwind config in `tailwind.config.ts`
- [ ] Content paths include your files
- [ ] CSS variables defined in root (`:root` or `html`)
- [ ] No CSS conflicts

**Verify CSS loads:**
```bash
# Look for generated utility classes
npm run build  # Check dist/assets/*.css
```

---

## Commands Reference

```bash
# Development
npm run dev          # Start dev server at localhost:8080
npm run build        # Production build
npm run build:dev    # Build with source maps
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint -- --fix # Auto-fix lint issues

# Package managers (use one)
npm install          # Install dependencies
bun install          # Install dependencies (faster)
bun dev             # Run with bun
```

---

## File Locations Quick Guide

| What | Where |
|------|-------|
| Contact form | `src/components/ContactForm.tsx` |
| Donation form | `src/components/DonationForm.tsx` |
| Form validation | `src/lib/validations.ts` |
| API functions | `src/lib/api.ts` |
| API types | `src/lib/supabase.ts` |
| Database setup | `src/lib/supabase.ts` |
| Error boundary | `src/components/ErrorBoundary.tsx` |
| Routes | `src/App.tsx` |
| Environment vars | `.env.local` (create from `.env.example`) |
| Analytics | `src/components/Analytics.tsx` |

---

## Validation Rules by Field

| Field | Rules |
|-------|-------|
| Email | Valid email format (user@domain.com) |
| Name | 2-100 characters |
| Phone | 10+ characters |
| Amount | Number > 0 |
| Message | 10-5000 characters |
| Currency | TZS, USD, EUR, or GBP |

---

## Error Messages: User-Friendly vs Technical

| Error Type | User Message | Technical Detail |
|------------|--------------|-----------------|
| Invalid email | "Please enter a valid email address" | Email regex fails |
| Missing field | "This field is required" | zod `required()` |
| Duplicate | "This email already exists" | DB unique constraint |
| Network | "Connection failed, retrying..." | API timeout with retry |
| Server | "Service temporarily unavailable" | 5xx error |

---

## Testing Checklist

Before submitting changes:

- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds
- [ ] Forms validate correctly
- [ ] Forms submit successfully
- [ ] Error messages display
- [ ] No TypeScript errors: `npx tsc --noEmit`
- [ ] Accessibility: Tab through form, test with screen reader
- [ ] Works in Chrome, Firefox, Safari
- [ ] No console errors

---

## Security Notes

⚠️ **Never commit these files:**
- `.env.local` - Contains secrets
- `.env*.local` - Local environment files
- `dist/` - Build output (unnecessary in git)

✅ **Safe to commit:**
- `.env.example` - Template only
- `src/` - Source code
- `tsconfig.json`, `vite.config.ts` - Config

---

## Useful Browser Extensions

For development:
- **React DevTools** - Debug React components
- **Redux DevTools** - Debug state (if using Redux)
- **Vue/React/Angular DevTools** - Component inspection
- **JSON Viewer** - Format API responses
- **Accessibility Checker** - Test a11y

---

## Keyboard Shortcuts

| Shortcut | What |
|----------|------|
| `Tab` | Navigate form inputs |
| `Shift+Tab` | Navigate backwards |
| `Enter` | Submit form |
| `Space` | Toggle checkbox |
| `Esc` | Close modals/dialogs |
| `F12` | DevTools |
| `Ctrl/Cmd+Shift+C` | Inspect element |

---

## Getting More Help

1. **Error Messages**: Read them carefully - they're descriptive
2. **Browser Console**: Always check `F12` > Console tab
3. **Network Tab**: See API responses and errors
4. **Supabase Dashboard**: Check database status
5. **TypeScript**: Hover over errors for explanations
6. **Documentation**: See `IMPROVEMENTS_SUMMARY.md` and `DEVELOPER_SETUP.md`

---

## Emergency Reset

If things are broken:

```bash
# Clean reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev

# Clear build cache
rm -rf dist/
npm run build

# Check environment
cat .env.local  # Verify credentials exist

# Full TypeScript check
npx tsc --noEmit
```

---

**Last Updated**: December 20, 2025
**Version**: 1.0
