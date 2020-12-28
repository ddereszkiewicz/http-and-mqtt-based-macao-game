import React from "react";
import RegistrationForm from "./RegistrationForm";
import "./App.css";
import { connect } from "react-redux";
import JoinRoom from "./JoinRoom";
import Room from "./Room";

function App({ user, room }) {
  const handleRoutes = () => {
    if (user.logged && room.joined) {
      return <Room />;
    } else if (user.logged) {
      return <JoinRoom />;
    } else {
      return <RegistrationForm />;
    }
  };
  return (
    <div className="App">
      {/* {user.logged ? <JoinRoom /> : <RegistrationForm />} */}
      {handleRoutes()}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user,
    room: state.room,
  };
};
export default connect(mapStateToProps, null)(App);
