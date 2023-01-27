import { initializeApp } from 'firebase/app'
import { getAnalytics, isSupported } from 'firebase/analytics'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { collection, getFirestore } from 'firebase/firestore'

const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
const projectID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
const appID = process.env.NEXT_PUBLIC_FIREBASE_APP_ID
const measurementID = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID

export const app = initializeApp({
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectID,
  appId: appID,
  measurementId: measurementID,
})
export const analytics = isSupported().then((supported) =>
  supported ? getAnalytics(app) : null
)

export const auth = getAuth(app)

// Initialize database
export const db = getFirestore(app)

// collectionRefs
export const userRef = collection(db, 'users')

export const authProvider = new GoogleAuthProvider()
