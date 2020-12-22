import React from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import { joinRoom, createRoom } from "../state/ducks/room/actions";
const JoinRoom = ({ user, joinRoom, createRoom }) => {
  const formik = useFormik({
    initialValues: {
      roomId: "",
    },
    onSubmit: values => {
      joinRoom(user.id, values.roomId);
    },
  });

  return (
    <div className="joinRoomForm">
      <div className="createRoom">
        <button onClick={() => createRoom(user.id)}>Create Room</button>
      </div>
      <div className="JoinRoom">
        <form onSubmit={formik.handleSubmit} className="join_room_form">
          <input
            type="text"
            name="roomId"
            onChange={formik.handleChange}
            value={formik.values.roomId}
          />
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

export default connect(mapStateToProps, { joinRoom, createRoom })(JoinRoom);
