import { useState,useEffect } from "react";
import { ChatRoom } from "../subComponents";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";

import { db } from "../../firebase/firebase";
import { getDocs,query,collection,updateDoc, where } from "firebase/firestore";


const OpenChat = (props) => {
    const { user } = props;
    const userData = useSelector((state) => state.userData)
    const name = user?.name;

    const [senderMessage, setSenderMessage] = useState("sender");
    const [reciverMessage, serReciverMessage] = useState("reciever");

    const [message, setMessage] = useState("");

    const [chats,setChats] = useState([]);
    
    let chatData = [];
    useEffect(()=>{
        
        const getChats = async () => {
            const chatId = user.uid > userData.uid ? userData.uid + user.uid : user.uid + userData.uid;
            const q = query(collection(db, "ChatRoom"),where("chatId","==",chatId));
            const chats = await getDocs(q);
            
            chats.forEach((chat)=>{
                setChats(chat.data().chats);
                let status = chat.status ;
                status = true;
                chat.status = status;
            });
        }
        getChats();
    },[user,message])

    console.log(chatData);

    const handleMessage = () => {
        

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
            id:userData.uid,
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

    return (
        <div className="openChat">
            <div className="headBar">
                <div className="senderInfo">
                    <div className="openChatImg">
                        <img src="https://cdn.iconscout.com/icon/free/png-512/free-avatar-375-456327.png?f=avif&w=256" alt="userImg" />
                        <h2>{name}</h2>
                    </div>

                    <div className="headSpace">
                        <p><i class="fa-solid fa-phone"></i></p>
                        <p><i class="fa-solid fa-laptop-file"></i></p>
                        <p><i class="fa-solid fa-ellipsis"></i></p>
                    </div>
                </div>
            </div>

            <ChatRoom chats={chats} userId={user.uid} userDataId={userData.uid}/>

            <div className="textBar">
                <i class="fa-solid fa-paperclip"></i>
                <input type="text" placeholder="Type a message." value={message} onChange={(e) => setMessage(e.target.value)} />
                <i class="fa-regular fa-face-smile"></i>
                <p><img src={require("../../Assets/Images/send-message.png")} onClick={handleMessage} /></p>
            </div>
        </div>
    );

}

export default OpenChat;