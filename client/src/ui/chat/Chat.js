import React from "react";
import ChatViewer from "./ChatViewer";
import { connect } from "react-redux";
import ChatSender from "./ChatSender";
const Chat = ({ user, room, chat }) => {
  return (
    <div className="chatContainer">
      <ChatViewer />
      <ChatSender name={user.name} roomId={room.id} />
    </div>
  );
};
const mapStateToProps = state => {
  return {
    user: state.user,
    room: state.room,
    chat: state.chat,
  };
};
export default connect(mapStateToProps, null)(Chat);
