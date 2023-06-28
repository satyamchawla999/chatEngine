import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider, db } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { setUser,setUserData } from "../Features/User/userSlice"
import { useDispatch } from "react-redux";

import {
    getFirestore,
    doc,
    query,
    getDocs,
    collection,
    where,
    addDoc,
    getDoc,
} from "firebase/firestore";

import "../Assets/Styles/login.css"

const Login = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);

    // useEffect(() => {
    //     if (loading) {

    //         return;
    //     }
    //     if (user) Navigate("/dashboard");
    // }, [user, loading]);

    const dispatch = useDispatch();
    const Navigate = useNavigate();


    const signInWithGoogle = async () => {
        try {
            const res = await signInWithPopup(auth, googleProvider);
            const user = res.user;

            const q = query(collection(db, "Users"), where("uid", "==", user.uid));
            const docs = await getDocs(q);

            const data = {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
            }

            if (docs.docs.length === 0) {
                await addDoc(collection(db, "Users"),data);
            }
            dispatch(setUser());
            dispatch(setUserData(data));
            Navigate("/dashboard");
        } catch (err) {
            console.error(err);
        }
    };

    // const getUsers = async () => {
    //     const data = query(collection(db, "Users"));
    //     const mySnapshot = await getDocs(data);
    //     console.log("---")
    //     mySnapshot.forEach((doc) => (console.log(doc.data())))
    // }

    const logInWithEmailAndPassword = async () => {
        try {

            
            const res = await signInWithEmailAndPassword(auth, email, password);
            const user= res.user;
            // const user = res.user;

            // const q = query(collection(db, "Users"), where("uid", "==", user.uid));
            // const docs = await getDocs(q);

            // const data = {
            //     uid: user.uid,
            //     email: user.email,
            // }

            // if (docs.docs.length === 0) {
            //     await addDoc(collection(db, "Users"),data);
            // }

            // await addDoc(collection(db, "Users"), data);
            const data = {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
            }

            console.log("data",data)
            // await addDoc(collection(db, "Users"), data);


            dispatch(setUserData(data));

            dispatch(setUser());
            Navigate("/dashboard");
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="login">
            <div className="loginContainer">

                <div className="imageSection">
                    <img src={require("../Assets/Images/main.png")} />
                </div>

                <div className="fromSection">
                    <h1>Log In</h1>

                    <form onSubmit={handleSubmit}>
                        <label>Email</label>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                        <label>Password</label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                        <button className="login__btn login__google" onClick={logInWithEmailAndPassword}>
                            login
                        </button>

                        <button className="authButton" onClick={signInWithGoogle}>
                            <img src={require("../Assets/Images/google.png")} />
                            Login with Google
                        </button>
                        <p>New User? <Link to="/signup">Sign Up</Link></p>
                    </form>

                </div>

            </div>
        </div>
    );
}

export default Login;
