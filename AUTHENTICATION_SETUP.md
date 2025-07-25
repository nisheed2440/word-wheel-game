# NextAuth.js v5 Google Authentication Setup

This project uses **NextAuth.js v5** with Google OAuth for authentication. Follow these steps to set up authentication:

## 1. Firebase Setup (Optional for Firestore)

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable Authentication:
   - Go to Authentication → Sign-in method
   - Enable Google sign-in provider
   - Add your domain to authorized domains (localhost:3000 for development)
4. Create a web app:
   - Go to Project Settings → General
   - Add a web app
   - Copy the Firebase config values

## 2. Firestore Database Setup (Optional)

1. In Firebase Console, go to Firestore Database
2. Create database in test mode (for development)
3. Can be integrated later with Firebase adapter

## 3. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (can be different from Firebase)
3. Go to APIs & Services → Credentials
4. Create OAuth 2.0 Client ID:
   - Application type: Web application
   - Authorized JavaScript origins: `http://localhost:3000`
   - Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
5. Copy the Client ID and Client Secret

## 4. Environment Variables

1. Copy `env.example` to `.env.local`
2. Fill in the values from Google Cloud Console:

```bash
# NextAuth.js v5 Configuration (AUTH_ prefix is required)
AUTH_SECRET=your_random_secret_key
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret

# Optional: Trust proxy headers (when behind proxy)
AUTH_TRUST_HOST=true

# Firebase Configuration (optional for future Firestore integration)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## 5. Generate NextAuth Secret

Generate a secret for NextAuth.js:

```bash
openssl rand -base64 32
```

Add this to your `.env.local` as `AUTH_SECRET`.

## 6. Usage

### In Client Components:

```tsx
'use client';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Component() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <p>Loading...</p>;

  if (session) {
    return (
      <>
        <p>Signed in as {session.user?.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  
  return (
    <>
      <p>Not signed in</p>
      <button onClick={() => signIn('google')}>Sign in with Google</button>
    </>
  );
}
```

### In Server Components:

```tsx
import { auth } from '@/auth';

export default async function ServerComponent() {
  const session = await auth();

  if (!session?.user) {
    return <p>Not authenticated</p>;
  }

  return <p>Hello {session.user.email}!</p>;
}
```

### In API Routes:

```tsx
import { auth } from '@/auth';

export async function GET() {
  const session = await auth();
  
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  return Response.json({ user: session.user });
}
```

### Protecting pages with Middleware:

```tsx
// middleware.ts
import { auth } from '@/auth';

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  if (!isLoggedIn && nextUrl.pathname !== '/signin') {
    return Response.redirect(new URL('/signin', nextUrl));
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

## 7. File Structure

```
./
├── auth.ts                          # ✅ NextAuth.js v5 root configuration
├── src/
│   ├── app/
│   │   ├── layout.tsx               # ✅ Wrapped with AuthProvider
│   │   └── api/
│   │       └── auth/
│   │           └── [...nextauth]/
│   │               └── route.ts     # ✅ Simple handlers export
│   ├── lib/
│   │   ├── auth/
│   │   │   └── auth-provider.tsx    # ✅ SessionProvider wrapper
│   │   └── firebase/
│   │       └── config.ts            # ✅ Firebase config (optional)
│   └── types/
│       └── next-auth.d.ts          # ✅ TypeScript extensions
└── env.example                     # ✅ Environment template
```

## 8. NextAuth.js v5 Features

- **✅ Universal auth()**: Single method for authentication everywhere
- **✅ App Router-first**: Optimized for Next.js App Router
- **✅ Simplified setup**: Shared config, inferred environment variables
- **✅ Edge-compatible**: Works in edge environments
- **✅ OAuth support**: Full Google OAuth integration
- **✅ TypeScript**: Complete type safety

## 9. Key Changes from v4

- **Configuration**: Moved from API route to root `auth.ts` file
- **Environment Variables**: Use `AUTH_` prefix instead of `NEXTAUTH_`
- **Server Authentication**: Use unified `auth()` function instead of `getServerSession`
- **Auto-detection**: `AUTH_URL` is auto-detected, not required
- **Simplified API**: Single `auth()` method for all server-side authentication

The setup is complete and ready for development! 🚀 