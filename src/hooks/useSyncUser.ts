import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function useSyncUser() {
  const { user, isLoaded } = useUser();
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    async function syncUserToFirestore() {
   
      if (!isLoaded || !user) return;

      try {
        const userRef = doc(db, 'users', user.id);
        const userSnap = await getDoc(userRef);

        console.log('Clerk User Data:', user);

        if (!userSnap.exists()) {
          console.log('User not found in Firestore. Creating document...');
          await setDoc(userRef, {
            uid: user.id,
            email: user.primaryEmailAddress?.emailAddress || '',
            name: user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'New User',
            createdAt: serverTimestamp(),
            dailyGoal: 2000,
          });
          console.log('Successfully saved user to Firestore!');
        } else {
          console.log('User already exists in Firestore.');
        }
      } catch (error) {
        console.error('🚨 Firebase Error: Failed to check or create user document.', error);
        console.error('💡 TIP: Since you are using Clerk Auth, Firebase does NOT automatically recognize the user. You must go to the Firebase Console -> Firestore Database -> Rules, and temporarily set them to: \n\nallow read, write: if true;\n\n(For production, you would need Clerk-Firebase custom token integration).');
      } finally {
        // ALWAYS unblock the UI, even if Firebase fails
        setSynced(true);
      }
    }

    syncUserToFirestore();
  }, [user, isLoaded]);

  return { synced, isLoaded };
}
