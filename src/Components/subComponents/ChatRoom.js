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

    const { chats, userId, userDataId } = props;
    console.log("chats", chats)
    console.log("userId", userId)
    console.log("userDataId", userDataId)

    return (
        <div>
            <div className="chatRoom">
                <div className="chatRoomDate">
                    <p>November 2023</p>
                </div>

                {chats.map((chat) => {
                    const date = chat?.date?.seconds ? new Date(chat.date.seconds * 1000) : null;
                    const formattedTime = date ? date.toLocaleTimeString() : null;

                    return (
                        <div key={chat.id}>
                            {chat.senderId === userDataId ? (
                                <div className="rightMessage">
                                    <p>{chat.text}</p>
                                    {formattedTime && <span>{formattedTime}&nbsp;
                                    {chat.status === true ? (<>
                                        <i style={{color:"blue"}} className="fa-solid fa-check-double"></i>
                                    </>) : (<>
                                        <i className="fa-solid fa-check-double"></i>
                                    </>)}</span>}
                                </div>
                            ) : (
                                <div className="leftMessage">
                                    <p>{chat.text}</p>
                                    {formattedTime && <span>{formattedTime}</span>}
                                </div>
                            )}
                        </div>
                    );
                })}



            </div>
        </div>
    )
}

export default ChatRoom