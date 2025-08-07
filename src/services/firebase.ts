// src/services/firebase.ts
import { initializeApp } from 'firebase/app'
import { initializeFirestore } from 'firebase/firestore'

// Carrega as variáveis de ambiente
const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
}

// Inicializa o app Firebase
const app = initializeApp(firebaseConfig)

// Inicializa o Firestore forçando long-polling (sem tentar streaming WebChannel)
// para evitar warnings de WebChannelConnection
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true
})
