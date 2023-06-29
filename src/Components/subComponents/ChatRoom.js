import { Timestamp } from "firebase/firestore";
import { format, isTomorrow, isToday } from "date-fns";


const ChatRoom = (props) => {



    const { chats, userId, userDataId } = props;

    const getDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const currentdate = new Date();
        let day = date.getDay();
        let currentDay = currentdate.getDay();
        const diff = currentDay - day;
        if (diff === 0)
            return 'Today';
        else if (day === 1)
            return 'Tomorrow';
        else
            return format(date, "dd/MM/yyyy");
    }



    return (
        <div>
            <div className="chatRoom">

                {chats.map((chat, index) => {

                    let Mydate = "T";
                    const date = chat?.date?.seconds ? new Date(chat.date.seconds * 1000) : null;
                    const formattedTime = date ? date.toLocaleTimeString() : null;
                    let d = getDate(chat.date.seconds);
                    if (d != Mydate && index != 0) Mydate = d;


                    return (
                        <div key={index} className="messageDate">

                            {Mydate === d ? "" : <p className="chatRoomDate">{d}</p>}

                            <div >
                                {chat.senderId === userDataId ? (
                                    <div className="rightMessage">
                                        <p>{chat.text}</p>
                                        {formattedTime && <span>{formattedTime}&nbsp;
                                            {chat.status === true ? (<>
                                                <i style={{ color: "blue" }} className="fa-solid fa-check-double"></i>
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
                        </div>
                    );
                })}



            </div>
        </div>
    )
}

export default ChatRoom