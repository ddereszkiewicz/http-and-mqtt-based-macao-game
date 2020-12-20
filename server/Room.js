const { v4 } = require("uuid");
class Room {
  constructor(id = v4(), players = []) {
    this.id = id;
    this.players = players;
  }
}

module.exports = Room;
