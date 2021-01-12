import React, { useEffect, useState } from "react";
import RegistrationForm from "./RegistrationForm";
import "./css/App.css";
import { connect } from "react-redux";
import JoinRoom from "./JoinRoom";
import Room from "./room/Room";
import { importState } from "../state/ducks/game/actions";
import { addMessage } from "../state/ducks/chat/actions";
import { addPlayer, addSpect } from "../state/ducks/room/actions";
import { importSpectatorState } from "../state/ducks/spectator/actions";
const MQTT = require("async-mqtt");

function App({
  user,
  room,
  onAddPlayer,
  onAddMessage,
  onImportState,
  onImportSpectatorState,
  onAddSpect,
  game,
  spectator,
}) {
  const [client, setClient] = useState(null);
  useEffect(() => setClient(MQTT.connect("ws://10.45.3.36:8000/mqtt")), [
    setClient,
  ]);
  useEffect(() => {
    if (client && room.id) {
      client.on("message", (topic, message) => {
        console.log(topic);
        switch (topic) {
          case `chat/${room.id}`: {
            onAddMessage(JSON.parse(message.toString()));

            break;
          }
          case `game-state/${user.id}`: {
            onImportState(JSON.parse(message.toString()));
            break;
          }
          case `room/${room.id}`: {
            onAddPlayer(JSON.parse(message.toString()).players);
            onAddSpect(JSON.parse(message.toString()).spectators);
            break;
          }
          case `chat/${room.id}/${user.id}`: {
            const messageParsed = JSON.parse(message.toString());
            const messagePrepared = {
              ...messageParsed,
              author: messageParsed.author + "(whisper)",
            };

            onAddMessage(messagePrepared);

            break;
          }
          case `spectate/${room.id}`: {
            onImportSpectatorState(JSON.parse(message.toString()));
            break;
          }
          default:
        }
      });
    }
  }, [
    room.id,
    user.id,
    client,
    onAddSpect,
    onAddPlayer,
    onAddMessage,
    onImportSpectatorState,
    onImportState,
  ]);
  const handleRoutes = () => {
    if (user.logged && room.joined) {
      return (
        <Room
          room={room}
          client={client}
          user={user}
          game={room.isPlayer ? game : spectator}
        />
      );
    } else if (user.logged) {
      return <JoinRoom client={client} />;
    } else {
      return <RegistrationForm />;
    }
  };
  return <div className="App">{handleRoutes()}</div>;
}

const mapDispatchToProps = dispatch => {
  return {
    onImportSpectatorState: state => dispatch(importSpectatorState(state)),
    onImportState: state => dispatch(importState(state)),
    onAddMessage: message => {
      dispatch(addMessage(message));
    },
    onAddPlayer: playerNames => dispatch(addPlayer(playerNames)),
    onAddSpect: spectNames => dispatch(addSpect(spectNames)),
  };
};
const mapStateToProps = state => {
  return {
    user: state.user,
    room: state.room,
    chat: state.chat,
    game: state.game,
    spectator: state.spectator,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
