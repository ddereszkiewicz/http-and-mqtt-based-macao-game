const Main = require("./Main");
const Room = require("./Room");
const Player = require("./Player");
const express = require("express");
const Message = require("./chat/Message");
const MqttHandler = require("./MqttHandler");
const cors = require("cors");
const main = new Main();
const app = express();
const port = 5000;
const mqttHandler = new MqttHandler();
app.use(express.json());
app.use(cors());

app.post("/join-view", (req, res) => {
  console.log(req.body);
  const playerId = req.body.userId;
  const roomId = req.body.roomId;
  try {
    const player = main.findPlayerById(playerId);
    const room = main.findRoomById(roomId);

    room.addSpect(player);
    res.send({ status: true });
  } catch (error) {
    console.log(error);
    res.send({ status: false, message: error.message });
  }
});

app.post("/:idPlayer/take-card", (req, res) => {
  try {
    const player = main.findPlayerById(req.params.idPlayer);
    player.takeCard();

    res.send({ status: true });
  } catch (error) {
    console.log(error);
    res.send({ status: false, message: error.message });
  }
});

app.post("/:idPlayer/put-card", (req, res) => {
  try {
    const { color, value, payload } = req.body;

    const player = main.findPlayerById(req.params.idPlayer);
    player.putCard(color, value, payload);

    res.send({ status: true });
  } catch (error) {
    console.log(error);
    res.send({ status: false, message: error.message });
  }
});
app.post("/:idRoom/start-game", (req, res) => {
  try {
    const room = main.findRoomById(req.params.idRoom);
    room.startGame();
    res.send({ status: true });
  } catch (error) {
    console.log(error);
    res.send({ status: false, message: error.message });
  }
});

app.post("/create-room", (req, res) => {
  try {
    const id = req.body.id;
    const player = main.findPlayerById(id);
    const room = new Room(main.roomNumber, [player], mqttHandler);
    main.addRoom(room);

    res.send({ roomId: room.id });
  } catch (error) {
    console.log(error);
    res.send({ status: false, message: error.message });
  }
});
app.post("/register", (req, res) => {
  const { name } = req.body;
  const player = new Player(name, main.playerId.toString());
  main.addRegisteredPlayer(player);

  res.send(player.id);
});

app.post("/:id/chat", (req, res) => {
  console.log("wywołano chat");
  const id = req.params.id;
  const message = new Message(req.body.author, req.body.text);
  try {
    const room = main.findRoomById(id);
    room.publishMessage(message);
    res.send({ status: true });
  } catch (error) {
    console.log(error);
    res.send({ status: false, message: error.message });
  }
});
app.post("/join-room", (req, res) => {
  const playerId = req.body.userId;
  const roomId = req.body.roomId;
  try {
    const player = main.findPlayerById(playerId);
    const room = main.findRoomById(roomId);
    room.addPlayer(player);
    res.send({ status: true });
  } catch (error) {
    console.log(error);
    res.send({ status: false, message: error.message });
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
