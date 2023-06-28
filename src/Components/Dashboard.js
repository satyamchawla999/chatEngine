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
    updateDoc,
    getDoc,
    onSnapshot
} from "firebase/firestore";


import "../Assets/Styles/dashboard.scss"
import { useNavigate } from "react-router-dom";


const Dashboard = () => {

    const [userData, setUserData] = useState(useSelector((state) => state.userData));
    const user = useSelector((state) => state.user);

    const dispatch = useDispatch()
    const Navigate = useNavigate()

    const [users, setUsers] = useState([]);
    const [chat, setChat] = useState();

    useEffect(() => {
        if (user === false) Navigate("/");
        let usersD = [];
        const getUsers = async () => {
            const data = query(collection(db, "Users"));
            const unsubscribe = onSnapshot(data, (snapshot) => {
                snapshot.forEach((doc) => {
                    if (userData.uid === doc.data().uid) {
                        setUserData(doc.data());
                        console.log("userData", userData);
                    }
                    usersD.push(doc.data())
                });
                setUsers(usersD);
                usersD=[];
            })
            return () => unsubscribe();
        }
        getUsers();
    }, [user]);

    const logout = async () => {
        const q = query(collection(db, "Users"), where("uid", "==", userData.uid));
        const docs = await getDocs(q);

        docs.forEach((doc)=>{
            const docRef = doc.ref;
            updateDoc(docRef, { online: false });
        })

        // snapshot.forEach(()=>{
        //     const docRef = doc.ref;
        //     updateDoc(docRef, { online: false });
        // })

        // const unsubscribe = onSnapshot(q, (snapshot) => {
        //     // snapshot.forEach((doc) => {
                
        //     // })
        //     const docRef = doc.ref;
        //     updateDoc(docRef, { online: false });
        //     return () => unsubscribe();
        // });

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
            chats: [],
        }

        data[user.uid] = false;
        data[userData.uid] = false

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
                            <p><i className="fa-regular fa-bell"></i></p>
                        </div>

                        <p>@{userData.name}-{userData.lastName}</p>
                    </div>
                </div>

                <div className="chats">
                    <div className="searchBar">
                        <input type="text" placeholder="Search" />
                        <i className="fa-solid fa-magnifying-glass"></i>
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

            {chat && <OpenChat user={chat} currentUser = {userData} />}


        </div>
    );
}

export default Dashboard;
