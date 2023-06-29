import { useState, useEffect, useRef } from "react";
import React from "react";
import { ChatRoom } from "../subComponents";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";

import { db } from "../../firebase/firebase";
import {
  getDocs,
  query,
  collection,
  updateDoc,
  where,
  onSnapshot,
} from "firebase/firestore";

const OpenChat = React.memo((props) => {
  const { user, currentUser } = props;
  const userData = useSelector((state) => state.userData);
  const name = user?.name;

  const textBox = useRef(null);

  const [send, setSend] = useState({});
  const [typing, setTyping] = useState(false);
  let updateTyping = false;

  const [chats, setChats] = useState([]);

  useEffect(() => {
    const getChats = async () => {
      const chatId =
        user.uid > userData.uid
          ? userData.uid + user.uid
          : user.uid + userData.uid;

      const q = query(
        collection(db, "ChatRoom"),
        where("chatId", "==", chatId)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const updatedChats = []
        snapshot.forEach((doc) => {

          const chats = doc.data().chats;
          const cd = userData.uid;

          setTyping(doc.data()[cd]);
          console.log(cd, doc.data()[cd]);

          const updatedChat = chats.map((chat) => {
            if (chat.reciverId === userData.uid) {
              return {
                ...chat,
                status: true,
              };
            }
            return chat;
          });

          updatedChats.push(...updatedChat);
          const docRef = doc.ref;
          updateDoc(docRef, { chats: updatedChat });

        });

        setChats(updatedChats);
      });

      return () => unsubscribe();
    };

    getChats();
  }, [user, send]);




  const handleMessage = (e) => {

    e.preventDefault();

    if (textBox.current.value == "") {
      alert("empty");
      return;
    }

    const chatId =
      user.uid > userData.uid
        ? userData.uid + user.uid
        : user.uid + userData.uid;

    const date = new Date();
    console.log(date);

    const data = {
      text: textBox.current.value,
      status: false,
      senderId: userData.uid,
      reciverId: user.uid,
      id: userData.uid,
      chatId: chatId,
      date: date,
    };

    setSend(data);

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
    e.target.textBox.value = "";

  };




  let t;
  const handleChange = async (e) => {
    clearTimeout(t);

    // setMessage(e.target.value);
    const chatId =
      user.uid > userData.uid
        ? userData.uid + user.uid
        : user.uid + userData.uid;

    const q = query(collection(db, "ChatRoom"), where("chatId", "==", chatId));
    let docs = await getDocs(q);
    if (updateTyping === false) {
      docs.forEach((doc) => {
        const obj = {};
        obj[user.uid] = true;
        const docRef = doc.ref;
        updateDoc(docRef, obj);
      });
      console.log("updateTyping")
      updateTyping = true;
    }


    t = setTimeout(() => {
      docs.forEach((doc) => {
        const obj = {};
        obj[user.uid] = false;
        const docRef = doc.ref;
        updateDoc(docRef, obj);
      });
      updateTyping = false;
      console.log("updateTypingFalse")
    }, 5000);
  };

  const handleClear = async () => {
    const chatId =
      user.uid > userData.uid
        ? userData.uid + user.uid
        : user.uid + userData.uid;

    const q = query(collection(db, "ChatRoom"), where("chatId", "==", chatId));
    const docs = await getDocs(q);
    docs.forEach((doc) => {
      const arr = [];
      const docRef = doc.ref;
      updateDoc(docRef, { chats: arr });
    });
  }

  return (
    <div className="openChat">
      <div className="headBar">
        <div className="senderInfo">
          <div className="openChatImg">
            <img
              src="https://cdn.iconscout.com/icon/free/png-512/free-avatar-375-456327.png?f=avif&w=256"
              alt="userImg"
            />
            {user.online === true ? (
              <p
                style={{ color: "green", backgroundColor: "green" }}
                className="online"
              >
                &nbsp;.&nbsp;
              </p>
            ) : (
              <p className="online">&nbsp;.&nbsp;</p>
            )}
            <h2>{name}</h2>
          </div>

          <div className="headSpace">
            <p>
              <i className="fa-solid fa-phone"></i>
            </p>
            <p>
              <i className="fa-solid fa-laptop-file"></i>
            </p>
            <p>
              <i className="fa-solid fa-ellipsis"></i>
            </p>
          </div>
        </div>
        <div className="additionalInfo">
          <p className="typing">{typing === true && <>Typing...</>}</p>
          <p className="clear" onClick={handleClear}>Clear Conversation</p>
        </div>
      </div>

      <ChatRoom chats={chats} userId={user.uid} userDataId={userData.uid} />

      <div className="textBar">
        <form
          style={{ display: "flex", width: "100%", alignItems: "center" }}
          onSubmit={handleMessage}
        >
          <i
            style={{ marginRight: "10px" }}
            className="fa-solid fa-paperclip"
          ></i>
          <input
            type="text"
            placeholder="Type a message."
            name="textBox"
            ref={textBox}
            // value={textBox.current.value}
            onChange={handleChange}
          />
          <i
            style={{ marginRight: "10px", marginLeft: "20px" }}
            className="fa-regular fa-face-smile"
          ></i>
          <button
            onSubmit={handleMessage}
            style={{
              backgroundColor: "transparent",
              border: "none",
              marginRight: "10px",
            }}
          >
            <p>
              <img src={require("../../Assets/Images/send-message.png")} />
            </p>
          </button>
        </form>
      </div>
    </div>
  );
});

export default OpenChat;
