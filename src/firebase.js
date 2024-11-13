import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { setDoc, getDoc, addDoc, collection, getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore";
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


    const addToWatchlist = async (uid, animeId) => {
        
        try {
            const userRef = doc(db, "user", uid);
            const userDoc = await getDoc(userRef);

            if(userDoc.exists) {
                await setDoc(doc(userRef, "watchlist", animeId), { animeId })
                console.log("Anime added to watchlist successfully")
            } else {
                await setDoc(userRef, {
                    authProvider: "local",
                    email: "nadine@jesus.com",
                    name: "Nadine",
                    uid: "XWAYjcpZaZgk0FjXVvaqkr3i6J3"
                  });
                  await setDoc(doc(userRef, "watchlist", animeId), { animeId });
                console.log("User document craeted and anime added to watchlist")
            } 
        } catch (error) {
            console.log("Error adding anime to watchlist", error);
        }
    };




export { auth, db, login, signup, logout, addToWatchlist };