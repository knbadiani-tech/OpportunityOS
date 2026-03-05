# OpportunityOS Deployment Guide

OpportunityOS is ready for production. Follow these steps to map the application to Firebase Hosting and configure the required environment variables.

## 1. Environment Variables 
Before deploying, you must configure your API keys. Next.js server-side functions require these to run the radar pipeline.

Create a `.env.local` file in the root `opportunity-os` directory (or configure them in your CI/CD provider):

```env
# Required for Opportunity Brief AI generation
OPENAI_API_KEY=sk-your-openai-api-key

# Optional but recommended for YouTube video velocity tracking
YOUTUBE_API_KEY=your-youtube-data-api-key

# Firebase Client Configuration (Populate from your Firebase Console)
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-firebase-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

## 2. Firebase Database Setup
Ensure your Firebase project has **Firestore Database** enabled.
You do not need to manually create collections; the application will automatically create `runs` and `trends` upon the first Radar execution. Ensure your Firestore security rules allow read/write access initially (or tighten them to match your auth needs).

## 3. Deployment with Firebase Hosting & Web Frameworks
Firebase Hosting natively supports Next.js 14 via their Web Frameworks integration.

1. **Install Firebase CLI Tools:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to your Firebase Account:**
   ```bash
   firebase login
   ```

3. **Initialize the Project:**
   ```bash
   firebase init hosting
   ```
   - When asked what you want to use as your public directory, Firebase will detect it's a Next.js app.
   - Answer **Yes** when asked if you want to use the experimental web frameworks integration.
   - Answer **No** to deploying via GitHub Actions (unless you prefer to set that up).

4. **Deploy:**
   ```bash
   firebase deploy --only hosting
   ```

Firebase will automatically build the Next.js application, deploy the static assets to the CDN, and create Cloud Functions for the `/api/run-radar` and `/api/trends` serverless endpoints.

## 4. Troubleshooting
If you encounter `504 Gateway Timeout` on `/api/run-radar` inside Firebase Functions, it's due to the default 60s function timeout. You can configure `firebase.json` or increase the timeout limits in the GCP console for this specific Edge function.
