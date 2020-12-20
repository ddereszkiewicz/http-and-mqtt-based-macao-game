const { v4 } = require("uuid");

class Player {
  constructor(name, id = v4()) {
    this.name = name;
    this.id = id;
  }
}

module.exports = Player;
