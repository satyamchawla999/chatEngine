import { useDispatch, useSelector } from "react-redux";
import ChatItems from "./subComponents/ChatItems";
import { auth } from "../firebase/firebase";
import {signOut } from "firebase/auth";
import {deleteUser} from "../Features/User/userSlice"
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useEffect } from "react";


import "../Assets/Styles/dashboard.scss"
import { useNavigate } from "react-router-dom";


const Dashboard = () => {

    const userData = useSelector((state) => state.userData);
    const user = useSelector((state) => state.user);

    const dispatch = useDispatch()
    const Navigate = useNavigate()
    console.log(user);


    useEffect(() => {
        if (!user) Navigate("/");
    }, [user]);

    const logout = () => {
            signOut(auth);
            dispatch(deleteUser())
            Navigate("/")
    };

    return (
        <div className="chatPage">

            <div className="chatList">

                <div className="userInfo">
                    <img src="https://cdn.iconscout.com/icon/free/png-512/free-avatar-375-456327.png?f=avif&w=256" alt="userImg" />
                    <div className="userDetails">
                        <div>
                            <h2>Ralph Hitman</h2>
                            <p onClick={logout}>Log Out</p>
                            <p><i class="fa-regular fa-bell"></i></p>
                        </div>

                        <p>@Ralph-Hitman</p>
                    </div>
                </div>

                <div className="chats">
                    <div className="searchBar">
                        <input type="text" placeholder="Search" />
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </div>

                    <div className="chatsContainer">
                        <ChatItems />
                        <ChatItems />
                        <ChatItems />
                        <ChatItems />
                        <ChatItems />
                        <ChatItems />
                        <ChatItems />
                        <ChatItems />
                    </div>

                </div>

            </div>

            <div className="openChat">
                <div className="headBar">
                    <div className="senderInfo">
                        <img src="https://cdn.iconscout.com/icon/free/png-512/free-avatar-375-456327.png?f=avif&w=256" alt="userImg" />
                        <h2>Ram Kumar</h2>
                        <div className="headSpace">

                        </div>
                        <p><i class="fa-solid fa-phone"></i></p>
                        <p><i class="fa-solid fa-laptop-file"></i></p>
                        <p><i class="fa-solid fa-ellipsis"></i></p>
                    </div>
                </div>

                <div className="textBar">
                    <i class="fa-solid fa-paperclip"></i>
                    <input type="text" placeholder="Type a message." />
                    <i class="fa-regular fa-face-smile"></i>
                    <p><img src={require("../Assets/Images/send-message.png")} /></p>
                </div>
            </div>

        </div>
    );
}

export default Dashboard;
