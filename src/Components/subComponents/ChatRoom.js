

const ChatRoom = (props) => {

    

    const { chats, userId, userDataId } = props;

    return (
        <div>
            <div className="chatRoom">
                <div className="chatRoomDate">
                    
                </div>

                {chats.map((chat,index) => {
                    const date = chat?.date?.seconds ? new Date(chat.date.seconds * 1000) : null;
                    const formattedTime = date ? date.toLocaleTimeString() : null;

                    return (
                        <div key={index}>
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