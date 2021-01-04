class Effect {
  constructor(action, game) {
    this.action = action;
    this.game = game;
  }
  getActionType() {
    return this.action.type;
  }
}
module.exports = Effect;
