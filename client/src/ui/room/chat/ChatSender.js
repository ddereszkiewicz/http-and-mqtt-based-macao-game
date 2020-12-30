import React from "react";
import { useFormik } from "formik";
import { sendMessage } from "../../../state/ducks/chat/actions";
const ChatSender = ({ name, roomId }) => {
  const formik = useFormik({
    initialValues: {
      text: "",
    },
    onSubmit: values => {
      sendMessage(name, values.text, roomId);
      formik.resetForm();
    },
  });
  return (
    <div className="chatSender">
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="text"
          onChange={formik.handleChange}
          value={formik.values.text}
        />
        <button type="submit">send</button>
      </form>
    </div>
  );
};

export default ChatSender;
