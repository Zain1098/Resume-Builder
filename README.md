## Resume Builder SaaS

Next.js App Router app with Clerk auth, basic resume editor, templates API, and ATS scoring util with tests.

### Setup

Create `.env.local` with:

- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
- CLERK_SECRET_KEY=
- MONGO_URI=
- NEXT_PUBLIC_APP_URL=http://localhost:3000
- OPENAI_API_KEY=
- STRIPE_SECRET_KEY=
- STRIPE_WEBHOOK_SECRET=

Install and run:

```bash
npm install
npm run dev
```

Seed default templates:

```bash
npm run seed
```

### Auth

- Use `/sign-in` and `/sign-up` routes. Provider is initialized in `src/app/layout.tsx`.

### Editor

- Visit `/editor` for a minimal live preview editor.

### Tests

```bash
npm test
```
