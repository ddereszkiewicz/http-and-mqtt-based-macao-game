import React from "react";
import ChatViewer from "./ChatViewer";

import ChatSender from "./ChatSender";
const Chat = ({ user, room }) => {
  return (
    <div className="chatContainer">
      <ChatViewer />
      <ChatSender name={user.name} roomId={room.id} />
    </div>
  );
};

export default Chat;
