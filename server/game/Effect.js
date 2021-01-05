class Effect {
  constructor(game) {
    this.action;
    this.game = game;
  }
  getActionType() {
    return this.action.type;
  }
}
module.exports = Effect;
