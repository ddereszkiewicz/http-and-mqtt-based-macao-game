import React from "react";
import { connect } from "react-redux";
import Message from "./Message";
import { v4 as uuid } from "uuid";
// import { last10messagesSelector } from "../../../state/ducks/chat/selectors";
const ChatViewer = ({ messages }) => {
  // console.log(last10messages);
  const view = messages.map(message => (
    <Message text={message.text} key={uuid()} author={message.author} />
  ));
  return (
    <div className="chatViewer">
      <li> {view} </li>
    </div>
  );
};
const mapStateToProps = state => ({
  messages: state.chat.messages,
});
export default connect(mapStateToProps, null)(ChatViewer);
