const Game = require("./Game");
const Room = require("./Room");
const Player = require("./Player");
const express = require("express");
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
  console.log("cos");
  const { name } = req.body;
  const player = new Player(name);
  game.addRegisteredPlayer(player);
  console.log(game.registeredPlayers);
  res.send(player.id);
});

app.get("/kupa", (req, res) => {
  res.send("kuap");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
