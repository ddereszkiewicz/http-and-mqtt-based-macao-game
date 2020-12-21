const Game = require("./Game");
const Room = require("./Room");
const Player = require("./Player");
const express = require("express");
const Message = require("./chat/Message");
const game = new Game();
const app = express();
const port = 5000;
app.use(express.json());

app.post("/start-game", (req, res) => {
  try {
    const id = req.body.id;
    const player = game.findPlayerById(id);
    const room = new Room(game.roomNumber, [player]);
    game.addRoom(room);
    res.send({ roomId: room.id });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
app.post("/register", (req, res) => {
  const { name } = req.body;
  const player = new Player(name);
  game.addRegisteredPlayer(player);
  console.log(game.registeredPlayers);
  res.send(player.id);
});

app.post("/chat/:id", (req, res) => {
  const id = req.params.id;
  const message = new Message(req.body.author, req.body.text);
  try {
    const room = game.findRoomById(id);
    room.publishMessage(message);
    res.send(true);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
