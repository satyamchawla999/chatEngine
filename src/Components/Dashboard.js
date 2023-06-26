import { useSelector } from "react-redux";
import ChatItems from "./subComponents/ChatItems";
import "../Assets/Styles/dashboard.scss"


const Dashboard = () => {

    const user = useSelector((state) => state.userData);
    console.log(user);

    return (
        <div className="chatPage">

            <div className="chatList">

                <div className="userInfo">
                    <img src="https://cdn.iconscout.com/icon/free/png-512/free-avatar-375-456327.png?f=avif&w=256" alt="userImg" />
                    <div className="userDetails">
                        <div>
                            <h2>Ralph Hitman</h2>
                            <p><i class="fa-regular fa-bell"></i></p>
                        </div>

                        <p>@Ralph-Hitman</p>
                    </div>
                </div>

                <div className="chats">
                    <div className="searchBar">
                        <input type="text" placeholder="Search" />
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </div>

                    <div className="chatsContainer">
                        <ChatItems />
                        <ChatItems />
                        <ChatItems />
                        <ChatItems />
                        <ChatItems />
                        <ChatItems />
                        <ChatItems />
                        <ChatItems />
                    </div>

                </div>

            </div>

            <div className="openChat">
                <div className="headBar">
                    <div className="senderInfo">
                        <img src="https://cdn.iconscout.com/icon/free/png-512/free-avatar-375-456327.png?f=avif&w=256" alt="userImg" />
                        <h2>Ram Kumar</h2>
                        <div className="headSpace">

                        </div>
                        <p><i class="fa-solid fa-phone"></i></p>
                        <p><i class="fa-solid fa-laptop-file"></i></p>
                        <p><i class="fa-solid fa-ellipsis"></i></p>
                    </div>
                </div>

                <div className="textBar">
                    <i class="fa-solid fa-paperclip"></i>
                    <input type="text" placeholder="Type a message." />
                    <i class="fa-regular fa-face-smile"></i>
                    <p><img src={require("../Assets/Images/send-message.png")} /></p>
                </div>
            </div>

        </div>
    );
}

export default Dashboard;
