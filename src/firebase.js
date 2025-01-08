import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  query, 
  where, 
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  addDoc
} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: "anirate-30a45",
  storageBucket: "anirate-30a45.firebasestorage.app",
  messagingSenderId: "759353238131",
  appId: "1:759353238131:web:29805066a0098ebca64006",
  measurementId: "G-NW5JN1DPBT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const getWatchlistData = async (uid) => {
  try {
    // Verify we have a uid
    if (!uid) {
      throw new Error("No user ID provided");
    }

    // Verify user is authenticated
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("User not authenticated");
    }

    const userRef = collection(db, "user");
    const q = query(userRef, where("uid", "==", uid));
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log("No user document found");
      return [];
    }

    const userData = querySnapshot.docs[0].data();
    return userData.watchlist || [];

  } catch (error) {
    console.error("Error in getWatchlistData:", error);
    throw error;
  }
};

const addToWatchlist = async (uid, animeId) => {
  try {
    if (!uid || !auth.currentUser) {
      throw new Error("User not authenticated");
    }

    const userRef = collection(db, "user");
    const q = query(userRef, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("User document not found");
    }

    const docRef = querySnapshot.docs[0].ref;
    await updateDoc(docRef, {
      watchlist: arrayUnion(animeId)
    });

    return true;
  } catch (error) {
    console.error("Error in addToWatchlist:", error);
    throw error;
  }
};

const removeFromWatchlist = async (uid, animeId) => {
  try {
    if (!uid || !auth.currentUser) {
      throw new Error("User not authenticated");
    }

    const userRef = collection(db, "user");
    const q = query(userRef, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("User document not found");
    }

    const docRef = querySnapshot.docs[0].ref;
    await updateDoc(docRef, {
      watchlist: arrayRemove(animeId)
    });

    return true;
  } catch (error) {
    console.error("Error in removeFromWatchlist:", error);
    throw error;
  }
};

const signup = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Create the user document in Firestore
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      watchlist: []
    });

    return user;
  } catch (error) {
    console.error("Error in signup:", error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
    throw error;
  }
};

const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error in login:", error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
    throw error;
  }
};

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error in logout:", error);
    throw error;
  }
};

export {
  auth,
  db,
  login,
  signup,
  logout,
  addToWatchlist,
  removeFromWatchlist,
  getWatchlistData
};