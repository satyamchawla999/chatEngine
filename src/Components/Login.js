import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithPopup,signInWithEmailAndPassword} from "firebase/auth";
import { setUser } from "../Features/User/userSlice"
import { useDispatch } from "react-redux";
import "../Assets/Styles/login.css"

const Login = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        if (loading) {

            return;
        }
        if (user) Navigate("/dashboard");
    }, [user, loading]);

    const dispatch = useDispatch();
    const Navigate = useNavigate();


    const signInWithGoogle = async () => {
        try {
            const res = await signInWithPopup(auth, googleProvider);
            dispatch(setUser(res._tokenResponse));
            Navigate("/dashboard");
        } catch (err) {
            console.error(err);
        }
    };

    const logInWithEmailAndPassword = async () => {
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            dispatch(setUser(res._tokenResponse));
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
