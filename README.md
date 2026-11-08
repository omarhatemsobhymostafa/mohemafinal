# Femora

Femora is an Arabic pregnancy companion built with Next.js. The frontend keeps
its existing pages and visual design, and uses the Femora backend for account
registration, login, pregnancy tracking, and weekly content.

## Run locally

1. Install dependencies with `npm install`.
2. Create `.env.local` and set `NEXT_PUBLIC_API_URL` to the backend origin.
   Set `NEXT_PUBLIC_GOOGLE_CLIENT_ID` to your Google OAuth web client ID to
   enable Google sign-in.
3. Start the frontend with `npm run dev`.

The backend must be running and configured with its MongoDB connection and JWT
environment variables, including `GOOGLE_CLIENT_ID` (the same OAuth client ID
used by the frontend) for Google sign-in. New accounts are created through the
backend; admin access is determined by the account's `role` in the database.

## Main frontend structure

- `app/components/auth/` contains authentication state and login/signup UI.
- `app/components/layout/` contains the shared header and mobile navigation.
- `app/components/pregnancy/` contains weekly advice and journey selection UI.
- `app/lib/api.ts` centralizes backend requests, bearer-token handling, and API
  errors.
- `app/dashboard/` and `app/panel/` contain pregnancy tracking and admin pages.
- `app/journey/` displays weekly pregnancy content from the backend.

The Express API is in `../femora-backend/`, with endpoint mappings in
`routes/`, request handlers in `controllers/`, and MongoDB schemas in `models/`.
