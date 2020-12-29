const Game = require("./game/Game");
const Player = require("./Player");

const players = [
  new Player("dawid", "1"),
  new Player("marcin", "2"),
  new Player("zdzich", "3"),
  new Player("zdzislawa", "4"),
];
const game = new Game(players, { mqtt: "hello" });

game.sendState();
