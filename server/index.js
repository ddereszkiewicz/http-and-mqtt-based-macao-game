const Main = require("./Main");
const Room = require("./Room");
const Player = require("./Player");
const express = require("express");
const Message = require("./chat/Message");
const cors = require("cors");
const main = new Main();
const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());

app.post("/:idRoom/start-game", (req, res) => {
  try {
    const room = main.findRoomById(req.params.idRoom);
    room.startGame();
    console.log(room.players);
  } catch (error) {
    console.log(error);
  }
});

app.post("/create-room", (req, res) => {
  try {
    const id = req.body.id;
    const player = main.findPlayerById(id);
    const room = new Room(main.roomNumber, [player]);
    main.addRoom(room);
    console.log(room);
    res.send({ roomId: room.id });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
app.post("/register", (req, res) => {
  const { name } = req.body;
  const player = new Player(name);
  main.addRegisteredPlayer(player);
  console.log(main.registeredPlayers);
  res.send(player.id);
});

app.post("/:id/chat", (req, res) => {
  const id = req.params.id;
  const message = new Message(req.body.author, req.body.text);
  try {
    const room = main.findRoomById(id);
    room.publishMessage(message);
    res.send(true);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});
app.post("/join-room", (req, res) => {
  const playerId = req.body.userId;
  const roomId = req.body.roomId;
  try {
    const player = main.findPlayerById(playerId);
    const room = main.findRoomById(roomId);
    room.addPlayer(player);
    res.send(true);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
