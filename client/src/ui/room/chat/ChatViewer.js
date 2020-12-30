import React from "react";
import { connect } from "react-redux";
import Message from "./Message";
import { v4 as uuid } from "uuid";
import { last10messagesSelector } from "../../../state/ducks/chat/selectors";
const ChatViewer = ({ last10messages }) => {
  console.log(last10messages);
  const view = last10messages.map(message => (
    <Message text={message.text} key={uuid()} author={message.author} />
  ));
  return (
    <div className="chatViewer">
      <li> {view} </li>
    </div>
  );
};
const mapStateToProps = state => ({
  last10messages: last10messagesSelector(state),
});
export default connect(mapStateToProps, null)(ChatViewer);
