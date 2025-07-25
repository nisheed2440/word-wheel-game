import { signInWithPopup, GoogleAuthProvider, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Save user data to Firestore
    await saveUserToFirestore(user);
    
    return user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

export const saveUserToFirestore = async (user: any) => {
  try {
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: new Date(),
        lastLoginAt: new Date(),
        gameStats: {
          gamesPlayed: 0,
          gamesWon: 0,
          totalScore: 0,
          bestScore: 0,
        },
      });
    } else {
      // Update last login time
      await setDoc(userRef, {
        lastLoginAt: new Date(),
      }, { merge: true });
    }
  } catch (error) {
    console.error('Error saving user to Firestore:', error);
    throw error;
  }
}; 