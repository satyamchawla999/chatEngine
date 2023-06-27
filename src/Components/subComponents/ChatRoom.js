import { useEffect, useState } from "react";
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

import { db } from "../../firebase/firebase";

const ChatRoom = (props) => {

    const [senderMessage, setSenderMessage] = useState([]);
    const [reciverMessage, serReciverMessage] = useState([]);

    const { chats, userId, userDataId } = props
    console.log("chats", chats)
    console.log("userId", userId)
    console.log("userDataId", userDataId)

    return (
        <div>
            <div className="chatRoom">
                <div className="chatRoomDate">
                    <p>November 2023</p>
                </div>

                {chats.map((chat) => (
                    <div>
                        {chat.senderId === userDataId ? <>
                            <div className="rightMessage">
                                <p>{chat.text}</p>
                            </div>
                        </> : <>

                            <div className="leftMessage">
                                <p>{chat.text}</p>
                            </div>

                        </>}
                    </div>
                ))}



            </div>
        </div>
    )
}

export default ChatRoom