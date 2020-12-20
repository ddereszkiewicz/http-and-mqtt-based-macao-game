class Game {
  constructor() {
    this.rooms = [];
    this.registeredPlayers = [];
    this.roomNumber = 1;
  }
  addRoom(room) {
    this.rooms.push(room);
    this.roomNumber += 1;
  }
  addRegisteredPlayer(player) {
    this.registeredPlayers.push(player);
  }
  findPlayerById(id) {
    const player = this.registeredPlayers.find(player => player.id === id);
    if (player) {
      return player;
    } else {
      throw Error("Player not found");
    }
  }
}

module.exports = Game;
