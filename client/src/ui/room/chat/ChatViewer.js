import React from "react";
import { connect } from "react-redux";
import Message from "./Message";
import { v4 as uuid } from "uuid";

const ChatViewer = ({ messages }) => {
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
