# Firebase Google Authentication Setup

This project uses Firebase for Google authentication with NextAuth.js. Follow these steps to set up authentication:

## 1. Firebase Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable Authentication:
   - Go to Authentication → Sign-in method
   - Enable Google sign-in provider
   - Add your domain to authorized domains
4. Create a web app:
   - Go to Project Settings → General
   - Add a web app
   - Copy the Firebase config values

## 2. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (should be the same as Firebase)
3. Go to APIs & Services → Credentials
4. Create OAuth 2.0 Client ID:
   - Application type: Web application
   - Authorized JavaScript origins: `http://localhost:3000`
   - Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
5. Copy the Client ID and Client Secret

## 3. Environment Variables

1. Copy `.env.local.example` to `.env.local`
2. Fill in the values from Firebase and Google Cloud Console:

```bash
# Firebase Configuration (from Firebase console)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Google OAuth Configuration (from Google Cloud Console)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret_key
```

## 4. Generate NextAuth Secret

Generate a secret for NextAuth.js:

```bash
openssl rand -base64 32
```

## 5. Firestore Setup

1. In Firebase Console, go to Firestore Database
2. Create database in test mode
3. The app will automatically create user documents when users sign in

## 6. Usage

The authentication system provides:

- **Firebase Auth**: Direct Firebase authentication for real-time features
- **NextAuth.js**: Session management and API route protection
- **User Data**: Automatic user profile and game stats storage in Firestore

### Available Hooks and Functions

```typescript
import { useAuth } from './lib/auth/auth-context';

// In your components
const { user, loading, signIn, signOut } = useAuth();
```

### Protecting Pages

```typescript
import { useAuth } from './lib/auth/auth-context';

export default function ProtectedPage() {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please sign in</div>;
  
  return <div>Welcome, {user.displayName}!</div>;
}
```

## File Structure

```
lib/
├── firebase/
│   └── config.ts          # Firebase configuration
├── auth/
│   ├── auth-utils.ts      # Authentication utility functions
│   └── auth-context.tsx   # React context for auth state
app/
└── api/
    └── auth/
        └── [...nextauth]/
            └── route.ts    # NextAuth.js API route
types/
└── auth.ts               # TypeScript types for authentication
``` 