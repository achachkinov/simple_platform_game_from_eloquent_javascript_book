class Player {
  static SYMBOLS = ["@"]
  static startPosDeviation = new Vec(0, -0.5);
  static startSpeed = new Vec(0, 0);

  constructor(pos, speed, physics) {
    this.pos = pos;
    this.speed = speed;
    this.physics = physics
  }

  static create(pos) {
    const startPos = pos.plus(this.startPosDeviation)
    const physic = new PhysicsOfPlayer();
    return new Player(startPos, this.startSpeed, physic);
  }

  update(time, state, keys) {
    const updatedPosAndSpeed = this.physics.getUpdatedPosAndSpeed( this.pos, this.speed, this.size, time, state, keys);
    return new Player( updatedPosAndSpeed.pos, updatedPosAndSpeed.speed, this.physics );
  };

  updateState( state ) {
    if ( LevelUtils.touches( state.level, this.pos, this.size, "lava")) {
      return new State(state.level, actors, "lost");
    }
  }
}
Player.prototype.size = new Vec(0.8, 1.5);
Player.prototype.type = "player"