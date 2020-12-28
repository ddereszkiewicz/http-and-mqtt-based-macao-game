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
  findRoomById(id) {
    const room = this.rooms.find(room => room.id === parseInt(id));
    if (room) {
      return room;
    } else {
      throw Error("room not found");
    }
  }
}

module.exports = Game;
