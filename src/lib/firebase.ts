import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC3-5WJUIRoUXuw7CJrSkHvoOZGrbkqXOs",
  authDomain: "tech-tips-dd32e.firebaseapp.com",
  projectId: "tech-tips-dd32e",
  storageBucket: "tech-tips-dd32e.firebasestorage.app",
  messagingSenderId: "1079671535616",
  appId: "1:1079671535616:web:bea5a0c3131f257d0140e5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
