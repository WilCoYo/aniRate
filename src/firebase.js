import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {addDoc, collection, getFirestore, query, where, updateDoc, arrayUnion, getDocs, arrayRemove  } from "firebase/firestore";
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
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);


const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
            watchlist: []
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const logout = () => {
    signOut(auth);
}


async function addToWatchlist(uid, item) {
    const userRef = collection(db, "user");
  
// Query the user document based on the uid field
    const q = query(userRef, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
  
// Loop through query results (should be only one document)
    querySnapshot.forEach(async (doc) => {
// Add item to the watchlist array
      await updateDoc(doc.ref, {
        watchlist: arrayUnion(item)
      });
      console.log('Added to watchlist');
    });
  
    if (querySnapshot.empty) {
      console.log("No user found with the provided uid.");
    }
  }


  async function removeFromWatchlist(uid, item) {
    const userRef = collection(db, "user");
  
// Query the user document based on the uid field
    const q = query(userRef, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
  
// Loop through query results (should be only one document)
    querySnapshot.forEach(async (doc) => {
// Remove item from the watchlist array
      await updateDoc(doc.ref, {
        watchlist: arrayRemove(item)
      });
      console.log('Removed from watchlist');
    });
  
    if (querySnapshot.empty) {
      console.log("No user found with the provided uid.");
    }
  }
  


export { auth, db, login, signup, logout, addToWatchlist, removeFromWatchlist };