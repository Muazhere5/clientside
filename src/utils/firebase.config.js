

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Read Firebase keys from the client-side .env.local file
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  // Add other keys as needed (Storage Bucket, etc.)
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the authentication instance for use in AuthProvider
const auth = getAuth(app);

export default auth;