import React from "react";
import RegistrationForm from "./RegistrationForm";
import "./App.css";
import { connect } from "react-redux";
import JoinRoom from "./JoinRoom";

function App({ user, room }) {
  return (
    <div className="App">
      {user.logged ? <JoinRoom /> : <RegistrationForm />}
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
