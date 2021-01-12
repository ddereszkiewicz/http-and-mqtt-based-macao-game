import React from "react";
import { useFormik } from "formik";
import {
  sendMessage,
  sendPrivateMessage,
} from "../../../state/ducks/chat/actions";
import { connect } from "react-redux";
const ChatSender = ({ name, room, user, sendPrivateMessage }) => {
  const formik = useFormik({
    initialValues: {
      text: "",
      receiver: "all",
    },
    onSubmit: values => {
      console.log(values.receiver);
      if (values.receiver === "all") {
        sendMessage(
          room.isPlayer ? name : name + "(spectator)",
          values.text,
          room.id
        );
      } else {
        const receiverName = [...room.players, ...room.spectators].find(
          p => p.id == values.receiver
        ).name;
        sendPrivateMessage(
          name,
          values.text,
          room.id,
          values.receiver,
          receiverName
        );
      }

      formik.resetForm();
    },
  });
  const receivers = [...room.players, ...room.spectators]
    .filter(p => p.id != user.id)
    .map(person => (
      <option key={person.id} value={person.id}>
        {person.name}
      </option>
    ));
  return (
    <div className="chatSender">
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="text"
          onChange={formik.handleChange}
          value={formik.values.text}
        />
        <select
          name="receiver"
          value={formik.values.receiver}
          onChange={formik.handleChange}
        >
          <option value="all">all</option>
          {receivers}
        </select>
        <button type="submit">send</button>
      </form>
    </div>
  );
};

export default connect(null, { sendPrivateMessage })(ChatSender);
