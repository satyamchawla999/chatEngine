

const ChatItems = () => {

    return (
        <div className="chatItemContainer">
            <div className="chatImg">
                <img src="https://cdn.iconscout.com/icon/free/png-512/free-avatar-375-456327.png?f=avif&w=256" alt="userImg" />
            </div>
            
            <div className="recentMessage">
                <div>
                    <h4>Ralph Hitman</h4>
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