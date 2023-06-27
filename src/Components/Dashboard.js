import { useDispatch, useSelector } from "react-redux";
import { ChatItems, OpenChat } from "./subComponents";
import { auth, db } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { deleteUser } from "../Features/User/userSlice"
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useEffect, useState } from "react";

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


import "../Assets/Styles/dashboard.scss"
import { useNavigate } from "react-router-dom";


const Dashboard = () => {

    const userData = useSelector((state) => state.userData);
    const user = useSelector((state) => state.user);

    const dispatch = useDispatch()
    const Navigate = useNavigate()

    const [users, setUsers] = useState([]);
    const [chat, setChat] = useState();

    useEffect(() => {
        if (user === false) Navigate("/");
        const getUsers = async () => {
            const data = query(collection(db, "Users"));
            const mySnapshot = await getDocs(data);
            const usersData = []
            mySnapshot.forEach((doc) => (usersData.push(doc.data())));
            setUsers(usersData);
        }
        getUsers();
    }, [user]);

    const logout = () => {
        signOut(auth);
        dispatch(deleteUser())
        Navigate("/")
    };

    const handleOpenChat = async (user) => {
        console.log(user.uid);
        console.log(userData.uid);

        const chatId = user.uid > userData.uid ? userData.uid + user.uid : user.uid + userData.uid;

        const q = query(collection(db, "ChatRoom"), where("chatId", "==", chatId));
        const docs = await getDocs(q);

        const data = {
            chatId: chatId,
            chats:[]
        }

        if (docs.docs.length === 0) {
            await addDoc(collection(db, "ChatRoom"), data);
        }

        setChat(user)
    }

    return (
        <div className="chatPage">

            <div className="chatList">

                <div className="userInfo">
                    <img src="https://cdn.iconscout.com/icon/free/png-512/free-avatar-375-456327.png?f=avif&w=256" alt="userImg" />
                    <div className="userDetails">
                        <div>
                            <h2>{userData.name}</h2>
                            <p onClick={logout}>Log Out</p>
                            <p><i class="fa-regular fa-bell"></i></p>
                        </div>

                        <p>@{userData.name}-{userData.lastName}</p>
                    </div>
                </div>

                <div className="chats">
                    <div className="searchBar">
                        <input type="text" placeholder="Search" />
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </div>

                    <div className="chatsContainer">

                        {users.map((user) => ((user.uid !== userData.uid &&
                            <ChatItems
                                key={user.uid}
                                user={user}
                                handleOpenChat={handleOpenChat}
                            />)))}

                    </div>

                </div>

            </div>

            {chat && <OpenChat user={chat} />}


        </div>
    );
}

export default Dashboard;
