import React from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import {
  joinRoom,
  createRoom,
  joinRoomAsSpect,
} from "../state/ducks/room/actions";
const JoinRoom = ({ user, joinRoom, createRoom, joinRoomAsSpect, client }) => {
  const formik = useFormik({
    initialValues: {
      roomId: "",
      play: "play",
    },
    onSubmit: values => {
      console.log(values);
      if (values.play === "play") {
        joinRoom(user.id, values.roomId, client);
      } else {
        joinRoomAsSpect(user.id, values.roomId, client);
      }
    },
  });

  return (
    <div className="joinRoomForm">
      <div className="createRoom">
        <button onClick={() => createRoom(user.id, client)}>Create Room</button>
      </div>
      <div className="JoinRoom">
        <form onSubmit={formik.handleSubmit} className="join_room_form">
          <label>join room: </label>
          <input
            type="text"
            name="roomId"
            onChange={formik.handleChange}
            value={formik.values.roomId}
          />
          <select
            name="play"
            value={formik.values.play}
            onChange={formik.handleChange}
          >
            <option value={"spectate"}>spectate</option>
            <option value={"play"}>play</option>
          </select>
          <button type="submit">submit</button>
        </form>
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, {
  joinRoom,
  createRoom,
  joinRoomAsSpect,
})(JoinRoom);
