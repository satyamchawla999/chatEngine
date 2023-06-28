import { useState, useEffect } from "react";
import { ChatRoom } from "../subComponents";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";

import { db } from "../../firebase/firebase";
import { getDocs, query, collection, updateDoc, where, onSnapshot } from "firebase/firestore";


const OpenChat = (props) => {
    const { user, currentUser } = props;
    const userData = useSelector((state) => state.userData)
    const name = user?.name;

    const [message, setMessage] = useState("");
    const [typing, setTyping] = useState(false);

    const [chats, setChats] = useState([]);


    let chatData = [];
    useEffect(() => {

        const getChats = async () => {
            const chatId = user.uid > userData.uid ? userData.uid + user.uid : user.uid + userData.uid;
            const q = query(collection(db, "ChatRoom"), where("chatId", "==", chatId));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                snapshot.forEach((doc) => {
                    const chats = doc.data().chats;
                    const cd = userData.uid;

                    setTyping(doc.data()[cd]);
                    console.log(cd3, doc.data()[cd]);
                    const updatedChats = chats.map((chat) => {
                        if (chat.reciverId === userData.uid) {
                            return {
                                ...chat,
                                status: true
                            };
                        }
                        return chat;
                    });

                    const docRef = doc.ref;
                    updateDoc(docRef, { chats: updatedChats });
                });

                const updatedChats = snapshot.docs.flatMap((doc) => doc.data().chats);
                setChats(updatedChats);
            });

            return () => unsubscribe();
        };

        getChats();
    }, [user, message]);

    console.log(chatData);

    const handleMessage = (e) => {
        e.preventDefault();


        if (message == "") {
            alert("empty");
            return;
        }

        const chatId = user.uid > userData.uid ? userData.uid + user.uid : user.uid + userData.uid;

        const date = new Date();
        console.log(date);

        const data = {
            text: message,
            status: false,
            senderId: userData.uid,
            reciverId: user.uid,
            id: userData.uid,
            chatId: chatId,
            date: date
        };

        const getChat = async () => {
            const chatRoomRef = collection(db, "ChatRoom");
            const querySnapshot = await getDocs(query(chatRoomRef));

            querySnapshot.forEach((doc) => {
                if (chatId === doc.data().chatId) {
                    const chatsArray = doc.data().chats || [];
                    chatsArray.push(data);

                    updateDoc(doc.ref, { chats: chatsArray });
                }
            });
        };

        getChat();

        setMessage("");
    }
    let t;
    const handleChange = async (e) => {
        clearTimeout(t);

        setMessage(e.target.value);
        const chatId = user.uid > userData.uid ? userData.uid + user.uid : user.uid + userData.uid;

        const q = query(collection(db, "ChatRoom"), where("chatId", "==", chatId));
        const docs = await getDocs(q);
        docs.forEach((doc) => {
            const obj = {}
            obj[user.uid] = true;
            const docRef = doc.ref;
            updateDoc(docRef, obj);
        })

        t = setTimeout(() => {
            docs.forEach((doc) => {
                const obj = {}
                obj[user.uid] = false;
                const docRef = doc.ref;
                updateDoc(docRef, obj);
            })
        }, 5000);


    }

    return (
        <div className="openChat">
            <div className="headBar">
                <div className="senderInfo">
                    <div className="openChatImg">
                        <img src="https://cdn.iconscout.com/icon/free/png-512/free-avatar-375-456327.png?f=avif&w=256" alt="userImg" />
                        {user.online === true ? <p style={{ color: "green", backgroundColor: "green" }} className="online">&nbsp;.&nbsp;</p> : (<p className="online">&nbsp;.&nbsp;</p>)}
                        <h2>{name}</h2>
                    </div>

                    <div className="headSpace">
                        <p><i className="fa-solid fa-phone"></i></p>
                        <p><i className="fa-solid fa-laptop-file"></i></p>
                        <p><i className="fa-solid fa-ellipsis"></i></p>
                    </div>
                </div>
                {typing === true && <p>Typing...</p>}

            </div>

            <ChatRoom chats={chats} userId={user.uid} userDataId={userData.uid} />

            <div className="textBar">
                <form style={{ display: "flex", width: "100%", alignItems: "center" }} onSubmit={handleMessage}>
                    <i style={{ marginRight: "10px" }} className="fa-solid fa-paperclip"></i>
                    <input type="text" placeholder="Type a message." value={message} onChange={handleChange} />
                    <i style={{ marginRight: "10px", marginLeft: "20px" }} className="fa-regular fa-face-smile"></i>
                    <button onSubmit={handleMessage} style={{ backgroundColor: "transparent", border: "none", marginRight: "10px" }}><p><img src={require("../../Assets/Images/send-message.png")} /></p></button>
                </form>

            </div>
        </div>
    );

}

export default OpenChat;