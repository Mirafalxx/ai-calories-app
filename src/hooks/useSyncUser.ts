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

        if (!userSnap.exists()) {
          await setDoc(userRef, {
            uid: user.id,
            email: user.primaryEmailAddress?.emailAddress || '',
            name: user.fullName || `${user.firstName} ${user.lastName}`.trim(),
            createdAt: serverTimestamp(),
            dailyGoal: 2000,
          });
        }
        setSynced(true);
      } catch (error) {
        console.error('Error syncing user to Firestore', error);
      }
    }

    syncUserToFirestore();
  }, [user, isLoaded]);

  return { synced, isLoaded };
}
