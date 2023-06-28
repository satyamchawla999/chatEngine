

const ChatItems = (props) => {
    const {user,handleOpenChat} = props;
    console.log("user",user)

    return (
        <div className="chatItemContainer" onClick={()=>handleOpenChat(user)}>
            <div className="chatImg">
                <img src="https://cdn.iconscout.com/icon/free/png-512/free-avatar-375-456327.png?f=avif&w=256" alt="userImg" />
                {user.online === true ? <p style={{color:"green",backgroundColor:"green"}} className="online">&nbsp;.&nbsp;</p> : (<p className="online">&nbsp;.&nbsp;</p>) }
            </div>
            
            <div className="recentMessage">
                <div>
                    <h4>{user.name}</h4>
                </div>

                <p>Lorem Ipsum is simply dummy text of the printing </p>
            </div>

            <div className="chatInfo">
                <p className="date">03 Apr</p>
                
                <p className="number">11</p>
            </div>
        </div>
    )
}

export default ChatItems;