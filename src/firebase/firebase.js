// import firebase from "firebase/app";
// import "firebase/auth";

import { initializeApp } from "firebase/app";

import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";

import { 
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyALzExCq6nIKydiE74Wvhhm6iV2AHkTYaA",
    authDomain: "sign-in-project-391005.firebaseapp.com",
    projectId: "sign-in-project-391005",
    storageBucket: "sign-in-project-391005.appspot.com",
    messagingSenderId: "745525634334",
    appId: "1:745525634334:web:dd87670f721dbed13a950f"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();

// const signInWithGoogle = async () => {
//     try {
//         const res = await signInWithPopup(auth, googleProvider);
//         const user = res.user;
//         const q = query(collection(db, "users"), where("uid", "==", user.uid));
//         const docs = await getDocs(q);
//         if (docs.docs.length === 0) {
//             await addDoc(collection(db, "users"), {
//                 uid: user.uid,
//                 name: user.displayName,
//                 authProvider: "google",
//                 email: user.email,
//             });
//         }
//     } catch (err) {
//         console.error(err);
//         alert(err.message);
//     }
// };

// const logInWithEmailAndPassword = async (email, password) => {
//     try {
//         await signInWithEmailAndPassword(auth, email, password);
//     } catch (err) {
//         console.error(err);
//         alert(err.message);
//     }
// };

// const registerWithEmailAndPassword = async (name, email, password) => {
//     try {
//         const res = await createUserWithEmailAndPassword(auth, email, password);
//         const user = res.user;
//         await addDoc(collection(db, "users"), {
//             uid: user.uid,
//             name,
//             authProvider: "local",
//             email,
//         });
//     } catch (err) {
//         console.error(err);
//         alert(err.message);
//     }
// };

// const sendPasswordReset = async (email) => {
//     try {
//         await sendPasswordResetEmail(auth, email);
//         alert("Password reset link sent!");
//     } catch (err) {
//         console.error(err);
//         alert(err.message);
//     }
// };

// const logout = () => {
//     signOut(auth);
// };

// export {
//     auth,
//     db,
//     googleProvider,
//     signInWithGoogle,
//     logInWithEmailAndPassword,
//     registerWithEmailAndPassword,
//     sendPasswordReset,
//     logout,
// };

